// Game state variables
let totalApples = 0;
let leftPerson = 0;
let rightPerson = 0;
let targetDivision = 0;

// DOM Elements
const leftPersonPlate = document.getElementById("leftPersonPlate");
const rightPersonPlate = document.getElementById("rightPersonPlate");
const appleContainer = document.getElementById("appleContainer");
const resultDisplay = document.getElementById("result");
const totalApplesDisplay = document.getElementById("totalApples");
const leftCountDisplay = document.getElementById("leftCount");
const rightCountDisplay = document.getElementById("rightCount");
const sound = new Audio("../images/macaSoundEffect.mp3");
const acerto = new Audio("../images/acerto.mp3");
const erro = new Audio("../images/erro.mp3");

// Generate a new division challenge
function generateTarget() {
  // Create a division problem where the result is a whole number
  // We'll have a number of apples (between 2 and 10) to be divided between 2 people
  const divisor = 2; // We always divide by 2 (two people)
  const quotient = Math.floor(Math.random() * 5) + 1; // Random number from 1 to 5
  totalApples = quotient * divisor; // This ensures the division results in a whole number

  // Set the target division
  targetDivision = quotient;

  // Display the total apples to be divided
  totalApplesDisplay.textContent = totalApples;

  // Display the division operation
  resultDisplay.textContent = `${totalApples} ÷ 2 = ?`;

  // Reset the game
  resetGame();
}

// Reset the game state
function resetGame() {
  leftPersonPlate.innerHTML = "";
  rightPersonPlate.innerHTML = "";
  leftPerson = 0;
  rightPerson = 0;

  // Update counters
  updateCounters();

  // Clear the apple container
  appleContainer.innerHTML = "";

  // Generate apples based on the total
  for (let i = 0; i < totalApples; i++) {
    const apple = document.createElement("div");
    apple.className = "apple";
    apple.style.backgroundImage = "url('/api/placeholder/40/40')";
    apple.textContent = "🍎";
    apple.style.fontSize = "30px";
    apple.style.textAlign = "center";
    apple.style.lineHeight = "40px";
    apple.draggable = true;

    apple.addEventListener("dragstart", function (e) {
      e.target.classList.add("dragging");
    });

    apple.addEventListener("dragend", function (e) {
      e.target.classList.remove("dragging");
    });

    appleContainer.appendChild(apple);
  }
}

// Update the counter displays
function updateCounters() {
  leftCountDisplay.textContent = leftPerson;
  rightCountDisplay.textContent = rightPerson;
}

// Setup drag and drop for the plates
leftPersonPlate.addEventListener("dragover", function (e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
});

leftPersonPlate.addEventListener("dragleave", function (e) {
  e.target.classList.remove("drag-over");
});

leftPersonPlate.addEventListener("drop", function (e) {
  e.preventDefault();
  e.target.classList.remove("drag-over");

  const apple = document.querySelector(".dragging");
  if (apple) {
    apple.remove();

    // Create a new apple in the left plate
    const newApple = document.createElement("div");
    newApple.className = "apple";
    newApple.style.backgroundImage = "url('/api/placeholder/40/40')";
    newApple.textContent = "🍎";
    newApple.style.fontSize = "30px";
    newApple.style.textAlign = "center";
    newApple.style.lineHeight = "40px";

    // Make it clickable to return to the apple container
    newApple.addEventListener("click", function () {
      this.remove();

      // Create a new apple in the container
      const returnedApple = document.createElement("div");
      returnedApple.className = "apple";
      returnedApple.style.backgroundImage = "url('/api/placeholder/40/40')";
      returnedApple.textContent = "🍎";
      returnedApple.style.fontSize = "30px";
      returnedApple.style.textAlign = "center";
      returnedApple.style.lineHeight = "40px";
      returnedApple.draggable = true;

      returnedApple.addEventListener("dragstart", function (e) {
        e.target.classList.add("dragging");
      });

      returnedApple.addEventListener("dragend", function (e) {
        e.target.classList.remove("dragging");
        sound.play()
        console.log("fez som");
      });

      appleContainer.appendChild(returnedApple);

      // Update counter
      leftPerson--;
      updateCounters();
    });

    leftPersonPlate.appendChild(newApple);
    leftPerson++;
    updateCounters();
  }
});

rightPersonPlate.addEventListener("dragover", function (e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
});

rightPersonPlate.addEventListener("dragleave", function (e) {
  e.target.classList.remove("drag-over");
});

rightPersonPlate.addEventListener("drop", function (e) {
  e.preventDefault();
  e.target.classList.remove("drag-over");

  const apple = document.querySelector(".dragging");
  if (apple) {
    apple.remove();

    // Create a new apple in the right plate
    const newApple = document.createElement("div");
    newApple.className = "apple";
    newApple.style.backgroundImage = "url('/api/placeholder/40/40')";
    newApple.textContent = "🍎";
    newApple.style.fontSize = "30px";
    newApple.style.textAlign = "center";
    newApple.style.lineHeight = "40px";

    // Make it clickable to return to the apple container
    newApple.addEventListener("click", function () {
      this.remove();

      // Create a new apple in the container
      const returnedApple = document.createElement("div");
      returnedApple.className = "apple";
      returnedApple.style.backgroundImage = "url('/api/placeholder/40/40')";
      returnedApple.textContent = "🍎";
      returnedApple.style.fontSize = "30px";
      returnedApple.style.textAlign = "center";
      returnedApple.style.lineHeight = "40px";
      returnedApple.draggable = true;

      returnedApple.addEventListener("dragstart", function (e) {
        e.target.classList.add("dragging");
      });

      returnedApple.addEventListener("dragend", function (e) {
        e.target.classList.remove("dragging");
        sound.play()
        console.log("fez som")
      });

      appleContainer.appendChild(returnedApple);

      // Update counter
      rightPerson--;
      updateCounters();
    });

    rightPersonPlate.appendChild(newApple);
    rightPerson++;
    updateCounters();
  }
});

// Check if the division is correct
function checkResult() {
  // For division to be correct:
  // 1. All apples must be distributed (none left in the container)
  // 2. Both people must have the same number of apples
  // 3. The number of apples per person must equal the target division result

  const allDistributed = (leftPerson + rightPerson) === totalApples;
  const equalDistribution = leftPerson === rightPerson;
  const correctQuotient = leftPerson === targetDivision;

  if (allDistributed && equalDistribution && correctQuotient) {
    // Play sound effect (simulated)
    console.log("🎵 Sound: Acerto");
    alert("Parabéns! Você dividiu as maçãs corretamente! 🎉");
    acerto.play();
    // Generate a new challenge after a short delay
    setTimeout(generateTarget, 1000);
  } else {
    // Play sound effect (simulated)
    console.log("🎵 Sound: Erro");
    let message = "Ops! Algo não está certo:";
    erro.play

    if (!allDistributed) {
      message += `\n- Você distribuiu ${leftPerson + rightPerson} de ${totalApples} maçãs.`;
    }

    if (!equalDistribution) {
      message += `\n- A distribuição não está igual (${leftPerson} e ${rightPerson} maçãs).`;
    }

    if (allDistributed && equalDistribution && !correctQuotient) {
      message += `\n- Cada pessoa deve receber ${targetDivision} maçãs.`;
    }

    alert(message);
  }
}

// Initialize the game with the first challenge
generateTarget();