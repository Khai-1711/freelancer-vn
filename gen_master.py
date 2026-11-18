# Master Generator for Freelancer VN Light Theme (Matching Homepage 1920w)
import os

with open(r"c:\Users\khai1\OneDrive\Máy tính\sth\generate_master_screens.js", "w", encoding="utf-8") as f:
    f.write("""const realHeader = figma.getNodeById("2:2692");
const realFooter = figma.getNodeById("2:2412");

await Promise.all([
  figma.loadFontAsync({ family: "Inter", style: "Regular" }),
  figma.loadFontAsync({ family: "Inter", style: "Medium" }),
  figma.loadFontAsync({ family: "Inter", style: "Bold" })
]);

const createdIds = [];

// Production Light Palette (Matching Freelancer.com 1920w light artboard)
const C = {
  bgPage: { r: 0.976, g: 0.980, b: 0.988 },      // #f8f9fa
  bgWhite: { r: 1.0, g: 1.0, b: 1.0 },           // #ffffff
  borderSubtle: { r: 0.886, g: 0.906, b: 0.929 }, // #e2e8f0
  borderLight: { r: 0.80, g: 0.84, b: 0.88 },    // #cbd5e1
  textHeading: { r: 0.082, g: 0.114, b: 0.165 }, // #151d2a
  textBody: { r: 0.278, g: 0.333, b: 0.412 },    // #475569
  textMuted: { r: 0.475, g: 0.537, b: 0.624 },   // #79899f
  primaryPink: { r: 0.902, g: 0.008, b: 0.471 }, // #e60278 (CTA)
  primaryBlue: { r: 0.0, g: 0.498, b: 0.929 },   // #007fed (Accent)
  emeraldPrice: { r: 0.020, g: 0.588, b: 0.412 },// #059669 (Price)
  badgeBg: { r: 0.941, g: 0.961, b: 0.984 },     // #f0f5fa
  badgeBorder: { r: 0.851, g: 0.894, b: 0.941 }  // #d9e4f0
};

function solid(c, opacity = 1) {
  return [{ type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity }];
}

function createText(content, size = 14, style = "Regular", color = C.textHeading) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style };
  t.characters = content;
  t.fontSize = size;
  t.fills = solid(color);
  createdIds.push(t.id);
  return t;
}

function createBadge(label, color = C.primaryBlue, bg = C.badgeBg, border = C.badgeBorder) {
  const b = figma.createFrame();
  b.layoutMode = "HORIZONTAL";
  b.primaryAxisSizingMode = "AUTO";
  b.counterAxisSizingMode = "AUTO";
  b.paddingLeft = 10;
  b.paddingRight = 10;
  b.paddingTop = 5;
  b.paddingBottom = 5;
  b.cornerRadius = 4;
  b.fills = solid(bg);
  b.strokes = solid(border);
  b.strokeWeight = 1;
  b.appendChild(createText(label, 12, "Medium", color));
  createdIds.push(b.id);
  return b;
}

function createButton(label, variant = "primary", width = null) {
  const btn = figma.createFrame();
  btn.layoutMode = "HORIZONTAL";
  btn.primaryAxisAlignItems = "CENTER";
  btn.counterAxisAlignItems = "CENTER";
  btn.paddingTop = 10;
  btn.paddingBottom = 10;
  btn.paddingLeft = 24;
  btn.paddingRight = 24;
  btn.cornerRadius = 6;
  if (width) {
    btn.resize(width, 44);
    btn.layoutAlign = "STRETCH";
  }
  if (variant === "primary") {
    btn.fills = solid(C.primaryPink);
    btn.appendChild(createText(label, 14, "Bold", C.bgWhite));
  } else if (variant === "blue") {
    btn.fills = solid(C.primaryBlue);
    btn.appendChild(createText(label, 14, "Bold", C.bgWhite));
  } else {
    btn.fills = solid(C.bgWhite);
    btn.strokes = solid(C.borderLight);
    btn.strokeWeight = 1;
    btn.appendChild(createText(label, 14, "Bold", C.textHeading));
  }
  createdIds.push(btn.id);
  return btn;
}

function applyShadow(node) {
  node.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0.08, g: 0.12, b: 0.18, a: 0.06 },
    offset: { x: 0, y: 2 },
    radius: 8,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL'
  }];
}

// ----------------------------------------------------
// SCREEN 1: TRANG TIM VIEC (JOBS BROWSE - 1920w)
// ----------------------------------------------------
function buildJobsBrowse(x, y) {
  const page = figma.createFrame();
  page.name = "1. Nguoi Tim Viec - Danh sach Tim Viec (Jobs Browse)";
  page.resize(1920, 2350);
  page.x = x;
  page.y = y;
  page.layoutMode = "VERTICAL";
  page.itemSpacing = 0;
  page.fills = solid(C.bgPage);

  // Header
  const h = realHeader.clone();
  h.fills = solid(C.bgWhite);
  page.appendChild(h);
  createdIds.push(h.id);

  // Subheader
  const sub = figma.createFrame();
  sub.layoutMode = "HORIZONTAL";
  sub.primaryAxisAlignItems = "CENTER";
  sub.counterAxisAlignItems = "CENTER";
  sub.resize(1920, 84);
  sub.itemSpacing = 16;
  sub.fills = solid(C.bgWhite);
  sub.strokes = solid(C.borderSubtle);
  sub.strokeWeight = 1;

  const sBox = figma.createFrame();
  sBox.layoutMode = "HORIZONTAL";
  sBox.counterAxisAlignItems = "CENTER";
  sBox.resize(1100, 48);
  sBox.paddingLeft = 20;
  sBox.cornerRadius = 8;
  sBox.fills = solid(C.bgPage);
  sBox.strokes = solid(C.borderLight);
  sBox.strokeWeight = 1;
  sBox.appendChild(createText("Tim kiem cong viec (vi du: Python, Graphic Design, Golang, React)...", 14, "Regular", C.textMuted));

  sub.appendChild(sBox);
  sub.appendChild(createButton("Tim viec ngay", "primary"));
  page.appendChild(sub);
  createdIds.push(sub.id);

  // Body Container
  const wrap = figma.createFrame();
  wrap.layoutMode = "HORIZONTAL";
  wrap.primaryAxisAlignItems = "CENTER";
  wrap.resize(1920, 1500);
  wrap.paddingTop = 36;
  wrap.fills = [];

  const c1440 = figma.createFrame();
  c1440.layoutMode = "HORIZONTAL";
  c1440.resize(1440, 1450);
  c1440.itemSpacing = 32;
  c1440.fills = [];

  // Sidebar
  const sb = figma.createFrame();
  sb.layoutMode = "VERTICAL";
  sb.resize(360, 1450);
  sb.paddingTop = 24;
  sb.paddingBottom = 24;
  sb.paddingLeft = 24;
  sb.paddingRight = 24;
  sb.itemSpacing = 24;
  sb.cornerRadius = 12;
  sb.fills = solid(C.bgWhite);
  sb.strokes = solid(C.borderSubtle);
  sb.strokeWeight = 1;
  applyShadow(sb);

  sb.appendChild(createText("Bo loc cong viec", 18, "Bold", C.textHeading));

  const f1 = figma.createFrame();
  f1.layoutMode = "VERTICAL";
  f1.itemSpacing = 10;
  f1.fills = [];
  f1.appendChild(createText("LOAI DU AN", 12, "Bold", C.primaryBlue));
  f1.appendChild(createText("[✓] Du an gia co dinh (Fixed Price)", 14, "Regular", C.textHeading));
  f1.appendChild(createText("[✓] Du an theo gio (Hourly Project)", 14, "Regular", C.textHeading));
  sb.appendChild(f1);

  const f2 = figma.createFrame();
  f2.layoutMode = "VERTICAL";
  f2.itemSpacing = 10;
  f2.fills = [];
  f2.appendChild(createText("NGAN SACH ($ USD)", 12, "Bold", C.primaryBlue));
  f2.appendChild(createText("Tu: $10 - Den: $2,500+ USD", 14, "Regular", C.textHeading));
  sb.appendChild(f2);

  const f3 = figma.createFrame();
  f3.layoutMode = "VERTICAL";
  f3.itemSpacing = 8;
  f3.fills = [];
  f3.appendChild(createText("KY NANG PHO BIEN", 12, "Bold", C.primaryBlue));
  f3.appendChild(createBadge("Python (412 cong viec)"));
  f3.appendChild(createBadge("Graphic Design (713 cong viec)"));
  f3.appendChild(createBadge("Golang (89 cong viec)"));
  f3.appendChild(createBadge("Excel Data Entry (308 cong viec)"));
  f3.appendChild(createBadge("React.js (520 cong viec)"));
  sb.appendChild(f3);

  c1440.appendChild(sb);

  // Feed
  const feed = figma.createFrame();
  feed.layoutMode = "VERTICAL";
  feed.resize(1048, 1450);
  feed.itemSpacing = 18;
  feed.fills = [];

  const fh = figma.createFrame();
  fh.layoutMode = "HORIZONTAL";
  fh.primaryAxisAlignItems = "SPACE_BETWEEN";
  fh.resize(1048, 36);
  fh.fills = [];
  fh.appendChild(createText("4,453 viec lam freelance phu hop voi ban", 20, "Bold", C.textHeading));
  fh.appendChild(createText("Sap xep: Moi nhat v", 14, "Medium", C.primaryBlue));
  feed.appendChild(fh);

  const sampleJobs = [
    {
      t: "Part-time Remote Golang Backend Engineer for Web Scraping Pipeline",
      p: "$250 - $750 USD",
      m: "Gia co dinh • Dang 6 phut truoc • 4 chao gia",
      d: "Chung toi can mot lap trinh vien Golang giau kinh nghiem de toi uu hoa he thong pipeline thu thap du lieu, quan ly Redis Streams va PostgreSQL tren ha tang Docker.",
      s: ["Golang", "PostgreSQL", "Redis", "Docker", "Web Scraping"]
    },
    {
      t: "Excel Data Entry & Cleanup Specialist needed urgently",
      p: "$30 - $250 USD",
      m: "Gia co dinh • Dang 24 phut truoc • 19 chao gia",
      d: "Can xu ly va chuan hoa hon 10,000 dong du lieu khach hang tu cac file Excel roi rac sang mau chuan cua cong ty.",
      s: ["Excel", "Data Entry", "Virtual Assistant", "Data Processing"]
    },
    {
      t: "Thiet ke bo nhan dien thuong hieu va UI Landing Page cho Startup AI",
      p: "$20 - $35 USD / gio",
      m: "Theo gio • Dang 1 gio truoc • 12 chao gia",
      d: "Tim Senior UI/UX Designer thiet ke he thong Design System tren Figma va Landing Page cho ung dung AI moi.",
      s: ["Figma", "UI/UX Design", "Graphic Design", "Branding"]
    },
    {
      t: "Licensed Australian Architect needed for Revit BIM Project",
      p: "$1,500 - $3,000 USD",
      m: "Gia co dinh • Dang 2 gio truoc • 8 chao gia",
      d: "Can kien truc su co chung chi hanh nghe tai Uc de ra soat ban ve Revit BIM va ky duyet ho so theo tieu chuan BCA.",
      s: ["Revit", "BIM", "AutoCAD", "Building Architecture"]
    }
  ];

  for (const j of sampleJobs) {
    const card = figma.createFrame();
    card.layoutMode = "VERTICAL";
    card.resize(1048, 205);
    card.paddingTop = 20;
    card.paddingBottom = 20;
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.itemSpacing = 12;
    card.cornerRadius = 10;
    card.fills = solid(C.bgWhite);
    card.strokes = solid(C.borderSubtle);
    card.strokeWeight = 1;
    applyShadow(card);

    const r1 = figma.createFrame();
    r1.layoutMode = "HORIZONTAL";
    r1.primaryAxisAlignItems = "SPACE_BETWEEN";
    r1.resize(1000, 26);
    r1.fills = [];
    r1.appendChild(createText(j.t, 17, "Bold", C.textHeading));
    r1.appendChild(createText(j.p, 19, "Bold", C.emeraldPrice));
    card.appendChild(r1);

    card.appendChild(createText(j.m, 13, "Medium", C.primaryPink));
    card.appendChild(createText(j.d, 14, "Regular", C.textBody));

    const sRow = figma.createFrame();
    sRow.layoutMode = "HORIZONTAL";
    sRow.itemSpacing = 8;
    sRow.fills = [];
    for (const s of j.s) {
      sRow.appendChild(createBadge(s, C.textBody, C.bgPage, C.borderSubtle));
    }
    card.appendChild(sRow);

    feed.appendChild(card);
    createdIds.push(card.id);
  }

  c1440.appendChild(feed);
  wrap.appendChild(c1440);
  page.appendChild(wrap);

  // Footer
  const footer = realFooter.clone();
  page.appendChild(footer);
  createdIds.push(footer.id);

  createdIds.push(page.id);
  return page;
}

// ----------------------------------------------------
// SCREEN 2: CHI TIET DU AN & FORM CHAO GIA (BID FORM)
// ----------------------------------------------------
function buildProjectDetail(x, y) {
  const page = figma.createFrame();
  page.name = "2. Nguoi Tim Viec - Chi tiet Du an & Dat chao gia (Project Detail & Bid)";
  page.resize(1920, 2150);
  page.x = x;
  page.y = y;
  page.layoutMode = "VERTICAL";
  page.itemSpacing = 0;
  page.fills = solid(C.bgPage);

  const h = realHeader.clone();
  h.fills = solid(C.bgWhite);
  page.appendChild(h);
  createdIds.push(h.id);

  const wrap = figma.createFrame();
  wrap.layoutMode = "HORIZONTAL";
  wrap.primaryAxisAlignItems = "CENTER";
  wrap.resize(1920, 1370);
  wrap.paddingTop = 36;
  wrap.fills = [];

  const c1440 = figma.createFrame();
  c1440.layoutMode = "HORIZONTAL";
  c1440.resize(1440, 1320);
  c1440.itemSpacing = 32;
  c1440.fills = [];

  // Left Column (960px)
  const leftCol = figma.createFrame();
  leftCol.layoutMode = "VERTICAL";
  leftCol.resize(960, 1320);
  leftCol.itemSpacing = 24;
  leftCol.fills = [];

  // Project Info Card
  const pCard = figma.createFrame();
  pCard.layoutMode = "VERTICAL";
  pCard.resize(960, 320);
  pCard.paddingTop = 28;
  pCard.paddingBottom = 28;
  pCard.paddingLeft = 32;
  pCard.paddingRight = 32;
  pCard.itemSpacing = 16;
  pCard.cornerRadius = 12;
  pCard.fills = solid(C.bgWhite);
  pCard.strokes = solid(C.borderSubtle);
  pCard.strokeWeight = 1;
  applyShadow(pCard);

  const topP = figma.createFrame();
  topP.layoutMode = "HORIZONTAL";
  topP.primaryAxisAlignItems = "SPACE_BETWEEN";
  topP.resize(896, 30);
  topP.fills = [];
  topP.appendChild(createText("Part-time Remote Golang Backend Engineer for Web Scraping Pipeline", 20, "Bold", C.textHeading));
  topP.appendChild(createText("$250 - $750 USD", 22, "Bold", C.emeraldPrice));
  pCard.appendChild(topP);

  pCard.appendChild(createText("Gia co dinh • Dang 15 phut truoc • Du an ID: 40823818", 13, "Regular", C.textMuted));
  pCard.appendChild(createText("Chung toi dang tim kiem mot Golang Software Engineer lam viec tu xa ban thoi gian de tham gia phat trien va toi uu hoa he thong crawler. Yeu cau thanh thao Goroutines, Channels, Redis Streams, PostgreSQL va Docker Compose.", 14, "Regular", C.textBody));

  const pSkills = figma.createFrame();
  pSkills.layoutMode = "HORIZONTAL";
  pSkills.itemSpacing = 8;
  pSkills.fills = [];
  pSkills.appendChild(createBadge("Golang"));
  pSkills.appendChild(createBadge("PostgreSQL"));
  pSkills.appendChild(createBadge("Redis"));
  pSkills.appendChild(createBadge("Docker"));
  pCard.appendChild(pSkills);
  leftCol.appendChild(pCard);

  // AUTHENTIC PLACE A BID FORM
  const bidCard = figma.createFrame();
  bidCard.layoutMode = "VERTICAL";
  bidCard.resize(960, 560);
  bidCard.paddingTop = 32;
  bidCard.paddingBottom = 32;
  bidCard.paddingLeft = 32;
  bidCard.paddingRight = 32;
  bidCard.itemSpacing = 20;
  bidCard.cornerRadius = 12;
  bidCard.fills = solid(C.bgWhite);
  bidCard.strokes = solid(C.primaryPink);
  bidCard.strokeWeight = 2;
  applyShadow(bidCard);

  bidCard.appendChild(createText("Dat chao gia cua ban (Place a Bid)", 22, "Bold", C.textHeading));
  bidCard.appendChild(createText("Ban se co co hoi duoc nha tuyen dung lua chon neu de xuat ro rang va chi tiet.", 14, "Regular", C.textMuted));

  const inputsRow = figma.createFrame();
  inputsRow.layoutMode = "HORIZONTAL";
  inputsRow.itemSpacing = 24;
  inputsRow.resize(896, 76);
  inputsRow.fills = [];

  // Field 1
  const f1b = figma.createFrame();
  f1b.layoutMode = "VERTICAL";
  f1b.itemSpacing = 6;
  f1b.resize(436, 76);
  f1b.fills = [];
  f1b.appendChild(createText("Gia chao thau cua ban ($ USD)", 14, "Bold", C.textHeading));
  const bBox1 = figma.createFrame();
  bBox1.resize(436, 44);
  bBox1.paddingLeft = 16;
  bBox1.layoutMode = "HORIZONTAL";
  bBox1.counterAxisAlignItems = "CENTER";
  bBox1.cornerRadius = 8;
  bBox1.fills = solid(C.bgPage);
  bBox1.strokes = solid(C.borderLight);
  bBox1.strokeWeight = 1;
  bBox1.appendChild(createText("$ 350.00 USD", 16, "Bold", C.textHeading));
  f1b.appendChild(bBox1);
  inputsRow.appendChild(f1b);

  // Field 2
  const f2b = figma.createFrame();
  f2b.layoutMode = "VERTICAL";
  f2b.itemSpacing = 6;
  f2b.resize(436, 76);
  f2b.fills = [];
  f2b.appendChild(createText("Giao hang trong (ngay)", 14, "Bold", C.textHeading));
  const bBox2 = figma.createFrame();
  bBox2.resize(436, 44);
  bBox2.paddingLeft = 16;
  bBox2.layoutMode = "HORIZONTAL";
  bBox2.counterAxisAlignItems = "CENTER";
  bBox2.cornerRadius = 8;
  bBox2.fills = solid(C.bgPage);
  bBox2.strokes = solid(C.borderLight);
  bBox2.strokeWeight = 1;
  bBox2.appendChild(createText("5 ngay", 16, "Regular", C.textHeading));
  f2b.appendChild(bBox2);
  inputsRow.appendChild(f2b);

  bidCard.appendChild(inputsRow);
  bidCard.appendChild(createText("Phi dich vu Freelancer: $35.00 USD (So tien thuc nhan: $315.00 USD)", 13, "Medium", C.primaryBlue));

  // Proposal Box
  const propBox = figma.createFrame();
  propBox.layoutMode = "VERTICAL";
  propBox.itemSpacing = 6;
  propBox.resize(896, 170);
  propBox.fills = [];
  propBox.appendChild(createText("Mieu ta de xuat cua ban (Toi thieu 100 ky tu)", 14, "Bold", C.textHeading));
  const tBox = figma.createFrame();
  tBox.resize(896, 136);
  tBox.paddingTop = 14;
  tBox.paddingLeft = 16;
  tBox.paddingRight = 16;
  tBox.cornerRadius = 8;
  tBox.fills = solid(C.bgPage);
  tBox.strokes = solid(C.borderLight);
  tBox.strokeWeight = 1;
  tBox.appendChild(createText("Kinh chao Quy khach! Toi la Senior Golang Developer voi hon 5 nam kinh nghiem xay dung he thong web crawler va pipeline xu ly du lieu quy mo lon. Toi da xem ky yeu cau ve Docker, Redis Streams va PostgreSQL...", 14, "Regular", C.textBody));
  propBox.appendChild(tBox);
  bidCard.appendChild(propBox);

  bidCard.appendChild(createButton("Gui chao gia ngay lap tuc", "primary", 896));
  leftCol.appendChild(bidCard);

  c1440.appendChild(leftCol);

  // Right Column: Client info (448px)
  const rightCol = figma.createFrame();
  rightCol.layoutMode = "VERTICAL";
  rightCol.resize(448, 600);
  rightCol.paddingTop = 28;
  rightCol.paddingBottom = 28;
  rightCol.paddingLeft = 28;
  rightCol.paddingRight = 28;
  rightCol.itemSpacing = 20;
  rightCol.cornerRadius = 12;
  rightCol.fills = solid(C.bgWhite);
  rightCol.strokes = solid(C.borderSubtle);
  rightCol.strokeWeight = 1;
  applyShadow(rightCol);

  rightCol.appendChild(createText("Thong tin nha tuyen dung", 18, "Bold", C.textHeading));

  const clRow = figma.createFrame();
  clRow.layoutMode = "HORIZONTAL";
  clRow.counterAxisAlignItems = "CENTER";
  clRow.itemSpacing = 16;
  clRow.fills = [];
  const clAv = figma.createEllipse();
  clAv.resize(52, 52);
  clAv.fills = solid(C.primaryBlue);
  clRow.appendChild(clAv);

  const clText = figma.createFrame();
  clText.layoutMode = "VERTICAL";
  clText.itemSpacing = 4;
  clText.fills = [];
  clText.appendChild(createText("Melbourne Tech Pty", 16, "Bold", C.textHeading));
  clText.appendChild(createText("Australia • Tham gia 3 nam truoc", 13, "Regular", C.textMuted));
  clRow.appendChild(clText);
  rightCol.appendChild(clRow);

  const verList = figma.createFrame();
  verList.layoutMode = "VERTICAL";
  verList.itemSpacing = 12;
  verList.fills = [];
  verList.appendChild(createText("[✓] Danh tinh da duoc xac minh", 14, "Medium", C.emeraldPrice));
  verList.appendChild(createText("[✓] Phuong thuc thanh toan da xac thuc", 14, "Medium", C.emeraldPrice));
  verList.appendChild(createText("[✓] So dien thoai da xac minh", 14, "Medium", C.emeraldPrice));
  verList.appendChild(createText("[✓] Email da xac minh", 14, "Medium", C.emeraldPrice));
  verList.appendChild(createText("Ty le thue thanh cong: 96%", 14, "Bold", C.textHeading));
  rightCol.appendChild(verList);

  rightCol.appendChild(createText("Lich su: 47 du an da dang, $14,200 USD tong tien da chi tra tren Freelancer.", 13, "Regular", C.textMuted));

  c1440.appendChild(rightCol);
  wrap.appendChild(c1440);
  page.appendChild(wrap);

  const footer = realFooter.clone();
  page.appendChild(footer);
  createdIds.push(footer.id);

  createdIds.push(page.id);
  return page;
}

// ----------------------------------------------------
// SCREEN 3: DANG TIN TUYEN DUNG (POST PROJECT WIZARD)
// ----------------------------------------------------
function buildPostProject(x, y) {
  const page = figma.createFrame();
  page.name = "3. Nguoi Thue - Dang Tin Tuyen Dung (Post Project Wizard 4 Steps)";
  page.resize(1920, 2050);
  page.x = x;
  page.y = y;
  page.layoutMode = "VERTICAL";
  page.itemSpacing = 0;
  page.fills = solid(C.bgPage);

  const h = realHeader.clone();
  h.fills = solid(C.bgWhite);
  page.appendChild(h);
  createdIds.push(h.id);

  const wrap = figma.createFrame();
  wrap.layoutMode = "HORIZONTAL";
  wrap.primaryAxisAlignItems = "CENTER";
  wrap.resize(1920, 1270);
  wrap.paddingTop = 40;
  wrap.fills = [];

  const card = figma.createFrame();
  card.layoutMode = "VERTICAL";
  card.resize(920, 1200);
  card.paddingTop = 36;
  card.paddingBottom = 36;
  card.paddingLeft = 40;
  card.paddingRight = 40;
  card.itemSpacing = 24;
  card.cornerRadius = 14;
  card.fills = solid(C.bgWhite);
  card.strokes = solid(C.borderSubtle);
  card.strokeWeight = 1;
  applyShadow(card);

  card.appendChild(createText("Noi cho chung toi biet ban can giup viec gi", 26, "Bold", C.textHeading));
  card.appendChild(createText("Nhan cac loi chao gia mien phi tu cac Freelancer gioi nhat trong vong vai phut.", 14, "Regular", C.textMuted));

  // Step 1
  const s1 = figma.createFrame();
  s1.layoutMode = "VERTICAL";
  s1.itemSpacing = 8;
  s1.resize(840, 78);
  s1.fills = [];
  s1.appendChild(createText("1. Chon tieu de cho du an cua ban", 15, "Bold", C.textHeading));
  const i1 = figma.createFrame();
  i1.resize(840, 46);
  i1.paddingLeft = 16;
  i1.layoutMode = "HORIZONTAL";
  i1.counterAxisAlignItems = "CENTER";
  i1.cornerRadius = 8;
  i1.fills = solid(C.bgPage);
  i1.strokes = solid(C.borderLight);
  i1.strokeWeight = 1;
  i1.appendChild(createText("Vi du: Thiet ke giao dien Website TMDT bang Figma va React...", 14, "Regular", C.textMuted));
  s1.appendChild(i1);
  card.appendChild(s1);

  // Step 2
  const s2 = figma.createFrame();
  s2.layoutMode = "VERTICAL";
  s2.itemSpacing = 8;
  s2.resize(840, 200);
  s2.fills = [];
  s2.appendChild(createText("2. Mieu ta chi tiet cong viec", 15, "Bold", C.textHeading));
  const i2 = figma.createFrame();
  i2.resize(840, 110);
  i2.paddingTop = 14;
  i2.paddingLeft = 16;
  i2.cornerRadius = 8;
  i2.fills = solid(C.bgPage);
  i2.strokes = solid(C.borderLight);
  i2.strokeWeight = 1;
  i2.appendChild(createText("Hay mo ta ro rang cac yeu cau, ket qua ban giao mong doi va thoi gian thuc hien...", 14, "Regular", C.textMuted));
  s2.appendChild(i2);

  const drop = figma.createFrame();
  drop.resize(840, 44);
  drop.layoutMode = "HORIZONTAL";
  drop.primaryAxisAlignItems = "CENTER";
  drop.counterAxisAlignItems = "CENTER";
  drop.cornerRadius = 8;
  drop.fills = solid(C.badgeBg);
  drop.strokes = solid(C.badgeBorder);
  drop.strokeWeight = 1;
  drop.appendChild(createText("+ Keo tha hoac tai len file dinh kem (PDF, Hinh anh, Docx)", 13, "Bold", C.primaryBlue));
  s2.appendChild(drop);
  card.appendChild(s2);

  // Step 3
  const s3 = figma.createFrame();
  s3.layoutMode = "VERTICAL";
  s3.itemSpacing = 8;
  s3.resize(840, 80);
  s3.fills = [];
  s3.appendChild(createText("3. Nhung ky nang nao duoc yeu cau?", 15, "Bold", C.textHeading));
  const tRow = figma.createFrame();
  tRow.layoutMode = "HORIZONTAL";
  tRow.itemSpacing = 8;
  tRow.fills = [];
  tRow.appendChild(createBadge("Figma x", C.primaryPink, C.bgWhite, C.primaryPink));
  tRow.appendChild(createBadge("UI/UX Design x", C.primaryPink, C.bgWhite, C.primaryPink));
  tRow.appendChild(createBadge("Graphic Design x", C.primaryPink, C.bgWhite, C.primaryPink));
  tRow.appendChild(createBadge("+ Them ky nang", C.primaryBlue, C.bgPage, C.borderLight));
  s3.appendChild(tRow);
  card.appendChild(s3);

  // Step 4
  const s4 = figma.createFrame();
  s4.layoutMode = "VERTICAL";
  s4.itemSpacing = 10;
  s4.resize(840, 140);
  s4.fills = [];
  s4.appendChild(createText("4. Ngan sach du kien cua ban", 15, "Bold", C.textHeading));

  const bRow = figma.createFrame();
  bRow.layoutMode = "HORIZONTAL";
  bRow.itemSpacing = 20;
  bRow.fills = [];

  const b1 = figma.createFrame();
  b1.layoutMode = "VERTICAL";
  b1.resize(410, 90);
  b1.paddingTop = 16;
  b1.paddingLeft = 20;
  b1.cornerRadius = 10;
  b1.fills = solid(C.bgWhite);
  b1.strokes = solid(C.primaryPink);
  b1.strokeWeight = 2;
  b1.appendChild(createText("[•] Thanh toan gia co dinh", 15, "Bold", C.textHeading));
  b1.appendChild(createText("$250 - $750 USD (Muc chuan pho bien)", 13, "Regular", C.textMuted));
  bRow.appendChild(b1);

  const b2 = figma.createFrame();
  b2.layoutMode = "VERTICAL";
  b2.resize(410, 90);
  b2.paddingTop = 16;
  b2.paddingLeft = 20;
  b2.cornerRadius = 10;
  b2.fills = solid(C.bgWhite);
  b2.strokes = solid(C.borderSubtle);
  b2.strokeWeight = 1;
  b2.appendChild(createText("[ ] Thanh toan theo gio", 15, "Medium", C.textHeading));
  b2.appendChild(createText("$15 - $25 USD / gio lam viec", 13, "Regular", C.textMuted));
  bRow.appendChild(b2);

  s4.appendChild(bRow);
  card.appendChild(s4);

  card.appendChild(createButton("Dang du an va nhan chao gia ngay lap tuc", "primary", 840));

  wrap.appendChild(card);
  page.appendChild(wrap);

  const footer = realFooter.clone();
  page.appendChild(footer);
  createdIds.push(footer.id);

  createdIds.push(page.id);
  return page;
}

// ----------------------------------------------------
// SCREEN 4: HO SO FREELANCER (@phun4 PROFILE)
// ----------------------------------------------------
function buildProfile(x, y) {
  const page = figma.createFrame();
  page.name = "4. Nguoi Tim Viec - Ho so Ca nhan (@phun4 Profile)";
  page.resize(1920, 2050);
  page.x = x;
  page.y = y;
  page.layoutMode = "VERTICAL";
  page.itemSpacing = 0;
  page.fills = solid(C.bgPage);

  const h = realHeader.clone();
  h.fills = solid(C.bgWhite);
  page.appendChild(h);
  createdIds.push(h.id);

  const wrap = figma.createFrame();
  wrap.layoutMode = "VERTICAL";
  wrap.primaryAxisAlignItems = "CENTER";
  wrap.resize(1920, 1270);
  wrap.paddingTop = 36;
  wrap.itemSpacing = 24;
  wrap.fills = [];

  // Profile Header Card (1440w)
  const pCard = figma.createFrame();
  pCard.layoutMode = "HORIZONTAL";
  pCard.primaryAxisAlignItems = "SPACE_BETWEEN";
  pCard.counterAxisAlignItems = "CENTER";
  pCard.resize(1440, 160);
  pCard.paddingLeft = 40;
  pCard.paddingRight = 40;
  pCard.cornerRadius = 14;
  pCard.fills = solid(C.bgWhite);
  pCard.strokes = solid(C.borderSubtle);
  pCard.strokeWeight = 1;
  applyShadow(pCard);

  const leftP = figma.createFrame();
  leftP.layoutMode = "HORIZONTAL";
  leftP.counterAxisAlignItems = "CENTER";
  leftP.itemSpacing = 24;
  leftP.fills = [];

  const av = figma.createEllipse();
  av.resize(88, 88);
  av.fills = solid(C.primaryPink);
  leftP.appendChild(av);

  const pInfo = figma.createFrame();
  pInfo.layoutMode = "VERTICAL";
  pInfo.itemSpacing = 6;
  pInfo.fills = [];
  pInfo.appendChild(createText("phu nguyen (@phun4)", 24, "Bold", C.textHeading));
  pInfo.appendChild(createText("Senior Fullstack & AI Integration Engineer | 5+ Years Exp", 16, "Medium", C.primaryBlue));
  pInfo.appendChild(createText("Da nang, Viet Nam • Tham gia thang 11 nam 2026", 13, "Regular", C.textMuted));
  leftP.appendChild(pInfo);
  pCard.appendChild(leftP);

  const rightP = figma.createFrame();
  rightP.layoutMode = "VERTICAL";
  rightP.counterAxisAlignItems = "FLEX_END";
  rightP.itemSpacing = 10;
  rightP.fills = [];
  rightP.appendChild(createText("$25.00 USD / gio", 22, "Bold", C.emeraldPrice));
  rightP.appendChild(createButton("Chinh sua ho so", "outline"));
  pCard.appendChild(rightP);
  wrap.appendChild(pCard);

  // 2-Column Content Grid
  const grid = figma.createFrame();
  grid.layoutMode = "HORIZONTAL";
  grid.resize(1440, 1000);
  grid.itemSpacing = 32;
  grid.fills = [];

  // Left (960px)
  const leftG = figma.createFrame();
  leftG.layoutMode = "VERTICAL";
  leftG.resize(960, 1000);
  leftG.paddingTop = 28;
  leftG.paddingBottom = 28;
  leftG.paddingLeft = 32;
  leftG.paddingRight = 32;
  leftG.itemSpacing = 20;
  leftG.cornerRadius = 12;
  leftG.fills = solid(C.bgWhite);
  leftG.strokes = solid(C.borderSubtle);
  leftG.strokeWeight = 1;
  applyShadow(leftG);

  leftG.appendChild(createText("Gioi thieu ve ban than", 18, "Bold", C.textHeading));
  leftG.appendChild(createText("Xin chao! Toi la ky su phan mem chuyen ve kien truc he thong Backend hieu nang cao voi FastAPI, Python, Golang va Frontend hien dai. Toi cam ket mang lai chat luong code tot nhat, bao mat cao va ho tro ky thuat dai han cho tat ca khach hang tren Freelancer.", 14, "Regular", C.textBody));

  leftG.appendChild(createText("Cac ky nang hang dau", 16, "Bold", C.textHeading));
  const skRow = figma.createFrame();
  skRow.layoutMode = "HORIZONTAL";
  skRow.itemSpacing = 8;
  skRow.fills = [];
  skRow.appendChild(createBadge("Python"));
  skRow.appendChild(createBadge("FastAPI"));
  skRow.appendChild(createBadge("Golang"));
  skRow.appendChild(createBadge("PostgreSQL"));
  skRow.appendChild(createBadge("Docker"));
  leftG.appendChild(skRow);

  leftG.appendChild(createText("Danh gia tu khach hang", 18, "Bold", C.textHeading));
  leftG.appendChild(createText("Chua co danh gia nao. Hay chao gia cac du an dau tien de tich luy uy tin va sao danh gia!", 14, "Regular", C.textMuted));

  grid.appendChild(leftG);

  // Right (448px)
  const rightG = figma.createFrame();
  rightG.layoutMode = "VERTICAL";
  rightG.resize(448, 1000);
  rightG.paddingTop = 28;
  rightG.paddingBottom = 28;
  rightG.paddingLeft = 28;
  rightG.paddingRight = 28;
  rightG.itemSpacing = 16;
  rightG.cornerRadius = 12;
  rightG.fills = solid(C.bgWhite);
  rightG.strokes = solid(C.borderSubtle);
  rightG.strokeWeight = 1;
  applyShadow(rightG);

  rightG.appendChild(createText("Xac thuc ho so", 18, "Bold", C.textHeading));
  rightG.appendChild(createText("[✓] Email da xac minh", 14, "Medium", C.emeraldPrice));
  rightG.appendChild(createText("[✓] Phuong thuc thanh toan da xac minh", 14, "Medium", C.emeraldPrice));
  rightG.appendChild(createText("[!] So dien thoai chua xac minh", 14, "Medium", C.primaryPink));
  rightG.appendChild(createText("[!] CMND/CCCD chua xac minh", 14, "Medium", C.primaryPink));

  grid.appendChild(rightG);
  wrap.appendChild(grid);
  page.appendChild(wrap);

  const footer = realFooter.clone();
  page.appendChild(footer);
  createdIds.push(footer.id);

  createdIds.push(page.id);
  return page;
}

// ----------------------------------------------------
// SCREEN 5: DANH MUC THUE FREELANCER (HIRE DIRECTORY)
// ----------------------------------------------------
function buildHireDirectory(x, y) {
  const page = figma.createFrame();
  page.name = "5. Nguoi Thue - Danh muc Thue Freelancer (Hire Directory)";
  page.resize(1920, 2050);
  page.x = x;
  page.y = y;
  page.layoutMode = "VERTICAL";
  page.itemSpacing = 0;
  page.fills = solid(C.bgPage);

  const h = realHeader.clone();
  h.fills = solid(C.bgWhite);
  page.appendChild(h);
  createdIds.push(h.id);

  const wrap = figma.createFrame();
  wrap.layoutMode = "VERTICAL";
  wrap.primaryAxisAlignItems = "CENTER";
  wrap.resize(1920, 1270);
  wrap.paddingTop = 36;
  wrap.itemSpacing = 28;
  wrap.fills = [];

  const c1440 = figma.createFrame();
  c1440.layoutMode = "VERTICAL";
  c1440.resize(1440, 1200);
  c1440.itemSpacing = 24;
  c1440.fills = [];

  c1440.appendChild(createText("Thue Freelancer hang dau Viet Nam & Quoc Te", 26, "Bold", C.textHeading));
  c1440.appendChild(createText("Kham pha hon 50 trieu chuyen gia san sang thuc hien moi y tuong cua ban.", 15, "Regular", C.textMuted));

  // Category Cards
  const catRow = figma.createFrame();
  catRow.layoutMode = "HORIZONTAL";
  catRow.itemSpacing = 20;
  catRow.resize(1440, 110);
  catRow.fills = [];

  const cats = [
    { n: "Website & IT", c: "14,200 chuyen gia" },
    { n: "Thiet ke Do hoa", c: "9,800 chuyen gia" },
    { n: "Viet lach & Noi dung", c: "7,500 chuyen gia" },
    { n: "Tiep thi & Ban hang", c: "5,300 chuyen gia" }
  ];

  for (const ct of cats) {
    const box = figma.createFrame();
    box.layoutMode = "VERTICAL";
    box.primaryAxisAlignItems = "CENTER";
    box.counterAxisAlignItems = "CENTER";
    box.resize(345, 110);
    box.itemSpacing = 6;
    box.cornerRadius = 10;
    box.fills = solid(C.bgWhite);
    box.strokes = solid(C.borderSubtle);
    box.strokeWeight = 1;
    applyShadow(box);
    box.appendChild(createText(ct.n, 16, "Bold", C.textHeading));
    box.appendChild(createText(ct.c, 13, "Medium", C.primaryBlue));
    catRow.appendChild(box);
  }
  c1440.appendChild(catRow);

  c1440.appendChild(createText("Freelancers duoc danh gia cao nhat", 20, "Bold", C.textHeading));

  const flList = [
    { n: "Tuan Anh M.", t: "Fullstack Python & AI Engineer", r: "$30.00 / gio", star: "★ 5.0 (48 danh gia)", s: ["Python", "FastAPI", "React", "AI Integration"] },
    { n: "Linh Nguyen", t: "Senior UI/UX & Mobile App Designer", r: "$22.00 / gio", star: "★ 4.9 (112 danh gia)", s: ["Figma", "UI/UX", "Adobe XD", "Design System"] },
    { n: "David K.", t: "Golang & High-Load Architecture Specialist", r: "$45.00 / gio", star: "★ 5.0 (27 danh gia)", s: ["Golang", "Kubernetes", "Microservices", "PostgreSQL"] }
  ];

  for (const fl of flList) {
    const card = figma.createFrame();
    card.layoutMode = "HORIZONTAL";
    card.primaryAxisAlignItems = "SPACE_BETWEEN";
    card.counterAxisAlignItems = "CENTER";
    card.resize(1440, 110);
    card.paddingLeft = 28;
    card.paddingRight = 28;
    card.cornerRadius = 10;
    card.fills = solid(C.bgWhite);
    card.strokes = solid(C.borderSubtle);
    card.strokeWeight = 1;
    applyShadow(card);

    const leftFl = figma.createFrame();
    leftFl.layoutMode = "HORIZONTAL";
    leftFl.counterAxisAlignItems = "CENTER";
    leftFl.itemSpacing = 20;
    leftFl.fills = [];

    const flAv = figma.createEllipse();
    flAv.resize(60, 60);
    flAv.fills = solid(C.primaryBlue);
    leftFl.appendChild(flAv);

    const flText = figma.createFrame();
    flText.layoutMode = "VERTICAL";
    flText.itemSpacing = 4;
    flText.fills = [];
    flText.appendChild(createText(fl.n + " • " + fl.star, 16, "Bold", C.textHeading));
    flText.appendChild(createText(fl.t, 14, "Medium", C.primaryPink));
    const flSk = figma.createFrame();
    flSk.layoutMode = "HORIZONTAL";
    flSk.itemSpacing = 6;
    flSk.fills = [];
    for (const sk of fl.s) {
      flSk.appendChild(createBadge(sk, C.textBody, C.bgPage, C.borderSubtle));
    }
    flText.appendChild(flSk);
    leftFl.appendChild(flText);
    card.appendChild(leftFl);

    const rightFl = figma.createFrame();
    rightFl.layoutMode = "HORIZONTAL";
    rightFl.counterAxisAlignItems = "CENTER";
    rightFl.itemSpacing = 20;
    rightFl.fills = [];
    rightFl.appendChild(createText(fl.r, 20, "Bold", C.emeraldPrice));
    rightFl.appendChild(createButton("Thue ngay", "primary"));
    card.appendChild(rightFl);

    c1440.appendChild(card);
    createdIds.push(card.id);
  }

  wrap.appendChild(c1440);
  page.appendChild(wrap);

  const footer = realFooter.clone();
  page.appendChild(footer);
  createdIds.push(footer.id);

  createdIds.push(page.id);
  return page;
}

// ----------------------------------------------------
// SCREEN 6: QUY TRINH ONBOARDING 11 BUOC (MODAL FUNNEL)
// ----------------------------------------------------
function buildOnboarding(x, y) {
  const page = figma.createFrame();
  page.name = "6. Quy trinh Onboarding 11 buoc (Freelancer Onboarding Pipeline)";
  page.resize(1920, 2050);
  page.x = x;
  page.y = y;
  page.layoutMode = "VERTICAL";
  page.itemSpacing = 0;
  page.fills = solid(C.bgPage);

  const h = realHeader.clone();
  h.fills = solid(C.bgWhite);
  page.appendChild(h);
  createdIds.push(h.id);

  const wrap = figma.createFrame();
  wrap.layoutMode = "HORIZONTAL";
  wrap.primaryAxisAlignItems = "CENTER";
  wrap.counterAxisAlignItems = "CENTER";
  wrap.resize(1920, 1270);
  wrap.fills = [];

  // Modal Container (520w)
  const modal = figma.createFrame();
  modal.layoutMode = "VERTICAL";
  modal.resize(520, 780);
  modal.cornerRadius = 16;
  modal.fills = solid(C.bgWhite);
  modal.strokes = solid(C.borderSubtle);
  modal.strokeWeight = 1;
  applyShadow(modal);

  // Modal Header with Progress
  const mHead = figma.createFrame();
  mHead.layoutMode = "VERTICAL";
  mHead.resize(520, 64);
  mHead.fills = solid(C.bgWhite);

  const hRow = figma.createFrame();
  hRow.layoutMode = "HORIZONTAL";
  hRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  hRow.counterAxisAlignItems = "CENTER";
  hRow.resize(520, 60);
  hRow.paddingLeft = 24;
  hRow.paddingRight = 24;
  hRow.fills = [];
  hRow.appendChild(createText("< Ky nang cua ban", 16, "Bold", C.textHeading));
  hRow.appendChild(createText("Buoc 4/11", 13, "Bold", C.primaryBlue));
  mHead.appendChild(hRow);

  const pBar = figma.createFrame();
  pBar.resize(230, 4);
  pBar.fills = solid(C.primaryBlue);
  mHead.appendChild(pBar);
  modal.appendChild(mHead);

  // Modal Body
  const mBody = figma.createFrame();
  mBody.layoutMode = "VERTICAL";
  mBody.resize(520, 716);
  mBody.paddingTop = 24;
  mBody.paddingBottom = 24;
  mBody.paddingLeft = 32;
  mBody.paddingRight = 32;
  mBody.itemSpacing = 16;
  mBody.fills = [];

  mBody.appendChild(createText("Hay cho chung toi biet cac ky nang tot nhat cua ban", 20, "Bold", C.textHeading));
  mBody.appendChild(createText("Viec nay giup chung toi khuyen nghi cong viec phu hop nhat cho ban.", 14, "Regular", C.textMuted));

  const sIn = figma.createFrame();
  sIn.resize(456, 44);
  sIn.paddingLeft = 16;
  sIn.layoutMode = "HORIZONTAL";
  sIn.counterAxisAlignItems = "CENTER";
  sIn.cornerRadius = 8;
  sIn.fills = solid(C.bgPage);
  sIn.strokes = solid(C.borderLight);
  sIn.strokeWeight = 1;
  sIn.appendChild(createText("Tim kiem ky nang...", 14, "Regular", C.textMuted));
  mBody.appendChild(sIn);

  const sks = [
    { n: "Graphic Design (713 cong viec)", sel: true },
    { n: "Video Editing (462 cong viec)", sel: true },
    { n: "Website Design (391 cong viec)", sel: false },
    { n: "Video Production (371 cong viec)", sel: false },
    { n: "Photoshop (308 cong viec)", sel: true },
    { n: "After Effects (312 cong viec)", sel: false }
  ];

  for (const sk of sks) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisAlignItems = "SPACE_BETWEEN";
    row.counterAxisAlignItems = "CENTER";
    row.resize(456, 50);
    row.paddingLeft = 16;
    row.paddingRight = 16;
    row.cornerRadius = 8;
    row.fills = solid(sk.sel ? C.badgeBg : C.bgWhite);
    row.strokes = solid(sk.sel ? C.primaryBlue : C.borderSubtle);
    row.strokeWeight = 1;
    row.appendChild(createText(sk.n, 14, "Medium", sk.sel ? C.primaryBlue : C.textHeading));
    row.appendChild(createText(sk.sel ? "[Da chon ✓]" : "+", 14, "Bold", sk.sel ? C.primaryPink : C.primaryBlue));
    mBody.appendChild(row);
  }

  const actRow = figma.createFrame();
  actRow.layoutMode = "HORIZONTAL";
  actRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  actRow.resize(456, 48);
  actRow.fills = [];
  actRow.appendChild(createButton("Bo qua", "outline"));
  actRow.appendChild(createButton("Tiep theo →", "blue"));
  mBody.appendChild(actRow);

  modal.appendChild(mBody);
  wrap.appendChild(modal);
  page.appendChild(wrap);

  const footer = realFooter.clone();
  page.appendChild(footer);
  createdIds.push(footer.id);

  createdIds.push(page.id);
  return page;
}

// Positioning
const startX = 1400;
const gapX = 2100;
const startY = 100;
const gapY = 2500;

const p1 = buildJobsBrowse(startX, startY);
const p2 = buildProjectDetail(startX + gapX, startY);
const p3 = buildPostProject(startX + gapX * 2, startY);

const p4 = buildProfile(startX, startY + gapY);
const p5 = buildHireDirectory(startX + gapX, startY + gapY);
const p6 = buildOnboarding(startX + gapX * 2, startY + gapY);

figma.currentPage.selection = [p1, p2, p3, p4, p5, p6];
figma.viewport.scrollAndZoomIntoView([p1, p2, p3, p4, p5, p6]);

return {
  success: true,
  screenIds: [p1.id, p2.id, p3.id, p4.id, p5.id, p6.id],
  totalNodes: createdIds.length
};
""")
print("Successfully written generate_master_screens.js!")
