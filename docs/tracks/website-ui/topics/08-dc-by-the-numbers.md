# Topic 8: DC by the numbers

<Badge type="warning" text="Intermediate" /> <Badge type="info" text="Data" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Full Stack (Docker)](/tracks/website-ui/full-stack-guide) <span class="or">or</span> [Python (Models setup)](/tracks/models/setting-up-your-computer) |
| **Setup before Saturday** | About 30 minutes plus large downloads, either way; do it before Saturday |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like data, SQL or Python, and turning numbers into clear charts |
| **What you can share** | Usually a pull request |

</div>


*Related: [Topic 2: Explain the safety score](/tracks/website-ui/topics/02-explain-the-safety-score) · [Models track](/tracks/models) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

The map shows one block at a time. So nobody can answer the questions a planner or advocate asks first. How much of DC's street network is low-stress? Which parts of the city have the worst streets? How much does the picture change if bike lanes count for more? A small statistics page would turn the map into evidence.

### Why it matters

Decisions about streets are made citywide and ward by ward, not block by block. A council member, planner or advocacy group needs numbers they can say out loud. What share of DC's streets are low-stress? Where are the gaps? How does one neighborhood compare with another? Those numbers are already in the data; nobody has added them up in public yet.

### Who it's for

- **Advocates and organizers** preparing testimony or a campaign.
- **Planners and policymakers** comparing areas and priorities.
- **Journalists and curious residents** who want the big picture before the map.

### How it connects

- The numbers come from the same data the map draws: 13,829 street blocks and 2,224 crashes, described in [The data](/tracks/website-ui/the-data).
- The **Models track** knows what the scores mean and their limits. They're happy to check your reading of the numbers.
- **Community Research's** "Professional Lens" activity lists what planners say they'd need, such as ward summaries.

### Example ideas

- One big number per question: "X% of DC's street length is low-stress."
- A bar chart of street length by stress level, citywide and per ward.
- The 20 blocks with the most crashes, each linked to the map.
- A before-and-after view: how the picture shifts if bike lanes count more.

## 1. Tools and set up (before Saturday)

The catch with this topic is **getting all the data**. The Front-End setup only receives map tiles for the area on screen, so it can't add up whole-city numbers. Choose one of these two paths:

| Path | Tools | Set up |
|---|---|---|
| **A. Your own database** | Front-End tools, plus Docker Desktop and uv | [Front-End Developer Guide](/tracks/website-ui/frontend-guide), then the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide). Query the tables with SQL. |
| **B. Python on the data files** | Python and uv; the Front-End tools to build the page | Follow the Models track's [Setting Up Your Computer](/tracks/models/setting-up-your-computer). Read the published data package (Parquet files: compact data tables that Python reads quickly) from the [ridescoredc-models releases](https://github.com/civictechdc/ridescoredc-models/releases), then write the results to a small JSON file the page loads. |

<span class="alert">Do this ahead of time.</span> Both paths download large files, which can be very slow on event Wi-Fi. Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

### If something goes wrong

| Symptom | Fix |
|---|---|
| `/health` returns 502 on the very first `npm run stack` | Run `npm run restart -- fastapi`. |
| `select count(*) from data.road_segment` returns 0 | Run `npm run setup` to load the data. |
| You can't connect with `psql` | Use `docker compose exec db psql -U postgres -d db`, which needs no install. |

## 2. Know before you start

- **The tables.** `data.road_segment` has 13,829 blocks with street attributes, length (`len`) and crash counts. `data.ridescore_v1_scores` has the score and its parts for each block. They join on `segment_id`. Column meanings are in [The data](/tracks/website-ui/the-data).
- **Measure by length, not count.** A short block and a long one count the same in a row count. So weight by `len` for "share of the network".
- **Keep it precomputed.** The simplest page loads a JSON file you generated. A live API endpoint (a web address that returns fresh numbers) is a stretch.
- **Ask the Models track** about what the scores mean before drawing conclusions.

## 3. The challenge

### Core goal (2–3 hours)

A page (for example `/numbers/`) with **three to five** statistics that answer real questions. Give each a chart or a single big number, and one sentence on what it means. For example: the share of the network by stress level, by length; how many blocks have a protected bike lane; the blocks with the most crashes.

### Approaches

- Write the questions first, then the SQL or Python.
- Use one small charting approach consistently (plain SVG, or a library from a CDN).
- Say where the numbers come from and when the data was built.

### Stretch goals

- Compare areas of DC (for example by ward; ward boundaries are on [Open Data DC](https://opendata.dc.gov/)).
- Show how the numbers move when the Custom weights change.
- Link a statistic to the map, so clicking "worst blocks" shows them.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] Three or more statistics, each answering a question written on the page.
- [ ] Each number comes from a query or script you can share.
- [ ] Shares of the network are weighted by length.
- [ ] The page states the data version and date, and works on a phone.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Including the query or script behind your numbers makes them easy to check and reuse.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [The data](/tracks/website-ui/the-data) · [Full Stack Developer Guide: Looking at the data](/tracks/website-ui/full-stack-guide#looking-at-the-data)
- [ridescoredc-models releases](https://github.com/civictechdc/ridescoredc-models/releases) · [Open Data DC](https://opendata.dc.gov/)
