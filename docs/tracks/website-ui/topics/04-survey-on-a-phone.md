# Topic 4: A survey that works on a phone

<Badge type="warning" text="Intermediate" /> <Badge type="info" text="Feature" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) <span class="or">or</span> [Full Stack (Docker)](/tracks/website-ui/full-stack-guide) (optional, to check submissions land in your own database) |
| **Setup before Saturday** | About 10 minutes (the [Front-End guide](/tracks/website-ui/frontend-guide)), plus a phone you can test on |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like mobile UI, touch interactions and CSS, and have a phone to test with |
| **What you can share** | Usually a pull request |

</div>


*Related: [Topic 5: Rethink route drawing](/tracks/website-ui/topics/05-rethink-route-drawing) · [Topic 6: Fix the route-selector bugs](/tracks/website-ui/topics/06-fix-the-route-selector-bugs) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

Most riders will open the survey on a phone, often right after a ride. The survey already has a phone layout. The questions open in a panel that slides up over the lower half of the screen (a "bottom sheet"), and the map sits in the top half. But it doesn't yet feel like a phone app:

- **Buttons are small.** Many are smaller than a fingertip, so riders tap the wrong thing.
- **The sheet is stuck at half the screen.** It has a drag handle, but the handle does nothing. Riders can't pull the sheet up to answer or down to see their route.
- **You can't move the map while painting.** To reach the next part of your route, you have to leave paint mode and come back. The painting tips also sit right where you're trying to paint.
- **Heights may jump** when the phone's address bar shows or hides.

| Map controls are small | Paint mode: map won't move, tips cover it | The sheet: stuck at half, small buttons |
|---|---|---|
| ![The survey on a phone, with small map control buttons](/images/topic-04/map-controls.jpg) | ![Paint mode on a phone, with an instruction box over the lower map](/images/topic-04/paint-mode.jpg) | ![The survey sheet open on a phone, covering the lower half](/images/topic-04/survey-sheet.jpg) |

