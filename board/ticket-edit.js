let currentEditId = null;


function ticketEdit(id) {
    currentEditId = id;

    const t = tasks[id];
    const ticketPopup = document.getElementById("big-view-wrapper");

    ticketPopup.innerHTML = `
        <div class="ticket-header edit-ticket-header">
            
            <div onclick="closeTicket()" class="ticket-close"><img src="../img/close-icon.svg"></div>
        </div>

        <div class="ticket-edit-form">

            <label>Title</label>
            <input id="edit-title" type="text" value="${t.title}">
            <p class="required d-none">This field is required</p>

            <label>Description</label>
            <textarea id="edit-description" rows="5">${t.description}</textarea>

            <label>Due Date</label>
            <input id="edit-date" type="date" value="${t.dueDate}">
            <p class="required d-none">This field is required</p>

            <label>Priority</label>
            <div class="priority-section">
                <button data-priority="urgent" type="button" class="${t.priority === 'urgent' ? 'active' : ''}" >Urgent<img src="../img/urgent.svg"></button>
                <button data-priority="medium" type="button" class="${t.priority === 'medium' ? 'active' : ''}" >Medium<img src="../img/medium.svg"></button>
                <button data-priority="low" type="button" class="${t.priority === 'low' ? 'active' : ''}" >Low<img src="../img/low.svg"></button>
            </div>

            <label for="editContactSelection">Assigned to</label>
            <div class="custom-select">
                <input id="edit-assign-input" class="select-trigger assign-input edit-assign-input" placeholder="Select contacts to assign">
                <img class="assign-img" src="../img/arrow_drop_downaa.svg"> 
                <ul class="options options-assigned-to" id="editContactSelection"></ul>
                <div id="edit-assigned-symbols" class="assigned-symbols"></div>
            </div>



            <label for="editSubtask">Subtask</label>
          <div class="subtask-wrapper edit-subtask">
            <input 
              id="edit-subtask-input" 
              class="subtask edit-subtask-input" 
              type="text" 
              placeholder="Add new subtask"
              onkeydown="if(event.key === 'Enter') addEditSubtask()"
            >
            <span class="subtask-icon">
              <img onmousedown="clearEditSubtask()" class="x" src="../img/x2.svg">
              <img class="delimiter" src="../img/delimiter-vertical.svg">
              <img onmousedown="addEditSubtask()" class="hook" src="../img/hook-dark.svg">
            </span>
          </div>
          <ul class="ul-div" id="edit-subtask-list"></ul>


            <div class="ticket-footer-wrapper">
                <button class="save-btn" onclick="saveEditedTicket('${id}')">OK</button>
                <button class="cancel-btn" onclick="ticketBigView('${id}')">Cancel</button>
            </div>
        </div>
    `;

    // Hilfs-Variablen speichern
    window.editAssigned = [...(t.assigned || [])];
    window.editSubtasks = JSON.parse(JSON.stringify(t.subtasks || []));
    window.editPriority = t.priority;

    initEditPriorityButtons();
}


function addEditSubtask(){
    let subtask = document.getElementById("edit-subtask-input");
    let list = document.getElementById("edit-subtask-list");


    let currentCount = list.getElementsByClassName("listed").length;
    let index = currentCount;

    if(subtask.value.trim() !==""){
    list.innerHTML += `<li onclick="editBulletpoint(${index})" id="listed-${index}" class="listed"> 
                              <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
                                <span class="list-icon">
                                    <img onmousedown="clearEditSubtask()" class="pencil" src="../img/pencil-solo.svg">
                                    <img class="delimiter" src="../img/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpoint(${index})" class="trash" src="../img/trash.svg">
                                </span>
                            </li>
        `;
        subtask.value = "";
}}


function clearEditSubtask(){
    document.getElementById("edit-subtask-input").value = "";
}


function initEditPriorityButtons() {
  const prioButtons = document.querySelectorAll("#big-view-wrapper .priority-section button");
  prioButtons.forEach(button => {
    button.addEventListener("click", () => {
      prioButtons.forEach(b => b.classList.remove("urgent", "medium", "low", "active"));

      const priority = button.dataset.priority;
      button.classList.add(priority, "active");
      window.editPriority = priority; // wichtig, damit später gespeichert wird
    });
  });
}





///////////////////////////////////KI generated - muss gecheckt werden/////////////////////////////////////////


function toggleEditAssigned(name) {
    const contact = contacts.find(c => c.name === name);
    const exists = window.editAssigned.some(a => a.name === name);
    if (exists) {
        window.editAssigned = window.editAssigned.filter(a => a.name !== name);
    } else {
        window.editAssigned.push(contact);
    }
}


async function saveEditedTicket(id) {
    const title = document.getElementById("edit-title").value.trim();
    const description = document.getElementById("edit-description").value.trim();
    const dueDate = document.getElementById("edit-date").value;

    // Subtasks aktualisieren
    const updatedSubtasks = window.editSubtasks.map((st, i) => ({
        title: document.getElementById(`edit-subtask-${i}`)?.value || st.title,
        done: document.getElementById(`edit-subtask-done-${i}`)?.checked || false
    }));

    const updatedTask = {
        ...tasks[id],
        title,
        description,
        dueDate,
        priority: window.editPriority,
        assigned: window.editAssigned,
        subtasks: updatedSubtasks
    };

    await patchData("tasks", id, updatedTask); // In Speicher / Datenbank updaten
    tasks[id] = updatedTask;
    
    ticketBigView(id);// Popup wieder anzeigen
    loadTasks(); // Board neu rendern
}

