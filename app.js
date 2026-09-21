const recipeItems = [...window.RECIPE_DATA.filter(item=>item.id!=="school-tteokbokki"),...(window.SCHOOL_RECIPE_DATA||[])];
const guideItems = window.GUIDE_DATA;
const FAVORITES_KEY = "kkun-recipe-favorites-v1";
const SCHOOL_IMAGE_REMOVALS_KEY = "minkyoung-school-image-removals-v1";
const APP_HISTORY_KEY = "minkyoung-kitchen";
const categories = {
  recipes: [
    { id:"all", label:"전체 레시피", color:"#eb5d43" },
    { id:"store", label:"섹시한꾼만두", color:"#ed9b45" },
    { id:"new", label:"신메뉴 레시피", color:"#5b9a81" },
    { id:"school", label:"급식 레시피", color:"#6d87bd" },
    { id:"famous", label:"유명한 레시피", color:"#826eb4" },
    { id:"baek", label:"백종원 레시피", color:"#b96d86" },
    { id:"favorite1", label:"즐겨찾기 1", color:"#f2b632", favorite:true },
    { id:"favorite2", label:"즐겨찾기 2", color:"#ef7d32", favorite:true },
    { id:"favorite3", label:"즐겨찾기 3", color:"#df3f3f", favorite:true }
  ],
  guides: [
    { id:"all", label:"전체 조리 가이드", color:"#eb5d43" },
    { id:"staff", label:"직원용 조리방법", color:"#5b9a81" },
    { id:"customer", label:"손님용 조리 안내", color:"#826eb4" }
  ]
};

const state = { view:"recipes", category:"store", query:"", selected:recipeItems[0].id, selectedView:"recipes", multiplier:1, sortDesc:true, listScrollY:0, listFocusId:null, detailOpen:false, favorites:loadFavorites(), removedSchoolImages:loadRemovedSchoolImages() };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const listEl = $("#recipeList");
const detailEl = $("#recipeDetail");
const toastEl = $("#toast");
const exitModalEl = $("#exitModal");
let exitConfirmed = false;

