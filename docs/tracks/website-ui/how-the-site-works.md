# How the RideScore DC Site Works

**For you if:** you are new to the project and want to know what the site is made of, what each part does, and why the parts are split the way they are.

**Not a setup guide.** To make changes to the site, follow either the [Front-End Developer Guide](/tracks/website-ui/frontend-guide) (changes to the webpages only) or the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) (changes to the four programs below or the data).

---

## Schematic overview

![](/images/how-the-site-works-1.png)

## The four programs

| program | job | where it is configured |
|---|---|---|
| **nginx** | Receives every request from the user/browser. Serves the pages from disk. Forwards `/tiles/` and `/api/` elsewhere. | `nginx/default.conf` (local), `nginx/server.conf.example` (deployed) |
| **Martin** | Turns rows in the database into map tiles the browser can draw. | `martin.yaml` |
| **the API** | Records a survey response. Reports whether the database is reachable. | `api/main.py` |
| **PostgreSQL / PostGIS Database** | Database that stores the road data, the crash data, the scores, and the survey responses. PostGIS is the extension that lets PostgreSQL hold and query geometry. | `docker-compose.yml` |

Locally, all four run as Docker containers, started by `docker compose up` (`npm run stack`). On the staging and production servers the same four programs run directly on the machine, managed by systemd.

## How a request is answered

| you ask for | answered by | reading |
|---|---|---|
| `/`, `/survey/` | nginx, straight from disk | `frontend/` |
| `/tiles/...` | Martin | the `serving` schema |
| `/api/...` | the API | the `app` schema |
| anything else | nginx, with a 404 | nothing |

**The map never touches the API.** Streets, scores and crashes all reach the browser as tiles from Martin, which reads the database directly. The API is involved only at the moment a survey response is submitted.

**nginx serves the pages, not the API.** Nginx directly serves static files. Page requests like `/survey/` are converted into `survey/index.html` (located in the `frontend/` folder). Asking the API (`/api/`) for a page returns 404, because the API does not serve pages.

## The three database schemas

A schema is a named area inside one PostgreSQL database. RideScore DC defines three schemas, divided by who is allowed to write to each.

| schema | holds | written by | can it be regenerated? |
|---|---|---|---|
| `data` | roads, crashes, scores | owned by the `ridescoredc-models` repository, written by `scripts/load_data.py`, which replaces the whole schema on every load | Yes — it is a copy of a published package |
| `app` | survey responses | Owned by the `ridescoredc-website` repository, written by the API | **No.** A response is the original. Nothing else can produce it. |
| `serving` | views and functions deciding what a map may show | owned by the `ridescoredc-models` repository, written by the serving bundle, rebuilt on every load | Yes |

The [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) shows how to look inside each schema with `psql`.

## The pages and the map

The webpages are plain HTML files with MapLibre GL JS loaded from a CDN for drawing maps, plus three shared scripts in `frontend/src/shared/`:

| file | job |
|---|---|
| `config.js` | The basemap, the starting view, and the `/tiles/{name}/{z}/{x}/{y}` URL builder |
| `basemap.js` | Creates the map; adds the DC aerial imagery layer; the toggle buttons |
| `crashes.js` | The crash points and the crash heatmap |

The tiles Martin serves are **vector tiles** (MVT): the browser receives the road lines and their attributes as data, not as a picture, and MapLibre decides the colors. That is why the map page can recolor every street the instant you move a slider.

The pages differ in what they add on top:

|  | `frontend/index.html` (map) | `frontend/survey/index.html` (survey) |
|---|---|---|
| road tiles | `update_score` | `survey_segments` |
| road color | by `user_score`, red to green | one grey for every road |
| popup shows | score, LTS, bike lane, speed limit, crashes | street name and `segment_id` |
| talks to the API | no | yes, `POST /api/submissions` |

The sliders on the map page are weights to combine score components into a custom score. Moving one and pressing **Update Map** calls `source.setTiles(...)` with new `i_speedlimit`, `i_facility` and so on in the query string. `serving.update_score` is a PostgreSQL function rather than a view precisely because those weights are chosen per request: it computes `user_score` dynamically inside the database for each request.

### tile_id and segment_id

Every road segment has two identifiers:

|  | `tile_id` | `segment_id` |
|---|---|---|
| type | integer | text |
| lifetime | one build of the data | durable, belongs to the street |
| purpose | MapLibre `feature-state` needs an integer id, so the survey page sets `promoteId: { survey_segments: 'tile_id' }` and highlights selections by it | the identity a survey response is stored against |
| meaning after a reload of `data` | none | the same street |

`segmentIdsFor()` in `frontend/survey/index.html` converts the `tile_id` values the map worked with into the `segment_id` values the request body carries. `app.survey_submissions` stores `segment_ids TEXT[]`, never the integer. It also stores `geometry_source`, the published data package those ids came from, read from `data.load_record` by the API.

## No build step

The HTML, CSS and JavaScript files in `frontend/` are the files nginx serves. There is no bundler output, no `dist/`, no compile step. Editing `frontend/index.html` and reloading the browser is the basic front-end development workflow.

Vite is used only for convenience while developing. `npm run dev` starts the local Vite server, which serves the same files out of `frontend/` and forwards `/tiles` and `/api` to an upstream server: the shared dev server by default, or your own stack if you set `VITE_UPSTREAM`. Vite is never deployed, and `vite.config.js` is not read by anything in production. The deploy script (`scripts/gitlab-ci/deployment.sh`) does a `git pull --ff-only`, applies the `app` migrations, and restarts Martin and the API. Nothing is built.

One consequence worth knowing: because the pages attach buttons with `onclick` attributes, the shared scripts are plain `<script>` tags defining globals rather than ES modules. Converting to modules means converting every `onclick` first.

## Where the data comes from

Score computation lives in the **`ridescoredc-models`** repository and nowhere else. The website repository never computes a score. That separation is deliberate: a score has to be reproducible from a pipeline run.

`ridescoredc-models` publishes two things, versioned separately:

| published artefact | contains | lands in |
|---|---|---|
| **data package** (`ridescoredc-data-preview.tar.gz`) | roads, crashes, scores as GeoParquet | schema `data` |
| **serving bundle** (`ridescoredc-bundle-preview.tar.gz`) | the SQL in `serving/` | schema `serving` |

The serving bundle is separate from the data package, because it defines what and how data is presented, which is specific to the RideScore DC website.

`scripts/load_data.py` (`npm run data`) fetches both from the models repository's GitHub Releases, runs the models repository's own loader, and restarts Martin — Martin reads the database once at startup and publishes what it finds then, so without that restart a freshly loaded map shows nothing and every tile 404s. Addresses and file names are all in `scripts/data_source.py`.

The `app` tables (for user feedback on bike routes) are separate again: they are created by `scripts/migrate.py` (`npm run migrate`) from `api/migrations/`, and a deploy applies those migrations but never touches `data` or `serving`. A migration history for derived data would be a fiction.
