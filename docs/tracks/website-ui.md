# Website / UI

This track works on the RideScore DC website: the map people use to explore street scores, and the route survey where riders tell us how a ride felt. You can improve what's there, fix rough edges, or build something new. Web developers, designers and mapping enthusiasts are all welcome.

These projects use the [RideScore DC website repository](https://github.com/civictechdc/ridescoredc-website) and the `develop` branch. You can see the current site at [dev.ridescoredc.com](https://dev.ridescoredc.com/).

## What it's built with

- **Frontend:** HTML and JavaScript with [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/), served by Vite during development.
- **Backend:** a PostGIS database, a Martin tile server for the map, a FastAPI API for the survey, and nginx.

## Which setup do I need?

| If you're working on… | Use | Go to |
|---|---|---|
| Pages, map styling, the survey's look and flow, a landing page or tutorial | **Front-End only.** Runs on your machine, and uses our shared server for map data | [Front-End Developer Guide](/tracks/website-ui/frontend-guide) |
| The API, database, storing new survey answers, or what data the map carries | **Full Stack.** Everything runs on your machine, using Docker | [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) |

Most projects only need Front-End. **On Windows, start with the [Windows WSL](/tracks/website-ui/windows-wsl) guide.**

## How to use these pages

- **Setting up:** [Windows WSL](/tracks/website-ui/windows-wsl) → [Front-End](/tracks/website-ui/frontend-guide) or [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide)
- **Understanding the site:** [Schematic](/tracks/website-ui/how-the-site-works) → [Website Repository Layout](/tracks/website-ui/repository-layout) → [The Data](/tracks/website-ui/the-data)
- **Doing the work:** [Mini-project Ideas](/tracks/website-ui/project-ideas) → [Making Website Changes](/tracks/website-ui/making-changes), which covers submitting a pull request
