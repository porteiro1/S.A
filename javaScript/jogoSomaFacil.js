// Valor alvo da soma
let targetSum = 0;

// Contadores de maçãs em cada prato
let leftApples = 0;
let rightApples = 0;

// Referências aos elementos do DOM
const leftPlate = document.getElementById("leftPlate");
const rightPlate = document.getElementById("rightPlate");
const appleContainer = document.getElementById("appleContainer");
const resultDisplay = document.getElementById("result");

// Efeitos sonoros
const sound = new Audio("../images/macaSoundEffect.mp3");
const correctSound = new Audio("../images/acerto.mp3");
const wrongSound = new Audio("../images/erro.mp3");

// Gera um novo valor de soma aleatório
function generateTarget() {
  targetSum = Math.floor(Math.random() * 10) + 1;
  resultDisplay.textContent = targetSum;
  resetGame();
}

// Reinicia o jogo e as variáveis
function resetGame() {
  leftPlate.innerHTML = "";
  rightPlate.innerHTML = "";
  leftApples = 0;
  rightApples = 0;

  // Gera as maçãs e adiciona ao container
  for (let i = 0; i < 10; i++) {
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

// Remove a maçã de um prato e devolve ao container
function removeApple(apple, plate, side) {
  plate.removeChild(apple);
  appleContainer.appendChild(apple);

  if (side === "left") {
    leftApples--;
  } else {
    rightApples--;
  }
}

// Verifica se a resposta está correta
function checkResult() {
  const actualSum = leftApples + rightApples;

  if (actualSum === targetSum) {
    alert("Parabéns! Você acertou! 🎉");
    correctSound.play();
  } else {
    alert(`Ops! Você colocou ${leftApples} + ${rightApples} = ${actualSum} maçãs, mas o desafio era ${targetSum} maçãs.`);
    wrongSound.play();
  }

  generateTarget();
}

// Inicia o primeiro desafio ao carregar o jogo
generateTarget();
