// ===== SIMULADOR DE ORGANIZAÇÃO DE COMPUTADORES =====
// Estado global do simulador

const SIM = {
  registers: { R0: 0, R1: 0, R2: 0, R3: 0 },
  ram: new Array(16).fill(0),
  cache: [
    { valid: false, tag: null, value: null },
    { valid: false, tag: null, value: null },
    { valid: false, tag: null, value: null },
    { valid: false, tag: null, value: null },
  ],
  hd: new Array(8).fill(0),
  clock: 0,
  speed: 700,
  running: false,
  stepQueue: [],
};

// ===== REFERÊNCIAS DOM =====
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const DOM = {
  clockCount: $("#clock-count"),
  ramBody: $("#ram-body"),
  hdBody: $("#hd-body"),
  cacheBody: $("#cache-body"),
  logContent: $("#log-content"),
  outputContent: $("#output-content"),
  selOp: $("#sel-op"),
  dynFields: $("#dyn-fields"),
  btnExec: $("#btn-exec"),
  btnAuto: $("#btn-auto"),
  btnReset: $("#btn-reset"),
  btnClearLog: $("#btn-clear-log"),
  speedRange: $("#speed-range"),
  speedLabel: $("#speed-label"),
  ulaOp: $("#ula-op"),
  ulaA: $("#ula-a"),
  ulaB: $("#ula-b"),
  ulaResult: $("#ula-result"),
};

// ===== INICIALIZAÇÃO =====
function init() {
  renderRAM();
  renderHD();
  renderCache();
  updateRegistersUI();
  setupDynFields();
  setupEvents();
  log("Sistema inicializado. Selecione uma operação no painel de controle.", "info");
}

// ===== RENDERIZAÇÃO =====
function renderRAM() {
  DOM.ramBody.innerHTML = SIM.ram
    .map(
      (v, i) =>
        `<tr data-ram="${i}"><td class="mem-addr">0x${i.toString(16).toUpperCase().padStart(2, "0")}</td><td class="mem-val">${v}</td></tr>`
    )
    .join("");
}

function renderHD() {
  DOM.hdBody.innerHTML = SIM.hd
    .map(
      (v, i) =>
        `<tr data-hd="${i}"><td class="mem-addr">Setor ${i}</td><td class="mem-val">${v}</td></tr>`
    )
    .join("");
}

function renderCache() {
  const rows = SIM.cache
    .map((c, i) => {
      const status = c.valid
        ? '<span class="cache-status cache-hit">válido</span>'
        : '<span class="cache-status">vazio</span>';
      return `<tr data-cache="${i}"><td class="mem-addr">${i}</td><td class="cache-tag">${c.tag !== null ? "0x" + c.tag.toString(16).toUpperCase().padStart(2, "0") : "—"}</td><td class="mem-val">${c.value !== null ? c.value : "—"}</td><td>${status}</td></tr>`;
    })
    .join("");
  DOM.cacheBody.innerHTML = rows;
}

function updateRegistersUI() {
  for (const r of ["R0", "R1", "R2", "R3"]) {
    $(`#reg-${r}`).textContent = SIM.registers[r];
  }
}

function updateClock() {
  SIM.clock++;
  DOM.clockCount.textContent = SIM.clock;
}

// ===== LOG =====
function log(msg, type = "info") {
  const div = document.createElement("div");
  div.className = `log-entry ${type}`;
  if (type === "step") {
    div.innerHTML = `<span class="log-step-num">⏱</span> ${msg}`;
  } else {
    div.innerHTML = msg;
  }
  DOM.logContent.prepend(div);
}

// ===== HIGHLIGHT DE COMPONENTES =====
function highlightComp(id, on = true) {
  const el = document.getElementById(id);
  if (el) on ? el.classList.add("active") : el.classList.remove("active");
}

function highlightReg(name, on = true) {
  const cell = document.querySelector(`.reg-cell[data-reg="${name}"]`);
  if (cell) on ? cell.classList.add("active") : cell.classList.remove("active");
}

