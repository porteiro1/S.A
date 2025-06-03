// Target sum value
let targetSum = 0;

// Counters for apples, baskets, and buckets
let leftApples = 0;
let rightApples = 0;
let leftBaskets = 0;
let rightBaskets = 0;
let leftBuckets = 0;
let rightBuckets = 0;

const BASKET_VALUE = 5;   // Cada cesta vale 5 maçãs
const BUCKET_VALUE = 10;  // Cada balde vale 10 maçãs

// DOM elements
const leftPlate = document.getElementById("leftPlate");
const rightPlate = document.getElementById("rightPlate");
const appleContainer = document.getElementById("appleContainer");
const basketContainer = document.getElementById("basketContainer");
const bucketContainer = document.getElementById("bucketContainer");
const resultDisplay = document.getElementById("result");
const words = document.querySelectorAll(".word");
const dropAreas = document.querySelectorAll(".drop-area");

// Sounds
const sound = new Audio("../images/macaSoundEffect.mp3");
const correctSound = new Audio("../images/acerto.mp3");
const wrongSound = new Audio("../images/erro.mp3");

// Gera novo desafio de soma
function generateTarget() {
  targetSum = Math.floor(Math.random() * 50) + 5;
  resultDisplay.textContent = targetSum;
  resetGame();
}

// Reinicia os elementos do jogo
function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = 0;
  rightApples = 0;
  leftBaskets = 0;
  rightBaskets = 0;
  leftBuckets = 0;
  rightBuckets = 0;

  dropAreas.forEach((area) => area.innerHTML = "");

  // Palavras (texto educativo)
  const wordContainer = document.getElementById("wordContainer");
  if (wordContainer) {
    wordContainer.innerHTML = "";
    const wordData = [
      { id: "word1", text: "Parcela" },
      { id: "word2", text: "Parcela" },
      { id: "word3", text: "Soma" }
    ];

    wordData.forEach((item) => {
      const word = document.createElement("div");
      word.id = item.id;
      word.className = "word";
      word.textContent = item.text;
      word.draggable = true;

      word.addEventListener("dragstart", onDragStart);
      word.addEventListener("dragend", onDragEnd);
      wordContainer.appendChild(word);
    });
  }

  // Cria maçãs
  for (let i = 0; i < 10; i++) {
    const apple = document.createElement("img");
    apple.src = "/S.A/images/apple.png";
    apple.classList.add("apple");
    apple.draggable = true;
    apple.addEventListener("dragstart", onDragStart);
    apple.addEventListener("dragend", onDragEnd);
    appleContainer.appendChild(apple);
  }

  // Cria cestas
  for (let i = 0; i < 6; i++) {
    const basket = document.createElement("img");
    basket.src = "/S.A/images/basket.png";
    basket.classList.add("basket");
    basket.draggable = true;
    basket.dataset.value = BASKET_VALUE;
    basket.addEventListener("dragstart", onDragStart);
    basket.addEventListener("dragend", onDragEnd);
    basketContainer.appendChild(basket);
  }

  // Cria baldes
  for (let i = 0; i < 4; i++) {
    const bucket = document.createElement("img");
    bucket.src = "/S.A/images/bucket.png";
    bucket.classList.add("bucket");
    bucket.draggable = true;
    bucket.dataset.value = BUCKET_VALUE;
    bucket.addEventListener("dragstart", onDragStart);
    bucket.addEventListener("dragend", onDragEnd);
    bucketContainer.appendChild(bucket);
  }

  // Eventos nos pratos
  leftPlate.addEventListener("dragover", allowDrop);
  leftPlate.addEventListener("drop", dropToLeftPlate);
  rightPlate.addEventListener("dragover", allowDrop);
  rightPlate.addEventListener("drop", dropToRightPlate);

  // Eventos nos campos de texto
  dropAreas.forEach((area) => {
    area.addEventListener("dragover", allowDrop);
    area.addEventListener("dragleave", onDragLeave);
    area.addEventListener("drop", dropWord);
  });

  updateDisplay();
}

// Início do arraste
function onDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);

  let itemType = "word";
  if (e.target.classList.contains("apple")) itemType = "apple";
  else if (e.target.classList.contains("basket")) itemType = "basket";
  else if (e.target.classList.contains("bucket")) itemType = "bucket";

  e.dataTransfer.setData("itemType", itemType);
}

// Fim do arraste
function onDragEnd(e) {
  e.target.classList.remove("dragging");
}

