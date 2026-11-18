
// 1. Load Fonts
await Promise.all([
  figma.loadFontAsync({ family: "Inter", style: "Regular" }),
  figma.loadFontAsync({ family: "Inter", style: "Medium" }),
  figma.loadFontAsync({ family: "Inter", style: "Bold" })
]);

const createdNodeIds = [];

// Color Palette (Freelancer VN Authentic Dark Mode)
const C = {
  bgApp: { r: 0.031, g: 0.035, b: 0.051 },       // #08090d
  navBar: { r: 0.075, g: 0.106, b: 0.149 },      // #131b26
  cardBg: { r: 0.086, g: 0.122, b: 0.180 },      // #161f2e
  cardHover: { r: 0.114, g: 0.157, b: 0.227 },   // #1d283a
  border: { r: 0.137, g: 0.176, b: 0.239 },      // #232d3d
  borderLight: { r: 0.196, g: 0.247, b: 0.329 }, // #323f54
  primaryPink: { r: 0.902, g: 0.008, b: 0.471 },  // #e60278
  primaryBlue: { r: 0.090, g: 0.447, b: 0.922 },  // #1772eb
  accentGreen: { r: 0.063, g: 0.725, b: 0.506 },  // #10b981
  textWhite: { r: 0.961, g: 0.969, b: 0.980 },    // #f5f7fa
  textMuted: { r: 0.608, g: 0.655, b: 0.729 },    // #9ba7ba
  textSub: { r: 0.435, g: 0.490, b: 0.573 }       // #6f7d92
};

function solid(c, opacity = 1) {
  return [{ type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity: opacity }];
}

function createText(content, size = 14, fontStyle = "Regular", color = C.textWhite, align = "LEFT") {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: fontStyle };
  t.characters = content;
  t.fontSize = size;
  t.fills = solid(color);
  t.textAlignHorizontal = align;
  createdNodeIds.push(t.id);
  return t;
}

function createBadge(label, color = C.primaryBlue, bgColor = C.navBar) {
  const badge = figma.createFrame();
  badge.layoutMode = "HORIZONTAL";
  badge.primaryAxisSizingMode = "AUTO";
  badge.counterAxisSizingMode = "AUTO";
  badge.paddingLeft = 8;
  badge.paddingRight = 8;
  badge.paddingTop = 4;
  badge.paddingBottom = 4;
  badge.cornerRadius = 4;
  badge.fills = solid(bgColor);
  badge.strokes = solid(color);
  badge.strokeWeight = 1;

  const t = createText(label, 11, "Medium", color);
  badge.appendChild(t);
  createdNodeIds.push(badge.id);
  return badge;
}

function createButton(label, variant = "primary", width = null) {
  const btn = figma.createFrame();
  btn.layoutMode = "HORIZONTAL";
  btn.primaryAxisAlignItems = "CENTER";
  btn.counterAxisAlignItems = "CENTER";
  btn.paddingTop = 10;
  btn.paddingBottom = 10;
  btn.paddingLeft = 20;
  btn.paddingRight = 20;
  btn.cornerRadius = 6;

  if (width) {
    btn.resize(width, 42);
    btn.layoutAlign = "STRETCH";
  }

  if (variant === "primary") {
    btn.fills = solid(C.primaryPink);
    const t = createText(label, 14, "Bold", C.textWhite);
    btn.appendChild(t);
  } else if (variant === "blue") {
    btn.fills = solid(C.primaryBlue);
    const t = createText(label, 14, "Bold", C.textWhite);
    btn.appendChild(t);
  } else {
    btn.fills = solid(C.cardBg);
    btn.strokes = solid(C.borderLight);
    btn.strokeWeight = 1;
    const t = createText(label, 14, "Medium", C.textWhite);
    btn.appendChild(t);
  }
  createdNodeIds.push(btn.id);
  return btn;
}

function createHeader(activeTab = "browse") {
  const header = figma.createFrame();
  header.name = "Header / Navigation Bar";
  header.layoutMode = "HORIZONTAL";
  header.primaryAxisAlignItems = "SPACE_BETWEEN";
  header.counterAxisAlignItems = "CENTER";
  header.resize(1200, 64);
  header.layoutAlign = "STRETCH";
  header.paddingLeft = 32;
  header.paddingRight = 32;
  header.fills = solid(C.navBar);
  header.strokes = solid(C.border);
  header.strokeWeight = 1;

  const left = figma.createFrame();
  left.layoutMode = "HORIZONTAL";
  left.counterAxisAlignItems = "CENTER";
  left.itemSpacing = 28;
  left.fills = [];

  const logo = createText("freelancer", 22, "Bold", C.primaryBlue);
  left.appendChild(logo);

  const nav1 = createText("Tim viec", 14, activeTab === "jobs" ? "Bold" : "Regular", activeTab === "jobs" ? C.primaryPink : C.textWhite);
  const nav2 = createText("Thue Freelancer", 14, activeTab === "hire" ? "Bold" : "Regular", activeTab === "hire" ? C.primaryPink : C.textWhite);
  const nav3 = createText("Du an cua toi", 14, "Regular", C.textMuted);
  left.appendChild(nav1);
  left.appendChild(nav2);
  left.appendChild(nav3);
  header.appendChild(left);

  const right = figma.createFrame();
  right.layoutMode = "HORIZONTAL";
  right.counterAxisAlignItems = "CENTER";
  right.itemSpacing = 16;
  right.fills = [];

  const postBtn = createButton("Dang du an", "primary");
  right.appendChild(postBtn);

  const userPill = figma.createFrame();
  userPill.layoutMode = "HORIZONTAL";
  userPill.counterAxisAlignItems = "CENTER";
  userPill.itemSpacing = 8;
  userPill.paddingLeft = 12;
  userPill.paddingRight = 12;
  userPill.paddingTop = 6;
  userPill.paddingBottom = 6;
  userPill.cornerRadius = 20;
  userPill.fills = solid(C.cardBg);
  userPill.strokes = solid(C.border);
  userPill.strokeWeight = 1;

  const avatar = figma.createEllipse();
  avatar.resize(24, 24);
  avatar.fills = solid(C.primaryBlue);

  const userName = createText("@phun4", 13, "Medium", C.textWhite);
  const balance = createText("$0.00 USD", 13, "Bold", C.accentGreen);
  userPill.appendChild(avatar);
  userPill.appendChild(userName);
  userPill.appendChild(balance);

  right.appendChild(userPill);
  header.appendChild(right);
  createdNodeIds.push(header.id);
  return header;
}

