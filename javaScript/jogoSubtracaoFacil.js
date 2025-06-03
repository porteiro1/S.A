// Target result of the subtraction
let targetDifference = 0;

// Apple counters for each plate
let leftApples = 0;
let rightApples = 0;

// DOM elements
const leftPlate = document.getElementById("leftPlate");
const rightPlate = document.getElementById("rightPlate");
const appleContainer = document.getElementById("appleContainer");
const resultDisplay = document.getElementById("result");

// Sound effects
const sound = new Audio("../images/macaSoundEffect.mp3");
const correctSound = new Audio("../images/acerto.mp3");
const wrongSound = new Audio("../images/erro.mp3");

// Gera novo desafio de subtração
function generateTarget() {
  targetDifference = Math.floor(Math.random() * 10) + 1;
  resultDisplay.textContent = targetDifference;
  resetGame();
}

// Reinicia o estado do jogo
function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = 0;
  rightApples = 0;
  // Cria maçãs
  for (let i = 0; i < 20; i++) {
    const apple = document.createElement("img");
    apple.src = "/S.A/images/greenApple.png";
    apple.classList.add("apple");
    apple.draggable = true;

    apple.addEventListener("dragstart", onDragStart);
    apple.addEventListener("dragend", onDragEnd);

    appleContainer.appendChild(apple);
  }

  // Configura os pratos como zonas de drop
  leftPlate.addEventListener("dragover", allowDrop);
  leftPlate.addEventListener("drop", dropToLeftPlate);

  rightPlate.addEventListener("dragover", allowDrop);
  rightPlate.addEventListener("drop", dropToRightPlate);
}

// Início do arraste
function onDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);
}

// Fim do arraste
function onDragEnd(e) {
  e.target.classList.remove("dragging");
}

// Permite o drop
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
  }
}

// Remove maçã do prato e devolve ao container
function removeApple(apple, plate, side) {
  plate.removeChild(apple);
  appleContainer.appendChild(apple);

  if (side === "left") {
    leftApples--;
  } else {
    rightApples--;
  }
}

// Verifica se o resultado da subtração está correto
function checkResult() {
  const expected = targetDifference;
  const actual = leftApples - rightApples;

  if (actual === expected) {
    alert("Parabéns! Você acertou! 🎉");
    correctSound.play();
  } else {
    alert(`Ops! Você colocou ${leftApples} - ${rightApples} = ${actual} maçãs, mas o desafio era ${expected} maçãs.`);
    wrongSound.play();
  }
}

// Inicia o jogo com o primeiro desafio
generateTarget();
