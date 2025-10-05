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
                <button data-priority="urgent" type="button" class="${t.priority === 'urgent' ? 'active' : ''}" onclick="setEditPriority('urgent')">Urgent<img src="../img/urgent.svg"></button>
                <button data-priority="medium" type="button" class="${t.priority === 'medium' ? 'active' : ''}" onclick="setEditPriority('medium')">Medium<img src="../img/medium.svg"></button>
                <button data-priority="low" type="button" class="${t.priority === 'low' ? 'active' : ''}" onclick="setEditPriority('low')">Low<img src="../img/low.svg"></button>
            </div>

            <label for="editAssignInput">Assigned to</label>
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
              placeholder="Enter new subtask"
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
}


function setEditPriority(prio) {
    window.editPriority = prio;
    document.querySelectorAll(".priority-section button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.priority === prio);
    });
}

function toggleEditAssigned(name) {
    const contact = contacts.find(c => c.name === name);
    const exists = window.editAssigned.some(a => a.name === name);
    if (exists) {
        window.editAssigned = window.editAssigned.filter(a => a.name !== name);
    } else {
        window.editAssigned.push(contact);
    }
}

function addEditSubtask() {
    const input = document.getElementById("new-edit-subtask");
    const title = input.value.trim();
    if (!title) return;
    window.editSubtasks.push({ title, done: false });
    input.value = "";
    ticketEdit(currentEditId); // neu rendern
}

function removeEditSubtask(i) {
    window.editSubtasks.splice(i, 1);
    ticketEdit(currentEditId);
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

    // In Speicher / Datenbank updaten
    await patchData("tasks", id, updatedTask);
    tasks[id] = updatedTask;

    // Popup wieder anzeigen
    ticketBigView(id);
    loadTasks(); // Board neu rendern
}

