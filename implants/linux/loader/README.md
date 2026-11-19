# 概览

Linux 分段加载器：先执行构建期准备工作，然后移交给 HTTP 或自定义 C2 例程。

## 目录

- `/capabilities`：仅 loader 使用的附加能力，例如睡眠掩码
- `/routine`：通道入口（`start` 选择 HTTP 或自定义）
- `/utils`：共享 loader 逻辑（分段、加密、linapi、网络）
