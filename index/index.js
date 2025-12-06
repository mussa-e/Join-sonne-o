let currentUser;


function guestLogin() {
    sessionStorage.setItem("loginType", "guest");
    sessionStorage.setItem("guestSrc", "../img/guest.svg");
    sessionStorage.removeItem("initials");

    loggedIn = true;
    console.log(loggedIn);
    window.location.href = "../summary/summary.html";
    
  }


function logIn() {
  formValidationLogIn();

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let user = users.find(u => u.email == email.value && u.password == password.value);
  let userMail = users.find(u => u.email == email.value);
  let userPassword = users.find(u => u.password == password.value);

  if (user) {
    sessionStorage.setItem("loginType", "user");
    sessionStorage.removeItem("guestSrc");
    currentUser = sessionStorage.setItem("currentUser", user.name);
    window.location.href = "../summary/summary.html";
    loggedIn = true;
    console.log(loggedIn);
  }

  else if(!userMail && !email.value == ""){
        wrongEmail(email);
    }

    else if(!userPassword && !password.value ==""){
        wrongPasswowrd(password);
    }
}


function wrongEmail(email){
    email.value = "";
    email.placeholder = "wrong email";
    email.style.borderColor="#FF8190";
    email.classList.add("placeholder-red");

    setTimeout(() => {
      email.placeholder = "Email";
      email.style.borderColor = "";
      email.classList.remove("placeholder-red");
    }, 3000);
}


function wrongPasswowrd(password){
    password.value = "";
    password.placeholder = "wrong password";
    password.style.borderColor="#FF8190";
    password.classList.add("placeholder-red");

    setTimeout(() => {
      password.placeholder = "Password";
      password.style.borderColor = "";
      password.classList.remove("placeholder-red");
    }, 3000);
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




