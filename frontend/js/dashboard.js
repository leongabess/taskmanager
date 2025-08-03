const token = localStorage.getItem("token");
if (!token) {
  alert("Você precisa estar logado.");
  window.location.href = "login.html";
}


// Carrega as tarefas ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
  carregarTarefas();
});

// Exibe o nome de usuário no dashboard
document.getElementById("username").textContent = localStorage.getItem("username");

// Adiciona nova tarefa
document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskTitle = document.getElementById("newTask").value;
  const taskDescription = document.getElementById("descriptionTask").value;
  const taskStatus = document.getElementById("statusTask").value;

  //const response = await fetch("http://localhost:5000/api/tasks", 
  const response = await fetch(`${window.apiBaseUrl}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title: taskTitle, description: taskDescription, status: taskStatus })
  });

  if (response.ok) {
    document.getElementById("newTask").value = "";
    carregarTarefas();
  } else {
    alert("Erro ao adicionar tarefa.");
  }
});

// Funções auxiliares para manipulação de tarefas

async function carregarTarefas() {
  //const res = await fetch("http://localhost:5000/api/tasks", 
  const res = await fetch(`${window.apiBaseUrl}/api/tasks`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const lista = document.getElementById("taskList");
  lista.innerHTML = "";

  if (!res.ok) return alert("Erro ao carregar tarefas.");

  const tasks = await res.json();

  const filtroSelecionado = document.getElementById("filtroStatus").value;

  const tarefasFiltradas = filtroSelecionado === "todos"
    ? tasks
    : tasks.filter(task => task.status === filtroSelecionado);

  if (tarefasFiltradas.length === 0) {
    lista.innerHTML = "<p style='text-align:center;color:#aaa'>Nenhuma tarefa encontrada.</p>";
    return;
  }

  tarefasFiltradas.forEach(task => {
    const card = criarCardTarefa(task);
    lista.appendChild(card);
  });
}
document.getElementById("filtroStatus").addEventListener("change", () => {
  carregarTarefas();
});


function criarCardTarefa(task) {
  const li = criarElementoComClasse("li", "task-card");

  const content = criarElementoComClasse("div", "task-content");
  content.appendChild(criarElementoComClasse("p", "task-title", task.title));
  content.appendChild(criarElementoComClasse("p", "task-desc", task.description));

  const statusText = criarElementoComClasse("p", "task-status");
  statusText.innerHTML = `Status: <span>${task.status}</span>`;
  content.appendChild(statusText);

  const actions = criarElementoComClasse("div", "task-actions");
  const select = criarSelectStatus(task.status);
  const btnAtualizar = criarBotao("&#10004;", "Atualizar status", () => {
    atualizarStatus(task.id, select.value);
  });
  const btnExcluir = criarBotao("&#10006;", "Excluir tarefa", () => {
    deletarTarefa(task.id);
  });

  actions.append(select, btnAtualizar, btnExcluir);
  li.append(content, actions);
  return li;
}

function criarElementoComClasse(tag, classe, texto = "") {
  const el = document.createElement(tag);
  el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}

function criarSelectStatus(statusAtual) {
  const select = document.createElement("select");
  select.className = "status-select";
  const opcoes = ["pendente", "em progresso", "concluída"];

  opcoes.forEach(opcao => {
    const option = document.createElement("option");
    option.value = opcao;
    option.text = opcao;
    if (opcao === statusAtual) option.selected = true;
    select.appendChild(option);
  });

  return select;
}

// Função para criar botões reutilizáveis
function criarBotao(innerHTML, title, onClick) {
  const btn = document.createElement("button");
  btn.innerHTML = innerHTML;
  btn.title = title;
  btn.addEventListener("click", onClick);
  return btn;
}

// Funções para manipulação de tarefas
async function deletarTarefa(id) {
  const confirmacao = confirm("Tem certeza que deseja excluir esta tarefa?");
  if (!confirmacao) return;

  //const response = await fetch(`http://localhost:5000/api/tasks/${id}`, 
  const response = await fetch(`${window.apiBaseUrl}/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (response.ok) {
    carregarTarefas();
  } else {
    alert("Erro ao excluir tarefa.");
  }
}

async function atualizarStatus(id, novoStatus) {
  //const response = await fetch(`http://localhost:5000/api/tasks/${id}`, 
  const response = await fetch(`${window.apiBaseUrl}/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status: novoStatus })
  });

  if (response.ok) {
    carregarTarefas();
  } else {
    alert("Erro ao atualizar status da tarefa.");
  }
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});


