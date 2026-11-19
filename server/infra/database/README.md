# 概览

sqlite 数据库文件（`database.db`）与共享连接层所在文件夹。`init.sql` 是安装程序加载的 schema，`database.py` 是模型以及异步/同步访问（`sqlite_db`），`listener_utils.py` 是监听器线程使用的数据库访问，`cell_limits.py` 将文本单元格按配置大小截断。
