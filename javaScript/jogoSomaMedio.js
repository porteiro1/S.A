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
const sound = new Audio("../images/macaSoundEffect.mp3");
const acerto = new Audio("../images/acerto.mp3");
const erro = new Audio("../images/erro.mp3");

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
  
  // Reset drop areas - corrigido
  dropAreas.forEach(area => {
    area.innerHTML = "";
  });

  // Recria as palavras e as coloca de volta no container original
  const wordContainer = document.getElementById("wordContainer");
  if (wordContainer) {
    wordContainer.innerHTML = "";
    
    // Recria as palavras
    const wordData = [
      { id: "word1", text: "Parcela" },
      { id: "word2", text: "Parcela" },
      { id: "word3", text: "Soma" }
    ];
    
    wordData.forEach(item => {
      const word = document.createElement("div");
      word.id = item.id;
      word.className = "word";
      word.textContent = item.text;
      word.draggable = true;
      
      word.addEventListener("dragstart", dragStart);
      word.addEventListener("dragend", dragEnd);
      
      wordContainer.appendChild(word);
    });
  }

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
    sound.play();

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
    sound.play();

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
  const actualSum = leftTotal + rightTotal;
  
  const dropArea3 = document.getElementById("dropArea3");

  // Check if words are in the correct order
  const thirdword = dropArea3.firstChild;

  if (
    thirdword &&
    thirdword.id === "word3"
  ) {
    alert("Ordem correta das parcelas! 🎉");
  } else {
    alert("Errou a ordem das parcelas!");
  }

  if (actualSum === expectedSum) {
    acerto.play();
    alert(`Parabéns! Você acertou! 🎉`);
  } else {
    erro.play();
    alert(
      `Ops! Você colocou um total de ${actualSum} maçãs, vamos tentar novamente!`
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