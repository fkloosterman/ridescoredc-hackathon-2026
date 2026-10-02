# Topic 10: PMTiles proof of concept

<Badge type="danger" text="Advanced" /> <Badge type="info" text="Architecture" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | <span class="chip">Data tools (tippecanoe, pmtiles)</span> + [Front-End](/tracks/website-ui/frontend-guide) <span class="or">or</span> <span class="chip">No install needed</span> (if you hand in a plan) |
| **Setup before Saturday** | About 20 minutes plus downloads. tippecanoe needs macOS, Linux or [WSL](/tracks/website-ui/windows-wsl) |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You enjoy web-mapping infrastructure and performance trade-offs |
| **What you can share** | A pull request or a plan, whichever fits |

</div>


*Related: [Topic 11: Write a spec](/tracks/website-ui/topics/11-write-a-spec) · [How the site works](/tracks/website-ui/how-the-site-works) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

Every street on the map is drawn from map tiles (small squares of map data). Today a live server and database build those tiles each time someone looks. That costs money and volunteer time in every environment. One static file could do the same job, making the site cheaper, faster and easier to run. The catch: the map's **Custom** sliders, which reweight the score live, depend on that database today.

### Why it matters

Static files would mean less to pay for and less to maintain for a small volunteer team, and would make the site easier for another city to copy. There's a real trade-off, and a proof of concept is the fastest way to see if it's worth it.

### Who it's for

- **The volunteers who run the servers**, who'd have less to maintain.
- **Visitors on slow connections**, who'd get tiles from a fast file host.
- **Other cities** that might reuse RideScore DC's open method without running a database.

### How it connects

- The tiles today come from the **serving** area of the database, built from the **Models track's** published data package.
- **Topic 11's** Proposal 0004 is about where the adjustable weights live, which decides whether static tiles can support them.
- The Full Stack guide shows how the current tile server is set up.

### Example ideas

- A static tile file for the default score only, compared side by side with today's map.
- Store each score component in the tiles and compute the weighted score in the browser.
- Keep the live server for the Custom panel and use static tiles for everyone else.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Front-End tools (Git, Node.js 20+, editor, GitHub account) | Show the tiles on the map | [Front-End Developer Guide](/tracks/website-ui/frontend-guide) |
| tippecanoe | Builds vector tiles from GeoJSON | [github.com/felt/tippecanoe](https://github.com/felt/tippecanoe) (macOS: `brew install tippecanoe`; Linux and WSL: build from source) |
| pmtiles CLI | Inspects and serves `.pmtiles` files | [github.com/protomaps/go-pmtiles](https://github.com/protomaps/go-pmtiles/releases) |
| Python with uv, or the Full Stack setup | Export the streets and scores to GeoJSON | [Setting Up Your Computer](/tracks/models/setting-up-your-computer) or the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) |

<span class="alert">Do this ahead of time.</span> Install tippecanoe and check that `tippecanoe --version` works. **tippecanoe doesn't run natively on Windows**, so Windows users run it in [WSL](/tracks/website-ui/windows-wsl).

### If something goes wrong

| Symptom | Fix |
|---|---|
| `tippecanoe: command not found` on Windows | Run it inside WSL. |
| The map shows nothing from your file | Register the `pmtiles` protocol before the map loads. Then check the layer's `source-layer` matches the layer name tippecanoe wrote (`pmtiles show yourfile.pmtiles`). |

## 2. Know before you start

- **How tiles work today.** Martin (the server that turns the database into map tiles) builds every tile on request from PostGIS (the database). That means a running server and database for every environment.
- **What PMTiles changes.** [PMTiles](https://docs.protomaps.com/pmtiles/) is a single static file holding a whole set of map tiles. A browser reads it directly from ordinary file hosting. You build it with tippecanoe (a command-line tool that turns GeoJSON into tiles).
- **The Custom weights are the hard part.** The Custom panel in Settings has sliders that reweight the score live. Moving one asks the database to recompute every score. Static tiles can't do that, unless the browser computes the score instead.
- **Get the data as GeoJSON.** Join `data.road_segment` (geometry and attributes) with `data.ridescore_v1_scores` (scores and components) on `segment_id`, and export it: with `ogr2ogr` or SQL from your local database, or with GeoPandas from the published data package's Parquet files.
- **MapLibre reads PMTiles with a small plugin.** Load the [pmtiles JavaScript library](https://github.com/protomaps/PMTiles/tree/main/js) and register its protocol, then point a source at `pmtiles://...`.
- **Work on a copy of the map page**, such as `frontend/pmtiles/index.html`, so the main map keeps working while you experiment.
- **Validate locally.** Serve the `.pmtiles` file from your own machine (`pmtiles serve`, or from `frontend/` with Vite).

## 3. The challenge

### Core goal (2–3 hours)

Choose one:

- **Proof of concept.** Build a PMTiles file of the streets with their default score, show it on a copy of the map page, and compare it with the Martin map: file size, load time, what looks different, and what's missing.
- **Plan.** A one- to two-page plan for moving to static tiles: how the file is built and published, how the Custom weights would work, what changes in deployment, and the trade-offs.

### Approaches

- Start with one zoom range and simple attributes; tune tippecanoe options later.
- For the Custom weights, store each score **component** in the tiles and compute the weighted score with a MapLibre expression in the browser.

### Stretch goals

- Make the Custom sliders work against the PMTiles file.
- Measure tile load times for both versions with the browser's Network tab.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

**Proof of concept:**

- [ ] Your page shows DC's streets from a `.pmtiles` file, colored by score, served locally.
- [ ] A short comparison with the Martin map: file size, load behavior, visual differences, missing features.
- [ ] Someone else could rebuild the file from your notes.

**Plan:**

- [ ] It covers building, publishing, the Custom weights, deployment changes, and what you'd lose or gain.
- [ ] It names the riskiest assumption and how to test it.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

A plan is just as welcome as a proof of concept. Large `.pmtiles` files are better linked from a Drive folder than committed.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [PMTiles documentation](https://docs.protomaps.com/pmtiles/) · [PMTiles with MapLibre](https://docs.protomaps.com/pmtiles/maplibre)
- [tippecanoe](https://github.com/felt/tippecanoe) · [MapLibre style expressions](https://maplibre.org/maplibre-style-spec/expressions/)
- [The data](/tracks/website-ui/the-data) · [How the site works](/tracks/website-ui/how-the-site-works)
