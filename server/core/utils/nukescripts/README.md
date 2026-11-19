# 概览

从团队服务器运行 NukeScript worker 的逻辑。start_worker 就在此处：它启动 worker 线程，并将每个 NukeScript 函数指向 `/calls` 中的调用，使这些调用在服务端循环上运行。

## 目录

- `/calls`：worker 回调服务端的调用（命令、资源管理器、进程列表、截图、文件服务器、网络、智能体）
