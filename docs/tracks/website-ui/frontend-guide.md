# Front-End Developer Guide

**For you if:** you want to change how the RideScore DC website looks and behaves — layout, styling, colours, popups, the survey flow.

**Not for you if:** you need to make changes to the database, extend the API, or work on any of the other services (Martin tile server, nginx). See the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) instead. To change how the safety scores are computed, look at the [ridescoredc-models](https://github.com/civictechdc/ridescoredc-models) repository.

**What you will run:** the webpages will be run from your own folder, on your own machine. The map tiles and the survey API come from the shared development server at [https://dev.ridescoredc.com/](https://dev.ridescoredc.com/)

---

## Step 1 — Install the required tools

- **Git** — [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Node.js**, version 20 or newer — [https://nodejs.org](https://nodejs.org) (includes `npm`)
- **An editor** — [https://code.visualstudio.com](https://code.visualstudio.com) if you have no preference
    - **VS Code + WSL users**: use the WSL extension/connection when editing the WSL copy of the repository.
- **A GitHub account** — [https://github.com/signup](https://github.com/signup)

### Where to type the commands

|  | open |
|---|---|
| **macOS** | Terminal, in Applications &gt; Utilities |
| **Linux** | your terminal application |
| **Windows** | Windows Terminal, or PowerShell from the Start menu |
| **Windows with WSL** | the terminal of your WSL distribution |

In VS Code, **View &gt; Terminal** opens a terminal on all platforms.

Most commands in these guides are `git`, `node` and `npm`, which are the same everywhere. Where a command differs, two versions are given: one for **macOS, Linux and WSL**, one for **Windows PowerShell**. Command Prompt is not covered.

**In WSL, keep the repository inside the WSL file system** — a path under your home folder (`~`), not under `/mnt/c`. For example,

Use: <code>/home/<span class="placeholder">&lt;username&gt;</span>/ridescoredc-website</code>

Avoid:        `/mnt/c/…/ridescoredc-website`

The `npm install` command and the development server are much slower across the Windows boundary.

Check the first two requirements:

```sh
git --version
node --version    # v20 or newer
```

## Step 2 — Get your own copy of the code

You work on a **fork**, which is your own copy on GitHub, and propose changes back with a pull request. You do not need write access to the RideScore DC project.

1. Open [https://github.com/civictechdc/ridescoredc-website](https://github.com/civictechdc/ridescoredc-website), click **Fork**, then **Create fork**. Leave **Copy the `develop` branch only** checked — `develop` is the branch the next step works from.
2. In a terminal you selected in Step 1 (including an integrated terminal in your IDE), clone your fork, replacing <code><span class="placeholder">YOUR-USERNAME</span></code> with your actual GitHub user name:

   ```sh
   git clone https://github.com/<<YOUR-USERNAME>>/ridescoredc-website.git
   cd ridescoredc-website
   git remote add upstream https://github.com/civictechdc/ridescoredc-website.git
   ```

   The last command connects your fork to the upstream repository so that you can pull in any upstream changes if needed.

   **WSL users**: Before cloning, run `cd ~`. Your repository should be under the WSL filesystem (for example, <code>/home/<span class="placeholder">&lt;username&gt;</span>/ridescoredc-website</code>, not `/mnt/c/…`

   **macOS, Linux, and WSL users** can clone from their home directory (`~`).
3. Make a branch for every new piece of work. Never commit directly to the `develop` (or `main`) branches. Always create the new branch off of the `develop` branch. When naming the branch, use the <code><span class="placeholder">CATEGORY</span>/<span class="placeholder">DESCRIPTION</span></code> pattern, where <code><span class="placeholder">CATEGORY</span></code> is one of the categories listed in the table below, and <code><span class="placeholder">DESCRIPTION</span></code> is written in lowercase, hyphen-separated kebab-case, using short, action-oriented keywords that reference the specific task or issue ID (e.g., `feature/add-user-login`). To create a new branch and immediately switch to that branch, run the following commands in a terminal:

   ```sh
   git checkout develop
   git checkout -b <<CATEGORY>>/<<DESCRIPTION>>
   ```

   The new branch is created from whichever branch you are currently on. Run `git checkout develop` first to make sure your new branch starts from `develop`, not `main` or another branch. A fresh clone will usually already be on `develop`, but running this command first is a safe habit.

| Category label | Purpose |
|---|---|
| `feature` | Developing new features |
| `experimental` | Testing out new ideas that may or may not be merged into the main codebase |
| `fix` | Fixing bugs in the development environment or non-production branches |
| `hotfix` | Urgent fixes that need to be pushed directly to production |
| `refactor` | Rewriting or restructuring existing code without adding new features or changing external behavior |
| `chore` | Routine maintenance tasks, updating dependencies, modifying build scripts, or updating configuration files |
| `docs` | Creating and updating documentation |
| `test` | Adding missing test, fixing broken tests, or refactoring existing testing code |
| `release` | Preparing for production release |

## Step 3 — Install the Vite development server

Run the following command in a terminal:

```sh
npm install
```

This installs Vite into `node_modules/` inside the repository. Vite serves the pages and reloads the browser when you save your changes. The site is plain HTML, CSS and JavaScript with no build step, so the files you edit are exactly the files the servers publish.

## Step 4 — Configure where the map data comes from

Create the configuration file from the example in the repository:

**macOS, Linux and WSL**

```sh
cp .env.example .env
```

**Windows (PowerShell)**

```powershell
Copy-Item .env.example .env
```

The relevant line in the copied file already points Vite to the development server:

```text
VITE_UPSTREAM=https://dev.ridescoredc.com
```

In the front-end development workflow, any website request for something that is not a page — map tiles, the survey API — is routed to the shared development server. The `.env` file remains local (specific to your machine) and is never committed (it is listed in `.gitignore`)

## Step 5 — Start the development server

Run the following command in a terminal to start the Vite development server locally:

```sh
npm run dev
```

This command prints the settings that are used and the local address where the website is served:

```text
  settings in effect
    VITE_UPSTREAM      https://dev.ridescoredc.com
  tiles and API  ->  https://dev.ridescoredc.com
  ➜  Local:   http://localhost:5173/
```

**If the `settings in effect` block does not appear, you are missing the `.env` file** — go back to Step 4. The `tiles and API` line is the same either way, because the address in `.env.example` is also the built-in default.

Leave the `npm run dev` command running and work in a second terminal.

## Step 6 — Check the website works

With the development server running, open [**http://localhost:5173**](http://localhost:5173). You should see:

- a map of DC with streets colored green through red
- a **Settings** panel with six sliders and a RideScore/Custom switch
- **Imagery** and **Accidents** toggling on and off
- a popup when you click a street

Then open [**http://localhost:5173/survey/**](http://localhost:5173/survey/), which is the user feedback page.

If the map page looks right, your setup is correct: the pages come from your folder and everything else from the shared server (e.g., the colored streets).

## Step 7 — Make your changes

**WSL users:** Make sure your editor is connected to WSL before editing. In VS Code, the bottom-left corner should show `WSL: Ubuntu`. Open the repository from <code>/home/<span class="placeholder">&lt;username&gt;</span>/ridescoredc-website</code>, **not** from `C:\…`  or `/mnt/c/…/ridescoredc-website`.

The pages that are shown in the browser can be found in the `frontend/` folder:

```text
frontend/
  index.html            the map ->  /
  survey/index.html     the survey ->  /survey/
  src/shared/           used by both pages
    config.js             the map's style, centre, and the tile addresses
    basemap.js            building the map, aerial imagery, the three buttons
    crashes.js            crash points, the heatmap, the crash popup
```

Edit or add files, and the browser reloads automatically.

Each page is one large file holding its own styles and scripts. Work by searching for the text or the element ID you want rather than reading top to bottom.

**A change in `src/shared/` affects both pages.** Check both pages after an edit.

**Adding a page** means adding a directory with an `index.html` file A folder named `about` containing `index.html` is served at `/about/`.

## Step 8 — Check and test your changes before opening a Pull Request

After you have made front-end changes, check that:

- All pages still load without errors in the browser console (F12, or Cmd+Option+I on macOS)
- The behavior you changed works, and everything else still works
- You did not commit `.env`, `node_modules/`, or a database directory

In a terminal run these commands to verify that there are no unexpected changes in the local repository:

```sh
git status        # nothing unexpected
git diff          # every line is one you meant to write
```

## Step 9 — Open a Pull Request

First, stage all files that you changed. Explicitly list the files (<code><span class="placeholder">FILE1</span></code> and <code><span class="placeholder">FILE2</span></code> below) that you want to stage, and **avoid** the catch-all command `git add -A`.

```sh
git add <<FILE1 FILE2>>
```

Second, commit the staged files and give a short description:

```sh
git commit -m "<<Short description of what changed>>"
```

Then, push the changes you made in your branch to GitHub, replacing <code><span class="placeholder">your/branch-name</span></code> with the actual name of your branch:

```sh
git push -u origin <<your/branch-name>>
```

Find <code><span class="placeholder">your/branch-name</span></code> on GitHub and click **Compare & pull request**. At the top of the Pull Request page, make sure the base branch is `develop`. Describe what changed and why; add a screenshot for anything visual.

After adding description and other requirements, click **Create pull request**.

---

## If something goes wrong

**The map is blank, or streets are missing.** Check the `tiles and API` line printed at startup. If it names the shared server and your changes did not touch the map rendering, then contact an admin to check on the server.

**A change does not appear.** Confirm you edited the file under `frontend/`, and that the terminal running `npm run dev` has not stopped.

**A change to `.env` has no effect.** `npm run dev` reads that file once, when it starts. Stop the development server with `Ctrl-C` and start it again.

**Port 5173 is in use.** Use a different port: `npm run dev -- --port 5174`.

**You want to work without the shared server.** See the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide).
