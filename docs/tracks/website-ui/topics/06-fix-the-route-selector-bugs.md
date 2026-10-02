# Topic 6: Fix the route-selector bugs

<Badge type="warning" text="Intermediate" /> <Badge type="danger" text="Bug" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) |
| **Setup before Saturday** | About 10 minutes (the [Front-End guide](/tracks/website-ui/frontend-guide)). You can reproduce both bugs on the dev site before installing anything |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like debugging: reproduce, find the cause, fix, prove. Comfortable with JavaScript and the browser console |
| **What you can share** | Usually a pull request |

</div>


*Related: [Topic 5: Rethink route drawing](/tracks/website-ui/topics/05-rethink-route-drawing) · [Topic 13: Your own bug](/tracks/website-ui/topics/13-your-own-bug) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

The survey's paint-a-route tool has two known bugs that make riders' routes wrong. You can see both on the live dev site, and we already know which code causes them. So the work is to reproduce, fix and show the fix works.

| | Bug A: wrong street at intersections | Bug B: blocks appear, then vanish |
|---|---|---|
| What riders see | A stroke that ends or turns at a crossing picks up the cross street, or the next block past it. | Blocks turn blue while painting, then disappear when the finger lifts, often the ones near a turn. |
| How often (tested) | Strokes **ending** on an intersection picked the cross street 5 of 8 times. Going just past a corner added the next block 6 of 6 times. Straight strokes through a crossing rarely did (1 of 19). | Every slow L-shaped stroke lost the blocks near its corner (6 of 6). A separate tile-edge case lost a whole block 6 of 6 times at zoom 17. |
| Why it happens | At a crossing, every street is equally close, so the tool stops caring which way you were heading and picks whichever street comes first. | **Main cause:** slow strokes get simplified to a straight line, so blocks near the turn look too far away and are dropped. **Second cause:** long blocks are cut into pieces at map-tile edges, and the tool sometimes measures the wrong piece. |

### How to reproduce

