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
              <p class="ticket-category">${t.category}</p>
              <div onclick="closeTicket()" class="ticket-close"><img src="../img/close-icon.svg"></div>
            </div>

            <div class="ticket-title">
              ${t.title}
            </div>

            <div class="ticket-description">
              ${t.description}
            </div>

            <div class="ticket-date">
              <p class="font-color">Due date:</p>
              <p>${t.dueDate||"-"}</p>
            </div>

            <div class="ticket-priority">
              <p class="font-color">Priority:</p>
              <p>${t.priority} <img src="${prioImage[t.priority]}"></p>
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
                    ${t.subtasks?.map(st=>`<li>${st}</li>`).join("")||""}
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
