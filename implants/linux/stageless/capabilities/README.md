# 概览

Linux stageless 植入体的任务处理器。顶层模块涵盖文件系统、进程、shell、中继、socks、端口转发以及类似的操作员命令；`modes.nim` 将名称与这些入口关联。

## 目录

- `/portscan`：端口扫描任务逻辑
- `/relay`：HTTP/TCP 中继帧处理与自定义监听器 hook
