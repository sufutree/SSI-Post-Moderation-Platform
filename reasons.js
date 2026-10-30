/* 提醒理由與退回理由設定。請用「理由編輯器.html」修改，不要手動改。
   ssr：對應的 SSR 面向（complexity／perspective／inquiry／skepticism，空白＝其他）；ai：分析時視為「疑似 AI」理由。 */
window.REASON_CONFIG = {
 "version": 1,
 "warn": [
  {
   "cat": "內容與推論",
   "items": [
    {
     "id": "cx1",
     "label": "將這個議題想得太過於簡單",
     "ssr": "complexity",
     "ai": false
    },
    {
     "id": "in1",
     "label": "議題有未解問題，但被視為已經有定論",
     "ssr": "inquiry",
     "ai": false
    },
    {
     "id": "n_old",
     "label": "資訊可能已經過時",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "立場與來源",
   "items": [
    {
     "id": "pt1",
     "label": "只呈現單一立場，沒有其他觀點",
     "ssr": "perspective",
     "ai": false
    },
    {
     "id": "sk1",
     "label": "發文者可能有特定的立場或利益",
     "ssr": "skepticism",
     "ai": false
    },
    {
     "id": "n_anon",
     "label": "看不出發文者是誰或有什麼背景",
     "ssr": "",
     "ai": false
    },
    {
     "id": "n_repost",
     "label": "轉傳內容，看不出最早是誰發的",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "表達方式",
   "items": [
    {
     "id": "n_messy",
     "label": "內容太長或太雜，重點不清楚",
     "ssr": "",
     "ai": false
    },
    {
     "id": "n_typo",
     "label": "錯字多或語句不通順",
     "ssr": "",
     "ai": false
    },
    {
     "id": "n_sarcasm",
     "label": "語氣嘲諷或帶有攻擊性",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "其他",
   "items": [
    {
     "id": "w_imgsrc",
     "label": "圖片來源或拍攝地點不明",
     "ssr": "",
     "ai": false
    },
    {
     "id": "n_gut",
     "label": "我就是覺得怪怪的",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "AI 生成",
   "items": [
    {
     "id": "w_aitext",
     "label": "文字可能由 AI 生成",
     "ssr": "",
     "ai": true
    },
    {
     "id": "w_aiimg",
     "label": "圖片可能由 AI 生成或經過修改",
     "ssr": "",
     "ai": true
    }
   ]
  }
 ],
 "back": [
  {
   "cat": "不實或誤導",
   "items": [
    {
     "id": "b_false",
     "label": "內容與事實不符",
     "ssr": "",
     "ai": false
    },
    {
     "id": "b_mislead",
     "label": "斷章取義、誤導讀者",
     "ssr": "",
     "ai": false
    },
    {
     "id": "b_mismatch",
     "label": "圖文不符或移花接木",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "恐慌與對立",
   "items": [
    {
     "id": "b_panic",
     "label": "引起食安或健康恐慌",
     "ssr": "",
     "ai": false
    },
    {
     "id": "b_hostile",
     "label": "煽動對立",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "內容與推論",
   "items": [
    {
     "id": "cx1",
     "label": "將這個議題想得太過於簡單",
     "ssr": "complexity",
     "ai": false
    },
    {
     "id": "in1",
     "label": "議題有未解問題，但被視為已經有定論",
     "ssr": "inquiry",
     "ai": false
    },
    {
     "id": "n_old",
     "label": "資訊可能已經過時",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "立場與來源",
   "items": [
    {
     "id": "pt1",
     "label": "只呈現單一立場，沒有其他觀點",
     "ssr": "perspective",
     "ai": false
    },
    {
     "id": "sk1",
     "label": "發文者可能有特定的立場或利益",
     "ssr": "skepticism",
     "ai": false
    },
    {
     "id": "n_anon",
     "label": "看不出發文者是誰或有什麼背景",
     "ssr": "",
     "ai": false
    },
    {
     "id": "n_repost",
     "label": "轉傳內容，看不出最早是誰發的",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "表達方式",
   "items": [
    {
     "id": "n_messy",
     "label": "內容太長或太雜，重點不清楚",
     "ssr": "",
     "ai": false
    },
    {
     "id": "n_typo",
     "label": "錯字多或語句不通順",
     "ssr": "",
     "ai": false
    },
    {
     "id": "n_sarcasm",
     "label": "語氣嘲諷或帶有攻擊性",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "影像真實性",
   "items": [
    {
     "id": "b_fakeimg",
     "label": "疑似 AI 生成或變造的影像",
     "ssr": "",
     "ai": true
    }
   ]
  },
  {
   "cat": "社團規範",
   "items": [
    {
     "id": "b_offtopic",
     "label": "與社團主題無關",
     "ssr": "",
     "ai": false
    },
    {
     "id": "b_ad",
     "label": "廣告或宣傳",
     "ssr": "",
     "ai": false
    }
   ]
  },
  {
   "cat": "其他",
   "items": [
    {
     "id": "n_gut",
     "label": "我就是覺得怪怪的",
     "ssr": "",
     "ai": false
    }
   ]
  }
 ]
};
