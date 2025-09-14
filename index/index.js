let currentUser;


function guestLogin() {
    sessionStorage.setItem("loginType", "guest");
    sessionStorage.setItem("guestSrc", "../img/guest.svg");
    sessionStorage.removeItem("initials");

    window.location.href = "../summary/summary.html";
  }


  function logIn(){
    formValidationLogIn();

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let user = users.find(u => u.email == email.value && u.password == password.value);
    
    currentUser = sessionStorage.setItem("currentUser", user.name);

    if (user){
      sessionStorage.setItem("loginType", "user");
      sessionStorage.removeItem("guestSrc");

        
        window.location.href = "../summary/summary.html";
    }
}


function greet() {
    const loginType = sessionStorage.getItem("loginType");

    if (loginType === "guest") {
        greetingGuest();
    } else if (loginType === "user") {
        greetingUser();
    }
}




  function greetingGuest() {
    const hours = new Date().getHours();
    let timeOfDay;

    if (hours < 12) {
        timeOfDay = "Good morning!";
    } else if (hours < 18) {
        timeOfDay = "Good afternoon!";
    } else {
        timeOfDay = "Good evening!";
    }

    document.getElementById("greeting-time").textContent = timeOfDay;
}


  function greetingUser() {
    const hours = new Date().getHours();
    let timeOfDay;

    if (hours < 12) {
        timeOfDay = "Good morning,";
    } else if (hours < 18) {
        timeOfDay = "Good afternoon,";
    } else {
        timeOfDay = "Good evening,";
    }

    document.getElementById("greeting-time").textContent = timeOfDay;
    document.getElementById("greeting-name").classList.remove("d-none"); 

    renderUserName();
}


function renderUserName() {
    let name = sessionStorage.getItem("currentUser");

    if (!name) return;

    let parts = name.trim().split(" ");
    let initials = parts.map(p => p[0].toUpperCase()).join("");

    document.getElementById("greeting-name").innerHTML = name;
    document.getElementById("initials").innerHTML = initials;
    sessionStorage.setItem("initials", initials);
}







window.addEventListener("DOMContentLoaded", () => {
    const guest = sessionStorage.getItem("guestSrc");
    if (guest) {
        document.querySelectorAll(".elipse-img").forEach(img => {
            img.src = guest;
        });
    }

    const renderInitials = sessionStorage.getItem("initials");
    if (renderInitials) {
        document.querySelectorAll(".initials").forEach(el => {
            el.textContent = renderInitials;
        });
    }
});




