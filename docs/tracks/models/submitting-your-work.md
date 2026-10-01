# Reference: Submitting Your Work

*Cross-cutting reference. Every challenge page says what to hand in; this page covers how, and what happens next.*

We'd love for good work to end up on the RideScore DC map. Getting something onto the live map takes several steps across the data pipeline and the website, so on the day we're asking for your work in a standard shape. The RideScore DC team will handle the rest with you afterwards.

## What to hand in

| Challenge | Your results | Your code |
|---|---|---|
| **1. Safety scores** | One row per street segment, matched to its ID (see below) | The notebook that produces those results from the data |
| **2. Base map** | *\[CONFIRM: the rebuilt base map as a file, with the notebook that produced it, plus a short write-up of the choices you made\]* | The notebook or script |
| **3. Data pipeline** | *\[CONFIRM: a pipeline change or new model that runs with `ridescore run` and passes `uv run pytest`\]* | A pull request against `ridescoredc-models` (see "Where to put it") |

### Results keyed to an ID (Challenge 1, and any scored output)

| Your data | ID column(s) |
|---|---|
| Snapshot or notebook | `osm_u`, `osm_v`, `osm_key`, plus the snapshot date |
| Scoring pipeline | `segment_id` |

Add your model's output as a column named after your model, for example `bna_score` or `crash_risk`. Use whatever scale fits your model: LTS 1–4, 0–1, a category, anything. Just explain it in your README. Save it as Parquet (preferred) or CSV.

### A short README (a few lines is fine)

- What your work produces, including its scale and which direction is safer, if it is a score.
- Which inputs it uses.
- What it can't tell you: known gaps and assumptions.

## Where to put it

Open a pull request to `ridescoredc-models` that adds your work to `notebooks/`, in its own folder (for example, `notebooks/<your-work-name>/`). Challenge 3 changes to the pipeline itself go in `src/ridescore/` instead; see that page. If you haven't used Git before, a mentor can help.

## What happens next

The RideScore DC team will review submitted work. For the pieces that fit, we'll work with the authors to add them to the pipeline and the map.

You do not need to complete every stretch goal. For a four-hour project, a small working improvement, a useful analysis, or a convincing proof of concept is a successful outcome.
