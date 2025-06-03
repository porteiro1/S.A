// Target result for subtraction
let targetDifference = 0;

// Counters for apples and baskets
let leftApples = 0;
let rightApples = 0;
let leftBaskets = 0;
let rightBaskets = 0;

const BASKET_VALUE = 5; // Cada cesta vale 5 maçãs

// DOM elements
const leftPlate = document.getElementById("leftPlate");
const rightPlate = document.getElementById("rightPlate");
const appleContainer = document.getElementById("appleContainer");
const basketContainer = document.getElementById("basketContainer");
const resultDisplay = document.getElementById("result");
const words = document.querySelectorAll(".word");
const dropAreas = document.querySelectorAll(".drop-area");

// Sounds
const sound = new Audio("../images/macaSoundEffect.mp3");
const correctSound = new Audio("../images/acerto.mp3");
const wrongSound = new Audio("../images/erro.mp3");

// Gera novo desafio
function generateTarget() {
  targetDifference = Math.floor(Math.random() * 30);
  resultDisplay.textContent = targetDifference;
  resetGame();
}

// Reinicia o jogo
function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = 0;
  rightApples = 0;
  leftBaskets = 0;
  rightBaskets = 0;

  dropAreas.forEach(area => area.innerHTML = "");

  const wordContainer = document.getElementById("wordContainer");
  if (wordContainer) {
    wordContainer.innerHTML = "";
    const wordData = [
      { id: "word2", text: "Subtraendo" },
      { id: "word1", text: "Minuendo" },
      { id: "word3", text: "Diferença" }
    ];

    wordData.forEach(item => {
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

  for (let i = 0; i < 10; i++) {
    const apple = document.createElement("img");
    apple.src = "/S.A/images/greenApple.png";
    apple.classList.add("apple");
    apple.draggable = true;

    apple.addEventListener("dragstart", onDragStart);
    apple.addEventListener("dragend", onDragEnd);

    appleContainer.appendChild(apple);
  }

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

  leftPlate.addEventListener("dragover", allowDrop);
  leftPlate.addEventListener("drop", dropToLeftPlate);

  rightPlate.addEventListener("dragover", allowDrop);
  rightPlate.addEventListener("drop", dropToRightPlate);

  dropAreas.forEach(area => {
    area.addEventListener("dragover", allowDrop);
    area.addEventListener("dragleave", onDragLeave);
    area.addEventListener("drop", dropWord);
  });

  updateDisplay();
}

// Drag events
function onDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.setData("itemType", e.target.classList.contains("apple") ? "apple" : "basket");
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

function dropWord(e) {
  e.preventDefault();
  const wordId = e.dataTransfer.getData("text");
  const word = document.getElementById(wordId);
  e.target.innerHTML = "";
  e.target.appendChild(word);
  e.target.classList.remove("drag-over");
}

// Drop handlers
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
    }
  }

  e.target.classList.remove("drag-over");
}

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
    }
  }

  e.target.classList.remove("drag-over");
}

// Remove item do prato e devolve ao container
function removeItem(item, plate, side, type) {
  plate.removeChild(item);

  if (type === "apple") {
    appleContainer.appendChild(item);
    side === "left" ? leftApples-- : rightApples--;
  } else if (type === "basket") {
    basketContainer.appendChild(item);
    side === "left" ? leftBaskets-- : rightBaskets--;
  }
}

// Verifica resultado da subtração
function checkResult() {
  const expected = targetDifference;
  const leftTotal = leftApples + leftBaskets * BASKET_VALUE;
  const rightTotal = rightApples + rightBaskets * BASKET_VALUE;
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
    alert(`Ops! ${leftTotal} - ${rightTotal} = ${actual} maçãs, mas o desafio era ${expected} maçãs.`);
    wrongSound.play();
  }

  generateTarget();
}

// Atualiza os contadores
function updateDisplay() {
  const leftTotal = leftApples + leftBaskets * BASKET_VALUE;
  const rightTotal = rightApples + rightBaskets * BASKET_VALUE;

  document.getElementById("leftCount").textContent = `${leftTotal} (${leftApples} maçãs + ${leftBaskets} cestas)`;
  document.getElementById("rightCount").textContent = `${rightTotal} (${rightApples} maçãs + ${rightBaskets} cestas)`;
}

// Atualiza exibição quando itens são movidos
["dragend", "drop"].forEach(event => {
  document.addEventListener(event, updateDisplay);
});

// Inicia o jogo
generateTarget();
