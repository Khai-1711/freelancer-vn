// FREELANCER REPLICA - Script cho Scripter Plugin
// Dựng 2 màn hình: Post Project + Hire Directory

// 1. Load fonts
await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
await figma.loadFontAsync({ family: "Roboto", style: "Medium" });
await figma.loadFontAsync({ family: "Roboto", style: "Bold" });

// 2. Tìm Page Screens
let targetPage = figma.root.children.find(p => p.name.includes("Screens") || p.name.includes("1."));
if (!targetPage) {
  targetPage = figma.currentPage;
} else {
  await figma.setCurrentPageAsync(targetPage);
}

// 3. Bảng màu
const C = {
  primary: { r: 0.902, g: 0.008, b: 0.471 },
  secondary: { r: 0.09, g: 0.447, b: 0.922 },
  bgDark: { r: 0.075, g: 0.106, b: 0.149 },
  bgBody: { r: 0.031, g: 0.035, b: 0.051 },
  bgCard: { r: 0.11, g: 0.141, b: 0.188 },
  bgInput: { r: 0.06, g: 0.08, b: 0.11 },
  border: { r: 0.18, g: 0.22, b: 0.28 },
  textWhite: { r: 1, g: 1, b: 1 },
  textMuted: { r: 0.65, g: 0.70, b: 0.78 },
  warningBg: { r: 0.25, g: 0.18, b: 0.05 },
  warningBorder: { r: 0.85, g: 0.65, b: 0.15 },
  warningText: { r: 1, g: 0.85, b: 0.4 }
};

// Helper: Text
function txt(text, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: "Roboto", style: style || "Regular" };
  t.characters = text;
  t.fontSize = size || 14;
  t.fills = [{ type: "SOLID", color: color || C.textWhite }];
  t.textAutoResize = "WIDTH_AND_HEIGHT";
  return t;
}

// Helper: Button
function btn(label, isPrimary) {
  const b = figma.createFrame();
  b.layoutMode = "HORIZONTAL";
  b.primaryAxisAlignItems = "CENTER";
  b.counterAxisAlignItems = "CENTER";
  b.paddingLeft = 20; b.paddingRight = 20;
  b.paddingTop = 12; b.paddingBottom = 12;
  b.cornerRadius = 6;
  if (isPrimary) {
    b.fills = [{ type: "SOLID", color: C.primary }];
    b.appendChild(txt(label, 15, "Bold", C.textWhite));
  } else {
    b.fills = [{ type: "SOLID", color: C.bgCard }];
    b.strokes = [{ type: "SOLID", color: C.border }];
    b.strokeWeight = 1;
    b.appendChild(txt(label, 15, "Medium", C.textWhite));
  }
  return b;
}

// =============================================
// MAN HINH 1: POST PROJECT
// =============================================
const pp = figma.createFrame();
pp.name = "Post Project - /post-project";
pp.resize(1440, 1320);
pp.x = 5200;
pp.y = 0;
pp.fills = [{ type: "SOLID", color: C.bgBody }];
pp.layoutMode = "VERTICAL";
pp.primaryAxisSizingMode = "AUTO";
pp.counterAxisSizingMode = "FIXED";
pp.itemSpacing = 0;

// Navbar
const nav = figma.createFrame();
nav.name = "Navbar";
nav.layoutMode = "HORIZONTAL";
nav.resize(1440, 68);
nav.fills = [{ type: "SOLID", color: C.bgDark }];
nav.paddingLeft = 80; nav.paddingRight = 80;
nav.paddingTop = 14; nav.paddingBottom = 14;
nav.primaryAxisAlignItems = "SPACE_BETWEEN";
nav.counterAxisAlignItems = "CENTER";

const navL = figma.createFrame();
navL.layoutMode = "HORIZONTAL";
navL.counterAxisAlignItems = "CENTER";
navL.itemSpacing = 24;
navL.fills = [];
navL.appendChild(txt("freelancer", 22, "Bold", C.primary));

