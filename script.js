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


