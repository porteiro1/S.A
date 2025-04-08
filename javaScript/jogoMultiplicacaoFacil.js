// Código adaptado para jogo de multiplicação
// Variáveis globais minimalistas
let score = 0;
let lives = 3;
let currentLevel = 1;
let isRunning = false;
let currentAnswer = 0;

// Cache de elementos DOM - acessados apenas uma vez
const elemCache = {
  spaceship: document.querySelector(".spaceship"),
  meteor: document.querySelector(".meteor"),
  question: document.querySelector(".question-container"),
  explosion: document.querySelector(".meteor-explosion"),
  scoreDisplay: document.getElementById("scoreValue"),
  gameOver: document.getElementById("gameOverScreen"),
  finalScore: document.getElementById("finalScore"),
  restartBtn: document.getElementById("restartButton"),
  levelDisplay: document.getElementById("levelDisplay"),
  factor1: document.getElementById("factor1"),
  factor2: document.getElementById("factor2"),
  options: Array.from(document.querySelectorAll(".option"))
};

// Gestor de animações - para evitar memória residual
class AnimationManager {
  constructor() {
    this.timers = [];
    this.running = false;
    this.meteorPosition = { x: -150, y: 150 };
  }

  // Limpa todas as animações
  reset() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
    this.running = false;
  }

  // Adiciona um novo timer e retorna seu ID
  addTimer(callback, delay) {
    const id = setTimeout(() => {
      // Remove o timer da lista quando executado
      this.timers = this.timers.filter(t => t !== id);
      if (this.running) callback();
    }, delay);
    this.timers.push(id);
    return id;
  }

  // Inicia a sequência de animação do meteoro
  startMeteorSequence() {
    if (!this.running) return;
    
    // Reset visual
    elemCache.meteor.style.transition = "none";
    elemCache.meteor.style.right = "-150px";
    elemCache.meteor.style.transform = "scale(1)";
    elemCache.meteor.style.display = "block";
    elemCache.question.style.display = "none";
    
    // Forçar reflow para aplicar mudanças visuais imediatamente
    void elemCache.meteor.offsetWidth;
    
    // Primeira fase - animação do meteoro
    elemCache.meteor.style.transition = "right 3s linear";
    elemCache.meteor.style.right = "100px";
    
    // Segunda fase - zoom e questão
    this.addTimer(() => {
      if (!this.running) return;
      
      elemCache.meteor.style.transition = "transform 0.3s ease";
      elemCache.meteor.style.transform = "scale(1.3)";
      
      this.addTimer(() => {
        if (!this.running) return;
        // Gera uma nova questão e exibe
        generateQuestion();
        elemCache.question.style.display = "flex";
      }, 400);
    }, 1000);
  }
}

// Engine do jogo - contém toda a lógica para facilitar limpeza de memória
class GameEngine {
  constructor() {
    this.animator = new AnimationManager();
    this.setupEventListeners();
    this.explosionPieces = [];
    this.preCreateExplosion();
  }
  
