let score = 0;
let level = 1;
let lives = 3;
let currentAnswer = 0;
let isGameActive = true;

const spaceship = document.querySelector(".spaceship");
const meteor = document.querySelector(".meteor");
const questionContainer = document.querySelector(".question-container");
const meteorExplosion = document.querySelector(".meteor-explosion");
const scoreValue = document.getElementById("scoreValue");
const levelDisplay = document.getElementById("levelDisplay");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

// Inicializa o jogo
startGame();

function startGame() {
  // Reinicia variáveis
  score = 0;
  level = 1;
  lives = 3;
  isGameActive = true;

  // Atualiza a interface
  scoreValue.textContent = score;
  levelDisplay.textContent = `Nível ${level}`;
  gameOverScreen.style.display = "none";

  // Inicia animação
  animateMeteor();
}

function animateMeteor() {
  if (!isGameActive) return;

  // Posiciona o meteoro
  meteor.style.transition = "right 5s linear";
  meteor.style.right = "-150px";

  // Controle de tempo para mostrar a pergunta
  setTimeout(() => {
    if (!isGameActive) return;

    meteor.style.transition = "none";
    meteor.style.right = "100px";

    // Zoom no meteoro
    meteor.style.transition = "transform 0.5s ease";
    meteor.style.transform = "scale(1.5)";

    // Mostra a pergunta
    setTimeout(() => {
      if (!isGameActive) return;
      generateQuestion();
      questionContainer.style.display = "flex";
    }, 600);
  }, 4000);
}

function generateQuestion() {
  const difficulty = Math.min(level, 5);
  let divisor, dividend;

  // Gera valores baseados na dificuldade
  if (difficulty === 1) {
    divisor = Math.floor(Math.random() * 3) + 2; // 2 a 4
    dividend = divisor * (Math.floor(Math.random() * 5) + 1); // Resultado de 1 a 5
  } else if (difficulty === 2) {
    divisor = Math.floor(Math.random() * 4) + 2; // 2 a 5
    dividend = divisor * (Math.floor(Math.random() * 8) + 3); // Resultado de 3 a 10
  } else if (difficulty === 3) {
    divisor = Math.floor(Math.random() * 6) + 2; // 2 a 7
    dividend = divisor * (Math.floor(Math.random() * 10) + 5); // Resultado de 5 a 14
  } else if (difficulty === 4) {
    divisor = Math.floor(Math.random() * 8) + 3; // 3 a 10
    dividend = divisor * (Math.floor(Math.random() * 12) + 6); // Resultado de 6 a 17
  } else {
    divisor = Math.floor(Math.random() * 11) + 5; // 5 a 15
    dividend = divisor * (Math.floor(Math.random() * 14) + 8); // Resultado de 8 a 21
  }

  // Define o valor correto da divisão
  currentAnswer = dividend / divisor;

  // Atualiza os elementos na tela
  document.getElementById("dividend").textContent = dividend;
  document.getElementById("divisor").textContent = divisor;

  // Gera as opções
  generateOptions(currentAnswer);
}

function generateOptions(correctAnswer) {
  const options = Array.from(document.querySelectorAll(".option"));

  // Gera opções incorretas
  let wrongAnswers = [];
  for (let i = 0; i < 3; i++) {
    let wrongAnswer;
    do {
      // Gera um número próximo ao correto
      const offset = Math.floor(Math.random() * 5) - 2; // -2 a +2
      wrongAnswer = correctAnswer + offset;
      // Garante que é um número inteiro positivo diferente do correto
    } while (
      wrongAnswer <= 0 ||
      wrongAnswer === correctAnswer ||
      wrongAnswers.includes(wrongAnswer)
    );

    wrongAnswers.push(wrongAnswer);
  }

  // Adiciona a resposta correta
  wrongAnswers.push(correctAnswer);

  // Embaralha as opções
  wrongAnswers.sort(() => Math.random() - 0.5);

  // Atribui às opções
  options.forEach((option, index) => {
    option.textContent = wrongAnswers[index];
    option.onclick = () => checkAnswer(wrongAnswers[index]);
  });
}

function checkAnswer(answer) {
  questionContainer.style.display = "none";

  if (answer === currentAnswer) {
    // Resposta correta
    score += level * 10;
    scoreValue.textContent = score;

    // Explode o meteoro em pedaços
    explodeMeteor(currentAnswer);

    // Aguarda um pouco e continua o jogo
    setTimeout(() => {
      if (!isGameActive) return;

      meteor.style.transform = "scale(1)";
      meteorExplosion.style.display = "none";
      meteorExplosion.innerHTML = "";

      // Avança para o próximo nível a cada 3 meteoros
      if (score % 30 === 0) {
        level++;
        levelDisplay.textContent = `Nível ${level}`;
      }

      // Reinicia a animação
      animateMeteor();
    }, 2000);
  } else {
    // Resposta incorreta
    lives--;

    if (lives <= 0) {
      endGame();
    } else {
      // Reinicia a animação
      meteor.style.transform = "scale(1)";
      animateMeteor();
    }
  }
}

function explodeMeteor(parts) {
  meteorExplosion.style.display = "flex";

  // Cria partes do meteoro baseado no resultado da divisão
  for (let i = 0; i < parts; i++) {
    const piece = document.createElement("div");
    piece.className = "meteor-piece";

    // Posiciona aleatoriamente
    const angle = (i / parts) * 2 * Math.PI;
    const distance = 50 + Math.random() * 100;

    piece.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
    piece.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;

    meteorExplosion.appendChild(piece);

    // Anima cada peça
    setTimeout(() => {
      piece.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
      piece.style.opacity = "0";
    }, 100);
  }
}

function endGame() {
  isGameActive = false;
  finalScore.textContent = score;
  gameOverScreen.style.display = "flex";
}

// Adiciona controles da nave com as setas
document.addEventListener("keydown", (e) => {
  if (!isGameActive) return;

  const currentTop = parseInt(window.getComputedStyle(spaceship).top);

  if (e.key === "ArrowUp" && currentTop > 20) {
    spaceship.style.top = `${currentTop - 15}px`;
  } else if (e.key === "ArrowDown" && currentTop < 340) {
    spaceship.style.top = `${currentTop + 15}px`;
  }
});

// Reinicia o jogo
restartButton.addEventListener("click", startGame);
