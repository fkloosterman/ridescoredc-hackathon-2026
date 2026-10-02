# Setting up

*Install what your topic needs, ideally before Saturday: event Wi-Fi is slow with a full room. Each topic page lists its exact tools.*

## Which setup do I need?

| Setup | For | You install | Time | Guide |
|---|---|---|---|---|
| **None** | Design concepts, plans and specs | Nothing. A browser, plus Figma or a document | — | the topic page |
| **Front-End** | Pages, map styling, the survey's look and flow, a landing page or tutorial | Git, Node.js 20+, a code editor, a GitHub account | about 10 minutes | [Front-End guide](/tracks/website-ui/frontend-guide) |
| **Full Stack** | The API, the database, storing new survey answers, what data the map carries | Everything in Front-End, plus Docker Desktop and uv | about 30 minutes, plus downloads | [Full Stack guide](/tracks/website-ui/full-stack-guide) |

Most code topics only need Front-End. The [topic list](/tracks/website-ui/topics) shows the setup for each topic.

## The guides

### [Windows (WSL)](/tracks/website-ui/windows-wsl)

On Windows, start here. Installs a Linux environment inside Windows (WSL 2 with Ubuntu), with Git, VS Code, Docker Desktop and uv configured to work with it. The other guides then work the same as on macOS and Linux.

### [Front-End guide](/tracks/website-ui/frontend-guide)

Fork and clone the website repository, run `npm install`, and start the development server with `npm run dev`. The pages run from your own folder at `http://localhost:5173` and reload as you save; map data and the survey API come from the shared dev site, so nothing else has to run.

### [Full Stack guide](/tracks/website-ui/full-stack-guide)

Do the Front-End guide first. Then start the database, API, tile server and nginx with `npm run stack`, and load DC's road data and the survey tables with `npm run setup`. The whole site runs at `http://localhost:8000`, offline if you like.

## You're ready when

- **Front-End:** `http://localhost:5173` shows the map with colored streets, and `http://localhost:5173/survey/` shows the survey.
- **Full Stack:** `http://localhost:8000/health` returns `{"status":"ok"}` and the map loads at `http://localhost:8000`. If `/health` returns 502 on the very first start, run `npm run restart -- fastapi`.

Stuck? Bring your laptop on Saturday anyway: moderators will help you get going at 11:00.