// 1. SCREEN 1: BROWSE JOBS
function buildBrowseJobsScreen(x, y) {
  const screen = figma.createFrame();
  screen.name = "1. Nguoi Tim Viec - Danh sach Tim Viec (Jobs Browse)";
  screen.resize(1200, 950);
  screen.x = x;
  screen.y = y;
  screen.layoutMode = "VERTICAL";
  screen.itemSpacing = 0;
  screen.fills = solid(C.bgApp);

  screen.appendChild(createHeader("jobs"));

  const subBar = figma.createFrame();
  subBar.layoutMode = "HORIZONTAL";
  subBar.counterAxisAlignItems = "CENTER";
  subBar.resize(1200, 72);
  subBar.paddingLeft = 32;
  subBar.paddingRight = 32;
  subBar.itemSpacing = 16;
  subBar.fills = solid(C.cardBg);
  subBar.strokes = solid(C.border);
  subBar.strokeWeight = 1;

  const searchInput = figma.createFrame();
  searchInput.layoutMode = "HORIZONTAL";
  searchInput.counterAxisAlignItems = "CENTER";
  searchInput.resize(800, 44);
  searchInput.paddingLeft = 16;
  searchInput.cornerRadius = 6;
  searchInput.fills = solid(C.bgApp);
  searchInput.strokes = solid(C.borderLight);
  searchInput.strokeWeight = 1;
  searchInput.appendChild(createText("Tim kiem cong viec (vi du: Python, Graphic Design, Web scraping)...", 14, "Regular", C.textSub));

  const filterBtn = createButton("Tim kiem", "blue");
  subBar.appendChild(searchInput);
  subBar.appendChild(filterBtn);
  screen.appendChild(subBar);

  const mainBody = figma.createFrame();
  mainBody.layoutMode = "HORIZONTAL";
  mainBody.resize(1200, 814);
  mainBody.paddingTop = 24;
  mainBody.paddingBottom = 24;
  mainBody.paddingLeft = 32;
  mainBody.paddingRight = 32;
  mainBody.itemSpacing = 24;
  mainBody.fills = [];

  const sidebar = figma.createFrame();
  sidebar.layoutMode = "VERTICAL";
  sidebar.resize(280, 760);
  sidebar.paddingTop = 20;
  sidebar.paddingBottom = 20;
  sidebar.paddingLeft = 20;
  sidebar.paddingRight = 20;
  sidebar.itemSpacing = 20;
  sidebar.cornerRadius = 8;
  sidebar.fills = solid(C.cardBg);
  sidebar.strokes = solid(C.border);
  sidebar.strokeWeight = 1;

  sidebar.appendChild(createText("Bo loc cong viec", 16, "Bold", C.textWhite));

  const typeGroup = figma.createFrame();
  typeGroup.layoutMode = "VERTICAL";
  typeGroup.itemSpacing = 10;
  typeGroup.fills = [];
  typeGroup.appendChild(createText("Loai du an", 14, "Medium", C.textMuted));
  typeGroup.appendChild(createText("[X] Du an gia co dinh (Fixed)", 13, "Regular", C.textWhite));
  typeGroup.appendChild(createText("[X] Du an theo gio (Hourly)", 13, "Regular", C.textWhite));
  sidebar.appendChild(typeGroup);

  const budgetGroup = figma.createFrame();
  budgetGroup.layoutMode = "VERTICAL";
  budgetGroup.itemSpacing = 10;
  budgetGroup.fills = [];
  budgetGroup.appendChild(createText("Ngan sach (USD)", 14, "Medium", C.textMuted));
  budgetGroup.appendChild(createText("Tu: $10 - Den: $1,500+", 13, "Regular", C.textWhite));
  sidebar.appendChild(budgetGroup);

  const skillsGroup = figma.createFrame();
  skillsGroup.layoutMode = "VERTICAL";
  skillsGroup.itemSpacing = 10;
  skillsGroup.fills = [];
  skillsGroup.appendChild(createText("Ky nang yeu cau", 14, "Medium", C.textMuted));
  skillsGroup.appendChild(createBadge("Python (412)"));
  skillsGroup.appendChild(createBadge("Graphic Design (713)"));
  skillsGroup.appendChild(createBadge("Web Scraping (198)"));
  skillsGroup.appendChild(createBadge("Excel Data Entry (308)"));
  sidebar.appendChild(skillsGroup);

  mainBody.appendChild(sidebar);

  const feed = figma.createFrame();
  feed.layoutMode = "VERTICAL";
  feed.resize(832, 760);
  feed.itemSpacing = 16;
  feed.fills = [];

  const feedHeader = figma.createFrame();
  feedHeader.layoutMode = "HORIZONTAL";
  feedHeader.primaryAxisAlignItems = "SPACE_BETWEEN";
  feedHeader.resize(832, 32);
  feedHeader.fills = [];
  feedHeader.appendChild(createText("4,453 viec lam freelance phu hop voi ban", 16, "Bold", C.textWhite));
  feedHeader.appendChild(createText("Sap xep: Moi nhat v", 13, "Medium", C.primaryBlue));
  feed.appendChild(feedHeader);

  const sampleJobs = [
    {
      title: "Part-time Remote Golang Backend Engineer for Web Scraping Pipeline",
      budget: "$250 - $750 USD",
      type: "Gia co dinh",
      time: "6 phut truoc",
      desc: "Chung toi can mot lap trinh vien Golang giau kinh nghiem de toi uu hoa he thong pipeline thu thap du lieu, quan ly Redis queue va PostgreSQL.",
      skills: ["Golang", "PostgreSQL", "Redis", "Docker", "Web Scraping"],
      bids: "4 chao gia"
    },
    {
      title: "Excel Data Entry & Cleanup Specialist needed urgently",
      budget: "$30 - $250 USD",
      type: "Gia co dinh",
      time: "24 phut truoc",
      desc: "Can xu ly va chuan hoa hon 10,000 dong du lieu khach hang tu cac file Excel roi rac sang mau chuan cua cong ty.",
      skills: ["Data Entry", "Excel", "Data Processing", "Virtual Assistant"],
      bids: "19 chao gia"
    },
    {
      title: "Thiet ke bo nhan dien thuong hieu va UI Landing Page cho Startup AI",
      budget: "$15 - $25 USD / gio",
      type: "Theo gio",
      time: "1 gio truoc",
      desc: "Tim Freelancer UI/UX chuyen nghiep thiet ke Design System tren Figma cho san pham AI agent moi ra mat.",
      skills: ["Figma", "UI/UX Design", "Graphic Design", "Branding"],
      bids: "12 chao gia"
    }
  ];

  for (const job of sampleJobs) {
    const card = figma.createFrame();
    card.layoutMode = "VERTICAL";
    card.resize(832, 180);
    card.paddingTop = 16;
    card.paddingBottom = 16;
    card.paddingLeft = 20;
    card.paddingRight = 20;
    card.itemSpacing = 12;
    card.cornerRadius = 8;
    card.fills = solid(C.cardBg);
    card.strokes = solid(C.border);
    card.strokeWeight = 1;

    const topRow = figma.createFrame();
    topRow.layoutMode = "HORIZONTAL";
    topRow.primaryAxisAlignItems = "SPACE_BETWEEN";
    topRow.resize(792, 24);
    topRow.fills = [];
    topRow.appendChild(createText(job.title, 16, "Bold", C.textWhite));
    topRow.appendChild(createText(job.budget, 16, "Bold", C.accentGreen));
    card.appendChild(topRow);

    const meta = figma.createFrame();
    meta.layoutMode = "HORIZONTAL";
    meta.itemSpacing = 12;
    meta.fills = [];
    meta.appendChild(createText(job.type, 12, "Medium", C.primaryPink));
    meta.appendChild(createText("•", 12, "Regular", C.textSub));
    meta.appendChild(createText(job.time, 12, "Regular", C.textMuted));
    meta.appendChild(createText("•", 12, "Regular", C.textSub));
    meta.appendChild(createText(job.bids, 12, "Regular", C.primaryBlue));
    card.appendChild(meta);

    const d = createText(job.desc, 13, "Regular", C.textMuted);
    card.appendChild(d);

    const tagsRow = figma.createFrame();
    tagsRow.layoutMode = "HORIZONTAL";
    tagsRow.itemSpacing = 8;
    tagsRow.fills = [];
    for (const s of job.skills) {
      tagsRow.appendChild(createBadge(s, C.textMuted, C.bgApp));
    }
    card.appendChild(tagsRow);
    feed.appendChild(card);
    createdNodeIds.push(card.id);
  }

  mainBody.appendChild(feed);
  screen.appendChild(mainBody);
  createdNodeIds.push(screen.id);
  return screen;
}

