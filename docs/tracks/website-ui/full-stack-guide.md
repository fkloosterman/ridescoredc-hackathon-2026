# Full Stack Developer Guide

**For you if:** you need to work on the database, the survey API, the tile server, or nginx settings. For example, changing what the survey stores, adding an API endpoint, or working offline.

**What you will run:** four programs in Docker, plus the real DC road data loaded from a published data package.

| Program | Job |
|---|---|
| nginx | Traffic manager: handles incoming requests and routes them to the right backend service |
| Martin | Turns road and crash data into map tiles |
| the API | Records a survey response |
| PostgreSQL | Database holding the safety scores and the user feedback |

Terminology: the *pages* are what a browser runs, the *API* is the Python service in `api/`, and the *site* is all of it together.

## Step 0: Do the front-end guide first

Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide) first. The steps below assume you have the repository, a branch, and `npm install` done.

## Step 1: Install additional tools

- [Docker Desktop](https://docs.docker.com/get-started/get-docker/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/), which runs Python tools without installing them

```sh
docker --version
uv --version
docker info
```

Start Docker Desktop before continuing. `docker --version` answers even when Docker is not running; `docker info` fails until Docker Desktop is started. On Windows and macOS, the whale icon near the clock shows when it is ready. If Docker is not running, Step 3 fails with a low-level connection error.

You do not need to install Python, PostgreSQL, or the RideScore DC scoring pipeline. `uv` fetches what each command needs in an isolated environment.

On Windows, Docker Desktop runs containers on WSL2. Working in a WSL terminal is the smoother path and makes every command below the same as macOS and Linux (enable **Settings > Resources > WSL integration** for your distribution). PowerShell versions are given for anyone who prefers not to use WSL.

## Step 2: Configuration

Two files are used for configuration, split by who needs the setting:

| File | Holds | Exists where |
|---|---|---|
| `api/.env` | what the API needs: the database address and password | your machine and the servers |
| `.env` | what your machine needs: ports, where data is stored, which upstream | your machine only |

The question is always: does the running API need this, or only my laptop?

macOS, Linux and WSL:

```sh
cp api/.env.example api/.env
```

Windows (PowerShell):

```powershell
Copy-Item api/.env.example api/.env
```

You already created `.env` in the front-end guide. Check the settings:

```sh
npm run check-env
```

It prints the settings in effect and fails if anything is misplaced.

### If port 5432 for the database is taken

Find out whether anything already holds the port.

macOS, Linux and WSL:

```sh
lsof -i :5432
```

Windows (PowerShell):

```powershell
Get-NetTCPConnection -LocalPort 5432 -ErrorAction SilentlyContinue
```

No output means the port is free and this section does not apply. If another PostgreSQL instance uses 5432, uncomment the `DB_PORT` line in `.env` and change the number. Unlike `VITE_UPSTREAM`, this line starts out commented, so you are adding a setting rather than changing one:

```text
DB_PORT=5544
```

The examples in this guide use the default 5432; substitute your own number if you set `DB_PORT`. Only the port on your machine changes: the programs inside Docker reach the database by its name on their own network.

## Step 3: Start the full stack

```sh
npm run stack
```

This checks the settings, then uses `docker compose up` to start the database, the Martin tile server, the FastAPI service, and nginx. The first run downloads the images and takes a few minutes. Leave it running; Ctrl-C stops it.

In another terminal, check the API is up.

macOS, Linux and WSL:

```sh
curl http://localhost:8000/health
# {"status":"ok"}
```

Windows (PowerShell):

```powershell
curl.exe http://localhost:8000/health
# {"status":"ok"}
```

Spell it `curl.exe`: Windows PowerShell has its own `curl`, a different program that does not understand these options. The database is empty at this point.

## Step 4: Load the data and create the tables

```sh
npm run setup
```

This does two things, which can also be run separately:

- `npm run data` downloads the latest published road data and loads it into the database. A *package* holds the roads, crashes and scores; a *bundle* holds the SQL deciding what is visible on a map.
- `npm run migrate` creates the survey tables.

::: details Reference: loading different data versions
```sh
npm run data -- --version 0.1                 # a particular published release
npm run data -- --package DIR --bundle DIR    # something you built yourself locally
npm run data -- --database URL                # a database other than your own

npm run migrate:list                          # what has been applied, and what has not
npm run migrate -- --rollback                 # undo the most recent migration
```

The `--package` form is the one to use while working on the scoring pipeline: build a run with `ridescore build`, then load the result straight from its output folder without publishing anything.
:::

::: details Reference: the commands underneath
`npm run data` and `npm run migrate` are aliases. Each prints the command it runs before running it, so you can copy and run it yourself, for example:

```sh
uv run https://raw.githubusercontent.com/.../load_package.py \
  --package https://github.com/.../ridescoredc-data-preview.tar.gz \
  --bundle https://github.com/.../ridescoredc-bundle-preview.tar.gz \
  --database postgres://postgres:***@127.0.0.1:5432/db
```

The password is hidden in that line; everything else is exactly what runs. The commands themselves are `scripts/load_data.py` and `scripts/migrate.py`, written in Python with no dependencies, so the same commands work on a server. The location of the published data is in `scripts/data_source.py`; every value there can be overridden in `.env`.
:::

::: details Reference: restarting one service
```sh
npm run restart -- martin     # after changing what the database serves
npm run restart -- nginx      # after editing nginx/default.conf
npm run restart               # everything
npm run stack:logs            # watch the logs
```

Service names are those in `docker-compose.yml`: `nginx`, `martin`, `fastapi`, `db`.

Editing a page does not need a restart: nginx reads pages from disk on every request. Editing `api/main.py` does not either; that container reloads itself. Configuration files are the exception: `nginx/default.conf` and `martin.yaml` are read once at startup and need a restart of the service.
:::

::: details Reference: writing a migration
Add a file to `api/migrations/`, numbered after the last one, then run `npm run migrate`. Running it twice does nothing, because yoyo records what it has already applied.

Never edit a migration that has been applied anywhere. Write a new one.
:::

## Step 5: Check it works

- Open <http://localhost:8000>: the map, with streets colored by score.
- Open <http://localhost:8000/survey/>: a plain map for user feedback.

Test from the command line.

macOS, Linux and WSL:

```sh
for t in update_score survey_segments crashes; do
  echo -n "$t "
  curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:8000/tiles/$t/14/4684/6265"
done
# update_score 200
# survey_segments 200
# crashes 200
```

Windows (PowerShell):

```powershell
foreach ($t in 'update_score', 'survey_segments', 'crashes') {
  $code = curl.exe -s -o NUL -w '%{http_code}' "http://localhost:8000/tiles/$t/14/4684/6265"
  "$t $code"
}
```

This tests three tile sources: `update_score` draws the scored map, `survey_segments` draws the survey's plain map, and `crashes` draws crash locations.

## Step 6 (optional): A browser that reloads itself

The stack does not reload the browser when you edit a page. If you want that, run Vite alongside it.

First, point Vite at the local stack. `.env` already has an active `VITE_UPSTREAM` line from the front-end guide. Change that line; do not add a second one. `.env.example` carries both addresses with one commented out, so the edit is swapping which is which:

```text
# VITE_UPSTREAM=https://dev.ridescoredc.com
VITE_UPSTREAM=http://localhost:8000
```

Two active `VITE_UPSTREAM` lines are caught as an error by `npm run check-env`. Then run:

```sh
npm run dev
```

`npm run dev` reads `.env` once, at start, so restart it after changing `.env`. Vite gives you a second address serving the same files from `frontend/`:

| | localhost:8000 | localhost:5173 |
|---|---|---|
| serves the pages | nginx | Vite |
| pages come from | `frontend/` | `frontend/` |
| tiles and the API come from | your stack | wherever `VITE_UPSTREAM` points |
| reloads the browser for you | no | yes |

If you run both, set `VITE_UPSTREAM` to your own stack. Left at its default it names the shared development server, so the two addresses would show different data.

## Reference

### How a request is answered

Everything arrives at nginx on port 8000, and nginx decides what happens next:

| You ask for | Answered by | Reading |
|---|---|---|
| `/`, `/survey/` | nginx, straight from disk | `frontend/` |
| `/tiles/...` | Martin | the serving area of the database |
| `/api/...` | the API | the app area of the database |
| anything else | nginx | a 404, which never reaches the API |

The map never touches the API. Streets, scores and crashes all come from Martin reading the database directly. The API is involved only when a survey is submitted. See [How the site works](/tracks/website-ui/how-the-site-works) for more.

### How the database is arranged

| Area | Holds | Written by |
|---|---|---|
| `data` | roads, crashes, scores | the loader, replaced wholesale on each load |
| `app` | survey responses | the API |
| `serving` | views and functions deciding what the map may show | the bundle |

The map only ever reads `serving`.

### Looking at the data

Use `psql` to run SQL against the database.

macOS, Linux and WSL:

```sh
PGPASSWORD=localdev psql -h 127.0.0.1 -p 5432 -U postgres -d db
```

Windows (PowerShell):

```powershell
$env:PGPASSWORD = 'localdev'
psql -h 127.0.0.1 -p 5432 -U postgres -d db
```

This needs `psql` installed. Otherwise use the copy inside the database container:

```sh
docker compose exec db psql -U postgres -d db
```

Example statements:

```sql
-- Count the road segments
select count(*) from data.road_segment;
-- The first five road segments shown on the survey page
select * from serving.survey_segments limit 5;
-- Submitted survey responses
select * from app.survey_submissions;
-- Which data package is loaded
select package from data.load_record limit 1;
```

### Working on the survey API

`api/main.py` is the API. It currently defines only two functions: it records a survey response and reports whether the database can be reached. The container restarts the API when you save the file.

A survey response records the street by its durable id (`segment_id`, text), not by a row number. The page uses an integer `tile_id` internally because the mapping library needs an integer, but that number should not be stored with a survey response.

### Starting over

Stop the containers:

```sh
npm run stack:down
```

Optionally delete the database. macOS, Linux and WSL: `rm -rf pg_data`. Windows (PowerShell): `Remove-Item -Recurse -Force pg_data`. Then restart:

```sh
npm run stack
```

If you deleted the database, run `npm run setup` again. Anything you submitted through the survey locally is lost. To keep the old database instead, point `DB_DATA_DIR` in `.env` at a new directory and start again.

## If something goes wrong

- **`npm run stack` fails saying a port is in use.** Something else holds 5432 or 8000. Set `DB_PORT` in `.env` for the database. For 8000, find what is using it, or change the published port in `docker-compose.yml` locally without committing the change.
- **The loader cannot connect.** Use `127.0.0.1`, not `db`: `db` is the name programs inside Docker use for each other and means nothing on your machine. Check the port matches `DB_PORT`.
- **A tile source returns 404, or the map shows no roads.** The tile server reads the database when it starts and publishes what it finds then. A stack started before any data was loaded publishes nothing until restarted with `npm run restart -- martin`. `npm run data` does this for you; you would only hit this after changing what the database serves some other way, such as applying SQL by hand.
- **Streets are missing from the map.** Confirm `npm run data` reported about 13,829 rows.
- **The pages show the shared server's data.** Read the *tiles and API* line at startup.
- **The database will not accept a connection.** `npm run data` and `npm run migrate` wait up to 90 seconds for the database, then say what to check. A first start takes about 20 seconds while the database builds itself.
