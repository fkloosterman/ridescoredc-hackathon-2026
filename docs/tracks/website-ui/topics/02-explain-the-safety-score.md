# Topic 2: Explain the safety score

<Badge type="tip" text="Beginner" /> <Badge type="info" text="Content" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) <span class="or">or</span> <span class="chip">No install needed</span> (for the writers on the team) |
| **Setup before Saturday** | None for writers; about 10 minutes for whoever builds the page (the [Front-End guide](/tracks/website-ui/frontend-guide)) |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You enjoy explaining technical ideas plainly, and are happy to spend the first hour reading |
| **What you can share** | Usually a pull request |

</div>


*Related: [Topic 1: Welcome first-time visitors](/tracks/website-ui/topics/01-welcome-first-time-visitors) · [Topic 3: Make the map make sense](/tracks/website-ui/topics/03-make-the-map-make-sense) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

RideScore DC colors every street by a safety score, but the site never says how that score is made. A rider can't judge whether to trust it, and a planner or advocate can't cite it. The score is based on a modified **Level of Traffic Stress (LTS)** method. Streets are rated by speed, number of lanes, road type and the kind of bike facility, then blended with crash history. None of that is written down for the public yet.

**Writers welcome:** most of this topic is reading and writing, so team members who write the text need no install at all.

### Why it matters

A score nobody can explain is a score nobody can use. Riders choosing between two streets want to know whether "red" means fast traffic, no bike lane or a history of crashes. Advocates and planners can only cite RideScore DC in a meeting or testimony if the method is written down, sourced and honest about its limits. Explaining the method also invites corrections, because people can only spot a wrong input if they can see the inputs.

### Who it's for

- **Curious riders** who want the gist in a minute, without jargon.
- **Advocates and community organizers** who need something they can quote and link to.
- **Planners and researchers** who want the inputs, the sources and the caveats.
- One page should work at all three depths, for example a summary on top with detail below.

### How it connects

- The score comes from the **Models track's** modified LTS model. That team is in the room all day and happy to answer questions.
- **Topic 3** can link its popups and legend to your page ("Why this score?").
- **Topic 1's** landing page needs a short version of the same explanation.
- **Community Research** is testing whether people trust the map, and your page is part of the answer.

### Example ideas

- A four-step LTS ladder, from "suitable for children" to "strong and fearless only", each with a DC street photo or Street View example.
- A worked example: why 15th St NW (protected cycletrack) and 14th St NW (painted lanes, two-way traffic) score differently.
- A "what goes into the score" diagram: speed, lanes, road type, bike facility, crashes.
- A plain list of what the score can't see: construction, blocked lanes, lighting, time of day.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git | Download the code and make a branch | [git-scm.com](https://git-scm.com/downloads) |
| Node.js 20 or newer | Preview your page with `npm run dev` | [nodejs.org](https://nodejs.org) |
| A code editor | Write the page | [VS Code](https://code.visualstudio.com) |
| A GitHub account | Open a pull request | [github.com/signup](https://github.com/signup) |

<span class="alert">Do this ahead of time</span> if you'll build the page. Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

Writers can skip all of this. Draft the text in a shared document while a teammate turns it into the page.

### If something goes wrong

| Symptom | Fix |
|---|---|
| Port 5173 is in use | Run `npm run dev -- --port 5174`. |
| The page shows a 404 | A page is a folder with an `index.html`: `frontend/how-scores-work/index.html` is served at `/how-scores-work/`. |

## 2. Know before you start

- **The hard part is understanding the model, not the web code.** Spend the first hour reading, and check what you write against the sources below.
- **What the map actually shows.** Click a street on the map. The popup lists the score, RideScore, the LTS level, the bike lane type, crashes in five years, speed limit, lanes, road width, road type and pavement. [The data](/tracks/website-ui/the-data) describes each one.
- **The Custom panel changes the score.** It's in the Settings panel. Its six sliders (speed limit, lanes, bike lane type, road type, road width, pavement) reweight the score live. A good explanation covers both the default score and what the sliders do.
- **Say what the score can't tell you.** For example, it doesn't know about construction, blocked lanes, lighting or time of day, and some traffic data is from 2020. Honest limits make the score more trustworthy.
- **Ask the Models track.** They are working with the same data all day.

## 3. The challenge

### Core goal (2–3 hours)

A plain-language page, for example at `/how-scores-work/`, that explains:

1. What LTS means, from 1 (calm, suitable for children) to 4 (only for "strong and fearless" riders).
2. Which street features push a score up or down.
3. What the score can't tell you.

Link it from the map page with one small change, such as a link in the Settings panel or the attribution panel.

### Approaches

- Write for a reader with no transport background. Try one paragraph on someone outside your team.
- Use a real example: two parallel streets (for instance 14th St NW and 15th St NW) with different scores, and why.
- Keep sources visible, so the page can be cited.

### Stretch goals

- How RideScore DC's approach compares with published methods (see the LTS and Montgomery Planning links in Resources; the Models track can help).
- A "Why this score?" link in the map popup that opens the page at the right section.
- An interactive example: a slider that shows how changing one attribute moves a sample street's score.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] Someone outside your team can read the page and explain what a red street and a green street mean.
- [ ] Claims about the method match the sources or the data, and the sources are linked on the page.
- [ ] The page says at least three things the score can't tell you.
- [ ] The page is reachable from the map and works on a phone.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

If your text started in a document, it can go in the Drive folder too.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [Level of Traffic Stress, Peter Furth (Northeastern)](https://peterfurth.sites.northeastern.edu/level-of-traffic-stress/) and the [LTS criteria tables](https://bpb-us-e1.wpmucdn.com/sites.northeastern.edu/dist/e/618/files/2014/05/LTS-Tables-v2.2.pdf)
- [Montgomery Planning LTS methodology](https://montgomeryplanning.org/wp-content/uploads/2017/11/Appendix-D.pdf)
- [PeopleForBikes City Ratings methodology](https://cityratings.peopleforbikes.org/about/methodology)
- [DC Roadway Block data](https://opendata.dc.gov/datasets/DCGIS::roadway-block/about) · [The data](/tracks/website-ui/the-data)