// 2. SCREEN 2: PROJECT DETAIL & BID
function buildProjectDetailScreen(x, y) {
  const screen = figma.createFrame();
  screen.name = "2. Nguoi Tim Viec - Chi tiet Du an & Dat chao gia (Project Detail & Bid)";
  screen.resize(1200, 950);
  screen.x = x;
  screen.y = y;
  screen.layoutMode = "VERTICAL";
  screen.itemSpacing = 0;
  screen.fills = solid(C.bgApp);

  screen.appendChild(createHeader("jobs"));

  const content = figma.createFrame();
  content.layoutMode = "HORIZONTAL";
  content.resize(1200, 886);
  content.paddingTop = 28;
  content.paddingBottom = 28;
  content.paddingLeft = 32;
  content.paddingRight = 32;
  content.itemSpacing = 28;
  content.fills = [];

  const leftCol = figma.createFrame();
  leftCol.layoutMode = "VERTICAL";
  leftCol.resize(760, 830);
  leftCol.itemSpacing = 20;
  leftCol.fills = [];

  const pInfo = figma.createFrame();
  pInfo.layoutMode = "VERTICAL";
  pInfo.resize(760, 240);
  pInfo.paddingTop = 20;
  pInfo.paddingBottom = 20;
  pInfo.paddingLeft = 24;
  pInfo.paddingRight = 24;
  pInfo.itemSpacing = 14;
  pInfo.cornerRadius = 8;
  pInfo.fills = solid(C.cardBg);
  pInfo.strokes = solid(C.border);
  pInfo.strokeWeight = 1;

  pInfo.appendChild(createText("Part-time Remote Golang Engineer for Web Scraping Pipeline", 20, "Bold", C.textWhite));
  
  const pMeta = figma.createFrame();
  pMeta.layoutMode = "HORIZONTAL";
  pMeta.itemSpacing = 16;
  pMeta.fills = [];
  pMeta.appendChild(createText("Ngan sach: $250 - $750 USD", 14, "Bold", C.accentGreen));
  pMeta.appendChild(createText("Dang boi khach hang tu: Australia", 13, "Regular", C.textMuted));
  pInfo.appendChild(pMeta);

  pInfo.appendChild(createText("Chung toi can tuyen 1 Golang Developer lam viec ban thoi gian de bao tri va mo rong he thong crawler. Yeu cau toi thieu 2 nam kinh nghiem lam viec voi Goroutines, Channels, Redis Streams va he thong proxy phuc tap. Co kha nang lam viec doc lap va bao cao tien do hang ngay.", 13, "Regular", C.textMuted));
  leftCol.appendChild(pInfo);

  const bidForm = figma.createFrame();
  bidForm.layoutMode = "VERTICAL";
  bidForm.resize(760, 480);
  bidForm.paddingTop = 24;
  bidForm.paddingBottom = 24;
  bidForm.paddingLeft = 24;
  bidForm.paddingRight = 24;
  bidForm.itemSpacing = 16;
  bidForm.cornerRadius = 8;
  bidForm.fills = solid(C.cardBg);
  bidForm.strokes = solid(C.primaryPink);
  bidForm.strokeWeight = 1.5;

  bidForm.appendChild(createText("Dat chao gia cua ban (Place a Bid)", 18, "Bold", C.textWhite));
  bidForm.appendChild(createText("Ban se co co hoi duoc thue ngay neu de xuat ro rang va thau dao.", 13, "Regular", C.textMuted));

  const inputRow = figma.createFrame();
  inputRow.layoutMode = "HORIZONTAL";
  inputRow.itemSpacing = 20;
  inputRow.resize(712, 70);
  inputRow.fills = [];

  const field1 = figma.createFrame();
  field1.layoutMode = "VERTICAL";
  field1.itemSpacing = 6;
  field1.resize(346, 70);
  field1.fills = [];
  field1.appendChild(createText("Gia chao thau cua ban ($ USD)", 13, "Medium", C.textWhite));
  const inputBox1 = figma.createFrame();
  inputBox1.resize(346, 42);
  inputBox1.paddingLeft = 14;
  inputBox1.layoutMode = "HORIZONTAL";
  inputBox1.counterAxisAlignItems = "CENTER";
  inputBox1.cornerRadius = 6;
  inputBox1.fills = solid(C.bgApp);
  inputBox1.strokes = solid(C.borderLight);
  inputBox1.strokeWeight = 1;
  inputBox1.appendChild(createText("$ 350.00", 14, "Bold", C.textWhite));
  field1.appendChild(inputBox1);

  const field2 = figma.createFrame();
  field2.layoutMode = "VERTICAL";
  field2.itemSpacing = 6;
  field2.resize(346, 70);
  field2.fills = [];
  field2.appendChild(createText("Giao hang trong (ngay)", 13, "Medium", C.textWhite));
  const inputBox2 = figma.createFrame();
  inputBox2.resize(346, 42);
  inputBox2.paddingLeft = 14;
  inputBox2.layoutMode = "HORIZONTAL";
  inputBox2.counterAxisAlignItems = "CENTER";
  inputBox2.cornerRadius = 6;
  inputBox2.fills = solid(C.bgApp);
  inputBox2.strokes = solid(C.borderLight);
  inputBox2.strokeWeight = 1;
  inputBox2.appendChild(createText("5 ngay", 14, "Regular", C.textWhite));
  field2.appendChild(inputBox2);

  inputRow.appendChild(field1);
  inputRow.appendChild(field2);
  bidForm.appendChild(inputRow);

  const propField = figma.createFrame();
  propField.layoutMode = "VERTICAL";
  propField.itemSpacing = 6;
  propField.resize(712, 160);
  propField.fills = [];
  propField.appendChild(createText("Mieu ta de xuat cua ban (Toi thieu 100 ky tu)", 13, "Medium", C.textWhite));
  const propBox = figma.createFrame();
  propBox.resize(712, 130);
  propBox.paddingTop = 12;
  propBox.paddingLeft = 14;
  propBox.cornerRadius = 6;
  propBox.fills = solid(C.bgApp);
  propBox.strokes = solid(C.borderLight);
  propBox.strokeWeight = 1;
  propBox.appendChild(createText("Kinh chao Quy khach! Toi la Golang Engineer voi hon 4 nam kinh nghiem xay dung he thong thu thap du lieu quy mo lon. Toi da doc ky yeu cau ve Docker, Redis Streams va pipeline xu ly data...", 13, "Regular", C.textMuted));
  propField.appendChild(propBox);
  bidForm.appendChild(propField);

  const submitBtn = createButton("Gui chao gia ngay", "primary", 712);
  bidForm.appendChild(submitBtn);

  leftCol.appendChild(bidForm);
  content.appendChild(leftCol);

  const rightCol = figma.createFrame();
  rightCol.layoutMode = "VERTICAL";
  rightCol.resize(380, 600);
  rightCol.itemSpacing = 20;
  rightCol.fills = [];

  const clientBox = figma.createFrame();
  clientBox.layoutMode = "VERTICAL";
  clientBox.resize(380, 360);
  clientBox.paddingTop = 20;
  clientBox.paddingBottom = 20;
  clientBox.paddingLeft = 20;
  clientBox.paddingRight = 20;
  clientBox.itemSpacing = 16;
  clientBox.cornerRadius = 8;
  clientBox.fills = solid(C.cardBg);
  clientBox.strokes = solid(C.border);
  clientBox.strokeWeight = 1;

  clientBox.appendChild(createText("Thong tin nha tuyen dung", 16, "Bold", C.textWhite));

  const verifications = [
    "[V] Danh tinh da xac minh",
    "[V] Phuong thuc thanh toan da xac thuc",
    "[V] So dien thoai da xac minh",
    "[V] Email da xac minh",
    "Ty le hoan thanh du an: 98%"
  ];

  for (const v of verifications) {
    clientBox.appendChild(createText(v, 13, "Medium", C.accentGreen));
  }

  clientBox.appendChild(createText("Lich su khach hang: 47 du an da dang, $12,400 USD da chi tra.", 13, "Regular", C.textMuted));
  rightCol.appendChild(clientBox);
  content.appendChild(rightCol);

  screen.appendChild(content);
  createdNodeIds.push(screen.id);
  return screen;
}

