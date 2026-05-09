# Comparativo entre Ferramentas de IA

## 1. Contexto

Este documento apresenta a comparação entre o simulador desenvolvido originalmente com auxílio do **Claude (Anthropic)** e o resultado obtido ao executar o `prompt_reconstrucao.md` em uma segunda ferramenta de IA.

| Item                    | Detalhes                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| **IA Original**         | Claude (Anthropic) — via Gemini Code Assist / Antigravity              |
| **IA de Reconstrução**  | OpenAI ChatGPT (GPT-5.5)                                               |
| **Prompt utilizado**    | Arquivo `prompt_reconstrucao.md` (sem modificações)                    |
| **Data do teste**       | 09/05/2026                                                             |

---

| Aspecto                           | Resultado Original (Claude)           | Resultado da 2ª IA (ChatGPT)                               |
| --------------------------------- | ------------------------------------- | -------------------------------------------------------    |
| **Arquivos gerados**              | `index.html`, `style.css`, `app.js`   | ✅ Mesma estrutura (`index.html`, `style.css`, `app.js`)   |
| **Funciona ao abrir no browser?** | ✅ Sim                                 | ✅ Sim                                                   |
| **Componentes visuais**           |                                       |                                                         |
| — CPU                             | ✅ Representada com borda e título     | ✅ Representada corretamente                             |
| — ULA                             | ✅ Dentro da CPU, mostra A/B/resultado | ✅ Implementada                                          |
| — Registradores (R0–R3)           | ✅ Grid 2x2 dentro da CPU              | ✅ Estrutura semelhante                                  |
| — Cache L1                        | ✅ Tabela com hit/miss                 | ✅ Implementada parcialmente                             |
| — RAM (16 posições)               | ✅ Tabela com endereços hex            | ✅ Estrutura funcional                                   |
| — HD/SSD (8 setores)              | ✅ Tabela com setores                  | ✅ Representado                                          |
| — Barramentos                     | ✅ Labels entre componentes            | ✅ Presentes                                             |
| **Operações implementadas**       |                                         |                                                         |
| — LOAD_MEM                        | ✅                                     | ✅                                                       |
| — MEM_TO_REG                      | ✅                                     | ✅                                                       |
| — REG_TO_MEM                      | ✅                                     | ✅                                                       |
| — ADD                             | ✅                                     | ✅                                                       |
| — SUB                             | ✅                                     | ✅                                                       |
| — AND / OR / NOT                  | ✅                                     | ✅                                                       |
| — SAVE_HD / LOAD_HD               | ✅                                     | ✅                                                       |
| **Animações**                     |                                         |                                                         |
| — Data packets (bolinha animada)  | ✅ Sim                                 | ⚠️ Parcial / simplificado                               |
| — Destaque do componente ativo    | ✅ Glow neon                           | ✅ Implementado                                          |
| — Barramento pulsante             | ✅ Sim                                 | ⚠️ Básico                                               |
| **Log explicativo em PT-BR**      | ✅ Passo a passo com ícones            | ✅ Explicações detalhadas                                |
| **Demo automática**               | ✅ Fluxo completo (inserir→somar→HD)   | ✅ Implementada                                          |
| **Cache com hit/miss**            | ✅ Mapeamento direto, write-through    | ⚠️ Simplificado                                         |
| **Contador de clock**             | ✅ Incrementa a cada micro-passo       | ✅ Implementado                                          |
| **Controle de velocidade**        | ✅ Slider 100ms–2000ms                 | ✅ Presente                                              |
| **Estilo visual**                 | Dark mode, glassmorphism, Tailwind    | Dark mode moderno com CSS customizado                   |
| **Responsividade**                | ✅ Grid adapta em telas menores        | ✅ Responsivo                                            |


---

## 3. Semelhanças Observadas

- Ambas as IAs geraram a estrutura clássica de 3 arquivos (HTML, CSS e JavaScript).
- Os principais componentes da arquitetura computacional foram representados corretamente nas duas versões.
- As operações matemáticas e de movimentação de memória funcionaram adequadamente em ambas as implementações.
- O layout geral seguiu o padrão descrito no prompt, mantendo a separação entre área visual do simulador e painel de controle.
- As duas soluções utilizaram tema escuro e elementos visuais modernos.

---

## 4. Diferenças Observadas

- Visual: O Claude produziu uma interface mais refinada visualmente, com maior uso de efeitos glassmorphism e animações neon.
- Animações: A reconstrução no ChatGPT implementou animações mais simples e menos fluidas.
- Cache: O Claude simulou hit/miss de forma mais próxima de uma arquitetura real, enquanto o ChatGPT simplificou parte da lógica.
- Barramentos: No Claude os barramentos tinham maior destaque visual e animação contínua.
- Feedback visual: O Claude aplicou efeitos mais detalhados nos componentes ativos durante execução.
- Organização do código: O ChatGPT gerou código mais modular e comentado, facilitando manutenção futura.

---

## 5. Limitações Percebidas em Cada IA

### IA Original (Claude)

- Algumas partes do layout exigiram ajustes finos manuais.
- Uso excessivo de efeitos visuais pode dificultar manutenção.
- Código menos modular em determinados trechos.

### 2ª IA (ChatGPT)

- Algumas animações foram simplificadas em relação ao original.
- Simulação de cache menos detalhada.
- Menor fidelidade visual ao efeito glassmorphism/neon descrito implicitamente no resultado original.

---

## 6. Análise da Qualidade do Prompt

| Pergunta                                                        | Resposta                                                      |
| --------------------------------------------------------------- | --------------------------------------------------------------|
| O prompt foi suficiente para a 2ª IA gerar uma solução similar? | ✅ Parcialmente                                               |
| Algum requisito foi ignorado pela 2ª IA?                        | ⚠️ Parte das animações avançadas e detalhes de cache          |
| O prompt precisaria de mais detalhes em alguma seção?           | ✅ Sim, principalmente sobre animações e comportamento visual |
| A 2ª IA pediu esclarecimentos ou gerou direto?                  | ✅ Gerou diretamente                                          |


---

## 7. Conclusão

O prompt de reconstrução mostrou-se parcialmente suficiente para reproduzir o simulador em outra IA. A estrutura geral, operações e componentes principais foram implementados corretamente tanto no Claude quanto no ChatGPT. As principais diferenças ficaram concentradas na fidelidade visual, nas animações e na profundidade da simulação de cache. De modo geral, o Claude produziu um resultado visualmente mais sofisticado, enquanto o ChatGPT apresentou uma implementação mais organizada e fácil de manter. Isso demonstra que o prompt possui boa definição funcional, mas ainda pode ser refinado para garantir maior consistência estética e comportamental entre diferentes modelos de IA.
