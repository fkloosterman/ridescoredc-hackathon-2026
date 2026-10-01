# Challenge 3: Construct a production data pipeline

**Goal.** Build the pipeline that computes the safety scores and produces a publicly consumable data package, the same one the RideScore DC website uses.

The pipeline is the `ridescore` package in `ridescoredc-models`. It turns public DC data into our scored street network, with our implementation of Level of Traffic Stress and custom RideScore scores plus crash data. The pipeline **automates** the computation (one command instead of a hand-run notebook), makes it **repeatable** (every run records its sources, dates and settings) and **shared** (the output is a data package that the public can use and that the website loads to draw the map).

*Related pages: [Setting Up Your Computer](/tracks/models/setting-up-your-computer) · [Submitting Your Work](/tracks/models/submitting-your-work) · [Data Package Description](/tracks/website-ui/the-data) · [Bicycle Network Analysis (BNA)](/tracks/models/bikescore-bna) · [Challenge 1: Safety scores](/tracks/models/challenge-1) · [Challenge 2: Base map](/tracks/models/challenge-2)*

---

## 1. Set up (before Saturday)

<span class="alert">Do this ahead of time.</span> First complete the [**Setting Up Your Computer**](/tracks/models/setting-up-your-computer) guide (git, a GitHub account, uv, and your own copy of the code on a branch of your own); it takes about 10 minutes. Then come back here and run the steps below **from the repository folder** (the one that contains `pyproject.toml`). These steps take about 5 more minutes, plus downloads.

**What you will use:** Python and uv. uv provides Python itself and every library. You don't need Jupyter for the pipeline, but you can use it to try an idea in a notebook (see [idea 3.1](#_3-1-add-a-second-safety-model)).

### Step 1: Install the project's libraries

```sh
uv sync --group dev
```

The first execution of this command downloads several libraries and can take a few minutes. After that it is quick. This installs the pipeline and its test and lint tools (`pytest`, `ruff`) into a `.venv` folder inside the repository.

### Step 2: Check that it works

```sh
uv run pytest -q
```

This runs the tests inside the repository. All tests should pass, with no downloads. Then build the small committed test extract (34 real street blocks), which needs no network:

```sh
uv run ridescore build --cache tests/fixtures/snapshot --run-date 2026-08-05 --out out-fixture

uv run ridescore inspect --out out-fixture
```

`inspect` prints row counts, the network length, and the spread of every score. If you see those, your setup is good.

### Step 3: Run the real pipeline once

<span class="alert">Do this before Saturday.</span>

```sh
uv run ridescore run --run-date <<2026-09-30>>

uv run ridescore inspect
```

### If something goes wrong

| Symptom | Fix |
|---|---|
| `ridescore fetch` seems stuck | The ArcGIS server answers "still generating" first, and the pipeline waits and retries up to eight times. Give it a couple of minutes. |
| `fetch` fails with a status other than 200 | A source may have moved. Tell a mentor, and use the test extract (Step 2) in the meantime. |

Problems with `uv`, `git`, Python or Windows paths? See the table at the end of the [**Setting Up Your Computer**](/tracks/models/setting-up-your-computer) guide.

## 2. How it works

`ridescore run` does two steps, which you can also run separately:

| Step | Reads | Writes | Fails when |
|---|---|---|---|
| `ridescore fetch` | Data sources from the internet | `raw/<run-date>/` | A data source is down or has changed its URL |
| `ridescore build` | `raw/` only | `out/` | the data is wrong, such as duplicate IDs or weights that don't add up to 1 |

`build` works through each street in this order (the code is in `src/ridescore/build.py`):

1. Clean up lanes, speed limit, bike facility and road function. Where the source is blank, a default is filled in, and the raw value is kept next to it (`speed_limit` and `speed_limit_raw`).
2. Measure length in metres.
3. Count crashes near each street over the last five years.
4. Score the Level of Traffic Stress (LTS), the component scores and the blended RideScore.
5. Simplify geometry for the map. This comes last, so crash scores are calculated over the whole network.
6. Write the files. Every road segment identifier (`segment_id`) must be unique, or the build stops.

### What you get (in `out/`)

