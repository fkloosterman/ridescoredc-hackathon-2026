# Repository layout

Repository: <https://github.com/civictechdc/ridescoredc-website>

**For you if:** you are about to change something in this repository and want to know which folder to open.

The repository is the RideScore DC website: two web pages, a small API that records survey responses, configuration files, and convenience scripts. The bike-safety data and the SQL that decides what the maps show are built in a different repository; see [What is not in the repository](#what-is-not-in-the-repository).

Related pages: [How the site works](/tracks/website-ui/how-the-site-works) for how the parts fit together, [The data](/tracks/website-ui/the-data) for the published dataset, and [Making website changes](/tracks/website-ui/making-changes) for step-by-step recipes.

## The file tree

```text
frontend/              the website, served as plain files, no build step
  index.html            the scored map page; loads the update_score tiles
  survey/index.html     the survey page; loads survey_segments, never scores
  src/shared/           loaded by BOTH pages: a change here affects both
    config.js            map centre, zoom, basemap style, tile URL builder
    basemap.js           creates the map; Imagery / Accidents toggles
    crashes.js           crash points and crash heatmap

api/                   FastAPI service: records survey responses only
  main.py               POST /api/submissions and GET /health
  migrations/           SQL for the app schema (survey tables), applied by yoyo
  migrations-legacy/    historical record only; nothing applies these
  yoyo.ini              migration settings; app tables only
  requirements.txt      what the service needs to run
  requirements-dev.txt  the above plus ruff, pytest, httpx, yoyo
  tests/                pytest tests against a mocked database
  .env.example          copy to api/.env: settings the APPLICATION needs

scripts/
  check-env.mjs         checks each setting sits in the file that reads it
  db.py                 finds the database and waits for it (shared helper)
  load_data.py          downloads and loads published road data + serving SQL
  migrate.py            applies api/migrations/ through yoyo
  data_source.py        where published data is downloaded from
  gitlab-ci/deployment.sh  runs ON the server: fetch, migrate, restart services

nginx/
  default.conf          routing for the local Docker stack
  server.conf.example   the same routing for a deployed server

docs/                  the guides

docker-compose.yml     the local stack: nginx, fastapi, martin, db
martin.yaml            tile server config; publishes the serving schema only
vite.config.js         dev server: serves frontend/, proxies /tiles and /api
package.json           the npm commands below
.env.example           copy to .env: settings YOUR MACHINE needs
.gitignore
.github/workflows/ci.yml  lint, tests, migration check, deploy
```

## Where to look to change something

| You want to change | Edit |
|---|---|
| Page layout, styling, text, popups, survey flow | `frontend/index.html` or `frontend/survey/index.html` |
| Map centre, zoom, basemap, tile URLs | `frontend/src/shared/config.js` |
| Map creation, Imagery / Accidents buttons | `frontend/src/shared/basemap.js` |
| Crash points or crash heatmap styling | `frontend/src/shared/crashes.js` |
| What the survey API accepts or stores | `api/main.py` |
| Survey tables (new column, new table) | a new file in `api/migrations/` |
| Which URL goes to the API, the tiles, or a page | both `nginx/default.conf` and `nginx/server.conf.example` |
| What the local stack runs | `docker-compose.yml` |
| Which tile sources exist, and their SQL | not here: the models repository |

::: warning
`frontend/src/shared/` is loaded by both pages. A change there shows up on the scored map page and on the survey page. Check both before opening a pull request.
:::

## The npm commands

The npm commands are a convenience for starting the site on your computer, initializing the database with data, and checking settings. Every command is `npm run NAME` and is defined in the `scripts` block of `package.json`. Each is a short alias for a file in the repository, named in the *Runs* column.

`npm run data` and `npm run migrate` also print the command they run before running it, so it can be copied and run by hand.

`npm run dev` and `npm run check-env` only need Git and Node. The stack commands add Docker, and `npm run data` and `npm run migrate` add uv. See the [Front-End](/tracks/website-ui/frontend-guide) and [Full Stack](/tracks/website-ui/full-stack-guide) guides for installation.

| Command | Runs | What it does |
|---|---|---|
| `npm run dev` | `vite.config.js` | Vite serves `frontend/` on your machine and forwards `/tiles` and `/api` to `VITE_UPSTREAM` (the shared dev server by default). |
| `npm run check-env` | `scripts/check-env.mjs` | Reports which settings are in effect and which are in a file that does not read them. |
| `npm run stack` | `scripts/check-env.mjs`, then `docker-compose.yml` | Checks the settings, then starts the whole local stack with Docker Compose on port 8000. |
| `npm run stack:down` | `docker-compose.yml` | Stops the local stack. |
| `npm run stack:logs` | `docker-compose.yml` | Follows the logs of the running stack. |
| `npm run restart` | `docker-compose.yml` | Restarts the stack's containers without recreating them. |
| `npm run data` | `scripts/load_data.py` | Downloads the published road data and serving SQL and loads them into your database. |
| `npm run migrate` | `scripts/migrate.py` | Applies `api/migrations/` to your database. |
| `npm run migrate:list` | `scripts/migrate.py` | Lists which migrations have been applied and which have not. |
| `npm run setup` | `npm run data`, then `npm run migrate` | Both loading steps in order. Use after first starting the stack. |

`scripts/db.py` works out the correct database address and waits for the database to answer. `scripts/data_source.py` defines where the published data is fetched from. Both are used by `load_data.py` and `migrate.py`.

## The two nginx configuration files

`nginx/default.conf` and `nginx/server.conf.example` describe the same routing: pages served from disk, `/tiles/` to Martin, `/api/` to the API, `/health` to the API. There are two files because the routing is applied in two places:

- `nginx/default.conf` is mounted into the nginx container by `docker-compose.yml`. It is what your own stack uses, and the services are named `martin` and `fastapi`.
- `nginx/server.conf.example` is copied by hand onto a staging or production server. It adds TLS, a real host name, a filesystem path, and services on `127.0.0.1`.

Apply any routing change to both files, so the local stack agrees with the servers.

## What is not in the repository

The road data, the pipeline that computes the safety scores, and the SQL that decides what the map may show (`update_score`, `survey_segments`, `crashes`) live in the models repository, <https://github.com/civictechdc/ridescoredc-models>. `scripts/load_data.py` downloads the data and SQL from a published data package. See [The data](/tracks/website-ui/the-data).

## Files that are never committed

`.gitignore` lists files and folders that stay local to a developer's machine.

| File or folder | What it is |
|---|---|
| `.env` | settings your machine needs when developing locally; copy from `.env.example` |
| `api/.env` | settings the application needs when developing locally; copy from `api/.env.example` |
| `node_modules/` | installed by `npm install` |
| `pg_data/`, `pg_data*/` | the local database's files |
