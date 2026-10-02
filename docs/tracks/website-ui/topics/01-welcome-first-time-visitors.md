# Topic 1: Welcome first-time visitors

<Badge type="tip" text="Beginner" /> <Badge type="info" text="Design/Concept" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | <span class="chip">An AI design tool</span> <span class="or">or</span> [Front-End](/tracks/website-ui/frontend-guide) (optional, to build it in the real site) |
| **Setup before Saturday** | None for the AI route; about 10 minutes for Front-End. If your AI tool makes code, check it can save to GitHub on a free plan |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like design, writing for the public, or trying AI app builders, and don't need to touch the codebase |
| **What you can share** | Usually a Drive folder of screenshots and notes, plus a GitHub repo if your AI tool made code |

</div>


*Related: [Topic 2: Explain the safety score](/tracks/website-ui/topics/02-explain-the-safety-score) · [Topic 15: Design a concept](/tracks/website-ui/topics/15-design-a-concept) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

The site opens straight onto a map. A first-time visitor isn't told what RideScore DC is or what the colors mean. They don't learn what the score can and can't tell them, or that they can share their own rides through the survey. People who don't understand a tool in the first minute rarely come back.

RideScore DC needs a **front door**: a landing page that welcomes new visitors, explains the project in plain words, and sends them to the map or the survey. In this topic you design that front door with an AI design or app-building tool, and explain your thinking.

### Why it matters

First impressions decide whether anyone uses RideScore DC at all. A map with no explanation looks like a final verdict on every street. But the project's own position is that *a score can guide exploration and advocacy; it cannot guarantee that a street or route is safe*. A front door is where that nuance lives, and where visitors learn that their own rides can improve the map.

### Who it's for

- **New riders and people thinking about biking**, who want reassurance and a starting point, not a data tool.
- **Experienced commuters**, who will judge the map against what they know and need a reason to contribute.
- **Advocates, planners and journalists**, who need to know in seconds what the project is, who runs it, and how far to trust it.
- Most will arrive **on a phone**, from a link someone shared.

### How it connects

- Feeds visitors into the **map** and the **survey**, the two pages the rest of this track improves.
- Can borrow the plain-language explanation from **Topic 2** and the legend ideas from **Topic 3**.
- The **Community Research** track spends the morning noting what confuses first-time visitors. That's a ready-made list of questions your page can answer.

### Example ideas

