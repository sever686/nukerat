# 概览

Windows stageless 植入体：`main.nim` 入口（EXE 或 DLL 安全线程派生）、构建宏，以及选择 HTTP、TCP、SMB 或自定义 C2 的例程。

## 目录

- `/capabilities`：任务处理器（执行、注入、中继、令牌等）
- `/routine`：通道循环（http、tcp、smb、custom）
- `/utils`：全局变量、winapi、加密、COFF loader、网络、任务