function loadFavorites(){ try{return JSON.parse(localStorage.getItem(FAVORITES_KEY))||{}}catch{return{}} }
function loadRemovedSchoolImages(){ try{return JSON.parse(localStorage.getItem(SCHOOL_IMAGE_REMOVALS_KEY))||{}}catch{return{}} }
function saveFavorites(){ localStorage.setItem(FAVORITES_KEY,JSON.stringify(state.favorites)); }
function saveRemovedSchoolImages(){ localStorage.setItem(SCHOOL_IMAGE_REMOVALS_KEY,JSON.stringify(state.removedSchoolImages)); }
function hasVisibleOriginal(item){ return Boolean(item?.originalImage)&&!state.removedSchoolImages[item.id]; }
function removeOriginalImage(id){ const item=recipeItems.find(candidate=>candidate.id===id); if(!item||!hasVisibleOriginal(item))return; if(!window.confirm("검수가 끝난 원본 이미지를 대시보드에서 삭제할까요?\n\n레시피 텍스트는 유지됩니다."))return; state.removedSchoolImages[id]=true;saveRemovedSchoolImages();renderDetail();showToast("원본 이미지를 삭제했습니다"); }
function favoriteSlot(id){ return state.favorites[id]||0; }
function cycleFavorite(id){ const next=(favoriteSlot(id)+1)%4; if(next)state.favorites[id]=next;else delete state.favorites[id]; saveFavorites(); showToast(next?`즐겨찾기 ${next}에 저장했습니다`:"즐겨찾기를 해제했습니다"); render(); }
function currentCollection(){ return state.view==="recipes"?recipeItems:guideItems; }
function itemKey(item,view){ return `${view}:${item.id}`; }
function starIcon(active=false){return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.7l2.84 5.76 6.36.92-4.6 4.49 1.08 6.33L12 17.21 6.32 20.2l1.08-6.33-4.6-4.49 6.36-.92L12 2.7z" ${active?'fill="currentColor"':'fill="none"'} stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;}
function formatAmount(value,unit,multiplier=1){
  if(value===null||value===undefined||value==="")return "—";
  const numeric=typeof value==="number"||(typeof value==="string"&&value.trim()!==""&&Number.isFinite(Number(value)));
  if(!numeric)return String(value);
  const amount=Number(value)*multiplier;
  return Number.isInteger(amount)?amount.toLocaleString("ko-KR"):amount.toLocaleString("ko-KR",{maximumFractionDigits:2});
}

function stepPhase(step){
  if(step?.phase==="prep"||step?.phase==="cook")return step.phase;
  // 준비 과정은 원본 레시피에서 명시적으로 분리된 경우에만 표시합니다.
  // 단계 메모의 문장에 '준비'가 들어간 것만으로 임의 분리하지 않습니다.
  return "cook";
}
function splitSteps(item){
  if(Array.isArray(item.prepSteps)||Array.isArray(item.cookSteps))return{prep:item.prepSteps||[],cook:item.cookSteps||[]};
  const prep=[],cook=[];
  (item.steps||[]).forEach(step=>(stepPhase(step)==="prep"?prep:cook).push(step));
  return{prep,cook};
}
function splitStepSentences(value){
  return String(value||"").replace(/\r\n/g,"\n").replace(/[.!?。](?=\s|[가-힣A-Za-z])/g,"$&\n").split(/\n+/).map(text=>text.trim()).filter(Boolean);
}
function conciseStepText(value){
  let text=String(value||"").replace(/^\s*[•·\-]+\s*/,"").replace(/^\s*\d+\s*[.)]?\s*/,"").replace(/[.!?。]+$/g,"").trim();
  const endings=[
    [/끓여줍니다$/,"끓이기"],[/넣어줍니다$/,"넣기"],[/부어줍니다$/,"붓기"],[/올려줍니다$/,"올리기"],[/섞어줍니다$/,"섞기"],
    [/반죽합니다$/,"반죽하기"],[/만듭니다$/,"만들기"],[/끓입니다$/,"끓이기"],[/튀깁니다$/,"튀기기"],[/섞습니다$/,"섞기"],
    [/넣습니다$/,"넣기"],[/맞춥니다$/,"맞추기"],[/다집니다$/,"다지기"],[/뺍니다$/,"빼기"],[/기록합니다$/,"기록"],[/확인합니다$/,"확인"],
    [/제거합니다$/,"제거"],[/조리합니다$/,"조리"],[/합니다$/,""],[/됩니다$/,""],[/바랍니다$/,""],[/주세요$/,"하기"]
  ];
  for(const [pattern,replacement] of endings){
    if(pattern.test(text)){text=text.replace(pattern,replacement);break;}
  }
  return text.trim();
}
function stepNotes(step,body){
  const notes=[];
  if(step?.tip)notes.push(String(step.tip).trim());
  if(step?.warning)notes.push(String(step.warning).trim());
  const inline=String(body||"").match(/(?:[·•]\s*)?(?:팁|확인|주의|TIP)\s*[:：]\s*(.+)$/i);
  if(inline){
    notes.push(inline[1].trim());
  }
  return [...new Set(notes.filter(Boolean))];
}
function stepActions(step){
  let body=String(step?.body||"").trim();
  body=body.replace(/(?:[·•]\s*)?(?:팁|확인|주의|TIP)\s*[:：]\s*.+$/i,"").trim();
  const actions=splitStepSentences(body).map(conciseStepText).filter(Boolean);
  return actions.length?actions:[conciseStepText(step?.title)||"내용을 입력하세요."];
}
function ingredientRows(item,multiplier){
  return (item.ingredients||[]).map(group=>`<tr class="ingredient-group-row"><th colspan="3">${group.group||"재료"}</th></tr>${(group.items||[]).map(i=>`<tr><td>${i[0]??"—"}</td><td class="ingredient-amount" data-value="${i[1]??""}">${formatAmount(i[1],i[2],multiplier)}</td><td>${i[2]||"—"}</td></tr>`).join("")}`).join("");
}
function renderProcessSection(title,steps,number){
  if(!steps.length)return "";
  const items=[];
  steps.forEach(step=>{
    const actions=stepActions(step),notes=stepNotes(step,step?.body);
    actions.forEach((action,index)=>items.push(`<li><span>${action}</span>${index===actions.length-1&&notes.length?`<small class="step-note">${notes.map(note=>`(※ ${note})`).join("<br>")}</small>`:""}</li>`));
  });
  return `<section class="recipe-section process-section"><div class="section-title"><div><span>${String(number).padStart(2,"0")}</span><h3>${title}</h3></div></div><ol class="simple-steps">${items.join("")}</ol></section>`;
}
function detailImages(item){
  const images=[];
  if(hasVisibleOriginal(item))images.push({src:item.originalImage,label:"원본 레시피 이미지",original:true});
  const supplemental=[...(item.images||[])];
  if(item.image&&!supplemental.includes(item.image))supplemental.push(item.image);
  supplemental.forEach((src,index)=>images.push({src,label:"이미지",original:false}));
  return images;
}

