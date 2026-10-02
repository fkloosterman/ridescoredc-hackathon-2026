# Topic 9: Split the page code into files

<Badge type="warning" text="Intermediate" /> <Badge type="info" text="Architecture" />

<div class="glance">

| | |
|---|---|
| **Expected stack** | [Front-End](/tracks/website-ui/frontend-guide) |
| **Setup before Saturday** | About 10 minutes (the [Front-End guide](/tracks/website-ui/frontend-guide)) |
| **Building time** | 2–3 hours on the day |
| **Good fit if…** | You like tidying code, and are comfortable with JavaScript modules |
| **What you can share** | Usually a pull request |

</div>


*Related: [Repository layout](/tracks/website-ui/repository-layout) · [Topic 11: Write a spec](/tracks/website-ui/topics/11-write-a-spec) · [Submitting your work](/tracks/website-ui/submitting-your-work)*

## Problem statement

Each page of the site lives in one very large file. That makes small changes slow to review and easy to break. When two people edit the same page, their changes often collide. Splitting the code into smaller files makes every future change easier.

### Why it matters

Most code topics edit the map or survey page. Smaller files make every future contribution, including this hackathon's, easier to merge and safer to ship.

### Who it's for

- **Future contributors**, who need to find the code they want to change.
- **Reviewers**, who need small, readable pull requests.
- **The project's long-term health**, more than any one visitor.

### How it connects

- The comments in `frontend/src/shared/config.js` already name this as planned work: convert the `onclick` handlers first, then move to modules.
- **Topics 3–7 and 13** edit the map or survey page today, so timing and a merge plan matter more than the code. Topics 1 and 2 mostly add new pages.
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
| `Failed to load module script` in the console | Module files need `<script type="module">`, and import paths start with `/` or `./`. |

## 2. Know before you start

- **What the code looks like today.** Each page is one HTML file with its CSS and JavaScript inline: the survey is about 2,250 lines and the map about 430.
- **Two ways to wire up a button.** Today buttons use 52 `onclick` attributes: the HTML names a function to run on click. That only works if the function is global (visible everywhere). The modern way is `addEventListener`: the JavaScript finds the button and attaches the function itself.
- **Why that matters here.** Because of those global functions, the shared code in `frontend/src/shared/` can't yet become ES modules (JavaScript files that import from each other with `import` and `export`).
- **Plan the merge first.** Your split touches the same files as other topics. If it lands while they're working, their pull requests won't merge cleanly. <span class="alert">Agree on a plan with a mentor at the start.</span> For example: split one page only, or open your pull request for review after the event, once the day's other changes are in.
- **Please don't add a bundler**, because the site deliberately serves files as they are: what you edit is what visitors get, with nothing to compile. Browsers load ES modules natively, so you don't need one.
- **Aim for no visible change**, because a refactor is easiest to review and merge when the site behaves exactly as before.
- **Validate locally** by clicking through every control on both pages.

## 3. The challenge

### Core goal (2–3 hours)

Refactor **one page**. The map page (`frontend/index.html`) is smaller, so it's the safer start:

1. Move its CSS into a `.css` file and its JavaScript into one or more `.js` files.
2. Replace every `onclick` attribute with `addEventListener`.
3. Turn the shared scripts it uses into ES modules with `import` and `export`, if the other page doesn't depend on them yet; otherwise leave a note.

### Approaches

- Make one small, working step per commit, checking the page after each.
- List every control on the page before you start, and click through the list at the end.

### Stretch goals

- Do the same for the survey page.
- Add a simple automated check, such as a script that loads each page and fails on console errors.

## 4. Done when

::: tip Guideposts, not requirements
Use this list to tell when you have something worth showing, not as a test to pass. Change the scope, combine topics, or stop at whatever you finish: half-built with good notes is a great result, because this is a collaborative event, not a competition.
:::

- [ ] The page has no inline `<script>` or `<style>` blocks and no `onclick` attributes left.
- [ ] Every control on the page still works, with no console errors.
- [ ] The site still runs without a bundler or build step.
- [ ] You've talked with a mentor about how it merges alongside the day's other changes.

## 5. Hand in

Share whatever you got to:

- **Code:** a pull request against `develop` (a draft is fine).
- **Anything else:** a shared Google Drive folder, or a link to a document.
- **The [submission form](/tracks/website-ui/submitting-your-work)**, one per team.
- **Optional:** a short video link, and two slides in the demo deck for the 4:15 demos.

If you can, a line in the pull request on how it should be merged alongside the day’s other changes helps the reviewers.

Nothing here is mandatory on the day. If you run short on time, share what you have and tell a mentor, because unfinished work with good notes still helps the next volunteer.

## Resources

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) · [MDN: addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Repository layout](/tracks/website-ui/repository-layout) · [How the site works: No build step](/tracks/website-ui/how-the-site-works#no-build-step)
