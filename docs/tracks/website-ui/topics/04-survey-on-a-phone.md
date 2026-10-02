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

Most riders will open the survey on a phone, often right after a ride. The survey already has a phone layout: below 768 px wide, the questions open in a bottom sheet over the lower half of the screen, the map shrinks to the top half, and painting a route with a finger doesn't scroll the page. But it stops short of feeling like a phone app:

- **Buttons are small.** A fingertip needs about 44 × 44 px. The map controls are 28–30 px tall; in the survey sheet, the 1–10 rating buttons are 24 px wide, the close button is 18 × 19 px and "more info…" is 15 px tall.
- **The sheet is fixed at half the screen.** It has a drag handle, but the handle does nothing, so riders can't pull the sheet up to answer questions or down to see their route. With the sheet open, the map's attribution bar takes another strip of the half that's left.
- **You can't move the map while painting.** Paint mode turns off panning and pinch-zoom. To get to the next part of your route, you have to leave paint mode and come back. The painting instructions also sit over the lower middle of the map, right where you're trying to paint.
- **Heights may jump on phones.** The sheet uses `50vh`, which on many phone browsers doesn't account for the address bar showing and hiding. Check this one on a real phone.

| Map controls (28–30 px tall) | Paint mode: gestures off, hint over the map | The sheet: fixed at half, small targets |
|---|---|---|
| ![The survey on a phone, with small map control buttons](/images/topic-04/map-controls.jpg) | ![Paint mode on a phone, with an instruction box over the lower map](/images/topic-04/paint-mode.jpg) | ![The survey sheet open on a phone, covering the lower half](/images/topic-04/survey-sheet.jpg) |

*Measured on [dev.ridescoredc.com/survey/](https://dev.ridescoredc.com/survey/) on October 2, 2026, in Chrome emulating a 390 × 844 phone with touch. A 250 px upward drag on the sheet's handle moved the sheet 0 px.*

If the survey is frustrating on a phone, we lose the feedback that keeps the scores honest.

### Why it matters

The survey is how riders' real experience gets back into the project, and most of that experience happens on a phone, right after a ride. Every extra tap, mis-tap or "I can't see my route" moment loses a response. Small fixes here multiply: a survey that is comfortable with one thumb collects more, and more honest, feedback.

### Who it's for

- **Riders finishing a ride**, standing on a corner, one hand on the bike, in sun or rain.
- **People with larger fingers, tremors or low vision**, for whom 24 px buttons are a barrier, not an inconvenience.
- **First-time participants** recruited by the Community Research track, who won't read instructions.

### How it connects

- **Topic 5** rethinks how a route is entered, and **Topic 6** fixes bugs in the same painting code; coordinate so you don't edit the same lines.
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

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl). The Front-End setup runs the whole survey, including submitting: answers go to the shared dev server as test data and are discarded after the event. If you want to validate a submission end to end on your own copy, also follow the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide).

**Extra step for this topic: open your local site on your phone.** Start the server so other devices can reach it, then open the "Network" address it prints on your phone (both devices on the same Wi-Fi):

```sh
npm run dev -- --host
```

Try this at home before Saturday: event Wi-Fi often stops devices from seeing each other. Your browser's device toolbar (F12, then the phone icon) is the fallback, but it doesn't reproduce real touch gestures, so test on a real phone at least once.

### If something goes wrong

| Symptom | Fix |
|---|---|
| No "Network" address is printed | You left out `-- --host`. |
| The phone can't load the Network address | The Wi-Fi isolates devices. Try a phone hotspot, or use the device toolbar. |
| On WSL, the phone can't reach the server | WSL hides its network from other devices. See [Running web servers inside Linux](/tracks/website-ui/windows-wsl#running-web-servers-or-jupyter-lab-inside-linux), or use the device toolbar. |
| The phone layout doesn't appear on a laptop | It switches on below 768 px wide; narrow the window or use the device toolbar. |

