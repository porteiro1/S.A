
function verificarResposta() {
    const rightAnswer = 10;
    const userResponse = parseInt(document.getElementById('resposta-usuario').value);
    const feedbackElement = document.getElementById('feedback');
    
    feedbackElement.style.display = 'block';
    
    if (userResponse === rightAnswer) {
        feedbackElement.textContent = 'Parabéns! Sua resposta está correta!';
        feedbackElement.className = 'feedback correto';
    } else {
        feedbackElement.textContent = 'Ops! Tente novamente. Dica: Some 7 + 3.';
        feedbackElement.className = 'feedback incorreto';
    }
}
