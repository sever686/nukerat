# 概览

团队服务器路由的原始逻辑（服务端入口指向这里）。响应包装位于 `conclude_logic.py`。

## 目录

- `/aes`：AES 密钥创建
- `/agents`：智能体记录以及与其通信的调用（deepseek、自定义等）
- `/auth`：登录校验与 JWT 创建
- `/credentials`：凭据记录（列出、创建、编辑、删除）
- `/explorer`：主机上的文件夹与文件读取
- `/file_server`：位于文件服务器监听器中的文件
- `/implants`：植入体构建逻辑
- `/iocs`：IOC 列出与移除
- `/keylogger`：键盘记录记录
- `/listeners`：HTTP 与文件服务器监听器逻辑
- `/logs`：读取 `server.log` 和 `listeners.log`
- `/network`：SOCKS 与端口转发
- `/notifications`：新主机通知
- `/ns_output`：NukeScript 输出长轮询
- `/process`：进程树请求
- `/queue`：任务队列列出
- `/reports`：报告文件（活动、主机、ioc）
- `/screenshot`：来自 `infra/tmp` 的截图快照
- `/scripts`：NukeScript 记录与语法检查
- `/sessions`：主机会话列出与中继图谱
- `/terminal`：终端命令逻辑
- `/utils`：客户端断开监视
