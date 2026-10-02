# Topic 13: Your own bug

<Badge type="tip" text="Any level" /> <Badge type="danger" text="Bug" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) <span class="or">or</span> [Full Stack (Docker)](/tracks/website-ui/full-stack-guide) (if the bug is in saving surveys or the API) |
| **Setup before Saturday** | About 10 minutes (the [Front-End guide](/tracks/website-ui/frontend-guide)) |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like a clear finish line and enjoy hunting down what’s broken |
| **What you can share** | Usually a pull request |

</div>


*Related: [Topic 6: Fix the route-selector bugs](/tracks/website-ui/topics/06-fix-the-route-selector-bugs) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

You found something broken: a button that does nothing, a popup showing `undefined`, a layout that falls apart on your phone, an error in the console. Every bug a first-time visitor hits makes RideScore DC feel less trustworthy. Find one, show it happening, and fix it.

### Why it matters

Bugs cost trust faster than missing features. A popup showing `undefined`, a button that does nothing or a broken layout on a phone tells a first-time visitor the project isn't serious, and they won't come back to rate a ride. Fresh eyes find these fastest.

### Who it's for

- **Every visitor**, especially first-timers on phones.
- **Contributors who like a clear finish line**: a bug is reproduced, fixed and proven.

### How it connects

- The **Community Research** track's confusion lists from the morning may point straight at bugs.
- **Topic 6** covers the two known route-painting bugs, so pick something else.
- Anything you can't fix today can become a GitHub issue for the next volunteer.

### Example ideas

- Click every control on both pages with the browser console open.
- Try the site at 320 px wide, in dark mode, and with the keyboard only.
- Check popups on unusual blocks: missing speed limits, unnamed roads.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git | Download the code and make a branch | [git-scm.com](https://git-scm.com/downloads) |
| Node.js 20 or newer | Runs the development server (`npm run dev`) | [nodejs.org](https://nodejs.org) |
| A code editor | Fix the code | [VS Code](https://code.visualstudio.com) |
| A GitHub account | Open a pull request | [github.com/signup](https://github.com/signup) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). If your bug is in saving surveys or in the API, also follow the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

## 2. Know before you start

- **Where to look.** Open the [browser console](/tracks/website-ui#glossary) (press F12) on the map and the survey, and try every control. Check a phone-sized screen. The Community Research track's confusion lists are another source.
- **Check it's new.** Look at the [open issues and pull requests](https://github.com/civictechdc/ridescoredc-website/issues) first, and skip the two route-selector bugs (Topic 6).
- **Is it a bug or a design question?** "This is confusing" is often a design problem (Topic 15). A bug is something that doesn't do what it's clearly meant to.
- **Keep it small.** One bug per pull request, because small changes are quicker to review.

## 3. The challenge

### Core goal (2–3 hours)

1. Write down the steps that reproduce the bug, what you expected, and what happened.
2. Find the cause in the code.
3. Fix it with the smallest change that works.
4. Show it's fixed by following the same steps.

If you find more than you can fix, write the rest up as GitHub issues with reproduction steps; that's useful work too.

### Stretch goals

- Fix a second bug in its own pull request.
- Add a check that would have caught it.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] The pull request describes the steps to reproduce, the expected result and the actual result.
- [ ] Following those steps after the fix gives the expected result.
- [ ] Nothing else changed: no new console errors, and the rest of the page still works.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

Steps to reproduce in the pull request make it quick to review.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [Website issues](https://github.com/civictechdc/ridescoredc-website/issues) · [Making website changes: troubleshooting](/tracks/website-ui/making-changes#troubleshooting-a-change)
- [Repository layout](/tracks/website-ui/repository-layout)
