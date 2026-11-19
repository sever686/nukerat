# 为 AI 智能体提供的项目背景说明

## 关于 AGENTS.md
AGENTS.md 用于指导参与 NukeRat 的 AI 智能体并为其提供上下文。它汇集了理解本项目及其结构所需的信息。

## 什么是 NukeRat？
NukeRat 是一个面向红队行动的后渗透利用框架，可提供更强的灵活性与定制能力，以适应现代复杂环境。

## 功能特性

### 军械库

一个 BOF 与 .NET 工具库，每个工具都已针对 NukeRat 适配。截至 2026-11-05，其中包含 550+ 个工具。这些工具默认不随项目提供。可在 NukeRat 客户端的 `terminal` 标签页中用 `armory install <utility>` 安装，或用 `armory install all` 安装全部可用工具。

### 通信

NukeRat 支持四种通信类型：

- HTTP（外部）
- TCP（中继/内部）
- SMB（中继/内部）
- 自定义 C2（外部）

对于与 Telegram、Discord 等外部平台绑定的通道，操作员使用自定义 C2，在 NukeRat 内部也称为自定义通道。自定义通道还可覆盖 DNS、DoH 等更特殊的传输方式。

### 运行时规避

运行时规避是 NukeRat 的核心重点，包括：
- 间接系统调用
- 栈欺骗
- 睡眠掩码（Ekko 与 Zilean）
- AMSI/ETW 补丁
- 自定义注入（VirtualAlloc、section 和模块践踏）
- 内联执行
- 动态库加载
- 运行时 PE 头修补

### 静态规避

静态规避主要取决于植入体的定制程度。具体技术包括：
- 字符串加密（XOR 与 RC4）
- 自定义垃圾代码
- PE 头操作

## 兼容性

| 项目 | 平台 |
| --- | --- |
| 植入体 | Windows、Linux、macOS（支持 ARM） |
| 服务端 | Linux |
| UI 客户端 | Windows、Linux、macOS |

## Linux 与 macOS 植入体

Linux 与 macOS 植入体并非主要重点，但已得到支持。这包括通过前言代码定制植入体、在 Linux 上执行 BOF，以及用于静态规避的字符串加密。

## 安装

### Linux

克隆仓库并执行完整安装（客户端与服务端）。
```bash
git clone https://github.com/nukeratframework/nukerat && cd nukerat && sudo bash install.sh all
```

### Windows

安装 NukeRat 客户端。Windows 仅支持客户端。
```bash
git clone https://github.com/nukeratframework/nukerat
cd nukerat/install
windows.bat client
```

### macOS

安装 NukeRat 客户端。macOS 仅支持客户端。
```bash
git clone https://github.com/nukeratframework/nukerat && cd nukerat/install && sudo bash macos.sh client
```

## 快速搭建

从安装到第一个植入体的快速指南（Linux 服务端）。

### 1) 安装服务端

克隆仓库并运行安装脚本。

```bash
git clone https://github.com/nukeratframework/nukerat && cd nukerat && sudo bash install.sh
```

### 2) 创建操作员密钥

服务端需要操作员密钥。在仓库根目录执行：

```bash
./nukerat.py server key add test
```

输出大致如下：

```text
test:z6MIe3MbZQL57Hx3fOthGZJ:oxcWICLu9Tnu7GyvwDiwVCRoER4ybKv...

Operator created successfully: test
```

复制生成的密钥，以便粘贴到客户端中。

### 3) 启动服务端

在 `0.0.0.0:9000`（默认）上启动服务端。

```bash
./nukerat.py server start
```

### 4) 打开客户端

```bash
./nukerat.py client start
```

### 5) 配置服务端

在顶栏依次进入 **NukeRat** > **Servers** > **Add**。粘贴操作员密钥，设置端口 `9000`（默认）与服务端 IP，然后点击 **Auth**。

### 6) 配置监听器

这是植入体用于通信的端口。依次进入 **NukeRat** > **Listeners** > **Add**，然后：

- 填写一个用于识别的名称
- 在 **TYPE** 字段中选择 `Channel`
- 通道字段保留 `http`
- 选择你之前创建的服务端
- 设置一个与服务端端口不同的端口
- 点击 **Create**

### 7) 构建植入体

依次进入 **NukeRat** > **Implants** > **Add**，然后：

- 在 **COMPILE SERVER** 中选择你之前创建的服务端
- 选择目标操作系统
- 点击左侧的 **Command and control**，将 C2 指向你创建的监听器，例如 `http://192.168.1.100:9000`
- 执行

### 8) 运行植入体

在目标机器上运行植入体。配置正确时，会出现一个新会话。若要交互，请在 **Tabs** > **Terminal** 下打开终端，并在标签名旁的 **Host** 下拉框中选择该会话。

## NukeRat 术语表

- `server`：Linux 团队服务器。默认端口（`9000`）用于客户端认证，它不是植入体的回连端口。
- `NukeRat client`：操作员 UI（Windows、Linux、macOS）。通过操作员密钥与服务端通信。
- `operator key`：形如 `name:id:secret` 的凭据。用于客户端向服务端认证，而不是植入体。
- `listener`：植入体回连端点（HTTP、SMB、TCP 或自定义）。使用与服务端端口不同的端口。
- `compile server`：在 **COMPILE SERVER** 下选择用于构建植入体的服务端。它不是 C2 监听器。
- `implant`：目标主机上的二进制文件（信标）。格式：`exe`、`dll`、`shellcode`（Windows）、`elf`/`so`（Linux）、`app`（macOS）。
- `stageless`：内置 C2 的完整植入体。协议：HTTP、HTTPS、SMB、TCP、自定义。
- `loader`：从 stage URL 下载植入体的分段加载器。协议：HTTP 和自定义。
- `session`：活跃的植入体回连。终端的 **Host** 下拉框选择的就是它。
- `preface code`：编译时注入到 `main` 之前的代码。植入体的定制点，包括垃圾代码。
- `armory`：为 NukeRat 适配的 BOF 与 .NET 程序集。不包含在安装包中，通过 `armory install` 添加。
- `channel`：植入体到服务端的外部传输（HTTP 或自定义 C2）。
- `custom channel`：由操作员实现的通道。覆盖外部平台（Telegram、Discord）以及 DNS、DoH 等传输方式，也称为自定义 C2。
- `relay`：植入体之间通过 TCP 或 SMB 进行的内部横向转发。它不能替代外部通道。
- `sleep mask`：植入体在睡眠期间的内存混淆。
- `lolbin`：通过 LOLBAS 集成执行 Windows 原生二进制（`lolbin`、`lol-*`）。不属于军械库。
