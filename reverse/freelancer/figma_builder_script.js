// ==============================================================================
// FREELANCER REPLICA - AUTO BUILD SCREENS SCRIPT FOR FIGMA
// Các màn hình tự động dựng:
// 1. Post Project Screen (/post-project) - Wizard tạo dự án 4 bước chuẩn vn.freelancer.com
// 2. Hire Directory Screen (/hire) - Danh bạ 17 nhóm ngành & 3400+ kỹ năng
// ==============================================================================

(async () => {
  try {
    console.log("🚀 Bắt đầu dựng màn hình Freelancer vào Figma...");

    // 1. Load fonts cần thiết
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    await figma.loadFontAsync({ family: "Roboto", style: "Medium" });
    await figma.loadFontAsync({ family: "Roboto", style: "Bold" });

    // 2. Tìm hoặc chọn Page "1. Screens & Wireframes"
    let targetPage = figma.root.children.find(p => p.name.includes("Screens") || p.name.includes("1."));
    if (!targetPage) {
      targetPage = figma.currentPage;
    } else {
      await figma.setCurrentPageAsync(targetPage);
    }

    // 3. Bảng màu chuẩn Freelancer Dark/Light
    const C = {
      primary: { r: 0.902, g: 0.008, b: 0.471 },       // #e60278 (Pink Freelancer)
      primaryHover: { r: 0.75, g: 0.005, b: 0.39 },
      secondary: { r: 0.09, g: 0.447, b: 0.922 },     // #1772eb (Blue)
      bgDark: { r: 0.075, g: 0.106, b: 0.149 },        // #131b26 (Navbar auth)
      bgBody: { r: 0.031, g: 0.035, b: 0.051 },        // #08090d (Dark canvas)
      bgCard: { r: 0.11, g: 0.141, b: 0.188 },         // #1c2430 (Dark card)
      bgInput: { r: 0.06, g: 0.08, b: 0.11 },          // #0f141c
      border: { r: 0.18, g: 0.22, b: 0.28 },           // #2e3847
      borderActive: { r: 0.902, g: 0.008, b: 0.471 },
      textWhite: { r: 1, g: 1, b: 1 },
      textMuted: { r: 0.65, g: 0.70, b: 0.78 },        // #a6b2c7
      textSubtle: { r: 0.45, g: 0.50, b: 0.58 },
      success: { r: 0.02, g: 0.518, b: 0.188 },        // #058430
      warningBg: { r: 0.25, g: 0.18, b: 0.05 },
      warningBorder: { r: 0.85, g: 0.65, b: 0.15 },
      warningText: { r: 1, g: 0.85, b: 0.4 }
    };

    // Helper tạo Text Node
    function createText(text, size = 14, style = "Regular", color = C.textWhite, autoResize = "WIDTH_AND_HEIGHT") {
      const t = figma.createText();
      t.fontName = { family: "Roboto", style: style };
      t.characters = text;
      t.fontSize = size;
      t.fills = [{ type: "SOLID", color: color }];
      t.textAutoResize = autoResize;
      return t;
    }

    // Helper tạo Button
    function createButton(label, variant = "primary", width = null) {
      const btn = figma.createFrame();
      btn.layoutMode = "HORIZONTAL";
      btn.primaryAxisAlignItems = "CENTER";
      btn.counterAxisAlignItems = "CENTER";
      btn.paddingLeft = 20;
      btn.paddingRight = 20;
      btn.paddingTop = 12;
      btn.paddingBottom = 12;
      btn.cornerRadius = 6;

      if (variant === "primary") {
        btn.fills = [{ type: "SOLID", color: C.primary }];
        const txt = createText(label, 15, "Bold", C.textWhite);
        btn.appendChild(txt);
      } else if (variant === "secondary") {
        btn.fills = [{ type: "SOLID", color: C.bgCard }];
        btn.strokes = [{ type: "SOLID", color: C.border }];
        btn.strokeWeight = 1;
        const txt = createText(label, 15, "Medium", C.textWhite);
        btn.appendChild(txt);
      } else {
        btn.fills = [];
        const txt = createText(label, 14, "Medium", C.textMuted);
        btn.appendChild(txt);
      }

      if (width) {
        btn.resize(width, btn.height);
      }
      return btn;
    }

    // =========================================================================
    // MÀN HÌNH 1: POST PROJECT (/post-project)
    // =========================================================================
    const postProjFrame = figma.createFrame();
    postProjFrame.name = "Post Project – /post-project (Authentic Wizard)";
    postProjFrame.resize(1440, 1320);
    postProjFrame.x = 5200; // Đặt bên phải Dashboard
    postProjFrame.y = 0;
    postProjFrame.fills = [{ type: "SOLID", color: C.bgBody }];
    postProjFrame.layoutMode = "VERTICAL";
    postProjFrame.primaryAxisSizingMode = "AUTO";
    postProjFrame.counterAxisSizingMode = "FIXED";
    postProjFrame.itemSpacing = 0;

    // 1.1 Navbar Header
    const nav = figma.createFrame();
    nav.name = "Top Navbar";
    nav.layoutMode = "HORIZONTAL";
    nav.resize(1440, 68);
    nav.layoutSizingHorizontal = "FIXED";
    nav.fills = [{ type: "SOLID", color: C.bgDark }];
    nav.paddingLeft = 80;
    nav.paddingRight = 80;
    nav.paddingTop = 14;
    nav.paddingBottom = 14;
    nav.primaryAxisAlignItems = "SPACE_BETWEEN";
    nav.counterAxisAlignItems = "CENTER";

    // Nav Left: Logo & Step indicator
    const navLeft = figma.createFrame();
    navLeft.layoutMode = "HORIZONTAL";
    navLeft.counterAxisAlignItems = "CENTER";
    navLeft.itemSpacing = 24;
    navLeft.fills = [];

    const logo = createText("freelancer", 22, "Bold", C.primary);
    const stepBadge = figma.createFrame();
    stepBadge.layoutMode = "HORIZONTAL";
    stepBadge.paddingLeft = 12;
    stepBadge.paddingRight = 12;
    stepBadge.paddingTop = 6;
    stepBadge.paddingBottom = 6;
    stepBadge.cornerRadius = 20;
    stepBadge.fills = [{ type: "SOLID", color: C.bgCard }];
    stepBadge.strokes = [{ type: "SOLID", color: C.border }];
    stepBadge.strokeWeight = 1;
    const stepBadgeText = createText("Bước 1 / 4: Thông tin dự án", 13, "Medium", C.textMuted);
    stepBadge.appendChild(stepBadgeText);

    navLeft.appendChild(logo);
    navLeft.appendChild(stepBadge);

    // Nav Right: User pill & Cancel
    const navRight = figma.createFrame();
    navRight.layoutMode = "HORIZONTAL";
    navRight.counterAxisAlignItems = "CENTER";
    navRight.itemSpacing = 16;
    navRight.fills = [];

    const cancelLink = createText("Hủy và thoát", 14, "Regular", C.textMuted);
    const userPill = figma.createFrame();
    userPill.layoutMode = "HORIZONTAL";
    userPill.counterAxisAlignItems = "CENTER";
    userPill.itemSpacing = 8;
    userPill.paddingLeft = 12;
    userPill.paddingRight = 12;
    userPill.paddingTop = 6;
    userPill.paddingBottom = 6;
    userPill.cornerRadius = 16;
    userPill.fills = [{ type: "SOLID", color: C.bgCard }];
    const avatarDot = figma.createEllipse();
    avatarDot.resize(20, 20);
    avatarDot.fills = [{ type: "SOLID", color: C.primary }];
    const uName = createText("@khain66 ($0.00 USD)", 13, "Medium", C.textWhite);
    userPill.appendChild(avatarDot);
    userPill.appendChild(uName);

    navRight.appendChild(cancelLink);
    navRight.appendChild(userPill);

    nav.appendChild(navLeft);
    nav.appendChild(navRight);
    postProjFrame.appendChild(nav);

    // 1.2 Main Content Container (2 cột 1200px)
    const mainWrap = figma.createFrame();
    mainWrap.name = "Main Content Container (1200px)";
    mainWrap.layoutMode = "HORIZONTAL";
    mainWrap.resize(1440, 1200);
    mainWrap.layoutSizingHorizontal = "FIXED";
    mainWrap.paddingLeft = 120;
    mainWrap.paddingRight = 120;
    mainWrap.paddingTop = 48;
    mainWrap.paddingBottom = 64;
    mainWrap.itemSpacing = 48;
    mainWrap.fills = [];
    mainWrap.counterAxisAlignItems = "MIN";

    // 1.3 Left Column: Main Form Wizard (760px)
    const leftCol = figma.createFrame();
    leftCol.name = "Wizard Form Left (760px)";
    leftCol.layoutMode = "VERTICAL";
    leftCol.resize(740, 1100);
    leftCol.layoutSizingHorizontal = "FIXED";
    leftCol.itemSpacing = 28;
    leftCol.fills = [];

    // Headline & Subtitle
    const headingBlock = figma.createFrame();
    headingBlock.layoutMode = "VERTICAL";
    headingBlock.itemSpacing = 8;
    headingBlock.fills = [];
    const h1 = createText("Cho chúng tôi biết thứ bạn cần hoàn thành.", 28, "Bold", C.textWhite);
    h1.textAutoResize = "HEIGHT";
    h1.resize(740, 36);
    const sub = createText("Chúng tôi sẽ hướng dẫn bạn tạo bản tóm tắt hoàn hảo. Càng chi tiết càng tốt.", 15, "Regular", C.textMuted);
    sub.textAutoResize = "HEIGHT";
    sub.resize(740, 24);
    headingBlock.appendChild(h1);
    headingBlock.appendChild(sub);
    leftCol.appendChild(headingBlock);

    // Notification Banner (Draft discarded)
    const banner = figma.createFrame();
    banner.layoutMode = "HORIZONTAL";
    banner.layoutSizingHorizontal = "FILL";
    banner.paddingLeft = 16;
    banner.paddingRight = 16;
    banner.paddingTop = 12;
    banner.paddingBottom = 12;
    banner.cornerRadius = 6;
    banner.fills = [{ type: "SOLID", color: C.warningBg }];
    banner.strokes = [{ type: "SOLID", color: C.warningBorder }];
    banner.strokeWeight = 1;
    banner.primaryAxisAlignItems = "SPACE_BETWEEN";
    banner.counterAxisAlignItems = "CENTER";
    const bText = createText("⚠️ Bản phác thảo trước đó của bạn đã bị loại bỏ.", 13, "Regular", C.warningText);
    const bUndo = createText("Hủy thao tác", 13, "Bold", C.primary);
    banner.appendChild(bText);
    banner.appendChild(bUndo);
    leftCol.appendChild(banner);

    // Form Field 1: Project Title
    const f1 = figma.createFrame();
    f1.layoutMode = "VERTICAL";
    f1.itemSpacing = 8;
    f1.layoutSizingHorizontal = "FILL";
    f1.fills = [];
    const l1 = createText("Đặt tên dự án của bạn", 15, "Bold", C.textWhite);
    const in1 = figma.createFrame();
    in1.layoutMode = "HORIZONTAL";
    in1.layoutSizingHorizontal = "FILL";
    in1.paddingLeft = 16;
    in1.paddingRight = 16;
    in1.paddingTop = 14;
    in1.paddingBottom = 14;
    in1.cornerRadius = 6;
    in1.fills = [{ type: "SOLID", color: C.bgInput }];
    in1.strokes = [{ type: "SOLID", color: C.border }];
    in1.strokeWeight = 1;
    const in1Text = createText("Ví dụ: Xây dựng hệ thống Backend bằng FastAPI & PostgreSQL cho Freelance App", 14, "Regular", C.textMuted);
    in1.appendChild(in1Text);
    f1.appendChild(l1);
    f1.appendChild(in1);
    leftCol.appendChild(f1);

    // Form Field 2: Description
    const f2 = figma.createFrame();
    f2.layoutMode = "VERTICAL";
    f2.itemSpacing = 8;
    f2.layoutSizingHorizontal = "FILL";
    f2.fills = [];
    const l2 = createText("Mô tả chi tiết những gì bạn cần làm", 15, "Bold", C.textWhite);
    const in2 = figma.createFrame();
    in2.layoutMode = "VERTICAL";
    in2.layoutSizingHorizontal = "FILL";
    in2.paddingLeft = 16;
    in2.paddingRight = 16;
    in2.paddingTop = 14;
    in2.paddingBottom = 14;
    in2.resize(740, 130);
    in2.cornerRadius = 6;
    in2.fills = [{ type: "SOLID", color: C.bgInput }];
    in2.strokes = [{ type: "SOLID", color: C.border }];
    in2.strokeWeight = 1;
    const in2Text = createText("Nêu rõ mục tiêu dự án, công nghệ yêu cầu (FastAPI, JWT, WebSockets, Docker), tài liệu API và thời gian bàn giao dự kiến...", 14, "Regular", C.textMuted);
    in2Text.resize(708, 48);
    in2.appendChild(in2Text);

    // Attachment dropzone
    const dropzone = figma.createFrame();
    dropzone.layoutMode = "HORIZONTAL";
    dropzone.layoutSizingHorizontal = "FILL";
    dropzone.primaryAxisAlignItems = "CENTER";
    dropzone.counterAxisAlignItems = "CENTER";
    dropzone.paddingTop = 16;
    dropzone.paddingBottom = 16;
    dropzone.cornerRadius = 6;
    dropzone.fills = [{ type: "SOLID", color: C.bgCard }];
    dropzone.strokes = [{ type: "SOLID", color: C.border }];
    dropzone.strokeWeight = 1;
    dropzone.dashPattern = [6, 4];
    const dropText = createText("📁 Kéo thả tệp tin hoặc duyệt từ máy tính (Tối đa 25MB)", 13, "Medium", C.primary);
    dropzone.appendChild(dropText);

    f2.appendChild(l2);
    f2.appendChild(in2);
    f2.appendChild(dropzone);
    leftCol.appendChild(f2);

    // Form Field 3: Skills
    const f3 = figma.createFrame();
    f3.layoutMode = "VERTICAL";
    f3.itemSpacing = 10;
    f3.layoutSizingHorizontal = "FILL";
    f3.fills = [];
    const l3 = createText("Các kỹ năng cần thiết", 15, "Bold", C.textWhite);
    const chipRow = figma.createFrame();
    chipRow.layoutMode = "HORIZONTAL";
    chipRow.itemSpacing = 8;
    chipRow.fills = [];
    ["Python", "FastAPI", "PostgreSQL", "Figma", "Docker", "+ Thêm kỹ năng"].forEach((s, idx) => {
      const chip = figma.createFrame();
      chip.layoutMode = "HORIZONTAL";
      chip.paddingLeft = 14;
      chip.paddingRight = 14;
      chip.paddingTop = 8;
      chip.paddingBottom = 8;
      chip.cornerRadius = 20;
      if (idx === 5) {
        chip.fills = [];
        chip.strokes = [{ type: "SOLID", color: C.primary }];
        chip.strokeWeight = 1;
        chip.appendChild(createText(s, 13, "Medium", C.primary));
      } else {
        chip.fills = [{ type: "SOLID", color: C.bgCard }];
        chip.strokes = [{ type: "SOLID", color: C.border }];
        chip.strokeWeight = 1;
        chip.appendChild(createText(`✓ ${s}`, 13, "Medium", C.textWhite));
      }
      chipRow.appendChild(chip);
    });
    f3.appendChild(l3);
    f3.appendChild(chipRow);
    leftCol.appendChild(f3);

    // Form Field 4: Budget Type
    const f4 = figma.createFrame();
    f4.layoutMode = "VERTICAL";
    f4.itemSpacing = 12;
    f4.layoutSizingHorizontal = "FILL";
    f4.fills = [];
    const l4 = createText("Bạn muốn thanh toán như thế nào?", 15, "Bold", C.textWhite);
    
    const budgetCards = figma.createFrame();
    budgetCards.layoutMode = "HORIZONTAL";
    budgetCards.itemSpacing = 16;
    budgetCards.layoutSizingHorizontal = "FILL";
    budgetCards.fills = [];

    // Card 1: Fixed Price
    const bCard1 = figma.createFrame();
    bCard1.layoutMode = "VERTICAL";
    bCard1.resize(360, 96);
    bCard1.paddingLeft = 20;
    bCard1.paddingRight = 20;
    bCard1.paddingTop = 16;
    bCard1.paddingBottom = 16;
    bCard1.cornerRadius = 8;
    bCard1.fills = [{ type: "SOLID", color: C.bgCard }];
    bCard1.strokes = [{ type: "SOLID", color: C.primary }];
    bCard1.strokeWeight = 2;
    bCard1.itemSpacing = 6;
    bCard1.appendChild(createText("◉ Dự án giá cố định", 15, "Bold", C.primary));
    bCard1.appendChild(createText("Thanh toán theo mốc hoặc khi hoàn thành 100%", 13, "Regular", C.textMuted));

    // Card 2: Hourly
    const bCard2 = figma.createFrame();
    bCard2.layoutMode = "VERTICAL";
    bCard2.resize(360, 96);
    bCard2.paddingLeft = 20;
    bCard2.paddingRight = 20;
    bCard2.paddingTop = 16;
    bCard2.paddingBottom = 16;
    bCard2.cornerRadius = 8;
    bCard2.fills = [{ type: "SOLID", color: C.bgCard }];
    bCard2.strokes = [{ type: "SOLID", color: C.border }];
    bCard2.strokeWeight = 1;
    bCard2.itemSpacing = 6;
    bCard2.appendChild(createText("○ Dự án theo giờ", 15, "Bold", C.textWhite));
    bCard2.appendChild(createText("Thanh toán theo số giờ làm việc thực tế", 13, "Regular", C.textMuted));

    budgetCards.appendChild(bCard1);
    budgetCards.appendChild(bCard2);

    f4.appendChild(l4);
    f4.appendChild(budgetCards);
    leftCol.appendChild(f4);

    // Action Buttons Row
    const actionRow = figma.createFrame();
    actionRow.layoutMode = "HORIZONTAL";
    actionRow.counterAxisAlignItems = "CENTER";
    actionRow.itemSpacing = 16;
    actionRow.fills = [];
    actionRow.paddingTop = 16;

    const btnNext = createButton("Tiếp theo (CTRL + ENTER)  →", "primary");
    const btnDraft = createButton("Lưu bản nháp", "secondary");
    actionRow.appendChild(btnNext);
    actionRow.appendChild(btnDraft);
    leftCol.appendChild(actionRow);

    mainWrap.appendChild(leftCol);

    // 1.4 Right Column: Trust & Tips Sidebar (400px)
    const rightCol = figma.createFrame();
    rightCol.name = "Trust Sidebar (400px)";
    rightCol.layoutMode = "VERTICAL";
    rightCol.resize(410, 850);
    rightCol.layoutSizingHorizontal = "FIXED";
    rightCol.itemSpacing = 24;
    rightCol.fills = [];

    // Card 1: 4 Cam kết Freelancer
    const trustCard = figma.createFrame();
    trustCard.layoutMode = "VERTICAL";
    trustCard.layoutSizingHorizontal = "FILL";
    trustCard.paddingLeft = 24;
    trustCard.paddingRight = 24;
    trustCard.paddingTop = 24;
    trustCard.paddingBottom = 24;
    trustCard.cornerRadius = 10;
    trustCard.fills = [{ type: "SOLID", color: C.bgCard }];
    trustCard.strokes = [{ type: "SOLID", color: C.border }];
    trustCard.strokeWeight = 1;
    trustCard.itemSpacing = 18;

    const trustTitle = createText("Lợi thế khi đăng dự án trên Freelancer", 16, "Bold", C.textWhite);
    trustCard.appendChild(trustTitle);

    const bullets = [
      { icon: "🌐", title: "91+ triệu chuyên gia", desc: "Kết nối hơn 91 triệu chuyên gia trên toàn thế giới sẵn sàng báo giá." },
      { icon: "💰", title: "Mọi quy mô dự án", desc: "Từ tasks $10 đến $10 triệu dự án, chúng tôi luôn lo được cho bạn." },
      { icon: "⚡", title: "Phản hồi trong tích tắc", desc: "Kết nối với các freelancer có kỹ năng phù hợp chỉ trong vài phút." },
      { icon: "🛡️", title: "Bảo đảm thanh toán", desc: "Chỉ thanh toán cho freelancer khi bạn hoàn toàn hài lòng với kết quả." }
    ];

    bullets.forEach(b => {
      const bRow = figma.createFrame();
      bRow.layoutMode = "HORIZONTAL";
      bRow.itemSpacing = 14;
      bRow.layoutSizingHorizontal = "FILL";
      bRow.fills = [];

      const bIcon = createText(b.icon, 20, "Regular", C.textWhite);
      const bContent = figma.createFrame();
      bContent.layoutMode = "VERTICAL";
      bContent.itemSpacing = 4;
      bContent.layoutSizingHorizontal = "FILL";
      bContent.fills = [];
      const bH = createText(b.title, 14, "Bold", C.textWhite);
      const bD = createText(b.desc, 13, "Regular", C.textMuted);
      bD.textAutoResize = "HEIGHT";
      bD.resize(300, 36);
      bContent.appendChild(bH);
      bContent.appendChild(bD);

      bRow.appendChild(bIcon);
      bRow.appendChild(bContent);
      trustCard.appendChild(bRow);
    });

    rightCol.appendChild(trustCard);

    // Card 2: Help Tips
    const tipCard = figma.createFrame();
    tipCard.layoutMode = "VERTICAL";
    tipCard.layoutSizingHorizontal = "FILL";
    tipCard.paddingLeft = 24;
    tipCard.paddingRight = 24;
    tipCard.paddingTop = 20;
    tipCard.paddingBottom = 20;
    tipCard.cornerRadius = 10;
    tipCard.fills = [{ type: "SOLID", color: C.bgCard }];
    tipCard.strokes = [{ type: "SOLID", color: C.border }];
    tipCard.strokeWeight = 1;
    tipCard.itemSpacing = 10;

    tipCard.appendChild(createText("💡 Mẹo viết mô tả hiệu quả", 15, "Bold", C.textWhite));
    tipCard.appendChild(createText("1. Nêu rõ ràng các chức năng cần xây dựng.", 13, "Regular", C.textMuted));
    tipCard.appendChild(createText("2. Liệt kê công nghệ bắt buộc và tài liệu sẵn có.", 13, "Regular", C.textMuted));
    tipCard.appendChild(createText("3. Đưa ra thời hạn và mốc giải ngân dự kiến.", 13, "Regular", C.textMuted));

    rightCol.appendChild(tipCard);
    mainWrap.appendChild(rightCol);

    postProjFrame.appendChild(mainWrap);
    figma.currentPage.appendChild(postProjFrame);

    console.log("✅ Đã dựng xong Màn hình: Post Project (/post-project)");

    // =========================================================================
    // MÀN HÌNH 2: HIRE DIRECTORY (/hire)
    // =========================================================================
    const hireFrame = figma.createFrame();
    hireFrame.name = "Hire Categories – /hire (3400+ Skills Directory)";
    hireFrame.resize(1440, 1450);
    hireFrame.x = 6700; // Đặt bên phải Post Project
    hireFrame.y = 0;
    hireFrame.fills = [{ type: "SOLID", color: C.bgBody }];
    hireFrame.layoutMode = "VERTICAL";
    hireFrame.primaryAxisSizingMode = "AUTO";
    hireFrame.counterAxisSizingMode = "FIXED";
    hireFrame.itemSpacing = 0;

    // 2.1 Hero Banner
    const hireHero = figma.createFrame();
    hireHero.name = "Hire Hero Banner";
    hireHero.layoutMode = "VERTICAL";
    hireHero.resize(1440, 240);
    hireHero.layoutSizingHorizontal = "FIXED";
    hireHero.fills = [{ type: "SOLID", color: C.bgDark }];
    hireHero.primaryAxisAlignItems = "CENTER";
    hireHero.counterAxisAlignItems = "CENTER";
    hireHero.paddingTop = 40;
    hireHero.paddingBottom = 40;
    hireHero.itemSpacing = 12;

    const heroTitle = createText("Khám phá 3400+ Danh mục Freelancer", 32, "Bold", C.textWhite);
    const heroSub = createText("Tìm kiếm và thuê chuyên gia hàng đầu cho mọi quy mô dự án và lĩnh vực công nghệ", 16, "Regular", C.textMuted);
    
    // Search Box
    const sBox = figma.createFrame();
    sBox.layoutMode = "HORIZONTAL";
    sBox.counterAxisAlignItems = "CENTER";
    sBox.resize(560, 48);
    sBox.cornerRadius = 24;
    sBox.paddingLeft = 20;
    sBox.paddingRight = 8;
    sBox.fills = [{ type: "SOLID", color: C.bgBody }];
    sBox.strokes = [{ type: "SOLID", color: C.border }];
    sBox.strokeWeight = 1;
    sBox.primaryAxisAlignItems = "SPACE_BETWEEN";
    sBox.appendChild(createText("🔍 Tìm kiếm kỹ năng (Ví dụ: Python, UI/UX, AI, Copywriting)...", 14, "Regular", C.textMuted));
    const btnSearch = createButton("Tìm", "primary");
    btnSearch.cornerRadius = 20;
    btnSearch.paddingTop = 8;
    btnSearch.paddingBottom = 8;
    sBox.appendChild(btnSearch);

    hireHero.appendChild(heroTitle);
    hireHero.appendChild(heroSub);
    hireHero.appendChild(sBox);
    hireFrame.appendChild(hireHero);

    // 2.2 Categories Grid (1200px, 3 cột x 4 hàng)
    const catContainer = figma.createFrame();
    catContainer.name = "17 Pillars Grid (1200px)";
    catContainer.layoutMode = "VERTICAL";
    catContainer.resize(1440, 1150);
    catContainer.layoutSizingHorizontal = "FIXED";
    catContainer.paddingLeft = 120;
    catContainer.paddingRight = 120;
    catContainer.paddingTop = 48;
    catContainer.paddingBottom = 64;
    catContainer.itemSpacing = 24;
    catContainer.fills = [];

    const categoriesData = [
      { title: "Websites, IT & Software", icon: "💻", count: "1,240+ kỹ năng", tags: ["Python", "PHP", "FastAPI", "React", "Node.js", "WordPress"] },
      { title: "Artificial Intelligence", icon: "🤖", count: "320+ kỹ năng", tags: ["Machine Learning", "LLM", "Deep Learning", "Prompt Engineering", "NLP"] },
      { title: "Design, Media & Architecture", icon: "🎨", count: "890+ kỹ năng", tags: ["UI/UX Design", "Figma", "Logo Design", "3D Modeling", "Video Editing"] },
      { title: "Writing & Content", icon: "✍️", count: "450+ kỹ năng", tags: ["Copywriting", "SEO Content", "Technical Writing", "Dịch thuật"] },
      { title: "Data Entry & Admin", icon: "📊", count: "280+ kỹ năng", tags: ["Data Scraping", "Excel VBA", "Virtual Assistant", "Nhập liệu"] },
      { title: "Engineering & Science", icon: "⚙️", count: "510+ kỹ năng", tags: ["Mechanical", "Electrical", "CAD/CAM", "Civil Engineering"] },
      { title: "Sales & Marketing", icon: "📈", count: "640+ kỹ năng", tags: ["SEO", "Google Ads", "Social Media", "Lead Generation"] },
      { title: "Mobile Phones & Computing", icon: "📱", count: "380+ kỹ năng", tags: ["Flutter", "React Native", "iOS Swift", "Android Kotlin"] },
      { title: "Business, Accounting & Legal", icon: "💼", count: "410+ kỹ năng", tags: ["Business Plans", "Financial Analysis", "Contracts", "HR"] }
    ];

    for (let r = 0; r < 3; r++) {
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.itemSpacing = 24;
      row.layoutSizingHorizontal = "FILL";
      row.fills = [];

      for (let c = 0; c < 3; c++) {
        const item = categoriesData[r * 3 + c];
        const card = figma.createFrame();
        card.layoutMode = "VERTICAL";
        card.resize(384, 220);
        card.paddingLeft = 24;
        card.paddingRight = 24;
        card.paddingTop = 20;
        card.paddingBottom = 20;
        card.cornerRadius = 8;
        card.fills = [{ type: "SOLID", color: C.bgCard }];
        card.strokes = [{ type: "SOLID", color: C.border }];
        card.strokeWeight = 1;
        card.itemSpacing = 14;

        // Card Header
        const ch = figma.createFrame();
        ch.layoutMode = "HORIZONTAL";
        ch.counterAxisAlignItems = "CENTER";
        ch.itemSpacing = 12;
        ch.fills = [];
        ch.appendChild(createText(item.icon, 24, "Regular", C.textWhite));
        
        const chTitles = figma.createFrame();
        chTitles.layoutMode = "VERTICAL";
        chTitles.itemSpacing = 2;
        chTitles.fills = [];
        chTitles.appendChild(createText(item.title, 16, "Bold", C.textWhite));
        chTitles.appendChild(createText(item.count, 12, "Medium", C.primary));
        ch.appendChild(chTitles);
        card.appendChild(ch);

        // Tags
        const tagsFrame = figma.createFrame();
        tagsFrame.layoutMode = "HORIZONTAL";
        tagsFrame.itemSpacing = 6;
        tagsFrame.layoutWrap = "WRAP";
        tagsFrame.fills = [];
        item.tags.forEach(t => {
          const tPill = figma.createFrame();
          tPill.layoutMode = "HORIZONTAL";
          tPill.paddingLeft = 10;
          tPill.paddingRight = 10;
          tPill.paddingTop = 4;
          tPill.paddingBottom = 4;
          tPill.cornerRadius = 12;
          tPill.fills = [{ type: "SOLID", color: C.bgInput }];
          tPill.strokes = [{ type: "SOLID", color: C.border }];
          tPill.strokeWeight = 1;
          tPill.appendChild(createText(t, 12, "Regular", C.textMuted));
          tagsFrame.appendChild(tPill);
        });
        card.appendChild(tagsFrame);

        row.appendChild(card);
      }
      catContainer.appendChild(row);
    }

    hireFrame.appendChild(catContainer);
    figma.currentPage.appendChild(hireFrame);

    console.log("✅ Đã dựng xong Màn hình: Hire Categories (/hire)");

    // 4. Zoom đến vùng các màn hình mới
    figma.viewport.scrollAndZoomIntoView([postProjFrame, hireFrame]);

    figma.notify("🎉 Dựng thành công 2 màn hình Post Project & Hire vào Figma!", { timeout: 4000 });

  } catch (err) {
    console.error("❌ Lỗi khi thực thi script:", err);
    figma.notify("Lỗi: " + err.message, { error: true });
  }
})();
