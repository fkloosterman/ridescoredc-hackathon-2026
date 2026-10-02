# Topic 11: Write a spec

<Badge type="danger" text="Advanced" /> <Badge type="info" text="Architecture" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | <span class="chip">No install needed</span> <span class="or">or</span> [Front-End](/tracks/website-ui/frontend-guide) (optional, to see the code running) |
| **Setup before Saturday** | None. Read the models wiki proposals before Saturday |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You think in systems and interfaces, and like writing clear technical documents |
| **What you can share** | Usually a Drive folder or a Google Doc link |

</div>


*Related: [Topic 10: PMTiles proof of concept](/tracks/website-ui/topics/10-pmtiles-proof-of-concept) · [Topic 9: Split the page code](/tracks/website-ui/topics/09-split-the-page-code) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

When the Models track adds a new score or street detail, nobody can see it on the map until someone edits the website by hand. The website and the data pipeline live in separate repositories, run by teams who mostly work apart. A short written design, a spec, could let new data show up on the map without a website change.

The project's design proposals live on the [ridescoredc-models wiki](https://github.com/civictechdc/ridescoredc-models/wiki). Two that would finish separating the website from the models are reserved but not yet written.

### Why it matters

Today every new piece of data means a website change: someone has to add the label, the unit, the color and the popup line by hand. That slows the project down and ties two volunteer teams together. A clear spec for how the data describes itself, and how the website reads that description, would let the Models track add a new score or attribute and have it appear on the map without touching website code.

### Who it's for

- **Maintainers of both repositories**, who need a shared contract.
- **Future model builders**, who want their new score on the map quickly.
- **People who think in systems**: no code needed, but a taste for clear interfaces.

### How it connects

- The models wiki's Proposals 0001, 0002, 0005 and 0006 describe the pipeline, dataset descriptions, database layout and deployment; your spec builds on them.
- **Topic 3's** legend and popups, and **Topic 10's** static tiles, would both use what you specify.
- A feature spec can also turn a **Topic 15** design into something buildable.

### Example ideas

- A manifest (a file that tells the website what each piece of data is called, its units and colors) that the website reads at startup.
- Walk one new column end to end, from the pipeline to the popup, and design the general rule from it.
- Define how the Custom sliders are described by the models and drawn by the website.
- A product spec for hazard reporting or route planning: user stories, screens, data and privacy.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| A document editor | Write the spec (Google Docs or Markdown) | [docs.google.com](https://docs.google.com) |
| A web browser | Read the wiki, the repositories and the live site | — |
| Google Drive | Share your work | [drive.google.com](https://drive.google.com) |
| Optional: Front-End setup | Look at the code running | [Front-End Developer Guide](/tracks/website-ui/frontend-guide) |

<span class="alert">Before Saturday:</span> read the wiki's [Home page](https://github.com/civictechdc/ridescoredc-models/wiki) and Proposal 0002 (dataset descriptions). No install is required.

## 2. Know before you start

- **Read in order.** Proposals 0001 (pipeline and data package), 0002 (dataset descriptions), 0005 (database organization) and 0006 (deployment) are drafts, each building on the last. Your spec adds to them rather than revising them.
- **Use the template.** The wiki has a [Proposal template](https://github.com/civictechdc/ridescoredc-models/wiki/Proposal-Template): status, author, what it decides, what it depends on.
- **Talk to the author.** Fabian Kloosterman wrote the series. Check with him at the start before taking 0003 or 0004, so your spec fits what's planned.
- **What's hard-coded today.** Every label, unit, color, layer name and popup field is written into the pages by hand. The Custom sliders are hard-coded twice: in the page and in a database function.
- **Ground it in the code.** Look at the popup in `frontend/index.html`, the colors, and the slider definitions. A spec that names real files is easier to adopt.

## 3. The challenge

### Core goal (2–3 hours)

Write **one** spec on the wiki template, two to four pages long:

| Spec | What it settles |
|---|---|
| **Proposal 0003: the presentation and the manifest** | What the website reads at startup instead of hard-coding (layers, labels, units, palettes, popup fields), and how the Models side publishes it. |
| **Proposal 0004: user-adjustable parameters** | How the score's adjustable weights are defined by the models, passed to the website, and drawn as controls. |
| **A feature spec** | A product spec for a new feature, such as hazard reporting or route planning: user stories, screens, the data it needs, what the API must store, and privacy. |

### Approaches

- Start from one concrete example (for example, adding one new column end to end) and design the general rule from it.
- List the alternatives you rejected and why; the existing proposals do this.
- AI drafting is welcome here. Check each statement about the code against the repository, because AI tools often guess file names and details.

### Stretch goals

- A small example manifest file in JSON or YAML.
- A migration path: what changes first, and what breaks if the website and data are released in the wrong order.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] The spec follows the proposal template and states the one question it decides.
- [ ] It works through at least one concrete example end to end.
- [ ] Claims about current code name the file they refer to, and you've checked them.
- [ ] It lists the alternatives considered and the open decisions.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [ridescoredc-models wiki](https://github.com/civictechdc/ridescoredc-models/wiki) · [Proposal template](https://github.com/civictechdc/ridescoredc-models/wiki/Proposal-Template)
- [How the site works](/tracks/website-ui/how-the-site-works) · [The data](/tracks/website-ui/the-data) · [Repository layout](/tracks/website-ui/repository-layout)
