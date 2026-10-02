# Topic 5: Rethink route drawing

<Badge type="warning" text="Intermediate → Advanced" /> <Badge type="info" text="Feature" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) <span class="or">or</span> <span class="chip">No install needed</span> (if you hand in a plan) |
| **Setup before Saturday** | About 10 minutes (the [Front-End guide](/tracks/website-ui/frontend-guide)) |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You enjoy interaction design and map interfaces, and are comfortable reading unfamiliar JavaScript |
| **What you can share** | A pull request or a plan, whichever fits |

</div>


*Related: [Topic 4: A survey that works on a phone](/tracks/website-ui/topics/04-survey-on-a-phone) · [Topic 6: Fix the route-selector bugs](/tracks/website-ui/topics/06-fix-the-route-selector-bugs) · [Topic 15: Design a concept](/tracks/website-ui/topics/15-design-a-concept) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

The survey asks riders to **paint** the route they rode by dragging a finger or mouse along the streets. It's quick when it works, but it's easy to get wrong. Strokes snap to the wrong street, small mistakes mean repainting, and it's hard on a phone. The survey links our scores to real riders' experience, so the easier it is to enter a route, the more feedback we get.

**How it works today**, on [dev.ridescoredc.com/survey/](https://dev.ridescoredc.com/survey/): press **Paint Route** and drag along the streets. Blocks highlight as the stroke snaps to them. After you lift, a badge offers **Undo**, **Undo stroke**, **Clear** and **Rate route**. **Unpaint** switches to an eraser that removes blocks you drag across.

| Painting up 14th St, turning onto U St | After lift: the selection badge | Unpaint: erasing a block |
|---|---|---|
| ![A route being painted up 14th St NW and east along U St NW](/images/topic-05/paint-stroke.jpg) | ![The painted route with the badge offering Undo, Undo stroke, Clear and Rate route](/images/topic-05/route-painted.jpg) | ![Unpaint mode with a red erase stroke over a U St block](/images/topic-05/correction-tools.jpg) |

Painting also has two known bugs (wrong street at intersections, and blocks vanishing near turns). [Topic 6](/tracks/website-ui/topics/06-fix-the-route-selector-bugs) has steps to see them. On a phone, the painting tips cover part of the map you're trying to paint.

### Why it matters

Every response starts with a route. If entering one is slow or gives a wrong route, riders give up. Or worse, they rate streets they never rode, and the project learns the wrong lesson. Painting is a clever idea, but it needs precise finger movement on a small screen. A better way to enter a route means more responses, and ones we can trust more.

### Who it's for

- **Riders who know their route** but not the street names along it.
- **People on phones**, where precise dragging is hardest.
- **Riders with longer or twisting routes**, where one stroke rarely works.

### How it connects

- **Topic 6** fixes bugs in today's painting code. If you replace painting, talk to them first.
- **Topic 4** makes the survey usable on phones, so a new method should work there too.
- Routing ideas overlap with the **Route planning** design prompt in **Topic 15**.
- The **Models track** uses the blocks each rider chose, in order, so whatever you build still needs to save them.

### Example ideas

- **Tap to build**: tap blocks one by one, with gaps filled in automatically.
- **Start and end**: pick two points, get a suggested route, then adjust it.
- **Draggable waypoints**: after painting, drag a handle at a wrong turn instead of repainting.
- **Confirm the doubtful bits**: highlight the block the tool is least sure about and ask "did you ride this?"

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git | Download the code and make a branch | [git-scm.com](https://git-scm.com/downloads) |
| Node.js 20 or newer | Runs the development server (`npm run dev`) | [nodejs.org](https://nodejs.org) |
| A code editor | Edit the survey page | [VS Code](https://code.visualstudio.com) |
| A GitHub account | Open a pull request | [github.com/signup](https://github.com/signup) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

Routing ideas may use an outside library or service (for example a routing engine). Add one on the day only if your plan needs it.

### If something goes wrong

| Symptom | Fix |
|---|---|
| The survey map shows grey streets but nothing highlights | You need to be in paint mode: press **Paint route** first. |
| Painted streets disappear when you lift your finger | That's a known bug (Topic 6), not something you broke. |

## 2. Know before you start

- **The short version.** As you drag, the code finds the nearest street block, checks it fits the direction you're moving, and highlights it. When you're done, it groups the blocks by street so the questions can ask about each section.
- **The details.** In `frontend/survey/index.html`, each pointer move adds a point, the stroke's direction is tracked, and `findBestCandidate` queries the street features within about 40 px of the pointer and picks the best match. Picks are queued, checked against the direction of the stroke, then committed and highlighted. Undo, Undo stroke, tap-to-remove and an erase brush handle corrections. After painting, the chosen blocks are grouped by street into sections for the questions.
- **Topic 6 fixes bugs in the same code.** If you replace the painting tool, talk to any Topic 6 team, because otherwise you may undo each other's work.
- **Save answers by `segment_id`.** The map works with an integer `tile_id`, but please save survey answers by the block's lasting `segment_id`, because `tile_id` changes every time the map data is rebuilt. The existing `segmentIdsFor()` function converts one to the other, so keep using it. See [tile_id and segment_id](/tracks/website-ui/how-the-site-works#tile-id-and-segment-id).
- **Heads-up: scores stay off the survey.** Whatever you build, please keep our scores out of it, because riders should give their own view before seeing ours.
- **Test submissions are fine.** Submissions from your local survey go to the shared dev server and will be discarded after the event.

## 3. The challenge

### Core goal (2–3 hours)

Build **one** alternative or improvement to entering a route, and compare it with the current painting tool on the same test route. For example:

- **Tap to build.** Tap blocks one by one to add or remove them, with the route connected automatically.
- **Draggable waypoints.** After painting, show handles at turns that can be dragged to fix a wrong section without repainting.
- **Start and end.** Pick a start and a destination and fill in the route between them, then let the rider adjust it.
- **Better correction.** A clearer undo, or highlighting the most likely mistake for the rider to confirm.

This topic can run long. If a full build doesn't fit, a **plan** is a great hand-in: what you'd build, how, and what you tested.

### Approaches

- Pick a test route of about 10 blocks that crosses two busy intersections, and time how long each method takes.
- Waypoints and start-to-end routing need a road graph (a list of which blocks connect at which corners). The map tiles only cover the area on screen, so think about where that graph comes from.
- The [route_snapper](https://github.com/dabreegster/route_snapper) project is a good reference for snapping routes to a street network in MapLibre.

### Stretch goals

- Try two methods and compare them with a few testers.
- Make the method work well on a phone.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

**If you built it:**

- [ ] Your method enters the test route correctly, and you can show it's faster or less error-prone than painting.
- [ ] The submitted survey saves the right `segment_id`s, in route order (you can check in the browser's Network tab, F12).
- [ ] Painting still works, or you explain why your method replaces it.

**If you planned it:**

- [ ] The plan names the method, the data it needs (including the road graph), the steps to build it, and the risks.
- [ ] It has a sketch or mock-up, and you tried it with at least one person.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

A plan is just as welcome as code here.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- **Background pack:** [download topic-05-rethink-route-drawing.zip](/downloads/website-ui/topic-05-rethink-route-drawing.zip), design notes and analysis for this topic: the paint-a-route design notes, an editing roadmap, and an audit of the route_snapper library. Intended more for use with an AI assistant, for rapid comprehension of the issue: give it the Markdown files (Word versions are included too). Checked against today’s code; each section is marked as built, partly built, or an idea. Want everything? Grab [all notes across topics](/downloads/website-ui/all-notes-across-topics.zip) (just in case 😄).
- [Survey on the dev site](https://dev.ridescoredc.com/survey/) · [Change the survey](/tracks/website-ui/making-changes#change-the-survey)
- [route_snapper](https://github.com/dabreegster/route_snapper) · [MapLibre GL JS docs](https://maplibre.org/maplibre-gl-js/docs/)