Tested on [dev.ridescoredc.com/survey/](https://dev.ridescoredc.com/survey/) on October 2, 2026, with a mouse at 1280 × 800 and on an emulated phone. No setup needed.

**Bug A, wrong street.** Press **Paint Route**, zoom to about level 16 around 14th St NW and U St NW, then paint north up 14th St and **stop exactly on the intersection with W St**. The W St block gets added and the badge jumps to "3 roads selected". Ending on 11th St at U, V or W St does the same.

| Mid-stroke: the cross block lights up | After lift: W St added, "3 roads selected" |
|---|---|
| ![Mid-stroke on 14th St NW, with the W St cross block already highlighted](/images/topic-06/bug-a-mid-stroke.jpg) | ![After lift, the W St block toward 13th St is selected](/images/topic-06/bug-a-wrong-street.jpg) |

**Bug B, blocks vanish (main cause).** Paint **slowly** up 14th St NW from about T St, turn east along U St, and lift. The blocks near the corner disappear on lift, while the badge still says "2 roads selected". Fast strokes, with samples 10 px or more apart, keep every block.

| Before lift: five blocks selected | After lift: the corner blocks are gone |
|---|---|
| ![An L-shaped stroke up 14th St and along U St with five blocks highlighted](/images/topic-06/vanish-turn-before-lift.jpg) | ![After lift, the blocks near the corner of 14th and U are no longer highlighted](/images/topic-06/vanish-turn-after-lift.jpg) |

**Bug B, tile-edge case.** In the browser console run `map.showTileBoundaries = true`, zoom to 17 on Hospital Center Dr NW (a long block crossed by a tile line), paint about 150 px along the piece on the far side of the line, and lift: the whole block disappears.

| While painting | After lift |
|---|---|
| ![Hospital Center Dr NW highlighted while painting, with a tile boundary line crossing it](/images/topic-06/bug-b-mid-stroke.jpg) | ![After lift, the block and the selection badge are gone](/images/topic-06/bug-b-after-lift.jpg) |

Also noticed while testing: the "N roads selected" count counts runs of street names, not blocks, so it doesn't change when blocks vanish. And after a stroke whose blocks are removed on lift, **Undo stroke** stays disabled.

### Why it matters

These bugs make the survey record routes riders didn't ride. A response that rates the cross street instead of your street isn't just lost. It's wrong data, and it quietly teaches the project the wrong thing about a block. Riders notice too: a tool that keeps picking the wrong street feels broken, and they stop using it.

### Who it's for

- **Every survey respondent**, but especially riders on grid streets with frequent intersections, which is most of central DC.
- **Phone users**, whose fingers cover the corner they're turning at.
- **The team**, who need to trust the survey data before comparing it with the scores.

### How it connects

- **Topic 5** may replace painting altogether, so a small fix is easiest to merge either way.
- **Topic 4** works on the same page on phones.
- Correct routes are what make survey answers comparable with the **Models track's** scores.

### Example ideas

- Score candidates so direction still counts at a corner, for example adding a direction penalty instead of multiplying.
- Choose again after the stroke leaves the corner, instead of only accepting or dropping the first guess.
- When checking a long block, use its nearest tile piece, not the first one found.
- A replayable test: record a stroke's pointer positions once and replay them after every change.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git | Download the code and make a branch | [git-scm.com](https://git-scm.com/downloads) |
| Node.js 20 or newer | Runs the development server (`npm run dev`) | [nodejs.org](https://nodejs.org) |
| A code editor | Edit the survey page | [VS Code](https://code.visualstudio.com) |
| A GitHub account | Open a pull request | [github.com/signup](https://github.com/signup) |
| Optional: a screen recorder | Handy for showing a stroke before and after your fix | built into Windows (Win+Alt+R), macOS (Cmd+Shift+5) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl). You can reproduce both bugs on [dev.ridescoredc.com/survey/](https://dev.ridescoredc.com/survey/) before you install anything.

### If something goes wrong

| Symptom | Fix |
|---|---|
| You can't reproduce a bug | Zoom to about level 16 and paint slowly through a busy four-way intersection (Bug A), or turn on tile boundaries (below) and paint briefly across one (Bug B). |
| Console commands say `map is not defined` | Run them in the console of the survey page tab, after the map has loaded. |

## 2. Know before you start

- **Why Bug A happens, in detail.** The snap score is the distance to a street **multiplied** by a direction penalty. At an intersection the distance is close to zero for every street, so direction stops mattering and a tie goes to whichever street the map lists first. A later check can only accept or drop that pick, never choose again. (In testing, overshooting a corner by about 4 px was enough to add the next block.)
- **Why Bug B happens, in detail.** When the finger lifts, the stroke is resampled every 10 px to check which blocks are too far from it. `resampleUniform` only emits a point when the gap to the *next* raw sample is at least 10 px. So a slow stroke (samples closer than that) collapses to a straight line from start to end, and blocks near a turn are more than 62 px from that line and get removed. The second cause: map tiles cut long blocks into pieces sharing one ID, and the check measures only the first piece it finds, which can be the wrong end.
- **Where the code is.** All of it is in `frontend/survey/index.html`. The candidate scoring is in `findBestCandidate` (about lines 1260–1346, scoring at about 1319). The queue that accepts or drops picks is around 1376–1393. The cleanup on lift is `pruneSelectionsFarFromRawPolyline` (about 1546–1555), which uses `resampleUniform` (about 1481; step `RAW_PRUNE_SAMPLE_PX` = 10, limit `OUTLIER_PRUNE_PX` = 62) and `querySegmentFeatureById` (about 1508). Line numbers drift as people edit, so search for the function names.
- **See the tile pieces.** In the browser console (press F12) on the survey page, run `map.showTileBoundaries = true`. The lines show where tiles cut long blocks.
- **Fix one bug at a time,** in separate commits or pull requests, because small changes are easier to review.
- **Topic 5 may rewrite this tool,** so a small, targeted fix is easiest to merge either way.
- **Heads-up:** save answers by `segment_id` (not `tile_id`), because `tile_id` changes every time the map data is rebuilt. And please keep scores off the survey, because riders should give their own view before seeing ours.

## 3. The challenge

### Core goal (2–3 hours)

Pick **Bug A or Bug B** (for B, the corner case is the one riders hit most). Reproduce it on a fixed test route, fix it, and check the fix on the same route.

### Approaches

**Bug A.**

- Make the direction penalty **add** to the score instead of multiplying it, so a near-zero distance can't cancel it.
- When the queued pick fails the direction check, choose again near that point using the direction the stroke took **after** the corner, instead of dropping it.
- The continuity bonus (`lastCommittedEdge`) is stored in screen pixels and never reset; reset it at the start of each stroke.

**Bug B.**

- Make `resampleUniform` carry the distance forward between raw samples, so it emits a point every 10 px along the stroke however close the samples are. Or measure the prune distance against the raw stroke itself.
- In the cleanup, check **every** tile piece with the block's ID and use the nearest one, instead of the first found.
- Merge piece endpoints before grouping blocks into sections, so a block cut by a tile edge doesn't create an extra section.

### Stretch goals

- Fix the other bug too.
- Make thresholds scale with zoom instead of fixed pixels.
- Write a small repeatable test: a recorded list of pointer positions replayed into the tool, so future changes can be checked.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] A named test route (for example "14th St NW from Q St to U St") reproduces the bug before your change.
- [ ] After your change, painting that route selects the right blocks in at least 4 of 5 tries.
- [ ] For Bug B: the blocks you painted stay selected after you lift your finger.
- [ ] You can show the difference on the same route, in person or with before and after screenshots.
- [ ] Undo, erase and submit still work, with no new errors in the browser console.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- **Background pack:** [download topic-06-fix-the-route-selector-bugs.zip](/downloads/website-ui/topic-06-fix-the-route-selector-bugs.zip), design notes and analysis for this topic: a full root-cause analysis of both bugs, and earlier notes on the intersection problem. Intended more for use with an AI assistant, for rapid comprehension of the issue: give it the Markdown files (Word versions are included too). Checked against today’s code; each section is marked as built, partly built, or an idea. Want everything? Grab [all notes across topics](/downloads/website-ui/all-notes-across-topics.zip) (just in case 😄).
- [Survey on the dev site](https://dev.ridescoredc.com/survey/) · [Change the survey](/tracks/website-ui/making-changes#change-the-survey)
- [MapLibre `queryRenderedFeatures`](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#queryrenderedfeatures) and [`querySourceFeatures`](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#querysourcefeatures)
