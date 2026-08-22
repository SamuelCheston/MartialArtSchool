# MartialArtSchool Framework

`MartialArtSchool` 是一个参照 `Silo40` 演化出来的新游戏框架，当前采用 **Wails + Go + React + Vite + SQLite** 组合。

这一版的目标不是简单复制一份旧项目，而是先把“能反复换题材的骨架”立住：

- Go 后端继续作为游戏状态、事件队列与内容系统的权威来源
- React 前端负责主题表现、交互编排和可替换的题材配置
- `frontend/src/gameTheme.ts` 负责收口题材层文案、角色显示名与开局选项
- 当前首个题材实例为 `MartialArtSchool`

## 当前范围

- 已完成工程级迁移：模块名、应用名、数据库名、入口配置
- 已建立前端主题层：分院抽签、武校文案、堂口显示名、开局特质
- 仍保留一部分 `Silo40` 时代的底层领域命名作为兼容层，后续可以继续抽象

## 目录重点

- `internal/config/game_theme.go`：应用级主题配置
- `frontend/src/gameTheme.ts`：前端题材配置
- `internal/engine/`：事件驱动核心与机制系统
- `internal/service/`：游戏会话、事件队列、内容加载
- `events/`：文件驱动内容事件

## 启动

1. 安装 [Wails CLI](https://wails.io/docs/gettingstarted/installation)
2. 安装 Go 与 Node.js
3. 在 `frontend/` 安装依赖
4. 运行：

```bash
wails dev
```

## 下一步建议

- 把后端职业、剧情事件和资源命名继续从 `Silo40` 语义抽到真正的题材无关层
- 为 `MartialArtSchool` 补一套独立的事件内容与职业行动
- 将主题配置继续下沉到后端初始化与内容装配阶段
