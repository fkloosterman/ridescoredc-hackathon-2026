# Topic 7: Riders report hazards

<Badge type="warning" text="Intermediate → Advanced" /> <Badge type="info" text="Feature" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Full Stack (Docker)](/tracks/website-ui/full-stack-guide) <span class="or">or</span> <span class="chip">No install needed</span> (if you hand in a plan) |
| **Setup before Saturday** | About 30 minutes plus downloads (the [Full Stack guide](/tracks/website-ui/full-stack-guide)); do it at home, not on event Wi-Fi |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You want to work across the page, the API and the database, or you like thinking through product and privacy decisions |
| **What you can share** | A pull request or a plan, whichever fits |

</div>


*Related: [Topic 15: Design a concept](/tracks/website-ui/topics/15-design-a-concept) · [Topic 12: Read-only admin page](/tracks/website-ui/topics/12-read-only-admin-page) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

Riders know things no dataset does: a bike lane that's always blocked by delivery trucks, a pothole at a corner, a spot where they keep having near misses. RideScore DC has no way for them to tell us. A hazard report would make the map more current and more trusted, but it raises real questions: what to collect, where to store it, who sees it, and how to handle false or abusive reports.

### Why it matters

The score is built from published data, which is months or years old and never mentions a blocked lane or a new pothole. Riders see those every day. Letting them report what they see would make RideScore DC more current, more trusted, and more useful to advocates, who could point to patterns of reports on a corridor. Getting it wrong, though, means spam, abuse or personal data the project can't protect, so the design decisions matter as much as the code.

### Who it's for

- **Daily riders** who want to warn others about a specific spot.
- **Advocates** collecting evidence for a fix on one street.
- **The project team**, who would need to review, trust and eventually act on reports.

### How it connects

- Reports would sit alongside the **survey** in the website's database (the `app` area), built the same way.
- A report pinned to a block uses the same lasting `segment_id` as survey answers.
- **Topic 12** (admin page) is where the team would review reports.
- The **Reporting safety** design prompt in **Topic 15** explores the same idea without code.
- Projects elsewhere, such as [BikeMaps.org](https://bikemaps.org/), show what riders report when asked.

### Example ideas

- A long-press on a block opens "Report a problem" with four choices: blocked lane, surface, near miss, other.
- Reports expire after a set time unless confirmed ("still there?").
- Show reports as small icons on the map, aggregated per block rather than as individual pins.
- No names or accounts at first; rate-limit by device to curb abuse.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git, Node.js 20+, a code editor, a GitHub account | Front-End basics | see the [Front-End Developer Guide](/tracks/website-ui/frontend-guide#step-1-—-install-the-required-tools) |
| Docker Desktop | Runs your own database, API and tile server | [docs.docker.com/get-docker](https://docs.docker.com/get-started/get-docker/) |
| uv | Runs the data-loading and migration scripts | [docs.astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide), then the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide), which downloads several Docker images (do it at home, not on event Wi-Fi). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl). You're ready when `http://localhost:8000/health` returns `{"status":"ok"}` and the map loads at `http://localhost:8000`.

A team member who only designs the reporting flow needs no install; see [Topic 11](/tracks/website-ui/topics/15-design-a-concept).

### If something goes wrong

| Symptom | Fix |
|---|---|
| `/health` returns 502 on the very first `npm run stack` | The API gave up before the new database was ready. Run `npm run restart -- fastapi`. |
| `npm run stack` says port 5432 is in use | Set `DB_PORT` in `.env` (see the Full Stack guide). |
| The map has no streets after `npm run setup` | Run `npm run restart -- martin`. |

## 2. Know before you start

- **Validate on your own stack.** Build and test against your local Docker copy, with made-up reports.
- **How the API stores things today.** `api/main.py` has one write endpoint, `POST /api/submissions`, which saves a survey into tables in the `app` schema. A new kind of record needs a new endpoint, a Pydantic model, and a new table. See [Add or change an API endpoint](/tracks/website-ui/making-changes#add-or-change-an-api-endpoint).
- **New tables need a migration.** Add a numbered file to `api/migrations/` and run `npm run migrate`. Never edit a migration that has already run. See [Add a database table or column](/tracks/website-ui/making-changes#add-a-database-table-or-column-—-write-a-migration).
- **Tie reports to `segment_id`.** Like survey answers, a report belongs to a block's lasting `segment_id`, not the per-build `tile_id`.
- **Showing reports on the map is the hard part.** Martin publishes only what's in the `serving` schema, so displaying reports means a new view there or loading them through the API.

## 3. The challenge

### Core goal (2–3 hours)

Choose one:

- **Proof of concept.** A rider picks a block, chooses a hazard type, optionally adds a note, and submits; the report is saved in a new `app` table on your local stack. Showing reports on the map is a stretch goal.
- **Plan.** A one- to two-page plan covering the hazard types to collect, the screens, the API and table design, how reports reach the map, and how to moderate them.

### Approaches

- Start with three or four hazard types (blocked lane, pothole or surface, near miss, other) rather than free text.
- Decide early whether reports expire: a blocked lane is temporary, a missing curb cut isn't.
- Privacy: don't collect names or precise times unless you need them.

### Stretch goals

- Show reports on the map as icons on their blocks.
- Define the reporting questions in a data file (JSON) and render the form from it, so questions can change without editing code.
- Let other riders confirm a report ("still there?").

## 4. Done when

::: tip Guideposts, not requirements
Nothing on this page is a hard rule, and the scope is yours to shape. Use this list to know when you have something worth showing, not as a test to pass. Take the topic somewhere unexpected, combine it with another, or stop at whatever you finish: an honest half-built idea with good notes is a great outcome. This is a collaborative event, not a competition. Ask us anything, help the team next to you, and bring something only you would think of.
:::

**Proof of concept:**

- [ ] A report submitted from the page is stored in your local database with its `segment_id` (show the row with `psql`).
- [ ] The migration applies to an empty database and running it twice changes nothing.
- [ ] The existing survey still submits, and `pytest` still passes.

**Plan:**

- [ ] It defines the report fields, the storage, how reports reach the map, and a moderation and privacy approach.
- [ ] It names the open decisions the team must make before building.

## 5. Hand in

Share whatever you got to, in whichever form fits:

- **Code:** a pull request against `develop`; a draft is fine.
- **Anything that isn’t code:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

A plan is just as welcome as a proof of concept here.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor; unfinished work is welcome, and we can help you wrap it up afterwards.

## Resources

- **Background pack:** [download topic-07-riders-report-hazards.zip](/downloads/website-ui/topic-07-riders-report-hazards.zip), design notes and analysis for this topic: notes on a JSON-driven survey engine from the NearMiss app, and how database migrations work. Intended more for use with an AI assistant, for rapid comprehension of the issue: give it the Markdown files (Word versions are included too). Written before a September restructure, so check names against today’s code. Want everything? Grab [all notes across topics](/downloads/website-ui/all-notes-across-topics.zip) (just in case 😄).
- [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) · [How the site works](/tracks/website-ui/how-the-site-works) · [The data](/tracks/website-ui/the-data)
- [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) · [yoyo migrations](https://ollycope.com/software/yoyo/latest/)
