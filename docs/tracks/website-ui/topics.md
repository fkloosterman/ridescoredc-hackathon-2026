---
outline: false
aside: false
---

# Topics

*Fifteen topics, grouped by level. Each topic page lists what to install, the problem, the challenge, what "done" looks like, and how to hand it in.*

<span class="alert">Pick one topic per team at the start.</span> Every topic is sized for two to three hours of building. On Advanced topics you can hand in either a plan or a proof of concept. A small thing that works beats a big thing that doesn't.

**Output** tells you what you hand in: a pull request on GitHub, a shared Google Drive folder, or your choice of a plan or a proof of concept. Every team also fills in one [submission form](/tracks/website-ui/submitting-your-work).

Click a row for a short description of the topic.

Topics 3–7 come with a **background pack** of design notes and analysis, linked from each topic page, or [all notes across topics in one zip](/downloads/website-ui/all-notes-across-topics.zip) (just in case 😄). Using an AI assistant? [all-materials-for-ai.zip](/downloads/website-ui/all-materials-for-ai.zip) has every page of this guide plus the notes, in Markdown, ready to upload.

### Beginner

<div class="topic-list">
<div class="topic-head"><span>Topic</span><span>Category</span><span>Setup</span><span>Output</span></div>
<details>
<summary><span class="t">1. Welcome first-time visitors</span><span>Design/Concept</span><span>An AI design tool</span><span>Drive folder + GitHub repo</span></summary>
<div class="topic-body">

The site opens straight onto a map with no explanation. Design a front door: a landing page that says what RideScore DC is, what the score can and can't tell you, and where to find the map and the survey. Use an AI design tool such as Figma Make, Lovable or v0, and borrow ideas from other regions' bike-safety maps. Hand in annotated screenshots and, if your tool generated code, a public GitHub repository.

[Open topic 1 →](/tracks/website-ui/topics/01-welcome-first-time-visitors)

</div>
</details>
<details>
<summary><span class="t">2. Explain the safety score</span><span>Content</span><span>Front-End</span><span>Pull request</span></summary>
<div class="topic-body">

The site never explains how a street's score is produced, so riders can't judge whether to trust it and planners can't cite it. Write a plain-language page on Level of Traffic Stress, which street features move the score, and what the score can't tell you. Most of the work is reading and writing: one teammate can draft while another builds the page.

[Open topic 2 →](/tracks/website-ui/topics/02-explain-the-safety-score)

</div>
</details>
<details>
<summary><span class="t">15. Design a concept</span><span>Design/Concept</span><span>None</span><span>Drive folder</span></summary>
<div class="topic-body">

Design a new way to use RideScore DC, with no code: a faster survey, explaining a street's score, route planning, hazard reporting, or your own idea. Sketch three to five screens in Figma, an AI mock-up tool or on paper. Test them with someone outside your team, and note the data each screen needs.

[Open topic 15 →](/tracks/website-ui/topics/15-design-a-concept)

</div>
</details>
</div>

### Intermediate

<div class="topic-list">
<div class="topic-head"><span>Topic</span><span>Category</span><span>Setup</span><span>Output</span></div>
<details>
<summary><span class="t">3. Make the map make sense</span><span>Feature</span><span>Front-End</span><span>Pull request</span></summary>
<div class="topic-body">

Streets are colored red to green with no legend, and popups list raw values like "LTS 3" with no explanation. Make one or two concrete improvements, such as a legend, readable popups, a color-blind-safe palette or zoom-aware styling. Then test them on someone who has never seen the map.

[Open topic 3 →](/tracks/website-ui/topics/03-make-the-map-make-sense)

</div>
</details>
<details>
<summary><span class="t">4. A survey that works on a phone</span><span>Feature</span><span>Front-End (Full Stack optional)</span><span>Pull request</span></summary>
<div class="topic-body">

The survey already has a phone layout, but its buttons are small, the bottom sheet can't be dragged, and you can't move the map while painting a route. Start with quick CSS fixes, then make the sheet draggable or let riders pan while painting. Test on a real phone.

[Open topic 4 →](/tracks/website-ui/topics/04-survey-on-a-phone)

</div>
</details>
<details>
<summary><span class="t">5. Rethink route drawing</span><span>Feature</span><span>Front-End</span><span>Pull request, or a plan</span></summary>
<div class="topic-body">

Riders paint the route they rode with a finger or mouse, which is quick but error-prone and hard to correct. Build an alternative, such as tapping blocks, draggable waypoints or start-to-end routing, and compare it with painting on the same test route. If a full build doesn't fit, hand in a plan.

[Open topic 5 →](/tracks/website-ui/topics/05-rethink-route-drawing)

</div>
</details>
<details>
<summary><span class="t">6. Fix the route-selector bugs</span><span>Bug</span><span>Front-End</span><span>Pull request</span></summary>
<div class="topic-body">

The paint tool has two bugs with known causes: at intersections it snaps to the cross street, and long blocks can vanish when you lift your finger. Pick one, reproduce it on a fixed route, fix it, and prove the fix with before and after recordings. Both bugs reproduce on the dev site with no setup.

[Open topic 6 →](/tracks/website-ui/topics/06-fix-the-route-selector-bugs)

</div>
</details>
<details>
<summary><span class="t">7. Riders report hazards</span><span>Feature</span><span>Full Stack</span><span>Plan, or proof of concept</span></summary>
<div class="topic-body">

