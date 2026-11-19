usage = """用法：
    server <命令> ...

命令
    start                       启动服务端

    config list                 列出服务端配置
    config set <key> <value>    设置服务端配置
    config reset <key>          将配置项重置为默认值
    config load <file>          从文件加载服务端配置
    config create-tls           创建自签名证书并启用 TLS

    key list                    列出操作员密钥
    key add <name>              创建操作员密钥
    key rem <name>              移除操作员密钥

    venv list                   列出已安装的 Python 包
    venv install <package>      安装 Python 包
    venv uninstall <package>    卸载 Python 包

    db usage                    显示数据库信息
    db export <path>            将数据库导出到文件
    db import <file>            从文件导入数据库
"""
