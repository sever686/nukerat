from launcher.utils.venv import venv_install, venv_list, venv_uninstall


def main_venv(option):
    # Receives the venv command and calls list, install or uninstall
    parts = option.split()
    if len(parts) < 2 or parts[0] != "venv":
        print("选项无效")
        return

    cmd = parts[1]

    if cmd == "list":
        if len(parts) != 2:
            print('语法无效。请使用 "venv list"。')
            return
        venv_list()
        return

    if cmd == "install":
        if len(parts) != 3:
            print('语法无效。请使用 "venv install <package>"。')
            return
        venv_install(parts[2])
        return

    if cmd == "uninstall":
        if len(parts) != 3:
            print('语法无效。请使用 "venv uninstall <package>"。')
            return
        venv_uninstall(parts[2])
        return

    print("选项无效")
