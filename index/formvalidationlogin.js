function formValidationLogIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    
    if (email === "" || password === "") {
        displayRequiredMessageLogIn();
        return;
    }
}

function displayRequiredMessageLogIn() {{
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailMessage = emailInput.nextElementSibling;
    const passwordMessage = passwordInput.nextElementSibling;

    if (emailInput.value === "") {
        // emailMessage.classList.remove("d-none");
        emailInput.classList.add("input-error");
        setTimeout(() => {
        // emailMessage.classList.add("d-none");
        emailInput.classList.remove("input-error");
    }, 3000);

    } else {
        // emailMessage.classList.add("d-none");
        emailInput.classList.remove("input-error");
    }

    if (passwordInput.value === "") {
        passwordMessage.classList.remove("d-none");
        passwordInput.classList.add("input-error");
        setTimeout(() => {
        passwordMessage.classList.add("d-none");
        passwordInput.classList.remove("input-error");
    }, 3000);

    } else {
        passwordMessage.classList.add("d-none");
        passwordInput.classList.remove("input-error");
    }
}}



const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");
const passwordIcon = document.getElementById("passwordIcon");

// Pfade zu DEINEN Icons
const ICONS = {
    lock: "../img/password.svg",
    visible: "../img/visibility.svg",
    hidden: "../img/visibility_off.svg"
};

// Startzustand: Schloss-Icon sichtbar, Feld ist "password"
let state = "locked";

// Beim Fokus Schloss -> durchgestrichenes Auge ersetzen(hidden)
passwordInput.addEventListener("focus", () => {
    if (state === "locked") {
      passwordInput.type = "password";
      passwordIcon.src = ICONS.hidden;
      state = "hidden";
    }
});

// Klick toggelt sichtbar/unsichtbar
toggleBtn.addEventListener("click", () => {
    if (state === "hidden") {
      passwordInput.type = "text";
      passwordIcon.src = ICONS.visible;
      state = "visible";
    } else {
      passwordInput.type = "password";
      passwordIcon.src = ICONS.hidden;
      state = "hidden";
    }
});