# Challenge 2: Build a stable base map of bike infrastructure

**Goal.** Start from OpenStreetMap and incorporate features and attributes from other sources, such as Open Data DC.

The hard parts are how to segment OSM roads, how to fill in missing tags, and how to keep a street's ID the same when the data is rebuilt. The goal is for every safety score in RideScore DC to be computed on this base map. Today the pipeline uses Open Data DC roads, but the plan is to switch to OSM, and how to segment and preprocess OSM is still an open question.

*Related pages: [Setting Up Your Computer](/tracks/models/setting-up-your-computer) · [Submitting Your Work](/tracks/models/submitting-your-work) · [Data Snapshot Description](/tracks/models/snapshot-data) · [Challenge 1: Safety scores](/tracks/models/challenge-1) · [Challenge 3: Data pipeline](/tracks/models/challenge-3)*

---

## 1. Set up (before Saturday)

<span class="alert">Do this ahead of time.</span> First complete the [**Setting Up Your Computer**](/tracks/models/setting-up-your-computer) guide (git, a GitHub account, uv, and your own copy of the code on a branch of your own); it takes about 10 minutes. Then come back here and run the steps below **from the repository folder** (the one that contains `pyproject.toml`). They take about 5 more minutes, plus downloads.

**What you will use:** Python, uv and Jupyter. uv provides all three: Python itself, and JupyterLab, OSMnx and the other libraries through the project.

### Step 1: Install the project's libraries

```sh
uv sync --group notebooks
```

The first execution of this command downloads several libraries and can take a few minutes. After that it is quick. This installs JupyterLab, OSMnx, folium and the other libraries the basemap notebook uses into a `.venv` folder inside the repository.

### Step 2: Check that it works

```sh
uv run --group notebooks python -c "import geopandas, jupyterlab; print('ok')"

uv run --group notebooks jupyter lab
```

The first command should print `ok`. The second starts JupyterLab and prints a local address (`http://localhost:8888/...`). Most computers open it in your browser automatically; if yours doesn't, copy the address into a browser. On WSL, the address works in your Windows browser too. Press Ctrl+C in the terminal to stop it.

### Step 3: Run the basemap notebook once

The basemap notebook builds the snapshot. Use it if you want to see or change how the snapshot is built.

1. In JupyterLab, open `notebooks/BaseData/OSM_BaseData.ipynb`.
2. In the Parameters cell, check `SUBSET`:
    - `SUBSET = 1` (the default): a small committed area (Dupont, Logan and Shaw). It's fast and needs no internet. Choose **Run &gt; Run All Cells**. On a test machine it finished in about 15 seconds.
    - `SUBSET = 0`: all of DC, pulled live from OpenStreetMap and DC Open Data. It's slow, so <span class="alert">run it once before Saturday</span>. It saves everything to `cache/`, so later runs are quick. Budget real time for it.

If you only want the finished snapshot to look at, download it instead (see Challenge 1, Step 3).

### If something goes wrong

| Symptom | Fix |
|---|---|
| The notebook can't find its data files | Start JupyterLab from the repository folder (the one with `pyproject.toml`), and open the notebook from there, so its relative paths resolve. |
| `SUBSET = 0` fails partway | It needs network access to OpenStreetMap and DC Open Data. Check your connection and run it again. It resumes from `cache/`. |

Problems with `uv`, `git`, Python or Windows paths? See the table at the end of the [**Setting Up Your Computer**](/tracks/models/setting-up-your-computer) guide.

## 2. Know before you start

- **Road segment IDs in a snapshot you rebuild won't match the IDs in other teams' snapshots.** The segment ID (`osm_u`, `osm_v`, `osm_key`) only holds within one build, and changes when OSM is edited. Making it more stable is part of the challenge.
- **How the snapshot is built today:** OSM segments, split wherever something about the street changes, each conflated against the DC Roadway SubBlock spine, meaning matched to the SubBlock it runs along. 93% of segments match well, 2% weakly, 5% not at all. Columns, match quality and caveats are in the [**Snapshot Data**](/tracks/models/snapshot-data) document.
- **There's no rule yet for which source to trust.** DDOT is far more complete for speed limit and lanes (84% and 100% filled, against 30% and 48% in OSM). OSM is better for bike facilities and is updated faster.
- **Whatever you build has to feed the scoring pipeline.** Models read a street table with attributes such as function, lanes, speed limit and bike facility. The more of those you can fill reliably, the better the scores.

