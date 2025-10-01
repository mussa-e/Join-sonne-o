function ticketBigView(id){
    const t = tasks[id];
    const ticketPopup = document.getElementById("big-view-wrapper");
    ticketPopup.classList.add("show");
    ticketPopup.innerHTML = bigViewHTML(t, id);
}


function closeTicket(){
    const ticketPopup = document.getElementById("big-view-wrapper");
    ticketPopup.classList.remove("show");
}


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
                        <img onclick="subtaskDone(${i})" id="check-button-${i}" src="../img/check-button.svg">
                        <p>${st}</p>
                      </div>`).join("")||""}
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

                <div class="ticket-edit">
                  <img src="../img/pencil-ticket.svg">
                  <p class="font-color">Edit</p>
                </div>
              </section>
            </div>
    
    `
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
}


async function deleteData(path="") {
    let response = await fetch(BASE_URL + path + ".json", {
        method:"DELETE",
    });
    return response.ok;
}


function subtaskDone(id) {
    const img = document.getElementById(`check-button-${id}`);
    
    const empty = "../img/check-button.svg";
    const checked = "../img/clicked-black.svg";

    if (img.src.includes("check-button.svg")) {
        img.src = checked;
    } else {
        img.src = empty;
    }
}
