# 概览

Windows stageless 的中继工作线程注册表与转发。`core` 负责中继状态与锁；`frame`、`http`、`http_custom`、`tcp` 和 `smb` 实现各通道的中继 I/O。
