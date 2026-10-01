# Challenge 1: Define and compute bike safety scores

**Goal.** Define and compute bike safety scores from public data, either using an existing methodology or a custom score.

This challenge is open-ended. Build any model or analysis of cyclist safety in DC. You don't have to use our model or reproduce an existing method. A well-supported analysis that shows something new is as valuable as a new model. The dataset and the setup instructions are prepared so you can focus on the modelling problem itself.

To date, we have mainly experimented with the Level of Traffic Stress (LTS) and Bicycle Network Analysis (BNA) models.

*Related pages: [Setting Up Your Computer](/tracks/models/setting-up-your-computer) · [Submitting Your Work](/tracks/models/submitting-your-work) · [Data Snapshot Description](/tracks/models/snapshot-data) · [Challenge 2: Base map](/tracks/models/challenge-2) · [Challenge 3: Data pipeline](/tracks/models/challenge-3)*

---

## 1. Set up (before Saturday)

<span class="alert">Do this ahead of time.</span> First complete the [**Setting Up Your Computer**](/tracks/models/setting-up-your-computer) guide (git, a GitHub account, uv, and your own copy of the code on a branch of your own); it takes about 10 minutes. Then come back here and run the steps below **from the repository folder** (the one that contains `pyproject.toml`). They take about 5 more minutes, plus downloads.

**What you will use:** Python, uv and Jupyter. uv provides all three: Python itself, and JupyterLab and the data libraries through the project.

### Step 1: Install the project's libraries

```sh
uv sync --group notebooks
```

The first execution of this command downloads several libraries and can take a few minutes.  After that it is quick. This installs JupyterLab and the data libraries (geopandas, matplotlib and others) into a `.venv` folder inside the repository.

### Step 2: Check that it works

```sh
uv run --group notebooks python -c "import geopandas, jupyterlab; print('ok')"

uv run --group notebooks jupyter lab
```

The first command should print `ok`. The second starts JupyterLab and prints a local address (`http://localhost:8888/...`). Most computers open it in your browser automatically; if yours doesn't, copy the address into a browser. On WSL, the address works in your Windows browser too. Press Ctrl+C in the terminal to stop it.

### Step 3: Download the snapshot

The snapshot is DC's bikeable street network: OpenStreetMap enriched with DC Open Data, conflated against the DC Roadway SubBlock spine.

