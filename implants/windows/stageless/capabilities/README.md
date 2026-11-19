# 概览

Windows stageless 植入体面向任务的命令实现。顶层 `.nim` 文件涵盖文件系统、进程和网络操作；较重的流程放在子文件夹中并由 `modes.nim` 接入。

## 目录

- `/execution`：shellcode、.NET 及 DLL 运行辅助
- `/injection`：远程注入与分配模式
- `/keylogger`：键盘捕获工作线程
- `/lolbins`：可信二进制执行封装
- `/portscan`：端口扫描工作线程
- `/relay`：中继注册表以及 HTTP、TCP 和 SMB 路径
- `/sleep`：信标循环的掩码睡眠
- `/system`：Getsystem 风格提权路径
- `/tokens`：令牌操作辅助