// 3. SCREEN 3: POST PROJECT WIZARD
function buildPostProjectScreen(x, y) {
  const screen = figma.createFrame();
  screen.name = "3. Nguoi Thue - Dang Tin Tuyen Dung (Post Project Wizard 4 Steps)";
  screen.resize(1200, 950);
  screen.x = x;
  screen.y = y;
  screen.layoutMode = "VERTICAL";
  screen.itemSpacing = 0;
  screen.fills = solid(C.bgApp);

  screen.appendChild(createHeader("post"));

  const body = figma.createFrame();
  body.layoutMode = "VERTICAL";
  body.primaryAxisAlignItems = "CENTER";
  body.resize(1200, 886);
  body.paddingTop = 32;
  body.itemSpacing = 24;
  body.fills = [];

  const wizardCard = figma.createFrame();
  wizardCard.layoutMode = "VERTICAL";
  wizardCard.resize(800, 780);
  wizardCard.paddingTop = 28;
  wizardCard.paddingBottom = 28;
  wizardCard.paddingLeft = 32;
  wizardCard.paddingRight = 32;
  wizardCard.itemSpacing = 20;
  wizardCard.cornerRadius = 10;
  wizardCard.fills = solid(C.cardBg);
  wizardCard.strokes = solid(C.border);
  wizardCard.strokeWeight = 1;

  wizardCard.appendChild(createText("Noi cho chung toi biet ban can giup viec gi", 22, "Bold", C.textWhite));
  wizardCard.appendChild(createText("Nhan cac loi chao gia mien phi tu cac freelancer gioi nhat trong vai phut.", 14, "Regular", C.textMuted));

  const s1 = figma.createFrame();
  s1.layoutMode = "VERTICAL";
  s1.itemSpacing = 8;
  s1.resize(736, 75);
  s1.fills = [];
  s1.appendChild(createText("Chon ten cho du an cua ban", 14, "Bold", C.textWhite));
  const inputName = figma.createFrame();
  inputName.resize(736, 44);
  inputName.paddingLeft = 16;
  inputName.layoutMode = "HORIZONTAL";
  inputName.counterAxisAlignItems = "CENTER";
  inputName.cornerRadius = 6;
  inputName.fills = solid(C.bgApp);
  inputName.strokes = solid(C.borderLight);
  inputName.strokeWeight = 1;
  inputName.appendChild(createText("Vi du: Xay dung website ban hang React va NodeJS...", 14, "Regular", C.textSub));
  s1.appendChild(inputName);
  wizardCard.appendChild(s1);

  const s2 = figma.createFrame();
  s2.layoutMode = "VERTICAL";
  s2.itemSpacing = 8;
  s2.resize(736, 170);
  s2.fills = [];
  s2.appendChild(createText("Mieu ta chi tiet du an cua ban", 14, "Bold", C.textWhite));
  const inputDesc = figma.createFrame();
  inputDesc.resize(736, 90);
  inputDesc.paddingTop = 12;
  inputDesc.paddingLeft = 16;
  inputDesc.cornerRadius = 6;
  inputDesc.fills = solid(C.bgApp);
  inputDesc.strokes = solid(C.borderLight);
  inputDesc.strokeWeight = 1;
  inputDesc.appendChild(createText("Hay mo ta ro rang yeu cau, ket qua mong doi va thoi gian thuc hien...", 13, "Regular", C.textSub));
  s2.appendChild(inputDesc);

  const dropzone = figma.createFrame();
  dropzone.resize(736, 40);
  dropzone.layoutMode = "HORIZONTAL";
  dropzone.primaryAxisAlignItems = "CENTER";
  dropzone.counterAxisAlignItems = "CENTER";
  dropzone.cornerRadius = 6;
  dropzone.fills = solid(C.navBar);
  dropzone.strokes = solid(C.borderLight);
  dropzone.strokeWeight = 1;
  dropzone.appendChild(createText("+ Keo tha hoac tai len file dinh kem (PDF, Hinh anh, Docx)", 12, "Medium", C.primaryBlue));
  s2.appendChild(dropzone);
  wizardCard.appendChild(s2);

  const s3 = figma.createFrame();
  s3.layoutMode = "VERTICAL";
  s3.itemSpacing = 8;
  s3.resize(736, 90);
  s3.fills = [];
  s3.appendChild(createText("Nhung ky nang nao duoc yeu cau?", 14, "Bold", C.textWhite));
  const tagSelector = figma.createFrame();
  tagSelector.layoutMode = "HORIZONTAL";
  tagSelector.itemSpacing = 8;
  tagSelector.fills = [];
  tagSelector.appendChild(createBadge("React.js x", C.primaryPink, C.bgApp));
  tagSelector.appendChild(createBadge("Node.js x", C.primaryPink, C.bgApp));
  tagSelector.appendChild(createBadge("MongoDB x", C.primaryPink, C.bgApp));
  tagSelector.appendChild(createBadge("+ Them ky nang", C.primaryBlue, C.bgApp));
  s3.appendChild(tagSelector);
  wizardCard.appendChild(s3);

  const s4 = figma.createFrame();
  s4.layoutMode = "VERTICAL";
  s4.itemSpacing = 8;
  s4.resize(736, 110);
  s4.fills = [];
  s4.appendChild(createText("Ngan sach cua ban la bao nhieu?", 14, "Bold", C.textWhite));

  const budgetOptions = figma.createFrame();
  budgetOptions.layoutMode = "HORIZONTAL";
  budgetOptions.itemSpacing = 16;
  budgetOptions.fills = [];

  const opt1 = figma.createFrame();
  opt1.layoutMode = "VERTICAL";
  opt1.resize(355, 70);
  opt1.paddingTop = 12;
  opt1.paddingLeft = 16;
  opt1.cornerRadius = 6;
  opt1.fills = solid(C.bgApp);
  opt1.strokes = solid(C.primaryPink);
  opt1.strokeWeight = 1.5;
  opt1.appendChild(createText("[•] Thanh toan gia co dinh", 14, "Bold", C.textWhite));
  opt1.appendChild(createText("$250 - $750 USD (Gia chuan)", 12, "Regular", C.textMuted));
  budgetOptions.appendChild(opt1);

  const opt2 = figma.createFrame();
  opt2.layoutMode = "VERTICAL";
  opt2.resize(355, 70);
  opt2.paddingTop = 12;
  opt2.paddingLeft = 16;
  opt2.cornerRadius = 6;
  opt2.fills = solid(C.bgApp);
  opt2.strokes = solid(C.borderLight);
  opt2.strokeWeight = 1;
  opt2.appendChild(createText("[ ] Thanh toan theo gio", 14, "Medium", C.textWhite));
  opt2.appendChild(createText("$15 - $25 USD / gio", 12, "Regular", C.textMuted));
  budgetOptions.appendChild(opt2);

  s4.appendChild(budgetOptions);
  wizardCard.appendChild(s4);

  const submitPost = createButton("Dang du an va nhan chao gia ngay lap tuc", "primary", 736);
  wizardCard.appendChild(submitPost);

  body.appendChild(wizardCard);
  screen.appendChild(body);
  createdNodeIds.push(screen.id);
  return screen;
}

