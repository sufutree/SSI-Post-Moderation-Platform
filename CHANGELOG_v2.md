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

## 第 7 段：鎖定分派、清理殘留（2026-11-19）

### 改前盤點（重新整理的行為）
- 改前：GROUP、LIST、session 都在頁面載入時決定，重新整理就重抽；R 只寫進 localStorage 從不讀回，所以重新整理＝從頭開始、新 session、可能換組。第一輪結束已送出的 `fast_done` 會留在舊 session，試算表同一個 sid 會出現多列。（有 beforeunload 警告，但擋不住）

### 改後
- 按「開始」輸入 sid 後才抽籤（`applyAssign(assignGroup(), pickList())`），以 `fish12_v2_dev_assign_<sid>` 存 `{group,list,session,assigned_at}`；`POSTS／BY／LIMITS` 改為可就地重建（`applyList()`）。
- 同一個 sid 再開：讀回 group／list／session，網址 `?group=`／`?list=` 不能覆蓋；`dev=1` 例外（不讀已存分派、不擋已完成），另有 dev 專用「清除此編號的分派」按鈕。
- 接續（`resumeFrom`）：從 `fish12_v2_dev_<session>` 讀回 R 與當時步驟，沿用原貼文順序；第一輪正在計時的那一則記 `verdict:'timeout', reason:'reload'` 後顯示下一則；第二輪寫到一半的那一則從頭作答、已完成的不重複；社團動態依紀錄重建；`R.reloads` 記 `{at, step}`；`stage_times` 保留原本進入時間。
- 完成上傳成功後標記 sid 已完成，再開顯示「這個編號已完成作答」。localStorage 不可用時照常抽籤並記 `assign_persisted:false`（此時無法鎖定與接續）。
- 清理：移除 `?ssr=0`、setup 頁「SSR 理由」選項、`SSR_ON`、`R.ssr_reasons`（dev 對照表的「SSR 理由」字樣也移除）；README 同步。
- inocB 解析：改前「這則的文字和圖片**都是 AI 生成的**，但內容是對的…」→ 改後「這則的文字**是 AI 生成的**，但內容是對的…」（其餘不動）。
- 事後說明頁的 AI 清單：本來就是 `POSTS.filter(source==='ai')` 動態產生，而 POSTS 依該受試者的 LIST 建立，確認非寫死。
- 資料：新增 `reloads`、`assign_persisted`、`assigned_at`、fast[].reason；`gas/Code_v2.gs` 的 P_COLS 末端新增 `n_reloads`、`assign_persisted`（需重新部署）。
- 已知限制：第二輪前的練習（prep）中途重新整理會從頭開始；鎖定靠瀏覽器 localStorage，換瀏覽器或裝置同一 sid 會重新抽籤；無痕模式無法鎖定。

## 第 8 段：清單設定集中＋放入 1120 版貼文內容（2026-11-20）
- 清單規則本來就已是「每類 2 human＋2 ai」（第 2 段已自行修正 prompt 的矛盾），本段把設定集中：`posts.js` 新增 `window.LISTS_CONFIG`（來自 JSON 的 `lists`），index.html 刪除 `LIST_A_HUMAN`，`applyList()` 與 `checkConfig()` 都只讀它。
- 載入檢查 `checkConfig()`：兩份清單每個 claim 剛好一次、每類 2 human＋2 ai、24 篇每個 claim×source 剛好一篇、類別與 expected 與設定一致；不符 → `console.error`，`?dev=1` 時頁面頂端紅色警告。已用故意改壞的設定測過會觸發。
- `posts.js` 由 `posts_content_v2_1120.json` 以程式產生（title、body、debrief、poster、ago 與 JSON 逐字相同，24/24 一致）；id 沿用數字 `claim_id*10+1/+2`，JSON 的字串 id 存為 `post_code`；新增 `material_code`、`pending`。
- truth 與 trials 加入 `post_code`、`material_code`；`gas/Code_v2.gs` 的 T_COLS 已新增這兩欄（**需重新部署**）。material_code 不顯示在受試者畫面。
- 待補：P12H（claim 12 人類版，F5）仍是佔位文字，`pending:true`。console 警告；`?dev=1` 頁面頂端警告，且該篇卡片（第一輪、第二輪、練習外的審核卡）顯示「⚠ 待補」。P12H 只出現在 LIST_B。
- 第 7 段的 sid 鎖定與 list 讀回未動；同一 sid 重新整理 list 不變（已測）。

