function summaryToBoard() {
    window.location.href = '../board/board.html';
}


async function loadTasksSummary() {
  const data = await loadData("tasks");
  tasks = Object.entries(data || {}); 
}


document.addEventListener("DOMContentLoaded", async function(){
    await loadTasksSummary();

    renderTotalTodo();
    renderTotalDone();
    renderTotalProgress();
    renderTotalFeedback();
    renderTotalTasks();
    renderDeadline();
    renderNextDate();
}
)


let totalTodo;
let totalDone;
let totalProgress;
let totalFeedback;
let totalTasks;


function renderTotalTodo(){
    totalTodo = tasks.filter(([id, task]) => task.status === "todo").length;
    document.getElementById("todo-sum").innerHTML = totalTodo + "<span>To-Do</span>";
}


function renderTotalDone(){
    totalDone = tasks.filter(([id, task]) => task.status === "done").length;
    document.getElementById("done-sum").innerHTML = totalDone + "<span>Done</span>";
}


function renderTotalProgress(){
    totalProgress = tasks.filter(([id, task]) => task.status === "progress").length;
    document.getElementById("progress-sum").innerHTML = totalProgress;
}


function renderTotalFeedback(){
    totalFeedback = tasks.filter(([id, task]) => task.status === "feedback").length;
    document.getElementById("feedback-sum").innerHTML = totalFeedback;
}


function renderTotalTasks(){
    totalTasks = tasks.length;
    document.getElementById("total-sum").innerHTML = totalTasks;
}


function renderDeadline() {
    let el = document.getElementById("count-urgent");
    let today = new Date();
    let upcoming = tasks
        .map(([id, t]) => new Date(t.dueDate))
        .filter(d => d >= today);

    if (upcoming.length === 0) {
        el.innerHTML = 0;
        return;
    }
    let next = Math.min(...upcoming);
    let urgent = tasks.filter(([id, t]) =>
        new Date(t.dueDate).getTime() === next
    ).length;
    el.innerHTML = urgent;
}


function renderNextDate() {
    let el = document.getElementById("date");
    let today = new Date();
    let upcoming = tasks
        .map(([id, t]) => new Date(t.dueDate))
        .filter(d => d >= today);

    if (upcoming.length === 0) {
        el.innerHTML = "-";
        return;
    }
    let next = new Date(Math.min(...upcoming));
    el.innerHTML = next.toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
    });
}