// 4. SCREEN 4: ONBOARDING FLOW
function buildOnboardingScreen(x, y) {
  const screen = figma.createFrame();
  screen.name = "4. Quy trinh Onboarding 11 buoc (Freelancer Onboarding Pipeline)";
  screen.resize(1200, 950);
  screen.x = x;
  screen.y = y;
  screen.layoutMode = "VERTICAL";
  screen.itemSpacing = 0;
  screen.fills = solid(C.bgApp);

  screen.appendChild(createHeader("jobs"));

  const body = figma.createFrame();
  body.layoutMode = "HORIZONTAL";
  body.primaryAxisAlignItems = "CENTER";
  body.counterAxisAlignItems = "CENTER";
  body.resize(1200, 886);
  body.fills = [];

  const modal = figma.createFrame();
  modal.layoutMode = "VERTICAL";
  modal.resize(480, 800);
  modal.cornerRadius = 12;
  modal.fills = solid(C.cardBg);
  modal.strokes = solid(C.border);
  modal.strokeWeight = 1;

  const mHead = figma.createFrame();
  mHead.layoutMode = "VERTICAL";
  mHead.resize(480, 60);
  mHead.fills = solid(C.navBar);
  
  const headRow = figma.createFrame();
  headRow.layoutMode = "HORIZONTAL";
  headRow.counterAxisAlignItems = "CENTER";
  headRow.resize(480, 56);
  headRow.paddingLeft = 20;
  headRow.paddingRight = 20;
  headRow.fills = [];
  headRow.appendChild(createText("< Ky nang & Thong tin ho so", 16, "Bold", C.textWhite));
  mHead.appendChild(headRow);

  const pBar = figma.createFrame();
  pBar.resize(240, 4);
  pBar.fills = solid(C.primaryBlue);
  mHead.appendChild(pBar);
  modal.appendChild(mHead);

  const mBody = figma.createFrame();
  mBody.layoutMode = "VERTICAL";
  mBody.resize(480, 740);
  mBody.paddingTop = 24;
  mBody.paddingBottom = 24;
  mBody.paddingLeft = 28;
  mBody.paddingRight = 28;
  mBody.itemSpacing = 16;
  mBody.fills = [];

  mBody.appendChild(createText("Hay cho chung toi biet cac ky nang tot nhat cua ban", 18, "Bold", C.textWhite));
  mBody.appendChild(createText("Viec nay giup chung toi khuyen nghi cong viec phu hop nhat cho ban.", 13, "Regular", C.textMuted));

  const sInput = figma.createFrame();
  sInput.resize(424, 40);
  sInput.paddingLeft = 14;
  sInput.layoutMode = "HORIZONTAL";
  sInput.counterAxisAlignItems = "CENTER";
  sInput.cornerRadius = 6;
  sInput.fills = solid(C.bgApp);
  sInput.strokes = solid(C.borderLight);
  sInput.strokeWeight = 1;
  sInput.appendChild(createText("Tim ky nang...", 13, "Regular", C.textSub));
  mBody.appendChild(sInput);

  const skillsList = [
    { name: "Graphic Design", jobs: "713 cong viec", selected: true },
    { name: "Video Editing", jobs: "462 cong viec", selected: true },
    { name: "Website Design", jobs: "391 cong viec", selected: false },
    { name: "Video Production", jobs: "371 cong viec", selected: false },
    { name: "After Effects", jobs: "312 cong viec", selected: false },
    { name: "Photoshop", jobs: "308 cong viec", selected: true }
  ];

  for (const sk of skillsList) {
    const skRow = figma.createFrame();
    skRow.layoutMode = "HORIZONTAL";
    skRow.primaryAxisAlignItems = "SPACE_BETWEEN";
    skRow.counterAxisAlignItems = "CENTER";
    skRow.resize(424, 48);
    skRow.paddingLeft = 12;
    skRow.paddingRight = 12;
    skRow.cornerRadius = 6;
    skRow.fills = solid(sk.selected ? C.cardHover : C.bgApp);
    skRow.strokes = solid(sk.selected ? C.primaryBlue : C.border);
    skRow.strokeWeight = 1;

    skRow.appendChild(createText(sk.name + " (" + sk.jobs + ")", 13, "Medium", sk.selected ? C.textWhite : C.textMuted));
    skRow.appendChild(createText(sk.selected ? "[Da chon]" : "+", 13, "Bold", sk.selected ? C.primaryPink : C.primaryBlue));

    mBody.appendChild(skRow);
  }

  const mActions = figma.createFrame();
  mActions.layoutMode = "HORIZONTAL";
  mActions.primaryAxisAlignItems = "SPACE_BETWEEN";
  mActions.resize(424, 44);
  mActions.fills = [];

  const skipBtn = createButton("Bo qua", "outline");
  const nextBtn = createButton("Tiep theo", "blue");
  mActions.appendChild(skipBtn);
  mActions.appendChild(nextBtn);
  mBody.appendChild(mActions);

  modal.appendChild(mBody);
  body.appendChild(modal);
  screen.appendChild(body);
  createdNodeIds.push(screen.id);
  return screen;
}

