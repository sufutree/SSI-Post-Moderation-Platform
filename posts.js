/* posts.js：24 篇貼文（12 個說法 × 人類版／AI 版）＋清單設定。內容來源：posts_content_v2_1124.json（fish12_v2_content_1124；human 版沿用 1120 版）。
 * title、body、debrief 為定稿文字，請勿用程式改寫（body 的 \n 在畫面上顯示為換行）。
 * AI 版：Claude Sonnet 5.5 於 2026-11-24 依要點卡生成（模型看不到人類版），每則 3 版擇 1。
 *
 * 欄位：
 *   id            貼文編號（數字，程式用）。慣例：claim_id*10 + 1（human）／ +2（ai）
 *   post_code     原始內容檔的編號（如 P01H），只供研究者對照
 *   claim_id      說法編號 1–12；claim_id 相同的兩篇互為配對（同一說法的人類版與 AI 版）
 *   material_code 素材編號（如 A4、F5），只供研究者對照，不顯示在受試者畫面
 *   source        撰寫來源：'human'｜'ai'
 *   category      accurate 完全沒問題｜context 需補充脈絡｜false 有錯誤訊息（claim 對應見 LISTS_CONFIG.claim_category）
 *   expected      正解：accurate→pass、context→warn、false→back
 *   poster        {name, kind:'page'|'person', cat, color}
 *   ago           發文時間顯示文字
 *   title/body    標題與內文（不使用圖片）
 *   debrief       事後說明頁顯示的文字（accurate 為空白）
 *   generation    只有 ai 版有：{model,date,prompt,version_picked,of}，只供研究者對照，不顯示在受試者畫面
 *   pending       true＝原文尚未補上，仍是佔位文字，不可正式施測
 *
 * LISTS_CONFIG：兩份清單的唯一設定來源。index.html 只讀這裡，載入時會檢查：
 *   每份清單每個 claim 剛好出現一次；每個類別剛好 2 則 human、2 則 ai。
 */
window.LISTS_CONFIG = {
  "LIST_A_human_claims": [
    1,
    2,
    5,
    6,
    9,
    10
  ],
  "LIST_A_ai_claims": [
    3,
    4,
    7,
    8,
    11,
    12
  ],
  "LIST_B_human_claims": [
    3,
    4,
    7,
    8,
    11,
    12
  ],
  "LIST_B_ai_claims": [
    1,
    2,
    5,
    6,
    9,
    10
  ],
  "claim_category": {
    "accurate": [
      1,
      2,
      3,
      4
    ],
    "context": [
      5,
      6,
      7,
      8
    ],
    "false": [
      9,
      10,
      11,
      12
    ]
  }
};

