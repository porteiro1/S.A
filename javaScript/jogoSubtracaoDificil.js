// Target result for subtraction
let targetDifference = 0;

// Counters
let leftApples = 0, rightApples = 0;
let leftBaskets = 0, rightBaskets = 0;
let leftBuckets = 0, rightBuckets = 0;

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

// Sound effects
const sound = new Audio("../images/macaSoundEffect.mp3");
const correctSound = new Audio("../images/acerto.mp3");
const wrongSound = new Audio("../images/erro.mp3");

// Gera novo desafio de subtração
function generateTarget() {
  targetDifference = Math.floor(Math.random() * 50) + 5;
  resultDisplay.textContent = targetDifference;
  resetGame();
}

// Reinicia todos os elementos do jogo
function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = rightApples = leftBaskets = rightBaskets = leftBuckets = rightBuckets = 0;

  dropAreas.forEach((area) => area.innerHTML = "");

  const wordContainer = document.getElementById("wordContainer");
  if (wordContainer) {
    wordContainer.innerHTML = "";
    const wordData = [
      { id: "word1", text: "Minuendo" },
      { id: "word2", text: "Subtraendo" },
      { id: "word3", text: "Diferença" },
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

  createItems(appleContainer, 10, "/S.A/images/greenApple.png", "apple");
  createItems(basketContainer, 6, "/S.A/images/basket.png", "basket", BASKET_VALUE);
  createItems(bucketContainer, 4, "/S.A/images/bucket.png", "bucket", BUCKET_VALUE);

  // Pratos como zonas de drop
  leftPlate.addEventListener("dragover", allowDrop);
  leftPlate.addEventListener("drop", dropToLeftPlate);
  rightPlate.addEventListener("dragover", allowDrop);
  rightPlate.addEventListener("drop", dropToRightPlate);

  // Zonas de texto
  dropAreas.forEach((area) => {
    area.addEventListener("dragover", allowDrop);
    area.addEventListener("dragleave", onDragLeave);
    area.addEventListener("drop", dropWord);
  });

  updateDisplay();
}

// Cria maçãs, cestas ou baldes
function createItems(container, count, src, className, value = null) {
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.src = src;
    item.classList.add(className);
    item.draggable = true;
    if (value) item.dataset.value = value;
    item.addEventListener("dragstart", onDragStart);
    item.addEventListener("dragend", onDragEnd);
    container.appendChild(item);
  }
}

// Eventos de drag
function onDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);

  let type = "word";
  if (e.target.classList.contains("apple")) type = "apple";
  else if (e.target.classList.contains("basket")) type = "basket";
  else if (e.target.classList.contains("bucket")) type = "bucket";

  e.dataTransfer.setData("itemType", type);
}

function onDragEnd(e) {
  e.target.classList.remove("dragging");
}

function allowDrop(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function onDragLeave(e) {
  e.target.classList.remove("drag-over");
}

// Drop de palavras
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
    addItemCount(type, "left");
    item.addEventListener("click", () => removeItem(item, leftPlate, "left", type));
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
    addItemCount(type, "right");
    item.addEventListener("click", () => removeItem(item, rightPlate, "right", type));
    updateDisplay();
  }

  e.target.classList.remove("drag-over");
}

// Incrementa os contadores
function addItemCount(type, side) {
  const modifier = side === "left" ? "left" : "right";
  if (type === "apple") eval(`${modifier}Apples++`);
  if (type === "basket") eval(`${modifier}Baskets++`);
  if (type === "bucket") eval(`${modifier}Buckets++`);
}

// Remove item do prato
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

// Verifica resultado da subtração
function checkResult() {
  const expected = targetDifference;

  const leftTotal = leftApples + leftBaskets * BASKET_VALUE + leftBuckets * BUCKET_VALUE;
  const rightTotal = rightApples + rightBaskets * BASKET_VALUE + rightBuckets * BUCKET_VALUE;
  const actual = leftTotal - rightTotal;

  const word1 = document.getElementById("dropArea1")?.firstChild;
  const word2 = document.getElementById("dropArea2")?.firstChild;
  const word3 = document.getElementById("dropArea3")?.firstChild;

  if (
    word1 && word2 && word3 &&
    word1.id === "word1" &&
    word2.id === "word2" &&
    word3.id === "word3"
  ) {
    alert("Ordem correta das parcelas! 🎉");
  } else {
    alert("Errou a ordem das parcelas!");
  }

  if (actual === expected) {
    alert("Parabéns! Você acertou! 🎉");
    correctSound.play();
  } else if (expected * -1 === actual) {
    alert(`Você acertou, porém o ${actual} está negativo!`);
  } else {
    alert(`Ops! Você colocou ${leftTotal} - ${rightTotal} = ${actual}, mas o desafio era ${expected}.`);
    wrongSound.play();
  }

  generateTarget();
}

// Atualiza a exibição dos totais
function updateDisplay() {
  const leftTotal = leftApples + leftBaskets * BASKET_VALUE + leftBuckets * BUCKET_VALUE;
  const rightTotal = rightApples + rightBaskets * BASKET_VALUE + rightBuckets * BUCKET_VALUE;

  const leftDetails = [];
  if (leftApples) leftDetails.push(`${leftApples} maçãs`);
  if (leftBaskets) leftDetails.push(`${leftBaskets} cestas`);
  if (leftBuckets) leftDetails.push(`${leftBuckets} baldes`);

  const rightDetails = [];
  if (rightApples) rightDetails.push(`${rightApples} maçãs`);
  if (rightBaskets) rightDetails.push(`${rightBaskets} cestas`);
  if (rightBuckets) rightDetails.push(`${rightBuckets} baldes`);

  document.getElementById("leftCount").textContent = `${leftTotal} (${leftDetails.join(" + ")})`;
  document.getElementById("rightCount").textContent = `${rightTotal} (${rightDetails.join(" + ")})`;
}

// Inicia o jogo
generateTarget();