// 5. SCREEN 5: PROFILE
function buildProfileScreen(x, y) {
  const screen = figma.createFrame();
  screen.name = "5. Nguoi Tim Viec - Ho so Ca nhan (@phun4 Profile)";
  screen.resize(1200, 950);
  screen.x = x;
  screen.y = y;
  screen.layoutMode = "VERTICAL";
  screen.itemSpacing = 0;
  screen.fills = solid(C.bgApp);

  screen.appendChild(createHeader("jobs"));

  const body = figma.createFrame();
  body.layoutMode = "VERTICAL";
  body.resize(1200, 886);
  body.paddingTop = 28;
  body.paddingLeft = 32;
  body.paddingRight = 32;
  body.itemSpacing = 20;
  body.fills = [];

  const pCard = figma.createFrame();
  pCard.layoutMode = "HORIZONTAL";
  pCard.resize(1136, 180);
  pCard.paddingTop = 24;
  pCard.paddingBottom = 24;
  pCard.paddingLeft = 32;
  pCard.paddingRight = 32;
  pCard.itemSpacing = 24;
  pCard.cornerRadius = 8;
  pCard.fills = solid(C.cardBg);
  pCard.strokes = solid(C.border);
  pCard.strokeWeight = 1;

  const av = figma.createEllipse();
  av.resize(96, 96);
  av.fills = solid(C.primaryPink);
  pCard.appendChild(av);

  const info = figma.createFrame();
  info.layoutMode = "VERTICAL";
  info.itemSpacing = 8;
  info.fills = [];
  info.appendChild(createText("phu nguyen (@phun4)", 22, "Bold", C.textWhite));
  info.appendChild(createText("Senior Fullstack & AI Integration Engineer | 5+ Years Exp", 15, "Medium", C.primaryBlue));
  info.appendChild(createText("Da nang, Viet Nam • Tham gia thang 11 nam 2026", 13, "Regular", C.textMuted));
  pCard.appendChild(info);

  const rightStats = figma.createFrame();
  rightStats.layoutMode = "VERTICAL";
  rightStats.primaryAxisAlignItems = "CENTER";
  rightStats.itemSpacing = 8;
  rightStats.fills = [];
  rightStats.appendChild(createText("$25.00 USD / gio", 20, "Bold", C.accentGreen));
  rightStats.appendChild(createButton("Chinh sua ho so", "outline"));
  pCard.appendChild(rightStats);

  body.appendChild(pCard);

  const grid = figma.createFrame();
  grid.layoutMode = "HORIZONTAL";
  grid.resize(1136, 620);
  grid.itemSpacing = 20;
  grid.fills = [];

  const bioCard = figma.createFrame();
  bioCard.layoutMode = "VERTICAL";
  bioCard.resize(740, 600);
  bioCard.paddingTop = 20;
  bioCard.paddingBottom = 20;
  bioCard.paddingLeft = 24;
  bioCard.paddingRight = 24;
  bioCard.itemSpacing = 16;
  bioCard.cornerRadius = 8;
  bioCard.fills = solid(C.cardBg);
  bioCard.strokes = solid(C.border);
  bioCard.strokeWeight = 1;
  bioCard.appendChild(createText("Gioi thieu ve ban than", 16, "Bold", C.textWhite));
  bioCard.appendChild(createText("Xin chao! Toi la ky su phan mem chuyen ve kien truc he thong Backend voi FastAPI, Python, Golang va Frontend hien dai. Toi cam ket mang lai chat luong code cao nhat, dung tien do va bao hanh dai han cho tat ca du an toi dam nhan tren Freelancer.", 14, "Regular", C.textMuted));

  bioCard.appendChild(createText("Cac ky nang hang dau", 16, "Bold", C.textWhite));
  const mySkills = figma.createFrame();
  mySkills.layoutMode = "HORIZONTAL";
  mySkills.itemSpacing = 8;
  mySkills.fills = [];
  mySkills.appendChild(createBadge("Python", C.primaryBlue, C.bgApp));
  mySkills.appendChild(createBadge("FastAPI", C.primaryBlue, C.bgApp));
  mySkills.appendChild(createBadge("Golang", C.primaryBlue, C.bgApp));
  mySkills.appendChild(createBadge("PostgreSQL", C.primaryBlue, C.bgApp));
  mySkills.appendChild(createBadge("Docker", C.primaryBlue, C.bgApp));
  bioCard.appendChild(mySkills);

  grid.appendChild(bioCard);

  const verCard = figma.createFrame();
  verCard.layoutMode = "VERTICAL";
  verCard.resize(376, 600);
  verCard.paddingTop = 20;
  verCard.paddingBottom = 20;
  verCard.paddingLeft = 20;
  verCard.paddingRight = 20;
  verCard.itemSpacing = 14;
  verCard.cornerRadius = 8;
  verCard.fills = solid(C.cardBg);
  verCard.strokes = solid(C.border);
  verCard.strokeWeight = 1;

  verCard.appendChild(createText("Xac thuc ho so", 16, "Bold", C.textWhite));
  verCard.appendChild(createText("[V] Email da xac minh", 13, "Medium", C.accentGreen));
  verCard.appendChild(createText("[V] Phuong thuc thanh toan da xac minh", 13, "Medium", C.accentGreen));
  verCard.appendChild(createText("[!] So dien thoai chua xac minh", 13, "Medium", C.primaryPink));
  verCard.appendChild(createText("[!] CMND/CCCD chua xac minh", 13, "Medium", C.primaryPink));

  grid.appendChild(verCard);
  body.appendChild(grid);

  screen.appendChild(body);
  createdNodeIds.push(screen.id);
  return screen;
}

