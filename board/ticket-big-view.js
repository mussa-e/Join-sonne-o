function ticketBigView(id){
    const t = tasks[id];
    const ticketPopup = document.getElementById("big-view-wrapper");
    ticketPopup.classList.add("show");
    ticketPopup.innerHTML = bigViewHTML(t, id);

    document.body.classList.add("no-scroll");
}


// function bigViewHTML(t, id){
//     return `
//             <div class="ticket-header">
//               <p class="ticket-category ${checkBG(t.category)}">${t.category}</p>
//               <div onclick="closeTicket()" class="ticket-close"><img src="../img/close-icon.svg"></div>
//             </div>

//             <div class="ticket-title">
//               ${t.title}
//             </div>

//             <div class="ticket-description">
//               ${t.description}
//             </div>

//             <div class="ticket-info">
//                 <div class="ticket-date">
//                 <p class="font-color">Due date:</p>
//                 <p>${formatDate(t.dueDate)}</p>
//                 </div>

//                 <div class="ticket-priority">
//                 <p class="font-color">Priority:</p>
//                 <p class="prio">${t.priority} <img src="${prioImage[t.priority]}"></p>
//                 </div>
//             </div>

//             <div class="ticket-assign-wrapper">
//                 <p class="ticket-assign">
//                   Assigned to:
//                 </p>

//                 <section class="user-init">
//                     ${t.assigned?.map(c=>`
//                         <div class="ticket-avatar-wrapper">
//                         <div class="ticket-avatar assigned-symbol task-avatar" style="background:${c.color}">${c.init}</div>
//                         <p>${c.name}</p>
//                         </div>`).join("")}
//                 </section>
//             </div>

//             <div class="ticket-subtask-wrapper">
//                 <p class="ticket-subtask">
//                   Subtasks
//                 </p>

//                 <section>
//                     ${t.subtasks?.map((st, i)=>
//                       `<div class="check-subtask">
//                         <img onclick="subtaskDone(${i})" 
//                         id="check-button-${i}" 
//                         src="../img/check-button.svg">
//                         <p>${st}</p>
//                       </div>`).join("")||""}
//                 </section>
//             </div>

//             <div class="ticket-footer-wrapper">
//               <section class="ticket-footer-wrapper-right">
//                 <div onclick="deleteTicket('${id}')" class="ticket-delete">
//                   <img src="../img/trash-ticket.svg">
//                   <p class="font-color">Delete</p>
//                 </div>

//                 <div class="ticket-line">
//                   <img src="../img/line-ticket.svg">
//                 </div>

//                 <div class="ticket-edit">
//                   <img src="../img/pencil-ticket.svg">
//                   <p class="font-color">Edit</p>
//                 </div>
//               </section>
//             </div>
    
//     `
// }
function bigViewHTML(t, id){
    return `
            <div class="ticket-header">
              <p class="ticket-category ${checkBG(t.category)}">${t.category}</p>
              <div onclick="closeTicket()" class="ticket-close"><img src="../img/close-icon.svg"></div>
            </div>

            <div class="ticket-title">
              ${t.title}
            </div>

            <div class="ticket-description">
              ${t.description}
            </div>

            <div class="ticket-info">
                <div class="ticket-date">
                <p class="font-color">Due date:</p>
                <p>${formatDate(t.dueDate)}</p>
                </div>

                <div class="ticket-priority">
                <p class="font-color">Priority:</p>
                <p class="prio">${t.priority} <img src="${prioImage[t.priority]}"></p>
                </div>
            </div>

            <div class="ticket-assign-wrapper">
                <p class="ticket-assign">
                  Assigned to:
                </p>

                <section class="user-init">
                    ${t.assigned?.map(c=>`
                        <div class="ticket-avatar-wrapper">
                        <div class="ticket-avatar assigned-symbol task-avatar" style="background:${c.color}">${c.init}</div>
                        <p>${c.name}</p>
                        </div>`).join("")}
                </section>
            </div>

            <div class="ticket-subtask-wrapper">
                <p class="ticket-subtask">
                  Subtasks
                </p>

                <section>
                    ${t.subtasks?.map((st, i)=>
                    `<div class="check-subtask">
                      <img onclick="subtaskDone('${id}', ${i})" 
                          id="check-button-${id}-${i}" 
                          src="../img/${st.done ? "clicked-black.svg" : "check-button.svg"}">
                      <p>${st.title}</p>
                    </div>`
                  ).join("") || ""}
                </section>
            </div>

            <div class="ticket-footer-wrapper">
              <section class="ticket-footer-wrapper-right">
                <div onclick="deleteTicket('${id}')" class="ticket-delete">
                  <img src="../img/trash-ticket.svg">
                  <p class="font-color">Delete</p>
                </div>

                <div class="ticket-line">
                  <img src="../img/line-ticket.svg">
                </div>

                <div onclick="ticketEdit('${id}')" class="ticket-edit">
                  <img src="../img/pencil-ticket.svg">
                  <p class="font-color">Edit</p>
                </div>
              </section>
            </div>
    
    `
}


