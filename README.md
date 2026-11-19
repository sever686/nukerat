<p align="center">
  <a href="https://github.com/nukeratframework/nukerat">
    <img src=".github/banners/logo.png" height="80">
    <h3 style="font-size: 1.7rem;" align="center">NukeRat</h3>
  </a>
</p>

<p align="center">
  后渗透利用框架
</p>

<p align="center">
  <a href="https://nukerat.com/docs"><strong>文档</strong></a> ·
  <a href="https://nukerat.com/docs/armory"><strong>军械库</strong></a> ·
  <a href="https://www.youtube.com/watch?v=3dOcPoVXv30&t=4s"><strong>教程</strong></a>
</p>

## 简介

NukeRat 是一个面向高级红队行动的后渗透利用框架，专注于对现代复杂环境进行漏洞利用。

<div align="center">
  <a href=".github/banners/01.png">
    <img
        src=".github/banners/01.png"
        style="width: 87rem; border-radius: 11px;"
        alt="NukeRat"
        title="NukeRat">
  </a>
</div>

## 功能特性

| 项目 | 描述 |
| --- | --- |
| 军械库 | 550+ 个已适配的 BOF 与 .NET 工具 |
| 通信 | 可对接外部平台的自定义 C2（如 Telegram、Discord 等） |
| 运行时规避 | 间接系统调用、栈欺骗、睡眠掩码、AMSI/ETW 补丁等 |
| 注入 | 分配模式：VirtualAlloc、section 和模块践踏（module stomping） |
| LOTL | 集成 240+ 个 Windows 原生二进制的就地取材（LOLBAS） |
| 静态规避 | PE 定制 |
| 植入体 | 跨平台：Windows、Linux、macOS（支持 ARM） |
| Linux | 植入体兼容 Linux BOF |
| AI | 与智能体集成（DeepSeek、本地模型等） |
| 报告 | 已执行命令、IOC 和被攻陷主机 |

## 安装

> [!TIP]
> 我们推荐使用 Kali Linux 运行 NukeRat。

### 默认方式
```bash
git clone https://github.com/nukeratframework/nukerat && cd nukerat && sudo bash install.sh all
```

### Docker
```bash
git clone https://github.com/nukeratframework/nukerat && cd nukerat && sudo bash install/docker/docker.sh all
```

## 教程
如需快速上手，可观看这段 2 分钟的视频教程，其中讲解了如何安装 NukeRat 并创建你的第一个植入体 [https://www.youtube.com/watch?v=3dOcPoVXv30](https://www.youtube.com/watch?v=3dOcPoVXv30)。

*点击下方图片将跳转到视频教程。*

<div align="center">
  <a href="https://www.youtube.com/watch?v=3dOcPoVXv30">
    <img
        src=".github/banners/play.png"
        style="width: 87rem; border-radius: 11px;"
        alt="NukeRat"
        title="NukeRat">
  </a>
</div>

或者，如果你更习惯阅读，也可以查阅文档 [https://nukerat.com/docs/fast-setup](https://nukerat.com/docs/fast-setup)。

## 文档

你可以在 [https://nukerat.com/docs](https://nukerat.com/docs) 阅读完整的 NukeRat 文档。可用语言：

| 语言 | 链接 |
|----------|--------------|
| 英语 | [en-us](https://nukerat.com/docs) |
| 西班牙语 | [es-es](https://nukerat.com/docs?lang=es-es) |
| 韩语 | [ko-kr](https://nukerat.com/docs?lang=ko-kr) |
| 简体中文 | [zh-cn](https://nukerat.com/docs?lang=zh-cn) |
| 俄语 | [ru](https://nukerat.com/docs?lang=ru) |
| 波斯语 | [fa-ir](https://nukerat.com/docs?lang=fa-ir) |
| 日语 | [ja-jp](https://nukerat.com/docs?lang=ja-jp) |


## 图库

<div align="center">
  <a href=".github/banners/02.png">
    <img src=".github/banners/02.png" style="width: 87rem; border-radius: 11px;" alt="NukeRat">
  </a>

  <br/>

  <a href=".github/banners/03.png">
    <img src=".github/banners/03.png" style="width: 87rem; border-radius: 11px;" alt="NukeRat">
  </a>
</div>

### 许可证（GPLv3）

NukeRat 基于 [GPLv3](LICENSE) 许可发布。本仓库中的其他许可证：

- [SGN](server/infra/bin/encoders/sgn/) 基于 MIT（Ege Balcı）
- [Nim crypt utils](implants/linux/stageless/utils/crypt/utils/) 基于 MIT（Eugene Kabanov，改编自 [nimcrypto](https://github.com/cheatfate/nimcrypto)）。
- [LOLBAS reference](server/core/utils/messages/lolbins/reference/LOLBAS/) 基于 GPLv3（上游 LOLBAS 数据集）
