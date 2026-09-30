---
layout: home
hero:
  name: RideScore DC
  text: Hackathon 2026
  tagline: How safe and comfortable is it to bike on every street in Washington, DC? Join us on Sat Oct 3 and help find out.
  actions:
    - theme: brand
      text: Get set up
      link: '#before-you-come'
    - theme: alt
      text: See the schedule
      link: '#schedule'
features:
  - icon: 🗺️
    title: Website / UI
    details: Improve the map and route survey riders use every day. Web developers and designers welcome.
  - icon: 📊
    title: Bike Safety Models
    details: Build any bicycle-safety model or analysis on top of OSM + DC Open Data. Every experience level.
  - icon: 🧑‍🤝‍🧑
    title: Community Research
    details: Who is RideScore for, and can they trust it? No coding or bike-safety expertise needed.
---

<div class="landing">

## The essentials

|   |   |
|---|---|
| **When** | Saturday, October 3 · doors 9:30 AM, kickoff 10:30 AM, building starts 11:00 AM |
| **Where** | GW Science & Engineering Hall, 800 22nd St NW |
| **Arrival** | Enter at 22nd & H St. Volunteers will meet you and provide building access. |
| **Included** | Lunch and coffee |
| **Bring** | Laptop, phone, pen or pencil, and a clipboard if you have one |

## About RideScore DC

RideScore DC is an open-source project from [Civic Tech DC](https://www.civictechdc.org), built by a team of 10–15 people. It combines public data about DC's streets from Open Data DC and OpenStreetMap (bike lanes, speed limits, number of lanes, traffic and crashes) into a stress and safety score for every street segment. [Explore the map at ridescoredc.com.](https://ridescoredc.com)

A route survey lets people draw a ride they actually take and tell us how safe it felt, which keeps the scores grounded in real experience.

## How the day works

This is a collaborative hackathon, more about moving RideScore DC forward than finishing a set task. Pick a track, form or join a small group, and choose a problem. A small improvement that works, a useful analysis, or a clear set of findings all count as success. Mentors from the project team check in with every group after lunch.

::: info
Two projects share the day: RideScore DC and a separate FEC Data project. This site covers RideScore DC.
:::

## Schedule

| Time | Event |
|---|---|
| 9:30 | Doors open |
| 10:00 | Check-in and coffee |
| 10:30 | Kickoff |
| 11:00 | Choose your track and start building |
| 1:00 | Lunch |
| 1:45 | Mentor check-ins |
| 4:00 | Submissions close |
| 4:15 | Demos |
| 5:15 | Wrap-up and group photo |
| 5:30 | Happy hour |

## Tracks

### Track 1 · Website / UI

Design and build new features for the RideScore DC interface, using a ready-to-go HTML/Docker environment with a MapLibre frontend and a PostGIS/Martin tile backend. Open problems include letting users submit their own street safety observations, flagging hazards or leaving feedback on a segment, improving mobile responsiveness, and rethinking how the map communicates safety at a glance.

### Track 2 · Bike Safety Models

RideScore DC scores streets with a modified Level of Traffic Stress (LTS) model and a Bicycle Network Analysis (BNA) model, with CycleRAP parameters also mapped. This track is open-ended: build any bicycle-safety model you like, with a completed data pipeline and dataset ready to use. Ideas include new or hybrid scoring approaches, models weighting specific risk factors, crash-risk prediction, or analyses that surface patterns existing models miss.

### Track 3 · Community Research

Who is RideScore for: cyclists, scooter riders, policy makers, advocacy groups? This track explores who we think the map is built for and what we need to ask users to learn whether they can trust it and use it to make decisions. You don't need to code or be a bike-safety expert; your fresh perspective is what matters.

## Before you come

If you do one thing before Saturday, get set up for your track. Downloading large files on shared event Wi-Fi is slow, so preparing ahead lets you start building promptly at 11:00 AM.

| Track | Before you come |
|---|---|
| **Models** | Get the data ahead of time: download the snapshot from Hugging Face (easiest), run the basemap notebook once, or run the scoring pipeline once (includes scores and crash data). Tools: Python, uv and Jupyter. |
| **Website / UI** | Clone the website repo and follow the Front-End (lighter) or Full Stack (needs Docker) developer guide. Windows users: start with the WSL tab. |
| **Community Research** | No software installation required. |

## Links

- [RideScore DC map](https://ridescoredc.com) · [dev site](https://dev.ridescoredc.com)
- [ridescoredc-models](https://github.com/civictechdc/ridescoredc-models) (data and scoring pipeline)

</div>
