let score = 0;
let lives = 3;
let currentAnswer = 0;
let isGameActive = true;
let fixedDifficulty = 1; // Dificuldade fixa
let meteorAnimationTimeout = null;
let questionTimeout = null;

const spaceship = document.querySelector(".spaceship");
const meteor = document.querySelector(".meteor");
const questionContainer = document.querySelector(".question-container");
const meteorExplosion = document.querySelector(".meteor-explosion");
const scoreValue = document.getElementById("scoreValue");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

// Inicializa o jogo
startGame();

function startGame() {
  // Limpa temporizadores pendentes
  clearTimeout(meteorAnimationTimeout);
  clearTimeout(questionTimeout);
  
  // Esconde elementos
  meteor.style.display = "none";
  questionContainer.style.display = "none";
  meteorExplosion.style.display = "none";
  
  // Reinicia variáveis
  score = 0;
  lives = 3;
  isGameActive = true;
  
  // Atualiza a interface
  scoreValue.textContent = score;
  gameOverScreen.style.display = "none";
  
  // Pequeno delay antes de iniciar
  setTimeout(() => {
    // Inicia animação
    animateMeteor();
  }, 100);
}

function animateMeteor() {
  if (!isGameActive) return;
  
  // Limpa temporizadores anteriores
  clearTimeout(meteorAnimationTimeout);
  clearTimeout(questionTimeout);
  
  // Reseta o meteoro
  meteor.style.display = "block";
  meteor.style.transform = "scale(1)";
  meteor.style.transition = "right 4s linear";
  meteor.style.right = "-150px";
  
  // Controle de tempo para mostrar a pergunta
  meteorAnimationTimeout = setTimeout(() => {
    if (!isGameActive) return;
    
    meteor.style.transition = "none";
    meteor.style.right = "100px";
    
    // Zoom no meteoro
    meteor.style.transition = "transform 0.5s ease";
    meteor.style.transform = "scale(1.5)";
    
    // Mostra a pergunta
    questionTimeout = setTimeout(() => {
      if (!isGameActive) return;
      generateQuestion();
      questionContainer.style.display = "flex";
    }, 600);
  }, 1000);
}

function generateQuestion() {
  let divisor, dividend;

  // Gera valores baseados na dificuldade fixa
  divisor = Math.floor(Math.random() * 3) + 2; // 2 a 4
  dividend = divisor * (Math.floor(Math.random() * 5) + 1); // Resultado de 1 a 5

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
    score += 10;
    scoreValue.textContent = score;

    // Explode o meteoro em pedaços
    explodeMeteor(currentAnswer);

    // Aguarda um pouco e continua o jogo
    setTimeout(() => {
      if (!isGameActive) return;

      meteor.style.transform = "scale(1)";
      meteorExplosion.style.display = "none";
      meteorExplosion.innerHTML = "";

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
      meteor.style.display = "block"; // Garante que o meteoro está visível após resposta incorreta
      animateMeteor();
    }
  }
}

function explodeMeteor(parts) {
  meteorExplosion.style.display = "flex";
  meteor.style.display = "none";

  // Limpa explosões anteriores
  meteorExplosion.innerHTML = "";

  // Cria partes do meteoro baseado no resultado da divisão
  for (let i = 0; i < parts; i++) {
    const piece = document.createElement("div");
    piece.className = "meteor-piece";

    // Posiciona aleatoriamente
    const angle = (i / parts) * 2 * Math.PI;
    const distance = 50 + Math.random() * 50;

    piece.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
    piece.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;

    piece.style.transition = "opacity 2s ease-out, transform 2s ease-out";
    
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
  
  // Limpa temporizadores
  clearTimeout(meteorAnimationTimeout);
  clearTimeout(questionTimeout);
  
  finalScore.textContent = score;
  gameOverScreen.style.display = "flex";
}

// Reinicia o jogo
restartButton.addEventListener("click", startGame);