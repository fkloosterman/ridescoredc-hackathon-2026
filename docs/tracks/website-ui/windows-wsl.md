# How to set up a Linux development environment inside Windows

Setting up the Windows Subsystem for Linux (WSL) provides a full Linux development environment directly inside Windows.

## Step 1: Install WSL 2 (Ubuntu)

1. Open **PowerShell** or **Command Prompt** as Administrator (right-click and select **Run as administrator**).
2. Run the following command:

   ```sh
   wsl --install
   ```

   *(This command enables necessary features, downloads the Linux kernel, and installs Ubuntu by default.)*
3. **Restart your computer** when prompted.
4. After restarting, a terminal window will open automatically to complete the Ubuntu installation.
5. Enter a username and password for your Linux environment when prompted:

   ```text
   Enter new UNIX username: <<your_username>>
   New password:
   Retype new password:
   ```

   Note that the password is entered blindly and no characters are shown on the screen.

## Step 2: Update Ubuntu Packages

Before installing software, ensure your package list and installed packages are up to date.

1. Open the **Ubuntu** app from your Start Menu.
2. Run the update command:

   ```sh
   sudo apt update && sudo apt upgrade -y
   ```

## Step 3: Install and Configure Git

Git allows you to track code changes and connect to repositories like GitHub.

1. Install Git:

   ```sh
   sudo apt install git -y
   ```
2. Verify installation:

   ```sh
   git --version
   ```
3. Configure your Git identity (replace <code><span class="placeholder">Your Name</span></code> and [<code class="placeholder">your.email@example.com</code>](mailto:your.email@example.com) with your actual name and email address):

   ```sh
   git config --global user.name "<<Your Name>>"
   ```

   `git config --global user.email "`[<code class="placeholder">your.email@example.com</code>](mailto:your.email@example.com)`"`

## Step 4: Accessing Files Between Windows and Linux

WSL 2 operates on a Linux virtual filesystem, but both operating systems can access each other's files.

### Accessing Linux files from Windows

- Open **File Explorer** in Windows.
- In the left sidebar, scroll down to Linux (or type `\\wsl$` in the address bar).
- Alternatively, inside your Linux terminal, open the current directory in Windows File Explorer by typing:

  ```sh
  explorer.exe .
  ```

### Accessing Windows files from Linux

- Your Windows drives are mounted inside Linux under /mnt/.
- To navigate to your Windows C: drive, run the following command, replacing <code><span class="placeholder">YourWindowsUsername</span></code> with your actual user name:

  ```sh
  cd /mnt/c/Users/<<YourWindowsUsername>>/
  ```
- **Best Practice:** Always keep your project source code files inside the Linux filesystem (e.g., in <code>/home/<span class="placeholder">username</span>/projects/</code>). Storing project files directly in Linux offers significantly faster performance than working across `/mnt/c/`.

## Step 5: Set Up Visual Studio Code for WSL

VS Code lets you edit Linux files seamlessly from Windows.

1. Download and install [VS Code on Windows](https://code.visualstudio.com/) (not inside Linux).
2. Open VS Code, go to the **Extensions tab** (`Ctrl + Shift + X`), search for **WSL**, and install the extension by Microsoft.
3. Open your Linux terminal, navigate to a project directory, and launch VS Code:

   ```sh
   code .
   ```
4. VS Code will install the WSL server components automatically and open the workspace.

## Step 6: Install and Configure Docker Desktop

1. Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
2. During installation, check the box for **Use WSL 2 instead of Hyper-V**.
3. Launch Docker Desktop after installation.
4. Open Docker Desktop **Settings &gt; Resources &gt; WSL Integration**.
5. Enable integration with your **Ubuntu** distribution and click **Apply & restart**.
6. Verify Docker works in your Ubuntu terminal:

   ```sh
   docker --version
   docker run hello-world
   ```

## Step 7: Install uv

`uv` is an extremely fast, single-binary Python package and project manager that can handle package installation, virtual environments, and dependency management.

1. Open your **Ubuntu** terminal.
2. Install uv using the official installer script:
   `curl -LsSf` [`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh) `| sh`
3. Restart your terminal, or reload your shell configuration:

   ```sh
   source ~/.bashrc
   ```
4. Verify the installation:

   ```sh
   uv --version
   ```

## Running web servers or Jupyter Lab inside Linux

WSL 2 automatically forwards all `localhost` ports from Linux to Windows, so any web server running inside Linux—whether Node/Vite, an Nginx container, or Jupyter Lab—is immediately accessible in your Windows browser at [`http://localhost`](http://localhost)`:<port>`.