## 3. Project ideas

You do not need to complete every stretch goal. For a four-hour project, a small working improvement, a useful analysis, or a convincing proof of concept is a successful outcome.

### 3.1 Combine OpenStreetMap and DC Open Data

**Level:** Beginner → Intermediate

**Background.** RideScore DC uses OpenStreetMap (OSM) as its base street network, enriched with DC Open Data. The two sources often describe the same street differently. OSM contains many useful descriptions of bicycle infrastructure and is a more portable data source, while DC Open Data is more complete for fields like speed limits and lanes. Deciding which attribute to take from which source is fine-grained tuning that still needs to be done.

**The challenge.** Choose one or more attributes and work out how OSM and DC Open Data should be combined for each: when to trust one, when to fall back on the other, and how to handle disagreements. The project does not need to cover every attribute. A useful first step could be to focus on a single type of infrastructure, such as bicycle facilities.

**What you'll learn.** OpenStreetMap, geospatial data processing, data integration, and Python data pipelines.

**Resources.**

- [Basemap notebook](https://github.com/civictechdc/ridescoredc-models/blob/develop/notebooks/BaseData/OSM_BaseData.ipynb): how OSM and DC Open Data are joined today
- [RideScore DC models repository](https://github.com/civictechdc/ridescoredc-models)
- [OpenStreetMap](https://openstreetmap.org/)
- The snapshot, which has both sources side by side (see the [Snapshot Data](/tracks/models/snapshot-data) guide)

**Stretch goals.**

- Cover several attributes.
- Compare OSM and DC Open Data representations of the same infrastructure.
- Investigate discrepancies between the two sources, including by ward (`dc_WARD_ID`).
- Use the combined attributes in a safety model.

### 3.2 Separate cycle tracks

**Level:** Intermediate

**Background.** Some protected bike lanes are mapped in OSM as their own line next to the street. In the snapshot, these tracks copy the neighboring street's DC attributes, like speed and lanes, so a protected track can look as stressful as the arterial beside it. Because the street and the track both exist, network length or connectivity totals can also count the corridor twice.

**The challenge.** Find the separately mapped cycle tracks and decide how a safety model should treat them. Should they be scored as their own facility, or folded into their parent street? Implement your approach and show how it changes the scores.

**What you'll learn.** Geospatial relationships between features, and how data representation choices affect model outputs.

**Resources.**

- The snapshot: `osm_highway = cycleway` segments matched to a DC street
- The [Snapshot Data](/tracks/models/snapshot-data) guide: "Separate cycle tracks copy the street beside them"

**Stretch goals.**

- Link each track to its parent street segment.
- Measure how much double-counting affects network length or connectivity.
- Propose a rule the pipeline could adopt.

### 3.3 Try a different way to segment and preprocess OSM

**Level:** Intermediate → Advanced

**Background.** The basemap notebook is one answer to "how do we turn OSM into clean street segments?". It is not the only one. [bikescore-bna](https://github.com/bright-fakl/bikescore-bna) is an open-source library that does this end to end for any US city: it reads the OSM extract, turns tags into lanes, speed, bike infrastructure and a road class (filling gaps with defaults it flags), splits each way where it meets another, and handles the city boundary. It is a candidate for how RideScore DC segments and preprocesses OSM in future. We built bikescore-bna, but we have not fully validated or explored it, and it is not part of the pipeline, so part of the job is finding out whether it holds up.

**The challenge.** Run bikescore-bna’s OSM stages on DC (or a small area) and compare the result with the basemap notebook's: segment count and length, how much is guessed, how bike facilities are recognised, and how stable the segment IDs are. Report what you find and recommend an approach.

**Run it.** Needs Python 3.11+ and `uv`. The `discover_inputs` function below looks for files named `osm-*.pbf` and `boundary-*.geojson` in a folder. Save the following code as `osm_segments.py`:

```python
"""Run bikescore-bna's OSM stages (parse, attributes, segment) on a datasets directory."""

import sys
from pathlib import Path

import geopandas as gpd

from bikescore_bna import build_config, discover_inputs, run_stage
from bikescore_bna.pipeline import PIPELINE

datasets_dir, out_dir = Path(sys.argv[1]), Path(sys.argv[2])

inputs = discover_inputs(datasets_dir)           # osm-*.pbf, boundary-*.geojson, …

config = build_config("default")

stages = {s.name: s for s in PIPELINE}

done = {}

for name in ("parse", "attributes", "segment"):

    (out_dir / name).mkdir(parents=True, exist_ok=True)

    run_stage(stages[name], done, inputs, out_dir / name, config)

    done[name] = out_dir / name

segments = gpd.read_parquet(done["segment"] / "segments.parquet")

print(f"{len(segments)} segments from {segments['osm_id'].nunique()} OSM ways")
```

Then run:

```sh
uv run --with git+https://github.com/bright-fakl/bikescore-bna python osm_segments.py data run
```

The output is `run/segment/segments.parquet`, one row per segment, with `osm_id` (the parent way), `start_node_id`, `end_node_id`, `functional_class`, `speed_limit`, `ft_lanes` and `tf_lanes`, `ft_bike_infra` and `tf_bike_infra` (per direction), and `*_imputed` flags that show what was filled in with a default. To get real DC data, download the DC extract from [Geofabrik](https://download.geofabrik.de/) and clip it to the DC boundary with `osmium extract`, or use the library's `bikescore-bna acquire` command (see its [documentation](https://bright-fakl.github.io/bikescore-bna/)). A step-by-step version with a tiny test network you can build in seconds is in the full bikescore-bna guide.

*Note: the above code was tested on a small synthetic street grid. Not yet run on the full DC extract.*

**What to look at.**

| Question | Why it matters | How to look |
|---|---|---|
| **Is there a stable key?** | Anything attached to a street (user feedback, other data) comes loose if the key changes when the data is rebuilt. | In the library's output, `road_id` and `segment_id` are plain row numbers (0, 1, 2, …), so they are **not** stable, although its documentation says the id is the end node. `osm_id` plus `start_node_id` and `end_node_id` is a better candidate. OSM ways get split and merged over time, so run it on two extracts a few months apart and count how many keys survive. |
| **Is the segment size right?** | One segment per block versus one per way changes averages, joins and map drawing. | Compare segment count and length distribution with the notebook's 28,978 segments and with DDOT's roughly 13,800 blocks, and look for very short or very long segments. |
| **How much is guessed?** | Sparse OSM tags mean defaults or imputation decide the score. | Share of segments with `speed_limit_imputed` or lanes imputed, split by road class. |
| **Are bike facilities recognised?** | Bike lane tags have many spellings (`cycleway`, `cycleway:left`, `:both`, `:buffer`, …). | Compare `ft_bike_infra` and `tf_bike_infra` counts with the notebook's and check a few streets you know. |
| **Are the right roads in?** | Footpaths, service roads, alleys and private ways. | Check which highway classes survive. The notebook leaves out alleys, sidewalks, service roads and motorways. |
| **Is the boundary handled well?** | The DC line is a city boundary, not a natural end to the street network. | Look at segments within 100 m of the boundary. |

**What you'll learn.** OSM tagging, network topology, and how a preprocessing choice changes every number downstream.

**Stretch goals.**

- Feed the library's segments into the existing scoring model and compare the scores with the current ones. (Challenge 3 has the adapter idea.)
- Propose a stable segment key and test it across two OSM dates.
- Add the OSM attributes the notebook doesn't have yet.

## 4. What to hand in

Suggested: the notebook or script, the rebuilt base map as a file (Parquet preferred) with its ID columns, and a short README covering what you changed, how IDs behave across a rebuild, and what it can't tell you. See [**Submitting Your Work**](/tracks/models/submitting-your-work) for the pull request process.
