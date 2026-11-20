#!/usr/bin/env python3

# Copyright (C) 2026 Gustavo Henrique T.
# SPDX-License-Identifier: GPL-3.0-or-later
# See LICENSE and DISCLAIMER.md in the repository root.

#⠀ ⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
#⠀ ⠀⠀⣠⣶⡿⠿⠛⠿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
#⠀ ⠀⣰⣿⠋⠀⠀⠀⠀⠀⠹⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
#⠀ ⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⢿⣷⣦⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
#⠀ ⠀⠹⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⣷⣦⡀⠀⠀⠀⠀⠀  ~ NUKERAT
#⠀ ⠀⠀⠙⣿⣷⣶⣤⠤⠀⠀⠀⠀⣴⣶⣄⠈⠻⣿⣆⠀⠀⠀⠀  Post exploitation framework
#⠀ ⠀⣠⣾⣿⣃⣀⣀⠀⠀⠀⠀⠀⠙⠛⠛⠂⠀⠈⢿⣧⠀⠀⠀⠀⠀
#⠀ ⠚⠛⢛⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⣾⡿⠀⠀⠀⠀⠀
#⠀ ⢀⣴⣿⣿⣷⣶⣶⣶⠆⢀⣾⣿⡿⠿⠿⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀
#⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⣴⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
#⠀ ⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

# VARIABLES ======================================================================================

root = Path(__file__).resolve().parent
nukerat_cmd = Path(sys.argv[0]).name

server_root = root / "server"
client_root = root / "client" / "gui"

server_image = "nukerat-server"
client_image = "nukerat-client"
server_container = "nukerat-server"
client_container = "nukerat-client"
server_port = "9000"
server_data_volumes = [
    "-v",
    "nukerat-database:/opt/nukerat/server/infra/database",
    "-v",
    "nukerat-certs:/opt/nukerat/server/infra/certs",
    "-v",
    "nukerat-logs:/opt/nukerat/server/logs",
]

nukerat_help = f"""USAGE:
    {nukerat_cmd} <mode> <command> ...

MODES
    server                             Server mode
    client                             Client mode

COMMANDS
    help                               Show this help message
    version                            Show version of the server and client

    server start                       Start server
    client start                       Start client

    server config list                 List server config
    server config set <key> <value>    Set server config
    server config reset <key>          Reset server config to default
    server config load <file>          Load server config from file
    server config create-tls           Create a self signed cert and enable TLS

    server key list                    List operators keys
    server key add john                Create operator key
    server key rem john                Remove operator key

    server venv list                   List installed python packages
    server venv install <package>      Install a python package
    server venv uninstall <package>    Uninstall a python package
    
    server db usage                    Show database information
    server db export <path>            Export database to a file
    server db import <file>            Import database from a file
"""

# FUNCTIONS ======================================================================================


