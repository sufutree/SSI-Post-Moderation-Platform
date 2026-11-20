/* posts.js：24 篇貼文（12 個說法 × 人類版／AI 版）＋清單設定。內容來源：posts_content_v2_1120.json（fish12_v2_content_1120）。
 * title、body、debrief 為定稿文字，請勿用程式改寫（body 的 
 在畫面上顯示為換行）。
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
  {"id":12,"post_code":"P01A","claim_id":1,"material_code":"A4","source":"ai","category":"accurate","expected":"pass","poster":{"name":"農業新聞台","kind":"page","cat":"媒體","color":"#4E7A5A"},"ago":"5 小時","title":"漁電共生「專業分工」研擬中，養殖為本不變","body":"漁業署正在研擬漁電共生「專業分工」新制，被質疑會讓漁和電脫鉤，環保團體也召開記者會，反對新制替光電業者解套。漁業署表示，政策一直以「養殖為本、綠能加值」為原則，對於舊案場跨距和立柱高度不符合養殖需求的問題，目前正在研擬設計指引。","debrief":"這則內容正確：漁業署確實在研擬漁電共生「專業分工」新制，也遭環團質疑；漁業署說明仍以養殖為本，並在研擬舊案場的設計指引（來源：農傳媒報導）。","pending":false},
  {"id":21,"post_code":"P02H","claim_id":2,"material_code":"A8","source":"human","category":"accurate","expected":"pass","poster":{"name":"環境規劃觀察","kind":"page","cat":"NGO","color":"#5A7A7A"},"ago":"1 天","title":"漁電共生怎麼了？","body":"熟悉水產養殖的人都同意，台灣的養殖產業體質並不完善，與光電結合有可能可以帶來提升養殖環境的必需資金。然而，這個結合方案，卻因為政策求快與制度的將就，導致許多案場開發到實際養殖過程都不順利，形成各方皆輸的窘境。仍然有人發揮膽識，開創出各自精彩的案例。","debrief":"這則內容正確：來自民間團體訪談 30 多位利害關係人的田野調查，同時說明光電資金可能的幫助、政策求快造成的問題，以及仍有成功案例（來源：台灣環境規劃協會）。","pending":false},
  {"id":22,"post_code":"P02A","claim_id":2,"material_code":"A8","source":"ai","category":"accurate","expected":"pass","poster":{"name":"環境規劃觀察","kind":"page","cat":"NGO","color":"#5A7A7A"},"ago":"1 天","title":"漁電共生怎麼了？","body":"熟悉養殖的人都知道，台灣的養殖產業體質本來就不太健全，和光電結合，有機會帶進改善養殖環境需要的資金。可是因為政策求快、制度將就，很多案場從開發到真正養殖都不順利，最後變成各方皆輸的局面。不過還是有人憑著膽識，做出了各自精彩的案例。","debrief":"這則內容正確：來自民間團體訪談 30 多位利害關係人的田野調查，同時說明光電資金可能的幫助、政策求快造成的問題，以及仍有成功案例（來源：台灣環境規劃協會）。","pending":false},
  {"id":31,"post_code":"P03H","claim_id":3,"material_code":"A5","source":"human","category":"accurate","expected":"pass","poster":{"name":"深度報導室","kind":"page","cat":"媒體","color":"#3D5A80"},"ago":"2 天","title":"漁電共生5年後，真的「養出魚」的他們","body":"5年來，漁電共生的政策成效始終不如預期。實際在光電板下養出成果、順利通過養殖事實查核的案場，發電容量只佔全部案場的4%。不少養殖戶都認為「認真養一定養得起來」；也有人抱怨，「收成量達往年平均之7成」的查核標準，忽略了養殖本來就易受天候影響的特性。","debrief":"這則內容正確：通過養殖事實查核的案場，發電容量約占全部案場的 4%；養殖戶對查核標準的看法也有交代（來源：報導者）。","pending":false},
  {"id":32,"post_code":"P03A","claim_id":3,"material_code":"A5","source":"ai","category":"accurate","expected":"pass","poster":{"name":"深度報導室","kind":"page","cat":"媒體","color":"#3D5A80"},"ago":"2 天","title":"漁電共生 5 年後，真的「養出魚」的他們","body":"漁電共生推行5年，政策成效一直不如預期。真正在光電板下養出成果、又通過養殖事實查核的案場，發電容量只占全部案場的4%。不少養殖戶認為「認真養就一定養得起來」，但也有人抱怨，「收成要達往年平均7成」的查核標準，忽略了養殖本來就容易受天候影響。","debrief":"這則內容正確：通過養殖事實查核的案場，發電容量約占全部案場的 4%；養殖戶對查核標準的看法也有交代（來源：報導者）。","pending":false},
  {"id":41,"post_code":"P04H","claim_id":4,"material_code":"A9","source":"human","category":"accurate","expected":"pass","poster":{"name":"漁村新聞網","kind":"page","cat":"媒體","color":"#4E6E8A"},"ago":"3 天","title":"勇於挑戰漁電共生的漁民，突圍傳統技術，找尋養殖未來","body":"「光聽政府推廣漁電共生好處也沒有用，還是要親自去摸索，才會知道好、壞在哪裡。」從光電業者轉職白蝦養殖的林志成，說出漁電養殖漁民的心聲：「每個魚塭狀況不一樣。」地面型養殖案場，2022年至2023年正陸續完工，養殖成果還需要時間觀察。","debrief":"這則內容正確：屋頂型與地面型案場的進度不同，地面型多在 2022–2023 年才完工，成果仍待觀察（來源：農傳媒報導）。","pending":false},
  {"id":42,"post_code":"P04A","claim_id":4,"material_code":"A9","source":"ai","category":"accurate","expected":"pass","poster":{"name":"漁村新聞網","kind":"page","cat":"媒體","color":"#4E6E8A"},"ago":"3 天","title":"挑戰漁電共生的漁民，突破傳統找尋養殖未來","body":"「光聽政府講漁電共生有多好是沒用的，一定要自己下去摸索，才知道好和壞在哪裡。」從光電業者轉行養白蝦的林志成，說出很多漁電養殖漁民的心聲：「每個魚塭的狀況都不同。」地面型的養殖案場，2022到2023年才陸續完工，成果還要時間觀察。","debrief":"這則內容正確：屋頂型與地面型案場的進度不同，地面型多在 2022–2023 年才完工，成果仍待觀察（來源：農傳媒報導）。","pending":false},
  {"id":51,"post_code":"P05H","claim_id":5,"material_code":"C3","source":"human","category":"context","expected":"warn","poster":{"name":"綠能推動辦公室","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"5 小時","title":"烏魚子+綠電共生！誰說漁電共生的光電板下沒有魚？","body":"又來到收烏魚採收的季節啦！這次我們來到漁電共生室外養殖場，大量新鮮現流（hiān-lâu）的烏魚隨著運輸車輛傾瀉而下，接著馬上進入烏魚子的加工過程，新鮮的烏魚子呈現鮮豔的黃與橘黃色間，因此有「烏金」的稱呼。\n你能想像這裡原先是一大片廢棄魚塭嗎？","debrief":"這則需要補充脈絡：案場由廢棄魚塭活化、有烏魚收成屬實，但通篇只呈現收成好的一面，沒有提到其他案場的養殖狀況或查核問題。","pending":false},
  {"id":52,"post_code":"P05A","claim_id":5,"material_code":"C3","source":"ai","category":"context","expected":"warn","poster":{"name":"綠能推動辦公室","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"5 小時","title":"烏魚子＋綠電！誰說光電板下沒有魚？","body":"烏魚採收的季節又到了！這次我們來到一處漁電共生的室外養殖場，剛撈起來的新鮮烏魚跟著運輸車一車車倒下來，接著馬上送去加工做成烏魚子。新鮮的烏魚子顏色是亮黃到橘黃，難怪大家都叫它「烏金」。\n你想得到這裡原本是一大片廢棄的魚塭嗎？","debrief":"這則需要補充脈絡：案場由廢棄魚塭活化、有烏魚收成屬實，但通篇只呈現收成好的一面，沒有提到其他案場的養殖狀況或查核問題。","pending":false},
  {"id":61,"post_code":"P06H","claim_id":6,"material_code":"C6","source":"human","category":"context","expected":"warn","poster":{"name":"公民監督聯盟","kind":"page","cat":"公民團體","color":"#8A4E5A"},"ago":"8 小時","title":"漁電共生大鬆綁？反對漁電脫鉤！無須養殖先售電？共生變寄生！本末倒置！","body":"今天再度北上協同夥伴團體召開記者會，抨擊政府擬推動「漁電脫鉤」新制，將漁業與光電經營分離。會中指出，目前七成案場「有電無魚」，政策已然失敗，若放寬讓業者無需負擔養殖責任，將使「共生變寄生」，本末倒置。","debrief":"這則需要補充脈絡：「七成」來自審計部「未落實養殖」的統計，包含有養殖但不符經營計畫的案場；漁業署統計已查核案場中廢止的約 12%。貼文只呈現單一種算法，說成「有電無魚」。","pending":false},
  {"id":62,"post_code":"P06A","claim_id":6,"material_code":"C6","source":"ai","category":"context","expected":"warn","poster":{"name":"公民監督聯盟","kind":"page","cat":"公民團體","color":"#8A4E5A"},"ago":"8 小時","title":"反對漁電脫鉤！不用養殖就能先賣電？共生變寄生，本末倒置！","body":"我們今天再次北上和夥伴團體召開記者會，抨擊政府打算推「漁電脫鉤」新制，把漁業和光電分開經營。目前七成案場都是「有電無魚」，政策早就失敗了，如果還放寬讓業者不用負擔養殖責任，共生就會變寄生，根本本末倒置。","debrief":"這則需要補充脈絡：「七成」來自審計部「未落實養殖」的統計，包含有養殖但不符經營計畫的案場；漁業署統計已查核案場中廢止的約 12%。貼文只呈現單一種算法，說成「有電無魚」。","pending":false},
  {"id":71,"post_code":"P07H","claim_id":7,"material_code":"C1","source":"human","category":"context","expected":"warn","poster":{"name":"經濟資訊站","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"2 天","title":"環境部實地檢驗+經濟部專業測試，光電板無毒！","body":"環境部已進行嘉南災損光電案場的水質重金屬檢測，結果低於環境基準，沒有異常！\n經濟部委託專業單位測試，以RO逆滲透水浸泡損壞光電板7日後，水質仍符飲用水質，當然不會毒害魚蝦。","debrief":"這則需要補充脈絡：水質檢測與泡水測試結果屬實，但把所有質疑都說成謠言，也沒有提到颱風後破損光電板的清運與案場災損處理。","pending":false},
  {"id":72,"post_code":"P07A","claim_id":7,"material_code":"C1","source":"ai","category":"context","expected":"warn","poster":{"name":"經濟資訊站","kind":"page","cat":"政府機關","color":"#2F6E9E"},"ago":"2 天","title":"環境部檢驗＋經濟部測試，光電板沒有毒！","body":"環境部已經檢測嘉南災損光電案場的水質重金屬，結果都低於環境基準，沒有異常！\n經濟部也委託專業單位，把損壞的光電板泡在RO逆滲透水裡7天，水質還是符合飲用水標準，當然不會毒害魚蝦。","debrief":"這則需要補充脈絡：水質檢測與泡水測試結果屬實，但把所有質疑都說成謠言，也沒有提到颱風後破損光電板的清運與案場災損處理。","pending":false},
  {"id":81,"post_code":"P08H","claim_id":8,"material_code":"C4","source":"human","category":"context","expected":"warn","poster":{"name":"農業小學堂","kind":"page","cat":"政府機關","color":"#6E8A3D"},"ago":"4 天","title":"漁電共生 綠能＋養殖創雙贏","body":"來看看「漁電共生」的好處\n國家增加再生能源\n地主增加租金收入\n承租漁民租金減低\n光電業者有錢可賺\n水試所運用黑網模擬太陽能板40 %遮蔽效應\n【 文蛤池－立柱式光電養殖 】\n夏季高水溫期因為遮蔽部分陽光 試驗組平均體重成長大於對照組\n冬天短日照 成長較慢～但仍達到對照組70%成長","debrief":"這則需要補充脈絡：水試所試驗數字屬實，但只列出好處，沒有提到文蛤冬季成長只有對照組 7 成對漁民收入的影響，以及光電設施對養殖作業的限制。","pending":false},
  {"id":82,"post_code":"P08A","claim_id":8,"material_code":"C4","source":"ai","category":"context","expected":"warn","poster":{"name":"農業小學堂","kind":"page","cat":"政府機關","color":"#6E8A3D"},"ago":"4 天","title":"漁電共生 綠能＋養殖雙贏","body":"一起來看漁電共生有哪些好處\n國家可以增加再生能源\n地主可以多收租金\n承租的漁民租金變便宜\n光電業者也有錢賺\n水試所用黑網模擬光電板40%的遮蔽\n【文蛤池・立柱式光電養殖】\n夏天水溫高時遮掉一些陽光，試驗組平均體重長得比對照組好\n冬天日照短長得比較慢，但還是有對照組的70%","debrief":"這則需要補充脈絡：水試所試驗數字屬實，但只列出好處，沒有提到文蛤冬季成長只有對照組 7 成對漁民收入的影響，以及光電設施對養殖作業的限制。","pending":false},
  {"id":91,"post_code":"P09H","claim_id":9,"material_code":"F1","source":"human","category":"false","expected":"back","poster":{"name":"陳秀琴","kind":"person","cat":"社團成員","color":"#8A6E5A"},"ago":"2 小時","title":"颱風過後、請不要買中南部的養殖魚","body":"因為太陽能版被颱風吹壞掉到魚池、因為太陽能板破了漏出的粉液、非常毒！\n因為魚吃了毒、可能就被撈起、送到市場、假如人吃了、後果難以想像⋯⋯\n忍耐一下 儘可能不要吃「魚」因為光電板的汙染超強⋯⋯\n不只池魚，沿海面上的太陽能板，也被吹落海，架子吹上岸了。\n這段時間儘量少吃魚了。","debrief":"這則含有錯誤訊息：矽晶光電板是固體，沒有液體，不會漏出有毒粉液（台灣事實查核中心報告 #3716）。","pending":false},
  {"id":92,"post_code":"P09A","claim_id":9,"material_code":"F1","source":"ai","category":"false","expected":"back","poster":{"name":"陳秀琴","kind":"person","cat":"社團成員","color":"#8A6E5A"},"ago":"2 小時","title":"颱風過後先別買中南部的養殖魚","body":"拜託大家颱風過後先別買！太陽能板被颱風吹壞掉進魚池，破掉的板子會漏出粉狀的液體，毒性非常強！魚吃了毒還是可能被撈起來送到市場賣，人要是吃下去，後果真的不堪設想。不只是魚池，海邊的太陽能板也被吹進海裡，連架子都吹上岸了。這陣子大家忍耐一下，盡量少吃魚。","debrief":"這則含有錯誤訊息：矽晶光電板是固體，沒有液體，不會漏出有毒粉液（台灣事實查核中心報告 #3716）。","pending":false},
  {"id":101,"post_code":"P10H","claim_id":10,"material_code":"F3","source":"human","category":"false","expected":"back","poster":{"name":"南部人講真的","kind":"page","cat":"社群","color":"#C4544F"},"ago":"1 天","title":"知不知道南部為甚麼溫度會特別的高?","body":"其中之一的主要原因是南部的綠地,農地,林地及沿岸的魚業養殖場等,全都拿去裝放大鏡了!了不起的光電產業,讓台灣紅通通的。台灣果然亮起來了。","debrief":"這則含有錯誤訊息：北部夏季均溫不比南部低；全台光電面積約 2 萬公頃且分散，不足以改變南部整體氣溫（台灣事實查核中心報告 #3114）。","pending":false},
  {"id":102,"post_code":"P10A","claim_id":10,"material_code":"F3","source":"ai","category":"false","expected":"back","poster":{"name":"南部人講真的","kind":"page","cat":"社群","color":"#C4544F"},"ago":"1 天","title":"南部為什麼會熱成這樣？","body":"主要原因之一，就是南部的綠地、農田、山林和沿海的魚塭，全部都被拿去鋪放大鏡了！偉大的光電產業讓台灣紅通通，台灣真的亮起來了。","debrief":"這則含有錯誤訊息：北部夏季均溫不比南部低；全台光電面積約 2 萬公頃且分散，不足以改變南部整體氣溫（台灣事實查核中心報告 #3114）。","pending":false},
  {"id":111,"post_code":"P11H","claim_id":11,"material_code":"F2","source":"human","category":"false","expected":"back","poster":{"name":"蔡明宏","kind":"person","cat":"社團成員","color":"#6B7A5A"},"ago":"6 小時","title":"讓漁民臉綠掉的綠電？","body":"用屁想都知道！光電板遮了光，池底細菌滋生，文蛤沒了陽光殺菌，溫池水溫度又上不來！藻類沒陽光生不出來，食物也沒了，不餓死也病死，想2頭賺錢，門都沒有！","debrief":"這則含有錯誤訊息：該批文蛤死在沒有光電板的池子，業者研判是鹽度過高，檢驗也未發現與光電有關的異常（台灣事實查核中心報告 #2650）。","pending":false},
  {"id":112,"post_code":"P11A","claim_id":11,"material_code":"F2","source":"ai","category":"false","expected":"back","poster":{"name":"蔡明宏","kind":"person","cat":"社團成員","color":"#6B7A5A"},"ago":"6 小時","title":"綠電讓漁民臉都綠了？","body":"想也知道！光電板把光遮掉，池底細菌一直長，文蛤沒有陽光殺菌，水溫也上不來！藻類照不到太陽長不出來，文蛤連食物都沒了，不餓死也病死。想兩頭賺錢，門都沒有！","debrief":"這則含有錯誤訊息：該批文蛤死在沒有光電板的池子，業者研判是鹽度過高，檢驗也未發現與光電有關的異常（台灣事實查核中心報告 #2650）。","pending":false},
  {"id":121,"post_code":"P12H","claim_id":12,"material_code":"F5","source":"human","category":"false","expected":"back","poster":{"name":"林美玉","kind":"person","cat":"社團成員","color":"#7A6A8A"},"ago":"3 天","title":"【待補】F5 人類版原文","body":"待補：請貼上 TFC 查核報告中的傳言原文後再填入。","debrief":"這則含有錯誤訊息：台灣的光電板以矽晶型為主，薄膜型比例極低，含鎘的薄膜板也要數百度高溫才會釋出；原傳言所附照片都是挪用其他事件（台灣事實查核中心）。","pending":true},
  {"id":122,"post_code":"P12A","claim_id":12,"material_code":"F5","source":"ai","category":"false","expected":"back","poster":{"name":"林美玉","kind":"person","cat":"社團成員","color":"#7A6A8A"},"ago":"3 天","title":"台灣的太陽能板有毒！","body":"台灣到處在蓋的太陽能板其實有毒！薄膜型的光電板含有鎘、鉛、砷這些重金屬，光電場附近養的魚、鴨、鵝和文蛤，大家千萬不要買來吃。為了家人的健康，請趕快轉給親朋好友知道！","debrief":"這則含有錯誤訊息：台灣的光電板以矽晶型為主，薄膜型比例極低，含鎘的薄膜板也要數百度高溫才會釋出；原傳言所附照片都是挪用其他事件（台灣事實查核中心）。","pending":false}
];
