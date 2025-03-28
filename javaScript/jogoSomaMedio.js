let targetSum = 0;
let leftApples = 0;
let rightApples = 0;
const leftPlate = document.getElementById("leftPlate");
const rightPlate = document.getElementById("rightPlate");
const appleContainer = document.getElementById("appleContainer");
const resultDisplay = document.getElementById("result");
const words = document.querySelectorAll(".word");
const dropAreas = document.querySelectorAll(".drop-area");

function generateTarget() {
  targetSum = Math.floor(Math.random() * 30) + 1;
  resultDisplay.textContent = targetSum;
  resetGame();
}

function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = 0;
  rightApples = 0;
  appleContainer.innerHTML = "";

  // Gera 10 maçãs
  for (let i = 0; i < 30; i++) {
    const apple = document.createElement("img");
    apple.src = "/images/apple.png";
    apple.classList.add("apple");
    apple.draggable = true;

    apple.addEventListener("dragstart", dragStart);
    apple.addEventListener("dragend", dragEnd);

    appleContainer.appendChild(apple);
  }

  // Configura os pratos para receberem maçãs
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
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
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
  const appleImg = document.querySelector(".dragging");

  if (appleImg) {
    // Remove a maçã do container original
    appleImg.remove();

    // Adiciona a maçã no prato esquerdo
    leftPlate.appendChild(appleImg);
    leftApples++;

    // Reconfigura os eventos para a maçã no prato
    appleImg.addEventListener("click", () =>
      removeAppleFromPlate(appleImg, leftPlate, "left")
    );
  }
}

function dropRight(e) {
  e.preventDefault();
  const appleImg = document.querySelector(".dragging");

  if (appleImg) {
    // Remove a maçã do container original
    appleImg.remove();

    // Adiciona a maçã no prato direito
    rightPlate.appendChild(appleImg);
    rightApples++;

    // Reconfigura os eventos para a maçã no prato
    appleImg.addEventListener("click", () =>
      removeAppleFromPlate(appleImg, rightPlate, "right")
    );
  }
}

function removeAppleFromPlate(apple, plate, plateType) {
  // Remove a maçã do prato
  plate.removeChild(apple);

  // Adiciona a maçã de volta ao container
  appleContainer.appendChild(apple);

  // Decrementa o contador do prato correto
  if (plateType === "left") {
    leftApples--;
  } else {
    rightApples--;
  }
}

function checkResult() {
  const expectedSum = targetSum;
  const actualSum = leftApples + rightApples;
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
    alert("errou");
  }
  if (actualSum === expectedSum) {
    alert("Parabéns! Você acertou! 🎉");
  } else {
    alert(
      `Ops! Você colocou ${leftApples} + ${rightApples} = ${actualSum} maçãs, mas o desafio era ${expectedSum} maçãs.`
    );
  }

  targetSum = Math.floor(Math.random() * 30) + 1;
  resultDisplay.textContent = targetSum;
  resetGame();
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
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

// Inicia o jogo com um primeiro desafio
generateTarget();
