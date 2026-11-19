# 概览

共享 stageless 基础设施：全局变量、任务缓冲区、加密传输、COFF loader 以及各通道专用的网络代码。

## 目录

- `/actions`：主机准备与指纹采集
- `/coffloader`：BOF 加载器（Windows COFF）
- `/crypt`：C2 加密与密码工具
- `/debug`：调试制品的占位目录
- `/general`：字符串、元数据、编码
- `/network`：HTTP、TCP、SMB、socks、端口转发、中继数据包
- `/tasks`：任务队列、线程、缓冲区
- `/winapi`：间接系统调用、处理器、桩