*Screenshots from [dev.ridescoredc.com/survey/](https://dev.ridescoredc.com/survey/) on a simulated phone, October 2, 2026.*

If the survey is frustrating on a phone, we lose the feedback that keeps the scores honest.

### Why it matters

The survey is how riders' real experience gets back into the project, and most of that happens on a phone, right after a ride. Every extra tap, mis-tap or "I can't see my route" moment loses a response. Small fixes add up: a survey that's easy with one thumb collects more, and more honest, feedback.

### Who it's for

- **Riders finishing a ride**, standing on a corner, one hand on the bike, in sun or rain.
- **People with larger fingers, tremors or low vision**, for whom 24 px buttons are a barrier, not an inconvenience.
- **First-time participants** recruited by the Community Research track, who won't read instructions.

### How it connects

- **Topic 5** rethinks how a route is entered, and **Topic 6** fixes bugs in the same painting code. Chat with them so you don't edit the same lines.
- The answers riders give are what the **Models track** can compare against its scores.
- **Topic 15** teams may design a faster survey you can borrow from.

### Example ideas

- Raise every tap target to 44 × 44 px and check spacing on a 375 px screen.
- A sheet that snaps between peek, half and full height when dragged.
- Two-finger pan while one finger paints, or a clear "move map" toggle.
- Move the painting hint out of the way after the first stroke.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git | Download the code and make a branch | [git-scm.com](https://git-scm.com/downloads) |
| Node.js 20 or newer | Runs the development server (`npm run dev`) | [nodejs.org](https://nodejs.org) |
| A code editor | Edit the survey page | [VS Code](https://code.visualstudio.com) |
| A GitHub account | Open a pull request | [github.com/signup](https://github.com/signup) |
| A phone | Test on a real touch screen | your own |
| Optional: Docker Desktop and uv | Check that submissions land in your own database | [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl). The Front-End setup runs the whole survey, including submitting. Answers go to the shared dev server as test data and are discarded after the event. To check a submission end to end on your own copy, also follow the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide).

**Extra step for this topic: open your local site on your phone.** Start the server so other devices can reach it. Then open the "Network" address it prints on your phone (both devices on the same Wi-Fi):

```sh
npm run dev -- --host
```

Try this at home before Saturday, because event Wi-Fi often stops devices seeing each other. Your browser's device toolbar (F12, then the phone icon) is the fallback. It doesn't copy real touch gestures, though, so test on a real phone at least once.

### If something goes wrong

| Symptom | Fix |
|---|---|
| No "Network" address is printed | You left out `-- --host`. |
| The phone can't load the Network address | The Wi-Fi isolates devices. Try a phone hotspot, or use the device toolbar. |
| On WSL, the phone can't reach the server | WSL hides its network from other devices. See [Running web servers inside Linux](/tracks/website-ui/windows-wsl#running-web-servers-or-jupyter-lab-inside-linux), or use the device toolbar. |
| The phone layout doesn't appear on a laptop | It switches on below 768 px wide; narrow the window or use the device toolbar. |

## 2. Know before you start

- **The numbers behind the problem.** Measured on the dev site on October 2, 2026, in Chrome emulating a 390 × 844 phone with touch:
    - The phone layout starts below 768 px wide. Painting with a finger doesn't scroll the page.
    - A fingertip needs about 44 × 44 px. The map controls are 28–30 px tall. In the sheet, the 1–10 rating buttons are 24 px wide, the close button is 18 × 19 px and "more info…" is 15 px tall.
    - A 250 px upward drag on the sheet's handle moved the sheet 0 px. With the sheet open, the map's attribution bar takes another strip of the half that's left.
    - Paint mode turns off panning and pinch-zoom.
    - The sheet uses `50vh`, which on many phone browsers doesn't account for the address bar showing and hiding. Check this one on a real phone.
- **Where the phone layout lives.** Everything is in `frontend/survey/index.html`: the `@media (max-width: 768px)` rules (search for `768px`), the bottom sheet (`#survey-sheet`, `.ss-handle`), and paint mode, which disables the map's gestures (search for `dragPan.disable`). See [Change the survey](/tracks/website-ui/making-changes#change-the-survey).
- **Topics 5 and 6 edit the same paint code.** Keep layout changes in the CSS where you can, and talk to those teams before changing paint mode, so you don't undo each other's work.
- **Heads-up: scores stay off the survey.** It uses the `survey_segments` tiles, which carry no score. Please leave the scored layer out, because riders should give their own view before seeing ours.
- **Please keep desktop working.** Above 768 px the sheet becomes a panel on the right.

## 3. The challenge

### Core goal (2–3 hours)

1. **Warm-up (about 30 minutes, CSS only):** make the survey's tap targets at least 44 × 44 px. Switch the sheet's height to `dvh` (a height unit that adjusts when the address bar shows or hides). Check nothing overlaps on a 375 px wide screen.
2. **Then pick one:**
    - **A draggable sheet.** Make the handle work: drag the sheet up to answer, down to see the map, snapping to two or three heights.
    - **Panning while painting.** Let a rider move the map without leaving paint mode. For example, two fingers pan while one finger paints, or a clear "move map" toggle.

Test a complete survey run, from opening the page to submitting, on a real phone.

### Approaches

- Walk through the survey on a phone first, and list every moment of friction before changing anything.
- For the sheet, pointer events (one set of browser events for mouse, finger and pen) on the handle plus a CSS `transform` keep it smooth. Call `map.resize()` when the visible map area changes, as the code already does when the sheet opens.
- For panning, MapLibre's handlers can be switched on and off one by one (`dragPan`, `touchZoomRotate`). Watch how many fingers (active pointers) are down.

### Stretch goals

- Do both the sheet and panning.
- Save progress, so a rider who gets a phone call mid-survey doesn't lose their route.
- Larger text and contrast that pass a basic accessibility check.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] Survey tap targets are at least 44 × 44 px on a 375 px wide screen, and nothing overlaps.
- [ ] Your chosen improvement (draggable sheet, or panning while painting) works on a real phone.
- [ ] A complete survey run (paint a route, answer the questions, submit) works on that phone.
- [ ] Desktop still works, with no new errors in the browser console (press F12).

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- **Background pack:** [download topic-04-survey-on-a-phone.zip](/downloads/website-ui/topic-04-survey-on-a-phone.zip), design notes and analysis for this topic: the per-segment survey plan and a clickable bottom-sheet mock-up. Intended more for use with an AI assistant, for rapid comprehension of the issue: give it the Markdown files (Word versions are included too). Checked against today’s code; each section is marked as built, partly built, or an idea. Want everything? Grab [all notes across topics](/downloads/website-ui/all-notes-across-topics.zip) (just in case 😄).
- [Survey on the dev site](https://dev.ridescoredc.com/survey/) · [Website repository](https://github.com/civictechdc/ridescoredc-website)
- [MapLibre handlers (dragPan, touchZoomRotate)](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#dragpan) · [MDN: pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [MDN: viewport units (dvh)](https://developer.mozilla.org/en-US/docs/Web/CSS/length#dynamic_viewport_units) · [Touch target size (WCAG 2.5.5)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
