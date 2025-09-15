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


document.addEventListener("DOMContentLoaded", () => {
    initPriorityButtons();
});


async function createTask() {
    if (!formValidationAddTask()) return;
    
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("date").value;

    const selectedPriority = document.querySelector(".priority-section button.active");
    const priority = selectedPriority ? selectedPriority.dataset.priority : "medium";
    const assigned = [...selectedContacts]; 
    const category = document.getElementById("categoryValue").value;
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
        status: "todo"
    };

    await postData("tasks", task);

    // Feedback + Redirect
    showReportAddedTask();
}

//this is for formvalidation
const categoryDiv = document.getElementById("category");
const trigger = categoryDiv.querySelector(".select-trigger");
const options = categoryDiv.querySelectorAll(".options li");
const hiddenInput = document.getElementById("categoryValue");

options.forEach(opt => {
  opt.addEventListener("click", () => {
    // Button-Text updaten
    trigger.innerHTML = `${opt.textContent} <img src="../img/arrow_drop_downaa.svg">`;
    // Hidden-Input setzen
    hiddenInput.value = opt.dataset.value;
  });
});


function formValidationAddTask() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("date").value;
    const category = document.getElementById("categoryValue").value; // <-- hidden input
    
    if (title === "" || dueDate === "" || category === "") {
        displayRequiredMessage();
        return false;
    }
    return true;
}


function displayRequiredMessage() {
    const titleInput = document.getElementById("title");
    const dateInput = document.getElementById("date");
    const categoryInput = document.getElementById("categoryValue");
    const categoryDiv = document.getElementById("category");

    const titleMessage = titleInput.nextElementSibling;
    const dateMessage = dateInput.nextElementSibling;
    const categoryMessage = categoryDiv.nextElementSibling;

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

    if (categoryInput.value === "") {
        categoryMessage.classList.remove("d-none");
        categoryDiv.classList.add("input-error");
    } else {
        categoryMessage.classList.add("d-none");
        categoryDiv.classList.remove("input-error");
    }
}



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


