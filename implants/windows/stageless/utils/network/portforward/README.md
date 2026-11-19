# 概览

Windows stageless 的 TCP 端口转发会话表。按连接 id 跟踪 socket 句柄，并将读写委托给 `/network/socks` 下的 SOCKS 核心。
