# 概览

Electron GUI 的 React 源码。`main.tsx` 负责挂载应用；其余内容都挂在下列文件夹下。

## 目录

- `/api`：团队服务器路由（会话、监听器、植入体等）的类型化 fetch 辅助函数
- `/assets`：打包的字体、通知音效、标志与 SVG 图标集
- `/components`：Canva 外壳以及共享 UI 组件
- `/pages`：由 `app.tsx` 接入的轻量页面入口
