# 概览

Linux stageless 植入体：入口位于 `main.nim`，包含构建宏以及持续与团队服务器通信的通道循环。

## 目录

- `/capabilities`：任务处理器（文件、中继、shell、端口扫描等）
- `/routine`：HTTP、TCP 和自定义通道入口
- `/utils`：全局变量、加密、网络、任务、COFF loader、linapi