Download the full-DC snapshot from [Hugging Face](https://huggingface.co/datasets/EChODatascience/ridescore-dc-basemap)

- File: `ridescore_dc_basemap_2026-09-29.geojson`
- It opens in any GIS or Python tool, for example <code>geopandas.read_file("ridescore_dc_basemap_2026-09-29.geojson")</code>.

Save it outside the repository folder, or in a folder the repository ignores, so you don't commit a large data file by mistake. Everyone on your team should use the **same dated snapshot**, because segment IDs only hold within one snapshot.

If your idea needs crash data or our existing scores, you will also need the scoring pipeline; see "Using the existing scores and crashes" below.

### If something goes wrong

| Symptom | Fix |
|---|---|
| JupyterLab opens a page asking for a token | Copy the full address that the terminal printed, including `?token=...`, into the browser. |

Problems with `uv`, `git`, Python or Windows paths? See the table at the end of the [**Setting Up Your Computer**](/tracks/models/setting-up-your-computer) guide.

## 2. Know before you model

- **The snapshot has no scores.** It's raw street attributes only: no LTS, BNA or RideScore. Every model starts from the same columns.
- **Two sources side by side.** OSM and DDOT describe the same street differently. DDOT is far more complete for speed limits and lanes; OSM is better for bike facilities. There is no rule yet for which to trust, and your model needs to handle missing `dc_*` values on purpose.
- **Separate cycle tracks copy the street beside them.** A protected track can look as stressful as the arterial next to it, and lengths can be double-counted. (Challenge 2 has a project on this.)
- **Some DDOT data is old.** Traffic volume (AADT) is from 2020, a pandemic year.

The full column list, match quality and all caveats are in the [**Snapshot Data**](/tracks/models/snapshot-data) guide.

### Two stress models, two scales

If you compare your work with our existing models, keep in mind that they are built differently.

|  | LTS in the scoring pipeline (`ridescore_v1`) | BNA (Bicycle Network Analysis) |
|---|---|---|
| Levels | **four:** `lts_level` 1 (calm) to 4 (hostile) | **two:** stress 1 (comfortable) or 3 (uncomfortable) |
| Meaning | the classic LTS ladder | a binary: roughly LTS 1 and 2 merged into "1", and LTS 3 and 4 merged into "3" |
| Used for | a score per street, blended with crashes and bike facility into RideScore | deciding which streets a cyclist will use when routing, which drives connectivity, access, and a city rating |

BNA here means our own implementation, the `bikescore-bna` package. We built it, but we haven't fully validated or explored it, so treat its output as a second opinion, not as ground truth. Compare the two at a coarse level (for example: is `lts_level` ≤ 2 the same set of streets as BNA stress 1?), not level by level. BNA's rules are data, not code: ordered "first match wins" tables over speed, lanes and bike infrastructure, described in the [bikescore-bna documentation](https://bright-fakl.github.io/bikescore-bna/reference/stress-rules/). Adding BNA to the pipeline is a project in Challenge 3.

## 3. Using the existing scores and crashes (optional)

The snapshot has no crashes or scores. They come from the scoring pipeline (see [**Challenge 3**](/tracks/models/challenge-3) for setup) and link to the snapshot through `dc_blockkey`, which is the pipeline's `segment_id`. One DDOT block can cover several snapshot segments, so decide how to combine them and report the ones that don't match.

## 4. Project ideas

You do not need to complete every stretch goal. For a four-hour project, a small working improvement, a useful analysis, or a convincing proof of concept is a successful outcome.

### 4.1 Try an official index we haven't used

**Level:** Intermediate

**Background.** Transportation agencies have published several bicycle safety and suitability indices. RideScore DC uses a modified LTS in its pipeline and has built a BNA package that is not in the pipeline yet, but other indices have never been tried on DC's streets.

**The challenge.** Implement one published index using the prepared dataset:

- Bicycle Intersection Safety Index (Bike ISI) from FHWA: scores intersection approaches rather than street segments. It needs traffic signal locations, which aren't in the snapshot.
- Bicycle Level of Service (BLOS) from the Highway Capacity Manual: a segment score built from traffic volume, speed, heavy vehicles, pavement and lane width.
- Bicycle Compatibility Index (BCI) from FHWA: a segment score built from traffic volume, speed, widths and parking.

Document every input you had to approximate or leave out.

**What you'll learn.** Translating a published methodology into code, and working with data that doesn't quite match what the method expects.

**Resources.**

- [Pedestrian and Bicyclist Intersection Safety Indices: User Guide](https://www.fhwa.dot.gov/publications/research/safety/pedbike/06130/06130.pdf) (FHWA-HRT-06-130)
- The snapshot, especially the `dc_AADT*`, `dc_SPEEDLIMITS_*`, `dc_BIKELANE_*` and lane and width columns

**Stretch goals.**

- Compare the results with LTS.
- For Bike ISI, add traffic signals from OpenStreetMap or DC Open Data.
- Check the index against crash locations.

### 4.2 Build a new bicycle-safety model

**Level:** Intermediate → Advanced

**Background.** RideScore DC currently includes a modified LTS model, while BNA and CycleRAP provide other ways of thinking about bicycle safety. But there is no requirement that a hackathon project use any of these existing approaches. The prepared dataset contains many potentially useful variables describing streets, intersections, bicycle infrastructure, and other characteristics.

**The challenge.** Build or investigate a bicycle-safety model of your choice. Possible directions include:

- Your own metric: choose the attributes, decide how to combine them, and justify each choice
- A new or hybrid stress/safety score
- A model focused on particular risk factors
- An intersection-safety model
- A model incorporating bicycle-lane type
- A model incorporating traffic volume
- A model incorporating lighting or other environmental characteristics
- An exploratory analysis looking for patterns that existing models miss
- A comparison of several existing safety measures

The goal can be either a working model or a well-supported analysis that reveals something interesting.

**What you'll learn.** Exploratory data analysis, statistical modeling, feature engineering, geospatial analysis, and communicating model results.

**Stretch goals.**

- Compare the new model with LTS and/or BNA.
- Map where the models disagree.
- Investigate whether the model behaves differently for different types of streets.
- Produce a visualization that could be incorporated into the RideScore DC website.

### 4.3 Explore crash risk

**Level:** Advanced

**Background.** The existing RideScore models primarily describe stress or network characteristics. An alternative approach is to ask whether the available roadway and infrastructure data can help explain or predict observed bicycle crashes. This is a substantially different modeling problem from LTS or BNA and does not have to produce a replacement for those models.

**The challenge.** Explore whether the RideScore DC dataset can be used to identify patterns associated with bicycle crash risk. Depending on the available crash data, this could involve exploratory analysis, statistical modeling, or a predictive model. The goal for a four-hour hackathon is not necessarily a production-ready crash prediction model. A useful finding about which variables appear associated with crashes could itself be a successful outcome.

**What you'll learn.** Statistical modeling, feature selection, geospatial analysis, and the challenges of distinguishing association from prediction.

**Resources.**

- [RideScore DC models repository](https://github.com/civictechdc/ridescoredc-models)
- DC crash data: `crashes.parquet` from the scoring pipeline, which links to snapshot segments through `dc_blockkey`

**Stretch goals.**

- Compare crash patterns with LTS or BNA scores.
- Examine intersections separately from road segments.
- Investigate spatial or temporal patterns.
- Identify variables that existing safety models may not capture.

### Related ideas on other pages

- **Separate cycle tracks** (Challenge 2) changes how a model should treat protected tracks, and affects any score you compute.
- **Add a second safety model: BNA** (Challenge 3) puts BNA next to LTS in the pipeline.

## 5. What to hand in

Your results (one row per street segment, matched to its ID), your code (the notebook), and a short README saying what your output means, which inputs it uses, and what it can't tell you. See [**Submitting Your Work**](/tracks/models/submitting-your-work) for the ID columns, the file format, and where to put the pull request.