function highlightRAMRow(addr, on = true) {
  const row = document.querySelector(`tr[data-ram="${addr}"]`);
  if (row) on ? row.classList.add("active") : row.classList.remove("active");
}

function highlightHDRow(sector, on = true) {
  const row = document.querySelector(`tr[data-hd="${sector}"]`);
  if (row) on ? row.classList.add("active") : row.classList.remove("active");
}

function highlightCacheRow(line, on = true) {
  const row = document.querySelector(`tr[data-cache="${line}"]`);
  if (row) on ? row.classList.add("active") : row.classList.remove("active");
}

function highlightBus(id, on = true) {
  const el = document.getElementById(id);
  if (el) on ? el.classList.add("active") : el.classList.remove("active");
}

function clearAllHighlights() {
  $$(".active").forEach((el) => el.classList.remove("active"));
}

// ===== ANIMAÇÃO: DATA PACKET =====
function animateDataPacket(fromId, toId, value) {
  return new Promise((resolve) => {
    const fromEl = document.getElementById(fromId) || document.querySelector(`[data-reg="${fromId}"]`) || document.querySelector(`tr[data-ram="${fromId}"]`);
    const toEl = document.getElementById(toId) || document.querySelector(`[data-reg="${toId}"]`) || document.querySelector(`tr[data-ram="${toId}"]`);
    if (!fromEl || !toEl) { resolve(); return; }

    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const packet = document.createElement("div");
    packet.className = "data-packet";
    packet.textContent = value;
    document.body.appendChild(packet);

    const startX = fromRect.left + fromRect.width / 2 - 14;
    const startY = fromRect.top + fromRect.height / 2 - 14;
    const endX = toRect.left + toRect.width / 2 - 14;
    const endY = toRect.top + toRect.height / 2 - 14;

    packet.style.left = startX + "px";
    packet.style.top = startY + "px";
    packet.style.transition = `left ${SIM.speed}ms ease-in-out, top ${SIM.speed}ms ease-in-out`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        packet.style.left = endX + "px";
        packet.style.top = endY + "px";
      });
    });

    setTimeout(() => {
      packet.remove();
      resolve();
    }, SIM.speed + 50);
  });
}

// ===== MICRO-PASSO: executar com delay =====
function step(fn) {
  return new Promise((resolve) => {
    fn();
    updateClock();
    setTimeout(resolve, SIM.speed);
  });
}

// ===== CACHE: mapeamento direto simplificado =====
function cacheLine(addr) {
  return addr % 4;
}

function cacheRead(addr) {
  const line = cacheLine(addr);
  const c = SIM.cache[line];
  if (c.valid && c.tag === addr) {
    return { hit: true, value: c.value, line };
  }
  // miss: carrega da RAM
  c.valid = true;
  c.tag = addr;
  c.value = SIM.ram[addr];
  return { hit: false, value: c.value, line };
}

function cacheWrite(addr, value) {
  const line = cacheLine(addr);
  SIM.cache[line] = { valid: true, tag: addr, value };
  SIM.ram[addr] = value; // write-through
}

// ===== OPERAÇÕES =====

async function opLoadMem(addr, value) {
  clearAllHighlights();
  await step(() => {
    log(`📥 <b>LOAD_MEM</b>: Escrevendo valor <b>${value}</b> no endereço <b>0x${addr.toString(16).toUpperCase().padStart(2,"0")}</b> da RAM`, "step");
    highlightComp("ram");
    highlightRAMRow(addr);
  });
  await step(() => {
    SIM.ram[addr] = value;
    cacheWrite(addr, value);
    renderRAM();
    renderCache();
    highlightRAMRow(addr);
    log(`✅ Valor <b>${value}</b> armazenado na RAM[0x${addr.toString(16).toUpperCase().padStart(2,"0")}]`, "success");
  });
  setOutput(value);
  clearAllHighlights();
}

