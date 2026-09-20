// Hand-verified school recipe records.
// These overrides are intentionally kept separate from the generated OCR seed data so
// future imports cannot silently replace recipes that were checked against the source image.
(function () {
  const verified = {
    "가스오부시 두부튀김": {
      subtitle: "원본 이미지 직접 판독 · 이미지 대조 완료",
      status: "AI 검수 완료",
      statusTone: "green",
      originalChecked: true,
      prep: "재료 준비",
      cook: "약 20분",
      yield: "4인분",
      tags: ["급식", "포스터형 레시피 카드", "AI 이미지 검수 완료"],
      versions: [{ id: "v0.1", date: "2026.09.20", note: "원본 이미지 직접 판독 및 이미지 대조" }],
      ingredients: [
        { group: "재료", items: [
          ["모두부", 1, "모"], ["쪽파", "적당량", ""], ["무", "적당량", ""],
          ["김가루", "적당량", ""], ["가스오부시(얇은 것)", "한줌", ""],
          ["전분가루", "적당량", ""], ["소금", "적당량", ""], ["후추", "적당량", ""], ["식용유", "적당량", ""]
        ]},
        { group: "육수 재료", items: [["가스오부시", "한줌", ""], ["다시마", 1, "조각"], ["물", 1, "컵"]] },
        { group: "소스 재료", items: [["간장", 3, "큰술"], ["맛술", 2, "큰술"], ["설탕", 1, "큰술"]] }
      ],
      steps: [
        { phase: "prep", body: "모두부를 4등분하고 소금과 후추를 뿌려 면포로 물기 제거" },
        { phase: "prep", body: "쪽파는 송송 썰고 무는 강판에 갈아 물기 제거" },
        { phase: "cook", body: "물 1컵에 다시마를 넣고 끓여 기포가 올라오면 2~3분 후 불 끄기" },
        { phase: "cook", body: "가스오부시 한줌을 넣고 3분 우린 뒤 체에 걸러 맑은 육수만 남기기" },
        { phase: "cook", body: "육수에 간장, 맛술, 설탕을 넣고 한 번 끓인 뒤 불 끄기" },
        { phase: "cook", body: "두부에 전분가루를 묻혀 팬에 식용유를 두르고 튀기기" },
        { phase: "cook", body: "접시에 소스를 붓고 두부, 무, 쪽파, 김가루, 가스오부시 올리기", tip: "차갑게 식혀 먹어도 좋습니다" }
      ],
      note: "원본 이미지 직접 판독 완료."
    },
    "가지구이": {
      subtitle: "원본 이미지 직접 판독 · 이미지 대조 완료",
      status: "AI 검수 완료",
      statusTone: "green",
      originalChecked: true,
      prep: "전처리",
      cook: "조리",
      yield: "1인분",
      tags: ["급식", "조리과정 안내형", "AI 이미지 검수 완료"],
      versions: [{ id: "v0.1", date: "2026.09.20", note: "원본 이미지 직접 판독 및 이미지 대조" }],
      ingredients: [{ group: "재료", items: [
        ["가지", 120, "g"], ["대파", 80, "g"], ["다진마늘", 20, "g"], ["국간장", 15, "g"],
        ["소금", 10, "g"], ["참기름", 10, "g"], ["볶음참깨", 5, "g"]
      ]}],
      steps: [
        { phase: "prep", body: "가지는 손질 후 세척" },
        { phase: "prep", body: "가지는 길이로 반 갈라 1cm 두께로 슬라이스" },
        { phase: "prep", body: "대파는 0.2cm 두께로 썰기" },
        { phase: "cook", body: "가지를 끓는 물에 2~3분 데친 뒤 체에 밭쳐 물기 제거", tip: "가지 껍질이 질기면 추가 조리하여 연하게 만들기" },
        { phase: "cook", body: "데친 가지에 대파, 다진마늘, 국간장, 참기름, 소금을 넣고 무치기", tip: "소금은 기호에 따라 조절" },
        { phase: "cook", body: "가지무침 위에 볶음참깨를 뿌려 마무리" }
      ],
      note: "원본 이미지 직접 판독 완료."
    },
    "갈릭드레싱": {
      subtitle: "원본 이미지 직접 판독 · 이미지 대조 완료",
      status: "AI 검수 완료",
      statusTone: "green",
      originalChecked: true,
      prep: "재료 계량",
      cook: "혼합",
      yield: "4인분",
      tags: ["급식", "표준 급식 레시피표", "AI 이미지 검수 완료"],
      versions: [{ id: "v0.1", date: "2026.09.20", note: "원본 이미지 직접 판독 및 이미지 대조" }],
      ingredients: [{ group: "재료", items: [
        ["마요네즈", 50, "g"], ["우유", 50, "g"], ["설탕", 10, "g"],
        ["다진 양파·마늘(아주 곱게)", 50, "g"], ["후추", "아주 약간", ""]
      ]}],
      steps: [{ phase: "cook", body: "볼에 마요네즈, 우유, 다진 양파·마늘, 설탕, 후추를 넣고 섞어 완성", tip: "생와사비나 구운 베이컨을 더해 응용 가능" }],
      note: "원본 이미지 직접 판독 완료."
    },
    "갈릭새우스파게티": {
      subtitle: "원본 이미지 직접 판독 · 이미지 대조 완료",
      status: "AI 검수 완료",
      statusTone: "green",
      originalChecked: true,
      prep: "재료·면 준비",
      cook: "원본 미기재",
      yield: "1인분",
      tags: ["급식", "조리과정 안내형", "AI 이미지 검수 완료"],
      versions: [{ id: "v0.1", date: "2026.09.20", note: "원본 이미지 직접 판독 및 이미지 대조" }],
      ingredients: [{ group: "재료", items: [
        ["스파게티", 120, "g"], ["깐마늘", 30, "g"], ["봉골레파스타소스(대상)", 50, "g"],
        ["베트남건고추", 1, "g"], ["깐양파", 20, "g"], ["흰다리새우살", 80, "g"],
        ["그라노파다노", 5, "g"], ["베이비채소", 3, "g"], ["식용유", 1, "g"],
        ["소금", 1, "g"], ["올리브오일", 1, "g"], ["파슬리", 1, "g"]
      ]}],
      steps: [
        { phase: "prep", body: "양파는 0.5cm 크기로 채 썰고 마늘은 편으로 썰기" },
        { phase: "prep", body: "흰다리새우살은 흐르는 물에 해동 후 끓는 물에 5분 정도 삶기" },
        { phase: "prep", body: "물에 식용유와 소금을 넣고 끓여 스파게티면을 7~8분 삶고 면수 100ml 따로 보관" },
        { phase: "cook", body: "팬에 올리브오일과 마늘을 넣고 마늘향 내기" },
        { phase: "cook", body: "봉골레파스타소스, 면수, 흰다리새우살, 베트남건고추, 양파, 스파게티면을 넣고 볶기" },
        { phase: "cook", body: "완성된 스파게티를 접시에 담고 그라노파다노, 베이비채소, 파슬리를 올리기" }
      ],
      note: "원본 이미지 직접 판독 완료."
    },
    "갈치 조림": {
      subtitle: "원본 이미지 직접 판독 · 이미지 대조 완료",
      status: "AI 검수 완료",
      statusTone: "green",
      originalChecked: true,
      prep: "전처리",
      cook: "조림",
      yield: "5인분",
      tags: ["급식", "조리과정 안내형", "AI 이미지 검수 완료"],
      versions: [{ id: "v0.1", date: "2026.09.20", note: "원본 이미지 직접 판독 및 이미지 대조" }],
      ingredients: [{ group: "재료", items: [
        ["갈치", 1000, "g"], ["깐무우", 500, "g"], ["깐감자", 250, "g"], ["청고추", 10, "g"],
        ["홍고추", 5, "g"], ["깐대파", 150, "g"], ["깐양파", 100, "g"], ["팽이버섯", 10, "g"],
        ["고추가루(굵은)", 25, "g"], ["고추가루(고운)", 25, "g"], ["고추장", 15, "g"],
        ["물엿", 50, "g"], ["후추", 5, "g"], ["마늘", 25, "g"], ["생강", 5, "g"],
        ["미향", 15, "g"], ["국간장", 40, "g"], ["멸치액젓", 30, "g"], ["설탕", 20, "g"], ["식용유", "적당량", ""]
      ]}],
      steps: [
        { phase: "prep", body: "갈치는 흐르는 물에 씻어 내장 제거" },
        { phase: "prep", body: "무는 30g 크기로 자르기" },
        { phase: "prep", body: "감자는 편으로 썰기" },
        { phase: "prep", body: "청고추와 홍고추는 고명용으로 어슷하게 썰기" },
        { phase: "prep", body: "대파 흰 부분은 반 갈라 6cm 길이로 썰기" },
        { phase: "prep", body: "양파는 5×5cm 조림용 사각으로 썰기" },
        { phase: "prep", body: "팽이버섯은 고명용으로 길게 자르기" },
        { phase: "cook", body: "식용유에 굵은 고춧가루와 마늘을 넣고 볶기" },
        { phase: "cook", body: "양념을 계량해 넣기" },
        { phase: "cook", body: "양념이 섞이면 물을 넣어 풀기" },
        { phase: "cook", body: "무, 감자, 대파·양파, 갈치 순으로 졸인 뒤 팽이버섯과 고추를 고명으로 올리기", tip: "마늘과 생강을 넣으면 갈치 비린내 제거에 효과적" }
      ],
      note: "원본 이미지 직접 판독 완료."
    },
    "감자폭탄후루룩떡볶이&눈꽃치즈": {
      subtitle: "원본 이미지 직접 판독 · 이미지 대조 완료",
      status: "AI 검수 완료",
      statusTone: "green",
      originalChecked: true,
      prep: "전처리",
      cook: "조리",
      yield: "원본 미기재",
      tags: ["급식", "표준 급식 레시피표", "AI 이미지 검수 완료"],
      versions: [{ id: "v0.1", date: "2026.09.20", note: "원본 이미지 직접 판독 및 이미지 대조" }],
      ingredients: [{ group: "재료", items: [
        ["냉동밀떡볶이떡(누들)", 100, "g"], ["부산어묵(사각)", 60, "g"], ["깐양배추", 40, "g"],
        ["깐양파", 10, "g"], ["세척당근", 10, "g"], ["깐대파", 10, "g"], ["계란", 52, "g"],
        ["우동소스", 10, "g"], ["태양초고추장", 20, "g"], ["고운고추분", 1, "g"],
        ["하얀설탕", 4, "g"], ["백물엿", 5, "g"], ["눈꽃치즈(엔젤헤어모짜)", 30, "g"],
        ["파슬리가루", 0.1, "g"], ["냉동감자튀김(테이터팟스)", 110, "g"], ["식용유", 50, "g"]
      ]}],
      steps: [
        { phase: "prep", body: "떡볶이떡은 40℃ 물에 30분 불리기" },
        { phase: "prep", body: "고추장, 고운고추분, 백설탕, 백물엿을 섞어 양념장 만들기" },
        { phase: "prep", body: "양파는 채 썰고 양배추는 길게 나박썰기, 당근은 채 썰고 대파는 반 갈라 썰기" },
        { phase: "prep", body: "계란은 삶아 껍질을 벗겨 찬물에 담기" },
        { phase: "prep", body: "눈꽃치즈와 파슬리가루를 섞어 준비" },
        { phase: "cook", body: "물 또는 육수 400ml에 양념장을 풀고 2~3분 끓이기" },
        { phase: "cook", body: "예열한 식용유에 냉동감자튀김을 넣고 노릇하게 튀기기" },
        { phase: "cook", body: "떡볶이떡을 넣고 5~7분 볶다가 어묵, 양배추, 양파를 넣고 4~5분 익히기" },
        { phase: "cook", body: "우동소스로 간을 맞춘 뒤 삶은 계란과 대파를 넣고 10초간 익히기" },
        { phase: "cook", body: "그릇에 담고 감자튀김을 올린 뒤 눈꽃치즈를 뿌리기" }
      ],
      note: "원본 이미지 직접 판독 완료."
    }
  };

  (window.SCHOOL_RECIPE_DATA || []).forEach(item => {
    const patch = verified[item.name];
    if (patch) Object.assign(item, patch);
  });
})();
