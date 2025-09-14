function renderTasktoBoard(task, id) {
    const taskHTML = `
        <div class="task-card" data-id="${id}">
            <p class="category">${task.category}</p>
            <h3>${task.title}</h3>
            <p class="description">${task.description}</p>
            <p><strong>Due:</strong> ${task.dueDate}</p>
            
            <p><strong>Priority:</strong> ${task.priority}</p>
            ${task.subtask ? `<p><strong>Subtask:</strong> ${task.subtask}</p>` : ""}
        </div>
    `;

    // Spalte anhand Status
    const column = document.getElementById(task.status);
    if (!column) return;

    column.classList.remove("d-none");
    column.insertAdjacentHTML("beforeend", taskHTML);

    // Placeholder ausblenden
    if (task.status === "todo") document.getElementById("placeholder-1").classList.add("d-none");
    if (task.status === "progress") document.getElementById("placeholder-2").classList.add("d-none");
    if (task.status === "feedback") document.getElementById("placeholder-3").classList.add("d-none");
    if (task.status === "done") document.getElementById("placeholder-4").classList.add("d-none");
}

