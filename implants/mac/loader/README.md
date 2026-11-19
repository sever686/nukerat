# 概览

macOS 分段加载器。获取并运行下一阶段（通过 `utils/stage` 和 macapi 加载共享库），并在 `/routine` 下实现 HTTP 或自定义 C2 循环。

## 目录

- `/capabilities`：仅 loader 使用的能力（睡眠等）
- `/routine`：通道入口（`start`、`http`、`custom`）
- `/utils`：全局变量、加密传输、网络、macapi、混淆、分段辅助
