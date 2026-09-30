# Front-End Developer Guide

**For you if:** you want to change how the RideScore DC website looks and behaves: layout, styling, colours, popups, the survey flow.

**Not for you if:** you need to change the database, extend the API, or work on the other services (Martin tile server, nginx). See the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) instead. To change how safety scores are computed, look at the [ridescoredc-models](https://github.com/civictechdc/ridescoredc-models) repository.

**What you will run:** the webpages run from your own folder on your own machine. The map tiles and the survey API come from the shared development server at <https://dev.ridescoredc.com/>.

::: tip Placeholders
In the code blocks, text shown <span class="placeholder">in red</span> is a placeholder: replace it with your own value.
:::

## Step 1: Install the required tools

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org) version 20 or newer (includes npm)
- An editor, such as [VS Code](https://code.visualstudio.com), if you have no preference
- A [GitHub account](https://github.com/signup)

Where to type the commands:

| OS | Terminal |
|---|---|
| macOS | Terminal, in Applications > Utilities |
| Linux | your terminal application |
| Windows | Windows Terminal, or PowerShell from the Start menu |
| Windows with WSL | the terminal of your WSL distribution |

In VS Code, **View > Terminal** opens a terminal on all platforms.

Most commands are `git`, `node` and `npm`, which are the same everywhere. Where a command differs, two versions are given: one for macOS, Linux and WSL, one for Windows PowerShell. Command Prompt is not covered.

::: warning WSL
Keep the repository inside the WSL file system (a path under your home folder `~`, not under `/mnt/c`). `npm install` and the development server are much slower across the Windows boundary.
:::

Check the first two requirements:

```sh
git --version
node --version    # v20 or newer
```

## Step 2: Get your own copy of the code

You work on a **fork**, which is your own copy on GitHub, and propose changes back with a pull request. You do not need write access to the RideScore DC project.

1. Open <https://github.com/civictechdc/ridescoredc-website>, click **Fork**, then **Create fork**. Leave **Copy the develop branch only** checked: `develop` is the branch the next steps work from.
2. In a terminal, clone your fork, replacing `YOUR-USERNAME` with your GitHub user name:

   ```sh
   git clone https://github.com/<<YOUR-USERNAME>>/ridescoredc-website.git
   cd ridescoredc-website
   git remote add upstream https://github.com/civictechdc/ridescoredc-website.git
   ```

   The last command connects your fork to the upstream repository so you can pull in upstream changes if needed.
3. Make a branch for every new piece of work. Never commit directly to `develop` or `main`, and always create the new branch off `develop`. Name it `CATEGORY/DESCRIPTION`, where `CATEGORY` is one of the labels below and `DESCRIPTION` is short, lowercase, hyphen-separated and action-oriented (for example `feature/add-user-login`):

   ```sh
   git checkout develop
   git checkout -b <<CATEGORY>>/<<DESCRIPTION>>
   ```

   The second command creates your branch from whatever branch you are on, so the order matters. A fresh clone already starts on `develop`, but run the first command anyway so your branch can never start from `main` by accident.

| Category | Purpose |
|---|---|
| `feature` | Developing new features |
| `experimental` | Testing out new ideas that may or may not be merged |
| `fix` | Fixing bugs in the development environment or non-production branches |
| `hotfix` | Urgent fixes that need to go directly to production |
| `refactor` | Restructuring existing code without adding features or changing external behavior |
| `chore` | Routine maintenance: dependencies, build scripts, configuration |
| `docs` | Creating and updating documentation |
| `test` | Adding, fixing or refactoring tests |
| `release` | Preparing for a production release |

## Step 3: Install the Vite development server

```sh
npm install
```

This installs Vite into `node_modules/` inside the repository. Vite serves the pages and reloads the browser when you save. The site is plain HTML, CSS and JavaScript with no build step, so the files you edit are exactly the files the servers publish.

## Step 4: Configure where the map data comes from

Create the configuration file from the example.

macOS, Linux and WSL:

```sh
cp .env.example .env
```

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

The relevant line in the copied file already points Vite to the development server:

```text
VITE_UPSTREAM=https://dev.ridescoredc.com
```

In the front-end workflow, any request for something that is not a page (map tiles, the survey API) is routed to the shared development server. The `.env` file stays local and is never committed (it is listed in `.gitignore`).

## Step 5: Start the development server

```sh
npm run dev
```

It prints the settings in use and the local address:

```text
  settings in effect
    VITE_UPSTREAM      https://dev.ridescoredc.com
  tiles and API  ->  https://dev.ridescoredc.com
  ➜  Local:   http://localhost:5173/
```

If the *settings in effect* block does not appear, you are missing the `.env` file: go back to Step 4. Leave the command running and work in a second terminal.

## Step 6: Check the website works

Open <http://localhost:5173>. You should see:

- a map of DC with streets colored green through red
- a Settings panel with six sliders and a RideScore/Custom switch
- Imagery and Accidents toggling on and off
- a popup when you click a street

Then open <http://localhost:5173/survey/>, the user feedback page. If the map page looks right, your setup is correct: the pages come from your folder and everything else from the shared server.

## Step 7: Make your changes

The pages shown in the browser are in the `frontend/` folder:

```text
frontend/
  index.html            the map ->  /
  survey/index.html     the survey ->  /survey/
  src/shared/           used by both pages
    config.js             the map's style, centre, and the tile addresses
    basemap.js            building the map, aerial imagery, the three buttons
    crashes.js            crash points, the heatmap, the crash popup
```

Edit or add files and the browser reloads automatically.

- Each page is one large file holding its own styles and scripts. Search for the text or element ID you want rather than reading top to bottom.
- A change in `src/shared/` affects both pages. Check both after an edit.
- Adding a page means adding a directory with an `index.html` file. A folder named `about` containing `index.html` is served at `/about/`.

## Step 8: Check your changes

Before opening a pull request, check that:

- All pages still load without errors in the browser console (F12, or Cmd+Option+I on macOS)
- The behavior you changed works, and everything else still works
- You did not commit `.env`, `node_modules/`, or a database directory

```sh
git status        # nothing unexpected
git diff          # every line is one you meant to write
```

## Step 9: Open a pull request

Stage the files you changed by naming them, and avoid the catch-all `git add -A`:

```sh
git add <<FILE1>> <<FILE2>>
git commit -m "<<Short description of what changed>>"
git push -u origin <<your/branch-name>>
```

Then open your fork on GitHub and click **Compare & pull request**. Make sure the target branch is `develop`. Describe what changed and why, and add a screenshot for anything visual.

## If something goes wrong

- **The map is blank, or streets are missing.** Check the *tiles and API* line printed at startup. If it names the shared server and your changes did not touch the map rendering, contact an admin to check the server.
- **A change does not appear.** Confirm you edited the file under `frontend/`, and that the terminal running `npm run dev` has not stopped.
- **A change to `.env` has no effect.** `npm run dev` reads that file once, at start. Stop it with Ctrl-C and start it again.
- **Port 5173 is in use.** Use another port: `npm run dev -- --port 5174`.
- **You want to work without the shared server.** See the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide).
