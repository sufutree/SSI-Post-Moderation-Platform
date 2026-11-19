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

## 第 2 段：貼文資料模型（2026-11-19）
- 新增 `posts.js`（`window.POSTS_CONFIG`，24 篇佔位，欄位與配對規則寫在檔頭）；index.html 刪除舊 POSTS 與 `DEBRIEF` 常數，改由 `ALL_POSTS`→`POSTS`（依 `LIST` 篩出 12 篇）。`BY`、`LIMITS`、truth、debrief 都只用這 12 篇。
- `LIST`：`?list=A／B`，否則隨機 50%；`R.list` 記錄。`LIST_A_HUMAN=[1,2,5,6,9,10]`（見下方「與 prompt 不符」）。
- 貼文 id 慣例：`claim_id*10 + 1（human）／+2（ai）`。
- 移除圖片程式：`mediaHtml`、`openLightbox`／`closeLightbox`、lightbox DOM 與 CSS、modal 附圖、`IMGPOSTS`、`img_zoom`／`facet_shown`／`fast_img_zoom`／`rv_img_zoom`；INOC 練習移除 `imgs`／`imgType`（含 inocB 的圖）。圖片資料夾保留未刪。
- `payload().truth`：`{id, claim_id, source, category, expected, poster_kind}`，payload 的 `list` 來自 `R.list`。
- `trialRows()`：換成 `claim_id, category, expected, list`，移除 `correctness, img_type, facet`。注意 Apps Script 的 T_COLS 仍是舊欄位，新欄位到第 5 段才會有獨立欄。
- dev 對照表與 setup 頁：改顯示 claim／類別／來源。

### 與 prompt 不符、已自行調整
- prompt 寫「LIST_A：claim 1–6 human、7–12 ai」又寫「claim 1–4 accurate、5–8 context、9–12 false」，兩者併用會讓 LIST_A 變成 accurate 全是 human、無 ai（每格不是 2 則）。改為 LIST_A 的 human 版取 claim 1,2,5,6,9,10，LIST_B 相反，驗收的「每格 2 則」成立。若你原本有別的配法請告訴我。

### 待後續處理
- inocB 的解析文字（lead、src）仍寫「文字和圖片都是 AI 生成」，圖片已移除，第 3 段處理。
- 佔位標題含「human/ai」「類別」字樣，只供測試，正式文字替換前不可給受試者。
- INOC／RULEP 仍用 `correctness` 欄位（第 3 段改 category）。

## 第 3 段：處置標準與練習（2026-11-19）
- 新增常數 `CRITERIA`（label／full／short），`VNAME` 由它產生；`critHtml()` 取代 s-brief、s-mid 兩處寫死的標準框（HTML 內是 `.crit-slot`，載入時填入）；第一輪、第二輪按鈕小字用 `CRITERIA.*.short`。舊說明句已全部消失。
- 練習（INOC、RULEP）：每則加 `category`（inocA false／inocC context／inocB accurate；ruleA accurate／ruleB context／ruleC false），刪除手寫的 `tiers`、`rec`、`recNote`，改由 `CAT_EXPECT` 與距離規則統一計算（正解 ✓ 判得好、差一級 △ 接近了、差兩級 ✗ 再想想）。「建議處置：」第一行用 `VNAME`，解析內文未動。
- `prepTruth()` 輸出改為 `{key, category, expected, best}`；練習貼文仍不進 POSTS／BY／truth。
- 待處理：inocB 的 lead 仍寫「文字和圖片都是 AI 生成」；inocB 原本「放行或加註都算最好」現在加註只算 △（符合新規則）；RULEP 的 ruleC 標成 false（重複張貼）只為結構同步，內容未改。

