# 概览

用 Nim 编写的 Windows 智能体代码。Loader 是轻量分段器；stageless 增加了 SMB/TCP/HTTP/自定义例程、间接系统调用以及完整的能力集。

## 目录

- `/loader`：第一阶段（`main.nim`，可选的 dllsafe 入口）
- `/stageless`：完整植入体，Win32/NT 辅助位于 `/utils/winapi`
