# Topic 14: Your own feature

<Badge type="tip" text="Any level" /> <Badge type="info" text="Feature" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) <span class="or">or</span> [Full Stack (Docker)](/tracks/website-ui/full-stack-guide) <span class="or">or</span> <span class="chip">No install needed</span> |
| **Setup before Saturday** | Depends on your idea: none for a plan, about 10 minutes for Front-End, about 30 for Full Stack |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You arrived with an idea, and want to build a small version of it or plan it properly |
| **What you can share** | A pull request or a plan, whichever fits |

</div>


*Related: [Topic 11: Write a spec](/tracks/website-ui/topics/11-write-a-spec) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

You have an idea none of the other topics cover: a feature that would make RideScore DC more useful to riders, parents, planners or advocates. Bring it. The best ideas often come from people seeing the project for the first time.

### Why it matters

The topic list reflects what the core team has seen so far. People new to the project, from other cities, professions or ways of getting around, often spot what the team can't. A small idea that works can change the project's direction.

### Who it's for

- **Anyone with an idea** and the skills to build a small version of it.
- **Riders, parents, planners or advocates** whose needs the other topics don't cover.

### How it connects

- Check the [models wiki](https://github.com/civictechdc/ridescoredc-models/wiki) and open issues first; someone may have started.
- A bigger idea can be written up as a spec, like **Topic 11**.
- The **Community Research** track can test your idea with their personas.

### Example ideas

- A "share this route" link that opens the map zoomed to a route.
- A neighborhood view: the streets around a school or a Metro station.
- A comparison mode for two routes between the same points.

## 1. Tools and set up (before Saturday)

Pick the setup your idea needs:

| Your feature changes… | Setup | Guide |
|---|---|---|
| Pages, map styling, the survey's look and flow, a new page | Front-End | [Front-End Developer Guide](/tracks/website-ui/frontend-guide) |
| What the survey stores, the API, the database, what data the map carries | Full Stack | [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) |
| Nothing yet: you want to plan it first | None | [Topic 11: Write a spec](/tracks/website-ui/topics/11-write-a-spec) |

Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

## 2. Know before you start

- **Size it for 2–3 hours.** Pick the smallest version that shows the idea works. A big idea can be handed in as a plan plus one small working piece.
- **Check with a mentor at the start.** A two-minute conversation can save an hour: someone may already be working on it, or know where it fits.
- **A few project habits still apply.** The survey hides our scores, so riders give their own view. Survey answers are saved by `segment_id`, because `tile_id` changes every time the map data is rebuilt. And there's no build step, so what you edit is what visitors get.
- **Try it on your local copy** before sharing.

## 3. The challenge

### Core goal (2–3 hours)

1. Write one sentence: who the feature is for and what it lets them do.
2. Build the smallest version that shows it, **or** write a one- to two-page plan if it's bigger than an afternoon.
3. Show it to someone outside your team.

### Stretch goals

- Test it with someone from the Community Research track.
- Write follow-up GitHub issues for the next steps.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

**If you built it:**

- [ ] The feature does what your one sentence says, on your local copy.
- [ ] Existing pages still work, with no new console errors.
- [ ] Someone outside your team has seen it working.

**If you planned it:**

- [ ] The plan says who it's for, what it does, what it needs (data, setup, API) and the steps to build it.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

A plan is just as welcome as code here.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [How the site works](/tracks/website-ui/how-the-site-works) · [Repository layout](/tracks/website-ui/repository-layout) · [Making website changes](/tracks/website-ui/making-changes)