### 第 8 段補：F5 已補上（2026-11-20）
- 內容檔更新後重新產生 posts.js：P12H（人類版）補上原文、`pending:false`；P12A 的 title、body、debrief 也有更新。其餘 22 篇不變。
- 重跑比對：24/24 與 JSON 逐字一致；A、B 清單檢查全部通過；已無待補貼文，console 與 dev 畫面的「待補」警告消失。

## 第 9 段：判斷依據至少選 1 項＋dev 顯示清單與版本（2026-11-20）
- 勾選：題目改「（至少選 1 項）」；刪除 `BASIS_MAX` 與第 4 項按不下去的限制，9 項都可勾；沒勾提示「請至少選 1 項」。新增欄位 `basis_n`（trials：`rv_basis_n`，T_COLS 已加，需重新部署 Apps Script）。改過的位置：index.html（常數、題目、chip 點擊、`rvCheck`、`rvSubmit`、`trialRows`）、gas/Code_v2.gs、DATA_DICTIONARY_v2.md；basis.js、說明頁、練習頁原本就沒有數量描述。
- 診斷（dev 看不出 LIST A／B）：不是佔位內容（第 8 段後已是正式內容）、也不是網址參數被蓋掉（dev 本來就不讀已存分派，`?list=` 有效）、清單規則也正確（A、B 抽到不同的 12 篇）。原因是 dev 模式沒有顯示任何可辨識版本的資訊（list 不顯示、既有的「正確性／撰寫來源標記」只標對錯與人/AI，不標 claim、類別、清單）。
- dev 專屬（不加 `?dev=1` 完全不出現）：頂端資訊列（sid、group、LIST、分派來源、待補篇數）、每張審核卡右上角標籤 `claim N｜human/ai｜類別｜material_code`（human 藍、ai 紫）、「切到 LIST A／B」按鈕（以目前 group＋新 list 重新載入）。
- dev 不再寫入分派紀錄（`saveAssign`、`markFinished` 在 dev 直接略過），避免汙染同 sid 的正式資料。

## 第 10 段：管理員編號決定組別與清單（2026-11-20）
- 開始頁：標題、內文、輸入框標籤「管理員編號」、按鈕「開始值班」照 prompt；沒有放格式範例。角色說明頁（s-brief）未改動。
- 編號規則 `parseCode()`：去前後空白、轉大寫；第 1 碼 S＝treatment／C＝control，第 2 碼 A／B＝list，第 3 碼之後不限；不合格只顯示「編號不正確，請向施測人員確認」。完整編號（大寫）就是 sid。
- 隨機分派已移除（`assignGroup()`、`pickList()` 刪除，不再被呼叫；程式註解註明「已改由管理員編號決定」）；`?group=`、`?list=` 只在 `?dev=1` 有效（資料 `assign_source:'dev_url'`），其餘一律由編號決定（`assign_source:'code'`）。setup 頁的分組選項已移除。
- 第 7 段的鎖定保留：同編號重新整理讀回進度；讀回時檢查存起來的 group／list 是否與編號一致，不一致以編號為準並 `console.error`。
- 資料：新增 `assign_source`（participants 欄位、raw_json）；`gas/Code_v2.gs` 的 P_COLS 末端新增（需重新部署）；DATA_DICTIONARY 已更新（assign_persisted 改述為「進度是否存進瀏覽器」）。