function detailNeighbors(){
  const visible=filteredItems().filter(({view})=>view===state.selectedView);
  const fallback=currentCollection().map(item=>({item,view:state.selectedView}));
  const source=visible.length?visible:fallback;
  const index=source.findIndex(({item})=>item.id===state.selected);
  return {prev:index>0?source[index-1]:null,next:index>=0&&index<source.length-1?source[index+1]:null};
}
function renderDetailNavigation(){
  const {prev,next}=detailNeighbors();
  if(!prev&&!next)return "";
  const button=(entry,direction)=>entry?`<button class="detail-nav-button" type="button" data-detail-nav="${direction}" data-id="${entry.item.id}" data-view="${entry.view}"><small>${direction==="prev"?"이전 메뉴":"다음 메뉴"}</small><b>${entry.item.name}</b><span>${direction==="prev"?"‹":"›"}</span></button>`:`<button class="detail-nav-button is-disabled" type="button" disabled><small>${direction==="prev"?"이전 메뉴":"다음 메뉴"}</small><b>없음</b><span>${direction==="prev"?"‹":"›"}</span></button>`;
  return `<nav class="detail-navigation" aria-label="메뉴 이동">${button(prev,"prev")}${button(next,"next")}</nav>`;
}
function searchableText(item){ return [item.name,item.subtitle,item.categoryLabel,item.type,item.note,...(item.tags||[]),...item.ingredients.flatMap(g=>g.items.map(i=>i[0])),...item.steps.flatMap(s=>[s.title,s.body,s.tip||"",s.warning||""])].join(" ").toLowerCase(); }

function filteredItems(){
  let source=state.query
    ? [...recipeItems.map(item=>({item,view:"recipes"})),...guideItems.map(item=>({item,view:"guides"}))]
    : currentCollection().map(item=>({item,view:state.view}));
  if(!state.query&&state.category!=="all"){
    if(state.category.startsWith("favorite")){ const slot=Number(state.category.slice(-1)); source=source.filter(({item,view})=>favoriteSlot(itemKey(item,view))===slot); }
    else source=source.filter(({item})=>item.category===state.category);
  }
  if(state.query)source=source.filter(({item})=>searchableText(item).includes(state.query.toLowerCase()));
  return source.sort((a,b)=>state.sortDesc?b.item.updated.localeCompare(a.item.updated):a.item.name.localeCompare(b.item.name,"ko"));
}

function renderCategories(){
  const source=state.view==="recipes"?recipeItems:guideItems;
  $("#categoryTitle").textContent=state.view==="recipes"?"레시피 카테고리":"조리 가이드 분류";
  $("#categoryList").innerHTML=categories[state.view].map((cat,index)=>{
    let count=cat.id==="all"?source.length:cat.favorite?source.filter(item=>favoriteSlot(itemKey(item,"recipes"))===Number(cat.id.slice(-1))).length:source.filter(item=>item.category===cat.id).length;
    return `${cat.favorite&&index===categories[state.view].findIndex(c=>c.favorite)?'<div class="category-divider"></div>':""}<button class="category-link ${state.category===cat.id?"is-active":""}" data-category="${cat.id}"><span class="${cat.favorite?"favorite-dot":""}" style="--dot:${cat.color}">${cat.favorite?"★":""}</span><em>${cat.label}</em><b>${count}</b></button>`;
  }).join("");
  $$("[data-category]").forEach(button=>button.addEventListener("click",()=>{const panelWasOpen=$("#sidebar").classList.contains("is-open"),wasDetail=state.detailOpen;state.category=button.dataset.category;state.query="";state.listFocusId=null;state.detailOpen=false;$("#searchInput").value="";const first=filteredItems()[0];if(first){state.selected=first.item.id;state.selectedView=first.view;}render();closeSidebarVisual();writeHistory("list",panelWasOpen||wasDetail?"replace":"push");}));
}

function renderHeader(){
  const recipeMode=state.view==="recipes";
  const selectedCategory=categories[state.view].find(category=>category.id===state.category);
  $("#pageEyebrow").textContent=recipeMode?"MY RECIPE ARCHIVE":"STAFF COOKING GUIDE";
  $("#pageTitle").textContent=state.query?"통합 검색 결과":(selectedCategory?.label||(recipeMode?"전체 레시피":"전체 조리 가이드"));
  $("#pageDescription").textContent=recipeMode&&state.category==="store"?"배합과 공정, 문제점과 개선 이력을 버전별로 관리합니다.":recipeMode?"가게 레시피부터 새로 알게 된 조리법까지 차곡차곡 기록합니다.":"직원용 표준 조리법과 손님용 포장 조리 안내를 관리합니다.";
  $("#filterTitle b").textContent=recipeMode?"레시피 리스트":"조리 가이드 리스트";
  $("#newRecipeButton").lastChild.textContent=recipeMode?" 새 레시피":" 새 조리 가이드";
  $("#recipeCount").textContent=recipeItems.length;$("#guideCount").textContent=guideItems.length;
}

