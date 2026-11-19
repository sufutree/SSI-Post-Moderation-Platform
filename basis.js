/* basis.js：第二輪「主要考慮了哪些？」勾選清單（三種處置共用，不分類別、不顯示類別名稱）。
 * id：選項代號；label：受試者看到的文字；code：研究用編碼（只寫在資料裡，受試者畫面不出現）。
 * 每位受試者、每一則貼文的排列順序都重新隨機，並記錄在 basis_order。
 * 措辭規則：label 不可和 index.html 的小撇步（TIPS）問句用相同詞組。
 * 【待 Sufu 審】 */
window.BASIS_CONFIG = [
  { id:'cx',   label:'這件事的好處和代價',       code:'cx' },
  { id:'pt',   label:'受這件事影響的人',         code:'pt' },
  { id:'in',   label:'說法或數字的來源',         code:'in' },
  { id:'sk',   label:'發文者發這則的目的',       code:'sk' },
  { id:'who',  label:'發文者的身分',             code:'label' },
  { id:'sty',  label:'文字的寫法和語氣',         code:'label' },
  { id:'ai',   label:'像不像 AI 做的',           code:'ai' },
  { id:'fact', label:'和我原本知道的事符不符合', code:'fact' },
  { id:'gut',  label:'第一眼的感覺',             code:'gut' }
];
