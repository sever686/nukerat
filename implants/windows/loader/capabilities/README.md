# 概览

Stageless 载荷运行前的 loader 侧能力 hook。AMSI/ETW 与 PE 头补丁位于 `patch.nim`；信标睡眠掩码变体位于 `/sleep` 下。

## 目录

- `/sleep`：loader 的 Ekko、Zilean 与基础睡眠实现
