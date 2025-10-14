
const prioImage = {
  urgent: "../img/urgent.svg",
  medium: "../img/medium.svg",
  low: "../img/low.svg"
};


// function renderTasktoBoard(task, id) {

//   const assignedHTML = task.assigned?.length
//     ? `<div class="assigned-symbols pa">${task.assigned.map(c =>
//         `<div class="assigned-symbol task-avatar" style="background-color:${c.color}">${c.init}</div>`
//       ).join("")}</div>` : "";

//       const subtaskHTML = task.subtasks && Object.keys(task.subtasks).length
//   ? `<ul>${Object.values(task.subtasks).map(st => `<li>${st}</li>`).join("")}</ul>` 
//   : "";


//   const taskHTML = `
//     <div onclick="ticketBigView('${id}')" class="task-card" data-id="${id}">
//       <p class="category ${checkBG(task.category)}">${task.category}</p>
//       <h3>${task.title}</h3>
//       <p class="description preview">${task.description}</p>

//       <div id="board-task-subtask-${id}" class="board-task-subtask">
//         <p id="beam-${id}" class="board-task-subtask-beam"></p>
//         <p id="board-task-subtask-numb" class="board-task-subtask-numb">
//         /${task.subtasks?.length} Subtasks
//         </p>
//       </div>
      

//       <div class="prio-wrapper">
//         <p>${assignedHTML}</p>
//         <p class="prio-img"><img src="${prioImage[task.priority]}"></p>
//       </div>
      
//     </div>`;

    


//   const column = document.getElementById(task.status);
//   if (column) {
//     column.classList.remove("d-none");
//     column.insertAdjacentHTML("beforeend", taskHTML);
//     document.getElementById(`placeholder-${["todo","progress","feedback","done"].indexOf(task.status)+1}`).classList.add("d-none");
//   } 

//   subtasksAvailable(task, id);
//   checkSubtaskBeam(task,id);
// }
function renderTasktoBoard(task, id) {

  const assignedHTML = task.assigned?.length
    ? `<div class="assigned-symbols pa">${task.assigned.map(c =>
        `<div class="assigned-symbol task-avatar" style="background-color:${c.color}">${c.init}</div>`
      ).join("")}</div>` : "";

      const subtaskHTML = task.subtasks && Object.keys(task.subtasks).length
  ? `<ul>${Object.values(task.subtasks).map(st => `<li>${st}</li>`).join("")}</ul>` 
  : "";

  const doneCount = task.subtasks?.filter(st => st.done).length || 0;

  const taskHTML = `
    <div onclick="ticketBigView('${id}')" class="task-card" data-id="${id}" 
      draggable="true" ondragstart="startDragging('${id}')">
      <p class="category ${checkBG(task.category)}">${task.category}</p>
      <h3>${task.title}</h3>
      <p class="description preview">${task.description}</p>

      <div id="board-task-subtask-${id}" class="board-task-subtask">
        <p id="beam-${id}" class="board-task-subtask-beam"></p>
        <p id="board-task-subtask-numb" class="board-task-subtask-numb">
          ${doneCount}/${task.subtasks?.length} Subtasks
        </p>
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
    if (!beamRef || !task.subtasks || task.subtasks.length === 0) return;

    // Berechne den Anteil der erledigten Subtasks
    const total = task.subtasks.length;
    const done = task.subtasks.filter(st => st.done).length;
    const percentage = (done / total) * 100;

    // Setze dynamisch die Breite des ::after Pseudoelements
    beamRef.style.setProperty('--progress-width', `${percentage}%`);
}


function checkBG(category){
  if (category === "User Story"){
    return "bg-user-story";
  }
  if (category === "Technical Task"){
    return "bg-technical-task";
  }
  return "";
}


///////////////////////////drag and drop/////////////////////////////////////////////////////
let currentDraggedElement;


function allowDrop(ev){
  ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}


async function moveTo(status) {
  tasks[currentDraggedElement].status = status;
  await saveData("tasks", tasks);
  refreshBoard();
}


function refreshBoard() {
  // Alles leeren
  ["todo", "progress", "feedback", "done"].forEach(col => {
    const column = document.getElementById(col);
    const placeholder = document.getElementById(
      `placeholder-${["todo","progress","feedback","done"].indexOf(col)+1}`
    );

    column.innerHTML = "";
    placeholder.classList.remove("d-none");
  });

  Object.entries(tasks).forEach(([id, task]) => renderTasktoBoard(task, id));
}


async function saveData(key, data) {
  const dbPath = `${BASE_URL}/${key}.json`;
  await fetch(dbPath, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}