def ensure_docker():
    if shutil.which("docker") is None:
        print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] Docker is not installed", file=sys.stderr)
        sys.exit(1)
    probe = subprocess.run(
        ["docker", "info"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if probe.returncode == 0:
        return "docker"
    err = (probe.stderr or "").lower()
    if "permission denied" in err:
        print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] Cannot talk to Docker. Add your user to the docker group", file=sys.stderr)
        sys.exit(1)
    if shutil.which("systemctl"):
        started = subprocess.run(
            ["systemctl", "start", "docker"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        if started.returncode != 0:
            subprocess.run(
                ["sudo", "-n", "systemctl", "start", "docker"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
            )
    elif shutil.which("service"):
        subprocess.run(
            ["service", "docker", "start"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    time.sleep(1)
    probe = subprocess.run(
        ["docker", "info"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if probe.returncode != 0:
        print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] Cannot talk to Docker. Start the daemon", file=sys.stderr)
        sys.exit(1)
    return "docker"


def client():
    bin_name = ensure_docker()
    inspect = subprocess.run(
        [bin_name, "image", "inspect", client_image],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if inspect.returncode != 0:
        print(f"[ \x1b[38;2;255;48;48mERROR\x1b[0m ] Image not found: {client_image}. Build it with: bash install/docker/docker.sh client", file=sys.stderr)
        sys.exit(1)
    display = os.environ.get("DISPLAY")
    if not display:
        print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] DISPLAY is not set", file=sys.stderr)
        sys.exit(1)
    xauthority = os.environ.get("XAUTHORITY") or str(Path.home() / ".Xauthority")
    args = [bin_name, "run", "--rm", "--name", client_container]
    if sys.stdin.isatty() and sys.stdout.isatty():
        args.extend(["-it"])
    else:
        args.extend(["-i"])
    args.extend(["--ipc", "host", "-e", f"DISPLAY={display}"])
    if sys.platform.startswith("linux"):
        args.extend(["--network", "host", "-v", "/tmp/.X11-unix:/tmp/.X11-unix:ro"])
        if Path(xauthority).is_file():
            args.extend(["-v", f"{xauthority}:/home/nukerat/.Xauthority:ro"])
            args.extend(["-e", "XAUTHORITY=/home/nukerat/.Xauthority"])
        home = Path(f"/home/{os.environ['SUDO_USER']}") if os.environ.get("SUDO_USER") else Path.home()
        args.extend(["-v", f"{home}:/home/nukerat"])
    args.append(client_image)
    named = subprocess.run(
        [bin_name, "inspect", "-f", "{{.State.Running}}", client_container],
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
        check=False,
    )
    if named.returncode == 0:
        subprocess.run(
            [bin_name, "rm", "-f", client_container],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    os.execvp(args[0], args)


def server(argv):
    bin_name = ensure_docker()
    inspect = subprocess.run(
        [bin_name, "image", "inspect", server_image],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if inspect.returncode != 0:
        print(f"[ \x1b[38;2;255;48;48mERROR\x1b[0m ] Image not found: {server_image}. Build it with: bash install/docker/docker.sh server", file=sys.stderr)
        sys.exit(1)
    host_uid = os.environ.get("SUDO_UID") or str(os.getuid())
    host_gid = os.environ.get("SUDO_GID") or str(os.getgid())
    if host_uid == "0":
        host_uid = "1000"
        host_gid = "1000"
    keys_dir = str(Path.cwd().resolve())
    run_volumes = [
        *server_data_volumes,
        "-v",
        f"{keys_dir}:/opt/nukerat/keys",
        "-w",
        "/opt/nukerat/keys",
        "--user",
        f"{host_uid}:{host_gid}",
    ]
    subprocess.run(
        [
            bin_name,
            "run",
            "--rm",
            "--user",
            "0",
            "--entrypoint",
            "bash",
            *server_data_volumes,
            server_image,
            "-lc",
            (
                "mkdir -p /opt/nukerat/server/infra/database "
                "/opt/nukerat/server/infra/certs "
                "/opt/nukerat/server/logs; "
                "if [ ! -f /opt/nukerat/server/infra/database/database.db ]; then "
                "sqlite3 /opt/nukerat/server/infra/database/database.db "
                "</opt/nukerat/server/infra/database/init.sql; fi; "
                f"chown -R {host_uid}:{host_gid} /opt/nukerat/server/infra/database "
                "/opt/nukerat/server/infra/certs "
                "/opt/nukerat/server/logs"
            ),
        ],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    state = subprocess.run(
        [bin_name, "inspect", "-f", "{{.State.Running}}", server_container],
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
        check=False,
    )
    running = None
    if state.returncode == 0:
        running = state.stdout.strip().lower() == "true"
    tty = ["-it"] if sys.stdin.isatty() and sys.stdout.isatty() else ["-i"]
    network = ["--network", "host"] if sys.platform.startswith("linux") else ["-p", f"{server_port}:{server_port}"]
    if not argv or argv[0] == "start":
        if running is True:
            print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] Server is already running", file=sys.stderr)
            sys.exit(1)
        if running is False:
            os.execvp(bin_name, [bin_name, "start", "-ai", server_container])
        os.execvp(
            bin_name,
            [bin_name, "run", "--name", server_container, *tty, *network, *run_volumes, server_image],
        )
    if running is True:
        os.execvp(
            bin_name,
            [bin_name, "exec", *tty, server_container, "nukerat", "server", *argv],
        )
    os.execvp(
        bin_name,
        [bin_name, "run", "--rm", *tty, *network, *run_volumes, server_image, "server", *argv],
    )


def version():
    sv = ""
    cv = ""
    version_py = server_root / "version.py"
    if version_py.is_file():
        for line in version_py.read_text().splitlines():
            m = re.match(r'^\s*__version__\s*=\s*"([^"]*)"', line)
            if m:
                sv = m.group(1)
                break
    package_json = client_root / "package.json"
    if package_json.is_file():
        for line in package_json.read_text().splitlines():
            m = re.search(r'.*"version"\s*:\s*"([^"]*)"', line)
            if m:
                cv = m.group(1)
                break
    if not sv:
        sv = "unknown"
    if not cv:
        cv = "unknown"
    print(f"client\t{cv}")
    print(f"server\t{sv}")


# MAIN LOGIC =====================================================================================

args = sys.argv[1:]
args_spaced = f" {' '.join(args)} " if args else " "

if len(args) == 0 or " help " in args_spaced:
    print(nukerat_help)
    sys.exit(0)

if os.name != "nt" and os.geteuid() != 0:
    print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] docker.py must be executed with sudo", file=sys.stderr)
    sys.exit(1)

if len(args) >= 2 and args[0] == "client" and args[1] == "start":
    client()

if len(args) >= 1 and args[0] == "server":
    server(args[1:])

if len(args) >= 1 and args[0] == "version":
    version()
    sys.exit(0)

print(nukerat_help, file=sys.stderr)
sys.exit(1)