async function opMemToReg(addr, reg) {
  clearAllHighlights();
  // 1. Buscar na cache
  await step(() => {
    log(`📤 <b>MEM→REG</b>: Buscando RAM[0x${addr.toString(16).toUpperCase().padStart(2,"0")}] → ${reg}`, "step");
    highlightComp("cache");
    highlightComp("ram");
    highlightRAMRow(addr);
  });
  const cr = cacheRead(addr);
  await step(() => {
    highlightCacheRow(cr.line);
    if (cr.hit) {
      log(`⚡ Cache HIT na linha ${cr.line}! Valor obtido da cache.`, "success");
    } else {
      log(`❌ Cache MISS na linha ${cr.line}. Valor carregado da RAM para a cache.`, "warn");
    }
    renderCache();
  });
  // 2. Animar dado viajando
  highlightBus("bus-cpu-cache");
  await animateDataPacket("ram", "registers", cr.value);
  // 3. Gravar no registrador
  await step(() => {
    SIM.registers[reg] = cr.value;
    updateRegistersUI();
    highlightReg(reg);
    log(`✅ Valor <b>${cr.value}</b> carregado em <b>${reg}</b>`, "success");
  });
  setOutput(cr.value);
  clearAllHighlights();
}

async function opRegToMem(reg, addr) {
  clearAllHighlights();
  const value = SIM.registers[reg];
  await step(() => {
    log(`📤 <b>REG→MEM</b>: Movendo ${reg}(${value}) → RAM[0x${addr.toString(16).toUpperCase().padStart(2,"0")}]`, "step");
    highlightReg(reg);
    highlightComp("registers");
  });
  highlightBus("bus-cpu-cache");
  await animateDataPacket("registers", "ram", value);
  await step(() => {
    cacheWrite(addr, value);
    renderRAM();
    renderCache();
    highlightRAMRow(addr);
    highlightComp("ram");
    log(`✅ Valor <b>${value}</b> armazenado em RAM[0x${addr.toString(16).toUpperCase().padStart(2,"0")}]`, "success");
  });
  setOutput(value);
  clearAllHighlights();
}

async function opALU(operation, ra, rb, rdest) {
  clearAllHighlights();
  const a = SIM.registers[ra];
  const isUnary = operation === "NOT";
  const b = isUnary ? 0 : SIM.registers[rb];
  let result;

  // 1. Buscar operandos
  await step(() => {
    log(`🔢 <b>${operation}</b>: Enviando operandos para a ULA`, "step");
    highlightReg(ra);
    if (!isUnary) highlightReg(rb);
    highlightComp("registers");
  });

  // 2. Animar dados indo para ULA
  highlightBus("bus-cpu-cache");
  await animateDataPacket("registers", "ula", a);
  if (!isUnary) await animateDataPacket("registers", "ula", b);

  // 3. Calcular
  await step(() => {
    highlightComp("ula");
    DOM.ulaA.textContent = a;
    DOM.ulaB.textContent = isUnary ? "—" : b;
    DOM.ulaOp.textContent = operation;

    switch (operation) {
      case "ADD": result = a + b; break;
      case "SUB": result = a - b; break;
      case "AND": result = a & b; break;
      case "OR":  result = a | b; break;
      case "NOT": result = ~a & 0xFF; break;
    }
    DOM.ulaResult.textContent = `Resultado: ${result}`;
    log(`⚙️ ULA executou: ${a} ${operation} ${isUnary ? "" : b} = <b>${result}</b>`, "step");
  });

  // 4. Resultado → registrador
  await animateDataPacket("ula", "registers", result);
  await step(() => {
    SIM.registers[rdest] = result;
    updateRegistersUI();
    highlightReg(rdest);
    log(`✅ Resultado <b>${result}</b> armazenado em <b>${rdest}</b>`, "success");
  });
  setOutput(result);
  clearAllHighlights();
}