function renderList(){
  const visible=filteredItems();$("#visibleCount").textContent=`${visible.length}개`;$("#emptyState").hidden=visible.length>0;
  listEl.innerHTML=visible.map(({item,view})=>{
    const isRecipe=view==="recipes",key=itemKey(item,view),fav=favoriteSlot(key);
    return `<article class="recipe-card ${state.selected===item.id&&state.selectedView===view?"is-active":""} ${isRecipe?"text-card":""}" data-id="${item.id}" data-library="${view}" role="button" tabindex="0">
      ${isRecipe?"":`<span class="card-image"><img src="${item.image}" alt=""><i class="status-dot ${item.statusTone}"></i></span>`}
      ${isRecipe?`<span class="recipe-row-copy"><b>${item.name}</b></span><span class="card-favorite fav-${fav}" data-favorite="${key}" role="button" tabindex="0" aria-label="${fav?`즐겨찾기 ${fav}`:"즐겨찾기 꺼짐"}" title="클릭할 때마다 노랑, 주황, 빨강, 꺼짐으로 변경">${starIcon(Boolean(fav))}</span>`:`<span class="card-copy"><small>${item.categoryLabel}</small><b>${item.name}</b><em>${item.subtitle}</em><span><mark>${item.version}</mark> ${item.updated} 수정</span></span>`}
      <span class="card-arrow">›</span>
    </article>`;
  }).join("");
  $$(".recipe-card").forEach(card=>{const open=()=>{const replacingDetail=state.detailOpen&&history.state?.app===APP_HISTORY_KEY&&history.state?.ui==="detail";const listScrollY=replacingDetail?state.listScrollY:window.scrollY;state.listScrollY=listScrollY;state.selected=card.dataset.id;state.selectedView=card.dataset.library;state.listFocusId=card.dataset.id;state.detailOpen=true;state.multiplier=1;if(!replacingDetail)history.replaceState(navigationState("list",{scrollY:listScrollY}),"",location.href);render();if(innerWidth<768){document.body.classList.add("mobile-detail-open");scrollTo({top:0,behavior:"instant"});}writeHistory("detail",replacingDetail?"replace":"push",{scrollY:0});};card.addEventListener("click",open);card.addEventListener("keydown",event=>{if(event.target===card&&["Enter"," "].includes(event.key)){event.preventDefault();open();}});});
  $$("[data-favorite]").forEach(button=>{const activate=event=>{event.stopPropagation();if(event.type==="keydown"&&!['Enter',' '].includes(event.key))return;event.preventDefault();cycleFavorite(button.dataset.favorite);};button.addEventListener("click",activate);button.addEventListener("keydown",activate);});
}

