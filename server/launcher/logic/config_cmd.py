from launcher.utils.config import (
    config_create_tls,
    config_list,
    config_load,
    config_reset,
    config_set,
)


def main_config(option):
    # Receives the config command and calls list, set, reset, load or create tls
    parts = option.split()
    if len(parts) < 2 or parts[0] != "config":
        print("选项无效")
        return

    cmd = parts[1]

    if cmd == "list":
        if len(parts) != 2:
            print('语法无效。请使用 "config list"。')
            return
        config_list()
        return

    if cmd == "set":
        if len(parts) < 4:
            print('语法无效。请使用 "config set <key> <value>"。')
            return
        key = parts[2]
        value = " ".join(parts[3:])
        config_set(key, value)
        return

    if cmd == "reset":
        if len(parts) != 3:
            print('语法无效。请使用 "config reset <key>"。')
            return
        config_reset(parts[2])
        return

    if cmd == "load":
        if len(parts) != 3:
            print('语法无效。请使用 "config load <file>"。')
            return
        exit_code = config_load(parts[2])
        if exit_code:
            raise SystemExit(exit_code)
        return

    if cmd == "create-tls":
        if len(parts) != 2:
            print('语法无效。请使用 "config create-tls"。')
            return
        exit_code = config_create_tls()
        if exit_code:
            raise SystemExit(exit_code)
        return

    print("选项无效")
