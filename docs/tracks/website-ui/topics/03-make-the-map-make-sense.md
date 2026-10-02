# Topic 3: Make the map make sense

<Badge type="warning" text="Intermediate" /> <Badge type="info" text="Feature" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) |
| **Setup before Saturday** | About 10 minutes (the [Front-End guide](/tracks/website-ui/frontend-guide)) |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You know some JavaScript or CSS and care about clear visual design and accessibility |
| **What you can share** | Usually a pull request |

</div>


*Related: [Topic 2: Explain the safety score](/tracks/website-ui/topics/02-explain-the-safety-score) · [Topic 15: Design a concept](/tracks/website-ui/topics/15-design-a-concept) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

The main map colors streets from red to green, but there is no legend, so a visitor has to guess what the colors mean. Click a street and the popup lists raw values such as `LTS 3` or a RideScore number with no explanation. The map looks the same at every zoom level, and a red-to-green ramp is hard to read for riders with color-vision deficiency. The data knows a lot; the map doesn't say it.

### Why it matters

The map is RideScore DC's main product. If a visitor can't read it in a few seconds, every other improvement is wasted. Today the data behind each block is rich (lanes, speed, bike facility, crash counts), but the map shows a color and a table of raw values. Turning that into something a rider understands at a glance is the difference between a data demo and a useful tool.

### Who it's for

- **Riders planning a trip**, scanning for green streets near them, often on a phone.
- **Riders with color-vision deficiency** (about 1 in 12 men), for whom red-to-green alone fails.
- **Advocates** looking for the worst blocks in their neighborhood to make a case.

### How it connects

- The colors come from the score the **Models track** produces; the popup fields come from the data described in [The data](/tracks/website-ui/the-data).
- **Topic 2** explains the score in depth; your legend and popups can link to it.
- **Topic 11's** spec would eventually move labels and colors out of the page and into the data.
- **Topic 15** teams may sketch map ideas you can build.

### Example ideas

- A compact legend with words ("calm", "stressful", "avoid"), not just colors.
- Popups that translate values: "LTS 3: comfortable only for confident riders", with the two or three reasons that drive the score.
- A color-blind-safe palette, or line width and dashes that carry meaning alongside color.
- Zoom-aware styling: thin lines across the city, labels and detail up close.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git | Download the code and make a branch | [git-scm.com](https://git-scm.com/downloads) |
| Node.js 20 or newer | Runs the development server (`npm run dev`) | [nodejs.org](https://nodejs.org) |
| A code editor | Edit the map page | [VS Code](https://code.visualstudio.com) |
| A GitHub account | Open a pull request | [github.com/signup](https://github.com/signup) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

Optional: a color-blindness simulator, such as the one built into Chrome DevTools (Rendering → Emulate vision deficiencies).

### If something goes wrong

| Symptom | Fix |
|---|---|
| The map is blank or streets are missing | Check the `tiles and API` line printed by `npm run dev`. |
| A style change doesn't show | MapLibre paint properties are set when the layer is added in `frontend/index.html`; reload the page after saving. |
| `git status` shows `package-lock.json` changed | Don't commit it: run `git checkout package-lock.json`. |

## 2. Know before you start

- **Where things live.** The scored layer, its colors and the popup are in `frontend/index.html` (search for `update_score` and `line-color`). The basemap, center and tile addresses are in `frontend/src/shared/config.js`; the crash layer is in `frontend/src/shared/crashes.js`. See [Change how the map looks](/tracks/website-ui/making-changes#change-how-the-map-looks).
- **The colors come from one expression.** `user_score` is interpolated from red (0) through yellow (50) to green (100).
- **The popup can only show what the tiles carry.** The fields available are listed in [The data](/tracks/website-ui/the-data). Adding a new field needs the Full Stack setup and a change in the Models repository ([Add a field to the crash popup](/tracks/website-ui/making-changes#add-a-field-to-the-crash-popup) shows the pattern).
- **Labels are hard-coded today.** That's fine for this topic. Moving them into the data is [Topic 11](/tracks/website-ui/topics/11-write-a-spec)'s job.
- **Only the map page shows scores.** Don't add score layers to the survey page; it must never show our scores.

## 3. The challenge

### Core goal (2–3 hours)

Make **one or two** concrete improvements that make the map easier to understand, and check them with someone new. For example:

- A legend that explains the colors in words ("calm", "stressful"), not just numbers.
- A popup that explains its values, for example "LTS 3: comfortable for confident riders only".
- A color-blind-safe palette, or patterns or widths that don't rely on color alone.
- Styling that changes with zoom: thinner lines when zoomed out, labels or more detail when zoomed in.

### Approaches

- Ask a first-time user to find "the safest street near here" before and after your change, and note what changed.
- Keep the legend in sync with the Custom sliders: when the score is reweighted, the legend still has to be true.

### Stretch goals

- A breakdown of the factors behind a street's score in the popup.
- A "compare two streets" view.
- Distinguish missing data from bad scores visually.

## 4. Done when

::: tip Guideposts, not requirements
Nothing on this page is a hard rule, and the scope is yours to shape. Use this list to know when you have something worth showing, not as a test to pass. Take the topic somewhere unexpected, combine it with another, or stop at whatever you finish: an honest half-built idea with good notes is a great outcome. This is a collaborative event, not a competition. Ask us anything, help the team next to you, and bring something only you would think of.
:::

- [ ] A person outside your team can explain what the colors mean without help (record what they said).
- [ ] Your change reads correctly in a color-vision-deficiency simulation, or you explain why it doesn't need to.
- [ ] The Custom sliders, Imagery and Accidents buttons still work, with no new console errors.
- [ ] You can show the difference, for example side by side or with before and after screenshots.

## 5. Hand in

Share whatever you got to, in whichever form fits:

- **Code:** a pull request against `develop`; a draft is fine.
- **Anything that isn’t code:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor; unfinished work is welcome, and we can help you wrap it up afterwards.

## Resources

- **Background pack:** [download topic-03-make-the-map-make-sense.zip](/downloads/website-ui/topic-03-make-the-map-make-sense.zip), design notes and analysis for this topic: how the map page and its click and hover events were built. Intended more for use with an AI assistant, for rapid comprehension of the issue: give it the Markdown files (Word versions are included too). Written before a September restructure, so check names against today’s code. Want everything? Grab [all notes across topics](/downloads/website-ui/all-notes-across-topics.zip) (just in case 😄).
- [MapLibre style expressions](https://maplibre.org/maplibre-style-spec/expressions/) · [MapLibre GL JS docs](https://maplibre.org/maplibre-gl-js/docs/)
- [ColorBrewer](https://colorbrewer2.org/) for color-blind-safe palettes
- [The data](/tracks/website-ui/the-data) · [How the site works](/tracks/website-ui/how-the-site-works)
