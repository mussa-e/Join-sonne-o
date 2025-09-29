function ticketBigView(id){
    const t = tasks[id];
    const ticketPopup = document.getElementById("big-view-wrapper");
    ticketPopup.classList.add("show");
    ticketPopup.innerHTML = bigViewHTML(t);
}


function closeTicket(){
    const ticketPopup = document.getElementById("big-view-wrapper");
    ticketPopup.classList.remove("show");
}


function bigViewHTML(t){
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
                    ${t.subtasks?.map(st=>`<div class="check-subtask"><img src="../img/check-button.svg"><p>${st}</p></div>`).join("")||""}
                </section>
            </div>

            <div class="ticket-footer-wrapper">
              <section class="ticket-footer-wrapper-right">
                <div class="ticket-delete">
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


