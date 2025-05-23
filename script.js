// グローバル変数とデータ管理
let allWords = []; // 全ての単語データ
let currentWords = []; // 現在の絞り込み条件に合致する単語
let currentIndex = 0; // 現在表示中の単語のインデックス
let isFlipped = false; // カードがめくられているかどうか
let isRandomMode = false; // ランダム表示モードかどうか

// 学習ステータスの定義
const STATUS = {
  UNLEARNED: "unlearned",
  REVIEW: "review",
  LEARNED: "learned",
};

// 絞り込み条件
let filterConditions = {
  categories: [],
  statuses: [STATUS.UNLEARNED, STATUS.REVIEW, STATUS.LEARNED],
};

// DOM要素の取得
const elements = {
  // カード関連
  flashcard: document.getElementById("flashcard"),
  wordNumber: document.getElementById("wordNumber"),
  word: document.getElementById("word"),
  wordNumberBack: document.getElementById("wordNumberBack"),
  wordBack: document.getElementById("wordBack"),
  category: document.getElementById("category"),
  meanings: document.getElementById("meanings"),
  examples: document.getElementById("examples"),
  statusIndicator: document.getElementById("statusIndicator"),

  // コントロール関連
  prevButton: document.getElementById("prevButton"),
  nextButton: document.getElementById("nextButton"),
  flipButton: document.getElementById("flipButton"),
  randomMode: document.getElementById("randomMode"),
  jumpInput: document.getElementById("jumpInput"),
  jumpButton: document.getElementById("jumpButton"),

  // ステータスボタン
  statusUnlearned: document.getElementById("statusUnlearned"),
  statusReview: document.getElementById("statusReview"),
  statusLearned: document.getElementById("statusLearned"),

  // 絞り込み関連
  filterButton: document.getElementById("filterButton"),
  filterModal: document.getElementById("filterModal"),
  overlay: document.getElementById("overlay"),
  closeModal: document.getElementById("closeModal"),
  categoryFilters: document.getElementById("categoryFilters"),
  statusFilters: document.getElementById("statusFilters"),
  applyFilters: document.getElementById("applyFilters"),
  resetFilters: document.getElementById("resetFilters"),

  // 情報表示
  progressInfo: document.getElementById("progressInfo"),
  cardPosition: document.getElementById("cardPosition"),
  errorMessage: document.getElementById("errorMessage"),
};

// アプリケーション初期化
async function init() {
  try {
    showMessage("単語データを読み込み中...", "info");

    // データファイルの読み込み
    await loadWords();

    // ローカルストレージから学習状況を復元
    loadLearningStatus();

    // 絞り込み条件を復元
    loadFilterConditions();

    // カテゴリフィルターの生成
    generateCategoryFilters();

    // 初期表示の更新
    applyFilters();

    // イベントリスナーの設定
    setupEventListeners();

    // 最初のカードを表示
    updateCardView();

    showMessage("データの読み込みが完了しました", "success");
  } catch (error) {
    console.error("初期化エラー:", error);
    showMessage("データの読み込みに失敗しました", "error");
  }
}

// 単語データの読み込みとパース
async function loadWords() {
  try {
    const response = await fetch("data/gin_no_phrase.txt");
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const text = await response.text();
    allWords = parseWordsData(text);

    if (allWords.length === 0) {
      throw new Error("有効な単語データが見つかりませんでした");
    }

    console.log(`${allWords.length}個の単語を読み込みました`);
  } catch (error) {
    console.error("ファイル読み込みエラー:", error);
    throw error;
  }
}

// テキストデータのパース処理
function parseWordsData(text) {
  const lines = text.split("\n");
  const words = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 空行をスキップ
    if (!line) continue;

    // 通し番号の行（タブ文字を含む）
    if (line.includes("\t")) {
      const [id] = line.split("\t");

      // 次の行が単語情報
      if (i + 1 < lines.length) {
        const wordLine = lines[i + 1].trim();

        // 日本語のみの行（Supplement4など）をスキップ
        if (!/[a-zA-Z]/.test(wordLine)) {
          continue;
        }

        // 単語番号と英単語を分離
        const wordMatch = wordLine.match(/^(\d+)\s*-\s*(.+)$/);
        if (wordMatch) {
          const [, wordNumber, englishWord] = wordMatch;

          // カテゴリ名（次の行）
          let categoryName = "";
          if (i + 2 < lines.length) {
            categoryName = lines[i + 2].trim();
          }

          words.push({
            id: parseInt(id),
            wordNumber: wordNumber.padStart(3, "0"),
            word: englishWord.trim(),
            category: categoryName,
            status: STATUS.UNLEARNED,
            meanings: [], // word_details.jsonがない場合は空配列
            examples: [], // word_details.jsonがない場合は空配列
          });
        }
      }
    }
  }

  return words;
}

