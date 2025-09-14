function renderSubtask(){
    let subtask = document.getElementById("subtask");
    let list = document.getElementById("subtask-list-1");


    let currentCount = list.getElementsByClassName("listed").length;
    let index = currentCount;

    if (currentCount < 2 && subtask.value.trim() !==""){
        list.innerHTML += `<li onclick="editBulletpoint(${index})" id="listed-${index}" class="listed"> 
                              <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
                                <span class="list-icon">
                                    <img onmousedown="clearSubtask()" class="pencil" src="../img/pencil-solo.svg">
                                    <img class="delimiter" src="../img/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpoint(${index})" class="trash" src="../img/trash.svg">
                                </span>
                            </li>
        `;
        subtask.value = "";
    }
}


function clearSubtask(){
    document.getElementById("subtask").value = "";
}


function deleteBulletpoint(index) {
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}


function editBulletpoint(index) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);

    // Wenn schon ein Input da ist, nicht nochmal umbauen
    if (inputEl) {
        inputEl.focus();
        return;
    }

    const currentText = textEl ? textEl.textContent : ""; // fallback, falls kein <p> existiert

    li.innerHTML = `
        <input class="edit-input" type="text" id="edit-input-${index}" value="${currentText}">
        <span class="list-icon">
            <img onmousedown="deleteBulletpoint(${index})" class="trash" src="../img/trash.svg">
            <img class="delimiter" src="../img/delimiter-vertical.svg">
            <img onmousedown="saveBulletpoint(${index})" class="hook" src="../img/hook-dark.svg">
        </span>
    `;

    document.getElementById(`edit-input-${index}`).focus();
}



function saveBulletpoint(index) {
    const input = document.getElementById(`edit-input-${index}`);
    const newValue = input.value.trim();

    if (newValue !== "") {
        const li = document.getElementById(`listed-${index}`);
        li.innerHTML = `<span class="dot">•</span><p id="task-text-${index}">${newValue}</p>
                        <span class="list-icon">
                            <img onmousedown="clearSubtask()" class="pencil" src="../img/pencil-solo.svg">
                            <img class="delimiter" src="../img/delimiter-vertical.svg">
                            <img onmousedown="deleteBulletpoint(${index})" class="trash" src="../img/trash.svg">
                        </span>`;
        li.setAttribute("onclick", `editBulletpoint(${index})`);
    }
}