// 6. SCREEN 6: HIRE DIRECTORY
function buildHireScreen(x, y) {
  const screen = figma.createFrame();
  screen.name = "6. Nguoi Thue - Danh muc Thue Freelancer & Duyet Ung Vien (Hire Directory)";
  screen.resize(1200, 950);
  screen.x = x;
  screen.y = y;
  screen.layoutMode = "VERTICAL";
  screen.itemSpacing = 0;
  screen.fills = solid(C.bgApp);

  screen.appendChild(createHeader("hire"));

  const body = figma.createFrame();
  body.layoutMode = "VERTICAL";
  body.resize(1200, 886);
  body.paddingTop = 28;
  body.paddingLeft = 32;
  body.paddingRight = 32;
  body.itemSpacing = 20;
  body.fills = [];

  body.appendChild(createText("Thue Freelancer hang dau Viet Nam & Quoc Te", 22, "Bold", C.textWhite));
  body.appendChild(createText("Kham pha hon 50 trieu chuyen gia san sang thuc hien moi y tuong cua ban.", 14, "Regular", C.textMuted));

  const catRow = figma.createFrame();
  catRow.layoutMode = "HORIZONTAL";
  catRow.itemSpacing = 16;
  catRow.resize(1136, 120);
  catRow.fills = [];

  const cats = [
    { name: "Website & IT", count: "14,200 chuyen gia" },
    { name: "Thiet ke Do hoa", count: "9,800 chuyen gia" },
    { name: "Viet lach & Noi dung", count: "7,500 chuyen gia" },
    { name: "Tiep thi & Ban hang", count: "5,300 chuyen gia" }
  ];

  for (const c of cats) {
    const cBox = figma.createFrame();
    cBox.layoutMode = "VERTICAL";
    cBox.primaryAxisAlignItems = "CENTER";
    cBox.counterAxisAlignItems = "CENTER";
    cBox.resize(272, 110);
    cBox.itemSpacing = 6;
    cBox.cornerRadius = 8;
    cBox.fills = solid(C.cardBg);
    cBox.strokes = solid(C.border);
    cBox.strokeWeight = 1;
    cBox.appendChild(createText(c.name, 16, "Bold", C.textWhite));
    cBox.appendChild(createText(c.count, 13, "Regular", C.primaryBlue));
    catRow.appendChild(cBox);
  }
  body.appendChild(catRow);

  body.appendChild(createText("Freelancers duoc danh gia cao nhat", 18, "Bold", C.textWhite));

  const flGrid = figma.createFrame();
  flGrid.layoutMode = "VERTICAL";
  flGrid.resize(1136, 520);
  flGrid.itemSpacing = 16;
  flGrid.fills = [];

  const flList = [
    { name: "Tuan Anh M.", title: "Fullstack Python & AI Engineer", rate: "$30/hr", rating: "5.0 (48 danh gia)", skills: ["Python", "FastAPI", "React", "AI Prompting"] },
    { name: "Linh Nguyen", title: "Senior UI/UX & Mobile App Designer", rate: "$22/hr", rating: "4.9 (112 danh gia)", skills: ["Figma", "UI/UX", "Adobe XD", "Mobile App"] },
    { name: "David K.", title: "Golang & High-Load Architecture Specialist", rate: "$45/hr", rating: "5.0 (27 danh gia)", skills: ["Golang", "Kubernetes", "Microservices", "PostgreSQL"] }
  ];

  for (const fl of flList) {
    const flCard = figma.createFrame();
    flCard.layoutMode = "HORIZONTAL";
    flCard.primaryAxisAlignItems = "SPACE_BETWEEN";
    flCard.counterAxisAlignItems = "CENTER";
    flCard.resize(1136, 120);
    flCard.paddingLeft = 24;
    flCard.paddingRight = 24;
    flCard.cornerRadius = 8;
    flCard.fills = solid(C.cardBg);
    flCard.strokes = solid(C.border);
    flCard.strokeWeight = 1;

    const leftFl = figma.createFrame();
    leftFl.layoutMode = "HORIZONTAL";
    leftFl.counterAxisAlignItems = "CENTER";
    leftFl.itemSpacing = 16;
    leftFl.fills = [];

    const flAv = figma.createEllipse();
    flAv.resize(60, 60);
    flAv.fills = solid(C.primaryBlue);
    leftFl.appendChild(flAv);

    const flText = figma.createFrame();
    flText.layoutMode = "VERTICAL";
    flText.itemSpacing = 4;
    flText.fills = [];
    flText.appendChild(createText(fl.name + " • " + fl.rating, 16, "Bold", C.textWhite));
    flText.appendChild(createText(fl.title, 14, "Medium", C.primaryPink));

    const flSkills = figma.createFrame();
    flSkills.layoutMode = "HORIZONTAL";
    flSkills.itemSpacing = 6;
    flSkills.fills = [];
    for (const s of fl.skills) {
      flSkills.appendChild(createBadge(s, C.textMuted, C.bgApp));
    }
    flText.appendChild(flSkills);

    leftFl.appendChild(flText);
    flCard.appendChild(leftFl);

    const rightFl = figma.createFrame();
    rightFl.layoutMode = "HORIZONTAL";
    rightFl.counterAxisAlignItems = "CENTER";
    rightFl.itemSpacing = 16;
    rightFl.fills = [];
    rightFl.appendChild(createText(fl.rate, 18, "Bold", C.accentGreen));
    rightFl.appendChild(createButton("Thue ngay", "primary"));
    flCard.appendChild(rightFl);

    flGrid.appendChild(flCard);
    createdNodeIds.push(flCard.id);
  }
  body.appendChild(flGrid);

  screen.appendChild(body);
  createdNodeIds.push(screen.id);
  return screen;
}

// Positioning
const spacingX = 1300;
const spacingY = 1050;

const s1 = buildBrowseJobsScreen(0, 0);
const s2 = buildProjectDetailScreen(spacingX, 0);
const s3 = buildPostProjectScreen(spacingX * 2, 0);
const s4 = buildOnboardingScreen(0, spacingY);
const s5 = buildProfileScreen(spacingX, spacingY);
const s6 = buildHireScreen(spacingX * 2, spacingY);

figma.currentPage.selection = [s1, s2, s3, s4, s5, s6];
figma.viewport.scrollAndZoomIntoView([s1, s2, s3, s4, s5, s6]);

return {
  status: "success",
  createdScreensCount: 6,
  totalNodesCreated: createdNodeIds.length,
  screenIds: [s1.id, s2.id, s3.id, s4.id, s5.id, s6.id]
};
