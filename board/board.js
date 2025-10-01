document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});


async function loadTasks() {
  tasks = await loadData("tasks") || {};   // tasks bleibt Objekt!
  Object.entries(tasks).forEach(([id, task]) => {
    renderTasktoBoard(task, id);
  });
}

