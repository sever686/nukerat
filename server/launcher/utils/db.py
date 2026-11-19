import os
from pathlib import Path
from infra.database.database import sqlite_db_sync as sqlite_db


def db_usage():
    # Prints the database path and the size of each table
    db_path = sqlite_db.database_path()

    if not db_path.is_file():
        print(f"未找到数据库：{db_path}")

        return 1

    total = db_path.stat().st_size

    for suffix in ("-wal", "-shm"):
        sidecar = Path(str(db_path) + suffix)

        if sidecar.is_file():
            total += sidecar.stat().st_size
    print(db_path)
    sqlite_db.start()

    try:
        table_sizes = sqlite_db.table_sizes()
    except Exception as exc:
        print(f"读取数据库出错：{exc}")

        return 1
    table_sizes.sort(key=lambda row: (-row[1], row[0]))
    rows = [("total", total)] + table_sizes
    formatted = []

    for label, n in rows:
        if n < 1024:
            formatted.append((label, f"{n} B"))
            continue

        v = float(n)

        for unit in ("KB", "MB", "GB", "TB"):
            v /= 1024

            if v < 1024 or unit == "TB":
                formatted.append((label, f"{v:.2f} {unit}"))
                break
    name_width = max(len(label) for label, _ in formatted)

    for label, size in formatted:
        print(f"{label.ljust(name_width)}  {size}")

    return 0

def db_export(dest):
    # Exports the database to the given path
    db_path = sqlite_db.database_path()

    if not db_path.is_file():
        print(f"未找到数据库：{db_path}")

        return 1

    if not dest or not str(dest).strip():
        print("错误：需要提供导出路径")

        return 1

    dest_path = str(dest).strip()

    if dest_path.startswith('"') and dest_path.endswith('"'):
        dest_path = dest_path[1:-1]
    elif dest_path.startswith("'") and dest_path.endswith("'"):
        dest_path = dest_path[1:-1]

    out = Path(dest_path).expanduser()

    if not out.exists():
        parent = out.parent

        if not parent.exists():
            try:
                parent.mkdir(parents=True, exist_ok=True)
            except OSError as exc:
                print(f"错误：无法创建目录（{parent}）：{exc}")

                return 1
    elif out.is_dir():
        print(f"错误：导出路径是目录（{out}）")

        return 1

    try:
        out = out.resolve()
    except OSError as exc:
        print(f"错误：导出路径无效（{exc}）")

        return 1
    parent = out.parent

    if not parent.is_dir():
        print(f"错误：未找到导出目录（{parent}）")

        return 1

    if not os.access(parent, os.W_OK):
        print(f"错误：导出目录不可写（{parent}）")

        return 1

    if out.is_file() and not os.access(out, os.W_OK):
        print(f"错误：导出文件不可写（{out}）")

        return 1

    sqlite_db.start()

    try:
        sqlite_db.export_to(out)
    except Exception as exc:
        print(f"导出数据库出错：{exc}")

        return 1
    print(f"数据库已导出到 {out}")

    return 0

def db_import(src):
    # Receives the file path and replaces the current database
    db_path = sqlite_db.database_path()

    if not src or not str(src).strip():
        print("错误：需要提供导入文件路径")

        return 1

    src_path = str(src).strip()

    if src_path.startswith('"') and src_path.endswith('"'):
        src_path = src_path[1:-1]
    elif src_path.startswith("'") and src_path.endswith("'"):
        src_path = src_path[1:-1]

    incoming = Path(src_path).expanduser()

    if not incoming.exists():
        print(f"错误：未找到路径（{incoming}）")

        return 1

    if incoming.is_dir():
        print(f"错误：路径是目录（{incoming}）")

        return 1

    if not incoming.is_file():
        print(f"错误：不是文件（{incoming}）")

        return 1

    try:
        incoming = incoming.resolve()
    except OSError as exc:
        print(f"错误：导入路径无效（{exc}）")

        return 1

    if not os.access(incoming, os.R_OK):
        print(f"错误：文件不可读（{incoming}）")

        return 1

    err = sqlite_db.check_sqlite_file(incoming)

    if err:
        print(f"错误：不是有效的 SQLite 数据库（{err}）")

        return 1

    dest_parent = db_path.expanduser().parent

    if dest_parent.exists() and not os.access(dest_parent, os.W_OK):
        print(f"错误：数据库目录不可写（{dest_parent}）")

        return 1

    print(f"这会替换位于 {db_path} 的当前数据库")
    answer = input(f"Import from {incoming}? [y/N]: ").strip().lower()

    if answer not in ("y", "yes"):
        print("已取消。")

        return 0

    dest_parent.mkdir(parents=True, exist_ok=True)
    sqlite_db.start()

    try:
        sqlite_db.import_from(incoming)
    except Exception as exc:
        print(f"导入数据库出错：{exc}")

        return 1
    print(f"数据库已从 {incoming} 导入")

    return 0