// async function subtaskDone(taskId, subtaskIndex) {
//     const task = tasks[taskId];
//     const subtask = task.subtasks[subtaskIndex];

//     // Toggle Status
//     subtask.done = !subtask.done;

//     // Bild wechseln
//     const img = document.getElementById(`check-button-${taskId}-${subtaskIndex}`);
//     img.src = subtask.done ? "../img/clicked-black.svg" : "../img/check-button.svg";

//     // Update in Firebase
//     // await postData(`tasks/${taskId}/subtasks/${subtaskIndex}`, subtask);
//     // Nur den done-Wert in Firebase überschreiben
//     await postData(`tasks/${taskId}/subtasks/${subtaskIndex}/done`, subtask.done);
    



//     // Lokale Kopie aktualisieren
//     tasks[taskId] = task;

//     // Optional: Board neu rendern (nur den Subtask-Beam aktualisieren)
//     checkSubtaskBeam(task, taskId);
// }
async function subtaskDone(taskId, subtaskIndex) {
    const task = tasks[taskId];
    const subtask = task.subtasks[subtaskIndex];

    // Toggle Status
    subtask.done = !subtask.done;

    // Bild wechseln
    const img = document.getElementById(`check-button-${taskId}-${subtaskIndex}`);
    img.src = subtask.done ? "../img/clicked-black.svg" : "../img/check-button.svg";

    // Update in Firebase (nur den done-Wert aktualisieren)
    await updateData(`tasks/${taskId}/subtasks/${subtaskIndex}`, { done: subtask.done });

    // Lokale Kopie aktualisieren
    tasks[taskId].subtasks[subtaskIndex] = subtask;

    // Optional: Board neu rendern (nur Subtask-Beam aktualisieren)
    checkSubtaskBeam(task, taskId);
    updateDoneCount(task, taskId);
}


// Update Board-Task Subtask-Anzeige live
function updateDoneCount(task,taskId){
  const subtaskNumb = document.querySelector(`#board-task-subtask-${taskId} .board-task-subtask-numb`);
  if (subtaskNumb) {
      const doneCount = task.subtasks.filter(st => st.done).length;
      subtaskNumb.textContent = `${doneCount}/${task.subtasks.length} Subtasks`;
}
}


function closeTicket(){
    const ticketPopup = document.getElementById("big-view-wrapper");
    ticketPopup.classList.remove("show");
    document.body.classList.remove("no-scroll");
}


function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

async function deleteTicket(id) {
    // 1. Task lokal löschen
    delete tasks[id];
    // 2. Server löschen
    await deleteData("tasks/" + id);
    // 3. UI updaten
    document.getElementById("big-view-wrapper").classList.remove("show");
    document.querySelector(`[data-id="${id}"]`)?.remove(); // Karte vom Board entfernen
    
    checkTasks();
}


async function deleteData(path="") {
    let response = await fetch(BASE_URL + path + ".json", {
        method:"DELETE",
    });
    return response.ok;
}


function checkTasks() {
  const sections = [
    { containerId: "todo",      placeholderId: "placeholder-1" },
    { containerId: "progress",  placeholderId: "placeholder-2" },
    { containerId: "feedback",  placeholderId: "placeholder-3" },
    { containerId: "done",      placeholderId: "placeholder-4" },
  ];

  sections.forEach(({ containerId, placeholderId }) => {
    const container = document.getElementById(containerId);
    const placeholder = document.getElementById(placeholderId);
    if (!container || !placeholder) return;

    // children ignoriert Kommentare/Textknoten
    const hasElements = container.children.length > 0;

    if (hasElements) {
      placeholder.classList.add("d-none");   // verstecken wenn Tasks da sind
    } else {
      placeholder.classList.remove("d-none"); // zeigen wenn leer
    }
  });
}