const stepBadge = figma.createFrame();
stepBadge.layoutMode = "HORIZONTAL";
stepBadge.paddingLeft = 12; stepBadge.paddingRight = 12;
stepBadge.paddingTop = 6; stepBadge.paddingBottom = 6;
stepBadge.cornerRadius = 20;
stepBadge.fills = [{ type: "SOLID", color: C.bgCard }];
stepBadge.strokes = [{ type: "SOLID", color: C.border }];
stepBadge.strokeWeight = 1;
stepBadge.appendChild(txt("Buoc 1 / 4: Thong tin du an", 13, "Medium", C.textMuted));
navL.appendChild(stepBadge);

const navR = figma.createFrame();
navR.layoutMode = "HORIZONTAL";
navR.counterAxisAlignItems = "CENTER";
navR.itemSpacing = 16;
navR.fills = [];
navR.appendChild(txt("Huy va thoat", 14, "Regular", C.textMuted));

const pill = figma.createFrame();
pill.layoutMode = "HORIZONTAL";
pill.counterAxisAlignItems = "CENTER";
pill.itemSpacing = 8;
pill.paddingLeft = 12; pill.paddingRight = 12;
pill.paddingTop = 6; pill.paddingBottom = 6;
pill.cornerRadius = 16;
pill.fills = [{ type: "SOLID", color: C.bgCard }];
const dot = figma.createEllipse();
dot.resize(20, 20);
dot.fills = [{ type: "SOLID", color: C.primary }];
pill.appendChild(dot);
pill.appendChild(txt("@khain66 ($0.00 USD)", 13, "Medium", C.textWhite));
navR.appendChild(pill);

nav.appendChild(navL);
nav.appendChild(navR);
pp.appendChild(nav);

// Main 2-col
const main = figma.createFrame();
main.name = "Main Container";
main.layoutMode = "HORIZONTAL";
main.resize(1440, 1200);
main.paddingLeft = 120; main.paddingRight = 120;
main.paddingTop = 48; main.paddingBottom = 64;
main.itemSpacing = 48;
main.fills = [];
main.counterAxisAlignItems = "MIN";

// Left Col - Form
const left = figma.createFrame();
left.name = "Form Wizard";
left.layoutMode = "VERTICAL";
left.resize(740, 1100);
left.itemSpacing = 28;
left.fills = [];

// Heading
const hBlock = figma.createFrame();
hBlock.layoutMode = "VERTICAL";
hBlock.itemSpacing = 8;
hBlock.fills = [];
const h1 = txt("Cho chung toi biet thu ban can hoan thanh.", 28, "Bold", C.textWhite);
h1.textAutoResize = "HEIGHT";
h1.resize(740, 40);
const sub = txt("Chung toi se huong dan ban tao ban tom tat hoan hao. Cang chi tiet cang tot.", 15, "Regular", C.textMuted);
sub.textAutoResize = "HEIGHT";
sub.resize(740, 24);
hBlock.appendChild(h1);
hBlock.appendChild(sub);
left.appendChild(hBlock);

// Warning Banner
const warn = figma.createFrame();
warn.layoutMode = "HORIZONTAL";
warn.resize(740, 48);
warn.paddingLeft = 16; warn.paddingRight = 16;
warn.paddingTop = 12; warn.paddingBottom = 12;
warn.cornerRadius = 6;
warn.fills = [{ type: "SOLID", color: C.warningBg }];
warn.strokes = [{ type: "SOLID", color: C.warningBorder }];
warn.strokeWeight = 1;
warn.primaryAxisAlignItems = "SPACE_BETWEEN";
warn.counterAxisAlignItems = "CENTER";
warn.appendChild(txt("Ban phac thao truoc do da bi loai bo.", 13, "Regular", C.warningText));
warn.appendChild(txt("Huy thao tac", 13, "Bold", C.primary));
left.appendChild(warn);

