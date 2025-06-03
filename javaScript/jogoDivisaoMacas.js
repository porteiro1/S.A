// Game state
let totalApples = 0;
let leftPerson = 0;
let rightPerson = 0;
let targetDivision = 0;

// DOM elements
const leftPersonPlate = document.getElementById("leftPersonPlate");
const rightPersonPlate = document.getElementById("rightPersonPlate");
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
  leftPerson = 0;
  rightPerson = 0;
  leftPersonPlate.innerHTML = "";
  rightPersonPlate.innerHTML = "";
  appleContainer.innerHTML = "";

  updateCounters();

  for (let i = 0; i < totalApples; i++) {
    const apple = document.createElement("div");
    apple.className = "apple";
    apple.textContent = "🍎";
    apple.style.fontSize = "30px";
    apple.style.lineHeight = "40px";
    apple.style.textAlign = "center";
    apple.draggable = true;

    apple.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
    });

    apple.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });

    appleContainer.appendChild(apple);
  }
}

// Atualiza os contadores na tela
function updateCounters() {
  leftCountDisplay.textContent = leftPerson;
  rightCountDisplay.textContent = rightPerson;
}

// Configura eventos de drop para os pratos
[leftPersonPlate, rightPersonPlate].forEach((plate, index) => {
  plate.addEventListener("dragover", (e) => {
    e.preventDefault();
    plate.classList.add("drag-over");
  });

  plate.addEventListener("dragleave", () => {
    plate.classList.remove("drag-over");
  });

  plate.addEventListener("drop", () => {
    plate.classList.remove("drag-over");

    const draggedApple = document.querySelector(".dragging");
    if (draggedApple) {
      draggedApple.remove();

      const placedApple = document.createElement("div");
      placedApple.className = "apple";
      placedApple.textContent = "🍎";
      placedApple.style.fontSize = "30px";
      placedApple.style.lineHeight = "40px";
      placedApple.style.textAlign = "center";

      placedApple.addEventListener("click", () => {
        placedApple.remove();
        createReturnableApple();

        if (index === 0) {
          leftPerson--;
        } else {
          rightPerson--;
        }

        updateCounters();
      });

      plate.appendChild(placedApple);

      if (index === 0) {
        leftPerson++;
      } else {
        rightPerson++;
      }

      updateCounters();
    }
  });
});

// Cria uma maçã de volta ao container
function createReturnableApple() {
  const returnedApple = document.createElement("div");
  returnedApple.className = "apple";
  returnedApple.textContent = "🍎";
  returnedApple.style.fontSize = "30px";
  returnedApple.style.lineHeight = "40px";
  returnedApple.style.textAlign = "center";
  returnedApple.draggable = true;

  returnedApple.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
  });

  returnedApple.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    sound.play();
  });

  appleContainer.appendChild(returnedApple);
}

// Verifica se a divisão está correta
function checkResult() {
  const distributedTotal = leftPerson + rightPerson;
  const equallyDivided = leftPerson === rightPerson;
  const correctResult = leftPerson === targetDivision;

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
      message += `\n- A distribuição não está igual (${leftPerson} e ${rightPerson} maçãs).`;
    }

    if (equallyDivided && distributedTotal === totalApples && !correctResult) {
      message += `\n- Cada pessoa deve receber ${targetDivision} maçãs.`;
    }

    alert(message);
  }
  generateTarget();
}

// Inicia o jogo
generateTarget();
