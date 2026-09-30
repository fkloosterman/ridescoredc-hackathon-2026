# Windows (WSL) setup

How to set up a Linux development environment inside Windows. The Windows Subsystem for Linux (WSL) gives you a full Linux environment directly inside Windows, which makes every command in the developer guides the same as on macOS and Linux.

::: tip Placeholders
In the code blocks, text shown <span class="placeholder">in red</span> is a placeholder: replace it with your own value.
:::

## Step 1: Install WSL 2 (Ubuntu)

1. Open PowerShell or Command Prompt as Administrator (right-click and select **Run as administrator**).
2. Run:

   ```powershell
   wsl --install
   ```

   This enables the necessary features, downloads the Linux kernel, and installs Ubuntu by default.
3. Restart your computer when prompted.
4. After restarting, a terminal window opens automatically to complete the Ubuntu installation.
5. Enter a username and password for your Linux environment when prompted:

   ```text
   Enter new UNIX username: <<your_username>>
   New password:
   Retype new password:
   ```

   The password is entered blindly: no characters are shown on the screen.

## Step 2: Update Ubuntu packages

Open the Ubuntu app from your Start Menu and run:

```sh
sudo apt update && sudo apt upgrade -y
```

## Step 3: Install and configure Git

```sh
sudo apt install git -y
git --version
```

Configure your Git identity, replacing the name and email with your own:

```sh
git config --global user.name "<<Your Name>>"
git config --global user.email "<<your.email@example.com>>"
```

## Step 4: Accessing files between Windows and Linux

WSL 2 runs on a Linux virtual filesystem, but both operating systems can access each other's files.

**Linux files from Windows.** In File Explorer, scroll down the left sidebar to **Linux**, or type `\\wsl$` in the address bar. Alternatively, from your Linux terminal, open the current directory in File Explorer:

```sh
explorer.exe .
```

**Windows files from Linux.** Your Windows drives are mounted under `/mnt/`. For example, for the C: drive:

```sh
cd /mnt/c/Users/<<YourWindowsUsername>>/
```

::: tip Best practice
Keep your project source code inside the Linux filesystem (for example `/home/username/projects/`). It is significantly faster than working across `/mnt/c/`.
:::

## Step 5: Set up Visual Studio Code for WSL

1. Download and install [VS Code](https://code.visualstudio.com/) on Windows (not inside Linux).
2. Open VS Code, go to the Extensions tab (Ctrl+Shift+X), search for **WSL**, and install the extension by Microsoft.
3. In your Linux terminal, navigate to a project directory and launch VS Code:

   ```sh
   code .
   ```
4. VS Code installs the WSL server components automatically and opens the workspace.

## Step 6: Install and configure Docker Desktop

Only needed for the [Full Stack guide](/tracks/website-ui/full-stack-guide).

1. Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
2. During installation, check **Use WSL 2 instead of Hyper-V**.
3. Launch Docker Desktop after installation.
4. Open Docker Desktop **Settings > Resources > WSL Integration**.
5. Enable integration with your Ubuntu distribution and click **Apply & restart**.
6. Verify Docker works in your Ubuntu terminal:

   ```sh
   docker --version
   docker run hello-world
   ```

## Step 7: Install uv

[uv](https://docs.astral.sh/uv/) is a fast, single-binary Python package and project manager that replaces pip, virtualenv and pip-tools. Only needed for the Full Stack guide.

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.cargo/env   # or restart your terminal
uv --version
```

## Running web servers inside Linux

WSL 2 forwards all localhost ports from Linux to Windows. Any web server running inside Linux (Node/Vite, an nginx container, Jupyter Lab) is immediately available in your Windows browser at `http://localhost:PORT`.

## Next

Continue with the [Front-End Developer Guide](/tracks/website-ui/frontend-guide) or the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide).
