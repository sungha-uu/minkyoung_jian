window.RECIPE_DATA = [
  {
    id: "mandu-meat", category: "mandu", categoryLabel: "만두", name: "고기만두", subtitle: "매일 직접 빚는 기본 만두", image: "assets/images/mandu-bibim.png", status: "운영 중", statusTone: "green", updated: "2026.09.18", version: "v1.2", yield: "만두 100개", prep: "70분", cook: "12분",
    versions: [
      { id: "v1.2", date: "2026.09.18", note: "육즙 보존을 위해 채소 탈수율과 혼합 순서 조정" },
      { id: "v1.1", date: "2026.08.27", note: "찜 시간 및 1차 냉각 기준 추가" },
      { id: "v1.0", date: "2026.08.12", note: "최초 레시피 등록" }
    ],
    ingredients: [
      { group: "만두소", items: [["다진 돼지고기", 1800, "g"], ["부추", 600, "g"], ["양배추", 900, "g"], ["두부", 600, "g"], ["당면", 350, "g"], ["다진 마늘", 90, "g"], ["진간장", 150, "ml"], ["참기름", 80, "ml"]] },
      { group: "조립", items: [["만두피", 100, "장"], ["물", 100, "ml"]] }
    ],
    steps: [
      { title: "재료 전처리", time: "25분", body: "채소는 곱게 다진 뒤 수분을 충분히 빼고, 두부도 면포로 눌러 물기를 제거합니다.", tip: "채소 수분이 남으면 냉장 보관 중 피가 쉽게 불어요." },
      { title: "만두소 혼합", time: "15분", body: "돼지고기에 양념을 먼저 넣고 끈기가 생길 때까지 섞은 뒤, 채소와 당면을 가볍게 합칩니다.", tip: "고기와 채소는 너무 오래 치대지 않도록 합니다." },
      { title: "성형 및 찌기", time: "22분", body: "만두피에 소를 일정량 담아 빚고, 김이 오른 찜기에 서로 닿지 않게 올려 충분히 익힙니다." },
      { title: "식힘 및 보관", time: "8분", body: "넓게 펼쳐 중심부 열을 빠르게 식힌 뒤 밀폐 용기에 담아 냉장 보관합니다.", warning: "실제 냉각·보관 기준은 영업장 위생 기준에 맞춰 확정하세요." }
    ],
    note: "현재 내용은 UI 확인용 샘플입니다. 실제 배합과 공정으로 반드시 교체해야 합니다."
  },
  {
    id: "mandu-fried", category: "mandu", categoryLabel: "만두", name: "꾼만두", subtitle: "겉은 바삭하고 속은 촉촉하게", image: "assets/images/mandu-bibim.png", status: "개선 중", statusTone: "orange", updated: "2026.09.16", version: "v1.1", yield: "1인분 · 5개", prep: "2분", cook: "6분",
    versions: [{ id: "v1.1", date: "2026.09.16", note: "2단 튀김 온도 테스트" }, { id: "v1.0", date: "2026.08.20", note: "최초 조리 기준 등록" }],
    ingredients: [{ group: "1인분", items: [["찐 고기만두", 5, "개"], ["튀김유", 1000, "ml"], ["간장 소스", 30, "ml"]] }],
    steps: [{ title: "예열", time: "3분", body: "튀김유를 목표 온도까지 충분히 예열합니다." }, { title: "1차 튀김", time: "2분", body: "냉장 만두 표면의 물기를 확인하고 서로 붙지 않도록 넣습니다.", warning: "수분이 남은 만두는 기름이 튈 수 있습니다." }, { title: "마무리", time: "1분", body: "표면이 고르게 노릇해지면 건져 기름을 뺀 뒤 즉시 제공합니다." }],
    note: "피가 터지는 비율과 주문 몰릴 때의 적정 튀김량을 기록할 예정입니다."
  },
  {
    id: "bibim-veg", category: "special", categoryLabel: "별미 · 사이드", name: "비빔야채", subtitle: "만두와 곁들이는 새콤한 한 접시", image: "assets/images/mandu-bibim.png", status: "운영 중", statusTone: "green", updated: "2026.09.12", version: "v1.0", yield: "10인분", prep: "20분", cook: "—",
    versions: [{ id: "v1.0", date: "2026.09.12", note: "최초 레시피 등록" }],
    ingredients: [{ group: "채소", items: [["양배추", 800, "g"], ["당근", 150, "g"], ["깻잎", 20, "장"]] }, { group: "비빔 양념", items: [["고추장", 220, "g"], ["식초", 160, "ml"], ["설탕", 130, "g"], ["참기름", 40, "ml"]] }],
    steps: [{ title: "채소 손질", time: "12분", body: "채소는 일정한 굵기로 채 썰어 찬물에 헹군 뒤 물기를 완전히 제거합니다." }, { title: "양념 혼합", time: "3분", body: "양념 재료를 덩어리 없이 섞고 냉장 숙성합니다." }, { title: "주문 즉시 버무리기", time: "1분", body: "1인분씩 계량한 채소에 양념을 넣고 숨이 죽지 않게 가볍게 버무립니다." }],
    note: "시간대별 채소 물 생김과 양념 농도를 비교해 기록합니다."
  },
  {
    id: "udon-pot", category: "noodle", categoryLabel: "면 요리", name: "냄비우동", subtitle: "뜨끈하고 깔끔한 시장 우동", image: "assets/images/pot-udon.png", status: "운영 중", statusTone: "green", updated: "2026.09.10", version: "v1.3", yield: "1인분", prep: "3분", cook: "7분",
    versions: [{ id: "v1.3", date: "2026.09.10", note: "육수 염도 기준 보완" }, { id: "v1.2", date: "2026.08.21", note: "고명 순서 변경" }, { id: "v1.0", date: "2026.08.05", note: "최초 레시피 등록" }],
    ingredients: [{ group: "1인분", items: [["우동면", 1, "봉"], ["우동 육수", 550, "ml"], ["어묵", 2, "장"], ["대파", 15, "g"], ["김가루", 2, "g"]] }],
    steps: [{ title: "육수 끓이기", time: "4분", body: "냄비에 계량한 육수를 넣고 완전히 끓입니다." }, { title: "면과 어묵 익히기", time: "2분", body: "면을 풀어 넣고 어묵과 함께 끓여 중심까지 뜨겁게 합니다." }, { title: "고명과 제공", time: "1분", body: "대파와 김가루를 올려 냄비째 안전하게 제공합니다." }],
    note: "피크타임 육수 농축과 면 퍼짐을 줄이는 방법을 검토합니다."
  },
  {
    id: "tangsuyuk", category: "special", categoryLabel: "별미 · 사이드", name: "옛날 탕수육", subtitle: "바삭한 튀김과 새콤달콤 소스", image: "assets/images/tangsuyuk.jpeg", status: "테스트", statusTone: "purple", updated: "2026.09.08", version: "v0.9", yield: "소 · 1접시", prep: "15분", cook: "8분",
    versions: [{ id: "v0.9", date: "2026.09.08", note: "소스 점도와 튀김옷 비율 테스트" }, { id: "v0.8", date: "2026.08.30", note: "초기 테스트" }],
    ingredients: [{ group: "튀김", items: [["돼지고기", 300, "g"], ["전분", 120, "g"], ["물", 100, "ml"]] }, { group: "소스", items: [["물", 250, "ml"], ["식초", 70, "ml"], ["설탕", 90, "g"], ["간장", 20, "ml"]] }],
    steps: [{ title: "고기 밑간", time: "10분", body: "고기를 일정한 크기로 손질해 밑간합니다." }, { title: "튀기기", time: "6분", body: "전분옷을 입혀 바삭하게 두 번 튀깁니다." }, { title: "소스 완성", time: "2분", body: "소스를 끓여 농도를 맞추고 주문 방식에 따라 곁들입니다." }],
    note: "배달 없이 노점 즉시 판매 기준으로 가장 오래 바삭한 배합을 찾습니다."
  },
  {
    id: "fishcake", category: "special", categoryLabel: "별미 · 사이드", name: "콩나물어묵", subtitle: "칼칼한 국물과 아삭한 콩나물", image: "assets/images/fishcake.png", status: "운영 중", statusTone: "green", updated: "2026.09.04", version: "v1.0", yield: "10인분", prep: "15분", cook: "18분",
    versions: [{ id: "v1.0", date: "2026.09.04", note: "최초 레시피 등록" }],
    ingredients: [{ group: "재료", items: [["꼬치 어묵", 40, "개"], ["콩나물", 800, "g"], ["육수", 5000, "ml"], ["대파", 120, "g"]] }],
    steps: [{ title: "육수 준비", time: "10분", body: "육수를 끓여 기본 간을 맞춥니다." }, { title: "어묵 익히기", time: "6분", body: "어묵을 넣어 충분히 데우고 맛이 배게 합니다." }, { title: "콩나물 마무리", time: "2분", body: "콩나물을 마지막에 넣어 아삭함을 살립니다." }],
    note: "장시간 보온 시 콩나물 식감과 국물 염도 변화를 기록합니다."
  }
];
