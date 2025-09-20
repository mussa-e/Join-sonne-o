document.addEventListener("DOMContentLoaded", () => {
//   loadTasks();

  const searchInput = document.getElementById("find-task");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
});


async function loadTasksSearch() {
  const data = await loadData("tasks");
  tasks = Object.entries(data || {}); 
  renderAllTasks(tasks);
}


function renderAllTasks(taskArray) {
  // Bestehende Tasks löschen
  document.querySelectorAll(".task-card").forEach(el => el.remove());

  // Placeholder zurücksetzen (falls Spalten leer sind)
  resetPlaceholders();

  if (taskArray.length === 0) {
    showNoResults();
    return;
  }

  taskArray.forEach(([id, task]) => {
    renderTasktoBoard(task, id);
  });

  // Nach dem Rendern prüfen, ob Placeholder wieder sichtbar sein müssen
  checkEmptyColumns();
}


// Suchfunktion
function handleSearch(event) {
  const query = event.target.value.trim().toLowerCase();

  if (query === "") {
    // document.getElementById("no-result").innerHTML = "";
    renderAllTasks(tasks); // alle Tasks anzeigen
    return;
  }

  const filtered = tasks.filter(([id, task]) => {
    return (
      task.title?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query)
    );
  });

  renderAllTasks(filtered);
}


function showNoResults() {
  const board = document.getElementById("no-result");
  board.innerHTML = "no results found"
}


function resetPlaceholders() {
  ["todo","progress","feedback","done"].forEach((status, index) => {
    const placeholder = document.getElementById(`placeholder-${index+1}`);
    if (placeholder) {
      placeholder.classList.remove("d-none");
    }
  });
}


function checkEmptyColumns() {
  ["todo","progress","feedback","done"].forEach((status, index) => {
    const column = document.getElementById(status);
    const placeholder = document.getElementById(`placeholder-${index+1}`);

    if (column && placeholder) {
      const hasTasks = column.querySelectorAll(".task-card").length > 0;
      if (hasTasks) {
        placeholder.classList.add("d-none");
        document.getElementById("no-result").innerHTML = "";
      } else {
        placeholder.classList.remove("d-none");
      }
    }
  });
}