function selectedItem(){ const source=state.selectedView==="recipes"?recipeItems:guideItems;return source.find(item=>item.id===state.selected)||filteredItems()[0]?.item||currentCollection()[0]; }
function legacyRenderDetail(){
  const item=selectedItem(),isRecipe=state.selectedView==="recipes",key=itemKey(item,state.selectedView),fav=favoriteSlot(key),hasImages=isRecipe&&item.images?.length,showOriginal=hasVisibleOriginal(item);
  detailEl.classList.toggle("is-text-recipe",isRecipe&&!hasImages);
  detailEl.innerHTML=`<div class="mobile-detail-bar"><button id="mobileBack" aria-label="목록으로 돌아가기">‹</button><b>${item.name}</b><button id="mobileMore" aria-label="더보기">•••</button></div>
    ${hasImages?`<div class="detail-hero"><img src="${item.images[0]}" alt="${item.name}"><div class="hero-shade"></div>${heroCopy(item)}</div>`:isRecipe?`<div class="text-hero">${heroCopy(item,true)}</div>`:`<div class="detail-hero"><img src="${item.image}" alt="${item.name}"><div class="hero-shade"></div>${heroCopy(item)}</div>`}
    ${showOriginal?`<section class="original-image-panel"><div class="original-image-head"><div><b>원본 레시피 이미지</b><small>${item.originalPattern||"원본 자료"} · 더블체크 후 삭제 가능</small></div><button id="removeOriginalImage" type="button">이미지 삭제</button></div><img src="${item.originalImage}" alt="${item.name} 원본 레시피 이미지" loading="lazy"></section>`:""}
    ${isRecipe?`<button class="favorite fav-${fav}" id="favoriteButton" aria-label="${fav?`즐겨찾기 ${fav}`:"즐겨찾기 꺼짐"}" title="클릭할 때마다 노랑, 주황, 빨강, 꺼짐으로 변경">${starIcon(Boolean(fav))}</button>`:""}
    <div class="detail-toolbar"><div class="version-picker"><label for="versionSelect">${isRecipe?"레시피":"가이드"} 버전</label><select id="versionSelect">${item.versions.map(v=>`<option>${v.id} · ${v.date}</option>`).join("")}</select></div><button class="history-button" id="historyButton">버전 기록 <span>${item.versions.length}</span></button></div>
    <div class="quick-facts"><div><span>◷</span><small>준비 시간</small><b>${item.prep}</b></div><div><span>♨</span><small>${isRecipe?"조리·숙성":"조리 시간"}</small><b>${item.cook}</b></div><div><span>◎</span><small>기준 분량</small><b>${item.yield}</b></div></div>
    <div class="detail-body"><section class="recipe-section"><div class="section-title"><div><span>01</span><h3>${isRecipe?"재료와 계량":"준비 재료"}</h3></div><div class="batch-control"><button data-batch="0.5">½배</button><button data-batch="1" class="is-active">1배</button><button data-batch="2">2배</button><button data-batch="3">3배</button></div></div><div class="ingredient-groups">${item.ingredients.map(group=>`<div class="ingredient-group"><h4>${group.group}</h4><ul>${group.items.map(i=>`<li><span>${i[0]}</span><b data-value="${i[1]}" data-unit="${i[2]}">${formatAmount(i[1],i[2],1)}</b></li>`).join("")}</ul></div>`).join("")}</div></section>
    <section class="recipe-section"><div class="section-title"><div><span>02</span><h3>${isRecipe?"만드는 순서":item.category==="customer"?"집에서 조리하는 방법":"표준 조리 순서"}</h3></div></div><ol class="steps ${item.category==="customer"?"customer-steps":""}">${item.steps.map((step,index)=>`<li><span class="step-number">${String(index+1).padStart(2,"0")}</span><div>${item.category==="customer"?`<div class="step-photo-slot"><span>▧</span><small>${step.image?"조리 과정 사진":"실제 조리 사진 등록"}</small></div>`:""}<div class="step-heading"><h4>${step.title}</h4><small>${step.time}</small></div><p>${step.body}</p>${step.tip?`<aside class="tip"><b>팁</b>${step.tip}</aside>`:""}${step.warning?`<aside class="warning"><b>확인</b>${step.warning}</aside>`:""}</div></li>`).join("")}</ol></section>
    ${isRecipe?`<section class="optional-photo"><span>▧</span><div><b>이미지</b><p>기본은 텍스트로 관리하고, 반죽 상태나 완성 기준처럼 필요한 경우에만 이미지를 등록합니다.</p></div><button id="photoInfo">이미지 추가</button></section>`:""}
    <section class="kitchen-note"><span>✎</span><div><small>${isRecipe?"개선·실험 메모":"직원용 확인 메모"}</small><p>${item.note}</p></div><button id="copyNote">복사</button></section><p class="sample-warning">※ 현재 계량과 내용은 UI 검토용 더미 데이터입니다.</p></div>
    <div class="version-panel" id="versionPanel" hidden><div class="version-panel-head"><h3>${item.name} 변경 기록</h3><button id="closeHistory">×</button></div><ul>${item.versions.map((v,index)=>`<li><span>${v.id}</span><div><b>${v.note}</b><small>${v.date}${index===0?" · 현재 버전":""}</small></div></li>`).join("")}</ul></div>`;
  bindDetail(item,key);
}
function heroCopy(item,text=false){ return `<div class="${text?"text-hero-copy":"detail-hero-copy"}">${text?"":`<div class="detail-meta"><span>${item.type||item.categoryLabel}</span><i>·</i><span class="live-status ${item.statusTone}"><b></b>${item.status}</span></div>`}<h2>${item.name}</h2><p>${item.subtitle}</p></div>`; }
function legacyBindDetail(item,key){
  $$("[data-batch]").forEach(button=>button.addEventListener("click",()=>{state.multiplier=Number(button.dataset.batch);$$("[data-batch]").forEach(b=>b.classList.toggle("is-active",b===button));$$("[data-value]").forEach(el=>el.textContent=formatAmount(Number(el.dataset.value),el.dataset.unit,state.multiplier));}));
  $("#historyButton").addEventListener("click",()=>$("#versionPanel").hidden=false);$("#closeHistory").addEventListener("click",()=>$("#versionPanel").hidden=true);$("#favoriteButton")?.addEventListener("click",()=>cycleFavorite(key));
  $("#mobileBack").addEventListener("click",()=>history.back());$("#mobileMore").addEventListener("click",()=>showToast("공유·인쇄 메뉴를 준비하고 있어요"));
  $("#copyNote").addEventListener("click",async()=>{await navigator.clipboard?.writeText(item.note);showToast("메모를 복사했습니다");});$("#photoInfo")?.addEventListener("click",()=>showToast("실제 입력 기능은 다음 단계에서 연결합니다"));$("#removeOriginalImage")?.addEventListener("click",()=>removeOriginalImage(item.id));
}

