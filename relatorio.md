# Relatório — Simulador de Organização de Computadores

## 1. Objetivo

Este simulador foi desenvolvido como trabalho prático da disciplina de Organização de Computadores. O objetivo é representar, de forma visual e interativa, o funcionamento básico de um computador, permitindo ao usuário observar como os dados circulam entre os principais componentes durante operações simples como leitura, escrita, soma, subtração e armazenamento.

## 2. Componentes Representados

| Componente | Descrição no Simulador |
|---|---|
| **CPU** | Contêiner visual que agrupa registradores e ULA |
| **ULA** | Unidade Lógica e Aritmética — executa ADD, SUB, AND, OR, NOT |
| **Registradores** | 4 registradores simplificados (R0–R3) com valores visíveis |
| **Memória Cache (L1)** | 4 linhas com mapeamento direto, indicação de hit/miss |
| **Memória RAM** | 16 posições de memória (endereços 0x00–0x0F) |
| **HD / SSD** | 8 setores de armazenamento secundário |
| **Barramentos** | Indicações visuais de barramento de dados/endereços e armazenamento |

## 3. Operações Implementadas

1. **LOAD_MEM** — Inserir um valor em um endereço da RAM
2. **MEM_TO_REG** — Carregar valor da RAM para um registrador (passando pela cache)
3. **REG_TO_MEM** — Armazenar valor de um registrador na RAM
4. **ADD** — Soma aritmética via ULA
5. **SUB** — Subtração aritmética via ULA
6. **AND** — Operação lógica AND bit-a-bit via ULA
7. **OR** — Operação lógica OR bit-a-bit via ULA
8. **NOT** — Negação lógica (complemento) via ULA
9. **SAVE_HD** — Gravar valor da RAM no HD/SSD
10. **LOAD_HD** — Recuperar valor do HD/SSD para a RAM

## 4. Tecnologias Utilizadas

- **HTML5** — Estrutura semântica da página
- **CSS3** — Estilização com tema escuro (dark mode), glassmorphism, animações CSS
- **Tailwind CSS v3 (CDN)** — Framework utilitário para estilização rápida e consistente
- **JavaScript (ES6+)** — Lógica do simulador, manipulação do DOM, animações
- **Google Fonts** — Tipografias Inter (UI) e JetBrains Mono (valores/código)

O projeto funciona como arquivo estático (HTML/CSS/JS) sem necessidade de build ou servidor.

## 5. Ferramentas de IA Utilizadas

### 5.1. IA principal: Claude (Anthropic)

Utilizado como ferramenta principal de apoio para:
- Gerar a estrutura inicial do HTML, CSS e JavaScript
- Definir o layout visual (grid de componentes, sidebar de controles)
- Implementar a lógica de cada operação (soma, subtração, lógicas, cache, HD)
- Criar o sistema de animação de data packets
- Produzir a documentação (relatório, e-book, prompt de reconstrução)

### 5.2. Exemplos concretos de prompts utilizados

| # | Prompt (resumo)                                                       | O que a IA gerou                                |
|---|-----------------------------------------------------------------------|-------------------------------------------------|
| 1 | Especificação completa do trabalho prático (colada integralmente)     | Plano de implementação + arquivos HTML/CSS/JS   |
| 2 | *"em português"*                                                      | Ajuste: toda interface e log em PT-BR           |
| 3 | *"pode realizar"*                                                     | Confirmação para prosseguir com a implementação |
| 4 | *"poderia gerar um .md para informações que quero implementar em e-book para entendimento de organização de computadores?"* | E-book completo com 14 capítulos sobre Org. de Computadores |
| 5 | *"Gostaria de usar Tailwind CSS para melhorar a estilização"*         | Reescrita do HTML com Tailwind + CSS enxuto      |
| 6 | *"abordaram esse tópico no projeto? [critérios de avaliação]"*        | Análise de cobertura + criação de docs faltantes |

### 5.3. Fluxo de interação com a IA

1. **Entrada**: Especificação completa do trabalho foi fornecida como prompt inicial
2. **Planejamento**: A IA criou um plano de implementação detalhado antes de codificar
3. **Geração**: Os 3 arquivos (HTML, CSS, JS) foram gerados sequencialmente
4. **Teste**: A IA abriu o simulador no navegador e testou a demo automática
5. **Iteração**: Ajustes foram solicitados (idioma, Tailwind, documentação complementar)
6. **Documentação**: Relatório, e-book, prompt de reconstrução e comparativo gerados

### 5.4. O que compreendemos do código gerado

- **Estado global (`SIM`)**: O simulador usa um objeto JavaScript que armazena o estado de todos os componentes (registradores, RAM, cache, HD, clock). Cada operação modifica esse estado e atualiza a interface.
- **Micro-passos com Promises**: Cada operação é decomposta em etapas assíncronas (`async/await`) com delay configurável, permitindo a visualização passo a passo.
- **Animação de data packets**: Elementos `div` são criados dinamicamente, posicionados via `getBoundingClientRect()` e movidos com CSS transitions para simular dados trafegando pelos barramentos.
- **Cache com mapeamento direto**: A função `cacheLine(addr)` usa `addr % 4` para determinar a linha da cache. O `cacheRead()` verifica hit/miss comparando tags, e o `cacheWrite()` implementa write-through.
- **Campos dinâmicos**: O `renderDynFields()` altera o formulário conforme a operação selecionada, gerando selects e inputs apropriados para cada caso.

## 6. Dificuldades Encontradas

- **Animação de data packets**: Sincronizar a animação de "bolinhas" de dados percorrendo os barramentos com a atualização do estado interno exigiu uso cuidadoso de Promises e requestAnimationFrame.
- **Cache simplificada**: Implementar uma cache com mapeamento direto que funcione corretamente com write-through e indique hit/miss visualmente.
- **Layout responsivo**: Organizar tantos componentes (CPU, Cache, RAM, HD, Controles, Log) em uma tela de forma que todos fiquem visíveis e intuitivos.

## 7. Limitações do Simulador

- A cache possui apenas 4 linhas com mapeamento direto simplificado.
- Apenas 4 registradores (R0–R3) e 16 posições de RAM.
- O HD/SSD é representado por uma tabela simples de 8 setores.
- Não há simulação de pipeline, interrupções ou sistema operacional.
- Os barramentos são representados de forma conceitual (setas/labels), não como conexões elétricas reais.
- As portas lógicas (AND, OR, NOT) operam sobre valores inteiros, não sobre bits individuais com representação visual de portas.
- O ciclo de clock é incrementado a cada micro-passo, não representa ciclos reais de processador.
