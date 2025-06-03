// Target sum value
let targetSum = 0;

// Apple and basket counters
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

// Gera novo desafio com valor de soma
function generateTarget() {
  targetSum = Math.floor(Math.random() * 30); // Permite somas maiores
  resultDisplay.textContent = targetSum;
  resetGame();
}

// Reinicia os pratos, maçãs, cestas e áreas de drop
function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = 0;
  rightApples = 0;
  leftBaskets = 0;
  rightBaskets = 0;

  dropAreas.forEach((area) => {
    area.innerHTML = "";
  });

  // Recria as palavras (texto fixo)
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

  // Gera 10 maçãs
  for (let i = 0; i < 10; i++) {
    const apple = document.createElement("img");
    apple.src = "/S.A/images/apple.png";
    apple.classList.add("apple");
    apple.draggable = true;

    apple.addEventListener("dragstart", onDragStart);
    apple.addEventListener("dragend", onDragEnd);

    appleContainer.appendChild(apple);
  }

  // Gera 10 cestas
  for (let i = 0; i < 10; i++) {
    const basket = document.createElement("img");
    basket.src = "/S.A/images/basket.png";
    basket.classList.add("basket");
    basket.draggable = true;
    basket.dataset.value = BASKET_VALUE;

    basket.addEventListener("dragstart", onDragStart);
    basket.addEventListener("dragend", onDragEnd);

    basketContainer.appendChild(basket);
  }

  // Eventos de drop nos pratos
  leftPlate.addEventListener("dragover", allowDrop);
  leftPlate.addEventListener("drop", dropToLeftPlate);

  rightPlate.addEventListener("dragover", allowDrop);
  rightPlate.addEventListener("drop", dropToRightPlate);

  // Eventos nas palavras e drop zones
  words.forEach((word) => {
    word.addEventListener("dragstart", onDragStart);
    word.addEventListener("dragend", onDragEnd);
  });

  dropAreas.forEach((area) => {
    area.addEventListener("dragover", allowDrop);
    area.addEventListener("dragleave", onDragLeave);
    area.addEventListener("drop", dropWord);
  });
}

// Início do arraste
function onDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.setData("itemType", e.target.classList.contains("apple") ? "apple" : "basket");
}

// Fim do arraste
function onDragEnd(e) {
  e.target.classList.remove("dragging");
}

// Permite soltar o item
function allowDrop(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

// Sai da área de drop
function onDragLeave(e) {
  e.target.classList.remove("drag-over");
}

// Solta a palavra em uma área de drop
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
  const itemType = e.dataTransfer.getData("itemType");

  if (item) {
    item.remove();
    sound.play();
    leftPlate.appendChild(item);

    if (itemType === "apple") {
      leftApples++;
      item.addEventListener("click", () => removeItem(item, leftPlate, "left", "apple"));
    } else if (itemType === "basket") {
      leftBaskets++;
      item.addEventListener("click", () => removeItem(item, leftPlate, "left", "basket"));
    }
  }

  e.target.classList.remove("drag-over");
}

// Solta item no prato direito
function dropToRightPlate(e) {
  e.preventDefault();
  const item = document.querySelector(".dragging");
  const itemType = e.dataTransfer.getData("itemType");

  if (item) {
    item.remove();
    sound.play();
    rightPlate.appendChild(item);

    if (itemType === "apple") {
      rightApples++;
      item.addEventListener("click", () => removeItem(item, rightPlate, "right", "apple"));
    } else if (itemType === "basket") {
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
    if (side === "left") leftApples--;
    else rightApples--;
  } else if (type === "basket") {
    basketContainer.appendChild(item);
    if (side === "left") leftBaskets--;
    else rightBaskets--;
  }
}

// Verifica se a soma e as palavras estão corretas
function checkResult() {
  const expected = targetSum;
  const leftTotal = leftApples + (leftBaskets * BASKET_VALUE);
  const rightTotal = rightApples + (rightBaskets * BASKET_VALUE);
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

// Inicia o jogo com um desafio
generateTarget();