// Standard recipe detail layout. Every recipe and guide follows the same order:
// title → version → ingredients → processes → detail images.
function renderDetail(){
  const item=selectedItem(),isRecipe=state.selectedView==="recipes",key=itemKey(item,state.selectedView),fav=favoriteSlot(key),steps=splitSteps(item),images=detailImages(item),aiPending=item.category==="school"&&!item.originalChecked,displaySubtitle=aiPending?"원본 이미지 AI 판독 대기 · 상세 검수 필요":item.subtitle||"";
  const batchValues=[0.5,1,1.5,2,3,4,5,6,7,8,9,10];
  const multiplierOptions=batchValues.map(value=>`<option value="${value}" ${state.multiplier===value?"selected":""}>${value===0.5?"½":value}배</option>`).join("");
  const processNumber=steps.prep.length?3:2;
  const imageNumber=processNumber+(steps.cook.length?1:0);
  const pendingIngredients=`<tr><td colspan="3" class="ai-pending">원본 이미지 기준 AI 판독 대기<br><small>확정 전 OCR 초안은 표시하지 않습니다.</small></td></tr>`;
  const pendingProcess=`<section class="recipe-section process-section"><div class="section-title"><div><span>02</span><h3>조리 과정</h3></div></div><p class="ai-pending">원본 이미지를 대조해 재료와 조리 순서를 확정하는 중입니다.</p></section>`;
  detailEl.classList.add("standard-detail");
  detailEl.innerHTML=`<div class="mobile-detail-bar"><button id="mobileBack" aria-label="목록으로 돌아가기">‹</button><b>${item.name}</b><button id="mobileMore" aria-label="더보기">•••</button></div>
    <header class="detail-title-block"><p>${item.categoryLabel||"레시피"}</p><h2>${item.name}</h2><span>${displaySubtitle}</span></header>
    ${isRecipe?`<button class="favorite fav-${fav}" id="favoriteButton" aria-label="${fav?`즐겨찾기 ${fav}`:"즐겨찾기 꺼짐"}" title="클릭할 때마다 노랑, 주황, 빨강, 꺼짐으로 변경">${starIcon(Boolean(fav))}</button>`:""}
    <div class="detail-toolbar"><div class="version-picker"><label for="versionSelect">버전</label><select id="versionSelect">${(item.versions||[]).map(v=>`<option value="${v.id}">${v.id} · ${v.date}</option>`).join("")}</select></div><button class="history-button" id="historyButton">버전 기록 <span>${(item.versions||[]).length}</span></button></div>
    <div class="detail-body"><section class="recipe-section ingredient-section"><div class="section-title"><div><span>01</span><h3>재료와 계량</h3></div><label class="batch-select" for="batchSelect"><span>배율</span><select id="batchSelect">${multiplierOptions}</select></label></div><div class="ingredient-table-wrap"><table class="ingredient-table"><thead><tr><th scope="col">재료명</th><th scope="col">계량</th><th scope="col">단위</th></tr></thead><tbody>${aiPending?pendingIngredients:ingredientRows(item,state.multiplier)}</tbody></table></div></section>
    ${aiPending?pendingProcess:`${renderProcessSection("준비 과정",steps.prep,2)}${renderProcessSection("조리 과정",steps.cook,processNumber)}`}
    ${images.length?`<section class="recipe-section detail-images-section"><div class="section-title"><div><span>${String(imageNumber).padStart(2,"0")}</span><h3>이미지</h3></div></div><div class="detail-images">${images.map(image=>`<figure class="detail-image-card"><div class="detail-image-head"><figcaption>${image.label}</figcaption>${image.original?`<button id="removeOriginalImage" type="button">이미지 삭제</button>`:""}</div><img src="${image.src}" alt="${item.name} ${image.label}" loading="lazy"></figure>`).join("")}</div></section>`:""}${renderDetailNavigation()}<p class="sample-warning">※ 레시피 내용은 버전별로 기록하고, 실제 검수 후 확정합니다.</p></div>
    <div class="version-panel" id="versionPanel" hidden><div class="version-panel-head"><h3>${item.name} 변경 기록</h3><button id="closeHistory">×</button></div><ul>${(item.versions||[]).map((v,index)=>`<li><span>${v.id}</span><div><b>${v.note}</b><small>${v.date}${index===0?" · 현재 버전":""}</small></div></li>`).join("")}</ul></div>`;
  bindDetail(item,key);
}
function bindDetail(item,key){
  $("#batchSelect")?.addEventListener("change",event=>{state.multiplier=Number(event.target.value);$$("[data-value]").forEach(el=>{const row=el.closest("tr");const unit=row?.querySelector("td:last-child")?.textContent||"";el.textContent=formatAmount(el.dataset.value,unit,state.multiplier);});});
  $("#historyButton").addEventListener("click",()=>$("#versionPanel").hidden=false);$("#closeHistory").addEventListener("click",()=>$("#versionPanel").hidden=true);$("#favoriteButton")?.addEventListener("click",()=>cycleFavorite(key));
  $("#mobileBack").addEventListener("click",()=>history.back());$("#mobileMore").addEventListener("click",()=>showToast("공유·인쇄 메뉴를 준비하고 있어요"));
  $("#removeOriginalImage")?.addEventListener("click",()=>removeOriginalImage(item.id));
  $$('[data-detail-nav]').forEach(button=>button.addEventListener("click",()=>navigateDetail(button.dataset.id,button.dataset.view)));
}

