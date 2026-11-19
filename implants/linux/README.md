# 概览

用 Nim 编写的 Linux 智能体代码。`global` 和 `custom` 中的构建期占位符会在服务端编译植入体时填充。

## 目录

- `/loader`：与 C2 通信的第一阶段二进制，随后运行分段载荷
- `/stageless`：完整植入体（`main.nim` 为共享库构建导出 `StartW`）
