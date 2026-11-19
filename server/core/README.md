# 概览

服务端主逻辑。

## 目录

- `/logic`：团队服务器路由的原始逻辑（服务端入口指向这里）
- `/middlewares`：JWT 校验中间件
- `/routes`：路由入口，原始逻辑位于 `/logic`
- `/schemas`：客户端输入校验 schema
- `/utils`：各种逻辑，例如：
    - IOC 采集
    - 帮助消息（军械库、lolbins 等）
    - NukeScript 校验相关逻辑
