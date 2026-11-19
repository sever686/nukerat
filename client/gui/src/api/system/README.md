# 概览

登录、已保存的服务器列表以及操作员密钥解析。这些在其他团队服务器调用之前运行。`auth.tsx` 向 `/auth/login` 发起 POST，`config.tsx` 通过 Electron 读写服务器列表，`key.tsx` 负责解析密钥。
