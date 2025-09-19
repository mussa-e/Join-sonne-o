
const prioImage = {
  urgent: "../img/urgent.svg",
  medium: "../img/medium.svg",
  low: "../img/low.svg"
};


function renderTasktoBoard(task, id) {

  const assignedHTML = task.assigned?.length
    ? `<div class="assigned-symbols pa">${task.assigned.map(c =>
        `<div class="assigned-symbol task-avatar" style="background-color:${c.color}">${c.init}</div>`
      ).join("")}</div>` : "";

      const subtaskHTML = task.subtasks && Object.keys(task.subtasks).length
  ? `<ul>${Object.values(task.subtasks).map(st => `<li>${st}</li>`).join("")}</ul>` 
  : "";


  const taskHTML = `
    <div class="task-card" data-id="${id}">
      <p class="category">${task.category}</p>
      <h3>${task.title}</h3>
      <p class="description">${task.description}</p>

      <div id="board-task-subtask-${id}" class="board-task-subtask">
        <p id="beam-${id}" class="board-task-subtask-beam"></p>
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

  subtasksAvailable(task, id);
  checkSubtaskBeam(task,id);
}


function subtasksAvailable(task,id) {
  let subtaskDiv = document.getElementById(`board-task-subtask-${id}`);

  if (task.subtasks?.length > 0) {
    subtaskDiv.style.display = "flex";
  } else {
    subtaskDiv.style.display = "none";
  }
}

function checkSubtaskBeam(task, id) {
  const beamRef = document.getElementById(`beam-${id}`);

  beamRef.classList.remove("half", "full");

  if (task.subtasks?.length === 1) {
    beamRef.classList.add("half");
  } else if (task.subtasks?.length === 2) {
    beamRef.classList.add("full");
  }
}