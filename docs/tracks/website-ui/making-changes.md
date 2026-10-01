# How to make a change to the website

Two developer workflows exist:

- **front-end only** — Vite serves the pages from your machine and fetches tiles and the API from a shared server. See the [Front-End Developer Guide](/tracks/website-ui/frontend-guide).
- **full stack** — Everything runs on your machine: database, tile server, API, nginx. See the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide).

**Related documents:** For what the pieces are and how a request is answered, see [docs/how-the-site-works.md](http://how-the-site-works.md). For where files live, see [docs/repository-layout.md](http://repository-layout.md). For what the data contains, see [docs/the-data.md](http://the-data.md).

Two repositories are involved. `ridescoredc-website`: the pages, the API, the survey tables. `ridescoredc-models` builds the road data and owns the SQL that decides what data a map tile may carry. The `ridescoredc-models` repository is only needed for more advanced changes that touch the data.

---

## Front-End only

### Add a new page

**Setup:** front-end only.

A website page is a folder containing an `index.html` file. The folder name ***is*** the address, for example, the folder `frontend/about/` containing `index.html` is served at `/about/`.

1. Create `frontend/about/index.html`.
2. If the page needs to show a map, copy the three `<script src="/src/shared/...">` lines from the top of `frontend/index.html`. `config.js` must load first — `basemap.js` and `crashes.js` both read `RideScore.config`. Then call `RideScore.createMap('map')`.
3. Choose the tile source. `update_score` carries scores; `survey_segments` deliberately carries none.

**No nginx change is needed.** `nginx/default.conf` and `nginx/server.conf.example` both route every page through one rule, which finds a new folder automatically. No new `vite.config.js` entry is needed either, because Vite serves all of `frontend/`.

**Check it worked:** open `http://localhost:5173/about/` (front-end) or `http://localhost:8000/about/` (full stack), with no errors in the console (F12).

### Change how the map looks

**Setup:** front-end only.

| What you want to change | File | What to search for |
|---|---|---|
| Basemap style, start position, zoom | `frontend/src/shared/config.js` | `style:`, `center:`, `zoom:` |
| Aerial imagery source | `frontend/src/shared/config.js` | `orthoTiles` |
| The color ramp on the scored streets | `frontend/index.html` | `'line-color'` |
| Street line thickness | `frontend/index.html` | `'line-width'` |
| Crash dots | `frontend/src/shared/crashes.js` | `id: 'crashes'`, `'circle-color'`, `'circle-radius'` |
| Crash heatmap | `frontend/src/shared/crashes.js` | `'heatmap-weight'`, `'heatmap-color'`, `'heatmap-radius'` |

The score ramp is in `frontend/index.html`, in the `update_score` layer:

'line-color': \['interpolate', \['linear'\], \['get', 'user_score'\], 0, '#CC3232', 50, '#E7B416', 100, '#2DC937'\],

The numbers are score values, the strings are the colors at those values. Add a stop by inserting another `value, '#color'` pair in ascending order.

Anything in `frontend/src/shared/` is used by both pages. Check both pages after editing anything in the shared folder..

**Check it worked:** reload the page. Neither setup needs a restart for a page edit.

## Front-End or Full Stack

### Change the survey

**Setup:** front-end only for wording and flow; full stack to store a new survey answer.

Everything the respondent sees is in `frontend/survey/index.html`. Search for:

- `STRESS_FACTORS` — the stress-factor checkboxes.
- `surveyAnswers` — the per-segment answers being collected (`lts_perceived`, `safety_rating`, `stress_factors`).
- `submitSurvey` — builds the payload and posts it to `/api/submissions`.
- `<div id="survey-sheet">` — the panel markup with the questions and the summary.

Note: **A response stores `segment_id` to link to a road segment and not `tile_id`.** `tile_id` is an integer numbering one build of the road data, present only because MapLibre feature-state needs an integer, and it is not a stable road segment identifier. `segment_id` is text and belongs to the street. `segmentIdsFor()` converts one to the other — everything sent to the API goes through this conversion.

**For full stack setup only:**

Storing a new answer also needs a field on `ContiguousSegment` or `SurveySubmission` in `api/main.py`, added to the matching `INSERT`, plus a migration for the database table column — see [Add a database table or column](#add-a-database-table-or-column-—-write-a-migration) below.

**Check it worked:** take the survey at `http://localhost:8000/survey/`, submit, and read the row back:

```sh
docker compose exec db psql -U postgres -d db -c "select * from app.survey_submissions order by submitted_at desc limit 1;"
```

### Check your work before opening a pull request

**Setup:** full stack for the linter and tests; front-end only is enough for a pages-only change.

Continuous Integration (CI) on GitHub runs three jobs, as defined in `.github/workflows/ci.yml`. To run the same checks locally:

```sh
docker compose exec fastapi ruff check .        # CI: ruff check api/
docker compose exec fastapi pytest tests/ -v    # CI: pytest api/tests/ -v
npm run migrate                                 # CI applies migrations to an empty database, twice
```

Then by hand: both pages load with no errors in the browser console (F12), `git status` shows nothing unexpected (no `.env`, `node_modules/`, `pg_data/`), and every line of `git diff` is one you meant to write.

Commit to git, naming your files rather than using `git add -A`, for example:

```sh
git checkout develop
git checkout -b feature/short-name
git add frontend/index.html api/main.py    # list the files YOU changed
git commit -m "Short description of what changed"
git push -u origin feature/short-name
```

Open the pull request on GitHub against the `develop` branch. Describe what changed and why, and add a screenshot for anything visual.

## Full Stack

### Add or change an API endpoint

**Setup:** full stack.

API endpoints are basically functions called in the backend (specifically, in `api/main.py`).

1. Edit `api/main.py`. Request bodies are Pydantic models (`SurveySubmission`, `ContiguousSegment`); endpoints are the functions marked `@app.post` and `@app.get`. Keep the `/api/` prefix in the route — nginx passes the prefix through unchanged.
2. Add a test in `api/tests/test_api.py`. Tests never touch a real database: `api/tests/conftest.py` builds a mock connection, so a test asserts on the SQL that ran and the response returned.
3. Run the linter and the tests. The `fastapi` container already has both installed:

```sh
docker compose exec fastapi ruff check .
docker compose exec fastapi pytest tests/ -v
```

The `fastapi` container reloads itself when you save `api/main.py`; no restart needed.

**Check it worked:** call the endpoint, for example `curl -s http://localhost:8000/health`, and the tests pass.

### Add a database table or column — write a migration

**Setup:** full stack.

Migrations in `api/migrations/` own the `app` schema in the database, which holds survey responses. The road data is owned by the `ridescoredc-models` repository, and has no migrations: it is replaced wholesale from a published package.

1. Add a file to `api/migrations/`, numbered after the last one. The current one is `0001_app_schema.sql`, so the next is `0002_short_description.sql`.
2. Apply it:

```sh
npm run migrate
npm run migrate:list     # what has been applied, and what has not
```

`Yoyo` records what has applied, in the table named in `api/yoyo.ini` (`_yoyo_migration_app`, not the default name, because both repositories write to one database). **Running `npm run migrate` a second time does nothing** (by design).

**Never edit an existing migration that has been applied anywhere** — your machine, a teammate's, staging, production. The record says a migration ran; it cannot know the file changed afterwards. Write a new migration instead.

**A destructive change takes two deployments.** A deployment applies migrations and then restarts the code, so in between the old code is running against the new schema. Expand first (deploy 1: add the column, write both, read the new one), contract after the old code is gone (deploy 2: drop the old column).

**Check it worked:**

```sh
npm run migrate:list
docker compose exec db psql -U postgres -d db -c "\d app.survey_submissions"
```

## Full Stack, touching the Models repository

### Add a field to the crash popup

**Setup:** full stack. This change crosses both repositories and cannot be tested against the shared server.

A bike crash popup on the map page can only show what the map tile carries, and the tile carries only what is defined in the `serving` schema of the database. The file `serving/040_crashes.sql` in **ridescoredc-models** lists the columns of the crashes table that are exposed in the `serving` schema. For example, the columns `unknown_injuries_bicyclist` and `bicyclists_impaired` exist in `data.crashes` table, but are left out of the view on purpose. If you would like to add either one, change the `serving/040_crashes.sql` file.

1. Clone the **ridescoredc-models** repository
2. Add the column to the `SELECT` in `serving/040_crashes.sql`.
3. Build a bundle from that SQL:

```sh
uv run scripts/make_bundle.py --version 0.1 --applies-to 0.1
```

It prints the folder it wrote to, e.g., `dist/ridescoredc-bundle-preview-0.1`.

4. In the **ridescoredc-website** repository: load the created bundle over the published data. Only the bundle with the SQL is yours; the data package still comes from the published release:

```sh
npm run data -- --bundle /path/to/ridescoredc-models/dist/ridescoredc-bundle-preview-0.1
```

`load_data.py` restarts Martin afterwards, which it must: Martin reads the database only when it starts.

5. In the **ridescoredc-website** repository: add a row to the popup table in `frontend/src/shared/crashes.js`, inside `map.on('click', 'crashes', ...)`. Use the pipeline's name for the field (`major_injuries_bicyclist`).

**Check it worked:** open `http://localhost:8000`, click the Accidents button, zoom past zoom 15 so the dots appear, and click one. The new row shows a value, not `undefined`.

### Load different data, or data you built yourself

**Setup:** full stack.

The script that loads data into the database is `scripts/load_data.py`, which is what `npm run data` runs.

```sh
npm run data                        # load the latest published release
npm run data -- --version 0.1       # load a particular release
npm run data -- --package DIR --bundle DIR # load something you built yourself
npm run data -- --database URL      # load from a database other than your own
```

A **package** is what a pipeline run in the `ridescoredc-models` repository produced — roads, crashes, scores, etc. A **bundle** is the SQL deciding what a map on the website may show. Both are versioned separately, and each flag in the `npm run data` command takes a local directory or an address. When only providing one flag (package or bundle), the other artifact still comes from the published release.

To build your own data package or bundle in **`ridescoredc-models`**:

```sh
uv run ridescore run   # saves in out/
uv run scripts/make_package.py --out out --version 0.1
uv run scripts/make_bundle.py --version 0.1 --applies-to 0.1
```

Then load both directories with the `--package` and `--bundle` flags of `npm run data`. A bundle declares which package version it applies to, so a mismatched pair fails loudly rather than half-working. Where published data is fetched from is defined in `scripts/data_source.py`; every value in that file can be overridden in `.env` (`DATA_RELEASES`, `DATA_PACKAGE`, `DATA_BUNDLE`, `DATA_LOADER`).

**Check it worked:** `load_data.py` prints the exact loader command it runs and then restarts Martin. Reload `http://localhost:8000`.

## Troubleshooting a change

**A field in a popup reads `undefined`.** The name does not match what the pipeline produces. Use `major_injuries_bicyclist`, not the city's `MAJORINJURIES_BICYCLIST`. A MapLibre `['get', ...]` on a name that does not exist returns nothing and never raises.

**A field is `undefined` and the name is right.** The tile does not carry it. A view returns only the columns it names — check `serving/040_crashes.sql`, `serving/020_survey_segments.sql` or `serving/030_update_score.sql` in ridescoredc-models, then rebuild the bundle and load it.

**Tiles 404 after changing serving SQL.** Martin reads the database once, at startup. `npm run restart -- martin`.

**A new page 404s on the full stack but works under Vite.** The folder must contain a file named `index.html` exactly — `about/index.html`, not `about.html`.

**A change to `nginx/default.conf` or `martin.yaml` has no effect.** Both are read once at startup: `npm run restart -- nginx`, `npm run restart -- martin`.

**Submitting the survey returns 503.** No road data is loaded, so the API cannot tie a response to a road network. `npm run data`.

**Submitting the survey returns 500 after adding a field.** The column does not exist yet. Write a migration and run `npm run migrate`.

**An edited migration is not re-applied.** Yoyo records that the migration ran and cannot know if the file changed. Write a new migration; `npm run migrate -- --rollback` only helps while the change is still on your machine alone.
