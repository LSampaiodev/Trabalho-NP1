# Prompt de Reconstrução — Simulador de Organização de Computadores

## Objetivo

Crie um **simulador visual e interativo de organização de computadores** como uma página web única (HTML + CSS + JavaScript, sem frameworks). O simulador deve ser **didático**, permitindo que o usuário visualize como os dados circulam entre os principais componentes de um computador durante operações simples.

## Tecnologias

- HTML5, CSS3 e JavaScript ES6+ puro (sem React, Vue, Angular, etc.)
- Sem dependências externas (exceto Google Fonts para tipografia)
- Deve funcionar abrindo diretamente o arquivo HTML no navegador

## Estrutura de Arquivos

```
index.html  — Estrutura da página
style.css   — Estilos visuais
app.js      — Lógica do simulador
```

## Componentes Obrigatórios (todos devem ser representados visualmente)

1. **CPU** — Contêiner visual que agrupa os registradores e a ULA
2. **ULA (Unidade Lógica e Aritmética)** — Dentro da CPU, mostra operação atual, entradas A e B, e resultado
3. **Registradores** — 4 registradores (R0, R1, R2, R3) dentro da CPU, exibindo nome e valor
4. **Memória Cache (L1)** — 4 linhas com mapeamento direto (endereço, valor, status hit/miss/vazio)
5. **Memória RAM** — 16 posições (endereços 0x00 a 0x0F), exibidas em tabela
6. **HD/SSD** — 8 setores de armazenamento secundário, exibidos em tabela
7. **Barramentos** — Indicações visuais (setas, labels) entre CPU↔Cache↔RAM e RAM↔HD
8. **Painel de Controle** — Área com seletor de operação, campos de entrada dinâmicos e botões
9. **Área de Resultado** — Exibe o último valor processado
10. **Log de Operações** — Painel com histórico de passos executados, com explicações em português

## Operações Mínimas

O painel de controle deve permitir selecionar e executar estas operações:

| Operação | Descrição |
|---|---|
| `LOAD_MEM` | Inserir um valor em um endereço específico da RAM |
| `MEM_TO_REG` | Carregar valor da RAM para um registrador (passando pela cache, indicando hit/miss) |
| `REG_TO_MEM` | Armazenar valor de um registrador na RAM |
| `ADD` | Soma: selecionar 2 registradores de entrada e 1 de destino, calcular via ULA |
| `SUB` | Subtração: mesmo formato do ADD |
| `AND` | AND bit-a-bit via ULA |
| `OR` | OR bit-a-bit via ULA |
| `NOT` | Negação (complemento a 1) via ULA, sobre 1 registrador |
| `SAVE_HD` | Gravar valor de um endereço RAM em um setor do HD |
| `LOAD_HD` | Recuperar valor de um setor do HD para um endereço da RAM |

## Comportamento Visual e Animações

- **Cada operação deve ser executada em micro-passos** com delay configurável (slider de velocidade)
- **Componente ativo** deve receber destaque visual (borda brilhante, glow)
- **Data packets animados**: uma bolinha com o valor viaja visualmente entre os componentes (ex: do bloco RAM até o bloco de Registradores)
- **Barramentos ativos** devem pulsar/brilhar durante a transferência
- **Linhas de memória/registradores** afetados devem ser destacados
- **Log textual** deve explicar cada passo em português (ex: "Valor 25 carregado em R0", "Cache MISS na linha 2")
- **Contador de ciclos (clock)** no header, incrementado a cada micro-passo

## Botões de Controle

1. **Passo a Passo** — Executa a operação selecionada com os parâmetros do formulário
2. **Automático** — Executa uma demo completa do fluxo: inserir 2 valores na RAM → carregar em registradores → somar via ULA → armazenar resultado na RAM → gravar no HD → recuperar do HD
3. **Resetar** — Zera todo o estado do simulador
4. **Limpar Log** — Limpa o painel de log

## Cache

- Mapeamento direto simplificado: `linha = endereço % 4`
- Política write-through (ao escrever na cache, escreve também na RAM)
- Indicar visualmente cache HIT (valor encontrado na cache) e cache MISS (precisa buscar da RAM)

## Campos Dinâmicos

Os campos de entrada no painel de controle devem mudar conforme a operação selecionada:
- `LOAD_MEM`: campo de endereço RAM + campo de valor
- `MEM_TO_REG`: seletor de endereço RAM + seletor de registrador destino
- `REG_TO_MEM`: seletor de registrador fonte + seletor de endereço RAM
- `ADD/SUB/AND/OR`: seletores de Reg A, Reg B, Reg Destino
- `NOT`: seletor de Reg fonte + seletor de Reg destino
- `SAVE_HD`: seletor de endereço RAM + seletor de setor HD
- `LOAD_HD`: seletor de setor HD + seletor de endereço RAM

## Estilo Visual

- **Tema escuro (dark mode)** com fundo muito escuro (#0a0e1a ou similar)
- **Glassmorphism** nos painéis de componentes (fundo semitransparente + backdrop-filter blur)
- **Cores neon** para destaque: azul/ciano para dados, verde para controle/sucesso, laranja para endereços, vermelho para HD/erros, amarelo para resultados
- **Tipografia**: fonte monospace para valores (JetBrains Mono ou similar), fonte sans-serif para UI (Inter ou similar)
- **Layout em grid**: componentes do diagrama à esquerda, painel de controle + log à direita
- **Todos os textos da interface em português brasileiro**

## Idioma

Toda a interface, labels, mensagens de log, títulos e textos explicativos devem estar em **português brasileiro**.
