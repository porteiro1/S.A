# **Documentação do Projeto: Mathema Quest**

## **Visão Geral**

**Mathema Quest** é uma aplicação web educacional interativa voltada ao ensino de operações matemáticas básicas (soma, subtração, multiplicação e divisão) por meio de explicações e jogos. O público-alvo são estudantes do espectro autista e crianças em fase de alfabetização matemática.

---

## **Estrutura de Diretórios**

S.A/  
├── index.html                 	\# Página inicial com menu de operações  
├── dificuldade/              	\# Seleção de nível para cada operação  
│   ├── dificuldadeSoma.html  
│   └── dificuldadeSubtracao.html  
├── explicacao/               	\# Páginas com explicações teóricas  
│   ├── explicacaoSoma.html  
│   ├── explicacaoSubtracao.html  
│   ├── explicacaoMultiplicacao.html  
│   └── explicacaoDivisao.html  
├── jogos/                    	\# Jogos divididos por operação e dificuldade  
│   ├── jogoSomaFacil.html  
│   ├── jogoSomaMedio.html  
│   ├── jogoSomaDificil.html  
│   ├── jogoSubtracaoFacil.html  
│   ├── jogoSubtracaoMedio.html  
│   ├── jogoSubtracaoDificil.html  
│   ├── jogoMultiplicacao.html  
│   ├── jogoDivisao.html  
│   ├── jogoDivisaoMacas.html  
│   └── testeDivisao.html  
├── quizFinal/  
│   └── quiz.html             	\# Quiz final de revisão  
├── css/                      	\# Estilos CSS  
│   ├── styles.css  
│   ├── styleDificuldade.css  
│   ├── explicacao\*.css  
│   ├── jogoMaca\*.css  
│   ├── jogoNave\*.css  
│   ├── quizFinal.css  
│   └── testeDivisao.css  
├── javaScript/               	\# Scripts de lógica para os jogos e navegação  
│   ├── jogo\*.js  
│   ├── navegate.js           	\# Função navegateTo() usada para navegação dinâmica  
│   ├── scriptQuiz.js         	\# Lógica do quiz  
│   └── testeDivisao.js  
└── .git/                     	\# Repositório Git (versão local)

## **Tecnologias Utilizadas**

* **HTML5** – Estrutura de páginas

* **CSS3** – Estilização customizada por contexto (jogos, explicações, quiz)

* **JavaScript** – Lógica dos jogos e navegação

* **SVG** – Ícones vetoriais integrados

* **Google Fonts** – Tipografia personalizada (Poppins)

---

## **Como Executar o Projeto**

* **Método online:**
1. Basta acessar o link do projeto para utilizar a aplicação.


* **Método Offline:**

1. Extraia o projeto `S.A.zip`.

2. Abra o arquivo `index.html` em qualquer navegador moderno (recomendado: Firefox ou Chrome).

3. Navegue pelas operações e selecione jogos ou explicações conforme desejar.

4. O projeto funciona offline, não requer servidor web local.

---

## **Funcionalidades**

* **Explicações Didáticas** para cada operação matemática.

* **Jogos Interativos** com 3 níveis de dificuldade para soma e subtração.

* **Divisão com Maçãs** e **multiplicação visual**, facilitando o aprendizado com analogias.

* **Quiz Final** para revisar e testar conhecimentos adquiridos.

* **Navegação Simples** com JavaScript dinâmico (sem recarregar a página base).

---

## **Descrição dos Arquivos JavaScript**

| Arquivo | Função Principal |
| ----- | ----- |
| `navigate.js` | Função `navigateTo(path)` para redirecionar |
| `jogoSomaFacil.js`, etc. | Lógica e validação das respostas nos jogos |
| `jogoDivisaoMacas.js` | Dinâmica da divisão com ilustrações de maçãs |
| `scriptQuiz.js` | Geração de perguntas, respostas e pontuação |
| `testeDivisao.js` | Possivelmente um protótipo/teste de lógica |

