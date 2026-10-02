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


*Related: [Topic 9: PMTiles proof of concept](/tracks/website-ui/topics/09-pmtiles-proof-of-concept) · [Topic 10: Split the page code](/tracks/website-ui/topics/10-split-the-page-code) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

The website and the data pipeline live in separate repositories, and the database is already split by who owns what. But the website still **hard-codes what the data means**: every label, unit, color, layer name and popup field is written into the pages by hand. Every new column the Models track produces needs a website change before anyone can see it. The same goes for the Custom weights: the sliders are hard-coded in the page and in a database function.

The project's design proposals live on the [ridescoredc-models wiki](https://github.com/civictechdc/ridescoredc-models/wiki). Two that would finish separating the website from the models are reserved but not yet written.

### Why it matters

Today every new piece of data means a website change: someone has to add the label, the unit, the color and the popup line by hand. That slows the project down and couples two volunteer teams who mostly work apart. A clear spec for how the data describes itself, and how the website reads that description, would let the Models track add a new score or attribute and have it appear on the map without touching website code.

### Who it's for

- **Maintainers of both repositories**, who need a shared contract.
- **Future model builders**, who want their new score on the map quickly.
- **People who think in systems**: no code needed, but a taste for clear interfaces.

### How it connects

- The models wiki's Proposals 0001, 0002, 0005 and 0006 describe the pipeline, dataset descriptions, database layout and deployment; your spec builds on them.
- **Topic 3's** legend and popups, and **Topic 9's** static tiles, would both use what you specify.
- A feature spec can also turn a **Topic 15** design into something buildable.

### Example ideas

- A manifest file the website reads at startup: layers, labels, units, palettes, popup fields.
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

- **Read in order.** Proposals 0001 (pipeline and data package), 0002 (dataset descriptions), 0005 (database organization) and 0006 (deployment) are drafts that each build on the last. Your spec adds to them rather than revising them.
- **Use the template.** The wiki has a [Proposal template](https://github.com/civictechdc/ridescoredc-models/wiki/Proposal-Template): status, author, what it decides, what it depends on.
- **Talk to the author.** Fabian Kloosterman wrote the series. Check with him at the start before taking 0003 or 0004, so your spec fits what's planned.
- **Ground it in the code.** Look at what the map page hard-codes today: the popup in `frontend/index.html`, the colors, and the slider definitions. A spec that names real files is easier to adopt.

## 3. The challenge

### Core goal (2–3 hours)

Write **one** spec on the wiki template, two to four pages long:

| Spec | What it settles |
|---|---|
| **Proposal 0003: the presentation and the manifest** | What the website reads at startup instead of hard-coding: the layers, labels, units, palettes and popup fields, and how the Models side publishes them. |
| **Proposal 0004: user-adjustable parameters** | How the score's adjustable weights are defined by the models, passed to the website, and drawn as controls. |
| **A feature spec** | A product spec for a new feature, such as hazard reporting or route planning: user stories, screens, the data it needs, what the API must store, and privacy. |

### Approaches

- Start from one concrete example (for example, adding one new column end to end) and design the general rule from it.
- List the alternatives you rejected and why; the existing proposals do this.
- AI drafting is welcome here. Check every statement about the code against the repository.

### Stretch goals

- A small example manifest file in JSON or YAML.
- A migration path: what changes first, and what breaks if the website and data are released in the wrong order.

## 4. Done when

::: tip Guideposts, not requirements
Nothing on this page is a hard rule, and the scope is yours to shape. Use this list to know when you have something worth showing, not as a test to pass. Take the topic somewhere unexpected, combine it with another, or stop at whatever you finish: an honest half-built idea with good notes is a great outcome. This is a collaborative event, not a competition. Ask us anything, help the team next to you, and bring something only you would think of.
:::

- [ ] The spec follows the proposal template and states the one question it decides.
- [ ] It works through at least one concrete example end to end.
- [ ] Every claim about current code names the file it refers to, and was checked.
- [ ] It lists the alternatives considered and the open decisions.

## 5. Hand in

Share whatever you got to, in whichever form fits:

- **Code:** a pull request against `develop`; a draft is fine.
- **Anything that isn’t code:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor; unfinished work is welcome, and we can help you wrap it up afterwards.

## Resources

- [ridescoredc-models wiki](https://github.com/civictechdc/ridescoredc-models/wiki) · [Proposal template](https://github.com/civictechdc/ridescoredc-models/wiki/Proposal-Template)
- [How the site works](/tracks/website-ui/how-the-site-works) · [The data](/tracks/website-ui/the-data) · [Repository layout](/tracks/website-ui/repository-layout)
