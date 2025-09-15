function addTask() {
      const popup = document.getElementById("add-task-popup");
      popup.classList.add("show");
}


function closePopup() {    
    const popup = document.getElementById("add-task-popup");
    popup.classList.remove("show");
}


function createTaskTemplate() {
    formValidationAddTaskTemp();

    
}


document.querySelectorAll("#category-temp .options li").forEach(option => {
    option.addEventListener("click", function() {
        const selectTrigger = document.querySelector("#category-temp .select-trigger");
        selectTrigger.textContent = this.textContent; // Zeige Auswahl im Button
        document.getElementById("category-temp").setAttribute("data-value", this.dataset.value);
    });
});


function formValidationAddTaskTemp() {
    const title = document.getElementById("title-temp").value;
    const dueDate = document.getElementById("date-temp").value;
    const category = document.getElementById("category-temp").getAttribute("data-value"); // <-- geändert

    if (title === "" || dueDate === "" || !category) {
        displayRequiredMessageTemp();
        return;
    }

    showReportAddedTaskTemplate();
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

