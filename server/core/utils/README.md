# 概览

各种逻辑，例如 IOC 采集、帮助消息（军械库、lolbins 等）、队列辅助函数，以及 NukeScript worker 桥接。querys.py 是队列行辅助函数（创建、读取、删除）和智能体历史行；validation.py 等待 NukeScript worker 批准或拒绝就绪的队列行；lolbins.json 是主机二进制路径、标签以及部分占位符的目录。

## 目录

- `/iocs`：从终端命令与文件服务器传输中采集 IOC
- `/messages`：帮助消息文本（命令、军械库工具、lolbins 等）
- `/nukescripts`：启动 NukeScript worker 的逻辑以及它回调服务端的调用
