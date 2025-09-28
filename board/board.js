document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});


// async function loadTasks() {
//     const data = await loadData("tasks");
//     tasks = Object.entries(data || {}); 

//     tasks.forEach(([id, task]) => {
//         renderTasktoBoard(task, id);
//     });
// }
async function loadTasks() {
  tasks = await loadData("tasks") || {};   // tasks bleibt Objekt!
  Object.entries(tasks).forEach(([id, task]) => {
    renderTasktoBoard(task, id);
  });
}