  // Configura listeners de eventos uma única vez
  setupEventListeners() {
    elemCache.restartBtn.addEventListener("click", () => this.start());
    
    // Configurar options com delegação de eventos
    const optionsContainer = document.querySelector(".options");
    optionsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("option")) {
        const value = Number(e.target.textContent);
        this.checkAnswer(value);
      }
    });
  }
  
  // Pré-cria elementos de explosão para reutilização
  preCreateExplosion() {
    // Limpar explosões anteriores
    elemCache.explosion.innerHTML = "";
    this.explosionPieces = [];
    
    // Criar 10 elementos reutilizáveis
    for (let i = 0; i < 10; i++) {
      const piece = document.createElement("div");
      piece.className = "meteor-piece";
      piece.style.display = "none";
      elemCache.explosion.appendChild(piece);
      this.explosionPieces.push(piece);
    }
  }
  
  // Inicia ou reinicia o jogo
  start() {
    // Limpe todos os timers e animações
    this.animator.reset();
    this.animator.running = true;
    
    // Reset do estado do jogo
    score = 0;
    lives = 3;
    currentLevel = 1;
    isRunning = true;
    
    // Reset visual
    elemCache.scoreDisplay.textContent = "0";
    elemCache.meteor.style.display = "none";
    elemCache.question.style.display = "none";
    elemCache.explosion.style.display = "none";
    elemCache.gameOver.style.display = "none";
    elemCache.levelDisplay.textContent = `Nível ${currentLevel}`;
    
    // Limpa explosões anteriores
    this.explosionPieces.forEach(piece => {
      piece.style.display = "none";
    });
    
    // Inicia a primeira animação após um curto delay
    setTimeout(() => {
      if (isRunning) this.animator.startMeteorSequence();
    }, 500);
  }
  
  // Verifica a resposta do usuário
  checkAnswer(answer) {
    if (!isRunning) return;
    
    elemCache.question.style.display = "none";
    
    if (answer === currentAnswer) {
      // Resposta correta
      score += 10;
      elemCache.scoreDisplay.textContent = score;
      
      // Atualiza nível a cada 50 pontos
      const newLevel = Math.floor(score / 50) + 1;
      if (newLevel > currentLevel) {
        currentLevel = newLevel;
        elemCache.levelDisplay.textContent = `Nível ${currentLevel}`;
      }
      
      // Mostra explosão
      this.showExplosion();
      
      // Continua o jogo após um delay
      setTimeout(() => {
        if (!isRunning) return;
        
        elemCache.explosion.style.display = "none";
        this.explosionPieces.forEach(piece => {
          piece.style.display = "none";
          piece.style.opacity = "1";
          piece.style.transform = "none";
        });
        
        // Próxima sequência
        this.animator.startMeteorSequence();
      }, 1500);
    } else {
      // Resposta incorreta
      lives--;
      
      if (lives <= 0) {
        this.endGame();
      } else {
        // Continua com nova animação
        this.animator.startMeteorSequence();
      }
    }
  }
  
  // Mostra animação de explosão
  showExplosion() {
    elemCache.meteor.style.display = "none";
    elemCache.explosion.style.display = "block";
    
    // Determina quantas peças usar (baseado na resposta)
    const piecesToUse = Math.min(currentAnswer, this.explosionPieces.length);
    
    // Reinicia todas as peças
    this.explosionPieces.forEach(piece => {
      piece.style.display = "none";
      piece.style.opacity = "1";
      piece.style.transform = "scale(1)";
      piece.style.transition = "none";
    });
    
    // Configura e anima as peças
    for (let i = 0; i < piecesToUse; i++) {
      const piece = this.explosionPieces[i];
      piece.style.display = "block";
      
      // Posição baseada no ângulo
      const angle = (i / piecesToUse) * Math.PI * 2;
      const distance = 30 + Math.random() * 40;
      piece.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
      piece.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
      
      // Força reflow para aplicar posição antes de iniciar animação
      void piece.offsetWidth;
      
      // Aplica transição suave
      piece.style.transition = "transform 1.5s ease-out, opacity 1.5s ease-out";
      
      // Atrasa cada peça ligeiramente
      setTimeout(() => {
        piece.style.transform = `scale(${0.3 + Math.random() * 0.5}) translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px)`;
        piece.style.opacity = "0";
      }, i * 50);
    }
  }
  
  // Finaliza o jogo
  endGame() {
    isRunning = false;
    this.animator.running = false;
    this.animator.reset();
    
    elemCache.finalScore.textContent = score;
    elemCache.gameOver.style.display = "flex";
  }
}

// Gera uma nova pergunta de multiplicação
function generateQuestion() {
  // Ajusta dificuldade com base no nível
  const maxFactor = Math.min(currentLevel + 5, 12);
  
  // Gera dois fatores com base no nível atual
  const factor1 = Math.floor(Math.random() * maxFactor) + 1;
  const factor2 = Math.floor(Math.random() * maxFactor) + 1;
  
  // Define a resposta correta
  currentAnswer = factor1 * factor2;
  
  // Atualiza o texto da pergunta
  elemCache.factor1.textContent = factor1;
  elemCache.factor2.textContent = factor2;
  
  // Gera as opções de resposta
  generateOptions(currentAnswer);
}

