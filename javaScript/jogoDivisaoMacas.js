// Game state
let totalApples = 0;
let leftApples = 0;
let rightApples = 0;
let targetDivision = 0;

// DOM elements
const leftPlate = document.getElementById("leftPersonPlate");
const rightPlate = document.getElementById("rightPersonPlate");
const appleContainer = document.getElementById("appleContainer");
const resultDisplay = document.getElementById("result");
const totalApplesDisplay = document.getElementById("totalApples");
const leftCountDisplay = document.getElementById("leftCount");
const rightCountDisplay = document.getElementById("rightCount");

// Sound effects
const sound = new Audio("../images/macaSoundEffect.mp3");
const correctSound = new Audio("../images/acerto.mp3");
const wrongSound = new Audio("../images/erro.mp3");

// Gera novo desafio de divisão
function generateTarget() {
  const divisor = 2;
  const quotient = Math.floor(Math.random() * 15) + 1;
  totalApples = divisor * quotient;
  targetDivision = quotient;

  totalApplesDisplay.textContent = totalApples;
  resultDisplay.textContent = `${totalApples} ÷ 2 = ?`;

  resetGame();
}

// Reinicia o jogo
function resetGame() {
  leftApples = 0;
  rightApples = 0;
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  appleContainer.innerHTML = "";

  updateCounters();

  // Cria maçãs como elementos img (igual ao jogoSomaFacil)
  for (let i = 0; i < totalApples; i++) {
    const apple = document.createElement("img");
    apple.src = "/S.A/images/apple.png";
    apple.classList.add("apple");
    apple.draggable = true;

    apple.addEventListener("dragstart", onDragStart);
    apple.addEventListener("dragend", onDragEnd);

    appleContainer.appendChild(apple);
  }

  // Configura os eventos de arrastar nos pratos
  leftPlate.addEventListener("dragover", allowDrop);
  leftPlate.addEventListener("drop", dropToLeftPlate);
  rightPlate.addEventListener("dragover", allowDrop);
  rightPlate.addEventListener("drop", dropToRightPlate);
}

// Atualiza os contadores na tela
function updateCounters() {
  leftCountDisplay.textContent = leftApples;
  rightCountDisplay.textContent = rightApples;
}

// Evento ao começar a arrastar
function onDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);
}

// Evento ao soltar item
function onDragEnd(e) {
  e.target.classList.remove("dragging");
}

// Permite soltar itens nos pratos
function allowDrop(e) {
  e.preventDefault();
}

// Solta a maçã no prato esquerdo
function dropToLeftPlate(e) {
  e.preventDefault();
  const apple = document.querySelector(".dragging");

  if (apple) {
    apple.remove();
    sound.play();

    leftPlate.appendChild(apple);
    leftApples++;

    apple.addEventListener("click", () => removeApple(apple, leftPlate, "left"));
    updateCounters();
  }
}

// Solta a maçã no prato direito
function dropToRightPlate(e) {
  e.preventDefault();
  const apple = document.querySelector(".dragging");

  if (apple) {
    apple.remove();
    sound.play();

    rightPlate.appendChild(apple);
    rightApples++;

    apple.addEventListener("click", () => removeApple(apple, rightPlate, "right"));
    updateCounters();
  }
}

// Remove a maçã de um prato e devolve ao container
function removeApple(apple, plate, side) {
  plate.removeChild(apple);
  appleContainer.appendChild(apple);

  if (side === "left") {
    leftApples--;
  } else {
    rightApples--;
  }

  updateCounters();
}

// Verifica se a divisão está correta
function checkResult() {
  const distributedTotal = leftApples + rightApples;
  const equallyDivided = leftApples === rightApples;
  const correctResult = leftApples === targetDivision;

  if (distributedTotal === totalApples && equallyDivided && correctResult) {
    alert("Parabéns! Você dividiu as maçãs corretamente! 🎉");
    correctSound.play();
    setTimeout(generateTarget, 1000);
  } else {
    wrongSound.play();
    let message = "Ops! Algo não está certo:";

    if (distributedTotal !== totalApples) {
      message += `\n- Você distribuiu ${distributedTotal} de ${totalApples} maçãs.`;
    }

    if (!equallyDivided) {
      message += `\n- A distribuição não está igual (${leftApples} e ${rightApples} maçãs).`;
    }

    if (equallyDivided && distributedTotal === totalApples && !correctResult) {
      message += `\n- Cada pessoa deve receber ${targetDivision} maçãs.`;
    }

    alert(message);
  }
}

// Inicia o jogo
generateTarget();