// ローカルストレージから学習状況を復元
function loadLearningStatus() {
  const savedStatus = localStorage.getItem("ginPhrase_learningStatus");
  if (savedStatus) {
    try {
      const statusData = JSON.parse(savedStatus);
      allWords.forEach((word) => {
        if (statusData[word.id]) {
          word.status = statusData[word.id];
        }
      });
    } catch (error) {
      console.error("学習状況の復元に失敗:", error);
    }
  }
}

// 学習状況をローカルストレージに保存
function saveLearningStatus() {
  const statusData = {};
  allWords.forEach((word) => {
    statusData[word.id] = word.status;
  });
  localStorage.setItem("ginPhrase_learningStatus", JSON.stringify(statusData));
}

// 絞り込み条件を復元
function loadFilterConditions() {
  const savedFilters = localStorage.getItem("ginPhrase_filterConditions");
  if (savedFilters) {
    try {
      filterConditions = JSON.parse(savedFilters);
    } catch (error) {
      console.error("絞り込み条件の復元に失敗:", error);
    }
  }
}

// 絞り込み条件を保存
function saveFilterConditions() {
  localStorage.setItem(
    "ginPhrase_filterConditions",
    JSON.stringify(filterConditions)
  );
}

// カテゴリフィルターの生成
function generateCategoryFilters() {
  const categories = [...new Set(allWords.map((word) => word.category))].filter(
    (cat) => cat
  );

  elements.categoryFilters.innerHTML = "";
  categories.forEach((category) => {
    const label = document.createElement("label");
    label.className = "checkbox-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = category;
    checkbox.checked =
      filterConditions.categories.length === 0 ||
      filterConditions.categories.includes(category);

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(category));
    elements.categoryFilters.appendChild(label);
  });
}

// 絞り込み条件の適用
function applyFilters() {
  // カテゴリフィルター
  let filteredWords = allWords;
  if (filterConditions.categories.length > 0) {
    filteredWords = filteredWords.filter((word) =>
      filterConditions.categories.includes(word.category)
    );
  }

  // ステータスフィルター
  if (filterConditions.statuses.length > 0) {
    filteredWords = filteredWords.filter((word) =>
      filterConditions.statuses.includes(word.status)
    );
  }

  currentWords = filteredWords;
  currentIndex = 0;

  updateProgressInfo();
  updateCardView();
}

// 進捗情報の更新
function updateProgressInfo() {
  const totalWords = allWords.length;
  const learnedCount = allWords.filter(
    (word) => word.status === STATUS.LEARNED
  ).length;
  const currentCount = currentWords.length;

  elements.progressInfo.textContent = `学習済み: ${learnedCount}/${totalWords} | 表示中: ${currentCount}語`;

  if (currentWords.length > 0) {
    elements.cardPosition.textContent = `${currentIndex + 1} / ${
      currentWords.length
    }`;
  } else {
    elements.cardPosition.textContent = "0 / 0";
  }
}

// カード表示の更新
function updateCardView() {
  if (currentWords.length === 0) {
    showEmptyState();
    return;
  }

  const currentWord = currentWords[currentIndex];

  // 表面の更新
  elements.wordNumber.textContent = currentWord.wordNumber;
  elements.word.textContent = currentWord.word;

  // 裏面の更新
  elements.wordNumberBack.textContent = currentWord.wordNumber;
  elements.wordBack.textContent = currentWord.word;
  elements.category.textContent = currentWord.category;

  // 意味と例文の表示
  updateMeaningsAndExamples(currentWord);

  // ステータスインジケーターの更新
  updateStatusIndicator(currentWord.status);

  // ステータスボタンの更新
  updateStatusButtons(currentWord.status);

  // カードを表面に戻す
  if (isFlipped) {
    flipCard();
  }

  // 進捗情報の更新
  updateProgressInfo();
}

