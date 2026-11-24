# DATA_DICTIONARY_v2

資料送出兩次：第一輪結束（`stage=fast_done`）、完成（`stage=complete`），同一 session 覆寫。
試算表兩張表：`participants`（一人一列）、`trials`（一人 12 列，只在 complete 寫入）。欄位定義見 `gas/Code_v2.gs`。

## participants 表
| 欄位 | 型別 | 意義 | 來源步驟 |
|---|---|---|---|
| received_at | 時間 | 伺服器收到時間 | Apps Script |
| stage | 文字 | fast_done／complete | go('mid')、go('end') |
| study | 文字 | 研究代號 fish12_v2_dev | 常數 STUDY |
| session | 文字 | 本次作答唯一碼（覆寫依據） | 載入頁面 |
| sid | 文字 | 管理員編號（完整編號，轉大寫） | 開始頁輸入 |
| group | 文字 | treatment（鷹架）／control | 管理員編號第 1 碼（S／C）；已不再隨機分派 |
| list | 文字 | A／B（貼文清單） | 管理員編號第 2 碼（A／B）；已不再隨機分派 |
| assign_source | 文字 | 分派來源：code＝由管理員編號決定；dev_url＝研究者模式用網址覆蓋（只會出現在 dev=1 的測試資料） | 按「開始值班」 |
| mode | 文字 | 網址 ?mode=（pilot 或空白） | 網址參數 |
| dev | 布林 | 是否研究者模式 | ?dev=1 |
| started／finished | ISO 時間 | 開始、完成時間 | 開始頁／結束頁 |
| time_limit_s | 整數 | 第一輪預設秒數 | 常數／?t= |
| n_fast | 整數 | 第一輪紀錄數（12） | 第一輪 |
| n_timeout | 整數 | 第一輪逾時則數 | 第一輪 |
| mean_conf | 數字 | 第一輪平均信心（1–5，不含逾時） | 第一輪 |
| n_review | 整數 | 第二輪紀錄數 | 第二輪 |
| n_changed | 整數 | 第二輪改變處置的則數 | 第二輪 |
| screen／ua | 文字 | 螢幕尺寸、瀏覽器 | 載入頁面 |
| time_limits | 文字 | 每則秒數 `id:秒,…` | 第一輪設定 |
| raw_json | JSON 文字 | 整包資料（上限 49000 字），結構見下表 | 全流程 |
| n_reloads | 整數 | 中途重新整理的次數（`raw_json.reloads` 的長度） | 接續時 |
| assign_persisted | 布林 | 進度是否成功存在瀏覽器（false＝儲存功能被擋，無法重新整理後接續；組別與清單不受影響，因為由編號決定） | 按「開始值班」 |

## raw_json 結構
| 鍵 | 內容 | 來源 |
|---|---|---|
| study, session, sid, group, list, started, finished, device{w,h,ua} | 同上 | 載入／開始 |
| assigned_at | 分派時間（ISO） | 按「開始值班」 |
| assign_source | 同上 | 按「開始值班」 |
| assign_persisted | 進度是否存進瀏覽器 | 按「開始值班」 |
| reloads[] | 重新整理事件 `{at, step}`（step＝重新整理當時所在步驟） | 接續時 |
| stage_times | 各步驟（brief, fast, mid, review, debrief, end）開始時間 | go() |
| fast_time_limit_ms, fast_time_limits | 第一輪限時（毫秒、每則） | 第一輪 |
| fast_order, review_order | 兩輪貼文呈現順序（post id） | 兩輪 |
| fast[] | 第一輪每則：id, position, shown_at, limit_ms, verdict（pass/warn/back/timeout）, rt_ms, confidence, conf_ms, conf_adjust；重新整理時正在計時的那一則另有 reason:'reload'（verdict=timeout） | 第一輪 |
| prep | 第二輪前練習：kind（inoc/rules）, order, items[{key, shown_at, verdict, tier, rt_ms, read_ms}], intro_ms, outro_ms | mid |
| review[] | 第二輪每則，欄位見下方 | 第二輪 |
| community | `{released:[{id}]}` 第一輪放行紀錄（無數字） | 第一輪 |
| basis_config | basis.js 勾選清單（id, label, code） | 常數 |
| prep_truth | 練習正解 `{key, category, expected, best}` | 常數 |
| truth | 該受試者 12 則的 `{id, post_code, claim_id, material_code, source, category, expected, poster_kind, version_picked}`（post_code 如 P01H、material_code 如 A4，只供研究者對照；`version_picked`＝AI 版從 3 個生成版本中選了第幾版，人類版為 null；內容版本 `fish12_v2_content_1124`：human 版沿用 1120 版，AI 版為 2026-11-24 由 Claude Sonnet 5.5 依要點卡生成，模型看不到人類版）；清單見頂層 `list` | posts.js＋list |

### review[] 每則欄位
id, position, shown_at, first_click_ms（第一次點處置）, verdict_changes[{v,ms}]（處置切換）, verdict（最終處置）,
open_reason（開放理由）, open_reason_len（字數，不含空白標點）, open_first_key_ms（第一次輸入）, open_done_ms（達 10 字）,
basis（勾選 id 陣列；勾選數量不設上限，至少 1 項）, basis_n（勾選數量）, basis_codes（對應 code）, basis_order（該則顯示順序）, basis_toggles（勾選切換次數，換處置不歸零）,
decision_ms（從顯示到送出）, aid_kind（ssr_tips／rules）, aid_events[{key,action,ms}]（小撇步或版規開合）,
aid_open_count, aid_opened_keys, stage1_verdict, stage1_confidence, held（最終非放行）, changed（與第一輪不同；第一輪逾時為 null）,
shift（嚴格度變化：放行0／加註1／退回2，第二輪減第一輪）。時間欄位皆為從該則顯示起算的毫秒。

## trials 表（一人 12 列）
| 欄位 | 意義 |
|---|---|
| session, sid, group, list, dev, time_limit_s | 同 participants |
| post_id | 貼文 id（claim_id*10+1 人類／+2 AI） |
| post_code | 內容檔編號（P01H、P01A…） |
| claim_id | 說法編號 1–12 |
| material_code | 素材編號（A4、F5…），只供研究者對照 |
| category | accurate／context／false |
| expected | 正解處置 pass／warn／back |
| source | human／ai |
| poster_kind | page／person |
| fast_position, fast_verdict, fast_rt_ms, fast_confidence, fast_conf_ms, fast_conf_adjust, fast_limit_s | 第一輪（逾時時 verdict=timeout、其餘空白） |
| rv_position, rv_verdict | 第二輪順位、最終處置 |
| rv_open_reason, rv_open_len, rv_open_first_key_ms, rv_open_done_ms | 開放理由與時間 |
| rv_basis, rv_basis_codes, rv_basis_order | 勾選 id／code／顯示順序（以 `\|` 分隔）；勾選數量不設上限，至少 1 項 |
| rv_basis_n | 勾選數量 |
| rv_basis_toggles | 勾選切換次數 |
| rv_first_click_ms, rv_decision_ms, rv_verdict_changes | 第二輪首次點擊、決策時間、處置切換次數 |
| changed, shift | 與第一輪的差異（見上） |
