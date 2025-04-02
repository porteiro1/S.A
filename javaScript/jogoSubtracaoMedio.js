let targetSum = 0;
let leftApples = 0;
let rightApples = 0;
let leftBaskets = 0;
let rightBaskets = 0;
const BASKET_VALUE = 5; // Cada cesta vale 5 maçãs

const leftPlate = document.getElementById("leftPlate");
const rightPlate = document.getElementById("rightPlate");
const appleContainer = document.getElementById("appleContainer");
const basketContainer = document.getElementById("basketContainer"); // Novo container para cestas
const resultDisplay = document.getElementById("result");
const words = document.querySelectorAll(".word");
const dropAreas = document.querySelectorAll(".drop-area");

function generateTarget() {
  targetSum = Math.floor(Math.random() * 30); // Aumentei o intervalo para incluir somas maiores
  resultDisplay.textContent = targetSum;
  resetGame();
}

function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = 0;
  rightApples = 0;
  leftBaskets = 0;
  rightBaskets = 0;
  appleContainer.innerHTML = "";
  basketContainer.innerHTML = "";

  // Gera 20 maçãs
  for (let i = 0; i < 10; i++) {
    const apple = document.createElement("img");
    apple.src = "/images/apple.png";
    apple.classList.add("apple");
    apple.draggable = true;

    apple.addEventListener("dragstart", dragStart);
    apple.addEventListener("dragend", dragEnd);

    appleContainer.appendChild(apple);
  }

  // Gera 6 cestas
  for (let i = 0; i < 10; i++) {
    const basket = document.createElement("img");
    basket.src = "/images/basket.png"; // Imagem da cesta
    basket.classList.add("basket");
    basket.draggable = true;
    basket.dataset.value = BASKET_VALUE; // Atributo para armazenar o valor da cesta

    basket.addEventListener("dragstart", dragStart);
    basket.addEventListener("dragend", dragEnd);

    basketContainer.appendChild(basket);
  }

  // Configura os pratos para receberem maçãs e cestas
  leftPlate.addEventListener("dragover", dragOver);
  leftPlate.addEventListener("drop", dropLeft);

  rightPlate.addEventListener("dragover", dragOver);
  rightPlate.addEventListener("drop", dropRight);

  words.forEach((word) => {
    word.addEventListener("dragstart", dragStart);
    word.addEventListener("dragend", dragEnd);
  });

  // Drop zone events
  dropAreas.forEach((area) => {
    area.addEventListener("dragover", dragOver);
    area.addEventListener("dragleave", dragLeave);
    area.addEventListener("drop", drop);
  });
}

function dragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);
  // Adiciona informação se é uma maçã ou uma cesta
  e.dataTransfer.setData("itemType", e.target.classList.contains("apple") ? "apple" : "basket");
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

function drop(e) {
  e.preventDefault();
  const wordId = e.dataTransfer.getData("text");
  const word = document.getElementById(wordId);

  // Clear previous content of drop area
  e.target.innerHTML = "";

  // Add word to drop area
  e.target.appendChild(word);
  e.target.classList.remove("drag-over");
}

function dropLeft(e) {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  const itemType = e.dataTransfer.getData("itemType");

  if (draggingItem) {
    // Remove o item do container original
    draggingItem.remove();

    // Adiciona o item no prato esquerdo
    leftPlate.appendChild(draggingItem);

    if (itemType === "apple") {
      leftApples++;
      // Reconfigura os eventos para a maçã no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, leftPlate, "left", "apple")
      );
    } else if (itemType === "basket" || draggingItem.classList.contains("basket")) {
      leftBaskets++;
      // Reconfigura os eventos para a cesta no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, leftPlate, "left", "basket")
      );
    }
  }
  e.target.classList.remove("drag-over");
}

function dropRight(e) {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  const itemType = e.dataTransfer.getData("itemType");

  if (draggingItem) {
    // Remove o item do container original
    draggingItem.remove();

    // Adiciona o item no prato direito
    rightPlate.appendChild(draggingItem);

    if (itemType === "apple") {
      rightApples++;
      // Reconfigura os eventos para a maçã no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, rightPlate, "right", "apple")
      );
    } else if (itemType === "basket" || draggingItem.classList.contains("basket")) {
      rightBaskets++;
      // Reconfigura os eventos para a cesta no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, rightPlate, "right", "basket")
      );
    }
  }
  e.target.classList.remove("drag-over");
}

function removeItemFromPlate(item, plate, plateType, itemType) {
  // Remove o item do prato
  plate.removeChild(item);

  // Adiciona o item de volta ao container apropriado
  if (itemType === "apple") {
    appleContainer.appendChild(item);
    // Decrementa o contador do prato correto
    if (plateType === "left") {
      leftApples--;
    } else {
      rightApples--;
    }
  } else if (itemType === "basket") {
    basketContainer.appendChild(item);
    // Decrementa o contador do prato correto
    if (plateType === "left") {
      leftBaskets--;
    } else {
      rightBaskets--;
    }
  }
}

function checkResult() {
  const expectedSum = targetSum;
  
  // Calcula a soma total considerando que cada cesta vale BASKET_VALUE maçãs
  const leftTotal = leftApples + (leftBaskets * BASKET_VALUE);
  const rightTotal = rightApples + (rightBaskets * BASKET_VALUE);
  const actualSum = leftTotal - rightTotal;
  
  const dropArea1 = document.getElementById("dropArea1");
  const dropArea2 = document.getElementById("dropArea2");

  // Check if words are in the correct order (Hello first, World second)
  const firstWord = dropArea1.firstChild;
  const secondWord = dropArea2.firstChild;

  if (
    firstWord &&
    secondWord &&
    firstWord.id === "word1" &&
    secondWord.id === "word2"
  ) {
    alert("Ordem correta 🎉");
  } else {
    alert("Errou a ordem das palavras");
  }
  
  if (actualSum === expectedSum) {
    alert(`Parabéns! Você acertou! 🎉\nVocê colocou ${leftApples} maçãs + ${leftBaskets} cestas no prato esquerdo e ${rightApples} maçãs + ${rightBaskets} cestas no prato direito, totalizando ${actualSum} maçãs.`);
  } else {
    alert(
      `Ops! Você colocou um total de ${actualSum} maçãs (${leftApples} maçãs + ${leftBaskets * BASKET_VALUE} de cestas no prato esquerdo e ${rightApples} maçãs + ${rightBaskets * BASKET_VALUE} de cestas no prato direito), mas o desafio era obter ${expectedSum} maçãs.`
    );
  }

  generateTarget();
}

function updateDisplay() {
  // Exibe a contagem atual de maçãs e cestas em cada prato
  const leftTotal = leftApples + (leftBaskets * BASKET_VALUE);
  const rightTotal = rightApples + (rightBaskets * BASKET_VALUE);
  document.getElementById("leftCount").textContent = `${leftTotal} (${leftApples} maçãs + ${leftBaskets} cestas)`;
  document.getElementById("rightCount").textContent = `${rightTotal} (${rightApples} maçãs + ${rightBaskets} cestas)`;
}

// Inicia o jogo com um primeiro desafio
generateTarget();

// Adiciona um evento para atualizar a contagem quando itens são movidos
['dragend', 'drop'].forEach(eventName => {
  document.addEventListener(eventName, updateDisplay);
});