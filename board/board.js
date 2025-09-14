document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});


async function loadTasks() {
    const data = await loadData("tasks");
    const tasks = Object.entries(data || {}); 
    // -> Array: [["firebaseKey1", {taskObj}], ["firebaseKey2", {taskObj}], ...]

    tasks.forEach(([id, task]) => {
        renderTasktoBoard(task, id);
    });
}
