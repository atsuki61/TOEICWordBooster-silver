// 単語データ
const vocabData = [
  {
    word: "certificate",
    meaning: "証明書；資格証明書",
    example: "She received a certificate after completing the course.",
  },
  {
    word: "storage",
    meaning: "保管；貯蔵；倉庫",
    example: "We need more storage space for our equipment.",
  },
  {
    word: "administrative",
    meaning: "管理の；行政の",
    example: "He works in the administrative department.",
  },
  {
    word: "banquet",
    meaning: "宴会；祝宴",
    example: "The company hosted a banquet for its employees.",
  },
  {
    word: "retail",
    meaning: "小売り；小売りの",
    example: "She works in retail sales.",
  },
  {
    word: "ingredient",
    meaning: "材料；成分",
    example: "This recipe requires five ingredients.",
  },
  {
    word: "inquiry",
    meaning: "問い合わせ；調査",
    example: "We received an inquiry about our services.",
  },
  {
    word: "accommodate",
    meaning: "収容する；宿泊させる",
    example: "The hotel can accommodate up to 200 guests.",
  },
  {
    word: "generate",
    meaning: "生み出す；発生させる",
    example: "The new system will generate more revenue.",
  },
  {
    word: "affordable",
    meaning: "手頃な価格の；買える",
    example: "We offer affordable housing options.",
  },
  {
    word: "authorize",
    meaning: "権限を与える；認可する",
    example: "Only managers are authorized to approve expenses.",
  },
  {
    word: "summary",
    meaning: "要約；概要",
    example: "Please provide a summary of the meeting.",
  },
  {
    word: "valid",
    meaning: "有効な；正当な",
    example: "Your passport must be valid for at least six months.",
  },
  {
    word: "tourism",
    meaning: "観光；観光業",
    example: "Tourism is the main industry in this region.",
  },
  {
    word: "equip",
    meaning: "装備する；備え付ける",
    example: "The lab is equipped with the latest technology.",
  },
  {
    word: "revenue",
    meaning: "収入；収益",
    example: "The company reported increased revenue this year.",
  },
  {
    word: "inexpensive",
    meaning: "安価な；手ごろな",
    example: "We found an inexpensive hotel for our stay.",
  },
  {
    word: "exceptional",
    meaning: "例外的な；優れた",
    example: "She has exceptional skills in mathematics.",
  },
  {
    word: "hallway",
    meaning: "廊下；玄関の間",
    example: "The children were playing in the hallway.",
  },
  {
    word: "circulation",
    meaning: "循環；発行部数",
    example: "Exercise improves blood circulation.",
  },
  {
    word: "complicated",
    meaning: "複雑な；込み入った",
    example: "The instructions are too complicated to follow.",
  },
  {
    word: "dedicated",
    meaning: "専用の；献身的な",
    example: "He is dedicated to his work.",
  },
  {
    word: "mentoring",
    meaning: "指導；助言",
    example: "The company has a mentoring program for new employees.",
  },
  {
    word: "nutrition",
    meaning: "栄養；栄養学",
    example: "Good nutrition is essential for health.",
  },
  {
    word: "accessible",
    meaning: "利用できる；分かりやすい",
    example: "The building is accessible to wheelchair users.",
  },
  {
    word: "coverage",
    meaning: "報道；保険の適用範囲",
    example: "The news channel provided extensive coverage of the event.",
  },
  {
    word: "motivate",
    meaning: "動機付ける；奮起させる",
    example: "Good leaders know how to motivate their team.",
  },
  {
    word: "refreshment",
    meaning: "軽食；飲み物",
    example: "Refreshments will be served after the meeting.",
  },
  {
    word: "cashier",
    meaning: "レジ係",
    example: "She works as a cashier at the supermarket.",
  },
  {
    word: "transaction",
    meaning: "取引；処理",
    example: "The bank processed the transaction immediately.",
  },
  {
    word: "acknowledge",
    meaning: "認める；確認する",
    example: "He acknowledged receiving the package.",
  },
  {
    word: "nomination",
    meaning: "指名；推薦",
    example: "She received a nomination for the award.",
  },
  {
    word: "overtime",
    meaning: "残業；延長戦",
    example: "I had to work overtime to finish the project.",
  },
  {
    word: "premises",
    meaning: "建物；敷地",
    example: "Smoking is not allowed on the premises.",
  },
  {
    word: "reliable",
    meaning: "信頼できる；確かな",
    example: "He is a reliable worker who never misses deadlines.",
  },
  {
    word: "utility",
    meaning: "公共事業；実用性",
    example: "The utility bills have increased this month.",
  },
  {
    word: "blueprint",
    meaning: "青写真；設計図",
    example: "The architects presented the blueprint for the new building.",
  },
  {
    word: "compensation",
    meaning: "報酬；補償",
    example: "She received compensation for her injuries.",
  },
  {
    word: "exclusive",
    meaning: "独占的な；排他的な",
    example: "The hotel offers exclusive access to the beach.",
  },
  {
    word: "consistently",
    meaning: "一貫して；常に",
    example: "She has performed consistently well this season.",
  },
  {
    word: "update",
    meaning: "更新する；最新情報",
    example: "Please update your software to the latest version.",
  },
  {
    word: "submission",
    meaning: "提出；服従",
    example: "The deadline for submission is next Friday.",
  },
  {
    word: "subscription",
    meaning: "購読；会員資格",
    example: "I have a subscription to several magazines.",
  },
  {
    word: "appliance",
    meaning: "電化製品；器具",
    example: "Kitchen appliances are on sale this week.",
  },
  {
    word: "brochure",
    meaning: "パンフレット；案内書",
    example: "The travel brochure describes various tour packages.",
  },
  {
    word: "feedback",
    meaning: "フィードバック；反応",
    example: "We appreciate your feedback on our services.",
  },
  {
    word: "merchandise",
    meaning: "商品；商品化する",
    example: "The store sells sports merchandise.",
  },
  {
    word: "supplier",
    meaning: "供給者；納入業者",
    example: "We need to find a new supplier for office equipment.",
  },
  {
    word: "catering",
    meaning: "ケータリング；出前",
    example: "The company provides catering for special events.",
  },
  {
    word: "agenda",
    meaning: "議題；予定表",
    example: "The meeting agenda has been distributed.",
  },
  {
    word: "fabric",
    meaning: "生地；織物",
    example: "This fabric is perfect for summer clothing.",
  },
  {
    word: "lease",
    meaning: "賃貸契約；借りる",
    example: "We signed a one-year lease for the apartment.",
  },
  {
    word: "beverage",
    meaning: "飲み物",
    example: "The restaurant offers a variety of beverages.",
  },
  {
    word: "prior",
    meaning: "前の；優先する",
    example: "Prior experience is required for this position.",
  },
  {
    word: "inconvenience",
    meaning: "不便；迷惑",
    example: "We apologize for any inconvenience caused.",
  },
  {
    word: "innovative",
    meaning: "革新的な",
    example: "The company is known for its innovative products.",
  },
  {
    word: "luncheon",
    meaning: "昼食会",
    example: "A luncheon was held to honor the retiring employees.",
  },
  {
    word: "auditorium",
    meaning: "講堂；大ホール",
    example: "The graduation ceremony will be held in the auditorium.",
  },
  {
    word: "qualified",
    meaning: "資格のある；適任の",
    example: "She is highly qualified for the position.",
  },
  {
    word: "souvenir",
    meaning: "お土産；記念品",
    example: "I bought a souvenir for my friend.",
  },
  {
    word: "comprehensive",
    meaning: "包括的な；総合的な",
    example: "The report provides a comprehensive analysis of the market.",
  },
  {
    word: "plumbing",
    meaning: "配管；水道設備",
    example: "We need to call a plumber to fix the plumbing.",
  },
  {
    word: "enhance",
    meaning: "高める；強化する",
    example: "These features enhance the performance of the software.",
  },
  {
    word: "intersection",
    meaning: "交差点；交わり",
    example: "The accident occurred at the intersection.",
  },
  {
    word: "supervisor",
    meaning: "監督者；上司",
    example: "Please report any issues to your supervisor.",
  },
  {
    word: "shipment",
    meaning: "出荷；積荷",
    example: "The shipment will arrive next week.",
  },
  {
    word: "invoice",
    meaning: "請求書",
    example: "We haven't received the invoice yet.",
  },
  {
    word: "notify",
    meaning: "通知する；知らせる",
    example: "Please notify us of any changes to your address.",
  },
  {
    word: "warehouse",
    meaning: "倉庫",
    example: "The products are stored in our warehouse.",
  },
  {
    word: "upgrade",
    meaning: "アップグレードする",
    example: "It's time to upgrade your computer system.",
  },
  {
    word: "orientation",
    meaning: "オリエンテーション；方向",
    example: "New employees must attend the orientation session.",
  },
  {
    word: "directory",
    meaning: "名簿；ディレクトリ",
    example: "His name is listed in the company directory.",
  },
  {
    word: "expire",
    meaning: "期限切れになる",
    example: "Your passport will expire next month.",
  },
  {
    word: "merger",
    meaning: "合併",
    example: "The merger between the two companies was announced today.",
  },
  {
    word: "quarterly",
    meaning: "四半期の；四半期ごとに",
    example: "The company releases quarterly financial reports.",
  },
  {
    word: "questionnaire",
    meaning: "アンケート",
    example: "Please complete this questionnaire about our service.",
  },
  {
    word: "defective",
    meaning: "欠陥のある；不完全な",
    example: "The store replaced the defective product.",
  },
  {
    word: "workplace",
    meaning: "職場",
    example: "Harassment is not tolerated in the workplace.",
  },
  {
    word: "enroll",
    meaning: "登録する；入学する",
    example: "You can enroll in the course online.",
  },
  {
    word: "pharmacy",
    meaning: "薬局；調剤学",
    example: "You can get this prescription filled at any pharmacy.",
  },
  {
    word: "spacious",
    meaning: "広々とした",
    example: "The apartment is very spacious and comfortable.",
  },
  {
    word: "landmark",
    meaning: "目印；名所",
    example: "The Eiffel Tower is a famous landmark in Paris.",
  },
  {
    word: "commute",
    meaning: "通勤する；往復する",
    example: "He commutes two hours each day to work.",
  },
  {
    word: "medication",
    meaning: "薬；投薬",
    example: "Take this medication twice daily after meals.",
  },
  {
    word: "discontinued",
    meaning: "廃止された；中止された",
    example: "This model has been discontinued by the manufacturer.",
  },
  {
    word: "portfolio",
    meaning: "ポートフォリオ；作品集",
    example: "She showed us her design portfolio during the interview.",
  },
  {
    word: "warranty",
    meaning: "保証；保証書",
    example: "The product comes with a two-year warranty.",
  },
  {
    word: "refund",
    meaning: "返金；払い戻し",
    example: "If you're not satisfied, we'll issue a full refund.",
  },
  {
    word: "inventory",
    meaning: "在庫；目録",
    example: "We need to check the inventory before ordering more supplies.",
  },
  {
    word: "renowned",
    meaning: "名高い；有名な",
    example: "She is a renowned expert in her field.",
  },
  {
    word: "vendor",
    meaning: "販売業者；売り手",
    example: "The vendor refused to lower the price.",
  },
  {
    word: "publicize",
    meaning: "公表する；宣伝する",
    example: "The company will publicize the new product next month.",
  },
  {
    word: "tuition",
    meaning: "授業料；指導",
    example: "College tuition has increased significantly.",
  },
  {
    word: "complimentary",
    meaning: "無料の；賛辞の",
    example: "The hotel offers complimentary breakfast.",
  },
  {
    word: "eligible",
    meaning: "適格な；資格のある",
    example: "Are you eligible for a student discount?",
  },
  {
    word: "fund-raising",
    meaning: "資金調達",
    example: "The organization held a fund-raising event.",
  },
  {
    word: "payroll",
    meaning: "給与支払い名簿；給料",
    example: "The accountant prepares the payroll every month.",
  },
  {
    word: "reimbursement",
    meaning: "払い戻し；弁済",
    example: "Submit your receipts for reimbursement of expenses.",
  },
  {
    word: "itinerary",
    meaning: "旅程；旅行日程",
    example: "The travel agent prepared our itinerary.",
  },
  {
    word: "endeavor",
    meaning: "努力；試み",
    example: "Scientific endeavor has led to many discoveries.",
  },
];