Riders know about blocked lanes, potholes and near misses that no dataset records. Work out how a rider would report a hazard on a block: what to collect, where it's stored, and how reports are moderated. Build a proof of concept on your own local stack, or hand in a plan.

[Open topic 7 →](/tracks/website-ui/topics/07-riders-report-hazards)

</div>
</details>
<details>
<summary><span class="t">8. DC by the numbers</span><span>Data</span><span>Full Stack, or Python</span><span>Pull request</span></summary>
<div class="topic-body">

The map shows one block at a time, but planners ask whole-city questions, like how much of DC is low-stress. Build a small statistics page with three to five numbers that answer real questions. Whole-city data needs your own database or the published data files; the Front-End setup alone only sees what's on screen.

[Open topic 8 →](/tracks/website-ui/topics/08-dc-by-the-numbers)

</div>
</details>
<details>
<summary><span class="t">10. Split the page code into files</span><span>Architecture</span><span>Front-End</span><span>Pull request</span></summary>
<div class="topic-body">

Each page is one large HTML file with inline CSS and JavaScript and dozens of onclick attributes, which makes every change hard to review. Split one page into separate files and modules without changing how it behaves. This touches the files every other code team is editing, so agree on a merge plan with a mentor first.

[Open topic 10 →](/tracks/website-ui/topics/10-split-the-page-code)

</div>
</details>
</div>

### Advanced

<div class="topic-list">
<div class="topic-head"><span>Topic</span><span>Category</span><span>Setup</span><span>Output</span></div>
<details>
<summary><span class="t">9. PMTiles proof of concept</span><span>Architecture</span><span>Data tools + Front-End</span><span>Plan, or proof of concept</span></summary>
<div class="topic-body">

Every map tile is generated on request by a server reading a live database. PMTiles packs a whole tile set into one static file a browser can read directly, which could be simpler and cheaper. The catch is the map's Custom weights, which recompute scores live. Build a small proof of concept and compare, or write a plan.

[Open topic 9 →](/tracks/website-ui/topics/09-pmtiles-proof-of-concept)

</div>
</details>
<details>
<summary><span class="t">11. Write a spec</span><span>Architecture</span><span>None</span><span>Drive folder</span></summary>
<div class="topic-body">

The website hard-codes every label, unit, color and popup field, so each new data column needs a website change. Write a spec on the models wiki's proposal template: Proposal 0003 (what the site reads instead of hard-coding) or 0004 (adjustable score weights), or a spec for a new feature. Check with Fabian Kloosterman, who wrote the proposal series, before taking 0003 or 0004.

[Open topic 11 →](/tracks/website-ui/topics/11-write-a-spec)

</div>
</details>
<details>
<summary><span class="t">12. Read-only admin page</span><span>Feature</span><span>Full Stack</span><span>Plan, or proof of concept</span></summary>
<div class="topic-body">

Nobody on the team can see survey responses without writing SQL. Build a read-only page that lists responses, using made-up data on your own local stack, or plan one. Responses are personal data, so deciding who can see the page is part of the job.

[Open topic 12 →](/tracks/website-ui/topics/12-read-only-admin-page)

</div>
</details>
</div>

### Bring your own

<div class="topic-list">
<div class="topic-head"><span>Topic</span><span>Category</span><span>Setup</span><span>Output</span></div>
<details>
<summary><span class="t">13. Your own bug</span><span>Bug</span><span>Front-End</span><span>Pull request</span></summary>
<div class="topic-body">

Found something broken on the map or the survey? Write down how to reproduce it, find the cause, fix it with the smallest change that works, and show it's fixed. Check the open issues first, and keep to one bug per pull request.

[Open topic 13 →](/tracks/website-ui/topics/13-your-own-bug)

</div>
</details>
<details>
<summary><span class="t">14. Your own feature</span><span>Feature</span><span>Depends</span><span>Pull request, or a plan</span></summary>
<div class="topic-body">

Have an idea none of the other topics cover? Write one sentence on who it's for and what it lets them do. Then build the smallest version that shows it works, or write a plan if it's bigger than an afternoon. Check with a mentor at the start; someone may already be working on it.

[Open topic 14 →](/tracks/website-ui/topics/14-your-own-feature)

</div>
</details>
</div>

**Several teams can take the same topic.** Topics 4, 5, 6 and 10 all edit the survey or map page, so if you pick one of them, check with a mentor who else is in the same file.

### How to submit

Details are in each topic and on [Submitting your work](/tracks/website-ui/submitting-your-work), but here's a basic checklist for 4:00:

- [ ] **GitHub**, if relevant: a pull request against `develop`, or a public repository for AI-generated code
- [ ] **Google Drive folder** of documents and links, if relevant (for example planning, design and spec topics), checked in a private browser window
- [ ] **The [Website/UI submission form](https://forms.cloud.microsoft/r/ghpNKYPvgr)**, one per team
- [ ] **Your video**, if you made one, linked on the form
- [ ] **Two slides** in the [RideScore DC Demo Deck](https://docs.google.com/presentation/d/1ic9nFhiB6mftG0uKtgwuIJ0GgWwcM-_T/edit?usp=sharing&ouid=115249639562160932471&rtpof=true&sd=true), in the Website section

Not sure which topic to pick? Ask a mentor at the start; that's what we're here for.
