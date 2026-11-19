# 概览

每种输出格式一个文件。exe 和 dll 还会重写 PE 头，shellcode 使用 donut 将 exe 转为 shellcode，elf 和 so 共用 `common.py` 中更短的运行流程。