window.POSTS_CONFIG = [
  {"id":11,"post_code":"P01H","claim_id":1,"material_code":"A4","source":"human","category":"accurate","expected":"pass","poster":{"name":"農業新聞台","kind":"page","cat":"媒體","color":"#4E7A5A"},"ago":"5 小時","title":"漁電共生專業分工研擬中 「養殖為本」原則不變","body":"農業部漁業署研擬推動「漁電共生，專業分工」，遭質疑要讓漁、電脫鉤，環保團體召開記者會，反對漁電共生新制為光電業者解套。漁業署表示，政策均秉持「養殖為本、綠能加值」原則，針對既有案場跨距、立柱高度不合養殖需求等問題，正在研擬設計指引。","debrief":"這則內容正確：漁業署確實在研擬漁電共生「專業分工」新制，也遭環團質疑；漁業署說明仍以養殖為本，並在研擬舊案場的設計指引（來源：農傳媒報導）。","pending":false},
  {"id":12,"post_code":"P01A","claim_id":1,"material_code":"A4","source":"ai","category":"accurate","expected":"pass","poster":{"name":"農業新聞台","kind":"page","cat":"媒體","color":"#4E7A5A"},"ago":"5 小時","title":"漁業署回應新制爭議：原則仍是「養殖為本、綠能加值」","body":"舊案場的跨距與立柱高度不合養殖需求，漁業署表示正在研擬設計指引。至於研擬中的漁電共生「專業分工」新制，則被批評可能讓漁業與光電脫鉤，環保團體開記者會表示反對，認為這會讓光電業者解套。對此漁業署強調，政策原則不變，仍是「養殖為本、綠能加值」。","debrief":"這則內容正確：漁業署確實在研擬漁電共生「專業分工」新制，也遭環團質疑；漁業署說明仍以養殖為本，並在研擬舊案場的設計指引（來源：農傳媒報導）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":2,"of":3}},
  {"id":21,"post_code":"P02H","claim_id":2,"material_code":"A8","source":"human","category":"accurate","expected":"pass","poster":{"name":"環境規劃觀察","kind":"page","cat":"NGO","color":"#5A7A7A"},"ago":"1 天","title":"漁電共生怎麼了？","body":"熟悉水產養殖的人都同意，台灣的養殖產業體質並不完善，與光電結合有可能可以帶來提升養殖環境的必需資金。然而，這個結合方案，卻因為政策求快與制度的將就，導致許多案場開發到實際養殖過程都不順利，形成各方皆輸的窘境。仍然有人發揮膽識，開創出各自精彩的案例。","debrief":"這則內容正確：來自民間團體訪談 30 多位利害關係人的田野調查，同時說明光電資金可能的幫助、政策求快造成的問題，以及仍有成功案例（來源：台灣環境規劃協會）。","pending":false},
  {"id":22,"post_code":"P02A","claim_id":2,"material_code":"A8","source":"ai","category":"accurate","expected":"pass","poster":{"name":"環境規劃觀察","kind":"page","cat":"NGO","color":"#5A7A7A"},"ago":"1 天","title":"養殖業缺的資金，光電能補嗎？","body":"我們想談一個觀察。不少熟悉水產養殖的人看法一致，認為台灣養殖產業的體質不好。光電結合進來，可能帶來改善養殖環境所需的資金。但政策追求快，制度又將就，許多案場從開發到真正養殖都不順利，最後各方皆輸。即便如此，還是有人靠著膽識做出成功案例。","debrief":"這則內容正確：來自民間團體訪談 30 多位利害關係人的田野調查，同時說明光電資金可能的幫助、政策求快造成的問題，以及仍有成功案例（來源：台灣環境規劃協會）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":2,"of":3}},
  {"id":31,"post_code":"P03H","claim_id":3,"material_code":"A5","source":"human","category":"accurate","expected":"pass","poster":{"name":"深度報導室","kind":"page","cat":"媒體","color":"#3D5A80"},"ago":"2 天","title":"漁電共生5年後，真的「養出魚」的他們","body":"5年來，漁電共生的政策成效始終不如預期。實際在光電板下養出成果、順利通過養殖事實查核的案場，發電容量只佔全部案場的4%。不少養殖戶都認為「認真養一定養得起來」；也有人抱怨，「收成量達往年平均之7成」的查核標準，忽略了養殖本來就易受天候影響的特性。","debrief":"這則內容正確：通過養殖事實查核的案場，發電容量約占全部案場的 4%；養殖戶對查核標準的看法也有交代（來源：報導者）。","pending":false},
  {"id":32,"post_code":"P03A","claim_id":3,"material_code":"A5","source":"ai","category":"accurate","expected":"pass","poster":{"name":"深度報導室","kind":"page","cat":"媒體","color":"#3D5A80"},"ago":"2 天","title":"養殖戶各說各話 漁電共生成效仍不如預期","body":"對漁電共生的查核，養殖戶看法分成兩派。一派認為認真養就養得起來，另一派則抱怨收成要達往年平均 7 成的標準，忽略了天候對養殖的影響。政策推行 5 年，成效始終不如預期，在光電板下養出成果並通過養殖事實查核的案場，發電容量只占全部案場 4%。","debrief":"這則內容正確：通過養殖事實查核的案場，發電容量約占全部案場的 4%；養殖戶對查核標準的看法也有交代（來源：報導者）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":3,"of":3}},
  {"id":41,"post_code":"P04H","claim_id":4,"material_code":"A9","source":"human","category":"accurate","expected":"pass","poster":{"name":"漁村新聞網","kind":"page","cat":"媒體","color":"#4E6E8A"},"ago":"3 天","title":"勇於挑戰漁電共生的漁民，突圍傳統技術，找尋養殖未來","body":"「光聽政府推廣漁電共生好處也沒有用，還是要親自去摸索，才會知道好、壞在哪裡。」從光電業者轉職白蝦養殖的林志成，說出漁電養殖漁民的心聲：「每個魚塭狀況不一樣。」地面型養殖案場，2022年至2023年正陸續完工，養殖成果還需要時間觀察。","debrief":"這則內容正確：屋頂型與地面型案場的進度不同，地面型多在 2022–2023 年才完工，成果仍待觀察（來源：農傳媒報導）。","pending":false},
  {"id":42,"post_code":"P04A","claim_id":4,"material_code":"A9","source":"ai","category":"accurate","expected":"pass","poster":{"name":"漁村新聞網","kind":"page","cat":"媒體","color":"#4E6E8A"},"ago":"3 天","title":"光電業者轉養白蝦 林志成：每個魚塭都不一樣","body":"林志成以前做光電，如今轉行養起白蝦。他說，政府宣傳漁電共生有多好，光用聽的沒有用，得自己下去摸索，才曉得好壞在哪裡。他也提到，每個魚塭的情況都不同。至於地面型的漁電共生養殖案場，2022 到 2023 年陸續完工，養殖成果還需要時間來觀察。","debrief":"這則內容正確：屋頂型與地面型案場的進度不同，地面型多在 2022–2023 年才完工，成果仍待觀察（來源：農傳媒報導）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":1,"of":3}},
  {"id":51,"post_code":"P05H","claim_id":5,"material_code":"C3","source":"human","category":"context","expected":"warn","poster":{"name":"綠能推動辦公室","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"5 小時","title":"烏魚子+綠電共生！誰說漁電共生的光電板下沒有魚？","body":"又來到收烏魚採收的季節啦！這次我們來到漁電共生室外養殖場，大量新鮮現流（hiān-lâu）的烏魚隨著運輸車輛傾瀉而下，接著馬上進入烏魚子的加工過程，新鮮的烏魚子呈現鮮豔的黃與橘黃色間，因此有「烏金」的稱呼。\n你能想像這裡原先是一大片廢棄魚塭嗎？","debrief":"這則需要補充脈絡：案場由廢棄魚塭活化、有烏魚收成屬實，但通篇只呈現收成好的一面，沒有提到其他案場的養殖狀況或查核問題。","pending":false},
  {"id":52,"post_code":"P05A","claim_id":5,"material_code":"C3","source":"ai","category":"context","expected":"warn","poster":{"name":"綠能推動辦公室","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"5 小時","title":"誰說光電板下沒有魚？烏魚子配綠電共生","body":"看這裡！漁電共生的室外養殖場正在採收烏魚，剛撈起的新鮮烏魚馬上送去加工，變身烏魚子！烏魚子的顏色從亮黃到橘黃，所以大家都叫它「烏金」。你知道嗎？這片地以前可是廢棄的魚塭呢！沒想到吧，現在這裡成了採收烏魚的好地方，真是太棒了！","debrief":"這則需要補充脈絡：案場由廢棄魚塭活化、有烏魚收成屬實，但通篇只呈現收成好的一面，沒有提到其他案場的養殖狀況或查核問題。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":1,"of":3}},
  {"id":61,"post_code":"P06H","claim_id":6,"material_code":"C6","source":"human","category":"context","expected":"warn","poster":{"name":"公民監督聯盟","kind":"page","cat":"公民團體","color":"#8A4E5A"},"ago":"8 小時","title":"漁電共生大鬆綁？反對漁電脫鉤！無須養殖先售電？共生變寄生！本末倒置！","body":"今天再度北上協同夥伴團體召開記者會，抨擊政府擬推動「漁電脫鉤」新制，將漁業與光電經營分離。會中指出，目前七成案場「有電無魚」，政策已然失敗，若放寬讓業者無需負擔養殖責任，將使「共生變寄生」，本末倒置。","debrief":"這則需要補充脈絡：「七成」來自審計部「未落實養殖」的統計，包含有養殖但不符經營計畫的案場；漁業署統計已查核案場中廢止的約 12%。貼文只呈現單一種算法，說成「有電無魚」。","pending":false},
  {"id":62,"post_code":"P06A","claim_id":6,"material_code":"C6","source":"ai","category":"context","expected":"warn","poster":{"name":"公民監督聯盟","kind":"page","cat":"公民團體","color":"#8A4E5A"},"ago":"8 小時","title":"共生變寄生！我們北上抗議漁電脫鉤","body":"業者如果不用負起養殖責任，共生就會變成寄生，這是本末倒置！今天我們和夥伴團體北上開記者會，反對政府想推的「漁電脫鉤」新制，要把漁業與光電分開經營。七成案場「有電無魚」，政策已經失敗，還要再放任嗎？","debrief":"這則需要補充脈絡：「七成」來自審計部「未落實養殖」的統計，包含有養殖但不符經營計畫的案場；漁業署統計已查核案場中廢止的約 12%。貼文只呈現單一種算法，說成「有電無魚」。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":2,"of":3}},
  {"id":71,"post_code":"P07H","claim_id":7,"material_code":"C1","source":"human","category":"context","expected":"warn","poster":{"name":"經濟資訊站","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"2 天","title":"環境部實地檢驗+經濟部專業測試，光電板無毒！","body":"環境部已進行嘉南災損光電案場的水質重金屬檢測，結果低於環境基準，沒有異常！\n經濟部委託專業單位測試，以RO逆滲透水浸泡損壞光電板7日後，水質仍符飲用水質，當然不會毒害魚蝦。","debrief":"這則需要補充脈絡：水質檢測與泡水測試結果屬實，但把所有質疑都說成謠言，也沒有提到颱風後破損光電板的清運與案場災損處理。","pending":false},
  {"id":72,"post_code":"P07A","claim_id":7,"material_code":"C1","source":"ai","category":"context","expected":"warn","poster":{"name":"經濟資訊站","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"2 天","title":"檢驗與測試證實：光電板沒有毒","body":"環境部針對嘉南颱風災損的光電案場，檢測水質中的重金屬，結果低於環境基準，沒有異常。經濟部則委託專業單位，將損壞的光電板泡在 RO 逆滲透水 7 天，水質依然符合飲用水標準，因此不會毒害魚蝦。","debrief":"這則需要補充脈絡：水質檢測與泡水測試結果屬實，但把所有質疑都說成謠言，也沒有提到颱風後破損光電板的清運與案場災損處理。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":2,"of":3}},
  {"id":81,"post_code":"P08H","claim_id":8,"material_code":"C4","source":"human","category":"context","expected":"warn","poster":{"name":"農業小學堂","kind":"page","cat":"政府機關","color":"#6E8A3D"},"ago":"4 天","title":"漁電共生 綠能＋養殖創雙贏","body":"來看看「漁電共生」的好處\n國家增加再生能源\n地主增加租金收入\n承租漁民租金減低\n光電業者有錢可賺\n水試所運用黑網模擬太陽能板40 %遮蔽效應\n【 文蛤池－立柱式光電養殖 】\n夏季高水溫期因為遮蔽部分陽光 試驗組平均體重成長大於對照組\n冬天短日照 成長較慢～但仍達到對照組70%成長","debrief":"這則需要補充脈絡：水試所試驗數字屬實，但只列出好處，沒有提到文蛤冬季成長只有對照組 7 成對漁民收入的影響，以及光電設施對養殖作業的限制。","pending":false},
  {"id":82,"post_code":"P08A","claim_id":8,"material_code":"C4","source":"ai","category":"context","expected":"warn","poster":{"name":"農業小學堂","kind":"page","cat":"政府機關","color":"#6E8A3D"},"ago":"4 天","title":"一次看懂漁電共生的好處","body":"國家：再生能源增加\n地主：多一筆租金\n承租漁民：租金降低\n光電業者：可以獲利\n水試所也做了試驗，用黑網模擬光電板 40% 的遮蔽，地點是立柱式光電的文蛤池。夏季水溫高，遮掉部分陽光，試驗組的平均體重成長比對照組好。冬季日照短，成長較慢，但仍達對照組的 70%。","debrief":"這則需要補充脈絡：水試所試驗數字屬實，但只列出好處，沒有提到文蛤冬季成長只有對照組 7 成對漁民收入的影響，以及光電設施對養殖作業的限制。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":3,"of":3}},
  {"id":91,"post_code":"P09H","claim_id":9,"material_code":"F1","source":"human","category":"false","expected":"back","poster":{"name":"陳秀琴","kind":"person","cat":"社團成員","color":"#8A6E5A"},"ago":"2 小時","title":"颱風過後、請不要買中南部的養殖魚","body":"因為太陽能版被颱風吹壞掉到魚池、因為太陽能板破了漏出的粉液、非常毒！\n因為魚吃了毒、可能就被撈起、送到市場、假如人吃了、後果難以想像⋯⋯\n忍耐一下 儘可能不要吃「魚」因為光電板的汙染超強⋯⋯\n不只池魚，沿海面上的太陽能板，也被吹落海，架子吹上岸了。\n這段時間儘量少吃魚了。","debrief":"這則含有錯誤訊息：矽晶光電板是固體，沒有液體，不會漏出有毒粉液（台灣事實查核中心報告 #3716）。","pending":false},
  {"id":92,"post_code":"P09A","claim_id":9,"material_code":"F1","source":"ai","category":"false","expected":"back","poster":{"name":"陳秀琴","kind":"person","cat":"社團成員","color":"#8A6E5A"},"ago":"2 小時","title":"颱風過後先別買中南部養殖魚，大家保重","body":"大家看一下……颱風把太陽能板吹壞了，掉進魚池裡。破掉的板子會漏出有毒的粉狀液體，毒性真的很強。魚吃了毒，可能被撈起來送到市場，人吃了後果很嚴重。沿海的太陽能板也被吹落海，連架子都吹上岸了。勸大家颱風過後先別買中南部的養殖魚，這陣子少吃魚。","debrief":"這則含有錯誤訊息：矽晶光電板是固體，沒有液體，不會漏出有毒粉液（台灣事實查核中心報告 #3716）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":1,"of":3}},
  {"id":101,"post_code":"P10H","claim_id":10,"material_code":"F3","source":"human","category":"false","expected":"back","poster":{"name":"南部人講真的","kind":"page","cat":"社群","color":"#C4544F"},"ago":"1 天","title":"知不知道南部為甚麼溫度會特別的高?","body":"其中之一的主要原因是南部的綠地,農地,林地及沿岸的魚業養殖場等,全都拿去裝放大鏡了!了不起的光電產業,讓台灣紅通通的。台灣果然亮起來了。","debrief":"這則含有錯誤訊息：北部夏季均溫不比南部低；全台光電面積約 2 萬公頃且分散，不足以改變南部整體氣溫（台灣事實查核中心報告 #3114）。","pending":false},
  {"id":102,"post_code":"P10A","claim_id":10,"material_code":"F3","source":"ai","category":"false","expected":"back","poster":{"name":"南部人講真的","kind":"page","cat":"社群","color":"#C4544F"},"ago":"1 天","title":"南部為什麼特別熱？","body":"主要原因之一，就是南部的綠地、農地、林地跟沿海魚塭，通通裝了光電板，像一面面放大鏡。光電產業真有本事，讓台灣「紅通通」，也讓台灣「亮起來」了。","debrief":"這則含有錯誤訊息：北部夏季均溫不比南部低；全台光電面積約 2 萬公頃且分散，不足以改變南部整體氣溫（台灣事實查核中心報告 #3114）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":1,"of":3}},
  {"id":111,"post_code":"P11H","claim_id":11,"material_code":"F2","source":"human","category":"false","expected":"back","poster":{"name":"蔡明宏","kind":"person","cat":"社團成員","color":"#6B7A5A"},"ago":"6 小時","title":"讓漁民臉綠掉的綠電？","body":"用屁想都知道！光電板遮了光，池底細菌滋生，文蛤沒了陽光殺菌，溫池水溫度又上不來！藻類沒陽光生不出來，食物也沒了，不餓死也病死，想2頭賺錢，門都沒有！","debrief":"這則含有錯誤訊息：該批文蛤死在沒有光電板的池子，業者研判是鹽度過高，檢驗也未發現與光電有關的異常（台灣事實查核中心報告 #2650）。","pending":false},
  {"id":112,"post_code":"P11A","claim_id":11,"material_code":"F2","source":"ai","category":"false","expected":"back","poster":{"name":"蔡明宏","kind":"person","cat":"社團成員","color":"#6B7A5A"},"ago":"6 小時","title":"綠電？根本是讓漁民臉都綠了吧？","body":"靠，光電板把陽光擋光光，池底細菌一直冒出來，文蛤沒陽光殺菌，水溫又上不來。藻類沒陽光長不出來，文蛤沒東西吃，不是餓死就是病死。還想兩頭賺錢？不可能啦。","debrief":"這則含有錯誤訊息：該批文蛤死在沒有光電板的池子，業者研判是鹽度過高，檢驗也未發現與光電有關的異常（台灣事實查核中心報告 #2650）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":1,"of":3}},
  {"id":121,"post_code":"P12H","claim_id":12,"material_code":"F5","source":"human","category":"false","expected":"back","poster":{"name":"林美玉","kind":"person","cat":"社團成員","color":"#7A6A8A"},"ago":"3 天","title":"台灣漁塭附近有種光電的魚、鴨、鵝、文蛤等都暫時「別吃吧」！","body":"一個颱災「吹」毀一堆太陽能板，常見的太陽能板有分「晶體矽型」和「薄膜型」2 種，薄膜型太陽能板，則會塗上一層非矽晶的半導體材料，而這些材料中，有可能含有有毒物質，例如鎘、鉛、砷等重金屬，如果廢棄的太陽能板沒有妥善處理，有可能會造成環境汙染，進而影響人體健康。","debrief":"這則含有錯誤訊息：內文提到薄膜型光電板可能含有重金屬，但台灣的光電板以矽晶型為主，薄膜型比例極低，含鎘的薄膜板也要數百度高溫才會釋出；「魚塭附近的漁產別吃」是從內文推不出的結論（台灣事實查核中心）。","pending":false},
  {"id":122,"post_code":"P12A","claim_id":12,"material_code":"F5","source":"ai","category":"false","expected":"back","poster":{"name":"林美玉","kind":"person","cat":"社團成員","color":"#7A6A8A"},"ago":"3 天","title":"台灣魚塭附近種光電的魚、鴨、鵝、文蛤，暫時都別吃","body":"先說一個查到的資訊：太陽能板分成晶體矽型與薄膜型，薄膜型塗了一層非矽晶的半導體材料，可能含有鎘、鉛、砷等重金屬。這次颱風有很多太陽能板毀損了，廢棄的板子要是處理不當，可能汙染環境，也可能影響健康。提醒大家小心，也請多留意相關消息。","debrief":"這則含有錯誤訊息：內文提到薄膜型光電板可能含有重金屬，但台灣的光電板以矽晶型為主，薄膜型比例極低，含鎘的薄膜板也要數百度高溫才會釋出；「魚塭附近的漁產別吃」是從內文推不出的結論（台灣事實查核中心）。","pending":false,"generation":{"model":"Claude Sonnet 5.5","date":"2026-11-24","prompt":"固定提示語 v2＋要點卡 v2（AI版生成要點卡_v2_1124.md）","version_picked":2,"of":3}}
];
