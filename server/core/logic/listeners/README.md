# 概览

围绕 HTTP 与文件服务器监听器的全部逻辑（创建、重启、列出、移除）。`config.py` 仅包含长轮询标志。端口解析与 HTTP 路径位于 `http.py`，文件服务器路径位于 `file_server.py`。

## 目录

- `/certs`：证书检查与 openssl 自签名路径