// Gera as opções de resposta
function generateOptions(correctAnswer) {
  const options = elemCache.options;
  
  // Cria um conjunto de possíveis respostas incluindo a correta
  const possibleAnswers = new Set([correctAnswer]);
  
  // Adiciona opções incorretas
  while (possibleAnswers.size < 4) {
    // Estratégia para gerar respostas plausíveis
    let newAnswer;
    const randomChoice = Math.random();
    
    if (randomChoice < 0.5) {
      // Pequena variação da resposta correta
      const offset = Math.floor(Math.random() * 5) - 2; // -2 a +2
      newAnswer = correctAnswer + offset;
      if (newAnswer <= 0) newAnswer = correctAnswer + Math.abs(offset) + 1;
    } else {
      // Erros comuns de multiplicação
      const factor1Value = Number(elemCache.factor1.textContent);
      const factor2Value = Number(elemCache.factor2.textContent);
      
      if (randomChoice < 0.7) {
        // Erro de adição em vez de multiplicação
        newAnswer = factor1Value + factor2Value;
      } else if (randomChoice < 0.8) {
        // Erro de multiplicação por ±1
        newAnswer = factor1Value * (factor2Value + (Math.random() < 0.5 ? 1 : -1));
      } else {
        // Erro de multiplicação por ±1
        newAnswer = (factor1Value + (Math.random() < 0.5 ? 1 : -1)) * factor2Value;
      }
    }
    
    // Certifica-se de que o número é positivo e não é igual à resposta correta
    if (newAnswer > 0 && newAnswer !== correctAnswer) {
      possibleAnswers.add(newAnswer);
    }
  }
  
  // Converte para array e embaralha
  const shuffledAnswers = Array.from(possibleAnswers);
  for (let i = shuffledAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
  }
  
  // Atribui às opções (no máximo 4)
  const maxOptions = Math.min(options.length, shuffledAnswers.length);
  for (let i = 0; i < maxOptions; i++) {
    options[i].textContent = shuffledAnswers[i];
  }
}

// Reduz a complexidade de animações SVG que podem causar problemas de performance
function optimizeSVG() {
  const spaceship = document.querySelector(".spaceship svg");
  if (spaceship) {
    // Remove gradientes complexos e efeitos de animação que podem consumir recursos
    const glowElements = spaceship.querySelectorAll(".spaceship-glow");
    glowElements.forEach(el => el.remove());
    
    // Simplifica os thruster/propulsores
    const thrusters = spaceship.querySelectorAll(".thruster-main, .thruster-secondary");
    thrusters.forEach(el => {
      el.style.animation = "none";
    });
  }
}

// Detecta problemas de performance
function setupPerformanceMonitoring() {
  let lastTime = performance.now();
  let frames = 0;
  let lowFPSCount = 0;
  
  function checkPerformance() {
    frames++;
    const now = performance.now();
    const elapsed = now - lastTime;
    
    // A cada segundo, verifica a taxa de quadros
    if (elapsed >= 1000) {
      const fps = Math.round((frames * 1000) / elapsed);
      console.log(`FPS: ${fps}`);
      
      // Se FPS for muito baixo, tenta otimizar ainda mais
      if (fps < 30) {
        lowFPSCount++;
        console.log(`Baixo FPS detectado (${lowFPSCount})`);
        
        // Após múltiplas detecções de baixo FPS, simplifica ainda mais o jogo
        if (lowFPSCount >= 3) {
          console.log("Aplicando otimizações de emergência");
          emergencyOptimizations();
          lowFPSCount = 0;
        }
      } else {
        lowFPSCount = Math.max(0, lowFPSCount - 1);
      }
      
      frames = 0;
      lastTime = now;
    }
    
    requestAnimationFrame(checkPerformance);
  }
  
  // Inicia o monitoramento de performance
  requestAnimationFrame(checkPerformance);
}

// Otimizações adicionais para casos extremos
function emergencyOptimizations() {
  // Remove completamente efeitos visuais
  document.querySelectorAll(".meteor-piece").forEach(el => {
    el.style.transition = "none";
  });
  
  // Simplifica ainda mais o SVG
  const stars = document.querySelector(".stars");
  if (stars) stars.style.display = "none";
}

// Inicializa o jogo
document.addEventListener("DOMContentLoaded", function() {
  // Aplica otimizações no SVG
  optimizeSVG();
  
  // Configura monitoramento de performance
  setupPerformanceMonitoring();
  
  // Cria e inicia o engine do jogo
  const game = new GameEngine();
  game.start();
});