async function opSaveHD(ramAddr, sector) {
  clearAllHighlights();
  const value = SIM.ram[ramAddr];
  await step(() => {
    log(`💾 <b>SAVE_HD</b>: RAM[0x${ramAddr.toString(16).toUpperCase().padStart(2,"0")}](${value}) → HD Setor ${sector}`, "step");
    highlightComp("ram");
    highlightRAMRow(ramAddr);
  });
  highlightBus("bus-ram-hd");
  await animateDataPacket("ram", "hd", value);
  await step(() => {
    SIM.hd[sector] = value;
    renderHD();
    highlightComp("hd");
    highlightHDRow(sector);
    log(`✅ Valor <b>${value}</b> gravado no HD, Setor ${sector}`, "success");
  });
  setOutput(value);
  clearAllHighlights();
}

async function opLoadHD(sector, ramAddr) {
  clearAllHighlights();
  const value = SIM.hd[sector];
  await step(() => {
    log(`💾 <b>LOAD_HD</b>: HD Setor ${sector}(${value}) → RAM[0x${ramAddr.toString(16).toUpperCase().padStart(2,"0")}]`, "step");
    highlightComp("hd");
    highlightHDRow(sector);
  });
  highlightBus("bus-ram-hd");
  await animateDataPacket("hd", "ram", value);
  await step(() => {
    SIM.ram[ramAddr] = value;
    cacheWrite(ramAddr, value);
    renderRAM();
    renderCache();
    highlightComp("ram");
    highlightRAMRow(ramAddr);
    log(`✅ Valor <b>${value}</b> recuperado do HD para RAM[0x${ramAddr.toString(16).toUpperCase().padStart(2,"0")}]`, "success");
  });
  setOutput(value);
  clearAllHighlights();
}

// ===== OUTPUT =====
function setOutput(val) {
  DOM.outputContent.textContent = val;
  DOM.outputContent.style.animation = "none";
  requestAnimationFrame(() => {
    DOM.outputContent.style.animation = "fadeIn .4s ease";
  });
}

// ===== CAMPOS DINÂMICOS =====
function setupDynFields() {
  DOM.selOp.addEventListener("change", renderDynFields);
  renderDynFields();
}

function renderDynFields() {
  const op = DOM.selOp.value;
  let html = "";
  const regs = `<option>R0</option><option>R1</option><option>R2</option><option>R3</option>`;
  const addrs = SIM.ram.map((_, i) => `<option value="${i}">0x${i.toString(16).toUpperCase().padStart(2, "0")}</option>`).join("");
  const sectors = SIM.hd.map((_, i) => `<option value="${i}">Setor ${i}</option>`).join("");

  switch (op) {
    case "LOAD_MEM":
      html = `<label>Endereço RAM</label><select id="f-addr">${addrs}</select>
              <label>Valor</label><input type="number" id="f-value" value="0">`;
      break;
    case "MEM_TO_REG":
      html = `<label>Endereço RAM</label><select id="f-addr">${addrs}</select>
              <label>Registrador destino</label><select id="f-reg">${regs}</select>`;
      break;
    case "REG_TO_MEM":
      html = `<label>Registrador fonte</label><select id="f-reg">${regs}</select>
              <label>Endereço RAM destino</label><select id="f-addr">${addrs}</select>`;
      break;
    case "ADD": case "SUB": case "AND": case "OR":
      html = `<div class="dyn-fields"><div><label>Reg A</label><select id="f-ra">${regs}</select></div>
              <div><label>Reg B</label><select id="f-rb">${regs}</select></div></div>
              <label>Reg Destino</label><select id="f-rdest">${regs}</select>`;
      break;
    case "NOT":
      html = `<label>Registrador fonte</label><select id="f-ra">${regs}</select>
              <label>Reg Destino</label><select id="f-rdest">${regs}</select>`;
      break;
    case "SAVE_HD":
      html = `<label>Endereço RAM fonte</label><select id="f-addr">${addrs}</select>
              <label>Setor HD destino</label><select id="f-sector">${sectors}</select>`;
      break;
    case "LOAD_HD":
      html = `<label>Setor HD fonte</label><select id="f-sector">${sectors}</select>
              <label>Endereço RAM destino</label><select id="f-addr">${addrs}</select>`;
      break;
  }
  DOM.dynFields.innerHTML = html;
}

