# Track 2: Bike Safety Models

RideScore DC currently scores streets using a modified Level of Traffic Stress (LTS) model and a Bicycle Network Analysis (BNA) model, with CycleRAP parameters also mapped out.

This track is open-ended: build any bicycle-safety-relevant model of your choosing. It doesn't need to fit within RideScore DC's existing methodologies. You'll have access to a completed data pipeline and dataset (OSM enriched with DC Open Data, conflated against the DC Roadway SubBlock spine) with setup instructions, so you can focus on the modeling problem itself.

## Ideas

- New or hybrid stress/safety scoring approaches
- Models that weight specific risk factors: intersections, bike lane type, traffic volume, lighting
- Predictive models for crash risk
- Exploratory analyses that surface patterns the existing models miss

## Before you come

Get the data ahead of time by picking one option: download the snapshot from Hugging Face (easiest), run the basemap notebook once, or run the scoring pipeline once (includes scores and crash data). Tools: Python, uv and Jupyter. Code lives in [ridescoredc-models](https://github.com/civictechdc/ridescoredc-models).

