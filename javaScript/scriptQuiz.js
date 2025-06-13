let professorSelecionado = null;
let emailDestinatario = "";
const questoes = [
    {
        id: 1,
        categoria: "ADIÇÃO",
        tipo: "adicao",
        texto: " Se você tem 50 reais e recebe 25 reais de mesada, quantos reais você terá ao todo?",
        resposta: 75
    },
    {
        id: 2,
        categoria: "ADIÇÃO",
        tipo: "adicao",
        texto: "Ana tem 3 coelhos e ganhou 2 coelhos. Quantos coelhos Ana tem?",
        resposta: 5
    },
    {
        id: 3,
        categoria: "SUBTRAÇÃO",
        tipo: "subtracao",
        texto: "Você tinha 40 reais e gastou 12 reais no lanche. Quantos reais você tem agora?",
        resposta: 28
    },
    {
        id: 4,
        categoria: "SUBTRAÇÃO",
        tipo: "subtracao",
        texto: "Se você precisa ler um livro de 200 páginas e já leu 85, quantas páginas faltam para terminar?",
        resposta: 115
    },
    {
        id: 5,
        categoria: "SUBTRAÇÃO",
        tipo: "subtracao",
        texto: "Você tem 30 minutos para fazer a lição de casa e já se passaram 18 minutos. Quantos <strong>segundos</strong> você ainda tem?",
        resposta: 720
    },
    {
        id: 6,
        categoria: "MULTIPLICAÇÃO",
        tipo: "multiplicacao",
        texto: "Você precisa comprar 5 pacotes de figurinhas e cada pacote tem 8 figurinhas. Quantas figurinhas você terá no total?",
        resposta: 40
    },
    {
        id: 7,
        categoria: "DIVISÃO",
        tipo: "divisao",
        texto: "Se você tem 30 reais e quer comprar livros que custam 6 reais cada, quantos livros você poderá comprar?",
        resposta: 5
    },
    {
        id: 8,
        categoria: "DIVISÃO",
        tipo: "divisao",
        texto: "Você precisa organizar 36 lápis em 3 estojos. Quantos lápis você colocará em cada estojo?",
        resposta: 12
    },
    {
        id: 9,
        categoria: "MULTIPLICAÇÃO",
        tipo: "multiplicacao",
        texto: "Você precisa comprar 3 cadernos que custam R$ 15 cada e 2 canetas que custam R$3 cada. Quanto você gastará no total?",
        resposta: 51
    },
    {
        id: 10,
        categoria: "DIVISÃO",
        tipo: "divisao",
        texto: "Você precisa organizar seus livros em 4 prateleiras. Se você tem 12 livros de matemática, 8 de português e 4 de história, quantos livros ficarão em cada prateleira?",
        resposta: 6
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
    atualizarTemaSite(questoes[0].tipo);
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
    
    // Atualizar o tema do site baseado no tipo da questão atual
    atualizarTemaSite(questoes[index].tipo);
}

// Atualizar o tema de cores do site baseado no tipo de operação
function atualizarTemaSite(tipo) {
    // Remover todas as classes de operação do corpo do documento
    document.body.classList.remove('tema-adicao', 'tema-subtracao', 'tema-multiplicacao', 'tema-divisao');
    
    // Adicionar a classe correspondente ao tipo da questão atual
    document.body.classList.add(`tema-${tipo}`);
    
    // Atualizar cor primária baseada no tipo
    let corPrimaria;
    switch(tipo) {
        case 'adicao':
            corPrimaria = '#33a43d'; // Verde
            break;
        case 'subtracao':
            corPrimaria = '#F44336'; // Vermelho
            break;
        case 'multiplicacao':
            corPrimaria = '#03a9f4'; // Azul
            break;
        case 'divisao':
            corPrimaria = '#FF9800'; // Laranja
            break;
        default:
            corPrimaria = '#2C5FBC'; // Azul padrão
    }
    
    // Atualizar as variáveis CSS
    document.documentElement.style.setProperty('--color-primary', corPrimaria);
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
    
    // Restaurar o tema padrão do site
    document.body.classList.remove('tema-adicao', 'tema-subtracao', 'tema-multiplicacao', 'tema-divisao');
    document.documentElement.style.setProperty('--color-primary', '#2C5FBC');
    
    // Mostrar a tela de resultado
    document.getElementById('resultado').style.display = 'block';
    enviarEmailResultados();
}

// Exportar os resultados
function exportarResultados() {
    // Criar uma nova instância do jsPDF
    const doc = new jspdf.jsPDF();
    
    // Configurações iniciais
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Cabeçalho do relatório
    doc.setFontSize(20);
    doc.setTextColor(44, 95, 188); // Azul padrão do tema
    doc.text("Relatório do Quiz de Matemática", pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Informações gerais
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const dataHora = new Date().toLocaleString();
    doc.text(`Data: ${dataHora}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Professor: ${professorSelecionado}`, margin, yPosition);
    yPosition += 10;

    // Rest of the function remains the same...
    // Pontuação
    const acertos = respostas.filter(r => r && r.acertou).length;
    doc.text(`Pontuação: ${acertos}/${questoes.length}`, margin, yPosition);
    yPosition += 10;
    
    const percentual = Math.round((acertos / questoes.length) * 100);
    doc.text(`Desempenho: ${percentual}%`, margin, yPosition);
    yPosition += 20;
    
    // Linha divisória
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;
    
    // Título da seção de detalhes
    doc.setFontSize(16);
    doc.setTextColor(44, 95, 188);
    doc.text("Detalhes por Questão", margin, yPosition);
    yPosition += 15;
    
    // Resumo das respostas
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    respostas.forEach((resposta, index) => {
        if (!resposta) return;
        
        const questao = questoes.find(q => q.id === resposta.questaoId);
        
        // Verificar se precisa adicionar uma nova página
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
        
        // Número e texto da questão
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Questão ${resposta.questaoId}: ${questao.categoria}`, margin, yPosition);
        yPosition += 7;
        
        // Texto da questão
        doc.setFontSize(10);
        const textoLimpo = questao.texto.replace(/<[^>]*>/g, ''); // Remove tags HTML
        doc.text(textoLimpo, margin, yPosition);
        yPosition += 10;
        
        // Respostas
        doc.text(`Sua resposta: ${resposta.respostaUsuario}`, margin + 5, yPosition);
        yPosition += 6;
        doc.text(`Resposta correta: ${resposta.respostaCorreta}`, margin + 5, yPosition);
        yPosition += 6;
        
        // Status (correto/incorreto)
        if (resposta.acertou) {
            doc.setTextColor(51, 164, 61); // Verde
            doc.text("✓ Correto", margin + 5, yPosition);
        } else {
            doc.setTextColor(244, 67, 54); // Vermelho
            doc.text("✗ Incorreto", margin + 5, yPosition);
        }
        doc.setTextColor(0, 0, 0);
        
        yPosition += 15;
    });

    // Calcular desempenho por categoria
    const categorias = {};
    questoes.forEach(q => {
        if (!categorias[q.categoria]) {
            categorias[q.categoria] = { total: 0, acertos: 0 };
        }
        categorias[q.categoria].total++;
        
        const resposta = respostas.find(r => r && r.questaoId === q.id);
        if (resposta && resposta.acertou) {
            categorias[q.categoria].acertos++;
        }
    });
    // Salvar o PDF
    doc.save(`quiz-matematica-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function enviarEmailResultados() {
    const acertos = respostas.filter(r => r && r.acertou).length;
    const percentual = Math.round((acertos / questoes.length) * 100);
    
    // Preparar detalhes das questões para o email
    let questionsDetails = '';
    respostas.forEach((resposta) => {
        if (!resposta) return;
        const questao = questoes.find(q => q.id === resposta.questaoId);
        questionsDetails += `
            Questão ${resposta.questaoId}: ${questao.texto.replace(/<[^>]*>/g, '')}
            Sua resposta: ${resposta.respostaUsuario} (${resposta.acertou ? 'Correta' : 'Incorreta'})
            Resposta correta: ${resposta.respostaCorreta}\n\n`;
    });
    
    // Calcular desempenho por categoria
    const categorias = {};
    questoes.forEach(q => {
        if (!categorias[q.categoria]) {
            categorias[q.categoria] = { total: 0, acertos: 0 };
        }
        categorias[q.categoria].total++;
        
        const resposta = respostas.find(r => r && r.questaoId === q.id);
        if (resposta && resposta.acertou) {
            categorias[q.categoria].acertos++;
        }
    });
    
    let categoriesDetails = '';
    for (const [categoria, dados] of Object.entries(categorias)) {
        const percent = Math.round((dados.acertos / dados.total) * 100);
        categoriesDetails += `${categoria}: ${dados.acertos}/${dados.total} (${percent}%)\n`;
    }
    
    // Preparar o template do email
    const templateParams = {
        professor_name: professorSelecionado,
        to_email: emailDestinatario,
        score: `${acertos}/${questoes.length}`,
        percentage: percentual,
        date: new Date().toLocaleString(),
        questions_details: questionsDetails,
        categories_performance: categoriesDetails
    };
    
    // Enviar o email - SUBSTITUA COM SEUS IDs REAIS
    emailjs.send('service_zimaoug', 'template_hxc3v7d', templateParams)
        .then(function(response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
        }, function(error) {
            console.log('Falha ao enviar email:', error);
            alert('Houve um erro ao enviar os resultados por email. Você pode exportar o PDF manualmente.');
        });
}

// Reiniciar o quiz
function reiniciarQuiz() {
    questaoAtual = 0;
    respostas.length = 0;
    
    document.getElementById('resultado').style.display = 'none';
    iniciarQuiz();
}

// Iniciar o quiz quando a página carregar
window.onload = function() {
    // Mostrar seletor de professor
    document.getElementById('btn-iniciar-quiz').addEventListener('click', function() {
        const selectProfessor = document.getElementById('select-professor');
        if (selectProfessor.value) {
            professorSelecionado = selectProfessor.value;
            
            // Definir email do destinatário baseado no professor selecionado
            if (professorSelecionado === "Chris") {
                emailDestinatario = "rabingrings@gmail.com";
            } else if (professorSelecionado === "Igor") {
                emailDestinatario = "mauagionco@gmail.com";
            }
            
            document.getElementById('professor-selector').style.display = 'none';
            document.getElementById('progress-container').style.display = 'block';
            document.getElementById('container-questoes').style.display = 'block';
            iniciarQuiz();
        } else {
            alert('Por favor, selecione um professor para continuar.');
        }
    });

    // Inicialmente esconder quiz e mostrar seletor
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('container-questoes').style.display = 'none';
    document.getElementById('resultado').style.display = 'none';
};