// 意味と例文の表示更新
function updateMeaningsAndExamples(word) {
  // 意味の表示
  if (word.meanings && word.meanings.length > 0) {
    elements.meanings.innerHTML = "";
    word.meanings.forEach((meaning) => {
      const div = document.createElement("div");
      div.className = "meaning-item";
      div.textContent = `${meaning.meaning} (${meaning.pos})`;
      elements.meanings.appendChild(div);
    });
  } else {
    elements.meanings.innerHTML =
      '<div class="meaning-item">意味情報がありません</div>';
  }

  // 例文の表示
  if (word.examples && word.examples.length > 0) {
    elements.examples.innerHTML = "";
    word.examples.forEach((example) => {
      const div = document.createElement("div");
      div.className = "example-item";
      div.innerHTML = `
                <div class="example-en">${example.sentence_en}</div>
                <div class="example-ja">${example.sentence_ja}</div>
            `;
      elements.examples.appendChild(div);
    });
  } else {
    elements.examples.innerHTML =
      '<div class="example-item">例文情報がありません</div>';
  }
}

// 空状態の表示
function showEmptyState() {
  elements.wordNumber.textContent = "---";
  elements.word.textContent = "表示する単語がありません";
  elements.cardPosition.textContent = "0 / 0";
}

// ステータスインジケーターの更新
function updateStatusIndicator(status) {
  elements.statusIndicator.className = "status-indicator";
  elements.statusIndicator.classList.add(status);
}

// ステータスボタンの更新
function updateStatusButtons(status) {
  // 全てのボタンからactiveクラスを削除
  elements.statusUnlearned.classList.remove("active");
  elements.statusReview.classList.remove("active");
  elements.statusLearned.classList.remove("active");

  // 現在のステータスに対応するボタンをアクティブにする
  switch (status) {
    case STATUS.UNLEARNED:
      elements.statusUnlearned.classList.add("active");
      break;
    case STATUS.REVIEW:
      elements.statusReview.classList.add("active");
      break;
    case STATUS.LEARNED:
      elements.statusLearned.classList.add("active");
      break;
  }
}

// カードめくり処理
function flipCard() {
  elements.flashcard.classList.toggle("flipped");
  isFlipped = !isFlipped;

  // ボタンテキストの更新
  elements.flipButton.textContent = isFlipped ? "カードを戻す" : "答えを見る";
}

// 次の単語へ移動
function nextWord() {
  if (currentWords.length === 0) return;

  if (isRandomMode) {
    // ランダム表示
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    currentIndex = randomIndex;
  } else {
    // 順次表示
    currentIndex = (currentIndex + 1) % currentWords.length;
  }

  updateCardView();
}

// 前の単語へ移動
function prevWord() {
  if (currentWords.length === 0) return;

  if (isRandomMode) {
    // ランダム表示
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    currentIndex = randomIndex;
  } else {
    // 順次表示
    currentIndex =
      (currentIndex - 1 + currentWords.length) % currentWords.length;
  }

  updateCardView();
}

// 単語番号でジャンプ
function jumpToWord() {
  const wordId = parseInt(elements.jumpInput.value);
  if (isNaN(wordId) || wordId < 1) {
    showMessage("有効な単語番号を入力してください", "error");
    return;
  }

  // allWordsから該当する単語を検索
  const targetWord = allWords.find((word) => word.id === wordId);
  if (!targetWord) {
    showMessage("指定された単語番号が見つかりません", "error");
    return;
  }

  // currentWordsに含まれているかチェック
  const targetIndex = currentWords.findIndex((word) => word.id === wordId);
  if (targetIndex === -1) {
    showMessage(
      "指定された単語は現在の絞り込み条件に含まれていません",
      "error"
    );
    return;
  }

  currentIndex = targetIndex;
  updateCardView();
  elements.jumpInput.value = "";
}

// 学習ステータスの変更
function changeStatus(newStatus) {
  if (currentWords.length === 0) return;

  const currentWord = currentWords[currentIndex];
  currentWord.status = newStatus;

  // allWordsの対応する項目も更新
  const allWordIndex = allWords.findIndex((word) => word.id === currentWord.id);
  if (allWordIndex !== -1) {
    allWords[allWordIndex].status = newStatus;
  }

  updateStatusIndicator(newStatus);
  updateStatusButtons(newStatus);
  saveLearningStatus();
  updateProgressInfo();
}

// モーダルの表示/非表示
function showModal() {
  elements.filterModal.classList.add("show");
  elements.overlay.classList.add("show");

  // 現在の絞り込み条件をモーダルに反映
  updateModalFilters();
}

function hideModal() {
  elements.filterModal.classList.remove("show");
  elements.overlay.classList.remove("show");
}

