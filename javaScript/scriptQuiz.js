
// Dados das questões
const questoes = [
    {
        id: 1,
        categoria: "ADIÇÃO",
        tipo: "adicao",
        texto: "ANA TÊM 7 LARANJAS E COMPROU MAIS 3. QUANTAS LARANJAS ANA TÊM AGORA?",
        imagem: "laranja",
        resposta: 10
    },
    {
        id: 2,
        categoria: "ADIÇÃO",
        tipo: "adicao",
        texto: "JOÃO TEM 15 BALÕES E GANHOU MAIS 5 DE PRESENTE. QUANTOS BALÕES JOÃO TEM AGORA?",
        imagem: "balao",
        resposta: 20
    },
    {
        id: 3,
        categoria: "ADIÇÃO",
        tipo: "adicao",
        texto: "PAULO TEM 12 CARRINHOS DE BRINQUEDO E GANHOU MAIS 8 DE SEU TIO. QUANTOS CARRINHOS DE BRINQUEDO PAULO TEM AGORA?",
        imagem: "carro",
        resposta: 20
    },
    {
        id: 4,
        categoria: "ADIÇÃO",
        tipo: "adicao",
        texto: "MARI TEM 10 LIVROS E COMPROU MAIS 6 NA LIVRARIA. QUANTOS LIVROS MARI TEM AGORA?",
        imagem: "livro",
        resposta: 16
    },
    {
        id: 5,
        categoria: "SUBTRAÇÃO",
        tipo: "subtracao",
        texto: "CARLOS TEM 12 BOLINHAS E PERDEU 3. QUANTAS BOLINHAS CARLOS TEM AGORA?",
        imagem: "bolinha",
        resposta: 9
    },
    {
        id: 6,
        categoria: "SUBTRAÇÃO",
        tipo: "subtracao",
        texto: "JULIA TINHA 20 FLORES E DEU 7 PARA SUA MÃE. QUANTAS FLORES JULIA TEM AGORA?",
        imagem: "flor",
        resposta: 13
    },
    {
        id: 7,
        categoria: "MULTIPLICAÇÃO",
        tipo: "multiplicacao",
        texto: "CADA CAIXA TEM 5 CHOCOLATES. SE PEDRO TEM 3 CAIXAS, QUANTOS CHOCOLATES ELE TEM NO TOTAL?",
        imagem: "chocolate",
        resposta: 15
    },
    {
        id: 8,
        categoria: "MULTIPLICAÇÃO",
        tipo: "multiplicacao",
        texto: "EM UMA ESCOLA, CADA SALA TEM 4 JANELAS. SE HÁ 6 SALAS, QUANTAS JANELAS HÁ NO TOTAL?",
        imagem: "janela",
        resposta: 24
    },
    {
        id: 9,
        categoria: "DIVISÃO",
        tipo: "divisao",
        texto: "MARCOS TEM 18 BALAS E QUER DIVIDIR IGUALMENTE ENTRE SEUS 3 AMIGOS. QUANTAS BALAS CADA AMIGO VAI RECEBER?",
        imagem: "bala",
        resposta: 6
    },
    {
        id: 10,
        categoria: "DIVISÃO",
        tipo: "divisao",
        texto: "UMA PROFESSORA TEM 24 LÁPIS E QUER DAR O MESMO NÚMERO DE LÁPIS PARA 8 ALUNOS. QUANTOS LÁPIS CADA ALUNO RECEBERÁ?",
        imagem: "lapis",
        resposta: 3
    }
];

// Estado do quiz
let questaoAtual = 0;
const respostas = [];

// Inicializar o quiz
function iniciarQuiz() {
    const containerQuestoes = document.getElementById('container-questoes');
    containerQuestoes.innerHTML = '';
    
    // Criar elementos para cada questão
    questoes.forEach((questao, index) => {
        const divQuestao = document.createElement('div');
        divQuestao.className = `questao ${questao.tipo} ${index === 0 ? 'ativa' : ''}`;
        divQuestao.id = `questao-${questao.id}`;
        
        divQuestao.innerHTML = `
            <div class="categoria-label">${questao.categoria}</div>
            <div class="questao-content">
                <div class="numero-questao">${questao.id}</div>
                <div class="questao-texto">${questao.texto}</div>
                <img src="/api/placeholder/60/60" alt="${questao.imagem}" class="imagem-questao">
            </div>
            
            <div class="resposta-container">
                <input type="number" id="resposta-${questao.id}" placeholder="Digite sua resposta">
                <div class="buttons">
                    ${index > 0 ? '<button id="btn-anterior-'+questao.id+'">Anterior</button>' : ''}
                    <button id="btn-verificar-${questao.id}">Verificar</button>
                    ${index < questoes.length - 1 ? '<button id="btn-proximo-'+questao.id+'" disabled>Próximo</button>' : '<button id="btn-finalizar-'+questao.id+'" disabled>Finalizar</button>'}
                </div>
                <div id="feedback-${questao.id}" class="feedback"></div>
            </div>
        `;
        containerQuestoes.appendChild(divQuestao);
    });
    
    // Adicionar event listeners
    questoes.forEach((questao, index) => {
        // Botão verificar
        document.getElementById(`btn-verificar-${questao.id}`).addEventListener('click', () => {
            verificarResposta(questao.id, questao.resposta);
        });
        
        // Enter key para verificar resposta
        document.getElementById(`resposta-${questao.id}`).addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verificarResposta(questao.id, questao.resposta);
            }
        });
        
        // Botão anterior (se não for a primeira questão)
        if (index > 0) {
            document.getElementById(`btn-anterior-${questao.id}`).addEventListener('click', () => {
                navegarParaQuestao(index - 1);
            });
        }
        
        // Botão próximo (se não for a última questão)
        if (index < questoes.length - 1) {
            document.getElementById(`btn-proximo-${questao.id}`).addEventListener('click', () => {
                navegarParaQuestao(index + 1);
            });
        } else {
            // Botão finalizar (para a última questão)
            document.getElementById(`btn-finalizar-${questao.id}`).addEventListener('click', () => {
                mostrarResultado();
            });
        }
    });
    
    // Adicionar eventos aos botões do resultado
    document.getElementById('btn-exportar').addEventListener('click', exportarResultados);
    document.getElementById('btn-reiniciar').addEventListener('click', reiniciarQuiz);
    
    atualizarProgressBar();
}

