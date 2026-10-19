/**
 * 漁電共生預測驗：接收平台送出的作答紀錄，寫入這份 Google 試算表。
 * 部署：擴充功能 → Apps Script → 貼上本檔 → 部署 → 新增部署作業 → 網頁應用程式
 *       執行身分「我」、存取權「所有人」→ 複製網址貼到 index.html 的 GAS_URL。
 *
 * participants：一人一列，以 session 覆寫（第一輪結束送一次、完成再送一次）
 * trials：一人 12 列（每則貼文一列），只在完成時寫入
 */
const P_COLS = ['received_at','stage','study','session','sid','group','dev','started','finished','time_limit_s',
  'n_fast','n_timeout','mean_conf','n_review','n_changed','screen','ua','raw_json',
  'ssr_reasons','time_limits','n_other'];
const T_COLS = ['session','sid','group','dev','time_limit_s','post_id','correctness','source','img_type','poster_kind','facet',
  'fast_position','fast_verdict','fast_rt_ms','fast_confidence','fast_conf_ms','fast_conf_adjust','fast_img_zoom',
  'rv_position','rv_verdict','rv_reasons','rv_reason_ssr','rv_reason_ai','rv_note','rv_first_click_ms','rv_decision_ms',
  'rv_verdict_changes','rv_chip_toggles','rv_img_zoom','rv_facet_shown','changed','shift',
  'fast_limit_s','rv_other'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const p = sheet_(ss, 'participants', P_COLS);
    const row = Object.assign({}, d, {received_at: new Date(), raw_json: String(d.raw || '').slice(0, 49000)});
    const vals = P_COLS.map(function (k) { return cell_(row[k]); });
    const ids = p.getLastRow() > 1 ? p.getRange(2, 4, p.getLastRow() - 1, 1).getValues() : [];
    let at = -1;
    for (let i = 0; i < ids.length; i++) if (ids[i][0] === d.session) { at = i + 2; break; }
    if (at > 0) p.getRange(at, 1, 1, vals.length).setValues([vals]); else p.appendRow(vals);

    if (d.stage === 'complete' && d.trials && !hasTrials_(ss, d.session)) {
      const t = sheet_(ss, 'trials', T_COLS);
      const rows = d.trials.map(function (r) {
        const x = Object.assign({session: d.session, sid: d.sid, group: d.group, dev: d.dev, time_limit_s: d.time_limit_s}, r);
        return T_COLS.map(function (k) { return cell_(x[k]); });
      });
      t.getRange(t.getLastRow() + 1, 1, rows.length, T_COLS.length).setValues(rows);
    }
    return json_({ok: true});
  } catch (err) {
    return json_({ok: false, error: String(err)});
  } finally {
    lock.releaseLock();
  }
}

/* 用瀏覽器打開部署網址時顯示，用來確認部署成功 */
function doGet() { return json_({ok: true, msg: 'fish12 pretest endpoint'}); }

function sheet_(ss, name, cols) {
  let s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.setFrozenRows(1); }
  /* 新增欄位都接在最後面，舊資料不會錯位；每次寫入時把標題列補齊 */
  s.getRange(1, 1, 1, cols.length).setValues([cols]);
  return s;
}
function hasTrials_(ss, session) {
  const t = ss.getSheetByName('trials');
  if (!t || t.getLastRow() < 2) return false;
  return t.getRange(2, 1, t.getLastRow() - 1, 1).getValues().some(function (r) { return r[0] === session; });
}
function cell_(v) { return (v === null || v === undefined) ? '' : (typeof v === 'object' ? JSON.stringify(v) : v); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