// モーダルの絞り込み条件を更新
function updateModalFilters() {
  // カテゴリフィルター
  const categoryCheckboxes = elements.categoryFilters.querySelectorAll(
    'input[type="checkbox"]'
  );
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked =
      filterConditions.categories.length === 0 ||
      filterConditions.categories.includes(checkbox.value);
  });

  // ステータスフィルター
  const statusCheckboxes = elements.statusFilters.querySelectorAll(
    'input[type="checkbox"]'
  );
  statusCheckboxes.forEach((checkbox) => {
    checkbox.checked = filterConditions.statuses.includes(checkbox.value);
  });
}

// 絞り込み条件の適用（モーダルから）
function applyFiltersFromModal() {
  // カテゴリフィルター
  const categoryCheckboxes = elements.categoryFilters.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  filterConditions.categories = Array.from(categoryCheckboxes).map(
    (cb) => cb.value
  );

  // ステータスフィルター
  const statusCheckboxes = elements.statusFilters.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  filterConditions.statuses = Array.from(statusCheckboxes).map(
    (cb) => cb.value
  );

  // 条件が空の場合はアラート
  if (
    filterConditions.categories.length === 0 &&
    filterConditions.statuses.length === 0
  ) {
    showMessage("少なくとも一つの条件を選択してください", "error");
    return;
  }

  saveFilterConditions();
  applyFilters();
  hideModal();
  showMessage("絞り込み条件を適用しました", "success");
}

// 絞り込み条件のリセット
function resetFilters() {
  filterConditions = {
    categories: [],
    statuses: [STATUS.UNLEARNED, STATUS.REVIEW, STATUS.LEARNED],
  };

  updateModalFilters();
  saveFilterConditions();
  applyFilters();
  showMessage("絞り込み条件をリセットしました", "success");
}

// メッセージ表示
function showMessage(message, type = "info") {
  elements.errorMessage.textContent = message;
  elements.errorMessage.classList.add("show");

  // 3秒後に自動で非表示
  setTimeout(() => {
    elements.errorMessage.classList.remove("show");
  }, 3000);
}

// イベントリスナーの設定
function setupEventListeners() {
  // カード操作
  elements.flashcard.addEventListener("click", flipCard);
  elements.flipButton.addEventListener("click", flipCard);
  elements.prevButton.addEventListener("click", prevWord);
  elements.nextButton.addEventListener("click", nextWord);

  // ランダムモード
  elements.randomMode.addEventListener("change", (e) => {
    isRandomMode = e.target.checked;
  });

  // ジャンプ機能
  elements.jumpButton.addEventListener("click", jumpToWord);
  elements.jumpInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      jumpToWord();
    }
  });

  // ステータス変更
  elements.statusUnlearned.addEventListener("click", () =>
    changeStatus(STATUS.UNLEARNED)
  );
  elements.statusReview.addEventListener("click", () =>
    changeStatus(STATUS.REVIEW)
  );
  elements.statusLearned.addEventListener("click", () =>
    changeStatus(STATUS.LEARNED)
  );

  // モーダル
  elements.filterButton.addEventListener("click", showModal);
  elements.closeModal.addEventListener("click", hideModal);
  elements.overlay.addEventListener("click", hideModal);
  elements.applyFilters.addEventListener("click", applyFiltersFromModal);
  elements.resetFilters.addEventListener("click", resetFilters);

  // キーボードショートカット
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

// キーボードショートカット処理
function handleKeyboardShortcuts(e) {
  // モーダルが開いている場合は無視
  if (elements.filterModal.classList.contains("show")) return;

  switch (e.key) {
    case " ": // スペース: カードめくり
      e.preventDefault();
      flipCard();
      break;
    case "ArrowRight": // 右矢印: 次の単語
      e.preventDefault();
      nextWord();
      break;
    case "ArrowLeft": // 左矢印: 前の単語
      e.preventDefault();
      prevWord();
      break;
    case "r":
    case "R": // R: 要復習
      e.preventDefault();
      changeStatus(STATUS.REVIEW);
      break;
    case "f":
    case "F": // F: 覚えていない（未学習）
      e.preventDefault();
      changeStatus(STATUS.UNLEARNED);
      break;
    case "l":
    case "L": // L: 習得済み
      e.preventDefault();
      changeStatus(STATUS.LEARNED);
      break;
  }
}

// DOM読み込み完了後に初期化実行
document.addEventListener("DOMContentLoaded", init);
