# CodeGraph

CodeGraph 是一個本地程式碼知識圖譜工具，專為 AI 程式碼助理設計，可減少 94% 的工具呼叫並大幅加速程式碼探索。

## 快速開始

從安裝到實際查詢，5 分鐘內完成設定：

1. **安裝**：`npm install -g @colbymchenry/codegraph`
2. **初始化**：`codegraph init -i && codegraph index`
3. **查詢**：`codegraph query <函式名>`
4. **使用**：[simple-todo 範例](./examples/simple-todo/)跟著做

詳細步驟請參考 [Quick Start 章節](#快速開始simple-todo-範例)。

---

## 範例專案

| 專案 | 說明 |
|------|------|
| [simple-todo](./examples/simple-todo/) | TypeScript Todo 應用，4 個檔案，27 個節點。包含完整的功能示範與使用情境說明。 |

### 為什麼要用 simple-todo？

- **規模適中**：4 個檔案、27 個節點，足够展示 CodeGraph 功能又不會過於複雜
- **涵蓋多元情境**：型別定義、localStorage 封裝、CRUD 邏輯
- **易於理解**：功能性程式碼，無需理解複雜框架

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

## 快速開始（simple-todo 範例）

以 `examples/simple-todo` 為例，從零開始設定 CodeGraph。

### 1. 安裝

```bash
npm install -g @colbymchenry/codegraph
```

### 2. 初始化專案

```bash
cd examples/simple-todo
codegraph init -i        # 初始化，建立 .codegraph/ 目錄
codegraph index          # 建立索引（掃描所有支援的檔案）
```

### 3. 查看索引狀態

```bash
codegraph status
# 輸出：
# Index Statistics:
#   Files:     4
#   Nodes:     27
#   Edges:     40
```

### 4. 查詢符號

```bash
# 查詢函式
codegraph query addTodo
# 結果：找到 addTodo 定義與所有使用位置

# 查詢型別
codegraph query Todo
# 結果：找到 Todo interface 定義與相關檔案
```

### 5. 查看檔案結構

```bash
codegraph files
# 輸出專案的所有檔案及其關係
```

---

## 使用技巧

### 情境一：搜尋函式定義

**問題**：某個函式在哪裡定義？被哪些地方呼叫？

```bash
codegraph query <函式名>
```

### 情境二：建立任務上下文

**問題**：需要修改儲存邏輯，但不知道會影響哪些地方？

在 Claude Code 中召喚 Explore agent：
```
Use codegraph_explore to find all code related to "storage" or "save"
```

### 情境三：追蹤呼叫鏈

**問題**：點擊完成按鈕後發生了什麼？

```bash
codegraph context "toggle todo"
# 會輸出相關的函式呼叫鏈與程式碼片段
```

### 情境四：分析影響範圍

**問題**：修改某個型別會影響哪些檔案？

```bash
codegraph affected <檔案路徑>
```

### 情境五：增量更新

當程式碼變更後，不需要重新索引：

```bash
codegraph sync
# 或設定 hooks 自動同步
```

---

## 最佳實踐

| 技巧 | 說明 |
|------|------|
| **使用 Explore agent** | 複雜探索時透過 Explore agent 呼叫，避免佔用主 session 上下文 |
| **定期 sync** | 新增/刪除檔案後執行 `codegraph sync` 保持索引最新 |
| **自訂排除規則** | 在 `.codegraph/config.json` 中加入 `exclude` 排除大型或無關檔案 |
| **檢視狀態** | 定期執行 `codegraph status` 確認索引健康 |
| **查看節點關係** | 使用 `codegraph query` 查看函式/變數的完整呼叫圖 |

---

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

## 支援的 Agent

CodeGraph 支援以下 AI 程式碼助理：

| Agent | 安裝指令 |
|-------|----------|
| Claude Code | `--target=claude` |
| OpenCode | `--target=opencode` |
| Cursor | `--target=cursor` |
| Codex CLI | `--target=codex` |

## Agent 整合設定

### Claude Code

安裝時會自動在 `~/.claude/CLAUDE.md` 加入以下設定：

> **NEVER call `codegraph_explore` or `codegraph_context` directly in the main session.** 這些工具會回傳大量程式碼，佔據主 session 上下文。請**務必使用 Explore agent** 來探索程式碼。

在召喚 Explore agent 時，建議包含以下提示：
> "Use `codegraph_explore` as your PRIMARY tool — it returns full source code sections from all relevant files in one call."

### OpenCode

```bash
codegraph install --target=opencode --yes
codegraph install --target=auto --yes
codegraph install --target=opencode --location=local --yes
```

### Cursor

```bash
codegraph install --target=cursor --yes
codegraph install --target=auto --yes
codegraph install --target=cursor --location=local --yes
```

### Codex CLI

```bash
codegraph install --target=codex --yes
codegraph install --target=auto --yes
codegraph install --target=codex --location=local --yes
```

### 通用初始化流程

1. 安裝 CodeGraph
2. 執行 `codegraph install --target=<agent> --yes`
3. 在專案執行 `codegraph init -i` 初始化
4. 執行 `codegraph index` 建立索引
5. 重啟 Agent，MCP 工具就會自動載入

## MCP 伺服器

啟動獨立的 MCP 伺服器：

```bash
codegraph serve --mcp
```

此模式適用於需要長時間運行或使用外部 MCP 客戶端的情況。

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

## 更新 CodeGraph

```bash
# 全域更新
npm update -g @colbymchenry/codegraph

# 或重新安裝
npm install -g @colbymchenry/codegraph
```

## 故障排除

### 索引沒有更新

```bash
# 強制重新索引
codegraph sync [path]
```

### MCP 工具未出現

1. 確認已執行 `codegraph install --target=<agent> --yes`
2. 重啟 Agent
3. 確認專案已執行 `codegraph init -i && codegraph index`

### 索引過大或效能問題

在 `.codegraph/config.json` 中調整設定：

```json
{
  "exclude": ["node_modules/**", "dist/**", "*.log"],
  "maxFileSize": 524288
}
```

## 特色功能

- **100% 本地**：所有資料儲存在本地 SQLite 資料庫，不會上傳至外部服務
- **智慧上下文**：單次工具呼叫即可取得 entry points、相關符號與程式碼片段
- **自動更新**：檔案監控使用原生 OS 事件，無需手動設定
- **支援 FTS5**：快速全文搜尋能力