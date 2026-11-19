# 概览

Linux 分段加载器的共享 loader 工具：构建期全局变量、拉取下一阶段，以及 loader 例程在 stageless 代码运行前使用的小型辅助函数。

## 目录

- `/actions`：loader 与 C2 通信前的主机准备
- `/crypt`：loader 通道的传输解密与密码辅助
- `/linapi`：面向 POSIX 的处理器（为 stage 载荷加载共享库）
- `/network`：用于获取 stage 的 HTTP 客户端
