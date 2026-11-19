# 概览

Mac loader 的共享辅助：`global` 中的构建占位符、C2 HTTP、加密传输以及 Darwin API 封装。

## 目录

- `/actions`：main 前置准备 hook
- `/crypt`：loader 流量的 AES 传输封装/解包
- `/macapi`：macOS 系统调用与处理器垫片
- `/network`：loader 通道的 HTTP 核心
- `/obf`：字符串混淆辅助
- `/stage`：通过 `RunStageApp` 运行分段载荷
