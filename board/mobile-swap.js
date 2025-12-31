function showSwapImg() {
  const swapImgs = document.querySelectorAll(".swap-img");

  if (window.matchMedia("(max-width: 428px)").matches) {
    swapImgs.forEach(img => {
      img.style.display = "block";
    });
  } else {
    swapImgs.forEach(img => {
      img.style.display = "none";
    });
  }
}
showSwapImg();
window.addEventListener("resize", showSwapImg);


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
  console.log("swap clicked");
  event.stopPropagation();
  const swapWrapper = document.getElementById(`swap-wrapper-${id}`);
  swapWrapper.classList.toggle("d-none");
}