## 第 4 段：第二輪理由流程（2026-11-19）
- 新增 `basis.js`（`window.BASIS_CONFIG`，9 項，code 只在資料中）；index.html 不再載入 reasons.js（檔案保留），並刪除 `DEFAULT_REASON_CFG`、`CFG`、`REASON_MAP`、`AI_REASONS`、`chipLabel`、`visibleCats`、`ssrTag` 等舊理由機制。
- `rvPick`／`rvCheck`／`rvSubmit` 改寫：選處置 → 開放理由（必填，≥10 字，`countChars` 只算字母、數字、中文）→ 達 10 字才出現勾選清單（1–3 項，第 4 項按不下去並提示「最多 3 項」）→ 送出。三種處置都走完整流程；提示文字依處置不同。
- 換處置：保留理由文字、清空勾選；`basis_toggles` 是這一則的累計切換次數（不因換處置歸零）。
- 選項順序：每則貼文重新隨機（`basis_order`），同一則內換處置時順序不變。
- 社團動態的加註提醒 = 受試者寫的開放理由。
- 每則紀錄：`open_reason, open_reason_len, open_first_key_ms, open_done_ms, basis, basis_codes, basis_order, basis_toggles`；已移除 `reasons, chip_toggles, note`、`rv_other`、`n_other`；payload 附 `basis_config`，不再有 `reason_map/ai_reasons/reason_config`。trialRows 對應 `rv_open_*`、`rv_basis*`。
- 措辭比對（basis label vs TIPS 的 q 與 d）：其餘皆無重複詞組；唯一重疊是「受這件事影響的人」與 TIPS「pt」說明文字「有哪些人會被這件事影響？」共用「這件事影響」；與問句「誰會受影響？」只共用「影響」二字。
- 待處理：`ssr=0` 參數與 setup 頁的「SSR 理由」選項已無作用；`ssr_reasons` 欄位仍在 payload；Apps Script 欄位待第 5 段。

## 第 5 段：資料送出（2026-11-19）
- `GAS_URL_DEV`（開發用 Apps Script 網址）取代原正式網址，`GAS_URL = GAS_URL_DEV`；v2 分支的程式碼裡已不含正式網址。
- upload 新增 `list`、`mode` 欄位；其餘送出時機不變（第一輪結束＋完成各一次，同 session 覆寫）。
- 因 Apps Script 是拆欄位存，新增 `gas/Code_v2.gs`（P_COLS、T_COLS 對應 v2 欄位）。**尚未部署，由 Sufu 部署**。
- 新增 `DATA_DICTIONARY_v2.md`。
- 本機模擬（jsdom、攔截 fetch）：鷹架組與對照組各一次，兩次送出的欄位與 P_COLS／T_COLS 完全對得上；未真的送到試算表。
- 注意：dev 試算表若曾用 v1 欄位寫過資料，標題列會被改成新欄位而與舊資料錯位，請用新表或清空後再測。

## 第 6 段：整體測試（2026-11-19，jsdom 模擬，不含真實瀏覽器與手機）
- 部署確認：GET 回 `fish12 v2 endpoint`。
- 四種情況（treatment/control × list A/B，`?dev=1`，sid 為 `v2test-<組>-<清單>`）各完整跑一次，並真的送到 dev 試算表：每次 `fast_done`、`complete` 兩次回應皆 `{"ok":true}`。預期 participants 4 列、trials 48 列（待 Sufu 在試算表核對）。
- 流程皆為：開始→情境→第一輪 12 則→練習 3 則→開始二次審核→第二輪 12 則→事後說明→結束；console 無錯誤；全程 0 張圖；社團動態無數字。
- 第一輪逾時：treatment／A 故意不回應第 3 則（`?t=3`），記為 `timeout` 且流程繼續。
- 第二輪：鷹架組輔助欄標題「判讀前想一想」、對照組「社團版規」；dev 下顯示第一輪處置（含逾時文字），不加 dev 時右側為空。
- 不加 `?dev=1`（treatment/A、control/B 各一，攔截送出）：掃描所有可見畫面，沒有出現 SSR／CX／PT／IN／SK／複雜性／觀點取替／探究／懷疑，也沒有「第一輪：」。dev 模式下出現的 SSR 字樣與「第一輪：」屬研究者標示。
- 未驗：手機 375px 與電腦的實際畫面、真實總花費時間（模擬無法量測）。
