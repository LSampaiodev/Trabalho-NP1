# Comparativo entre Ferramentas de IA

## 1. Contexto

Este documento apresenta a comparação entre o simulador desenvolvido originalmente com auxílio do **Claude (Anthropic)** e o resultado obtido ao executar o `prompt_reconstrucao.md` em uma segunda ferramenta de IA.

| Item                    | Detalhes                                                    |
|-------------------------|-------------------------------------------------------------|
| **IA Original**         | Claude (Anthropic) — via Gemini Code Assist / Antigravity   |
| **IA de Reconstrução**  | *(Preencher: ChatGPT / Gemini / Copilot / outra)*           |
| **Prompt utilizado**    | Arquivo `prompt_reconstrucao.md` (sem modificações)         |
| **Data do teste**       | *(Preencher)*                                               |

---

## 2. Quadro Comparativo

| Aspecto                          | Resultado Original (Claude)          | Resultado da 2ª IA                    |
|----------------------------------|--------------------------------------|---------------------------------------|
| **Arquivos gerados**             | `index.html`, `style.css`, `app.js`  | *(Preencher)*                         |
| **Funciona ao abrir no browser?**| ✅ Sim                                | *(Sim / Não / Parcialmente)*          |
| **Componentes visuais**          |                                      |                                       |
| — CPU                            | ✅ Representada com borda e título    | *(Preencher)*                         |
| — ULA                            | ✅ Dentro da CPU, mostra A/B/resultado| *(Preencher)*                         |
| — Registradores (R0–R3)         | ✅ Grid 2x2 dentro da CPU            | *(Preencher)*                         |
| — Cache L1                       | ✅ Tabela com hit/miss               | *(Preencher)*                         |
| — RAM (16 posições)              | ✅ Tabela com endereços hex          | *(Preencher)*                         |
| — HD/SSD (8 setores)            | ✅ Tabela com setores                | *(Preencher)*                         |
| — Barramentos                    | ✅ Labels entre componentes          | *(Preencher)*                         |
| **Operações implementadas**      |                                      |                                       |
| — LOAD_MEM                       | ✅                                    | *(Preencher)*                         |
| — MEM_TO_REG                     | ✅                                    | *(Preencher)*                         |
| — REG_TO_MEM                     | ✅                                    | *(Preencher)*                         |
| — ADD                            | ✅                                    | *(Preencher)*                         |
| — SUB                            | ✅                                    | *(Preencher)*                         |
| — AND / OR / NOT                 | ✅                                    | *(Preencher)*                         |
| — SAVE_HD / LOAD_HD              | ✅                                    | *(Preencher)*                         |
| **Animações**                    |                                      |                                       |
| — Data packets (bolinha animada) | ✅ Sim                                | *(Preencher)*                         |
| — Destaque do componente ativo   | ✅ Glow neon                          | *(Preencher)*                         |
| — Barramento pulsante            | ✅ Sim                                | *(Preencher)*                         |
| **Log explicativo em PT-BR**     | ✅ Passo a passo com ícones          | *(Preencher)*                         |
| **Demo automática**              | ✅ Fluxo completo (inserir→somar→HD) | *(Preencher)*                         |
| **Cache com hit/miss**           | ✅ Mapeamento direto, write-through  | *(Preencher)*                         |
| **Contador de clock**            | ✅ Incrementa a cada micro-passo     | *(Preencher)*                         |
| **Controle de velocidade**       | ✅ Slider 100ms–2000ms               | *(Preencher)*                         |
| **Estilo visual**                | Dark mode, glassmorphism, Tailwind   | *(Preencher)*                         |
| **Responsividade**               | ✅ Grid adapta em telas menores      | *(Preencher)*                         |

---

## 3. Semelhanças Observadas

*(Preencher após o teste. Exemplos de pontos a observar:)*

- Ambas as IAs geraram a mesma estrutura de 3 arquivos?
- Os componentes visuais foram representados de forma similar?
- A lógica das operações (soma, subtração, etc.) produziu resultados corretos nas duas versões?
- O layout seguiu o padrão descrito no prompt (diagrama à esquerda, controles à direita)?

---

## 4. Diferenças Observadas

*(Preencher após o teste. Exemplos de diferenças comuns:)*

- **Visual**: Uma IA pode ter usado um estilo mais simples ou mais elaborado?
- **Animações**: A 2ª IA implementou animações de data packet ou apenas atualizou valores estaticamente?
- **Cache**: A 2ª IA implementou a lógica de hit/miss ou simplificou?
- **Log**: As explicações são igualmente detalhadas?
- **Campos dinâmicos**: Os campos de entrada mudam conforme a operação selecionada?
- **Erros**: Alguma operação não funcionou na versão da 2ª IA?

---

## 5. Limitações Percebidas em Cada IA

### IA Original (Claude)

- *(Preencher. Ex: "Precisou de ajustes manuais no layout", "Não implementou X automaticamente")*

### 2ª IA (Preencher nome)

- *(Preencher. Ex: "Gerou código com erros de sintaxe", "Não seguiu o tema escuro", "Animações não funcionaram")*

---

## 6. Análise da Qualidade do Prompt

| Pergunta                                                        | Resposta          |
|-----------------------------------------------------------------|-------------------|
| O prompt foi suficiente para a 2ª IA gerar uma solução similar? | *(Sim/Não/Parcial)*|
| Algum requisito foi ignorado pela 2ª IA?                        | *(Preencher)*     |
| O prompt precisaria de mais detalhes em alguma seção?            | *(Preencher)*     |
| A 2ª IA pediu esclarecimentos ou gerou direto?                  | *(Preencher)*     |

---

## 7. Conclusão

*(Preencher com uma análise final de 3-5 linhas. Exemplo de estrutura:)*

> O prompt de reconstrução mostrou-se [suficiente/parcialmente suficiente/insuficiente] para reproduzir o simulador em outra IA. As principais diferenças observadas foram [listar]. De modo geral, a IA original [Claude] produziu um resultado [mais/menos/igualmente] completo em relação à 2ª IA [nome], especialmente em [aspecto]. Isso demonstra que [conclusão sobre clareza do prompt e capacidade das IAs].
