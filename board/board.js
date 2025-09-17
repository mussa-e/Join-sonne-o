document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});


async function loadTasks() {
    const data = await loadData("tasks");
    const tasks = Object.entries(data || {}); 

    tasks.forEach(([id, task]) => {
        renderTasktoBoard(task, id);
    });
}
