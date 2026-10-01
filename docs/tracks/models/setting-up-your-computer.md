# Reference: Setting Up Your Computer

*Cross-cutting reference. Every challenge starts here. Do this once, before Saturday, then go to your challenge page for the steps that are specific to it.*

Downloading and installing on shared event Wi-Fi is slow, so do this ahead of time. It takes about 10 minutes.

**What you will have at the end:**

- **git** and a free **GitHub account**, to get the code and to submit your work.
- **uv**, which installs the right Python (3.12 or newer) and every library for you. You do **not** install Python or Jupyter separately.
- **Your own copy of the code** (a fork of `ridescoredc-models`), on a branch of your own.

**Windows users:** use WSL 2 (Ubuntu) and type every command in the Ubuntu terminal. First complete the [**Windows WSL guide**](/tracks/website-ui/windows-wsl), Steps 1 to 4 and Step 7. That already installs git (with your name and email) and uv, so **skip Steps 1 and 2 below** (except making a GitHub account) and continue at Step 3. Skip the [WSL guide](/tracks/website-ui/windows-wsl)'s VS Code (Step 5) and Docker (Step 6); you don't need either. Keep your project folder inside the Linux file system (a path under `~`, not under `/mnt/c`), which is much faster. Prefer plain PowerShell to WSL? Then skip the [WSL guide](/tracks/website-ui/windows-wsl) and use the PowerShell commands in Steps 1 and 2; the rest of the commands are the same.

**Where to type the commands**

| On | Open |
|---|---|
| macOS | Terminal, in Applications &gt; Utilities |
| Linux | your terminal application |
| Windows with WSL (recommended) | the Ubuntu terminal |
| Windows without WSL | Windows Terminal, or PowerShell from the Start menu (Command Prompt is not covered) |

---

## Step 1: Install git and make a GitHub account

*Windows with WSL: git is already installed ([WSL guide](/tracks/website-ui/windows-wsl), Step 3). Skip to the GitHub account below.*

You need git to get the code and to submit your work with a pull request. You also need a free GitHub account: [https://github.com/signup](https://github.com/signup).

```sh
git --version
```

If that prints a version, skip to the next step. Otherwise:

| On | Install |
|---|---|
| macOS | `xcode-select --install` |
| Linux and WSL | `sudo apt install git -y` |
| Windows (PowerShell) | `winget install --id Git.Git -e` (then open a new terminal) |

Tell git who you are (use your own name and email):

```sh
git config --global user.name "<<Your Name>>"

git config --global user.email "<<your.email@example.com>>"
```

## Step 2: Install uv

*Windows with WSL: skip this step. uv is already installed ([WSL guide](/tracks/website-ui/windows-wsl), Step 7).*

[`uv`](https://docs.astral.sh/uv/) is a fast Python package and project manager.

macOS, Linux and WSL:

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Windows (PowerShell):

```text
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Open a **new** terminal, then check:

```sh
uv --version
```

## Step 3: Get your own copy of the code

You work on a fork, which is your own copy on GitHub, and propose changes back with a pull request. You do not need write access to the RideScore DC project.

1. Open [https://github.com/civictechdc/ridescoredc-models](https://github.com/civictechdc/ridescoredc-models), click **Fork**, then **Create fork**. Leave "Copy the `develop` branch only" checked.
2. In a terminal, clone your fork, replacing <code><span class="placeholder">YOUR-USERNAME</span></code> with your GitHub user name:

```sh
git clone https://github.com/<<YOUR-USERNAME>>/ridescoredc-models.git

cd ridescoredc-models

git remote add upstream https://github.com/civictechdc/ridescoredc-models.git
```

The last command connects your fork to the upstream project so you can pull in later changes.

3. Make a branch for your work, and never commit directly to `develop` or `main`. Name it `CATEGORY/DESCRIPTION` in lowercase with hyphens, for example `feature/crash-risk-model` or `experimental/bike-isi`:

```sh
git checkout develop

git checkout -b feature/my-idea
```

Everything you need is on the `develop` branch, including the basemap notebook and the scoring pipeline.

## Check that it worked

```sh
git --version

uv --version

git status
```

The first two print a version. The last should say `On branch feature/my-idea` (or whatever you called it) and `nothing to commit`.

**Next:** go back to your challenge page and continue with its "Set up" section, from the repository folder: [**Challenge 1**](/tracks/models/challenge-1), [**Challenge 2**](/tracks/models/challenge-2) or [**Challenge 3**](/tracks/models/challenge-3).

---

## If something goes wrong

| Symptom | Fix |
|---|---|
| `uv: command not found` | Open a **new** terminal after installing. If it still fails, restart your computer, or log out and back in. |
| An error about the Python version | You don't need to install Python yourself. `uv` fetches it. Run `uv python install 3.12` and try again. |
| `git push` asks for a password and fails | GitHub no longer accepts account passwords on the command line. Sign in with the GitHub CLI (`gh auth login`) or use a personal access token. A mentor can help. |
| Commands are very slow with WSL | Move the repository into the Linux file system (a path under `~`), not under `/mnt/c`. |
| Windows without WSL: errors about file paths being too long, or a very slow first `uv sync` | Clone the repository to a short path such as `C:\code`, not deep inside your Documents or Desktop folder. If it is slow, antivirus software may be scanning the download; a mentor can help. |
