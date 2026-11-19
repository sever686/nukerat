import secrets
import string
from pathlib import Path
import bcrypt
from infra.database.database import User, sqlite_db_sync as sqlite_db


def key_add(name):
    # Creates the operator, stores the hash in the DB and writes the key file
    base = name.strip()

    if not base:
        print("用户名为必填项")

        return

    if "/" in base or "\\" in base or base in (".", ".."):
        print("名称无效")

        return

    folder = Path.cwd()
    index = 0

    while True:
        username = base if index == 0 else f"{base}({index})"

        if len(username) > 150:
            print("名称必须少于 150 个字符")

            return

        if not sqlite_db.read(User, user=username) and not (folder / f"{username}.key").exists():
            break

        index += 1
    pool = string.ascii_letters + string.digits
    password = "".join(secrets.choice(pool) for _ in range(23))
    secret = "".join(secrets.choice(pool) for _ in range(256))
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    sqlite_db.write(
        User(
            user=username,
            password_hash=password_hash,
            secret=secret,
        )
    )
    path = folder / f"{username}.key"
    path.write_text(f"{username}:{password}:{secret}\n", encoding="utf-8")
    print(f"{username}:{password}:{secret}")
    print(f"\n操作员创建成功：{username}")
    print(f"已保存：{path}")

def key_list():
    # Prints the operators stored in the DB
    rows = sqlite_db.read(User)

    if not rows:
        print("没有操作员")

        return

    for row in rows:
        print(f"{row.user}  (id={row.id})")

def key_rem(name):
    # Removes the operator from the DB
    username = name.strip()

    if sqlite_db.delete(User, user=username) == 0:
        print(f"未找到用户：{username}")

        return

    print(f"操作员已撤销：{username}")