// DOM要素の取得
const cardElement = document.getElementById("currentCard");
const wordElement = document.querySelector(".word");
const meaningElement = document.querySelector(".meaning");
const exampleElement = document.querySelector(".example");
const flipButton = document.getElementById("flipCard");
const nextButton = document.getElementById("nextCard");
const prevButton = document.getElementById("prevCard");
const cardIndexElement = document.getElementById("cardIndex");
const markRememberedButton = document.getElementById("markRemembered");
const markNotRememberedButton = document.getElementById("markNotRemembered");
const progressElement = document.getElementById("progress");
const showAllButton = document.getElementById("showAll");
const showRememberedButton = document.getElementById("showRemembered");
const showNotRememberedButton = document.getElementById("showNotRemembered");
const statusIndicator = cardElement.querySelector(".status-indicator");

// 状態管理
let currentCardIndex = 0;
let filteredCards = [...vocabData];
let rememberedStatus = loadRememberedStatus();

// 初期表示
updateCard();
updateProgress();

// カードをめくる
flipButton.addEventListener("click", () => {
  cardElement.classList.toggle("flipped");
});

// カードをクリックしてもめくれるようにする
cardElement.addEventListener("click", () => {
  cardElement.classList.toggle("flipped");
});

// 次のカードへ
nextButton.addEventListener("click", () => {
  if (currentCardIndex < filteredCards.length - 1) {
    currentCardIndex++;
  } else {
    currentCardIndex = 0;
  }
  cardElement.classList.remove("flipped");
  updateCard();
});

