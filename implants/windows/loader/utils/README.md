# 概览

共享 loader 工具：构建全局变量、C2 加密、HTTP 客户端、系统调用准备桩以及分段。

## 目录

- `/actions`：例程启动前的准备/指纹采集
- `/crypt`：AES 传输与配套密码算法
- `/network`：loader 通道的 HTTP 辅助
- `/winapi`：加载期间使用的系统调用表、桩与欺骗辅助
