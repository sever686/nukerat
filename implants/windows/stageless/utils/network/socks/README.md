# 概览

构建在 stageless TCP 栈之上的轻量 SOCKS 辅助。`core.nim` 跟踪 socket fd，并转发 connect、read、write 和 close。
