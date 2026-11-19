# 概览

用 Go 编写的 macOS 智能体代码。loader 与 stageless 目录结构与其他平台一致；构建标签和混淆字符串通过 `utils/obf` 和 `utils/global` 接入。

## 目录

- `/loader`：分段加载器（`main.go` 先运行 `Custom`，再运行 `routine.MainInit`）
- `/stageless`：完整植入体，为 dylib 风格构建导出 `StartW`
