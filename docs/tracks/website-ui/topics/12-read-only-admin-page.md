# Topic 12: Read-only admin page

<Badge type="danger" text="Advanced" /> <Badge type="info" text="Feature" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Full Stack (Docker)](/tracks/website-ui/full-stack-guide) <span class="or">or</span> <span class="chip">No install needed</span> (if you hand in a plan) |
| **Setup before Saturday** | About 30 minutes plus downloads (the [Full Stack guide](/tracks/website-ui/full-stack-guide)); do it at home, not on event Wi-Fi |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You know some Python or JavaScript and care about privacy and access control |
| **What you can share** | A pull request or a plan, whichever fits |

</div>


*Related: [Topic 7: Riders report hazards](/tracks/website-ui/topics/07-riders-report-hazards) · [Topic 8: DC by the numbers](/tracks/website-ui/topics/08-dc-by-the-numbers) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

Riders' survey answers are saved, but the team can only read them by writing database queries (SQL). A simple read-only page would show what riders are saying, reveal confusing questions, and help decide what to change. The answers are personal, though, so **who can see the page matters more than the page itself.**

### Why it matters

The survey only helps if someone reads the answers. Right now the team can't easily see whether responses are arriving, whether a question confuses people, or which streets riders keep flagging. A simple view would close that loop. Because survey answers describe where real people ride, privacy is part of the design from the start.

### Who it's for

- **The project team**, reviewing responses and survey quality.
- **The riders who answered**, whose trust depends on their data being handled carefully.

### How it connects

- Reads the same `app` tables the survey writes to (see the Full Stack guide).
- **Topic 7's** hazard reports would need the same kind of review screen.
- Aggregated views could feed **Topic 8's** statistics without exposing individual responses.

### Example ideas

- A newest-first list of responses with their route sections and ratings, using made-up local data.
- Counts and averages per block instead of individual responses.
- A short access-control proposal: who can see it, and how they sign in.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git, Node.js 20+, a code editor, a GitHub account | Front-End basics | [Front-End Developer Guide](/tracks/website-ui/frontend-guide) |
| Docker Desktop | Runs your own database, API and tile server | [docs.docker.com/get-docker](https://docs.docker.com/get-started/get-docker/) |
| uv | Runs the data-loading and migration scripts | [docs.astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide), then the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

### If something goes wrong

| Symptom | Fix |
|---|---|
| `/health` returns 502 on the very first `npm run stack` | Run `npm run restart -- fastapi`. |
| Your new endpoint returns 404 | Start its route with `/api/`, because nginx (the web server that routes requests) only sends `/api/...` addresses to the API. |

## 2. Know before you start

- <span class="alert">Use local, made-up data only.</span> Build against your own Docker stack, and fill it with test responses you create by submitting the survey at `http://localhost:8000/survey/`. Please keep it off the dev and production databases, because those hold real riders' answers.
- **Where responses live.** Three tables in the `app` [schema](/tracks/website-ui#glossary) (a named group of tables): `survey_submissions` (one row per survey), `survey_contiguous_segments` (one per street section, with ratings) and `survey_granular_segments` (one per block). See [Looking at the data](/tracks/website-ui/full-stack-guide#looking-at-the-data).
- **The API serves no pages.** Pages live in `frontend/`; the API only answers `/api/...`. A new read endpoint (an API address your page can ask for data) goes in `api/main.py`. See [Add or change an API endpoint](/tracks/website-ui/making-changes#add-or-change-an-api-endpoint).
- **Access control is part of the job.** A good plan says who can see the page and how they sign in, because survey answers describe where real people ride.

## 3. The challenge

### Core goal (2–3 hours)

Choose one:

- **Proof of concept.** A read-only `GET /api/...` endpoint and a page that lists responses (newest first) with the ratings per street section, running on your local stack. Add a few notes on access control.
- **Plan.** A one- to two-page plan: what the page shows, what it leaves out, how access is controlled, how long data is kept, and what the team still needs to decide.

### Approaches

- Show only what the team needs; leave free-text comments behind a click, or out entirely.
- Consider a summary view (counts and averages per block) that would need less protection than individual responses.
- For access control, compare options such as a shared secret, a login provider, or keeping the page reachable only on the server itself.

### Stretch goals

- Filter by date or street.
- Show a response's route on a small map.
- Export to CSV.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

**Proof of concept:**

- [ ] The page lists test responses from your local database, with their street sections and ratings.
- [ ] The endpoint is read-only (no way to change or delete data through it).
- [ ] You can explain who should see the page and how they'd sign in.
- [ ] The survey still submits, and `pytest` still passes.

**Plan:**

- [ ] It covers what's shown, access control, data retention and open decisions.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

A plan is just as welcome as a proof of concept here.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) · [Making website changes](/tracks/website-ui/making-changes)
- [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) · [FastAPI security](https://fastapi.tiangolo.com/tutorial/security/)
