# Topic 9: PMTiles proof of concept

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

Every map tile today is generated on request by Martin from a live PostGIS database. That needs a running server and database for every environment. [PMTiles](https://docs.protomaps.com/pmtiles/) packs a whole tile set into one static file that a browser can read directly from ordinary file hosting, which could make the site cheaper, faster and easier to run.

The catch is the map's **Custom** weights: moving a slider asks the database to recompute every score. Static tiles can't do that unless the score is computed in the browser instead.

### Why it matters

Running a live tile server and database costs money and volunteer time, and every environment (local, dev, production) needs one. If the map could be served as static files from ordinary hosting, the site would be cheaper, faster and easier for a small volunteer team to keep running, and easier for another city to copy. The trade-off is real, though, and a proof of concept is the fastest way to find out whether it's worth it.

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

<span class="alert">Do this ahead of time.</span> Install tippecanoe and check `tippecanoe --version` works. **tippecanoe doesn't run natively on Windows**; Windows users need [WSL](/tracks/website-ui/windows-wsl).

### If something goes wrong

| Symptom | Fix |
|---|---|
| `tippecanoe: command not found` on Windows | Run it inside WSL. |
| The map shows nothing from your file | Check the `pmtiles` protocol is registered before the map loads, and that the layer's `source-layer` matches the layer name tippecanoe wrote (`pmtiles show yourfile.pmtiles`). |

## 2. Know before you start

- **Get the data as GeoJSON.** Join `data.road_segment` (geometry and attributes) with `data.ridescore_v1_scores` (scores and components) on `segment_id`, and export it: with `ogr2ogr` or SQL from your local database, or with GeoPandas from the published data package's Parquet files.
- **MapLibre reads PMTiles with a small plugin.** Load the [pmtiles JavaScript library](https://github.com/protomaps/PMTiles/tree/main/js) and register its protocol, then point a source at `pmtiles://...`.
- **Work on a copy of the map page.** Put your experiment in a new page (for example `frontend/pmtiles/index.html`) so the main map keeps working.
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
Nothing on this page is a hard rule, and the scope is yours to shape. Use this list to know when you have something worth showing, not as a test to pass. Take the topic somewhere unexpected, combine it with another, or stop at whatever you finish: an honest half-built idea with good notes is a great outcome. This is a collaborative event, not a competition. Ask us anything, help the team next to you, and bring something only you would think of.
:::

**Proof of concept:**

- [ ] Your page shows DC's streets from a `.pmtiles` file, colored by score, served locally.
- [ ] A short comparison with the Martin map: file size, load behavior, visual differences, missing features.
- [ ] The steps to rebuild the file are written down, so someone else can repeat them.

**Plan:**

- [ ] It covers building, publishing, the Custom weights, deployment changes, and what you'd lose or gain.
- [ ] It names the riskiest assumption and how to test it.

## 5. Hand in

Share whatever you got to, in whichever form fits:

- **Code:** a pull request against `develop`; a draft is fine.
- **Anything that isn’t code:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

A plan is just as welcome as a proof of concept. Large `.pmtiles` files are better linked from a Drive folder than committed.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor; unfinished work is welcome, and we can help you wrap it up afterwards.

## Resources

- [PMTiles documentation](https://docs.protomaps.com/pmtiles/) · [PMTiles with MapLibre](https://docs.protomaps.com/pmtiles/maplibre)
- [tippecanoe](https://github.com/felt/tippecanoe) · [MapLibre style expressions](https://maplibre.org/maplibre-style-spec/expressions/)
- [The data](/tracks/website-ui/the-data) · [How the site works](/tracks/website-ui/how-the-site-works)