function navigateDetail(id,view){
  if(!id)return;
  const replacingDetail=state.detailOpen&&history.state?.app===APP_HISTORY_KEY&&history.state?.ui==="detail";
  if(!replacingDetail)history.replaceState(navigationState("list",{scrollY:state.listScrollY}),"",location.href);
  state.selected=id;state.selectedView=view||state.selectedView;state.listFocusId=id;state.detailOpen=true;state.multiplier=1;
  render();
  if(innerWidth<768)document.body.classList.add("mobile-detail-open");
  scrollTo({top:0,behavior:"instant"});
  // 이전·다음 이동은 상세 히스토리를 새로 쌓지 않고 현재 항목을 교체합니다.
  // 따라서 여러 메뉴를 연속 이동해도 백키 한 번이면 목록으로 돌아갑니다.
  writeHistory("detail",replacingDetail?"replace":"push",{scrollY:0});
}

function navigationState(ui="list",extra={}){return{app:APP_HISTORY_KEY,ui,view:state.view,category:state.category,selected:state.selected,selectedView:state.selectedView,scrollY:extra.scrollY??state.listScrollY??0};}
function writeHistory(ui,mode="push",extra={}){history[mode==="replace"?"replaceState":"pushState"](navigationState(ui,extra),"",location.href);}
function showExitConfirm(){exitModalEl.hidden=false;requestAnimationFrame(()=>$("#exitCancel").focus());}
function cancelExit(){exitModalEl.hidden=true;history.replaceState(navigationState("list"),"",location.href);}
function confirmExit(){exitModalEl.hidden=true;exitConfirmed=true;history.back();}
function restoreHistory(nav){
  if(!nav)return;
  const returningFromDetail=nav.ui==="list"&&state.detailOpen;
  const returnId=returningFromDetail?(state.listFocusId||state.selected):null;
  const targetScroll=nav.ui==="list"?Math.max(0,Number(nav.scrollY)||0):0;
  state.listScrollY=targetScroll;
  closeSidebarVisual();document.body.classList.remove("mobile-detail-open");$("#modal").hidden=true;
  if(nav.view==="lab")openLab(false);
  else{state.view=nav.view||"recipes";state.category=nav.category|| (state.view==="recipes"?"store":"all");state.selected=returnId||nav.selected||currentCollection()[0].id;state.selectedView=returningFromDetail?state.selectedView:(nav.selectedView||state.view);state.listFocusId=returningFromDetail?state.selected:null;state.detailOpen=nav.ui==="detail";state.query="";$("#searchInput").value="";$("#searchInput").disabled=false;$("#archiveView").hidden=false;$("#labView").hidden=true;render();if(nav.ui==="detail"&&innerWidth<768)document.body.classList.add("mobile-detail-open");}
  if(nav.ui==="sidebar")openSidebarVisual();
  requestAnimationFrame(()=>requestAnimationFrame(()=>{scrollTo({top:targetScroll,behavior:"instant"});if(returningFromDetail)focusListCard(returnId);}));
}
function focusListCard(id){
  if(!id)return;
  const card=$$(".recipe-card").find(candidate=>candidate.dataset.id===id);
  if(!card)return;
  card.classList.add("is-return-target");
  card.focus({preventScroll:true});
  clearTimeout(focusListCard.timer);
  focusListCard.timer=setTimeout(()=>card.classList.remove("is-return-target"),1800);
}
function openSidebarVisual(){$("#sidebar").classList.add("is-open");document.body.classList.add("sidebar-open");}
function closeSidebarVisual(){$("#sidebar").classList.remove("is-open");document.body.classList.remove("sidebar-open");}
function rememberListScroll(){if(innerWidth<768&&!document.body.classList.contains("mobile-detail-open")){state.listScrollY=window.scrollY;if(history.state?.app===APP_HISTORY_KEY)history.replaceState(navigationState(history.state.ui||"list",{scrollY:state.listScrollY}),"",location.href);}}
function toggleSidebar(){if($("#sidebar").classList.contains("is-open")){closeSidebarVisual();history.back();}else{rememberListScroll();openSidebarVisual();writeHistory("sidebar","push",{scrollY:state.listScrollY});}}
function switchView(view,record=true){
  if(view==="lab"){openLab(record);return;}
  const wasDetail=state.detailOpen;
  state.view=view;state.selectedView=view;state.category=view==="recipes"?"store":"all";state.query="";state.listFocusId=null;state.detailOpen=false;$("#searchInput").value="";$("#searchInput").disabled=false;$("#searchInput").placeholder="레시피·재료·조리법 통합 검색";state.selected=currentCollection()[0].id;document.body.classList.remove("mobile-detail-open");$("#archiveView").hidden=false;$("#labView").hidden=true;$$('[data-view]').forEach(b=>b.classList.toggle("is-active",b.dataset.view===view));$$('[data-mobile-view]').forEach(b=>b.classList.toggle("is-active",b.dataset.mobileView===view));render();
  if(record)writeHistory("list",wasDetail?"replace":"push");
}
function openLab(record=true){const wasDetail=state.detailOpen;state.view="lab";state.detailOpen=false;state.listFocusId=null;document.body.classList.remove("mobile-detail-open");$("#archiveView").hidden=true;$("#labView").hidden=false;$("#pageEyebrow").textContent="AI KITCHEN LAB";$("#pageTitle").textContent="함께 연구하고, 기록하다";$("#pageDescription").textContent="레시피 개선부터 신메뉴 테스트 계획서까지 한 흐름으로 관리합니다.";$("#newRecipeButton").lastChild.textContent=" 새 개발 계획";$("#searchInput").value="";$("#searchInput").disabled=true;$("#searchInput").placeholder="개발실에서는 검색을 사용하지 않습니다";$("#categoryTitle").textContent="메뉴 개발 도구";$("#categoryList").innerHTML='<button class="category-link is-active"><span style="--dot:#eb5d43"></span><em>개발실 홈</em></button><button class="category-link"><span style="--dot:#5b9a81"></span><em>진행 중 테스트</em></button><button class="category-link"><span style="--dot:#826eb4"></span><em>완료된 계획서</em></button>';$$('[data-view]').forEach(b=>b.classList.toggle("is-active",b.dataset.view==="lab"));$$('[data-mobile-view]').forEach(b=>b.classList.toggle("is-active",b.dataset.mobileView==="lab"));if(record)writeHistory("lab",wasDetail?"replace":"push");}
function render(){renderCategories();renderHeader();renderList();renderDetail();}
function showToast(message){toastEl.textContent=message;toastEl.classList.add("is-visible");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toastEl.classList.remove("is-visible"),2200);}