## 2. Know before you start

- **Where the phone layout lives.** Everything is in `frontend/survey/index.html`: the `@media (max-width: 768px)` rules (search for `768px`), the bottom sheet (`#survey-sheet`, `.ss-handle`), and paint mode, which disables the map's gestures (search for `dragPan.disable`). See [Change the survey](/tracks/website-ui/making-changes#change-the-survey).
- **Topics 5 and 6 edit the same file and the same paint code.** Keep layout changes in the CSS where you can, and talk to those teams before changing paint mode.
- **The survey must never show our scores.** It draws streets from the `survey_segments` tiles, which carry no score. Don't add the scored layer.
- **Desktop must keep working.** Above 768 px the same sheet becomes a panel on the right.

## 3. The challenge

### Core goal (2–3 hours)

1. **Warm-up (about 30 minutes, CSS only):** bring tap targets on the survey to at least 44 × 44 px and switch the sheet's height to a unit that handles the address bar (`dvh`), checking nothing overlaps on a 375 px wide screen.
2. **Then pick one:**
    - **A draggable sheet.** Make the handle work: drag the sheet up to answer, down to see the map, snapping to two or three heights.
    - **Panning while painting.** Let a rider move the map without leaving paint mode, for example two fingers pan while one finger paints, or a clear "move map" toggle.

Test a complete survey run, from opening the page to submitting, on a real phone.

### Approaches

- Walk through the survey on a phone first and list every moment of friction before changing anything.
- For the sheet, pointer events on the handle plus a CSS `transform` keep it smooth; remember to resize the map (`map.resize()`) when the visible map area changes, as the code already does when the sheet opens.
- For panning, MapLibre's handlers can be switched on and off individually (`dragPan`, `touchZoomRotate`); watch for the number of active pointers.

### Stretch goals

- Do both the sheet and panning.
- Save progress, so a rider who gets a phone call mid-survey doesn't lose their route.
- Larger text and contrast that pass a basic accessibility check.

## 4. Done when

::: tip Guideposts, not requirements
Nothing on this page is a hard rule, and the scope is yours to shape. Use this list to know when you have something worth showing, not as a test to pass. Take the topic somewhere unexpected, combine it with another, or stop at whatever you finish: an honest half-built idea with good notes is a great outcome. This is a collaborative event, not a competition. Ask us anything, help the team next to you, and bring something only you would think of.
:::

- [ ] Survey tap targets are at least 44 × 44 px on a 375 px wide screen, and nothing overlaps.
- [ ] Your chosen improvement (draggable sheet, or panning while painting) works on a real phone.
- [ ] A complete survey run (paint a route, answer the questions, submit) works on that phone.
- [ ] Desktop still works, with no new console errors.

## 5. Hand in

Share whatever you got to, in whichever form fits:

- **Code:** a pull request against `develop`; a draft is fine.
- **Anything that isn’t code:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor; unfinished work is welcome, and we can help you wrap it up afterwards.

## Resources

- **Background pack:** [download topic-04-survey-on-a-phone.zip](/downloads/website-ui/topic-04-survey-on-a-phone.zip), design notes and analysis for this topic: the per-segment survey plan and a clickable bottom-sheet mock-up. Intended more for use with an AI assistant, for rapid comprehension of the issue: give it the Markdown files (Word versions are included too). Written before a September restructure, so check names against today’s code. Want everything? Grab [all notes across topics](/downloads/website-ui/all-notes-across-topics.zip) (just in case 😄).
- [Survey on the dev site](https://dev.ridescoredc.com/survey/) · [Website repository](https://github.com/civictechdc/ridescoredc-website)
- [MapLibre handlers (dragPan, touchZoomRotate)](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#dragpan) · [MDN: pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [MDN: viewport units (dvh)](https://developer.mozilla.org/en-US/docs/Web/CSS/length#dynamic_viewport_units) · [Touch target size (WCAG 2.5.5)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
