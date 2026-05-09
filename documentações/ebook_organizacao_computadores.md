# 📘 E-Book: Organização de Computadores

> Um guia visual e didático para entender como um computador funciona por dentro.

---

## Sumário

1. [Introdução](#1-introdução)
2. [O Modelo de Von Neumann](#2-o-modelo-de-von-neumann)
3. [CPU — Unidade Central de Processamento](#3-cpu--unidade-central-de-processamento)
4. [ULA — Unidade Lógica e Aritmética](#4-ula--unidade-lógica-e-aritmética)
5. [Registradores](#5-registradores)
6. [Memória Cache](#6-memória-cache)
7. [Memória RAM](#7-memória-ram)
8. [Armazenamento Secundário (HD/SSD)](#8-armazenamento-secundário-hdssd)
9. [Barramentos](#9-barramentos)
10. [Ciclo de Instrução](#10-ciclo-de-instrução)
11. [Operações Aritméticas e Lógicas](#11-operações-aritméticas-e-lógicas)
12. [Hierarquia de Memória](#12-hierarquia-de-memória)
13. [Fluxo Completo de uma Operação](#13-fluxo-completo-de-uma-operação)
14. [Glossário](#14-glossário)

---

## 1. Introdução

Um computador, por mais complexo que pareça, funciona com base em princípios simples: **armazenar dados**, **mover dados** e **processar dados**. Todos os programas que usamos — desde um editor de texto até um jogo — são reduzidos a essas três ações fundamentais executadas por circuitos eletrônicos.

A **Organização de Computadores** é a área que estuda **como** esses componentes internos são estruturados e como eles se comunicam para executar instruções.

### Por que estudar isso?

- Entender por que um computador é rápido (ou lento)
- Compreender como software e hardware se relacionam
- Saber o que acontece "por baixo dos panos" quando você executa um programa
- Tomar decisões melhores ao programar (ex: uso de cache, acesso à memória)

---

## 2. O Modelo de Von Neumann

A maioria dos computadores modernos segue a **Arquitetura de Von Neumann**, proposta por John von Neumann em 1945. Esse modelo define que um computador possui:

```
┌─────────────────────────────────────────────────┐
│                    CPU                          │
│  ┌──────────────┐  ┌────────────────────────┐   │
│  │ Unidade de   │  │  ULA (Unidade Lógica   │   │
│  │ Controle     │  │  e Aritmética)         │   │
│  └──────────────┘  └────────────────────────┘   │
│  ┌──────────────────────────────────────────┐   │
│  │         Registradores                     │   │
│  └──────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────┘
                     │ Barramentos
          ┌──────────┴──────────┐
          │    Memória (RAM)    │
          └──────────┬──────────┘
                     │
          ┌──────────┴──────────┐
          │   Entrada / Saída   │
          │   (HD, teclado...)  │
          └─────────────────────┘
```

### Princípios fundamentais:

| Princípio | Descrição |
|---|---|
| **Programa armazenado** | As instruções do programa ficam na memória, junto com os dados |
| **Execução sequencial** | As instruções são executadas uma por uma, em ordem |
| **Memória única** | Dados e instruções compartilham o mesmo espaço de memória |
| **Binário** | Toda informação é representada em bits (0 e 1) |

---

## 3. CPU — Unidade Central de Processamento

A CPU é o **cérebro do computador**. Ela é responsável por:

- **Buscar** instruções da memória (Fetch)
- **Decodificar** o que a instrução pede (Decode)
- **Executar** a operação (Execute)
- **Armazenar** o resultado (Write-back)

### Componentes internos da CPU:

| Componente | Função |
|---|---|
| **Unidade de Controle (UC)** | Coordena todas as operações, decodifica instruções, envia sinais de controle |
| **ULA** | Executa operações matemáticas e lógicas |
| **Registradores** | Memória ultrarrápida dentro da CPU |
| **Clock** | Sinal que sincroniza todas as operações |

### O que é o Clock?

O clock é um sinal elétrico que pulsa em uma frequência constante (medida em GHz). Cada "tique" do clock representa um **ciclo**, e a CPU executa uma ou mais etapas de uma instrução por ciclo.

> **Exemplo**: Uma CPU de 3 GHz executa 3 bilhões de ciclos por segundo.

```
Clock:  ─┐  ┌─┐  ┌─┐  ┌─┐  ┌─┐  ┌─
         └──┘ └──┘ └──┘ └──┘ └──┘
         Ciclo1 Ciclo2 Ciclo3 Ciclo4
```

---

## 4. ULA — Unidade Lógica e Aritmética

A ULA é o componente da CPU que **realmente faz os cálculos**. Ela recebe dois valores de entrada (operandos), aplica uma operação e produz um resultado.

### Operações Aritméticas

| Operação | Símbolo | Exemplo | Resultado |
|---|---|---|---|
| Soma | ADD | 5 + 3 | 8 |
| Subtração | SUB | 10 - 4 | 6 |
| Multiplicação | MUL | 3 × 7 | 21 |
| Divisão | DIV | 20 ÷ 5 | 4 |

### Operações Lógicas

As operações lógicas trabalham com bits individuais (0 e 1):

#### AND (E lógico)
Retorna 1 somente quando **ambos** os bits são 1.

```
  A: 1 1 0 1
  B: 1 0 1 1
AND: 1 0 0 1
```

| A | B | A AND B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

#### OR (OU lógico)
Retorna 1 quando **pelo menos um** dos bits é 1.

```
  A: 1 1 0 0
  B: 0 1 1 0
 OR: 1 1 1 0
```

| A | B | A OR B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

#### NOT (Negação)
Inverte cada bit: 0 vira 1 e 1 vira 0.

```
    A: 1 0 1 1
NOT A: 0 1 0 0
```

| A | NOT A |
|---|---|
| 0 | 1 |
| 1 | 0 |

### Como a ULA funciona no simulador:

```
Registrador R0 (valor: 25) ──→ Entrada A ─┐
                                           ├──→ ULA (ADD) ──→ Resultado: 42 ──→ R2
Registrador R1 (valor: 17) ──→ Entrada B ─┘
```

---

## 5. Registradores

Os registradores são **pequenas memórias ultrarrápidas** localizadas dentro da CPU. São o nível mais rápido de armazenamento em um computador.

### Características:

- **Velocidade**: Acesso em 1 ciclo de clock (frações de nanossegundo)
- **Capacidade**: Muito pequena (geralmente 32 ou 64 bits cada)
- **Quantidade**: Poucos (8 a 32 em arquiteturas comuns)
- **Volatilidade**: Perdem os dados quando o computador é desligado

### Tipos de registradores:

| Tipo | Sigla | Função |
|---|---|---|
| **De propósito geral** | R0, R1, R2... | Armazenam dados temporários para cálculos |
| **Contador de Programa** | PC | Aponta para o endereço da próxima instrução |
| **Registrador de Instrução** | IR | Armazena a instrução sendo executada |
| **Acumulador** | ACC | Armazena resultados de operações da ULA |
| **Registrador de Status** | FLAGS | Armazena flags (zero, carry, overflow, negativo) |

### Por que usar registradores?

A RAM é lenta comparada à CPU. Se a CPU tivesse que buscar **tudo** na RAM, seria um gargalo enorme. Os registradores servem como **área de trabalho imediata** da CPU.

> **Analogia**: Se a CPU é um chef de cozinha, os registradores são a bancada de trabalho (tudo à mão), a RAM é a geladeira (precisa caminhar) e o HD é o supermercado (precisa sair de casa).

---

## 6. Memória Cache

A memória cache é uma memória **pequena, muito rápida** que fica entre a CPU e a RAM. Seu objetivo é **reduzir o tempo de acesso** aos dados mais usados.

### Por que a cache existe?

A CPU é muito mais rápida que a RAM. Enquanto a CPU executa uma operação em ~0.3ns, acessar a RAM leva ~100ns. A cache resolve esse problema armazenando cópias dos dados mais acessados.

### Níveis de cache:

| Nível | Tamanho típico | Velocidade | Localização |
|---|---|---|---|
| **L1** | 32-64 KB | ~1 ns | Dentro do núcleo da CPU |
| **L2** | 256 KB - 1 MB | ~3-5 ns | Próximo ao núcleo |
| **L3** | 4-64 MB | ~10-20 ns | Compartilhada entre núcleos |

### Cache Hit vs Cache Miss

Quando a CPU precisa de um dado:

1. Primeiro busca na **Cache L1**
2. Se encontrar → **Cache Hit** ✅ (rápido!)
3. Se não encontrar → **Cache Miss** ❌ → busca na L2, depois L3, depois RAM

```
CPU precisa do dado no endereço 0x04
         │
         ▼
    ┌─────────┐
    │ Cache L1 │ ── Hit? ──→ SIM ──→ Retorna dado (1 ns)
    └─────────┘        │
                       NÃO (Miss)
                       │
                       ▼
                  ┌─────────┐
                  │   RAM    │ ──→ Busca dado (100 ns)
                  └─────────┘     e copia para cache
```

### Mapeamento Direto (simplificado)

No nosso simulador, usamos **mapeamento direto**: cada endereço da RAM é mapeado para uma linha específica da cache pela fórmula:

```
linha_da_cache = endereço_RAM % número_de_linhas
```

**Exemplo** com 4 linhas de cache:
- Endereço 0 → Linha 0
- Endereço 1 → Linha 1
- Endereço 5 → Linha 1 (5 % 4 = 1) — substitui o que estava na linha 1!

### Política Write-Through

Quando a CPU escreve um dado:
- Escreve na **cache** E na **RAM** ao mesmo tempo
- Garante que a RAM está sempre atualizada
- Mais simples, porém mais lento que write-back

---

## 7. Memória RAM

A **RAM (Random Access Memory)** é a memória principal do computador. Ela armazena os dados e programas que estão **em uso** pelo sistema.

### Características:

| Propriedade | Valor |
|---|---|
| **Tipo de acesso** | Aleatório (qualquer endereço, mesma velocidade) |
| **Velocidade** | ~100 ns por acesso |
| **Capacidade** | 4 GB a 64 GB (computadores atuais) |
| **Volatilidade** | Volátil — perde dados ao desligar |
| **Tecnologia** | DRAM (Dynamic RAM) — precisa ser atualizada constantemente |

### Organização da RAM

A RAM é organizada como uma grande tabela de **endereços** e **valores**:

```
┌───────────┬─────────┐
│ Endereço  │  Valor  │
├───────────┼─────────┤
│  0x00     │   25    │
│  0x01     │   17    │
│  0x02     │   42    │
│  0x03     │    0    │
│  ...      │  ...    │
│  0x0F     │    0    │
└───────────┴─────────┘
```

Cada endereço armazena uma **palavra** de memória (tipicamente 8, 16, 32 ou 64 bits).

### Como a CPU acessa a RAM?

1. A CPU coloca o **endereço** no barramento de endereços
2. A CPU envia um sinal de **leitura ou escrita** pelo barramento de controle
3. O dado viaja pelo **barramento de dados**

---

## 8. Armazenamento Secundário (HD/SSD)

O armazenamento secundário é onde os dados ficam **permanentemente**, mesmo quando o computador é desligado.

### HD (Hard Disk Drive)

- **Tecnologia**: Discos magnéticos giratórios com cabeças de leitura
- **Velocidade**: Lenta (~5-10 ms por acesso)
- **Capacidade**: 500 GB a 20 TB
- **Custo**: Baixo por GB

```
        ┌─────────────────┐
        │   Disco         │
        │   magnético     │
        │     ◉           │  ← Pratos giratórios
        │   girando       │
        │                 │
        │  ───── cabeça   │  ← Cabeça de leitura/escrita
        └─────────────────┘
```

### SSD (Solid State Drive)

- **Tecnologia**: Chips de memória flash (sem partes móveis)
- **Velocidade**: Muito mais rápido que HD (~0.1 ms)
- **Capacidade**: 128 GB a 8 TB
- **Custo**: Maior por GB que HD

### Comparação HD vs SSD

| Aspecto | HD | SSD |
|---|---|---|
| Velocidade de leitura | ~100 MB/s | ~500-7000 MB/s |
| Tempo de acesso | ~5-10 ms | ~0.05-0.1 ms |
| Partes móveis | Sim | Não |
| Durabilidade | Sensível a impactos | Resistente |
| Ruído | Audível | Silencioso |
| Consumo de energia | Maior | Menor |

### Por que não usar só RAM?

| Motivo | RAM | HD/SSD |
|---|---|---|
| Custo por GB | Caro (~R$ 15/GB) | Barato (~R$ 0,20/GB) |
| Persistência | Perde dados ao desligar | Mantém dados |
| Capacidade | Limitada (8-64 GB) | Grande (1-20 TB) |

---

## 9. Barramentos

Os barramentos são os **"caminhos"** por onde os dados, endereços e sinais de controle trafegam entre os componentes do computador.

### Tipos de barramento:

```
CPU ════════════════════════════════════ RAM
        ↑ Barramento de Dados
        ↑ Barramento de Endereços
        ↑ Barramento de Controle
```

| Barramento | Direção | Função |
|---|---|---|
| **Dados** | Bidirecional ↔ | Transporta os dados entre componentes |
| **Endereços** | Unidirecional → | CPU informa qual posição de memória quer acessar |
| **Controle** | Unidirecional → | CPU envia sinais (ler, escrever, interromper) |

### Largura do barramento

A **largura** do barramento determina quantos bits podem ser transferidos de uma vez:

- **Barramento de dados de 32 bits**: transfere 4 bytes por vez
- **Barramento de dados de 64 bits**: transfere 8 bytes por vez
- **Barramento de endereços de 32 bits**: endereça até 2³² = 4 GB de RAM
- **Barramento de endereços de 64 bits**: endereça até 2⁶⁴ = 16 exabytes

---

## 10. Ciclo de Instrução

Toda instrução executada pela CPU segue um **ciclo** de etapas:

### Ciclo básico: Fetch → Decode → Execute → Write-back

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌────────────┐
│  FETCH  │───→│ DECODE  │───→│ EXECUTE │───→│ WRITE-BACK │
│ (Buscar)│    │(Decodif)│    │(Executar)│   │(Armazenar) │
└─────────┘    └─────────┘    └─────────┘    └────────────┘
     ↑                                             │
     └─────────────────────────────────────────────┘
                    (próxima instrução)
```

### Detalhamento:

**1. Fetch (Buscar)**
- A UC lê o endereço no **PC** (Program Counter)
- Busca a instrução na memória (RAM/cache)
- Armazena no **IR** (Registrador de Instrução)
- Incrementa o PC para a próxima instrução

**2. Decode (Decodificar)**
- A UC analisa a instrução no IR
- Identifica: qual operação? quais operandos? qual destino?
- Prepara os sinais de controle necessários

**3. Execute (Executar)**
- Se for operação aritmética/lógica → ULA calcula
- Se for acesso à memória → barramento transfere dados
- Se for desvio → PC é atualizado para novo endereço

**4. Write-back (Armazenar resultado)**
- O resultado é armazenado no registrador de destino
- Flags de status são atualizadas (zero, carry, overflow)

### Exemplo prático: `ADD R2, R0, R1`

| Etapa | O que acontece |
|---|---|
| Fetch | CPU busca a instrução "ADD R2, R0, R1" da memória |
| Decode | UC decodifica: operação = soma, fontes = R0 e R1, destino = R2 |
| Execute | ULA recebe R0 (25) e R1 (17), calcula 25 + 17 = 42 |
| Write-back | Resultado 42 é armazenado em R2 |

---

## 11. Operações Aritméticas e Lógicas

### Representação de números em binário

Computadores trabalham em **base 2** (binário). Cada dígito é um **bit** (0 ou 1):

```
Decimal 42 = Binário 00101010

   128  64  32  16   8   4   2   1
    0    0   1   0   1   0   1   0
              32  +   8  +  2      = 42
```

### Soma binária

```
    0 0 1 1 0 0 1 0    (50)
  + 0 0 0 0 1 1 0 0    (12)
  ─────────────────
    0 0 1 1 1 1 1 0    (62)
```

Regras: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (0 e "vai um")

### Subtração binária (complemento a 2)

Para subtrair, o computador usa o **complemento a 2**:
1. Inverte todos os bits do segundo número (NOT)
2. Soma 1
3. Soma com o primeiro número

```
10 - 3 = 10 + (-3)

 3 em binário:     0000 0011
 NOT:              1111 1100
 +1:               1111 1101   ← este é -3 em complemento a 2

    0000 1010   (10)
  + 1111 1101   (-3)
  ───────────
    0000 0111   (7) ✅
```

---

## 12. Hierarquia de Memória

A memória de um computador é organizada em uma **pirâmide hierárquica**, equilibrando velocidade, capacidade e custo:

```
          ▲ Mais rápido    △
         ╱ ╲               │ Menor capacidade
        ╱REG╲              │ Maior custo/byte
       ╱─────╲
      ╱ CACHE ╲
     ╱ L1/L2/L3╲
    ╱───────────╲
   ╱    RAM      ╲
  ╱───────────────╲
 ╱   SSD / HD      ╲
╱═══════════════════╲
         │
         ▼ Mais lento, maior capacidade, menor custo
```

### Comparação detalhada:

| Nível | Velocidade | Capacidade | Custo/GB | Volátil? |
|---|---|---|---|---|
| **Registradores** | ~0.3 ns | ~128 bytes | — | Sim |
| **Cache L1** | ~1 ns | 32-64 KB | — | Sim |
| **Cache L2** | ~3-5 ns | 256 KB-1MB | — | Sim |
| **Cache L3** | ~10-20 ns | 4-64 MB | — | Sim |
| **RAM** | ~100 ns | 4-64 GB | ~R$15 | Sim |
| **SSD** | ~0.1 ms | 128 GB-8 TB | ~R$0,50 | Não |
| **HD** | ~5-10 ms | 500 GB-20 TB | ~R$0,20 | Não |

### Princípio da Localidade

A hierarquia de memória funciona bem por causa de dois princípios:

- **Localidade Temporal**: Se um dado foi acessado agora, provavelmente será acessado novamente em breve (ex: variável em um loop)
- **Localidade Espacial**: Se um dado foi acessado, dados vizinhos provavelmente serão acessados também (ex: percorrer um array)

---

## 13. Fluxo Completo de uma Operação

Vamos acompanhar o fluxo completo de **somar dois números** no computador:

### Cenário: Calcular 25 + 17 e salvar no HD

```
Passo 1: Usuário insere valor 25
         → 25 é armazenado na RAM, endereço 0x00

Passo 2: Usuário insere valor 17
         → 17 é armazenado na RAM, endereço 0x01

Passo 3: CPU carrega RAM[0x00] → R0
         → CPU verifica cache → Miss → busca na RAM
         → Valor 25 copiado para cache e para R0

Passo 4: CPU carrega RAM[0x01] → R1
         → CPU verifica cache → Miss → busca na RAM
         → Valor 17 copiado para cache e para R1

Passo 5: CPU envia R0 e R1 para a ULA
         → ULA recebe: entrada A = 25, entrada B = 17
         → ULA executa ADD: 25 + 17 = 42
         → Resultado retorna para R2

Passo 6: CPU armazena R2 → RAM[0x02]
         → Valor 42 é escrito na RAM (e na cache)

Passo 7: Sistema grava RAM[0x02] → HD, Setor 0
         → Valor 42 viaja pelo barramento até o HD
         → Dado persistido no armazenamento permanente

Passo 8: Usuário recupera HD, Setor 0 → RAM[0x03]
         → Valor 42 é lido do HD e colocado na RAM
```

### Diagrama do fluxo:

```
[Entrada: 25, 17]
       │
       ▼
┌──────────────┐
│   RAM        │  Passo 1-2: Valores armazenados
│ 0x00 = 25    │
│ 0x01 = 17    │
└──────┬───────┘
       │  Passo 3-4: Carregar para registradores
       ▼
┌──────────────┐
│ Cache (L1)   │  Verifica hit/miss
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│              CPU                 │
│  ┌────────┐      ┌───────────┐  │
│  │R0 = 25 │      │           │  │
│  │R1 = 17 │─────→│ ULA: ADD  │  │  Passo 5
│  │R2 = 42 │←─────│ 25+17=42  │  │
│  └────────┘      └───────────┘  │
└──────────────┬───────────────────┘
               │  Passo 6: Resultado → RAM
               ▼
┌──────────────┐
│ RAM          │
│ 0x02 = 42   │
└──────┬───────┘
       │  Passo 7: Gravar no HD
       ▼
┌──────────────┐
│ HD/SSD       │
│ Setor 0 = 42│  ← Dado persistido!
└──────────────┘
```

---

## 14. Glossário

| Termo | Definição |
|---|---|
| **Bit** | Menor unidade de informação: 0 ou 1 |
| **Byte** | Conjunto de 8 bits |
| **CPU** | Processador central que executa instruções |
| **ULA/ALU** | Circuito que realiza operações matemáticas e lógicas |
| **Registrador** | Memória ultrarrápida dentro da CPU |
| **Cache** | Memória rápida entre CPU e RAM para acelerar acesso |
| **RAM** | Memória principal, volátil, de acesso rápido |
| **HD** | Disco rígido magnético para armazenamento permanente |
| **SSD** | Unidade de estado sólido, mais rápido que HD |
| **Barramento** | Via de comunicação entre componentes |
| **Clock** | Sinal que sincroniza operações da CPU |
| **Fetch** | Etapa de buscar instrução da memória |
| **Decode** | Etapa de decodificar a instrução |
| **Execute** | Etapa de executar a operação |
| **Write-back** | Etapa de armazenar o resultado |
| **Cache Hit** | Dado encontrado na cache (acesso rápido) |
| **Cache Miss** | Dado não está na cache, precisa buscar na RAM |
| **Volátil** | Perde dados ao desligar o computador |
| **Não volátil** | Mantém dados mesmo desligado |
| **Complemento a 2** | Forma de representar números negativos em binário |
| **Palavra** | Unidade natural de dados do processador (32 ou 64 bits) |
| **Endereço** | Número que identifica uma posição na memória |

---

> 📌 **Este material foi elaborado como apoio didático à disciplina de Organização de Computadores.**
> Utilize o simulador interativo (`index.html`) para visualizar na prática os conceitos apresentados neste e-book.
