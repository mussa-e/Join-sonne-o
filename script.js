function openSubmenu(event) {
    event.preventDefault(); // verhindert Seiten-Neuladen
    const submenu = document.getElementById('submenu');
    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
}


    
function logout() {
    sessionStorage.removeItem("guestSrc");
    sessionStorage.removeItem("initials");
    window.location.href = "../index/index.html"; 
  }

// Logo change when resize
  function updateLogo() {
    const logo = document.querySelector('.nav-logo');
    const helpSubmenu = document.getElementById('help-submenu');

    if (window.matchMedia("(max-width: 900px)").matches) {
        logo.src = "../img/join-logo-blue.svg";
        helpSubmenu.style.display = "block";
    } else {
        logo.src = "../img/join-logo-white.svg";
        helpSubmenu.style.display = "none";
    }
}
updateLogo();
window.addEventListener('resize', updateLogo);


