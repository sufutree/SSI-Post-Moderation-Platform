/**
 * 漁電共生 v2：接收平台送出的作答紀錄，寫入這份 Google 試算表。
 * 部署：擴充功能 → Apps Script → 貼上本檔 → 部署 → 管理部署作業 → 編輯 → 新版本（網址不變）
 *       執行身分「我」、存取權「所有人」。
 *
 * participants：一人一列，以 session 覆寫（第一輪結束送一次、完成再送一次）。raw_json 存整包資料
 *   （含 fast、review、prep、truth、basis_config 等），欄位拆不完的都在裡面。
 * trials：一人 12 列（每則貼文一列），只在 stage=complete 時寫入。
 * 新增欄位都接在最後面較安全；本版欄位與 v1 不同，請用新試算表，不要沿用 v1 的表。
 */
const P_COLS = ['received_at','stage','study','session','sid','group','list','mode','dev','started','finished','time_limit_s',
  'n_fast','n_timeout','mean_conf','n_review','n_changed','screen','ua','time_limits','raw_json','n_reloads','assign_persisted','assign_source'];
const T_COLS = ['session','sid','group','list','dev','time_limit_s',
  'post_id','post_code','claim_id','material_code','category','expected','source','poster_kind',
  'fast_position','fast_verdict','fast_rt_ms','fast_confidence','fast_conf_ms','fast_conf_adjust','fast_limit_s',
  'rv_position','rv_verdict','rv_open_reason','rv_open_len','rv_open_first_key_ms','rv_open_done_ms',
  'rv_basis','rv_basis_n','rv_basis_codes','rv_basis_order','rv_basis_toggles',
  'rv_first_click_ms','rv_decision_ms','rv_verdict_changes','changed','shift'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const p = sheet_(ss, 'participants', P_COLS);
    const row = Object.assign({}, d, {received_at: new Date(), raw_json: String(d.raw || '').slice(0, 49000)});
    const vals = P_COLS.map(function (k) { return cell_(row[k]); });
    const sidx = P_COLS.indexOf('session') + 1;
    const ids = p.getLastRow() > 1 ? p.getRange(2, sidx, p.getLastRow() - 1, 1).getValues() : [];
    let at = -1;
    for (let i = 0; i < ids.length; i++) if (ids[i][0] === d.session) { at = i + 2; break; }
    if (at > 0) p.getRange(at, 1, 1, vals.length).setValues([vals]); else p.appendRow(vals);

    if (d.stage === 'complete' && d.trials && !hasTrials_(ss, d.session)) {
      const t = sheet_(ss, 'trials', T_COLS);
      const rows = d.trials.map(function (r) {
        const x = Object.assign({session: d.session, sid: d.sid, group: d.group, list: d.list, dev: d.dev, time_limit_s: d.time_limit_s}, r);
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
function doGet() { return json_({ok: true, msg: 'fish12 v2 endpoint'}); }

function sheet_(ss, name, cols) {
  let s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.setFrozenRows(1); }
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
