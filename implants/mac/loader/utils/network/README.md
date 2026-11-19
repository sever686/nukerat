# 概览

macOS loader 获取下一阶段时使用的 HTTP 客户端。根据全局 URL 设置构建 GET 请求（HTTPS 时跳过 TLS 校验），并将响应规范化为例程层使用的小型结构体。