// Permite soltar
function allowDrop(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

// Sai da área de drop
function onDragLeave(e) {
  e.target.classList.remove("drag-over");
}

// Solta palavra
function dropWord(e) {
  e.preventDefault();
  const wordId = e.dataTransfer.getData("text");
  const word = document.getElementById(wordId);
  e.target.innerHTML = "";
  e.target.appendChild(word);
  e.target.classList.remove("drag-over");
}

// Solta item no prato esquerdo
function dropToLeftPlate(e) {
  e.preventDefault();
  const item = document.querySelector(".dragging");
  const type = e.dataTransfer.getData("itemType");

  if (item) {
    item.remove();
    sound.play();
    leftPlate.appendChild(item);

    if (type === "apple") {
      leftApples++;
      item.addEventListener("click", () => removeItem(item, leftPlate, "left", "apple"));
    } else if (type === "basket") {
      leftBaskets++;
      item.addEventListener("click", () => removeItem(item, leftPlate, "left", "basket"));
    } else if (type === "bucket") {
      leftBuckets++;
      item.addEventListener("click", () => removeItem(item, leftPlate, "left", "bucket"));
    }

    updateDisplay();
  }

  e.target.classList.remove("drag-over");
}

// Solta item no prato direito
function dropToRightPlate(e) {
  e.preventDefault();
  const item = document.querySelector(".dragging");
  const type = e.dataTransfer.getData("itemType");

  if (item) {
    item.remove();
    sound.play();
    rightPlate.appendChild(item);

    if (type === "apple") {
      rightApples++;
      item.addEventListener("click", () => removeItem(item, rightPlate, "right", "apple"));
    } else if (type === "basket") {
      rightBaskets++;
      item.addEventListener("click", () => removeItem(item, rightPlate, "right", "basket"));
    } else if (type === "bucket") {
      rightBuckets++;
      item.addEventListener("click", () => removeItem(item, rightPlate, "right", "bucket"));
    }

    updateDisplay();
  }

  e.target.classList.remove("drag-over");
}

// Remove item do prato e devolve
function removeItem(item, plate, side, type) {
  plate.removeChild(item);

  if (type === "apple") {
    appleContainer.appendChild(item);
    side === "left" ? leftApples-- : rightApples--;
  } else if (type === "basket") {
    basketContainer.appendChild(item);
    side === "left" ? leftBaskets-- : rightBaskets--;
  } else if (type === "bucket") {
    bucketContainer.appendChild(item);
    side === "left" ? leftBuckets-- : rightBuckets--;
  }

  updateDisplay();
}

// Verifica soma e palavras
function checkResult() {
  const expected = targetSum;
  const leftTotal = leftApples + (leftBaskets * BASKET_VALUE) + (leftBuckets * BUCKET_VALUE);
  const rightTotal = rightApples + (rightBaskets * BASKET_VALUE) + (rightBuckets * BUCKET_VALUE);
  const actual = leftTotal + rightTotal;

  const dropArea3 = document.getElementById("dropArea3");
  const word3 = dropArea3.firstChild;

  if (word3 && word3.id === "word3") {
    alert("Ordem correta das parcelas! 🎉");
  } else {
    alert("Errou a ordem das parcelas!");
  }

  if (actual === expected) {
    alert("Parabéns! Você acertou! 🎉");
    correctSound.play();
  } else {
    alert(`Ops! Você colocou um total de ${actual} maçãs, vamos tentar novamente!`);
    wrongSound.play();
  }

  generateTarget();
}

// Atualiza os valores exibidos na tela
function updateDisplay() {
  const leftTotal = leftApples + leftBaskets * BASKET_VALUE + leftBuckets * BUCKET_VALUE;
  const rightTotal = rightApples + rightBaskets * BASKET_VALUE + rightBuckets * BUCKET_VALUE;

  let leftText = `${leftTotal}`;
  let rightText = `${rightTotal}`;

  let leftDetails = [];
  if (leftApples > 0) leftDetails.push(`${leftApples} maçãs`);
  if (leftBaskets > 0) leftDetails.push(`${leftBaskets} cestas`);
  if (leftBuckets > 0) leftDetails.push(`${leftBuckets} baldes`);
  if (leftDetails.length) leftText += ` (${leftDetails.join(" + ")})`;

  let rightDetails = [];
  if (rightApples > 0) rightDetails.push(`${rightApples} maçãs`);
  if (rightBaskets > 0) rightDetails.push(`${rightBaskets} cestas`);
  if (rightBuckets > 0) rightDetails.push(`${rightBuckets} baldes`);
  if (rightDetails.length) rightText += ` (${rightDetails.join(" + ")})`;

  document.getElementById("leftCount").textContent = leftText;
  document.getElementById("rightCount").textContent = rightText;
}

// Inicia o jogo
generateTarget();
