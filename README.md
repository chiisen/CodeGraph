# CodeGraph

CodeGraph 是一個本地程式碼知識圖譜工具，專為 AI 程式碼助理設計，可減少 94% 的工具呼叫並大幅加速程式碼探索。

## GitHub

https://github.com/colbymchenry/codegraph

## 安裝方式

```bash
# 快速安裝
npx @colbymchenry/codegraph

# 全域安裝
npm install -g @colbymchenry/codegraph

# 非互動式安裝
codegraph install --yes                              # 自動偵測 agent 並全域安裝
codegraph install --target=cursor,claude --yes       # 指定目標
codegraph install --target=auto --location=local     # 專案本地安裝
```

## 基本用法

```bash
codegraph init -i       # 初始化專案
codegraph index [path]  # 完整索引
codegraph sync [path]   # 增量更新
codegraph status [path] # 查看統計資訊
codegraph serve --mcp   # 啟動 MCP 伺服器
```

## MCP 工具

| 工具 | 功能 |
|------|------|
| `codegraph_search` | 以名稱搜尋符號 |
| `codegraph_context` | 為任務建立程式碼上下文 |
| `codegraph_callers` / `codegraph_callees` | 追蹤呼叫流程 |
| `codegraph_impact` | 分析受影響程式碼 |
| `codegraph_node` | 取得符號詳細資訊 |
| `codegraph_files` | 取得檔案結構 |
| `codegraph_status` | 檢查索引健康狀態 |

## 支援語言

TypeScript、JavaScript、Python、Go、Rust、Java、C#、PHP、Ruby、C、C++、Swift、Kotlin、Dart、Svelte、Vue、Liquid、Pascal/Delphi

## 框架支援

支援 Django、Flask、FastAPI、Express、Laravel、 Rails、Spring、Gin、Axum、ASP.NET、Vapor、React Router、SvelteKit 等框架的路由解析。

## 設定

可在專案根目錄建立 `.codegraph/config.json`：

| 選項 | 說明 | 預設值 |
|------|------|--------|
| `languages` | 要索引的語言 | `[]` (自動偵測) |
| `exclude` | 忽略的 glob 模式 | `["node_modules/**", ...]` |
| `frameworks` | 框架提示 | `[]` |
| `maxFileSize` | 略過大於此大小的檔案 (bytes) | `1048576` |
| `extractDocstrings` | 擷取文件字串 | `true` |
| `trackCallSites` | 追蹤呼叫位置 | `true` |

## Claude Code 整合

安裝時會自動在 `~/.claude/CLAUDE.md` 加入以下設定：

> **NEVER call `codegraph_explore` or `codegraph_context` directly in the main session.** 這些工具會回傳大量程式碼，佔據主 session 上下文。請**務必使用 Explore agent** 來探索程式碼。

在召喚 Explore agent 時，建議包含以下提示：
> "Use `codegraph_explore` as your PRIMARY tool — it returns full source code sections from all relevant files in one call."