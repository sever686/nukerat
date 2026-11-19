# 概览

Launcher 命令的原始逻辑。start.py 是团队服务器实际启动的地方（uvicorn、日志、清理 tmp 目录中的文件）。key、config、venv 和 db 文件负责解析命令并调用 `/utils` 中的辅助函数。
