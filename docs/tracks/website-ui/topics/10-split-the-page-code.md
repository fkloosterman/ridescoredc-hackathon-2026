# Topic 10: Split the page code into files

<Badge type="warning" text="Intermediate" /> <Badge type="info" text="Architecture" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) |
| **Setup before Saturday** | About 10 minutes (the [Front-End guide](/tracks/website-ui/frontend-guide)) |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like refactoring and code health, and are comfortable with JavaScript modules |
| **What you can share** | Usually a pull request |

</div>


*Related: [Repository layout](/tracks/website-ui/repository-layout) · [Topic 11: Write a spec](/tracks/website-ui/topics/11-write-a-spec) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

Each page is one large HTML file with its CSS and JavaScript inline: the survey is about 2,250 lines and the map about 430. Buttons call functions through 52 `onclick` attributes, which only work with global functions, so the shared code in `frontend/src/shared/` can't become proper JavaScript modules. Large single files are hard to review, hard to test, and cause merge conflicts whenever two people work on the same page.

### Why it matters

Every other code topic edits these two files. When a 2,250-line file mixes layout, styles and logic, a small change is hard to review, easy to break, and likely to collide with someone else's change. Splitting the code into files and modules makes every future contribution, including the ones from this hackathon, easier to merge and safer to ship.

### Who it's for

- **Future contributors**, who need to find the code they want to change.
- **Reviewers**, who need small, readable pull requests.
- **The project's long-term health**, more than any one visitor.

### How it connects

- The comments in `frontend/src/shared/config.js` already name this as planned work: convert the `onclick` handlers first, then move to modules.
- It touches the files that **Topics 1–7** edit today, so timing and a merge plan matter more than the code.
- **Topic 11's** spec would change how the pages read their settings; a modular page makes that easier.

### Example ideas

- Move one page's CSS into a stylesheet, its scripts into files, and check nothing changed.
- Replace `onclick` attributes with `addEventListener`, one control at a time.
- Turn the shared scripts into ES modules with `import` and `export`.
- Add a tiny smoke test that loads each page and fails on console errors.

## 1. Tools and set up (before Saturday)

| Tool | Why | Get it |
|---|---|---|
| Git | Download the code and make a branch | [git-scm.com](https://git-scm.com/downloads) |
| Node.js 20 or newer | Runs the development server (`npm run dev`) | [nodejs.org](https://nodejs.org) |
| A code editor | Refactor the pages | [VS Code](https://code.visualstudio.com) |
| A GitHub account | Open a pull request | [github.com/signup](https://github.com/signup) |

<span class="alert">Do this ahead of time.</span> Follow the [Front-End Developer Guide](/tracks/website-ui/frontend-guide). Windows users start with [Windows WSL](/tracks/website-ui/windows-wsl).

### If something goes wrong

| Symptom | Fix |
|---|---|
| A button stops working after a change | Its `onclick` calls a function that's no longer global. Attach it with `addEventListener` in the module instead. |
| `Failed to load module script` in the console | Module files need `<script type="module">`, and import paths must start with `/` or `./`. |

## 2. Know before you start

- **This topic conflicts with every other code topic.** Topics 1–7 edit the same two files today. If your split lands while they're working, their pull requests won't merge cleanly. <span class="alert">Agree on a plan with a mentor at the start.</span> For example: split one page only, or open your pull request for review after the event, once the day's other changes are in.
- **No build step, on purpose.** The site serves files as they are. Browsers load ES modules natively, so you can split into modules without adding a bundler. Don't add one.
- **Behavior must not change.** This is a refactor: every button, panel and survey step should work exactly as before.
- **Validate locally,** clicking through every control on both pages.

## 3. The challenge

### Core goal (2–3 hours)

Refactor **one page** (the map page, `frontend/index.html`, is the smaller and safer start):

1. Move its CSS into a `.css` file and its JavaScript into one or more `.js` files.
2. Replace every `onclick` attribute with `addEventListener`.
3. Turn the shared scripts it uses into ES modules with `import` and `export`, if the other page doesn't depend on them yet; otherwise leave a note.

### Approaches

- Make one small, working step per commit, checking the page after each.
- Write down a checklist of every control on the page before you start, and click through it at the end.

### Stretch goals

- Do the same for the survey page.
- Add a simple automated check, such as a script that loads each page and fails on console errors.

## 4. Done when

::: tip Guideposts, not requirements
Nothing on this page is a hard rule, and the scope is yours to shape. Use this list to know when you have something worth showing, not as a test to pass. Take the topic somewhere unexpected, combine it with another, or stop at whatever you finish: an honest half-built idea with good notes is a great outcome. This is a collaborative event, not a competition. Ask us anything, help the team next to you, and bring something only you would think of.
:::

- [ ] The page has no inline `<script>` or `<style>` blocks and no `onclick` attributes left.
- [ ] Every control on the checklist still works, with no console errors (attach the checklist).
- [ ] No bundler or build step was added.
- [ ] The plan for merging alongside the day's other changes is written in the pull request.

## 5. Hand in

Share whatever you got to, in whichever form fits:

- **Code:** a pull request against `develop`; a draft is fine.
- **Anything that isn’t code:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

If you can, a line in the pull request on how it should be merged alongside the day’s other changes helps the reviewers.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor; unfinished work is welcome, and we can help you wrap it up afterwards.

## Resources

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) · [MDN: addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Repository layout](/tracks/website-ui/repository-layout) · [How the site works: No build step](/tracks/website-ui/how-the-site-works#no-build-step)
