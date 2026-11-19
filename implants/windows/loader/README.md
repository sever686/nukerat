# 概览

Windows loader。`main.nim` 先运行前言代码，再运行通道例程。

## 目录

- `/capabilities`：AMSI/ETW/PE 补丁与睡眠掩码
- `/routine`：HTTP 或自定义通道入口
- `/utils`：全局变量、加密、网络、winapi 以及 stage 准备
