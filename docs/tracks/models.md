# Models

**Goal.** This track is open-ended. Build any model or analysis of cyclist safety in DC. You don't have to use our model or reproduce an existing method. A well-supported analysis that shows something new is as valuable as a new model. Small groups work well here, and every experience level is welcome.

## The challenges RideScore DC is facing

RideScore DC turns public data into a map of how safe and comfortable each street in Washington, DC is to bike. We have identified three open challenges, listed below.

<span class="alert">Pick one challenge per team at the start.</span> Not sure which? Choose by what you like doing:

- statistics and modelling → [Challenge 1](#challenge-1-define-and-compute-bike-safety-scores)
- geodata wrangling → [Challenge 2](#challenge-2-build-a-stable-base-map-of-bike-infrastructure)
- software engineering → [Challenge 3](#challenge-3-construct-a-production-data-pipeline)

## Challenge 1: Define and compute bike safety scores

Define and compute bike safety scores from public data, either using an existing methodology or a custom score. Consider factors that you believe contribute to a (un)safe biking experience: which streets are safe, and how should we say so?

Find more details in the [Challenge 1 Guide](/tracks/models/challenge-1). For this challenge, you will use Python, [`uv`](https://docs.astral.sh/uv/), and Jupyter.

<span class="alert">To do before Saturday.</span> Setup the development environment and download the data snapshot with DC’s bikeable street network and attributes derived from OpenStreetMap and Open Data DC.

## Challenge 2: Build a stable base map of bike infrastructure

Start from OpenStreetMap (OSM) and incorporate features and attributes from other sources, such as Open Data DC. The hard parts are how to segment OSM roads, how to fill in missing tags, and how to keep a street's ID the same when the data is rebuilt.

Find more details in the [Challenge 2 Guide](/tracks/models/challenge-2). For this challenge, you will use Python, [`uv`](https://docs.astral.sh/uv/), and Jupyter.

<span class="alert">To do before Saturday.</span> Setup the development environment and run the Jupyter notebook once.

## Challenge 3: Construct a production data pipeline

Build the pipeline that computes the safety scores and produces a publicly consumable data package, the same one the RideScore DC website uses.

Find more details in the [Challenge 3 Guide](/tracks/models/challenge-3). For this challenge, you will use Python and [`uv`](https://docs.astral.sh/uv/).

<span class="alert">To do before Saturday.</span> Setup the development environment and execute the pipeline once.
