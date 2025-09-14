function back() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    window.location.href = "board.html";
  }
}