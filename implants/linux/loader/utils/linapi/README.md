# 概览

Loader 使用的 Linux libc 导入，避免到处散落原始 `importc` 块。tick 计数、sleep、memfd 分段以及下一阶段的 `dlopen` 都在这里。