| File | One row per | Holds |
|---|---|---|
| `road_segment.parquet` | street block | geometry, lanes, speed, facility, function, length, crash counts |
| `crashes.parquet` | cyclist crash | location, date, injury and fatality counts |
| `ridescore_v1_scores.parquet` | street block | component scores, LTS level, blended RideScore |
| `run.json` | run | sources, dates, crash window and settings used |

### Good to know

- **A new model gets its own file.** Street facts (`road_segment`) and a model's scores are kept separate, so your model never touches `ridescore_v1_scores`.
- **The weights are data, not code.** The RideScore blend lives in `src/ridescore/models/ridescore_v1/weights.toml`, so changing it is a one-line edit.
- **Old downloads are never overwritten.** Each fetch goes in its own dated folder, so you can rerun older inputs through a new model.
- **Same inputs, same outputs.** Rebuilding from the same snapshot gives identical files.
- **Only `fetch` touches the network.** No test may reach the network either; tests run on the committed extract.

### Where do I edit?

| I want to change | Edit |
|---|---|
| the blend of LTS / crash / facility | `src/ridescore/models/ridescore_v1/weights.toml` (must sum to 1) |
| the LTS rules | `models/ridescore_v1/lts.py` and the `LTS_*` values in `config.py` |
| a component score table | the `*_TO_SCORE` tables in `config.py` |
| how a source field becomes a street attribute | `network/normalise.py` |
| the crash window or buffer | `CRASH_YEARS_BACK`, `CRASH_BUFFER_M` in `config.py` |
| which columns are published | `ROAD_SEGMENT_COLUMNS` in `build.py` |
| a source URL | `config.py` |

