import fs from "node:fs";
import path from "node:path";

const [manifestPath, outputPath] = process.argv.slice(2);
if (!manifestPath || !outputPath) {
  console.error("Usage: node scripts/build-school-data.mjs <manifest.json> <school-data.js>");
  process.exit(1);
}

const records = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const today = "2026.09.20";

function cleanLine(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^[>|•·\-_=~\s]+|[|\s]+$/g, "")
    .trim();
}

function cleanText(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .split("\n")
    .map(cleanLine)
    .filter(Boolean)
    .join("\n");
}

function chooseText(record) {
  const six = cleanText(record.ocr6);
  const eleven = cleanText(record.ocr11);
  return eleven.length > six.length * 1.15 ? eleven : six;
}

function normalizeHeading(value) {
  return cleanLine(value)
    .replace(/준비\s*과절/g, "준비과정")
    .replace(/조리\s*과절/g, "조리과정")
    .replace(/서비\s*스\s*과정/g, "서비스과정")
    .replace(/조리\s*방법/g, "조리방법");
}

function splitSections(text) {
  const headingPattern = /(준비\s*과정|조리\s*과정|서비스\s*과정|조리법|조리방법|조리\s*순서|만드는\s*법|재료|육수\s*재료|소스\s*재료|만드는\s*TIP|만드는\s*Tip)/i;
  const sections = [];
  let current = { title: "원본 판독 내용", lines: [] };
  for (const raw of text.split("\n")) {
    const line = cleanLine(raw);
    if (!line) continue;
    const match = line.match(headingPattern);
    if (match && (line.length < 36 || match.index < 5)) {
      if (current.lines.length) sections.push(current);
      current = { title: normalizeHeading(match[0]), lines: [] };
      const remainder = cleanLine(line.slice((match.index || 0) + match[0].length));
      if (remainder) current.lines.push(remainder);
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.length) sections.push(current);
  return sections.length ? sections : [{ title: "원본 판독 내용", lines: ["원본 이미지에서 텍스트를 확인하세요."] }];
}

function splitSteps(section) {
  const startsStep = line => /^(?:\d+(?:[-.]\d*)?[.)]?|[①-⑳]|\([0-9]+\))\s*/.test(line);
  const groups = [];
  let current = [];
  for (const line of section.lines) {
    if (startsStep(line) && current.length) {
      groups.push(current.join(" "));
      current = [];
    }
    current.push(line);
  }
  if (current.length) groups.push(current.join(" "));
  return groups.flatMap(body => {
    if (body.length <= 900) return [body];
    const chunks = [];
    for (let i = 0; i < body.length; i += 850) chunks.push(body.slice(i, i + 850));
    return chunks;
  });
}

function isIngredientLine(line, ingredientMode) {
  if (line.length < 2 || line.length > 110) return false;
  if (/^(?:\d+(?:[-.]\d*)?[.)]?|[①-⑳]|\([0-9]+\))\s*/.test(line)) return false;
  if (/(준비과정|조리과정|서비스과정|조리법|조리방법|조리순서|TIP|Tip)/i.test(line)) return false;
  if (!/[가-힣]/.test(line)) return false;
  const quantity = /\d|한모|한줌|약간|적당량|소량|큰술|작은술|컵|장|개|봉|팩|마리|kg|KG|g\b|G\b|ml|ML|리터|인분/i.test(line);
  return ingredientMode || quantity;
}

function ingredientItems(text) {
  const items = [];
  let ingredientMode = false;
  const seen = new Set();
  for (const raw of text.split("\n")) {
    const line = cleanLine(raw);
    if (!line) continue;
    if (/(^|\s)(재료|육수재료|소스재료|양념|구매품목명|재료명|Material Desc)(\s|$)/i.test(line)) {
      ingredientMode = true;
      continue;
    }
    if (/(준비과정|조리과정|서비스과정|조리법|조리방법|조리순서|만드는\s*법)/i.test(line)) ingredientMode = false;
    if (!isIngredientLine(line, ingredientMode)) continue;
    const normalized = line.replace(/\s+/g, " ");
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const match = normalized.match(/(\d+(?:[.,]\d+)?)\s*(kg|KG|g|G|ml|ML|L|개|장|봉|팩|컵|큰술|작은술|인분|EA|회)?/);
    if (match) {
      const amount = Number(match[1].replace(",", "."));
      const name = cleanLine(normalized.slice(0, match.index));
      items.push([name || normalized, Number.isFinite(amount) ? amount : null, match[2] || "원문"]);
    } else {
      items.push([normalized, null, "원문"]);
    }
    if (items.length >= 35) break;
  }
  return items.length ? items : [["원본 이미지에서 재료 확인", null, "이미지"]];
}

function inferType(name) {
  if (/(소스|드레싱|양념|쌈장|초절임|절임|육수)/.test(name)) return "소스·양념";
  if (/(국|탕|찌개|전골|라면|우동|칼국수|국수|냉면)/.test(name)) return "국물·면";
  if (/(볶음|조림|찜|구이|전|튀김|갈비|불고기|돈까스|닭|고기)/.test(name)) return "메인·반찬";
  if (/(파스타|샌드위치|토스트|밥|김밥|컵밥)/.test(name)) return "식사·간식";
  return "급식 레시피";
}

function inferPattern(text) {
  if (/(구매품목명|Material Desc|Req\.?\/Man|1인분제공량|기준인분)/i.test(text)) return "표준 급식 레시피표";
  if (/(SMART\s*city|Trend menu|#광|#오늘|조리 Tip)/i.test(text)) return "포스터형 레시피 카드";
  return "조리과정 안내형";
}

const result = records.map((record, index) => {
  const text = chooseText(record);
  const sections = splitSections(text);
  const steps = sections.flatMap(section => splitSteps(section).map((body, stepIndex) => ({
    title: sections.length > 1 || stepIndex ? `${section.title} ${stepIndex + 1}` : section.title,
    time: "원본",
    body
  })));
  const name = record.name;
  const pattern = inferPattern(text);
  return {
    id: `school-${String(index + 1).padStart(3, "0")}`,
    category: "school",
    categoryLabel: "급식 레시피",
    type: inferType(name),
    name,
    subtitle: "급식 원본 이미지 OCR 판독 기록 · 더블체크 필요",
    status: "원본 확인 필요",
    statusTone: "orange",
    updated: today,
    version: "v0.1",
    yield: "원본 기준",
    prep: "원본 확인",
    cook: "원본 확인",
    tags: ["급식", pattern, "OCR 검수"],
    images: [],
    originalImage: `assets/images/school/${record.file}`,
    originalPattern: pattern,
    originalChecked: false,
    versions: [{ id: "v0.1", date: today, note: "원본 이미지 OCR 1차 등록" }],
    ingredients: [{ group: "재료 · 원본 판독", items: ingredientItems(text) }],
    steps: steps.length ? steps : [{ title: "원본 조리방법", time: "원본", body: "원본 이미지에서 조리방법을 확인하세요." }],
    note: `${pattern} 형식의 원본 이미지에서 OCR로 1차 판독했습니다. 이미지와 대조해 오탈자·수량·조리시간을 확정한 뒤 운영 레시피로 전환하세요.`
  };
});

const output = `window.SCHOOL_RECIPE_DATA = ${JSON.stringify(result, null, 2)};\n`;
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${result.length} school recipes`);
