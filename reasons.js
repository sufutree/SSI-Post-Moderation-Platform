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
     "label": "忽略了議題牽涉的其他面向或取捨（如環境、生計、成本）",
     "ssr": "complexity",
     "ai": false
    },
    {
     "id": "cx2",
     "label": "以個別案例或單一數字，推論成整體狀況",
     "ssr": "complexity",
     "ai": false
    },
    {
     "id": "in2",
     "label": "這個議題仍有未解的問題，內容卻當作已有定論",
     "ssr": "inquiry",
     "ai": false
    }
   ]
  },
  {
   "cat": "立場與來源",
   "items": [
    {
     "id": "pt1",
     "label": "只呈現單一立場，沒有交代其他看法",
     "ssr": "perspective",
     "ai": false
    },
    {
     "id": "pt2",
     "label": "沒有考慮到受議題影響的某些群體的處境",
     "ssr": "perspective",
     "ai": false
    },
    {
     "id": "in1",
     "label": "關鍵說法沒有附出處或數據，無法自行查證",
     "ssr": "inquiry",
     "ai": false
    },
    {
     "id": "sk2",
     "label": "發文者可能有立場或利益，內容像是經過挑選",
     "ssr": "skepticism",
     "ai": false
    }
   ]
  },
  {
   "cat": "表達方式",
   "items": [
    {
     "id": "sk1",
     "label": "用詞情緒化或誇大，可能在引導讀者的情緒",
     "ssr": "skepticism",
     "ai": false
    }
   ]
  },
  {
   "cat": "其他",
   "items": [
    {
     "id": "w_disputed",
     "label": "查核單位有不同結論",
     "ssr": "",
     "ai": false
    },
    {
     "id": "w_imgsrc",
     "label": "圖片來源或拍攝地點不明",
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
     "label": "忽略了議題牽涉的其他面向或取捨（如環境、生計、成本）",
     "ssr": "complexity",
     "ai": false
    },
    {
     "id": "cx2",
     "label": "以個別案例或單一數字，推論成整體狀況",
     "ssr": "complexity",
     "ai": false
    },
    {
     "id": "in2",
     "label": "這個議題仍有未解的問題，內容卻當作已有定論",
     "ssr": "inquiry",
     "ai": false
    }
   ]
  },
  {
   "cat": "立場與來源",
   "items": [
    {
     "id": "pt1",
     "label": "只呈現單一立場，沒有交代其他看法",
     "ssr": "perspective",
     "ai": false
    },
    {
     "id": "pt2",
     "label": "沒有考慮到受議題影響的某些群體的處境",
     "ssr": "perspective",
     "ai": false
    },
    {
     "id": "in1",
     "label": "關鍵說法沒有附出處或數據，無法自行查證",
     "ssr": "inquiry",
     "ai": false
    },
    {
     "id": "sk2",
     "label": "發文者可能有立場或利益，內容像是經過挑選",
     "ssr": "skepticism",
     "ai": false
    }
   ]
  },
  {
   "cat": "表達方式",
   "items": [
    {
     "id": "sk1",
     "label": "用詞情緒化或誇大，可能在引導讀者的情緒",
     "ssr": "skepticism",
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
  }
 ]
};