$("#searchInput").placeholder="레시피·재료·조리법 통합 검색";$("#searchInput").addEventListener("input",event=>{state.query=event.target.value.trim();renderHeader();renderList();});$("#sortButton").addEventListener("click",event=>{state.sortDesc=!state.sortDesc;event.currentTarget.firstChild.textContent=state.sortDesc?"최근 수정순 ":"이름순 ";renderList();});
$("#printButton").addEventListener("click",()=>print());$("#menuButton").addEventListener("click",toggleSidebar);$("#newRecipeButton").addEventListener("click",()=>$("#modal").hidden=false);$("#modalClose").addEventListener("click",()=>$("#modal").hidden=true);$("#modalOkay").addEventListener("click",()=>$("#modal").hidden=true);$("#modal").addEventListener("click",event=>{if(event.target===event.currentTarget)event.currentTarget.hidden=true;});
$$('[data-view]').forEach(button=>button.addEventListener("click",()=>{const fromPanel=$("#sidebar").classList.contains("is-open");switchView(button.dataset.view,!fromPanel);if(fromPanel){closeSidebarVisual();writeHistory(button.dataset.view==="lab"?"lab":"list","replace");}}));$$('[data-mobile-view]').forEach(button=>button.addEventListener("click",()=>switchView(button.dataset.mobileView)));$("[data-mobile-menu]")?.addEventListener("click",toggleSidebar);$("#sidebarBackdrop").addEventListener("click",()=>{closeSidebarVisual();history.back();});$$('[data-lab-action]').forEach(button=>button.addEventListener("click",()=>showToast("실제 레시피 입력 후 AI 개발 기능을 연결합니다")));
$("#exitCancel").addEventListener("click",cancelExit);$("#exitConfirm").addEventListener("click",confirmExit);exitModalEl.addEventListener("click",event=>{if(event.target===exitModalEl)cancelExit();});
window.addEventListener("popstate",event=>{if(event.state?.exitGuard){if(exitConfirmed){exitConfirmed=false;history.back();return;}history.pushState({app:APP_HISTORY_KEY,ui:"exit-prompt"},"",location.href);showExitConfirm();return;}if(event.state?.ui==="exit-prompt"){showExitConfirm();return;}exitModalEl.hidden=true;restoreHistory(event.state);});document.addEventListener("keydown",event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();$("#searchInput").focus();}if(event.key==="Escape"){if(!exitModalEl.hidden)cancelExit();else if($("#sidebar").classList.contains("is-open")||document.body.classList.contains("mobile-detail-open"))history.back();else $("#modal").hidden=true;}});$("#today").textContent=new Intl.DateTimeFormat("ko-KR",{month:"long",day:"numeric",weekday:"short"}).format(new Date());render();if(history.state?.app===APP_HISTORY_KEY&&!history.state.exitGuard){restoreHistory(history.state);if(history.state.ui==="exit-prompt")showExitConfirm();}else{history.replaceState({app:APP_HISTORY_KEY,exitGuard:true},"",location.href);history.pushState(navigationState("list"),"",location.href);}
