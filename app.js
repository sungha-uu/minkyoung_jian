const recipes = window.RECIPE_DATA;
const state = { selected: recipes[0].id, category: "all", query: "", multiplier: 1, sortDesc: true };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const listEl = $("#recipeList");
const detailEl = $("#recipeDetail");
const toastEl = $("#toast");

const formatAmount = (value, unit, multiplier) => {
  const amount = value * multiplier;
  const formatted = Number.isInteger(amount) ? amount.toLocaleString("ko-KR") : amount.toLocaleString("ko-KR", { maximumFractionDigits: 1 });
  return `${formatted}${unit}`;
};

function filteredRecipes() {
  return recipes
    .filter((recipe) => state.category === "all" || recipe.category === state.category)
    .filter((recipe) => {
      const haystack = [recipe.name, recipe.subtitle, recipe.categoryLabel, ...recipe.ingredients.flatMap((group) => group.items.map((item) => item[0]))].join(" ").toLowerCase();
      return haystack.includes(state.query.toLowerCase());
    })
    .sort((a, b) => state.sortDesc ? b.updated.localeCompare(a.updated) : a.name.localeCompare(b.name, "ko"));
}

function renderList() {
  const visible = filteredRecipes();
  $("#visibleCount").textContent = `${visible.length}개`;
  $("#recipeCount").textContent = recipes.length;
  $("#emptyState").hidden = visible.length > 0;
  listEl.innerHTML = visible.map((recipe) => `
    <button class="recipe-card ${state.selected === recipe.id ? "is-active" : ""}" data-id="${recipe.id}">
      <span class="card-image"><img src="${recipe.image}" alt=""><i class="status-dot ${recipe.statusTone}"></i></span>
      <span class="card-copy"><small>${recipe.categoryLabel}</small><b>${recipe.name}</b><em>${recipe.subtitle}</em><span><mark>${recipe.version}</mark> ${recipe.updated} 수정</span></span>
      <span class="card-arrow">›</span>
    </button>
  `).join("");
  $$(".recipe-card").forEach((card) => card.addEventListener("click", () => {
    state.selected = card.dataset.id;
    state.multiplier = 1;
    render();
    if (window.innerWidth < 768) {
      document.body.classList.add("mobile-detail-open");
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (window.innerWidth < 980) detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}

function renderDetail() {
  const recipe = recipes.find((item) => item.id === state.selected) || filteredRecipes()[0] || recipes[0];
  state.selected = recipe.id;
  detailEl.innerHTML = `
    <div class="mobile-detail-bar"><button id="mobileBack" aria-label="목록으로 돌아가기">‹</button><b>${recipe.name}</b><button id="mobileMore" aria-label="더보기">•••</button></div>
    <div class="detail-hero">
      <img src="${recipe.image}" alt="${recipe.name}">
      <div class="hero-shade"></div>
      <div class="detail-hero-copy">
        <div class="detail-meta"><span>${recipe.categoryLabel}</span><i>·</i><span class="live-status ${recipe.statusTone}"><b></b>${recipe.status}</span></div>
        <h2>${recipe.name}</h2><p>${recipe.subtitle}</p>
      </div>
      <button class="favorite" aria-label="즐겨찾기" title="즐겨찾기">♡</button>
    </div>
    <div class="detail-toolbar">
      <div class="version-picker">
        <label for="versionSelect">레시피 버전</label>
        <select id="versionSelect">${recipe.versions.map((version) => `<option>${version.id} · ${version.date}</option>`).join("")}</select>
      </div>
      <button class="history-button" id="historyButton">버전 기록 <span>${recipe.versions.length}</span></button>
    </div>
    <div class="quick-facts">
      <div><span>◷</span><small>준비 시간</small><b>${recipe.prep}</b></div>
      <div><span>♨</span><small>조리 시간</small><b>${recipe.cook}</b></div>
      <div><span>◎</span><small>기준 분량</small><b>${recipe.yield}</b></div>
    </div>
    <div class="detail-body">
      <section class="recipe-section">
        <div class="section-title"><div><span>01</span><h3>재료와 계량</h3></div><div class="batch-control"><button data-batch="0.5">½배</button><button data-batch="1" class="is-active">1배</button><button data-batch="2">2배</button><button data-batch="3">3배</button></div></div>
        <div class="ingredient-groups">${recipe.ingredients.map((group) => `<div class="ingredient-group"><h4>${group.group}</h4><ul>${group.items.map((item) => `<li><span>${item[0]}</span><b data-value="${item[1]}" data-unit="${item[2]}">${formatAmount(item[1], item[2], state.multiplier)}</b></li>`).join("")}</ul></div>`).join("")}</div>
      </section>
      <section class="recipe-section">
        <div class="section-title"><div><span>02</span><h3>조리 순서</h3></div></div>
        <ol class="steps">${recipe.steps.map((step, index) => `<li><span class="step-number">${String(index + 1).padStart(2, "0")}</span><div><div class="step-heading"><h4>${step.title}</h4><small>${step.time}</small></div><p>${step.body}</p>${step.tip ? `<aside class="tip"><b>꾼의 팁</b>${step.tip}</aside>` : ""}${step.warning ? `<aside class="warning"><b>확인</b>${step.warning}</aside>` : ""}</div></li>`).join("")}</ol>
      </section>
      <section class="kitchen-note"><span>✎</span><div><small>개선 메모</small><p>${recipe.note}</p></div><button id="copyNote">복사</button></section>
      <p class="sample-warning">※ 현재 모든 계량과 조리 내용은 UI 검토용 더미 데이터이며 실제 영업용 레시피가 아닙니다.</p>
    </div>
    <div class="version-panel" id="versionPanel" hidden>
      <div class="version-panel-head"><h3>${recipe.name} 변경 기록</h3><button id="closeHistory">×</button></div>
      <ul>${recipe.versions.map((version, index) => `<li><span>${version.id}</span><div><b>${version.note}</b><small>${version.date}${index === 0 ? " · 현재 버전" : ""}</small></div></li>`).join("")}</ul>
    </div>`;

  $$("[data-batch]").forEach((button) => button.addEventListener("click", () => {
    state.multiplier = Number(button.dataset.batch);
    $$("[data-batch]").forEach((item) => item.classList.toggle("is-active", item === button));
    $$('[data-value]').forEach((item) => item.textContent = formatAmount(Number(item.dataset.value), item.dataset.unit, state.multiplier));
  }));
  $("#historyButton").addEventListener("click", () => $("#versionPanel").hidden = false);
  $("#closeHistory").addEventListener("click", () => $("#versionPanel").hidden = true);
  $("#versionSelect").addEventListener("change", (event) => showToast(`${event.target.value.split(" · ")[0]} 기록을 선택했습니다`));
  $(".favorite").addEventListener("click", (event) => { event.currentTarget.classList.toggle("is-active"); event.currentTarget.textContent = event.currentTarget.classList.contains("is-active") ? "♥" : "♡"; });
  $("#copyNote").addEventListener("click", async () => { await navigator.clipboard?.writeText(recipe.note); showToast("개선 메모를 복사했습니다"); });
  $("#mobileBack").addEventListener("click", () => { document.body.classList.remove("mobile-detail-open"); window.scrollTo({ top: 0, behavior: "instant" }); });
  $("#mobileMore").addEventListener("click", () => showToast("인쇄와 공유 기능을 준비하고 있어요"));
}

function render() { renderList(); renderDetail(); }
function showToast(message) { toastEl.textContent = message; toastEl.classList.add("is-visible"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200); }

$$('[data-category]').forEach((button) => button.addEventListener("click", () => {
  state.category = button.dataset.category;
  $$("[data-category]").forEach((item) => item.classList.toggle("is-active", item === button));
  $("#filterTitle b").textContent = button.textContent.trim();
  renderList();
}));

$("#searchInput").addEventListener("input", (event) => { state.query = event.target.value.trim(); renderList(); });
$("#sortButton").addEventListener("click", (event) => { state.sortDesc = !state.sortDesc; event.currentTarget.firstChild.textContent = state.sortDesc ? "최근 수정순 " : "이름순 "; renderList(); });
$("#printButton").addEventListener("click", () => window.print());
$("#menuButton").addEventListener("click", () => $("#sidebar").classList.toggle("is-open"));
$("#newRecipeButton").addEventListener("click", () => $("#modal").hidden = false);
$("#modalClose").addEventListener("click", () => $("#modal").hidden = true);
$("#modalOkay").addEventListener("click", () => $("#modal").hidden = true);
$("#modal").addEventListener("click", (event) => { if (event.target === event.currentTarget) event.currentTarget.hidden = true; });
$$('[data-view]').forEach((button) => button.addEventListener("click", () => { if (button.dataset.view !== "recipes") showToast("UI 확정 후 다음 단계에서 열립니다"); }));
document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#searchInput").focus(); } if (event.key === "Escape") $("#modal").hidden = true; });
$$("[data-mobile-toast]").forEach((button) => button.addEventListener("click", () => showToast("UI 확정 후 다음 단계에서 열립니다")));
$("[data-mobile-menu]").addEventListener("click", () => $("#sidebar").classList.toggle("is-open"));

$("#today").textContent = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date());
render();
