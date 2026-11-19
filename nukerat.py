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
import sys
from pathlib import Path

# VARIABLES ======================================================================================

root = Path(__file__).resolve().parent
nukerat_cmd = Path(sys.argv[0]).name

server_root = root / "server"
client_root = root / "client" / "gui"

nukerat_help = f"""用法：
    {nukerat_cmd} <模式> <命令> ...

模式
    server                             服务端模式
    client                             客户端模式

命令
    help                               显示此帮助信息
    version                            显示服务端和客户端版本

    server start                       启动服务端
    client start                       启动客户端

    server config list                 列出服务端配置
    server config set <key> <value>    设置服务端配置
    server config reset <key>          将配置项重置为默认值
    server config load <file>          从文件加载服务端配置
    server config create-tls           创建自签名证书并启用 TLS

    server key list                    列出操作员密钥
    server key add john                创建操作员密钥
    server key rem john                移除操作员密钥

    server venv list                   列出已安装的 Python 包
    server venv install <package>      安装 Python 包
    server venv uninstall <package>    卸载 Python 包

    server db usage                    显示数据库信息
    server db export <path>            将数据库导出到文件
    server db import <file>            从文件导入数据库
"""

# FUNCTIONS ======================================================================================


def is_root():
    if os.name == "nt":
        return False
    return os.geteuid() == 0


def client():
    if os.name == "nt":
        if not (client_root / "dist" / "win-unpacked" / "nukerat.exe").is_file():
            print(f"[ \x1b[38;2;255;48;48mERROR\x1b[0m ] 未找到客户端可执行文件：{client_root / 'dist' / 'win-unpacked' / 'nukerat.exe'}", file=sys.stderr)
            sys.exit(1)
        os.execv(str(client_root / "dist" / "win-unpacked" / "nukerat.exe"), [str(client_root / "dist" / "win-unpacked" / "nukerat.exe")])

    if sys.platform == "darwin":
        app = client_root / "dist" / "mac" / "nukerat.app" / "Contents" / "MacOS" / "nukerat"
        if not app.is_file():
            app = client_root / "dist" / "mac-arm64" / "nukerat.app" / "Contents" / "MacOS" / "nukerat"
        if not app.is_file():
            print(f"[ \x1b[38;2;255;48;48mERROR\x1b[0m ] 未找到客户端应用：{client_root / 'dist' / 'mac' / 'nukerat.app'}", file=sys.stderr)
            sys.exit(1)
        os.execv(str(app), [str(app)])

    gui = Path("/usr/local/bin/nukerat-gui")
    if os.access(gui, os.X_OK):
        os.execv(gui, [str(gui)])

    if not os.access(client_root / "dist" / "nukerat.AppImage", os.X_OK):
        print(f"[ \x1b[38;2;255;48;48mERROR\x1b[0m ] 未找到客户端 AppImage：{client_root / 'dist' / 'nukerat.AppImage'}", file=sys.stderr)
        sys.exit(1)

    # Fix display for root user
    env = os.environ.copy()
    if is_root():
        env["DISPLAY"] = env.get("DISPLAY") or ":0"
        sudo_user = env.get("SUDO_USER", "")
        if sudo_user:
            env["XAUTHORITY"] = f"/home/{sudo_user}/.Xauthority"

    # Start
    argv = [str(client_root / "dist" / "nukerat.AppImage")]
    if is_root():
        argv.append("--no-sandbox")
    os.execve(str(client_root / "dist" / "nukerat.AppImage"), argv, env)


def server(argv):
    # Validations
    if not server_root.is_dir():
        print(f"[ \x1b[38;2;255;48;48mERROR\x1b[0m ] 未找到服务端目录：{server_root}", file=sys.stderr)
        sys.exit(1)

    venv_python = server_root / "venv" / "bin" / "python3"

    if not os.access(venv_python, os.X_OK):
        print(f"[ \x1b[38;2;255;48;48mERROR\x1b[0m ] 未找到虚拟环境 Python：{venv_python}", file=sys.stderr)
        sys.exit(1)

    env = os.environ.copy()
    env["PYTHONPATH"] = f"{server_root}:{server_root / 'core'}"

    # Start
    main_py = server_root / "main.py"
    os.execve(
        str(venv_python),
        [str(venv_python), str(main_py), *argv],
        env,
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

if len(args) >= 2 and args[0] == "client" and args[1] == "start":
    if is_root():
        print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] 客户端不应以 sudo 运行", file=sys.stderr)
        sys.exit(1)
    client()

if len(args) >= 1 and args[0] == "server":
    if is_root():
        print("[ \x1b[38;2;255;48;48mERROR\x1b[0m ] 服务端不应以 sudo 运行", file=sys.stderr)
        sys.exit(1)
    server(args[1:])

if len(args) >= 1 and args[0] == "version":
    version()
    sys.exit(0)

print(nukerat_help, file=sys.stderr)
sys.exit(1)
