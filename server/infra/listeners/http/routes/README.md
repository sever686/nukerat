# 概览

HTTP 监听器的路由入口。`commands.py` 是监听器路径上的 GET/POST：从模板中取出正文、解密、校验植入体载荷，然后交给 `/logic` 中的原始逻辑。
