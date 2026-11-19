# 概览

面向 Windows 的进程内 COFF/BOF 加载器。校验目标文件、映射节区、解析符号，并以可选的 BOF 参数运行入口。

## 目录

- `/lib`：底层 COFF 组件（解析、重定位、内存、信标 I/O 等）
- `loader.nim` / `nimcoff.nim`：执行类能力使用的编排与导出
