# Mathema Quest - Documentação do Projeto

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Características do Projeto](#características-do-projeto)
3. [Público-Alvo](#público-alvo)
4. [Arquitetura do Sistema](#arquitetura-do-sistema)
5. [Estrutura de Diretórios](#estrutura-de-diretórios)
6. [Tecnologias Utilizadas](#tecnologias-utilizadas)
7. [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
8. [Guia de Instalação](#guia-de-instalação)
9. [Configuração e Uso](#configuração-e-uso)
10. [Arquivos JavaScript](#arquivos-javascript)
11. [Integração com Serviços Externos](#integração-com-serviços-externos)
12. [Acessibilidade](#acessibilidade)
13. [Manutenção e Desenvolvimento](#manutenção-e-desenvolvimento)
14. [Contribuição](#contribuição)

---

## 🎯 Visão Geral

**Mathema Quest** é uma plataforma educacional interativa desenvolvida para o ensino de matemática básica, com foco especial em estudantes do espectro autista e crianças em processo de alfabetização matemática. O projeto combina explicações didáticas, jogos interativos e avaliações para criar uma experiência de aprendizado completa e adaptativa.

### Missão
Tornar o aprendizado de matemática básica mais acessível, divertido e eficaz através de uma abordagem visual e interativa, respeitando diferentes estilos de aprendizagem.

---

## 🌟 Características do Projeto

- **Interface Intuitiva**: Design limpo e acessível com navegação simples
- **Aprendizado Progressivo**: Conteúdo estruturado em níveis de dificuldade
- **Gamificação**: Elementos de jogo para motivar o aprendizado
- **Avaliação Contínua**: Sistema de quiz para acompanhar o progresso
- **Relatórios Detalhados**: Exportação de resultados em PDF
- **Acessibilidade**: Desenvolvido pensando em necessidades especiais

---

## 👥 Público-Alvo

### Primário
- **Crianças de 6 a 12 anos** em processo de alfabetização matemática
- **Estudantes do espectro autista** que se beneficiam de aprendizado visual e estruturado
- **Crianças com dificuldades de aprendizagem** que precisam de abordagens alternativas

### Secundário
- **Professores e educadores** que buscam ferramentas interativas
- **Pais e cuidadores** que desejam apoiar o aprendizado em casa
- **Terapeutas ocupacionais** que trabalham com desenvolvimento cognitivo

---

## 🏗️ Arquitetura do Sistema

O Mathema Quest segue uma arquitetura de **Single Page Application (SPA)** com navegação dinâmica:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Interface     │    │   Lógica de      │    │   Dados e       │
│   do Usuário    │◄──►│   Negócio        │◄──►│   Persistência  │
│   (HTML/CSS)    │    │   (JavaScript)   │    │   (LocalStorage)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Fluxo de Navegação
1. **Página Inicial** → Seleção de operação matemática
2. **Seleção de Dificuldade** → Escolha do nível apropriado
3. **Explicação Teórica** → Conteúdo didático
4. **Jogo Interativo** → Prática com feedback imediato
5. **Quiz Final** → Avaliação e relatório

---

## 📁 Estrutura de Diretórios

```
S.A/
├── 📄 index.html                    # Página principal com menu de operações
├── 📁 dificuldade/                  # Seleção de níveis de dificuldade
│   ├── dificuldadeSoma.html
│   ├── dificuldadeSubtracao.html
│   ├── dificuldadeMultiplicacao.html
│   └── dificuldadeDivisao.html
├── 📁 explicacao/                   # Conteúdo didático teórico
│   ├── explicacaoSoma.html
│   ├── explicacaoSubtracao.html
│   ├── explicacaoMultiplicacao.html
│   └── explicacaoDivisao.html
├── 📁 jogos/                        # Jogos interativos por operação
│   ├── 🎮 Soma/
│   │   ├── jogoSomaFacil.html
│   │   ├── jogoSomaMedio.html
│   │   └── jogoSomaDificil.html
│   ├── 🎮 Subtração/
│   │   ├── jogoSubtracaoFacil.html
│   │   ├── jogoSubtracaoMedio.html
│   │   └── jogoSubtracaoDificil.html
│   ├── 🎮 Multiplicação/
│   │   └── jogoMultiplicacao.html
│   ├── 🎮 Divisão/
│   │   ├── jogoDivisao.html
│   │   └── jogoDivisaoMacas.html
├── 📁 quizFinal/                    # Sistema de avaliação
│   └── quiz.html
├── 📁 css/                          # Estilos visuais
│   ├── styles.css                   # Estilos globais
│   ├── styleDificuldade.css         # Estilos para seleção de dificuldade
│   ├── explicacao*.css              # Estilos para páginas explicativas
│   ├── jogoMaca*.css               # Estilos para jogos temáticos
│   ├── jogoNave*.css               # Estilos para jogos espaciais
│   └── quizFinal.css               # Estilos para o quiz
└──  📁 javaScript/                   # Lógica da aplicação
     ├── jogo*.js                     # Scripts dos jogos
     ├── navegate.js                  # Sistema de navegação
     └── scriptQuiz.js                # Lógica do quiz final
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização responsiva com Flexbox e Grid
- **JavaScript ES6+**: Lógica interativa e manipulação do DOM
- **SVG**: Ícones vetoriais escaláveis

### Bibliotecas e Frameworks
- **Google Fonts**: Tipografia (Poppins) para melhor legibilidade
- **jsPDF**: Geração de relatórios em PDF
- **EmailJS**: Envio de relatórios por email

### Ferramentas de Desenvolvimento
- **Git**: Controle de versão
- **Navegadores Modernos**: Chrome, Firefox, Safari, Edge

---

## ⚙️ Funcionalidades Detalhadas

### 1. Sistema de Navegação
- **Navegação Dinâmica**: Transições suaves sem recarregamento de página
- **Responsividade**: Adaptação automática a diferentes tamanhos de tela

### 2. Módulos Educacionais

#### Explicações Didáticas
- **Conteúdo Visual**: Ilustrações e exemplos práticos
- **Linguagem Acessível**: Adaptada para diferentes níveis de compreensão
- **Estrutura Progressiva**: Do conceito básico à aplicação prática

#### Jogos Interativos
- **Soma**: 3 níveis de dificuldade (1-10, 11-50, 51-100)
- **Subtração**: 3 níveis com validação de resultados negativos
- **Multiplicação**: Representação visual com grupos de objetos
- **Divisão**: Jogo das maçãs com distribuição visual

### 3. Sistema de Avaliação
- **Quiz Adaptativo**: 10 questões com dificuldade progressiva
- **Seleção de Professor**: Associação de resultados a educadores
- **Feedback Imediato**: Correção em tempo real com explicações
- **Relatório Detalhado**: Análise de desempenho por operação

### 4. Funcionalidades Especiais
- **Modo Acessível**: Contrastes adequados e fontes legíveis
- **Suporte a Teclado**: Navegação completa via teclado
- **Compatibilidade**: Funciona em dispositivos móveis e desktop

---

## 🚀 Guia de Instalação

### Método 1: Uso Online
1. Acesse o link da aplicação hospedada
2. Comece a usar imediatamente
3. Todos os recursos estarão disponíveis

### Método 2: Instalação Local
1. **Download do Projeto**:
   ```bash
   # Clone o repositório
   git clone [URL_DO_REPOSITORIO]
   
   # Ou descompacte o arquivo S.A.zip
   unzip S.A.zip
   ```

2. **Execução**:
   ```bash
   # Navegue até o diretório do projeto
   cd S.A
   
   # Abra o index.html em um navegador
   # Ou use um servidor local (opcional)
   python -m http.server 8000
   ```

### Requisitos do Sistema
- **Navegador**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **JavaScript**: Habilitado
- **Conexão**: Necessária apenas para carregamento inicial
- **Armazenamento**: 50MB de espaço disponível

---

## 🎮 Configuração e Uso

### Para Educadores
1. **Preparação**:
   - Cadastre-se no sistema de relatórios
   - Configure as preferências de dificuldade
   - Defina os objetivos de aprendizagem

2. **Acompanhamento**:
   - Monitore o progresso através dos relatórios
   - Identifique áreas de dificuldade
   - Adapte as atividades conforme necessário

### Para Estudantes
1. **Primeiro Acesso**:
   - Escolha uma operação matemática
   - Comece com o nível "Fácil"
   - Leia a explicação antes de jogar

2. **Progressão**:
   - Complete os jogos em ordem crescente de dificuldade
   - Repita os exercícios quantas vezes necessário
   - Realize o quiz final para avaliação

---

## 📝 Arquivos JavaScript

### Core do Sistema

| Arquivo | Responsabilidade | Principais Funções |
|---------|------------------|-------------------|
| `navegate.js` | Navegação entre páginas | `navigateTo(path)`, `updateHistory()` |
| `scriptQuiz.js` | Sistema de quiz | `iniciarQuiz()`, `mostrarResultado()`, `exportarResultados()`, `enviarEmailResultados()` |

### Jogos Específicos

| Arquivo | Jogo | Funcionalidades |
|---------|------|----------------|
| `jogoSomaFacil.js` | Soma Nível 1 | Números 1-10 |
| `jogoSomaMedio.js` | Soma Nível 2 | Números 11-50 |
| `jogoSomaDificil.js` | Soma Nível 3 | Números 51-100 |
| `jogoSubtracaoFacil.js` | Subtração Nível 1 | Números 1-10 |
| `jogoSubtracaoMedio.js` | Subtração Nível 2 | Números 11-50 |
| `jogoSubtracaoDificil.js` | Subtração Nível 3 | Números 51-100|
| `jogoMultiplicacao.js` | Multiplicação | Prática com jogo da nave |
| `jogoDivisaoMacas.js` | Divisão com Maçãs | Analogia visual, distribuição |
| `scriptQuiz.js` | Avaliação final do aluno | Questões práticas da vida real |


## 🔗 Integração com Serviços Externos

### EmailJS
- **Propósito**: Envio de relatórios de desempenho por email
- **Configuração**: ID do serviço integrado ao sistema
- **Uso**: Relatórios automáticos para professores e pais

### jsPDF
- **Propósito**: Geração de relatórios em PDF
- **Recursos**: Gráficos de desempenho, resumo detalhado
- **Customização**: Template adaptável para diferentes usos

### Google Fonts
- **Fonte**: Poppins (300, 400, 500, 600, 700)
- **Benefícios**: Legibilidade aprimorada, carregamento otimizado
- **Fallback**: Fontes do sistema como backup

---

## ♿ Acessibilidade

### Recursos Implementados
- **Contraste**: Cores com contraste adequado (WCAG 2.1)
- **Navegação por Teclado**: Todos os elementos são acessíveis via Tab
- **Texto Alternativo**: Imagens com descrições apropriadas
- **Estrutura Semântica**: HTML5 com tags semânticas corretas
- **Tamanho de Fonte**: Escalável e ajustável

### Considerações Especiais para Autismo
- **Consistência Visual**: Layout padronizado em todas as páginas
- **Feedbacks Claros**: Respostas imediatas e compreensíveis
- **Controle de Ritmo**: Usuário controla a velocidade de progressão
- **Elementos Predictivos**: Navegação previsível e estruturada

---

## 🔧 Manutenção e Desenvolvimento

### Estrutura de Código
- **Modularização**: Cada funcionalidade em arquivo separado
- **Convenções**: Nomes descritivos e comentários explicativos
- **Versionamento**: Git com commits fáceis de entender


### Adição de Novas Funcionalidades
1. **Planejamento**: Definir objetivos e requisitos
2. **Desenvolvimento**: Seguir padrões estabelecidos
3. **Testes**: Validar com usuários reais
4. **Documentação**: Atualizar este documento

---

## 🤝 Contribuição

### Como Contribuir
1. **Fork** do repositório
2. **Crie** uma branch para sua feature
3. **Implemente** as mudanças
4. **Teste** thoroughly
5. **Envie** um pull request

### Diretrizes de Código
- Use JavaScript ES6+
- Mantenha funções pequenas e focadas
- Comente código complexo
- Siga as convenções de nomenclatura existentes

### Áreas de Melhoria Identificadas
- **Multiplayer**: Jogos colaborativos
- **Adaptive Learning**: IA para personalização
- **Mais Operações**: Frações, decimais, porcentagens
- **Gamificação**: Sistema de pontos e conquistas
- **Accessibility**: Suporte para leitores de tela
- **Mobile**: App nativo para dispositivos móveis

---

## 📊 Métricas de Sucesso

### Indicadores de Aprendizagem
- Taxa de conclusão de exercícios
- Tempo médio por operação
- Melhoria na precisão das respostas
- Engajamento com o conteúdo explicativo

### Feedback dos Usuários
- Avaliações de professores
- Comentários de pais/cuidadores
- Observações de terapeutas
- Autorrelatórios de estudantes

---

## 📞 Suporte e Contato

### Canais de Suporte
- **Email**: [email_do_projeto]
- **Documentação**: Este arquivo README
- **Issues**: GitHub Issues para bugs e sugestões

### Equipe de Desenvolvimento
- **Chris**: [Especialidade/Função]
- **Igor**: [Especialidade/Função]

---

## 📄 Licença

Este projeto está licenciado sob [TIPO_DE_LICENÇA] - veja o arquivo LICENSE para detalhes.

---

## 🏆 Agradecimentos

Agradecimentos especiais a educadores, terapeutas e famílias que contribuíram com feedback valioso para o desenvolvimento desta ferramenta educacional.

---

*Mathema Quest © 2025 - Tornando a matemática acessível para todos*