// Field 1: Title
const f1 = figma.createFrame();
f1.layoutMode = "VERTICAL";
f1.itemSpacing = 8;
f1.resize(740, 80);
f1.fills = [];
f1.appendChild(txt("Dat ten du an cua ban", 15, "Bold", C.textWhite));
const inp1 = figma.createFrame();
inp1.layoutMode = "HORIZONTAL";
inp1.resize(740, 48);
inp1.paddingLeft = 16; inp1.paddingRight = 16;
inp1.paddingTop = 14; inp1.paddingBottom = 14;
inp1.cornerRadius = 6;
inp1.fills = [{ type: "SOLID", color: C.bgInput }];
inp1.strokes = [{ type: "SOLID", color: C.border }];
inp1.strokeWeight = 1;
inp1.appendChild(txt("VD: Xay dung Backend bang FastAPI cho Freelance App", 14, "Regular", C.textMuted));
f1.appendChild(inp1);
left.appendChild(f1);

// Field 2: Description
const f2 = figma.createFrame();
f2.layoutMode = "VERTICAL";
f2.itemSpacing = 8;
f2.resize(740, 200);
f2.fills = [];
f2.appendChild(txt("Mo ta chi tiet nhung gi ban can lam", 15, "Bold", C.textWhite));
const inp2 = figma.createFrame();
inp2.layoutMode = "VERTICAL";
inp2.resize(740, 130);
inp2.paddingLeft = 16; inp2.paddingRight = 16;
inp2.paddingTop = 14; inp2.paddingBottom = 14;
inp2.cornerRadius = 6;
inp2.fills = [{ type: "SOLID", color: C.bgInput }];
inp2.strokes = [{ type: "SOLID", color: C.border }];
inp2.strokeWeight = 1;
const descTxt = txt("Neu ro muc tieu du an, cong nghe yeu cau (FastAPI, JWT, WebSockets, Docker)...", 14, "Regular", C.textMuted);
descTxt.resize(700, 48);
descTxt.textAutoResize = "NONE";
inp2.appendChild(descTxt);
f2.appendChild(inp2);

// Dropzone
const dz = figma.createFrame();
dz.layoutMode = "HORIZONTAL";
dz.resize(740, 50);
dz.primaryAxisAlignItems = "CENTER";
dz.counterAxisAlignItems = "CENTER";
dz.cornerRadius = 6;
dz.fills = [{ type: "SOLID", color: C.bgCard }];
dz.strokes = [{ type: "SOLID", color: C.border }];
dz.strokeWeight = 1;
dz.appendChild(txt("Keo tha tep tin hoac duyet tu may tinh (Toi da 25MB)", 13, "Medium", C.primary));
f2.appendChild(dz);
left.appendChild(f2);

// Field 3: Skills
const f3 = figma.createFrame();
f3.layoutMode = "VERTICAL";
f3.itemSpacing = 10;
f3.resize(740, 70);
f3.fills = [];
f3.appendChild(txt("Cac ky nang can thiet", 15, "Bold", C.textWhite));
const chips = figma.createFrame();
chips.layoutMode = "HORIZONTAL";
chips.itemSpacing = 8;
chips.fills = [];

const skillNames = ["Python", "FastAPI", "PostgreSQL", "Figma", "Docker"];
for (let i = 0; i < skillNames.length; i++) {
  const chip = figma.createFrame();
  chip.layoutMode = "HORIZONTAL";
  chip.paddingLeft = 14; chip.paddingRight = 14;
  chip.paddingTop = 8; chip.paddingBottom = 8;
  chip.cornerRadius = 20;
  chip.fills = [{ type: "SOLID", color: C.bgCard }];
  chip.strokes = [{ type: "SOLID", color: C.border }];
  chip.strokeWeight = 1;
  chip.appendChild(txt(skillNames[i], 13, "Medium", C.textWhite));
  chips.appendChild(chip);
}

const addChip = figma.createFrame();
addChip.layoutMode = "HORIZONTAL";
addChip.paddingLeft = 14; addChip.paddingRight = 14;
addChip.paddingTop = 8; addChip.paddingBottom = 8;
addChip.cornerRadius = 20;
addChip.fills = [];
addChip.strokes = [{ type: "SOLID", color: C.primary }];
addChip.strokeWeight = 1;
addChip.appendChild(txt("+ Them ky nang", 13, "Medium", C.primary));
chips.appendChild(addChip);

