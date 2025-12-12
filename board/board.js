document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});


async function loadTasks() {
  tasks = await loadData("tasks") || {};   // tasks bleibt Objekt!
  Object.entries(tasks).forEach(([id, task]) => {
    renderTasktoBoard(task, id);
  });
}


function responsivAddButton() {
  const respButton = document.getElementById('add-task-btn');
    

  if (window.matchMedia("(max-width: 900px)").matches) {
      
      respButton.textContent = "";
        
  } else {
      respButton.textContent = "Add Task ";
      
    }
}
responsivAddButton();
window.addEventListener('resize', responsivAddButton);