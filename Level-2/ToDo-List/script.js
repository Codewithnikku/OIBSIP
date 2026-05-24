let tasks = JSON.parse(localStorage.getItem("td_bx") || "[]");
let prio = "low";

function save() {
  localStorage.setItem("td_bx", JSON.stringify(tasks));
}

function setPrio(btn) {
  document.querySelectorAll(".pb").forEach((b) => (b.className = "pb"));
  btn.classList.add("a-" + btn.dataset.p);
  prio = btn.dataset.p;
}

function fmt(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function addTask() {
  const ti = document.getElementById("inp-title");
  const di = document.getElementById("inp-desc");
  const t = ti.value.trim();

  ti.classList.remove("err");
  if (!t) {
    ti.classList.add("err");
    const fw = document.getElementById("fw-title");
    fw.classList.add("shake");
    setTimeout(() => fw.classList.remove("shake"), 320);
    ti.focus();
    return;
  }

  tasks.unshift({
    id: Date.now(),
    title: t,
    desc: di.value.trim(),
    done: false,
    prio,
    addedAt: new Date().toISOString(),
    doneAt: null,
  });
  ti.value = "";
  di.value = "";
  save();
  render();
}

function del(id) {
  const c = document.getElementById("c" + id);
  if (c) {
    c.classList.add("removing");
    setTimeout(() => {
      tasks = tasks.filter((x) => x.id !== id);
      save();
      render();
    }, 280);
  }
}

function toggle(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  t.done = !t.done;
  t.doneAt = t.done ? new Date().toISOString() : null;
  save();
  render();
}

function startEdit(id) {
  document.querySelectorAll(".ie").forEach((e) => e.classList.remove("open"));
  const ie = document.getElementById("ie" + id);
  const t = tasks.find((x) => x.id === id);
  ie.querySelector(".et").value = t.title;
  ie.querySelector(".ed").value = t.desc || "";
  ie.classList.add("open");
  ie.querySelector(".et").focus();
}

function saveEdit(id) {
  const ie = document.getElementById("ie" + id);
  const nt = ie.querySelector(".et").value.trim();
  if (!nt) return;
  const t = tasks.find((x) => x.id === id);
  t.title = nt;
  t.desc = ie.querySelector(".ed").value.trim();
  ie.classList.remove("open");
  save();
  render();
}

function cancelEdit(id) {
  document.getElementById("ie" + id).classList.remove("open");
}

function esc(s) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const prioMap = { low: "Low", med: "Med", high: "High" };
const prioClass = { low: "pl", med: "pm", high: "ph" };

function cardHTML(t) {
  const p = t.prio || "low";
  return `<div class="task-card ${prioClass[p]} ${t.done ? "done" : ""}" id="c${t.id}">
    <div class="ck ${t.done ? "on" : ""}" onclick="toggle(${t.id})"><i class='bx bx-check'></i></div>
    <div class="tb">
      <div class="tt">${esc(t.title)}</div>
      ${t.desc ? `<div class="td">${esc(t.desc)}</div>` : ""}
      <div class="tmeta">
        <span class="pchip ${p}">${prioMap[p]}</span>
        <span class="mc"><i class='bx bx-calendar-plus'></i>${fmt(t.addedAt)}</span>
        ${t.doneAt ? `<span class="mc"><i class='bx bx-check-circle'></i>${fmt(t.doneAt)}</span>` : ""}
      </div>
      <div class="ie" id="ie${t.id}">
        <input class="et" placeholder="Title" maxlength="120" onkeydown="if(event.key==='Enter')saveEdit(${t.id})"/>
        <textarea class="ed" placeholder="Description…"></textarea>
        <div class="ie-acts">
          <button class="ie-save" onclick="saveEdit(${t.id})">Save</button>
          <button class="ie-cancel" onclick="cancelEdit(${t.id})">Cancel</button>
        </div>
      </div>
    </div>
    <div class="ta">
      <button class="ab" onclick="startEdit(${t.id})" title="Edit"><i class='bx bx-edit-alt'></i></button>
      <button class="ab del" onclick="del(${t.id})" title="Delete"><i class='bx bx-trash'></i></button>
    </div>
  </div>`;
}

function emptyHTML(msg, icon) {
  return `<div class="empty"><i class='bx ${icon}'></i>${msg}</div>`;
}

function render() {
  const pending = tasks.filter((x) => !x.done);
  const done = tasks.filter((x) => x.done);

  document.getElementById("s-total").textContent = tasks.length;
  document.getElementById("s-pending").textContent = pending.length;
  document.getElementById("s-done").textContent = done.length;
  document.getElementById("cnt-pending").textContent = pending.length;
  document.getElementById("cnt-done").textContent = done.length;

  document.getElementById("list-pending").innerHTML = pending.length
    ? pending.map(cardHTML).join("")
    : emptyHTML("No pending tasks — you're all caught up!", "bx-smile");

  document.getElementById("list-done").innerHTML = done.length
    ? done.map(cardHTML).join("")
    : emptyHTML("No completed tasks yet", "bx-time");
}

document.getElementById("inp-title").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
render();
