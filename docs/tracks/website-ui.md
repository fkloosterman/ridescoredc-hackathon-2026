# Track 1: Website / UI

This track works on the RideScore DC website: the map people use to explore street scores, and the route survey where riders tell us how a ride felt. You can improve what's there, fix rough edges, or build something new. Web developers, designers and mapping enthusiasts are all welcome.

Projects use the [RideScore DC website repository](https://github.com/civictechdc/ridescoredc-website) and its `develop` branch. You can see the current site at [dev.ridescoredc.com](https://dev.ridescoredc.com).

Teams work with a ready-to-go HTML/Docker environment, so you can plug in and start building rather than setting up infrastructure from scratch.

## Open problems

- Let users submit or input their own street safety scores or observations
- Add ways for riders to flag hazards or leave feedback on a segment
- Improve mobile responsiveness
- Rethink how the map communicates safety information at a glance

See the [project ideas](/tracks/website-ui/project-ideas) for seven concrete starting points.

## What it's built with

- **Frontend:** HTML and JavaScript with MapLibre GL JS, served by Vite during development.
- **Backend:** a PostGIS database, a Martin tile server for the map, a FastAPI API for the survey, and nginx.

## Which setup do I need?

| If you're working on… | Use | Go to |
|---|---|---|
| Pages, map styling, the survey's look and flow, a landing page or tutorial | **Front-End only.** Runs on your machine and uses our shared server for map data. | [Front-End Developer Guide](/tracks/website-ui/frontend-guide) |
| The API, database, storing new survey answers, or what data the map carries | **Full Stack.** Everything runs on your machine, using Docker. | [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) |

Most projects only need Front-End. On Windows, start with [Windows (WSL) setup](/tracks/website-ui/windows-wsl).

## How to use these pages

1. **Setting up:** [Windows (WSL)](/tracks/website-ui/windows-wsl) → [Front-End](/tracks/website-ui/frontend-guide) or [Full Stack](/tracks/website-ui/full-stack-guide) guide
2. **Understanding the site:** [How the site works](/tracks/website-ui/how-the-site-works) → [Repository layout](/tracks/website-ui/repository-layout) → [The data](/tracks/website-ui/the-data)
3. **Doing the work:** [Project ideas](/tracks/website-ui/project-ideas) → [Making website changes](/tracks/website-ui/making-changes), which also covers submitting a pull request

## Before you come

Clone the website repo and follow the Front-End (lighter) or Full Stack (needs Docker) developer guide. Windows users: start with the WSL guide.
