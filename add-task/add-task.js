const buttons = document.querySelectorAll(".priority-section button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("urgent", "medium", "low"));
      const priority = button.dataset.priority;
      button.classList.add(priority);
    });
  });


function initPriorityButtons() {
    const buttons = document.querySelectorAll(".priority-section button");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // bei allen anderen die Klasse wegnehmen
            buttons.forEach(b => b.classList.remove("active"));
            // beim angeklickten setzen
            btn.classList.add("active");
        });
    });
}

// beim Laden initialisieren
document.addEventListener("DOMContentLoaded", () => {
    initPriorityButtons();
});


async function createTask() {
    formValidationAddTask();
    
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("date").value;
    const category = document.getElementById("Category").value;
    const subtask = document.getElementById("subtask").value.trim();
    const selectedPriority = document.querySelector(".priority-section button.active");
    const priority = selectedPriority ? selectedPriority.dataset.priority : "medium";

    const task = {
        title,
        description,
        dueDate,
        category,
        subtask,
        priority,
        status: "todo"
    };

    await postData("tasks", task);

    // Feedback + Redirect
    showReportAddedTask();
}


function formValidationAddTask() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("date").value;
    const category = document.getElementById("Category").value;
    
    if (title === "" || dueDate === "" || category === "") {
        displayRequiredMessage();
        return;
    }
    // showReportAddedTask();
}

function displayRequiredMessage() {{
    const titleInput = document.getElementById("title");
    const dateInput = document.getElementById("date");
    const categorySelect = document.getElementById("Category");

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

    if (categorySelect.value === "") {
        categoryMessage.classList.remove("d-none");
        categorySelect.classList.add("input-error");
    } else {
        categoryMessage.classList.add("d-none");
        categorySelect.classList.remove("input-error");
    }
}}


function showReportAddedTask() {
      const popup = document.getElementById("report");
      popup.classList.add("show");

      setTimeout(() => {
        window.location.href = "../board/board.html";
      }, 900);

      setTimeout(() => {
        popup.classList.remove("show");
      }, 1000);
    }


