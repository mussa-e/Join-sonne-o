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
}
)


let totalTodo;
let totalDone;
let totalProgress;
let totalFeedback;
let totalTasks;


function renderTotalTodo(){
    totalTodo = tasks.filter(([id, task]) => task.status === "todo").length;
    document.getElementById("todo-sum").innerHTML = totalTodo;
}


function renderTotalDone(){
    totalDone = tasks.filter(([id, task]) => task.status === "done").length;
    document.getElementById("done-sum").innerHTML = totalDone;
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