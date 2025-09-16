
const prioImage = {
  urgent: "../img/urgent.svg",
  medium: "../img/medium.svg",
  low: "../img/low.svg"
};


function renderTasktoBoard(task, id) {

  const assignedHTML = task.assigned?.length
    ? `<div class="assigned-symbols">${task.assigned.map(c =>
        `<div class="assigned-symbol task-avatar" style="background-color:${c.color}">${c.init}</div>`
      ).join("")}</div>` : "";

  // const subtaskHTML = task.subtasks?.length
  //   ? `<ul>${task.subtasks.map(st => `<li>${st}</li>`).join("")}</ul>` : "";
      const subtaskHTML = task.subtasks && Object.keys(task.subtasks).length
  ? `<ul>${Object.values(task.subtasks).map(st => `<li>${st}</li>`).join("")}</ul>` 
  : "";


  const taskHTML = `
    <div class="task-card" data-id="${id}">
      <p class="category">${task.category}</p>
      <h3>${task.title}</h3>
      <p class="description">${task.description}</p>

      <div id="board-task-subtask" class="board-task-subtask">
        <p class="board-task-subtask-beam"></p>
        <p id="board-task-subtask-numb" class="board-task-subtask-numb">${task.subtasks?.length}/2 Subtasks</p>
      </div>
      

      <div class="prio-wrapper">
        <p>${assignedHTML}</p>
        <p class="prio-img"><img src="${prioImage[task.priority]}"></p>
      </div>
      
    </div>`;


  const column = document.getElementById(task.status);
  if (column) {
    column.classList.remove("d-none");
    column.insertAdjacentHTML("beforeend", taskHTML);
    document.getElementById(`placeholder-${["todo","progress","feedback","done"].indexOf(task.status)+1}`).classList.add("d-none");
  }

  subtasksAvailable(task);
}


function subtasksAvailable(task) {
  let subtaskDiv = document.getElementById("board-task-subtask");

  if (task.subtasks?.length > 0) {
    subtaskDiv.style.display = "flex";
  } else {
    subtaskDiv.style.display = "none";
  }
}

