# Simple Todo - CodeGraph 示範專案

這是一個簡單的 Todo 應用程式，用來展示 CodeGraph 的用途。

## 專案結構

```
src/
├── types.ts    # 型別定義
├── storage.ts  # localStorage 封裝
└── todo.ts     # 核心邏輯
```

## 功能

- 新增 todo
- 切換完成狀態
- 刪除 todo
- 清除已完成項目
- 依狀態/關鍵字篩選

## CodeGraph 示範情境

### 情境一：搜尋函式

**問題**：哪些函式可以新增 todo？

```
codegraph_search("addTodo")
```

會回傳：`addTodo` 的定義位置與呼叫位置

### 情境二：追蹤呼叫鏈

**問題**：點擊完成鈕後發生了什麼？

```
codegraph_callers("toggleTodo")
```

會回傳：所有呼叫 `toggleTodo` 的位置

### 情境三：建立上下文

**問題**：我需要修改儲存邏輯，會影響哪些地方？

```
codegraph_context("storage")
```

會回傳：`saveTodos`、`loadTodos`、`clearStorage` 的相關程式碼

### 情境四：分析影響範圍

**問題**：修改 `Todo` 型別會影響哪些檔案？

```
codegraph_impact("types.ts")
```

會回傳：所有使用 `Todo` 型別的檔案

## 使用方式

### 1. 安裝 CodeGraph

```bash
npm install -g @colbymchenry/codegraph
```

### 2. 初始化並索引

```bash
codegraph install --target=claude --yes
codegraph init -i
codegraph index
```

### 3. 在 Claude Code 中提問

```
在這個專案中，"getTodos" 函式支援哪些篩選方式？
```

CodeGraph 會直接回傳相關程式碼，無需多次檔案搜尋。