// Verificar a resposta do usuário
function verificarResposta(id, respostaCorreta) {
    const respostaUsuario = parseInt(document.getElementById(`resposta-${id}`).value);
    const feedbackElement = document.getElementById(`feedback-${id}`);
    
    if (isNaN(respostaUsuario)) {
        feedbackElement.textContent = 'Por favor, digite um número.';
        feedbackElement.className = 'feedback incorreto';
        feedbackElement.style.display = 'block';
        return;
    }
    
    feedbackElement.style.display = 'block';
    
    const acertou = respostaUsuario === respostaCorreta;
    
    if (acertou) {
        feedbackElement.textContent = 'Parabéns! Sua resposta está correta!';
        feedbackElement.className = 'feedback correto';
    } else {
        feedbackElement.textContent = `Ops! A resposta correta é ${respostaCorreta}.`;
        feedbackElement.className = 'feedback incorreto';
    }
    
    // Salvar a resposta
    respostas[id - 1] = {
        questaoId: id,
        respostaUsuario: respostaUsuario,
        respostaCorreta: respostaCorreta,
        acertou: acertou
    };
    
    // Ativar botão de próximo/finalizar após verificar
    const index = questoes.findIndex(q => q.id === id);
    if (index < questoes.length - 1) {
        document.getElementById(`btn-proximo-${id}`).disabled = false;
    } else {
        document.getElementById(`btn-finalizar-${id}`).disabled = false;
    }
}

// Navegar para outra questão
function navegarParaQuestao(index) {
    // Esconder a questão atual
    document.querySelectorAll('.questao').forEach(el => {
        el.classList.remove('ativa');
    });
    
    // Mostrar a nova questão
    document.getElementById(`questao-${questoes[index].id}`).classList.add('ativa');
    
    questaoAtual = index;
    atualizarProgressBar();
}

// Atualizar a barra de progresso
function atualizarProgressBar() {
    const progresso = ((questaoAtual + 1) / questoes.length) * 100;
    document.getElementById('progress-bar').style.width = `${progresso}%`;
}

// Mostrar o resultado final
function mostrarResultado() {
    // Esconder as questões
    document.querySelectorAll('.questao').forEach(el => {
        el.classList.remove('ativa');
    });
    
    // Calcular pontuação
    const acertos = respostas.filter(r => r && r.acertou).length;
    document.getElementById('pontuacao').textContent = `${acertos}/${questoes.length}`;
    
    // Gerar resumo das respostas
    const resumoElement = document.getElementById('resumo-respostas');
    resumoElement.innerHTML = '';
    
    respostas.forEach(resposta => {
        if (!resposta) return;
        
        const questao = questoes.find(q => q.id === resposta.questaoId);
        const resumoItem = document.createElement('div');
        resumoItem.className = `resumo-item ${resposta.acertou ? 'resumo-correto' : 'resumo-incorreto'}`;
        
        resumoItem.innerHTML = `
            <div>
                <strong>Questão ${resposta.questaoId}:</strong> ${questao.texto}<br>
                <strong>Sua resposta:</strong> ${resposta.respostaUsuario}<br>
                <strong>Resposta correta:</strong> ${resposta.respostaCorreta}
            </div>
        `;
        
        resumoElement.appendChild(resumoItem);
    });
    
    // Mostrar a tela de resultado
    document.getElementById('resultado').style.display = 'block';
}

// Exportar os resultados
function exportarResultados() {
    // Preparar os dados para exportação
    const dadosExportacao = {
        data: new Date().toISOString(),
        pontuacao: respostas.filter(r => r && r.acertou).length,
        totalQuestoes: questoes.length,
        respostas: respostas
    };
    
    // Criar um arquivo JSON para download
    const conteudoArquivo = JSON.stringify(dadosExportacao, null, 2);
    const blob = new Blob([conteudoArquivo], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Criar um link para download e clicar nele
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-matematica-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Limpar
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
    
    alert('Resultados exportados com sucesso!');
}

// Reiniciar o quiz
function reiniciarQuiz() {
    questaoAtual = 0;
    respostas.length = 0;
    
    document.getElementById('resultado').style.display = 'none';
    iniciarQuiz();
}

// Iniciar o quiz quando a página carregar
window.onload = iniciarQuiz;