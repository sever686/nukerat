from launcher.utils.db import db_export, db_import, db_usage


def main_db(option):
    # Receives the db command and calls usage, export or import
    parts = option.split()
    if len(parts) < 2 or parts[0] != "db":
        print("选项无效")
        return

    cmd = parts[1]

    if cmd == "usage":
        if len(parts) != 2:
            print('语法无效。请使用 "db usage"。')
            return
        exit_code = db_usage()
        if exit_code:
            raise SystemExit(exit_code)
        return

    if cmd == "export":
        if len(parts) != 3:
            print('语法无效。请使用 "db export <path>"。')
            return
        exit_code = db_export(parts[2])
        if exit_code:
            raise SystemExit(exit_code)
        return

    if cmd == "import":
        if len(parts) != 3:
            print('语法无效。请使用 "db import <file>"。')
            return
        exit_code = db_import(parts[2])
        if exit_code:
            raise SystemExit(exit_code)
        return

    print("选项无效")
