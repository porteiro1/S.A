let targetSum = 0;
        let leftApples = 0;
        let rightApples = 0;
        const leftPlate = document.getElementById('leftPlate');
        const rightPlate = document.getElementById('rightPlate');
        const appleContainer = document.getElementById('appleContainer');
        const resultDisplay = document.getElementById('result');
        const sound = new Audio("../images/macaSoundEffect.mp3");

function generateTarget() {
  targetSum = Math.floor(Math.random() * 10) + 1;
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
  for (let i = 0; i < 25; i++) {
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

        function dropLeft(e) {
            e.preventDefault();
            const appleImg = document.querySelector('.dragging');
            
            if (appleImg) {
                // Remove a maçã do container original
                appleImg.remove();
                sound.play();
                
                // Adiciona a maçã no prato esquerdo
                leftPlate.appendChild(appleImg);
                leftApples++;
                
                // Reconfigura os eventos para a maçã no prato
                appleImg.addEventListener('click', () => removeAppleFromPlate(appleImg, leftPlate, 'left'));
            }
        }
      }
        function dropRight(e) {
            e.preventDefault();
            const appleImg = document.querySelector('.dragging');
            
            if (appleImg) {
                // Remove a maçã do container original
                appleImg.remove();
                sound.play();
                
                // Adiciona a maçã no prato direito
                rightPlate.appendChild(appleImg);
                rightApples++;
                
                // Reconfigura os eventos para a maçã no prato
                appleImg.addEventListener('click', () => removeAppleFromPlate(appleImg, rightPlate, 'right'));
            }
        }

function dragEnd(e) {
  e.target.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
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
  const actualSum = leftApples - rightApples;

  if (actualSum === expectedSum) {
    alert(`Parabéns! Você acertou! 🎉`);
  } else if (expectedSum * -1 === actualSum) {
    alert(`Você acertou, porém o ${actualSum} está negativo!!!`);
  } else if (actualSum != expectedSum) {
    alert(
      `Ops! Você colocou um total de ${actualSum} maçãs, vamos tentar novamente!`
    );
  }
}

// Inicia o jogo com um primeiro desafio
generateTarget();
