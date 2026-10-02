# Website / UI

This track improves the RideScore DC website: the **map** people use to explore how safe each street is to bike, and the **route survey** where riders tell us how a ride felt. You can fix rough edges, build something new, design a concept, or write a plan. Web developers, designers, mapping enthusiasts and planners are all welcome, and some topics need no code at all.

The code lives in the [RideScore DC website repository](https://github.com/civictechdc/ridescoredc-website) on the `develop` branch. The current site is at [dev.ridescoredc.com](https://dev.ridescoredc.com/).

## Start here

1. **Pick a topic.** Browse the [15 topics](/tracks/website-ui/topics) and choose one per team.
2. **Set up.** Install what your topic needs, ideally before Saturday. Some topics need nothing at all. See [Setting up](/tracks/website-ui/setting-up).
3. **Build for two to three hours.** Mentors check in at 1:45. Ask questions any time.
4. **Hand in by 4:00** with one form per team, then show your work in a two-minute demo at 4:15. See [Doing the work](/tracks/website-ui/doing-the-work).

## What's in this guide

| Section | What it covers |
|---|---|
| [**Setting up**](/tracks/website-ui/setting-up) | Which setup your topic needs (none, Front-End or Full Stack), and step-by-step guides for each, including Windows. |
| [**Understanding the site**](/tracks/website-ui/understanding-the-site) | How the pieces fit together: the pages, the map tiles, the survey API and the database; where things live in the code; and what the data contains. |
| [**Topics**](/tracks/website-ui/topics) | All 15 topics by level, each with its own page: the problem, tools, the challenge, what "done" looks like, and how to hand it in. |
| [**Doing the work**](/tracks/website-ui/doing-the-work) | How to make a change and open a pull request, and how to submit your work with the form. |

## Downloads

- **[all-materials-for-ai.zip](/downloads/website-ui/all-materials-for-ai.zip):** this whole guide plus the background notes, in Markdown. Upload it to your AI assistant and ask it to help you plan your topic.
- **[All notes across topics](/downloads/website-ui/all-notes-across-topics.zip)** (just in case 😄): every background note for Topics 3–7, in Word and Markdown. Each of those topic pages also links its own zip, intended more for use with an AI assistant, for rapid comprehension of the issue.

## How judging works

There's no ranking: this is a collaborative hackathon. Each topic page has a **Done when** list, concrete checks that mentors use to give feedback at the 1:45 check-in and after demos. Code is checked on your own local copy of the site. Unfinished work is welcome; say what doesn't work yet.

## Using AI

AI tools are encouraged. Two or three hours is short, and a coding, design or writing assistant can help you get much further. You stay responsible for what you hand in, and every submission includes a short AI-use attestation. See [Submitting your work](/tracks/website-ui/submitting-your-work#_3-say-how-you-used-ai).

## Glossary

| Term | Meaning |
|---|---|
| **API** | The small Python (FastAPI) service that saves survey responses. It answers addresses starting `/api/`. |
| **Branch** | Your own line of changes in Git. Make one for each piece of work, starting from `develop`. |
| **Design concept** | Screens that show a new way to use the site, as Figma frames, AI mock-ups or photographed sketches. No code. |
| **`develop`** | The branch where new work lands. Pull requests go against `develop`, not `main`. |
| **Dev site** | [dev.ridescoredc.com](https://dev.ridescoredc.com/), the shared development server. Front-End setups get their map data from it. |
| **Docker** | Runs the database, API, tile server and nginx on your own machine. Only the Full Stack setup needs it. |
| **Done when** | The checklist on each topic page that defines a finished result and guides feedback. |
| **Drive folder** | A Google Drive folder your team shares for anything that isn't code. It must open in a private browser window. |
| **Fork** | Your own copy of a repository on GitHub. You push your branch there and open a pull request from it. |
| **Front-End setup** | Git, Node.js and an editor. Runs the pages on your laptop with `npm run dev`; map data comes from the dev site. Enough for most code topics. |
| **Full Stack setup** | Front-End plus Docker and uv. Runs the whole site, database included, on your machine. Needed to store new data or change the API. |
| **LTS** | Level of Traffic Stress: a 1–4 rating of how stressful a street is to bike, from calm to hostile. The basis of the safety score. |
| **MapLibre** | The JavaScript library that draws the map in the browser. |
| **Martin** | The tile server. It turns database rows into map tiles. |
| **Migration** | A numbered file that changes the database tables, applied with `npm run migrate`. Never edit one that has already run. |
| **Plan or proof of concept** | What Advanced topics hand in: a written plan, or a small working piece of code that proves the idea. |
| **PostGIS** | The database: PostgreSQL with map geometry support. |
| **Pull request (PR)** | A request to merge your branch into the project. How code is handed in. |
| **RideScore** | The project's safety score for each street block, blending LTS with the bike facility and crash history. |
| **`segment_id`** | A street block's lasting ID. Survey answers are stored against it. |
| **Spec** | A written plan or proposal, for example on the [models wiki](https://github.com/civictechdc/ridescoredc-models/wiki) proposal template. |
| **Survey** | The page at `/survey/` where a rider paints a route on the map and rates it block by block. It never shows our scores. |
| **`tile_id`** | A number the map uses internally. It changes with every data build, so never store it. |
| **Vite** | The development server behind `npm run dev`. Serves the pages at `localhost:5173` and reloads on save. |
