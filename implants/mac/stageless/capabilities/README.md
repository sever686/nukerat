# 概览

macOS stageless 的操作员任务入口。此处的 Go 文件实现下载、shell、进程、中继、socks 及相关命令；`modes.go` 将任务名映射到处理器，并过滤仅 Windows 使用的名称。

## 目录

- `/portscan`：端口扫描核心与辅助
- `/relay`：与其他平台共享的中继 HTTP/TCP/帧逻辑
