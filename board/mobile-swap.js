function stopDragging() {
  const box = document.querySelectorAll(".task-card");

  if (window.matchMedia("(max-width: 428px)").matches) {
    box.forEach(card => {
      card.draggable = false;
    });
    } else {
        box.forEach(card => {
            card.draggable = true;
        });
    }
}
stopDragging();
window.addEventListener("resize", stopDragging);


function showSwapOptions(event, id) {
  event.stopPropagation();
  const swapWrapper = document.getElementById(`swap-wrapper-${id}`);
  swapWrapper.classList.toggle("d-none");
}