// 前のカードへ
prevButton.addEventListener("click", () => {
  if (currentCardIndex > 0) {
    currentCardIndex--;
  } else {
    currentCardIndex = filteredCards.length - 1;
  }
  cardElement.classList.remove("flipped");
  updateCard();
});

// 覚えたボタン
markRememberedButton.addEventListener("click", () => {
  const currentWord = filteredCards[currentCardIndex].word;
  rememberedStatus[currentWord] = true;
  saveRememberedStatus();
  updateProgress();

  // フィルタが「覚えていない」の場合は次のカードへ
  if (showNotRememberedButton.classList.contains("active")) {
    applyFilter("notRemembered");
    if (filteredCards.length === 0) {
      // すべて覚えた場合
      showAllButton.click();
    } else if (currentCardIndex >= filteredCards.length) {
      currentCardIndex = 0;
    }
  }

  updateCard();
});

// 覚えていないボタン
markNotRememberedButton.addEventListener("click", () => {
  const currentWord = filteredCards[currentCardIndex].word;
  rememberedStatus[currentWord] = false;
  saveRememberedStatus();
  updateProgress();

  // フィルタが「覚えた」の場合は次のカードへ
  if (showRememberedButton.classList.contains("active")) {
    applyFilter("remembered");
    if (filteredCards.length === 0) {
      // 覚えたものがない場合
      showAllButton.click();
    } else if (currentCardIndex >= filteredCards.length) {
      currentCardIndex = 0;
    }
  }

  updateCard();
});

