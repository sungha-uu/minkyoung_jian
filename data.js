window.GUIDE_DATA = [
  {
    id:"staff-dumplings",category:"staff",categoryLabel:"직원용 조리 가이드",type:"만두류 통합",name:"만두류 표준 조리",subtitle:"찐만두와 꾼만두의 주문 즉시 조리 기준",image:"assets/images/mandu-bibim.png",status:"기준 확인 필요",statusTone:"orange",updated:"2026.09.19",version:"v0.9",yield:"주문 1인분",prep:"1분",cook:"약 5분",tags:["직원용","만두","찜기","튀김"],
    versions:[{id:"v0.9",date:"2026.09.19",note:"만두 종류를 하나의 조리 가이드로 통합"},{id:"v0.8",date:"2026.09.16",note:"찜·튀김 예시 기준 작성"}],
    ingredients:[{group:"찐만두 1인분",items:[["냉장 만두",5,"개"],["찜기 물",1,"회"]]},{group:"꾼만두 1인분",items:[["냉장 만두",5,"개"],["튀김유",1,"회"]]}],
    steps:[
      {title:"공통 준비",time:"1분",body:"주문 수량과 만두 종류를 확인하고 만두끼리 붙거나 피가 찢어진 것이 없는지 확인합니다."},
      {title:"찐만두 — 찜기 조리",time:"약 5분",body:"김이 충분히 오른 찜기에 만두를 서로 닿지 않게 넣고 뚜껑을 닫아 조리합니다.",warning:"5분은 화면 확인용 예시입니다. 실제 중심 온도와 매장 찜기 기준으로 확정해야 합니다."},
      {title:"꾼만두 — 튀김 조리",time:"예시 4분",body:"예열된 기름에 만두를 넣고 서로 붙지 않게 저어가며 전체가 노릇해질 때까지 튀깁니다.",warning:"튀김 온도와 시간은 실제 테스트 후 반드시 교체합니다."},
      {title:"검수와 담기",time:"30초",body:"피 터짐, 색, 속까지 데워졌는지 확인한 뒤 정해진 수량과 소스를 함께 담습니다.",tip:"피크 시간에도 한 번에 넣는 최대 수량을 넘기지 않습니다."}
    ],note:"직원 누구나 같은 결과를 낼 수 있도록 실제 찜기 시간, 튀김 온도, 1회 최대 투입량을 입력합니다."
  },
  {
    id:"staff-udon",category:"staff",categoryLabel:"직원용 조리 가이드",type:"면 조리",name:"우동 표준 조리",subtitle:"육수 끓이기부터 면과 고명 담기까지",image:"assets/images/pot-udon.png",status:"기준 확인 필요",statusTone:"orange",updated:"2026.09.18",version:"v0.9",yield:"주문 1인분",prep:"1분",cook:"약 6분",tags:["직원용","우동","끓는물","육수"],versions:[{id:"v0.9",date:"2026.09.18",note:"직원용 단계 초안"}],ingredients:[{group:"1인분 준비",items:[["우동면",1,"봉"],["우동 육수",550,"ml"],["어묵",2,"장"],["고명",1,"회"]]}],steps:[{title:"육수 끓이기",time:"3분",body:"냄비에 정량 육수를 붓고 완전히 끓입니다."},{title:"면 풀기",time:"예시 2분",body:"끓는 육수에 우동면을 넣고 젓가락으로 가볍게 풀어줍니다.",warning:"면을 너무 오래 저으면 끊어지므로 실제 면 제품 기준 시간을 확인합니다."},{title:"어묵과 고명",time:"1분",body:"어묵을 데운 뒤 불을 끄고 정해진 순서로 대파와 김가루를 올립니다."},{title:"제공",time:"즉시",body:"냄비 손잡이 방향과 넘침 여부를 확인해 손님에게 안전하게 제공합니다."}],note:"냄비 크기, 실제 육수량, 면 조리 시간을 직원 교육 후 확정합니다."
  },
  {
    id:"staff-tangsuyuk",category:"staff",categoryLabel:"직원용 조리 가이드",type:"튀김 조리",name:"탕수육 표준 조리",subtitle:"초벌부터 소스와 담음새까지",image:"assets/images/tangsuyuk.jpeg",status:"테스트",statusTone:"purple",updated:"2026.09.17",version:"v0.8",yield:"소 1접시",prep:"2분",cook:"약 7분",tags:["직원용","탕수육","튀김"],versions:[{id:"v0.8",date:"2026.09.17",note:"초벌·재벌 단계 분리"}],ingredients:[{group:"1접시 준비",items:[["손질 고기",300,"g"],["튀김 반죽",1,"회"],["탕수육 소스",1,"회"]]}],steps:[{title:"반죽 입히기",time:"1분",body:"고기에 튀김 반죽을 고르게 입히고 서로 붙은 조각을 떼어냅니다."},{title:"1차 튀김",time:"예시 4분",body:"정해진 온도의 기름에 고기를 나누어 넣어 속까지 익힙니다."},{title:"2차 튀김",time:"예시 1분",body:"주문 직전 높은 온도에서 짧게 다시 튀겨 바삭함을 살립니다."},{title:"소스와 담기",time:"1분",body:"정량 소스를 준비하고 매장 기준에 따라 부먹 또는 찍먹으로 제공합니다."}],note:"실제 기름 온도, 고기 크기, 초벌 보관 가능 시간을 확정해야 합니다."
  },
  {
    id:"staff-fishcake",category:"staff",categoryLabel:"직원용 조리 가이드",type:"국물 조리",name:"콩나물 어묵 표준 조리",subtitle:"국물 농도와 콩나물 식감을 일정하게",image:"assets/images/fishcake.png",status:"운영 중",statusTone:"green",updated:"2026.09.15",version:"v1.0",yield:"주문 1인분",prep:"1분",cook:"약 4분",tags:["직원용","어묵","콩나물"],versions:[{id:"v1.0",date:"2026.09.15",note:"최초 직원용 가이드"}],ingredients:[{group:"1인분 준비",items:[["어묵",4,"개"],["콩나물",1,"회"],["육수",1,"회"],["양념",1,"회"]]}],steps:[{title:"육수와 어묵",time:"3분",body:"정량 육수와 어묵을 넣고 충분히 끓입니다."},{title:"콩나물",time:"예시 1분",body:"콩나물을 마지막에 넣어 숨이 너무 죽지 않도록 익힙니다."},{title:"간과 제공",time:"30초",body:"국물 농도와 수량을 확인한 뒤 정해진 용기에 담습니다."}],note:"보온 시간이 길어질 때 육수 보충 기준과 콩나물 교체 기준을 추가합니다."
  },
  {
    id:"customer-raw-dumplings",category:"customer",categoryLabel:"손님용 조리 안내",type:"포장 안내",name:"포장 생만두 맛있게 드시는 법",subtitle:"찜기·전자레인지·에어프라이어·팬 조리",image:"assets/images/mandu-bibim.png",status:"판촉물 초안",statusTone:"purple",updated:"2026.09.19",version:"v0.9",yield:"만두 5개 기준",prep:"1분",cook:"방법별 상이",tags:["손님용","포장","생만두","QR안내"],versions:[{id:"v0.9",date:"2026.09.19",note:"네 가지 가정 조리법 구성"}],ingredients:[{group:"기본 준비",items:[["포장 생만두",5,"개"],["물",1,"회"]]}],steps:[
      {title:"찜기 — 가장 추천",time:"예시 8분",body:"찜기에 물을 끓이고 김이 충분히 오르면 만두가 서로 닿지 않게 올려 쪄주세요.",warning:"생만두 실제 권장 시간은 크기와 속 상태를 확인해 확정합니다."},
      {title:"전자레인지 — 간편하게",time:"예시 3분",body:"접시에 만두를 놓고 물을 살짝 뿌린 뒤 젖은 키친타월이나 전용 덮개를 덮어 데워주세요.",tip:"전자레인지 출력에 따라 시간을 나누어 추가하세요."},
      {title:"에어프라이어 — 바삭하게",time:"예시 180℃ · 10분",body:"만두 표면에 기름을 얇게 바르고 서로 겹치지 않게 놓은 뒤 중간에 한 번 뒤집어 주세요."},
      {title:"프라이팬 — 촉촉하고 바삭하게",time:"예시 7분",body:"기름을 두른 팬에 만두를 놓고 바닥을 굽다가 물을 조금 넣고 뚜껑을 덮어 익혀주세요. 물이 사라지면 바닥을 다시 바삭하게 구워주세요."},
      {title:"익힘 확인",time:"필수",body:"만두 속 중심까지 충분히 뜨겁게 익었는지 확인한 뒤 드세요.",warning:"표시 시간은 UI 예시입니다. 실제 제품 테스트 후 안전한 기준으로 교체합니다."}
    ],note:"손님이 QR로 열어보는 판촉용 화면입니다. 실제 포장 만두로 각 기기별 테스트 후 정확한 시간과 과정 사진을 등록합니다."
  },
  {
    id:"customer-reheat-dumplings",category:"customer",categoryLabel:"손님용 조리 안내",type:"포장 안내",name:"익힌 만두 다시 데우는 법",subtitle:"식은 찐만두와 꾼만두를 맛있게 되살리기",image:"assets/images/mandu-bibim.png",status:"판촉물 초안",statusTone:"purple",updated:"2026.09.18",version:"v0.8",yield:"만두 5개 기준",prep:"1분",cook:"방법별 상이",tags:["손님용","재가열","포장"],versions:[{id:"v0.8",date:"2026.09.18",note:"재가열 안내 초안"}],ingredients:[{group:"준비",items:[["포장한 익힌 만두",5,"개"]]}],steps:[{title:"찐만두 전자레인지",time:"예시 1~2분",body:"물을 살짝 뿌리고 덮개를 씌워 짧게 나누어 데워주세요."},{title:"꾼만두 에어프라이어",time:"예시 170℃ · 5분",body:"겹치지 않게 넣고 겉이 바삭해질 때까지 데워주세요."},{title:"팬 재가열",time:"예시 4분",body:"약불에서 뚜껑을 덮어 속을 데운 뒤 뚜껑을 열고 겉면을 구워주세요."}],note:"포장 후 경과 시간과 보관 조건을 포함한 안전 안내를 추가해야 합니다."
  }
];