f3.appendChild(chips);
left.appendChild(f3);

// Field 4: Budget
const f4 = figma.createFrame();
f4.layoutMode = "VERTICAL";
f4.itemSpacing = 12;
f4.resize(740, 130);
f4.fills = [];
f4.appendChild(txt("Ban muon thanh toan nhu the nao?", 15, "Bold", C.textWhite));

const budgetRow = figma.createFrame();
budgetRow.layoutMode = "HORIZONTAL";
budgetRow.itemSpacing = 16;
budgetRow.resize(740, 96);
budgetRow.fills = [];

const bc1 = figma.createFrame();
bc1.layoutMode = "VERTICAL";
bc1.resize(360, 96);
bc1.paddingLeft = 20; bc1.paddingRight = 20;
bc1.paddingTop = 16; bc1.paddingBottom = 16;
bc1.cornerRadius = 8;
bc1.fills = [{ type: "SOLID", color: C.bgCard }];
bc1.strokes = [{ type: "SOLID", color: C.primary }];
bc1.strokeWeight = 2;
bc1.itemSpacing = 6;
bc1.appendChild(txt("Du an gia co dinh", 15, "Bold", C.primary));
bc1.appendChild(txt("Thanh toan theo moc hoac khi hoan thanh 100%", 13, "Regular", C.textMuted));

const bc2 = figma.createFrame();
bc2.layoutMode = "VERTICAL";
bc2.resize(360, 96);
bc2.paddingLeft = 20; bc2.paddingRight = 20;
bc2.paddingTop = 16; bc2.paddingBottom = 16;
bc2.cornerRadius = 8;
bc2.fills = [{ type: "SOLID", color: C.bgCard }];
bc2.strokes = [{ type: "SOLID", color: C.border }];
bc2.strokeWeight = 1;
bc2.itemSpacing = 6;
bc2.appendChild(txt("Du an theo gio", 15, "Bold", C.textWhite));
bc2.appendChild(txt("Thanh toan theo so gio lam viec thuc te", 13, "Regular", C.textMuted));

budgetRow.appendChild(bc1);
budgetRow.appendChild(bc2);
f4.appendChild(budgetRow);
left.appendChild(f4);

// Action row
const actRow = figma.createFrame();
actRow.layoutMode = "HORIZONTAL";
actRow.counterAxisAlignItems = "CENTER";
actRow.itemSpacing = 16;
actRow.fills = [];
actRow.paddingTop = 16;
actRow.appendChild(btn("Tiep theo ->", true));
actRow.appendChild(btn("Luu ban nhap", false));
left.appendChild(actRow);

main.appendChild(left);

// Right Col - Trust sidebar
const right = figma.createFrame();
right.name = "Trust Sidebar";
right.layoutMode = "VERTICAL";
right.resize(410, 800);
right.itemSpacing = 24;
right.fills = [];

const trustCard = figma.createFrame();
trustCard.layoutMode = "VERTICAL";
trustCard.resize(410, 500);
trustCard.paddingLeft = 24; trustCard.paddingRight = 24;
trustCard.paddingTop = 24; trustCard.paddingBottom = 24;
trustCard.cornerRadius = 10;
trustCard.fills = [{ type: "SOLID", color: C.bgCard }];
trustCard.strokes = [{ type: "SOLID", color: C.border }];
trustCard.strokeWeight = 1;
trustCard.itemSpacing = 18;
trustCard.appendChild(txt("Loi the khi dang du an tren Freelancer", 16, "Bold", C.textWhite));

const bData = [
  ["91+ trieu chuyen gia", "Ket noi hon 91 trieu chuyen gia tren toan the gioi san sang bao gia."],
  ["Moi quy mo du an", "Tu tasks $10 den $10 trieu du an, chung toi luon lo duoc cho ban."],
  ["Phan hoi trong tich tac", "Ket noi voi cac freelancer co ky nang phu hop chi trong vai phut."],
  ["Bao dam thanh toan", "Chi thanh toan cho freelancer khi ban hoan toan hai long voi ket qua."]
];

