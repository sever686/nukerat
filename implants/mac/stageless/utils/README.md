# 概览

Mac 共享的 stageless 工具：全局变量、任务注册表、加密传输、网络以及主机元数据采集。

## 目录

- `/actions`：信标循环前的指纹采集与准备
- `/crypt`：C2 载荷加密辅助
- `/general`：字符串与元数据构建器
- `/macapi`：各能力使用的 Darwin API 处理器
- `/network`：HTTP、TCP、中继数据包、SOCKS、端口转发
- `/obf`：编译期字符串混淆
- `/tasks`：任务缓冲区、线程与分发辅助