### 第 10 段修訂（2026-11-20，依更新後的 prompt）
- 開始頁改為：標題「「台灣綠能生活討論區」管理後台」＋三段內文（投稿增加／今晚有 12 則貼文、約 15 分鐘／請輸入管理員編號登入後台），輸入框「管理員編號」，按鈕「登入」；錯誤提示改為「管理員編號不正確，請再確認一次」。角色說明頁（s-brief）未動。
- 受試者畫面用語盤點（待 Sufu 確認後再改）：仍含「研究人員」的有兩處——已完成編號的提示（`btnStart` 內）與上傳失敗訊息（`upDone`）。其餘「研究／施測／受試者」只出現在程式註解、研究者頁（?setup=1、?dev=1）與事後說明頁（例外）。

## 第 11 段：更新 AI 版貼文為 1124 版（2026-11-24）
- posts.js：P01A～P12A 的 title、body 換成 `posts_content_v2_1124.json`（逐字，P08A 條列換行保留）；每篇 AI 加 `generation`（model、date、prompt、version_picked、of，只給研究者對照，不顯示在受試者畫面）；檔頭補註 AI 版生成說明。human 版、debrief、poster、claim_id、清單規則未動。
- 匯出：raw_json 的 truth 每則多 `version_picked`（AI 版為 1–3，人類版 null）；DATA_DICTIONARY_v2.md 補欄位與內容版本 `fish12_v2_content_1124`。trials 表欄位不變，不需重新部署 Apps Script。

## 第 12 段：鷹架與對照組的練習、輔助欄內容更新（scaffold_v2_1124，2026-11-24）
- 文字一律照《鷹架內容草稿_v2_1124》：鷹架組四個問句（TIPS，標題「判讀前想一想」，key 維持 cx／pt／in／sk）、開場卡、三則練習解析（含「如果處理錯」）、結語卡；對照組四條版規（RULES，標題「社團版規」，條文不變、點開說明改為問句）、開場卡、三則說明、結語卡。
- 練習順序：鷹架組 inocA→inocC→inocB；對照組 ruleC→ruleB→ruleA。回饋層級改用明確對照表 `TIER_BY_CATEGORY`（不再用「差幾級」推算），標籤「✓ 判得好／△ 可以，但還能更好／✗ 再想想」。
- 練習③（inocB）：頁面本來就沒引用圖片（`ai_images/inoc_902.png` 檔案保留、未被引用）；已移除「AI 生成」說明，dev 模式下練習貼文也不再顯示「AI 撰寫」標籤；貼文標題與內文不變。
- 解析裡的粗體問句與第二輪問句一字不差，載入時由 `checkPrepText()` 檢查，不一致 console 報錯。
- 紀錄：R.prep.order 為新順序；prep_truth 增加 tiers；新增 `scaffold_version`（`scaffold_v2_1124`，participants 欄位與 raw_json）。`gas/Code_v2.gs` 的 P_COLS 末端加 scaffold_version，需重新部署。

### 第 12 段修訂（草稿改版後，2026-11-24 15:07）
- 鷹架組三則練習貼文全部換新（議題改為農地與山坡地光電，不涉及漁電共生）：① 香蕉變貴（王麗華，個人，無標題，退回）、② 光電上山頭（淺山守護協會，NGO 粉絲專頁，加註）、③ 淺山光電場拍到石虎（環境新聞台，媒體粉絲專頁，無標題，放行）。key 沿用 inocA／inocC／inocB，紀錄格式不變；三則都不放圖、無 AI 字樣。春節拔插頭、夏月電價、用電尖峰不再使用（舊內容可從 git 歷史查回）。
- 解析換成草稿 2.4、2.5、2.5b；沒有標題的貼文不再畫粗體標題列。發文時間 ago 草稿沒有指定，沿用原本的「1 天」「6 小時」「3 小時」。
- 其餘（問句、開場卡、結語卡、回饋規則、對照組）與草稿一致，未變。