- A one-screen "what is this?" hero with two clear buttons: *Explore the map* and *Share a ride*.
- A three-step "how it works" strip: public data → a score for every block → riders like you check it.
- A short, honest "what the score can't tell you" box.
- A strip of other cities' tools (Ottawa, Montgomery County) to show where RideScore DC fits.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| An AI design or app-building tool | Turn your ideas into a clickable mock-up fast | [Figma Make](https://www.figma.com/make/), [Lovable](https://lovable.dev), [Replit](https://replit.com), [v0](https://v0.app), [Claude](https://claude.ai), or another you like |
| A GitHub account | Keep the code your AI tool generates | [github.com/signup](https://github.com/signup) |
| Google Drive | Share your screenshots and notes | [drive.google.com](https://drive.google.com) |
| Optional: the Front-End setup | Build the page inside the real site instead | [Front-End Developer Guide](/tracks/website-ui/frontend-guide) |

<span class="alert">Check this before Saturday.</span> If your AI tool makes code, check that it can **save (push) that code to GitHub on the plan you have**. Some tools only sync to GitHub on paid plans, or limit how much you can make for free. Try a tiny test project and check the code appears on GitHub, so there are no payment surprises on the day.

### If something goes wrong

| Symptom | Fix |
|---|---|
| Your tool won't push to GitHub without upgrading | Download or copy the code and upload it to a new GitHub repository by hand, or switch to a tool that exports for free. |
| You run out of free generations mid-afternoon | Save screenshots as you go, so you always have something to hand in. |
| The repository is private | Make it public, because reviewers can't open a private one. Check the link in a private browser window. |

## 2. Know before you start

- **Start from what the project says about itself.** Civic Tech DC's [RideScore DC project page](https://www.civictechdc.org/projects/ridescoredc.html) has the basic language. It says what the project rates and who it's for (everyday cyclists, advocates, researchers, people weighing infrastructure priorities). It also gives an important caveat: *a score can guide exploration and advocacy; it cannot guarantee that a street or route is safe.*
- **Look at what other regions do.** Ideas from other bike-safety projects are very welcome. For example:
    - [Montgomery County's Bicycle Stress Map](https://mcatlas.org/bikestress/), next door in Maryland
    - [Ottawa's Cycling Level of Traffic Stress Map](https://maps.bikeottawa.ca/lts/)
    - [BikeMaps.org](https://bikemaps.org/), where riders report near misses and hazards
    - [PeopleForBikes City Ratings](https://cityratings.peopleforbikes.org/)
    - [Vision Zero DC](https://visionzero.dc.gov/)
- **Know what the site does today.** The [map](https://dev.ridescoredc.com/) colors streets by a safety score. It has a Custom panel (sliders that reweight the score) and layers for aerial imagery and crashes. The [survey](https://dev.ridescoredc.com/survey/) lets a rider paint a route and rate it block by block.
- **Talk to Community Research.** Their morning rounds list what first-time visitors found confusing. That tells you what your front door should cover.

::: tip Tip for AI users
AI tools work well with images. Screenshot pages and details you like (including the sites above). Give them to your AI tool with your written prompt, and say what you like about each one.
:::

## 3. The challenge

### Core goal (2–3 hours)

Design a landing page for RideScore DC with an AI tool, and explain your thinking. It should:

1. Say what RideScore DC is and who it's for, in a few plain sentences.
2. Explain what the colors and the score mean, and what the score can't tell you.
3. Send visitors to the map and to the survey, with clear calls to action.
4. Bring in at least one idea from another region's bike-safety work.
5. Work on a phone-sized screen.

### Approaches

- Gather inspiration first (15 minutes): screenshots of landing pages and bike-safety sites you like.
- Write a short brief for your AI tool: the audience, the five points above, and your inspiration images. Work in small steps; they go better than one giant prompt.
- Try it on one person outside your team. Can they say what RideScore DC is, and find the survey?
- **Optional:** if you're comfortable with the code, build the page for real in `frontend/` (a new folder such as `frontend/about/`) and open a pull request. See [Add a new page](/tracks/website-ui/making-changes#add-a-new-page).

### Stretch goals

- A short guided tour of the map's main features, as a second screen.
- Simple illustrations, or an animated example of painting a route.
- Versions for two different visitors, for example a new rider and a planner.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] Your landing page covers all five points of the core goal.
- [ ] Each section has a short note on the **value it adds or the intention behind it**.
- [ ] It uses at least one idea from another region, credited to its source.
- [ ] Someone outside your team tried it, and you noted what they understood and where they got stuck.
- [ ] If your AI tool made code, the GitHub repository is public, so others can open it.

## 5. Hand in

Share whatever you got to:

- **Code:** a public GitHub repository from your AI tool, or a pull request against `develop` if you built inside the site.
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Two things that help others understand your design: a short note beside each screenshot on the intention behind it, and, if your AI tool generated code, a link to that repository.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [RideScore DC on Civic Tech DC](https://www.civictechdc.org/projects/ridescoredc.html) · [The map](https://dev.ridescoredc.com/) · [The survey](https://dev.ridescoredc.com/survey/)
- [Montgomery County Bicycle Stress Map](https://mcatlas.org/bikestress/) · [Ottawa Cycling LTS Map](https://maps.bikeottawa.ca/lts/) · [BikeMaps.org](https://bikemaps.org/) · [PeopleForBikes City Ratings](https://cityratings.peopleforbikes.org/) · [Vision Zero DC](https://visionzero.dc.gov/)
