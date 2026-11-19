# CHANGELOG_v2

## 第 0 段：環境與盤點（2026-11-19，未改任何功能）

### 環境
- 來源：本機 `學習html/fish12-pretest`（main，乾淨，與 origin/main 同步，最新 commit 046f73a）
- 新資料夾：`學習html/fish12-v2`（由上者 clone，origin 指向 https://github.com/sufutree/SSI-Post-Moderation-Platform.git）
- 分支：`v2-redesign`（尚未 push，Preview 網址尚未確認）
- 無 vercel.json；README 說明 push 到 main 會自動更新 ssiplatform.vercel.app

### 3a 檔案清單
| 檔案 | 用途 |
|---|---|
| index.html（1724 行） | 整個平台：CSS、HTML 各 section（s-start/brief/fast/mid/review/end，另有 setup）、全部 JS |
| reasons.js（278 行） | window.REASON_CONFIG：第二輪加註／退回理由清單 |
| apps-script/Code.gs | Google Apps Script 接收端 |
| images_posts/、images_commons/、ai_images/ | 貼文與練習用圖片 |
| README.md、.nojekyll、.gitignore | 說明、GitHub Pages 設定 |

### 3b 名稱位置（皆在 index.html）
- GAS_URL 504、FAST_SEC=10 505、STUDY='fish12_pretest_v1' 506、POSTS 510、DEBRIEF 579（有定義，但流程沒有 debrief 步驟，STEPS 未包含）
- CFG（理由設定，讀 REASON_CONFIG）866
- BY 882、IMGPOSTS 883、params 884、DEV 885
- GROUP 894：`?group=treatment` 才是鷹架組，其餘（含沒帶參數）一律 control
- SSR_ON 896（?ssr=0）、T_SEC 899（?t=）、LIMITS 901（?tp=）
- 社團動態：COMM 928、addMembers 937、commStart 942、releasePost 959、applyFinal 972、commTick 983、fitemHtml 996、renderFeedItem 1005
- STEPS 1081 = start, brief, fast, mid, review, end；go() 1085（進 mid 送 fast_done、進 end 送 complete）
- 第一輪：fsStart 1133、fsRender 1140、fsTimeout 1180、fsDecide 1186、fastOf 1227
- 第二輪前練習：TIPS 1232、RULES 1238、INOC 1246、RULEP 1275、aidList 1295、aidBoxHtml 1296、renderPrep 1332
- 第二輪：rvStart 1403、prevRoundText 1410、rvRender 1415、rvPick 1453、rvCheck 1494、rvSubmit 1507
- 資料：payload 1535、trialRows 1548、upload 1567（fetch POST，失敗重試 3 次）、upDone 1600、renderEnd 1622
- 研究者頁：showSetup（?setup=1）、devGroup/devJump 工具列（?dev=1）

### 3c Apps Script
- 在 repo：`apps-script/Code.gs`
- **拆欄位存**，不是整包一格：participants 表（P_COLS，一人一列，以 session 覆寫，另有 raw_json 欄存整包）、trials 表（T_COLS，一人 12 列，只在 stage=complete 時寫入）。
- 新增欄位只會進 raw_json，不會出現在獨立欄位，除非修改 P_COLS／T_COLS（→ 第 5 段需要提供 Code_v2.gs）。
- raw_json 上限 49000 字，第 4 段加入開放理由後要留意是否超過。

### 3d 網址參數
| 參數 | 作用 |
|---|---|
| dev=1 | 研究者模式（組別切換、跳步工具列），資料標記 dev=true |
| group=treatment | 鷹架組；其餘一律對照組 |
| ssr=0 | 理由清單只留非 SSR 理由＋其他 |
| t=秒數 | 第一輪每則秒數（3–120，預設 10） |
| tp=id:秒,… | 個別貼文秒數 |
| sid= | 預填受試者編號 |
| setup=1 | 研究者設定頁（滑桿產生網址） |

### 與 prompt 假設不符之處（供第 1 段以後注意）
1. 現況沒有 `?mode=pilot`；預設就是全 control（第 1 段第 4 點要改成 60:40，pilot 另設）。
2. 現況沒有 debrief 步驟與 s-debrief；DEBRIEF 常數存在。
3. GAS_URL 目前是單一正式網址（硬寫在 504 行），第 5 段 GAS_URL_DEV 要在這裡改。
4. 沒有 ?list 參數與 posts.js（POSTS 直接寫在 index.html）。

## 第 1 段：四個獨立問題（2026-11-19）
1. 移除放行獎勵：`commStart`／`releasePost`／`commStop` 改寫，刪除 `addMembers`、`commTick` 與成員數雜訊計時；社團動態只顯示標題與管理員提醒，不再有按讚／留言／分享；`go()` 內 `showStats=false` 永遠隱藏 statsBox／2／3；s-brief 該句已刪。R.community 只剩 `released:[{id}]`；`members_at_decision`、`likes_at_decision`、`members_at_submit`、`likes_at_submit` 欄位已移除。
2. `rvRender` 的 `.prevround` 只在 `?dev=1` 顯示 `prevRoundText()`。
3. 新增 `debrief` 步驟（STEPS、`#s-debrief`、`renderDebrief()`）；第二輪最後一則後進 debrief，按「完成」才 `go('end')`（送出時機不變）。
4. 分組：`assignGroup()`，指定 > `?mode=pilot`（全 control）> 隨機 40% treatment；`STUDY='fish12_v2_dev'`。

### 未處理、供後續段落注意
- `renderFeedItem` 的「非新增」分支現在只更新時間文字，且沒有人呼叫；CSS 還留著 `.fc`、`.fcnt`、`.gstat` 樣式（無害）。
- 開發用 `devJump` 的假資料仍含 `img_zoom`、`chip_toggles` 等舊欄位（第 2、4 段處理）。
- 事後說明的 AI 清單用現有 `source==='ai'`（目前含 AI 圖的貼文也算），第 2 段改資料模型後需再核對。
- 受試者畫面的 debrief 頁會列出貼文標題，標題是否含研究用語待第 2 段佔位文字之後檢查。
- 受試者分組是每次載入重新隨機（重新整理會換組），目前沒有鎖定。