for (let i = 0; i < bData.length; i++) {
  const row = figma.createFrame();
  row.layoutMode = "VERTICAL";
  row.resize(362, 60);
  row.itemSpacing = 4;
  row.fills = [];
  row.appendChild(txt(bData[i][0], 14, "Bold", C.textWhite));
  const desc = txt(bData[i][1], 13, "Regular", C.textMuted);
  desc.resize(362, 36);
  desc.textAutoResize = "NONE";
  row.appendChild(desc);
  trustCard.appendChild(row);
}

right.appendChild(trustCard);

// Tips card
const tipCard = figma.createFrame();
tipCard.layoutMode = "VERTICAL";
tipCard.resize(410, 180);
tipCard.paddingLeft = 24; tipCard.paddingRight = 24;
tipCard.paddingTop = 20; tipCard.paddingBottom = 20;
tipCard.cornerRadius = 10;
tipCard.fills = [{ type: "SOLID", color: C.bgCard }];
tipCard.strokes = [{ type: "SOLID", color: C.border }];
tipCard.strokeWeight = 1;
tipCard.itemSpacing = 10;
tipCard.appendChild(txt("Meo viet mo ta hieu qua", 15, "Bold", C.textWhite));
tipCard.appendChild(txt("1. Neu ro rang cac chuc nang can xay dung.", 13, "Regular", C.textMuted));
tipCard.appendChild(txt("2. Liet ke cong nghe bat buoc va tai lieu san co.", 13, "Regular", C.textMuted));
tipCard.appendChild(txt("3. Dua ra thoi han va moc giai ngan du kien.", 13, "Regular", C.textMuted));
right.appendChild(tipCard);

main.appendChild(right);
pp.appendChild(main);
figma.currentPage.appendChild(pp);

// =============================================
// MAN HINH 2: HIRE DIRECTORY
// =============================================
const hire = figma.createFrame();
hire.name = "Hire Categories - /hire";
hire.resize(1440, 1400);
hire.x = 6700;
hire.y = 0;
hire.fills = [{ type: "SOLID", color: C.bgBody }];
hire.layoutMode = "VERTICAL";
hire.primaryAxisSizingMode = "AUTO";
hire.counterAxisSizingMode = "FIXED";
hire.itemSpacing = 0;

// Hero
const hero = figma.createFrame();
hero.name = "Hero Banner";
hero.layoutMode = "VERTICAL";
hero.resize(1440, 220);
hero.fills = [{ type: "SOLID", color: C.bgDark }];
hero.primaryAxisAlignItems = "CENTER";
hero.counterAxisAlignItems = "CENTER";
hero.paddingTop = 40; hero.paddingBottom = 40;
hero.itemSpacing = 12;
hero.appendChild(txt("Kham pha 3400+ Danh muc Freelancer", 32, "Bold", C.textWhite));
hero.appendChild(txt("Tim kiem va thue chuyen gia hang dau cho moi quy mo du an", 16, "Regular", C.textMuted));

const sBox = figma.createFrame();
sBox.layoutMode = "HORIZONTAL";
sBox.counterAxisAlignItems = "CENTER";
sBox.resize(560, 48);
sBox.cornerRadius = 24;
sBox.paddingLeft = 20; sBox.paddingRight = 8;
sBox.fills = [{ type: "SOLID", color: C.bgBody }];
sBox.strokes = [{ type: "SOLID", color: C.border }];
sBox.strokeWeight = 1;
sBox.primaryAxisAlignItems = "SPACE_BETWEEN";
sBox.appendChild(txt("Tim kiem ky nang (VD: Python, UI/UX, AI)...", 14, "Regular", C.textMuted));
const sBtn = btn("Tim", true);
sBtn.cornerRadius = 20;
sBtn.paddingTop = 8; sBtn.paddingBottom = 8;
sBox.appendChild(sBtn);
hero.appendChild(sBox);
hire.appendChild(hero);

