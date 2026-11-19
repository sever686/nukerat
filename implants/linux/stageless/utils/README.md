# 概览

Linux 共享的 stageless 基础设施：全局变量、任务分发、加密传输以及各通道专用的网络代码。

## 目录

- `/actions`：主机准备与指纹采集
- `/coffloader`：面向 Linux 的 BOF 风格 COFF loader
- `/crypt`：C2 加密与密码工具
- `/general`：字符串格式化器与信标元数据 JSON
- `/libs`：小型标准库垫片（HTTP）
- `/linapi`：各能力共用的 POSIX 辅助
- `/network`：HTTP 核心、TCP、中继数据包、socks、端口转发
- `/tasks`：任务注册表、工作线程、输出缓冲区
