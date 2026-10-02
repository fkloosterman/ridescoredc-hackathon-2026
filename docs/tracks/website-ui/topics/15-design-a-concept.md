# Topic 15: Design a concept

<Badge type="tip" text="Beginner" /> <Badge type="info" text="Design/Concept" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | <span class="chip">No install needed</span> |
| **Setup before Saturday** | None. A free Figma account helps, or bring pen and paper |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like design, research or talking to people, and don’t want to code |
| **What you can share** | Usually a Drive folder of screens and notes |

</div>


*Related: [Topic 3: Make the map make sense](/tracks/website-ui/topics/03-make-the-map-make-sense) · [Topic 7: Riders report hazards](/tracks/website-ui/topics/07-riders-report-hazards) · [Topic 11: Write a spec](/tracks/website-ui/topics/11-write-a-spec) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

Some of RideScore DC's biggest questions aren't code questions yet: what should a bike-safety tool feel like for a rider in a hurry, a parent, or a planner? Good designs now save weeks of building the wrong thing later. This topic needs no coding. Design a new way for people to use RideScore DC, from a prompt below or your own idea. Then test it with real people in the room.

### Why it matters

The cheapest time to get an idea right is before anyone builds it. A few screens tested with a real person can show whether a feature is wanted and how it should work. RideScore DC has more ideas than volunteers; good designs decide which ones get built next, and give the code teams something concrete to aim at.

### Who it's for

- **Designers, researchers and non-coders** who want to shape the product.
- **The riders, parents, planners and advocates** your design is for; name one on your first screen.

### How it connects

- Designs here can become the brief for **Topics 3–7** next time, or a spec in **Topic 11**.
- The **Community Research** track's personas and findings are your best source of real needs.
- Other regions' tools are fair inspiration; see the list in [Topic 1](/tracks/website-ui/topics/01-welcome-first-time-visitors).

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Figma (free account) | Mock-ups and clickable prototypes | [figma.com](https://www.figma.com/signup) |
| Or an AI mock-up tool, or pen and paper | Fast sketches; photograph paper ones | your choice |
| A phone or laptop | Look at the current site and test with people | your own |
| Google Drive | Share your work | [drive.google.com](https://drive.google.com) |

<span class="alert">Before Saturday:</span> create a free Figma account if you plan to use it, and spend ten minutes on [dev.ridescoredc.com](https://dev.ridescoredc.com) and its [survey](https://dev.ridescoredc.com/survey/). No other install.

### If something goes wrong

| Symptom | Fix |
|---|---|
| Figma is slow on event Wi-Fi | Sketch on paper first; move the best idea to Figma. |
| A viewer can't open your Figma file | In Figma, **Share** → anyone with the link **can view**, then check it in a private window. |

## 2. Know before you start

- **Design for one person.** Pick a rider and a moment: a new commuter planning tomorrow's ride, a parent checking a school route, a delivery rider in a rush, a planner preparing for a council hearing. The Community Research track has persona cards; borrow them.
- **What exists today.** The map colors streets by a safety score, with a Custom panel of sliders to reweight it. The survey lets a rider paint a route and rate it block by block. Nothing yet does route planning or hazard reporting.
- **Keep our scores out of the survey**, because riders should give their own view first, without being nudged by ours.
- **Test early.** Five minutes with someone from another track beats an hour of polishing.

## 3. The challenge

### Core goal (2–3 hours)

Pick **one** area and design a concept as three to five screens (Figma frames, AI mock-ups or photographed sketches), then test it with at least one person:

| Area | Example prompt |
|---|---|
| **Surveys** | Rate a ride in under a minute on a phone. Block by block, or the whole route? What about time of day and direction? |
| **Map interaction** | Show *why* a street scored as it did. Compare two parallel streets, like 14th St NW and 15th St NW. A legend a first-time visitor understands. |
| **Route planning** | Pick a start and destination and see the calmest route next to the fastest, with the trade-off in minutes. |
| **Reporting safety** | Flag a blocked lane, a pothole or a near miss on a block, and see what others reported. |
| **Your own idea** | Anything else that would make RideScore DC more useful: a view for planners, a feature for parents, sharing a route with a friend. Write one sentence on who it's for and what problem it solves. |

### Approaches

- Sketch three different ideas quickly, then pick one to refine.
- Write one sentence per screen: what the rider is trying to do there.
- Note what data each screen needs, so a developer knows whether it exists.

### Stretch goals

- A clickable prototype.
- Test with two different personas and note what each needed.
- Pair with a code team (Topics 3–7) and hand them your design, or write a short spec of what it would take to build ([Topic 11](/tracks/website-ui/topics/11-write-a-spec)).

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] The rider, the problem and the task are written on the first screen.
- [ ] Three to five screens show one complete task from start to finish.
- [ ] You've tested it with at least one person outside your team, and know what worked and where they got stuck.
- [ ] You can say what data each screen needs.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [dev.ridescoredc.com](https://dev.ridescoredc.com) · [Survey on the dev site](https://dev.ridescoredc.com/survey/)
- [Figma: getting started](https://help.figma.com/hc/en-us/categories/360002051613) · [Community Research track](/tracks/community-research)