// Categories Grid
const grid = figma.createFrame();
grid.name = "Categories Grid";
grid.layoutMode = "VERTICAL";
grid.resize(1440, 1100);
grid.paddingLeft = 120; grid.paddingRight = 120;
grid.paddingTop = 48; grid.paddingBottom = 64;
grid.itemSpacing = 24;
grid.fills = [];

const cats = [
  { t: "Websites, IT and Software", c: "1,240+ ky nang", tags: ["Python", "PHP", "FastAPI", "React", "Node.js", "WordPress"] },
  { t: "Artificial Intelligence", c: "320+ ky nang", tags: ["Machine Learning", "LLM", "Deep Learning", "NLP", "Prompt Eng."] },
  { t: "Design, Media and Architecture", c: "890+ ky nang", tags: ["UI/UX Design", "Figma", "Logo Design", "3D Modeling", "Video"] },
  { t: "Writing and Content", c: "450+ ky nang", tags: ["Copywriting", "SEO Content", "Technical Writing", "Translation"] },
  { t: "Data Entry and Admin", c: "280+ ky nang", tags: ["Data Scraping", "Excel VBA", "Virtual Assistant", "Data Entry"] },
  { t: "Engineering and Science", c: "510+ ky nang", tags: ["Mechanical", "Electrical", "CAD/CAM", "Civil Engineering"] },
  { t: "Sales and Marketing", c: "640+ ky nang", tags: ["SEO", "Google Ads", "Social Media", "Lead Generation"] },
  { t: "Mobile Phones and Computing", c: "380+ ky nang", tags: ["Flutter", "React Native", "iOS Swift", "Android Kotlin"] },
  { t: "Business, Accounting and Legal", c: "410+ ky nang", tags: ["Business Plans", "Financial Analysis", "Contracts", "HR"] }
];

for (let r = 0; r < 3; r++) {
  const row = figma.createFrame();
  row.layoutMode = "HORIZONTAL";
  row.itemSpacing = 24;
  row.resize(1200, 220);
  row.fills = [];

  for (let c = 0; c < 3; c++) {
    const item = cats[r * 3 + c];
    const card = figma.createFrame();
    card.layoutMode = "VERTICAL";
    card.resize(384, 200);
    card.paddingLeft = 24; card.paddingRight = 24;
    card.paddingTop = 20; card.paddingBottom = 20;
    card.cornerRadius = 8;
    card.fills = [{ type: "SOLID", color: C.bgCard }];
    card.strokes = [{ type: "SOLID", color: C.border }];
    card.strokeWeight = 1;
    card.itemSpacing = 14;

    // Title + count
    const ch = figma.createFrame();
    ch.layoutMode = "VERTICAL";
    ch.itemSpacing = 4;
    ch.fills = [];
    ch.appendChild(txt(item.t, 16, "Bold", C.textWhite));
    ch.appendChild(txt(item.c, 12, "Medium", C.primary));
    card.appendChild(ch);

    // Tags
    const tRow = figma.createFrame();
    tRow.layoutMode = "HORIZONTAL";
    tRow.itemSpacing = 6;
    tRow.fills = [];
    for (let ti = 0; ti < item.tags.length; ti++) {
      const tg = figma.createFrame();
      tg.layoutMode = "HORIZONTAL";
      tg.paddingLeft = 10; tg.paddingRight = 10;
      tg.paddingTop = 4; tg.paddingBottom = 4;
      tg.cornerRadius = 12;
      tg.fills = [{ type: "SOLID", color: C.bgInput }];
      tg.strokes = [{ type: "SOLID", color: C.border }];
      tg.strokeWeight = 1;
      tg.appendChild(txt(item.tags[ti], 12, "Regular", C.textMuted));
      tRow.appendChild(tg);
    }
    card.appendChild(tRow);
    row.appendChild(card);
  }
  grid.appendChild(row);
}

hire.appendChild(grid);
figma.currentPage.appendChild(hire);

// Zoom to new frames
figma.viewport.scrollAndZoomIntoView([pp, hire]);
figma.notify("Done! 2 man hinh Post Project va Hire da duoc tao!");
