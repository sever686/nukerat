# 概览

Windows stageless 的 C2 加密。AES-GCM 传输封装/解包（`transport.nim`），以及 `/utils` 下用于密钥和探测的 RC4、XOR 解码与共享 Rijndael 辅助。

## 目录

- `/utils`：分组密码模式与底层 AES 原语