// ===== EXECUÇÃO =====
async function executeOp() {
  if (SIM.running) return;
  SIM.running = true;
  DOM.btnExec.disabled = true;
  DOM.btnAuto.disabled = true;

  const op = DOM.selOp.value;
  try {
    switch (op) {
      case "LOAD_MEM":
        await opLoadMem(parseInt($("#f-addr").value), parseInt($("#f-value").value) || 0);
        break;
      case "MEM_TO_REG":
        await opMemToReg(parseInt($("#f-addr").value), $("#f-reg").value);
        break;
      case "REG_TO_MEM":
        await opRegToMem($("#f-reg").value, parseInt($("#f-addr").value));
        break;
      case "ADD": case "SUB": case "AND": case "OR":
        await opALU(op, $("#f-ra").value, $("#f-rb").value, $("#f-rdest").value);
        break;
      case "NOT":
        await opALU("NOT", $("#f-ra").value, "R0", $("#f-rdest").value);
        break;
      case "SAVE_HD":
        await opSaveHD(parseInt($("#f-addr").value), parseInt($("#f-sector").value));
        break;
      case "LOAD_HD":
        await opLoadHD(parseInt($("#f-sector").value), parseInt($("#f-addr").value));
        break;
    }
  } catch (e) {
    log(`❌ Erro: ${e.message}`, "warn");
  }
  SIM.running = false;
  DOM.btnExec.disabled = false;
  DOM.btnAuto.disabled = false;
}

// Fluxo automático: demonstra o exemplo completo da especificação
async function autoDemo() {
  if (SIM.running) return;
  log("🚀 <b>EXECUÇÃO AUTOMÁTICA</b>: Demonstração do fluxo completo", "info");

  SIM.running = true;
  DOM.btnExec.disabled = true;
  DOM.btnAuto.disabled = true;

  try {
    // 1. Inserir dois valores na RAM
    await opLoadMem(0, 25);
    await opLoadMem(1, 17);
    // 2. Carregar para registradores
    await opMemToReg(0, "R0");
    await opMemToReg(1, "R1");
    // 3. Somar via ULA
    await opALU("ADD", "R0", "R1", "R2");
    // 4. Resultado → RAM
    await opRegToMem("R2", 2);
    // 5. Gravar no HD
    await opSaveHD(2, 0);
    // 6. Recuperar do HD
    await opLoadHD(0, 3);

    log("🎉 <b>Fluxo completo finalizado com sucesso!</b>", "success");
  } catch (e) {
    log(`❌ Erro na demo: ${e.message}`, "warn");
  }

  SIM.running = false;
  DOM.btnExec.disabled = false;
  DOM.btnAuto.disabled = false;
}

// ===== RESET =====
function resetSim() {
  SIM.registers = { R0: 0, R1: 0, R2: 0, R3: 0 };
  SIM.ram.fill(0);
  SIM.hd.fill(0);
  SIM.cache = SIM.cache.map(() => ({ valid: false, tag: null, value: null }));
  SIM.clock = 0;
  DOM.clockCount.textContent = "0";
  DOM.ulaOp.textContent = "—";
  DOM.ulaA.textContent = "—";
  DOM.ulaB.textContent = "—";
  DOM.ulaResult.textContent = "Resultado: —";
  DOM.outputContent.textContent = "—";
  renderRAM();
  renderHD();
  renderCache();
  updateRegistersUI();
  clearAllHighlights();
  log("🔄 Simulador resetado.", "info");
}

// ===== EVENTOS =====
function setupEvents() {
  DOM.btnExec.addEventListener("click", executeOp);
  DOM.btnAuto.addEventListener("click", autoDemo);
  DOM.btnReset.addEventListener("click", resetSim);
  DOM.btnClearLog.addEventListener("click", () => {
    DOM.logContent.innerHTML = "";
  });
  DOM.speedRange.addEventListener("input", () => {
    SIM.speed = parseInt(DOM.speedRange.value);
    DOM.speedLabel.textContent = SIM.speed + "ms";
  });
}

// ===== INICIAR =====
document.addEventListener("DOMContentLoaded", init);
