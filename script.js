let loggedIn;



function openSubmenu(event) {
    event.preventDefault(); // verhindert Seiten-Neuladen
    const submenu = document.getElementById('submenu');
    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
}


    
function logOut() {
    sessionStorage.removeItem("guestSrc");
    sessionStorage.removeItem("initials");
    sessionStorage.setItem("loggedIn", "false");

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


function greetMobile() {
  console.log("greetMobile called");

  const greetDiv = document.getElementById("greeting");
  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

  if (window.matchMedia("(max-width: 428px)").matches && !isLoggedIn) {
        
    sessionStorage.setItem("loggedIn", "true");
    greetDiv.classList.add("greet-mobile");

    setTimeout(() => {
      greetDiv.classList.remove("greet-mobile");
    }, 2000);
  }
}



