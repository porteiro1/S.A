let targetSum = 0;
let leftApples = 0;
let rightApples = 0;
let leftBaskets = 0;
let rightBaskets = 0;
let leftBuckets = 0;
let rightBuckets = 0;
const BASKET_VALUE = 5; // Cada cesta vale 5 maçãs
const BUCKET_VALUE = 10; // Cada balde vale 10 maçãs

const leftPlate = document.getElementById("leftPlate");
const rightPlate = document.getElementById("rightPlate");
const appleContainer = document.getElementById("appleContainer");
const basketContainer = document.getElementById("basketContainer");
const bucketContainer = document.getElementById("bucketContainer"); // Novo container para baldes
const resultDisplay = document.getElementById("result");
const words = document.querySelectorAll(".word");
const dropAreas = document.querySelectorAll(".drop-area");
const sound = new Audio("../images/macaSoundEffect.mp3");
const acerto = new Audio("../images/acerto.mp3");
const erro = new Audio("../images/erro.mp3");

function generateTarget() {
  targetSum = Math.floor(Math.random() * 50) + 5; // Aumentei o intervalo para incluir somas maiores
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
  leftBuckets = 0;
  rightBuckets = 0;
  appleContainer.innerHTML = "Representa 1";
  basketContainer.innerHTML = "Representa 5";
  bucketContainer.innerHTML = "Representa 10";

  // Reset drop areas - corrigido
  dropAreas.forEach((area) => {
    area.innerHTML = "";
  });

  // Recria as palavras e as coloca de volta no container original
  const wordContainer = document.getElementById("wordContainer");
  if (wordContainer) {
    wordContainer.innerHTML = "";

    // Recria as palavras
    const wordData = [
      { id: "word1", text: "minuendo" },
      { id: "word2", text: "subtraendo" },
      { id: "word3", text: "diferença" },
    ];

    wordData.forEach((item) => {
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

  // Gera maçãs
  for (let i = 0; i < 10; i++) {
    const apple = document.createElement("img");
    apple.src = "/images/apple.png";
    apple.classList.add("apple");
    apple.draggable = true;

    apple.addEventListener("dragstart", dragStart);
    apple.addEventListener("dragend", dragEnd);

    appleContainer.appendChild(apple);
  }

  // Gera cestas
  for (let i = 0; i < 6; i++) {
    const basket = document.createElement("img");
    basket.src = "/images/basket.png";
    basket.classList.add("basket");
    basket.draggable = true;
    basket.dataset.value = BASKET_VALUE;

    basket.addEventListener("dragstart", dragStart);
    basket.addEventListener("dragend", dragEnd);

    basketContainer.appendChild(basket);
  }

  // Gera baldes
  for (let i = 0; i < 4; i++) {
    const bucket = document.createElement("img");
    bucket.src = "/images/bucket.png";
    bucket.classList.add("bucket");
    bucket.draggable = true;
    bucket.dataset.value = BUCKET_VALUE;

    bucket.addEventListener("dragstart", dragStart);
    bucket.addEventListener("dragend", dragEnd);

    bucketContainer.appendChild(bucket);
  }

  // Configura os pratos para receberem maçãs, cestas e baldes
  leftPlate.addEventListener("dragover", dragOver);
  leftPlate.addEventListener("drop", dropLeft);

  rightPlate.addEventListener("dragover", dragOver);
  rightPlate.addEventListener("drop", dropRight);

  // Drop zone events
  dropAreas.forEach((area) => {
    area.addEventListener("dragover", dragOver);
    area.addEventListener("dragleave", dragLeave);
    area.addEventListener("drop", drop);
  });

  // Atualiza a exibição inicial
  updateDisplay();
}

function dragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);

  // Determina o tipo do item
  let itemType = "word"; // Valor padrão
  if (e.target.classList.contains("apple")) {
    itemType = "apple";
  } else if (e.target.classList.contains("basket")) {
    itemType = "basket";
  } else if (e.target.classList.contains("bucket")) {
    itemType = "bucket";
  }

  e.dataTransfer.setData("itemType", itemType);
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
    } else if (itemType === "basket") {
      leftBaskets++;
      // Reconfigura os eventos para a cesta no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, leftPlate, "left", "basket")
      );
    } else if (itemType === "bucket") {
      leftBuckets++;
      // Reconfigura os eventos para o balde no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, leftPlate, "left", "bucket")
      );
    }

    // Atualiza a exibição após adicionar um item
    updateDisplay();
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
    } else if (itemType === "basket") {
      rightBaskets++;
      // Reconfigura os eventos para a cesta no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, rightPlate, "right", "basket")
      );
    } else if (itemType === "bucket") {
      rightBuckets++;
      // Reconfigura os eventos para o balde no prato
      draggingItem.addEventListener("click", () =>
        removeItemFromPlate(draggingItem, rightPlate, "right", "bucket")
      );
    }

    // Atualiza a exibição após adicionar um item
    updateDisplay();
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
  } else if (itemType === "bucket") {
    bucketContainer.appendChild(item);
    // Decrementa o contador do prato correto
    if (plateType === "left") {
      leftBuckets--;
    } else {
      rightBuckets--;
    }
  }

  // Atualiza a exibição após remover um item
  updateDisplay();
}

