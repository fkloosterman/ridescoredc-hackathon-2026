# Reference: Using bikescore-bna

*Cross-cutting reference. Used by Challenge 2 (Base map) and Challenge 3 (Data pipeline), and mentioned in Challenge 1 (Safety scores). The challenge pages hold the project ideas and the main code; this page holds what they share.*

[bikescore-bna](https://github.com/bright-fakl/bikescore-bna) is an open-source library that computes the PeopleForBikes [Bicycle Network Analysis](https://bna.peopleforbikes.org/) (BNA) for one US city, from open data, with no database or server. We built it, but we have not fully validated or explored it, and it is not part of the RideScore DC pipeline. You will not change the library. You borrow from it, at one of three levels. Pick the smallest that does the job.

| Use | Stages | Needs | Verified while writing this page |
|---|---|---|---|
| **1. OSM segmentation and preprocessing:** OSM in, clean segments with attributes out | `parse → attributes → segment` (optionally `stress`) | one OSM extract and a boundary polygon | **yes**, on a small synthetic street grid |
| **2. Stress rules as a model:** LTS from speed, lanes and bike infrastructure | the `stress` rule tables | a table of streets with the right columns | **yes**, on the repo's DDOT test extract |
| **3. Whole-city analysis:** access to destinations, 0 to 100 ratings | all eleven stages | OSM, Census and LODES downloads | no: downloads were not reachable |

**Where each is used:** level 1 is Challenge 2 (idea 3.3) and Challenge 3 (idea 3.3); level 2 is Challenge 3 (idea 3.1); the two stress scales are explained in Challenge 1. Full library documentation: [https://bright-fakl.github.io/bikescore-bna/](https://bright-fakl.github.io/bikescore-bna/).

---

## 1. The idea to understand: rules are data

Neither the stress rules nor the OSM-tag interpretation are hard-coded in Python. Both are **decision tables** (ordered, first-match-wins rules with a `when` and a `set`) inside a YAML **scenario**. You can load a table, apply it to any data with the right columns, and edit it. See [Extensibility](https://bright-fakl.github.io/bikescore-bna/reference/extensibility/) and [Stress rules](https://bright-fakl.github.io/bikescore-bna/reference/stress-rules/).

## 2. What the OSM stages do

The full pipeline has eleven stages: `parse → census → jobs → attributes → segment → stress → graph → connectivity → destinations → scores → neighborhood`. Only four matter for segmentation:

| Stage | Input | What happens | Output (in `<run>/<stage>/`) |
|---|---|---|---|
| `parse` | OSM PBF file + boundary | reads highway ways, intersection nodes and their traffic-control flags (signals, stops, crossings) in one pass | `ways_raw.parquet`, `nodes.parquet` |
| `attributes` | raw ways | rule tables turn OSM tags into lanes per direction, speed (mph), bike infrastructure per direction, one-way, parking, width and a functional class. Missing values are filled with defaults and flagged (`speed_limit_imputed`, `ft_lanes_imputed`, …) | `ways_classified.parquet` |
| `segment` | classified ways + nodes + boundary | splits each way at every node that is shared with another way, splits at the boundary, removes dead-end chains outside the city | `segments.parquet` |
| `stress` | segments + nodes | assigns stress to each segment and intersection | `stress.parquet` |

### How it segments

- **Splits at shared nodes.** A way is cut wherever a node is used by another way (an intersection), and nowhere else.
- **Each segment inherits its parent way's attributes** (class, speed, lanes, bike infrastructure).
- **Handles the boundary.** Ways that cross the boundary are kept whole in the extract, split at the boundary, and dead-end chains left outside the city are removed. This matters at the DC line, where streets continue into Maryland and Virginia.
- **Keeps `start_node_id` and `end_node_id`** for every segment, plus `osm_id` of the parent way.
- **Flags what it filled in**, so you can measure how much of the network is guessed.
- **Splits bike infrastructure and lanes by direction:** `ft` is with the way's digitised direction, `tf` is against.
- **Its `road_id` and `segment_id` are row numbers** (0, 1, 2, …), so they are not stable keys, although the library's documentation says the id is the end node. Use `osm_id` plus `start_node_id` and `end_node_id`.

What to check when comparing it with another segmentation is in **Challenge 2, idea 3.3**.

### Not covered by bikescore-bna

- **Crashes, pavement condition, and DDOT-specific fields** such as `slow_street` come from other sources.
- **Its segments are for routing, not necessarily for drawing.** RideScore DC also simplifies and de-duplicates geometry for the map (`network/geometry.py`). Decide whether that still applies.
- **The library aims to match the original SQL analysis in the PeopleForBikes implementation, but it is not fully validated.** Its README reports comparisons against reference output for one city (Aspen, Colorado). It has not been validated for DC. Reusing pieces of it, as here, carries no guarantee of parity, and choices it made for parity may not be the ones RideScore DC wants.

---

## 3. Make it available

**In a one-off script or notebook, with no change to the repo:**

```sh
uv run --with git+https://github.com/bright-fakl/bikescore-bna python my_experiment.py
```

For Jupyter, from the `ridescoredc-models` root:

```sh
uv run --group notebooks --with git+https://github.com/bright-fakl/bikescore-bna jupyter lab
```

**When you add it to the pipeline** as an optional extra in `pyproject.toml`, see Challenge 3, idea 3.1. Python 3.11+ is required (the pipeline already needs 3.12+).

**Optional: `osmium-tool`.** Clipping a regional OSM file to a boundary is about 8x faster with the `osmium` command-line tool (`sudo apt install osmium-tool` or `brew install osmium-tool`). Results are identical without it.

---

## 4. Recipes

### Recipe A: A tiny test network, with no download

For trying the OSM stages in seconds. Save the following code as `make_pbf.py`. It writes a 3 by 3 street grid near downtown DC, with a mix of road classes, speed limits, lanes and bike lanes, plus a boundary polygon:

```python
"""A 3x3 street grid near downtown DC, as a tiny OSM PBF, plus a boundary polygon."""

import json, sys, osmium

out = sys.argv[1]

lon0, lat0, d = -77.040, 38.900, 0.0012          # about 100 m spacing

grid = {(r, c): 1 + r * 3 + c for r in range(3) for c in range(3)}

w = osmium.SimpleWriter(f"{out}/osm-grid.pbf")

for (r, c), n in grid.items():

    w.add_node(osmium.osm.mutable.Node(id=n, location=(lon0 + c * d, lat0 + r * d), tags={},

                                       version=1, timestamp="2026-01-01T00:00:00Z"))

def way(i, cells, tags):

    w.add_way(osmium.osm.mutable.Way(id=i, nodes=[grid[x] for x in cells], tags=tags,

                                     version=1, timestamp="2026-01-01T00:00:00Z"))

way(101, [(0,0),(0,1),(0,2)], {"highway": "residential", "maxspeed": "25 mph"})

way(102, [(1,0),(1,1),(1,2)], {"highway": "secondary", "lanes": "2", "maxspeed": "30 mph", "cycleway": "lane"})

way(103, [(2,0),(2,1),(2,2)], {"highway": "residential"})

way(201, [(0,0),(1,0),(2,0)], {"highway": "tertiary", "lanes": "2"})

way(202, [(0,1),(1,1),(2,1)], {"highway": "residential", "maxspeed": "20 mph"})

way(203, [(0,2),(1,2),(2,2)], {"highway": "primary", "lanes": "4", "maxspeed": "35 mph", "cycleway": "track"})

w.close()

pad = 0.003

b = [lon0 - pad, lat0 - pad, lon0 + 2 * d + pad, lat0 + 2 * d + pad]

ring = [[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]], [b[0], b[1]]]

json.dump({"type": "FeatureCollection", "features": [

    {"type": "Feature", "properties": {}, "geometry": {"type": "Polygon", "coordinates": [ring]}}]},

    open(f"{out}/boundary-grid.geojson", "w"))

mkdir -p data
```

Then run:

```sh
uv run --with git+https://github.com/bright-fakl/bikescore-bna python make_pbf.py data

uv run --with git+https://github.com/bright-fakl/bikescore-bna python osm_segments.py data run
```

`osm_segments.py` is in **Challenge 2, idea 3.3**. The file names matter: the library looks for `osm-*.pbf` and `boundary-*.geojson`. Expected output: `12 segments from 6 OSM ways`, because each of the six ways is split where it meets another. Look at the result:

```python
import geopandas as gpd

segments = gpd.read_parquet("run/segment/segments.parquet")

segments[["osm_id", "start_node_id", "end_node_id", "functional_class", "speed_limit", "ft_lanes", "tf_lanes", "ft_bike_infra", "speed_limit_imputed"]]
```

For a real area, put a real OSM extract and boundary in a folder using the same file names, from `bikescore-bna acquire` (needs network access to Geofabrik and Census) or from a [Geofabrik](https://download.geofabrik.de/) download clipped with `osmium extract`.

### Recipe B: Feed OSM segments into the RideScore DC models

Shows that OSM-derived segments can flow into a model that already exists in the pipeline, `ridescore_v1`. This is also the shape of an "OSM road source" for the pipeline: something that returns a street table with the columns the models read (Challenge 3, idea 3.3). Save as `osm_source.py`:

```python
"""Turn bikescore-bna's OSM segments into the street table the ridescore models read."""

from __future__ import annotations

import geopandas as gpd

import numpy as np

import pandas as pd

# OSM highway class (bikescore-bna `functional_class`) -> the names ridescore uses

OSM_TO_FUNCTION = {

    "motorway": "Other Freeway and Expressway", "motorway_link": "Other Freeway and Expressway",

    "trunk": "Other Freeway and Expressway", "trunk_link": "Other Freeway and Expressway",

    "primary": "Principal/Primary Arterial", "primary_link": "Principal/Primary Arterial",

    "secondary": "Minor Arterial", "secondary_link": "Minor Arterial",

    "tertiary": "Collector", "tertiary_link": "Collector",

    "residential": "Local", "unclassified": "Local", "living_street": "Local",

}

INFRA_TO_FACILITY = {"track": "protected_track", "buffered_lane": "buffered_lane", "lane": "painted_lane"}

FACILITY_RANK = {"protected_track": 3, "buffered_lane": 2, "painted_lane": 1, "none": 0}

def _best_facility(ft: pd.Series, tf: pd.Series) -> pd.Series:

    """The better of the two directions, as ridescore's facility names."""

    both = pd.concat([ft.map(INFRA_TO_FACILITY), tf.map(INFRA_TO_FACILITY)], axis=1).fillna("none")

    rank = both.apply(lambda col: col.map(FACILITY_RANK))

    return both.where(rank.eq(rank.max(axis=1), axis=0)).bfill(axis=1).iloc[:, 0]

def to_ridescore(segments: gpd.GeoDataFrame) -> gpd.GeoDataFrame:

    """One row per OSM segment, with the columns `ridescore_v1` needs."""

    out = gpd.GeoDataFrame(index=segments.index, geometry=segments.geometry, crs=segments.crs)

    # bikescore-bna's `road_id` / `segment_id` are row numbers, so they are not keys. This is.

    out["segment_id"] = (

        segments["osm_id"].astype(str) + ":" + segments["start_node_id"].astype(str)

        + "-" + segments["end_node_id"].astype(str)

    )

    out["function"] = segments["functional_class"].map(OSM_TO_FUNCTION).fillna("Other")

    out["speed_limit"] = segments["speed_limit"].astype(int)

    out["num_lanes"] = (segments["ft_lanes"].fillna(0) + segments["tf_lanes"].fillna(0)).astype(int)

    # ridescore keeps the raw value beside the filled one; bikescore-bna flags what it filled in

    imputed = segments["ft_lanes_imputed"].fillna(False) | segments["tf_lanes_imputed"].fillna(False)

    out["num_lanes_raw"] = out["num_lanes"].where(~imputed, np.nan)

    out["bike_facility_type"] = _best_facility(segments["ft_bike_infra"], segments["tf_bike_infra"])

    out["road_width"] = segments["width_ft"]

    out["pavement_condition"] = None      # OSM has no pavement condition index

    out["crash_count_5yr"] = 0            # replace with the pipeline's crash join (see below)

    return out
```

Score it with the existing model, from `ridescoredc-models`:

```python
import geopandas as gpd
import osm_source

from ridescore.models.ridescore_v1 import scores, weights

segments = gpd.read_parquet("run/segment/segments.parquet")

streets = osm_source.to_ridescore(segments)

result = scores.score(streets, weights.load(), p95_crashes=1)

print(result[["lts_level", "s_lts", "s_crash", "s_facility", "ridescore_v1"]])
```

On the test grid this runs end to end, and the primary road with a protected track scores 91 while an unmarked tertiary scores 36.

**Left for you to try:**

- **Crashes.** The pipeline's own `network/crash_join.py` counts crashes near each segment. Run it on the OSM segments to fill `crash_count_5yr` instead of the 0 above. It works on any street geometry, but I did not run it on OSM output.
- **The pipeline itself.** To make this a real source, add an OSM fetch step (the only step allowed on the network) and `normalise`-like code that yields the columns above. bikescore-bna can play the `normalise` part.
- **Keep the `-preview` naming** for any data package built from OSM, since nothing built from OSM is comparable with data built from DDOT blocks.

### Recipe C: Change the rules and see what moves

Dump the default scenario, edit the rule table, and re-score:

```sh
uv run --with git+https://github.com/bright-fakl/bikescore-bna bikescore-bna scenario show default > my-scenario.yaml
```

The segment stress rules are under `stress_segment:`, and the OSM-tag rules are in the attribute registry. Then, with the `bna_stress` module from **Challenge 3, idea 3.1**:

```python
from pathlib import Path

bna = bna_stress.score(segments, scenario=Path("my-scenario.yaml"))   # a Path, not a string
```

Pass a **`Path`** for a file. A plain string is looked up as a *bundled* scenario name and fails. For quick single-value tweaks use overrides: `build_config("default", {"city.default_speed": 40})`. Rule syntax: [Edit the stress rules](https://bright-fakl.github.io/bikescore-bna/tutorial/adjust-stress-yaml/).

### Recipe D: Whole-city analysis for DC

1. Create `washington-dc/city.toml` (`name`, `slug`, `region = "District of Columbia"`, `country = "united states"`, `fips_code`). Verify the FIPS code against the Census list. See [Data acquisition](https://bright-fakl.github.io/bikescore-bna/how-it-works/data-acquisition/).
2. `bikescore-bna acquire ./washington-dc`, then `bikescore-bna score ./washington-dc --out-dir ./washington-dc/runs/first`.
3. Results are in `runs/first/<stage>/`. See [Output files](https://bright-fakl.github.io/bikescore-bna/reference/output-files/).
4. To combine with RideScore DC's DDOT-based streets you need a spatial join, since there is no shared key: project both to a metric CRS, then for each block take the overlapping or nearest OSM segments (for example `sjoin_nearest` with a small `max_distance`). Decide how to combine several OSM segments into one block, and report the unmatched ones.

---

## 5. Where to go next

| Topic | Read |
|---|---|
| how the OSM stages work | [OSM parsing](https://bright-fakl.github.io/bikescore-bna/how-it-works/osm-parsing/), [Road attributes](https://bright-fakl.github.io/bikescore-bna/how-it-works/road-features/), [Segmenting](https://bright-fakl.github.io/bikescore-bna/how-it-works/segmenting/) |
| how stress is computed | [How stress works](https://bright-fakl.github.io/bikescore-bna/how-it-works/stress/) |
| every command and output file | [CLI](https://bright-fakl.github.io/bikescore-bna/reference/cli/), [Output files](https://bright-fakl.github.io/bikescore-bna/reference/output-files/) |
| the planned OSM road network and stable keys | the `ridescoredc-models` wiki, proposals 0001 and 0007 (0007 is not written yet) |
