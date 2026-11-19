# 概览

植入体编译逻辑所在。`core.py` 选择格式（exe、dll、shellcode、elf、so、app）。编译器的沙箱包装位于 `sandbox.py`，文件读取位于 `blocking_io.py`。

## 目录

- `/go`：Go 编译路径（`app` 格式）
- `/nim`：Nim 编译路径（exe、dll、shellcode、elf、so）
- `/modules`：编译使用的额外部件，例如垃圾代码