Every threshold, URL and lookup table is in [`config.py`](http://config.py).

The design proposals behind where the pipeline is heading (stages, dataset descriptions, deployment) are in the repository wiki: [https://github.com/civictechdc/ridescoredc-models/wiki](https://github.com/civictechdc/ridescoredc-models/wiki).

## 3. Project ideas

You do not need to complete every stretch goal. For a four-hour project, a small working improvement, a useful analysis, or a convincing proof of concept is a successful outcome.

### 3.1 Add a second safety model

**Level:** Intermediate

**Background.** The current pipeline implements a modified LTS model. Having multiple models makes it possible to explore how different definitions of bicycle safety or comfort affect the resulting network scores.

**The challenge.** Implement Bicycle Network Analysis (BNA) as an additional model in the pipeline. The goal is to make BNA a first-class output alongside the existing LTS score, using the common prepared dataset. This is not necessarily about reproducing every aspect of an external implementation. The group should focus on creating a useful, understandable implementation that fits into the existing pipeline.

**What you'll learn.** Geospatial modeling, translating a published methodology into code, and designing reusable data-processing pipelines.

**Resources.**

- [RideScore DC models repository](https://github.com/civictechdc/ridescoredc-models)
- [RideScore DC models wiki](https://github.com/civictechdc/ridescoredc-models/wiki)
- [PeopleForBikes BNA methodology](https://cityratings.peopleforbikes.org/about/methodology)
- The bikescore-bna guide and the  [bikescore-bna documentation](https://bright-fakl.github.io/bikescore-bna/)

**Stretch goals.**

- Compare BNA and LTS results for the same streets.
- Identify where the models disagree most strongly.
- Make the model configurable.
- Prepare the BNA output for visualization on the RideScore DC website.

**Two ways to do it.**

1. **Write the rules yourself** in Python, in a new folder `src/ridescore/models/bna/`, following `ridescore_v1` as the example. No extra dependency.
2. **Reuse bikescore-bna's rules.** [bikescore-bna](https://github.com/bright-fakl/bikescore-bna) is our open-source Python implementation of BNA. We built it, but we have not fully validated or explored it, and it is not in the pipeline yet, so checking it is part of the job. Its stress rules are data (YAML decision tables) that you can apply to any street table with the right columns. The code below does that, and it runs on the committed test extract. Two things to know: BNA's model has only two stress levels (1 comfortable, 3 uncomfortable), while `ridescore_v1` has four (`lts_level` 1–4), and the conversion from our attributes is approximate (see the table after the code).

Save as `bna_stress.py`:

```python
import geopandas as gpd
import numpy as np
import pandas as pd

from bikescore_bna import build_config

# DDOT functional class (ridescore function) -> OSM highway class

FUNCTION_TO_OSM = {
    "Interstate": "motorway",
    "Other Freeway and Expressway": "motorway",
    "Principal/Primary Arterial": "primary",
    "Minor Arterial": "secondary",
    "Collector": "tertiary",
    "Local": "residential",
    "Other": "unclassified",
}

# ridescore bike_facility_type -> bikescore-bna bike infrastructure

FACILITY_TO_INFRA = {"protected_track": "track", "buffered_lane": "buffered_lane", "painted_lane": "lane"}

def to_bna_frame(segments: gpd.GeoDataFrame) -> pd.DataFrame:
    """Give bikescore-bna's stress rules the columns they read."""

    df = pd.DataFrame(index=segments.index)
    df["adj_fc"] = segments["function"].map(FUNCTION_TO_OSM)
    df["speed_limit"] = segments["speed_limit"]

    # DDOT counts travel lanes on the whole block; bikescore-bna counts per direction.

    per_direction = np.ceil(segments["num_lanes"] / 2)

    for d in ("ft", "tf"):

        df[f"{d}_lanes"] = per_direction
        df[f"{d}_bike_infra"] = segments["bike_facility_type"].map(FACILITY_TO_INFRA)
        df[f"{d}_bike_infra_width"] = np.nan  # DDOT does not say

    df["bicycle"] = None

    return df

def score(segments: gpd.GeoDataFrame, scenario="default") -> pd.DataFrame:
    """One row per segment: bikescore-bna's segment stress, worst direction."""

    config = build_config(scenario)

    stressed = config.stress.segment_rules.apply(to_bna_frame(segments), variables=config.variables)

    out = pd.DataFrame(index=segments.index)

    out["bna_seg_stress"] = stressed[["ft_seg_stress", "tf_seg_stress"]].max(axis=1).astype(int)

    return out
```

Try it in a notebook (from the repo root, after building `out-fixture` or `out`):

```python
uv run --group notebooks --with git+https://github.com/bright-fakl/bikescore-bna jupyter lab

import geopandas as gpd, pandas as pd
import bna_stress

segments = gpd.read_parquet("out-fixture/road_segment.parquet")

v1 = pd.read_parquet("out-fixture/ridescore_v1_scores.parquet")

bna = bna_stress.score(segments)

print(pd.crosstab(v1["lts_level"].values, bna["bna_seg_stress"].values, rownames=["ridescore_v1 lts_level"], colnames=["bna stress"]))
```

On the 34-block test extract the two agree on the clear cases and differ in the middle:

| `ridescore_v1` `lts_level` | BNA stress 1 | BNA stress 3 |
|---|---|---|
| 1 | 5 | 0 |
| 2 | 11 | 3 |
| 3 | 1 | 1 |
| 4 | 1 | 12 |

**What the conversion leaves out:**

| Difference | Effect |
|---|---|
| Lanes: DDOT gives total lanes per block, BNA uses lanes per direction | The code uses `ceil(total / 2)`. One-way streets get this wrong. |
| DDOT has no bike-lane width | A painted lane only reaches BNA stress 1 when it is 4 ft or wider and speed is 20 mph or less, so painted lanes score 3 here. Supply a width if you have one. |
| Segment stress only | BNA also rates intersection crossings, which needs signal, stop and crossing data from OSM nodes. Not included. |
| Class adjustments skipped | BNA promotes a residential street to tertiary when it has bike lanes both ways, more than one lane, or 30 mph or more. Not included. |

**To make it a pipeline model:**

1. Add bikescore-bna as an **optional** extra in `pyproject.toml` (it pulls in scipy, polars, osmium and more), and import it inside your module:

```json
[project.optional-dependencies]

bna = ["bikescore-bna @ git+https://github.com/bright-fakl/bikescore-bna"]
```

then `uv sync --extra bna` and commit the updated `uv.lock`.

2. Put the code in `src/ridescore/models/bna_stress/`, and add a `segment_id` column, as `_sort_and_key` does for `ridescore_v1_scores`.
3. In `build.py`, add a `bna_stress_scores` field to `Built`, a name in `FILENAMES`, and a write in `write()`. Keep `ridescore_v1_scores.parquet` unchanged.
4. Test on the committed extract (the `extract` fixture in `tests/conftest.py`), with `pytest.importorskip("bikescore_bna")` so the core tests still run without the extra. No test may reach the network.

### 3.2 Describe the data

**Level:** Intermediate

**Background.** The pipeline generates GeoParquet files containing geometries and many attributes, including safety scores. But a data file by itself does not necessarily explain what its columns mean, where they came from, or how they should be interpreted. A machine-readable description bundled with each output would make the data easier to understand, reuse, and validate. It would also help decouple the website from assumptions about the structure and meaning of the data.

**The challenge.** Create a structured data-description file for each data product generated by the pipeline. The description could include information such as:

- What the dataset represents
- What each field means
- Units and expected values
- Data source
- Processing or transformation applied
- Model used to generate derived fields
- Version or date information

Some metadata could be generated automatically from the pipeline, while other information would be written or reviewed by humans.

**What you'll learn.** Data engineering, metadata, data provenance, and designing interfaces between data pipelines and applications.

**Resources.**

- [RideScore DC models repository](https://github.com/civictechdc/ridescoredc-models)
- [RideScore DC models wiki](https://github.com/civictechdc/ridescoredc-models/wiki) (proposal 0002, "Dataset descriptions", is a draft of this idea)

**Stretch goals.**

- Automatically generate part of the metadata from the pipeline.
- Define a consistent metadata schema for all RideScore DC datasets.
- Validate the metadata as part of the pipeline.
- Explore how the website could use the metadata rather than hard-coding assumptions about the data.

### 3.3 Add an OpenStreetMap road source

**Level:** Intermediate → Advanced

**Background.** The pipeline currently builds its street network from the DDOT roadway blocks on Open Data DC. The plan is to switch to OpenStreetMap, and how to segment and preprocess OSM is still open (see Challenge 2). Whatever the answer, the pipeline needs a *source* that fetches OSM and returns a street table with the attributes the models read.

**The challenge.** Add an OSM source to the pipeline: a fetch step that downloads OSM into the dated snapshot (the only step allowed on the network), and a step that turns segments into the columns `ridescore_v1` reads (`segment_id`, `function`, `num_lanes`, `speed_limit`, `bike_facility_type`, `road_width`, `pavement_condition`, `crash_count_5yr`, geometry). You can use [bikescore-bna](https://github.com/bright-fakl/bikescore-bna)'s OSM stages for segmentation and tag preprocessing (see the code in Challenge 2, idea 3.3), or your own. A working adapter from its segments to these columns, tested on a small synthetic street grid, is in the bikescore-bna guide.

**Things to decide and document.**

- What a segment is (one per way, one per intersection-to-intersection stretch, …) and what `segment_id` is. It must be unique, and ideally stable when the data is rebuilt.
- How to fill in the missing lanes, speed limits and pavement condition (OSM has no pavement condition index).
- How to count crashes near each segment. The pipeline's `network/crash_join.py` works on any street geometry.
- Keep the `-preview` naming for any data package built from OSM, because nothing built from OSM is comparable with data built from DDOT blocks.

**What you'll learn.** OSM data, the pipeline's design, and how a source choice ripples through every score.

**Stretch goals.**

- Compare scores from the OSM and DDOT versions for the same streets.
- Show how much of the OSM network is filled in with defaults.
- Write the tests on a small committed OSM extract.

## 4. What to hand in

Open a pull request to `ridescoredc-models`. Changes to the pipeline go in `src/ridescore/`, with tests. Notebooks go in <code>notebooks/<span class="placeholder">&lt;name&gt;</span></code>. Before you open it:

- `uv run pytest -q` and `uv run ruff check src/ tests/ live/ scripts/` pass.
- The core pipeline still runs without any optional extra you added.
- Your model or source writes its own file, and `ridescore_v1` output is unchanged.
- New behaviour has a test on the committed extract, and no test touches the network.
- If scores moved on purpose, your PR says which numbers moved and why.
- A short README describing what you built and what it can't do.

See [**Submitting Your Work**](/tracks/models/submitting-your-work) for the rest of the process.