// フィルタボタンのイベント
showAllButton.addEventListener("click", () => {
  setActiveFilter(showAllButton);
  applyFilter("all");
});

showRememberedButton.addEventListener("click", () => {
  setActiveFilter(showRememberedButton);
  applyFilter("remembered");
});

showNotRememberedButton.addEventListener("click", () => {
  setActiveFilter(showNotRememberedButton);
  applyFilter("notRemembered");
});

// フィルタを適用
function applyFilter(filter) {
  switch (filter) {
    case "all":
      filteredCards = [...vocabData];
      break;
    case "remembered":
      filteredCards = vocabData.filter(
        (card) => rememberedStatus[card.word] === true
      );
      break;
    case "notRemembered":
      filteredCards = vocabData.filter(
        (card) => rememberedStatus[card.word] !== true
      );
      break;
  }

  currentCardIndex = 0;
  cardElement.classList.remove("flipped");
  updateCard();
}

// アクティブフィルタを設定
function setActiveFilter(button) {
  showAllButton.classList.remove("active");
  showRememberedButton.classList.remove("active");
  showNotRememberedButton.classList.remove("active");
  button.classList.add("active");
}

// カード情報を更新
function updateCard() {
  if (filteredCards.length === 0) {
    wordElement.textContent = "カードがありません";
    meaningElement.textContent = "";
    exampleElement.textContent = "";
    cardIndexElement.textContent = "0/0";
    return;
  }

  const card = filteredCards[currentCardIndex];
  wordElement.textContent = card.word;
  meaningElement.textContent = card.meaning;
  exampleElement.textContent = card.example;
  cardIndexElement.textContent = `${currentCardIndex + 1}/${
    filteredCards.length
  }`;

  // 覚えた/覚えてないのスタイル適用
  if (rememberedStatus[card.word] === true) {
    markRememberedButton.style.opacity = "1";
    markNotRememberedButton.style.opacity = "0.5";
  } else {
    markRememberedButton.style.opacity = "0.5";
    markNotRememberedButton.style.opacity = "1";
  }

  // ステータスインジケーター更新
  statusIndicator.classList.remove("remembered", "not-remembered");
  if (rememberedStatus[card.word] === true) {
    statusIndicator.textContent = "〇";
    statusIndicator.classList.add("remembered");
  } else if (rememberedStatus[card.word] === false) {
    statusIndicator.textContent = "×";
    statusIndicator.classList.add("not-remembered");
  } else {
    statusIndicator.textContent = "";
  }
}

// 進捗を更新
function updateProgress() {
  const remembered = Object.values(rememberedStatus).filter(
    (status) => status === true
  ).length;
  progressElement.textContent = `${remembered}/${vocabData.length} 単語を覚えました`;
}

// ローカルストレージから状態を読み込む
function loadRememberedStatus() {
  const storedStatus = localStorage.getItem("rememberedStatus");
  return storedStatus ? JSON.parse(storedStatus) : {};
}

// ローカルストレージに状態を保存
function saveRememberedStatus() {
  localStorage.setItem("rememberedStatus", JSON.stringify(rememberedStatus));
}

// キーボードショートカット
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " ": // スペースでカードをめくる
      cardElement.classList.toggle("flipped");
      break;
    case "ArrowRight": // 右矢印で次へ
      nextButton.click();
      break;
    case "ArrowLeft": // 左矢印で前へ
      prevButton.click();
      break;
    case "r": // 'r'で覚えたとマーク
      markRememberedButton.click();
      break;
    case "f": // 'f'で覚えてないとマーク
      markNotRememberedButton.click();
      break;
  }
});
