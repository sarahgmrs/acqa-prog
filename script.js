// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    let tasks = [];
  
    // Adicionar uma nova tarefa
    addTaskBtn.addEventListener("click", () => {
      const taskName = taskInput.value.trim();
      if (taskName) {
        tasks.push({ id: Date.now(), name: taskName, completed: false });
        taskInput.value = "";
        renderTasks();
      }
    });
  
    // Marcar tarefa como concluída ou excluir
    taskList.addEventListener("click", (e) => {
      const taskId = e.target.dataset.id;
  
      // Marcar como concluída
      if (e.target.type === "checkbox") {
        tasks = tasks.map((task) =>
          task.id === parseInt(taskId) ? { ...task, completed: !task.completed } : task
        );
      }
  
      // Excluir tarefa
      if (e.target.classList.contains("delete-btn")) {
        tasks = tasks.filter((task) => task.id !== parseInt(taskId));
      }
  
      renderTasks();
    });
  
    // Filtros de tarefas
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        renderTasks(filter);
      });
    });
  
    // Renderizar tarefas na lista
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
  
      const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      });
  
      filteredTasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = `task-item ${task.completed ? "completed" : ""}`;
  
        listItem.innerHTML = `
          <span>${task.name}</span>
          <div>
            <input type="checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}>
            <button class="delete-btn" data-id="${task.id}">Excluir</button>
          </div>
        `;
  
        taskList.appendChild(listItem);
      });
    }
  });
  