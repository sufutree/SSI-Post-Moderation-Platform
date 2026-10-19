# 漁電共生社團審核：預測驗版

由 `ssi互動行為模擬/漁電共生_社團審核平台.html`（兩輪快思慢想版）複製而來，**只保留兩輪審核，沒有後測**（分類、回顧、問卷、除錯說明都拿掉了）。

流程：開始 → 情境 → 第一輪（限時＋信心滑桿）→ 中場 →（鷹架組前置引導）→ 二次審核 → 完成並自動上傳

## 網址參數

| 參數 | 作用 | 例 |
|---|---|---|
| `t` | 第一輪每則秒數（3–120），不填用 `index.html` 裡的 `FAST_SEC`（預設 10） | `?t=15` |
| `sid` | 預先填好受試者編號 | `?sid=A01` |
| `group` | 指定分組 `treatment`／`control`，不填就隨機 | `?group=control` |
| `dev` | 研究者模式（可跳關、看正確性標記）；上傳的資料 `dev` 欄為 TRUE | `?dev=1` |

組合起來：`https://sufutree.github.io/SSI-Post-Moderation-Platform/?t=12&sid=A01`

## 一、設定 Google 試算表（Apps Script）

1. 新建一份 Google 試算表 → 擴充功能 → Apps Script
2. 把 `apps-script/Code.gs` 的內容整份貼上，存檔
3. 部署 → 新增部署作業 → 類型選「網頁應用程式」
   - 執行身分：**我**
   - 誰可以存取：**所有人**
4. 授權後複製「網頁應用程式網址」（`https://script.google.com/macros/s/.../exec`）
5. 貼到 `index.html` 的 `const GAS_URL = '...'`
6. 用瀏覽器打開那個網址，看到 `{"ok":true,...}` 就代表部署成功

之後如果改了 `Code.gs`，要「管理部署作業 → 編輯 → 版本選『新版本』」，網址才會沿用。

試算表會自動建立兩個工作表：

- **participants**：一人一列。第一輪結束先寫一次（`stage = fast_done`），完成時覆寫成 `complete`。`stage` 停在 `fast_done` 的就是中途離開的人。`raw_json` 是完整原始紀錄。
- **trials**：一人 12 列（每則貼文一列，含第一輪處置／秒數／信心、第二輪處置／理由／SSR 面向、`changed`、`shift`），可以直接拿去分析。

## 二、放上 GitHub Pages

1. 在 GitHub 建一個新的 **Public** 儲存庫（本專案：`sufutree/SSI-Post-Moderation-Platform`），不要勾選建立 README
2. 在這個資料夾執行：
   ```
   git remote add origin https://github.com/sufutree/SSI-Post-Moderation-Platform.git
   git push -u origin main
   ```
3. 儲存庫 → Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`／`/(root)` → Save
4. 約一分鐘後網址會出現在同一頁

## 注意

- 修改提醒／退回理由：在原專案用「理由編輯器.html」改好後，把產生的 `理由設定.js` 複製過來，改名成 `reasons.js`。
- 受試者若重新整理頁面會從頭開始（離開前瀏覽器會跳出提醒）；同一台電腦的作答也會備份在 localStorage。
- 上傳失敗時，完成頁會出現「重新送出／下載作答紀錄」按鈕當備援。
- 公開的 GitHub Pages 原始碼看得到每則貼文的正確答案，施測時不要讓受試者打開開發者工具。
