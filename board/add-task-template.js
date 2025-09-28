let taskStatus;


function addTask(stat) {
      const popup = document.getElementById("add-task-popup");
      popup.classList.add("show");
      taskStatus = stat;
}


function closePopup() {    
    const popup = document.getElementById("add-task-popup");
    popup.classList.remove("show");
}


async function createTaskTemplate() {
    if (!formValidationAddTaskTemp()) return;

    showReportAddedTaskTemplate();

    const title = document.getElementById("title-temp").value.trim();
    const description = document.getElementById("description-temp").value.trim();
    const dueDate = document.getElementById("date-temp").value;

    const selectedPriority = document.querySelector(".priority-section button.active");
    const priority = selectedPriority ? selectedPriority.dataset.priority : "medium";
    const assigned = [...selectedContacts]; 
    const category = document.getElementById("categoryValue-temp").value;
    const subtaskEls = document.querySelectorAll("#subtask-list-1 p");
    const subtasks = Array.from(subtaskEls).map(p => p.textContent.trim());
    

    const task = {
        title,
        description,
        dueDate,
        priority,
        assigned,
        category,
        subtasks,
        status: taskStatus
    };

    await postData("tasks", task);

    setTimeout(()=>{
        location.reload();
    },500);
}





function formValidationAddTaskTemp() {
    const title = document.getElementById("title-temp").value;
    const dueDate = document.getElementById("date-temp").value;
    const category = document.getElementById("category-temp").getAttribute("data-value"); // <-- geändert

    if (title === "" || dueDate === "" || !category) {
        displayRequiredMessageTemp();
        return false;
    }
    return true;
}


function displayRequiredMessageTemp() {
    const titleInput = document.getElementById("title-temp");
    const dateInput = document.getElementById("date-temp");
    const categorySelect = document.getElementById("category-temp");

    const titleMessage = titleInput.nextElementSibling;
    const dateMessage = dateInput.nextElementSibling;
    const categoryMessage = categorySelect.nextElementSibling;

    if (titleInput.value === "") {
        titleMessage.classList.remove("d-none");
        titleInput.classList.add("input-error");
    } else {
        titleMessage.classList.add("d-none");
        titleInput.classList.remove("input-error");
    }

    if (dateInput.value === "") {
        dateMessage.classList.remove("d-none");
        dateInput.classList.add("input-error");
    } else {
        dateMessage.classList.add("d-none");
        dateInput.classList.remove("input-error");
    }

    if (!categorySelect.getAttribute("data-value")) {
        categoryMessage.classList.remove("d-none");
        categorySelect.classList.add("input-error");
    } else {
        categoryMessage.classList.add("d-none");
        categorySelect.classList.remove("input-error");
    }
}


function showReportAddedTaskTemplate() {
    const popup = document.getElementById("report");
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
      }, 1000);
}


document.querySelectorAll("#category-temp .options li").forEach(option => {
    option.addEventListener("click", function() {
        const selectTrigger = document.querySelector("#category-temp .select-trigger");
        selectTrigger.textContent = this.textContent; // Zeige Auswahl im Button
        document.getElementById("category-temp").setAttribute("data-value", this.dataset.value);
    });
});


document.querySelectorAll("#category-temp .options li").forEach(li => {
    li.addEventListener("click", () => {
        const hiddenInput = document.getElementById("categoryValue-temp");
        hiddenInput.value = li.dataset.value;
        document.querySelector("#category-temp .select-trigger").innerHTML = `
            ${li.textContent} <img src="../img/arrow_drop_downaa.svg">
        `;
    });
});