function checkResult() {
  const expectedSum = targetSum;

  // Calcula a soma total considerando os valores de cada item
  const leftTotal =
    leftApples + leftBaskets * BASKET_VALUE + leftBuckets * BUCKET_VALUE;
  const rightTotal =
    rightApples + rightBaskets * BASKET_VALUE + rightBuckets * BUCKET_VALUE;
  const actualSum = leftTotal - rightTotal;

  const dropArea1 = document.getElementById("dropArea1");
  const dropArea2 = document.getElementById("dropArea2");
  const dropArea3 = document.getElementById("dropArea3");

  // Check if words are in the correct order
  const firstWord = dropArea1.firstChild;
  const secondWord = dropArea2.firstChild;
  const thirdWord = dropArea3.firstChild;

  if (
    firstWord &&
    secondWord &&
    thirdWord &&
    firstWord.id === "word1" &&
    secondWord.id === "word2" &&
    thirdWord.id === "word3"
  ) {
    alert("Ordem correta das parcelas! 🎉");
  } else {
    alert("Errou a ordem das parcelas!");
  }

  if (actualSum === expectedSum) {
    acerto.play();
    alert(`Parabéns! Você acertou! 🎉`);
  } else if (expectedSum * -1 === actualSum) {
    alert(`Você acertou, porém o ${actualSum} está negativo!!!`);
  } else if (actualSum != expectedSum) {
    erro.play();
    alert(
      `Ops! Você colocou um total de ${actualSum} maçãs, vamos tentar novamente!`
    );
  }

  generateTarget();
}

function updateDisplay() {
  // Exibe a contagem atual de maçãs, cestas e baldes em cada prato
  const leftTotal =
    leftApples + leftBaskets * BASKET_VALUE + leftBuckets * BUCKET_VALUE;
  const rightTotal =
    rightApples + rightBaskets * BASKET_VALUE + rightBuckets * BUCKET_VALUE;

  // Formata texto para mostrar a contagem
  let leftText = `${leftTotal}`;
  let rightText = `${rightTotal}`;

  // Adiciona detalhes se houver itens
  if (leftApples > 0 || leftBaskets > 0 || leftBuckets > 0) {
    leftText += " (";
    let details = [];
    if (leftApples > 0) details.push(`${leftApples} maçãs`);
    if (leftBaskets > 0) details.push(`${leftBaskets} cestas`);
    if (leftBuckets > 0) details.push(`${leftBuckets} baldes`);
    leftText += details.join(" + ") + ")";
  }

  if (rightApples > 0 || rightBaskets > 0 || rightBuckets > 0) {
    rightText += " (";
    let details = [];
    if (rightApples > 0) details.push(`${rightApples} maçãs`);
    if (rightBaskets > 0) details.push(`${rightBaskets} cestas`);
    if (rightBuckets > 0) details.push(`${rightBuckets} baldes`);
    rightText += details.join(" + ") + ")";
  }

  document.getElementById("leftCount").textContent = leftText;
  document.getElementById("rightCount").textContent = rightText;
}

// Inicia o jogo com um primeiro desafio
generateTarget();
