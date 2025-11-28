// const checkbox = document.getElementById("accept");
// const button = document.querySelector(".sign-up-btn");
// checkbox.addEventListener("change", () => {
//   if (checkbox.checked) {
//     button.classList.add("show");
//   } else {
//     button.classList.remove("show");
//   }
// });
const checkbox = document.getElementById("accept");
const button = document.querySelector(".sign-up-btn");

checkbox.addEventListener("change", () => {
  button.disabled = !checkbox.checked;
});



function signUp() {
  if (formValidationSignUp()) {
    register();
  }
}


function formValidationSignUp() {
    const email = document.getElementById("email-SignUp").value.trim();
    const password = document.getElementById("password-SignUp").value;
    const confirm = document.getElementById("confirmPassword-SignUp").value;
    const accept = document.getElementById("accept").checked;

    let valid = true;
    valid &= checkEmpty("email-SignUp");
    valid &= checkEmpty("password-SignUp");
    valid &= checkPasswordMatch(password, confirm);
    valid &= checkAccept(accept);

    if (valid) document.querySelector(".sign-up-btn").classList.remove("d-none");

    return valid;
}


function checkEmpty(id) {
    const input = document.getElementById(id);
    const msg = input.parentElement.querySelector(".required");
    if (input.value === "") {
        if (msg) msg.classList.remove("d-none");
        input.classList.add("input-error");
        return false;
    }
    if (msg) msg.classList.add("d-none");
    input.classList.remove("input-error");
    return true;
}


function checkPasswordMatch(pwd, confirm) {
    const msg = document.querySelector("#confirmPassword-SignUp + p.required");
    if (pwd !== confirm || confirm === "") {
        msg.classList.remove("d-none");
        return false;
    }
    msg.classList.add("d-none");
    return true;
}


function checkAccept(checked) {
    const box = document.getElementById("accept");
    if (!checked) {
        box.classList.add("input-error");
        return false;
    }
    box.classList.remove("input-error");
    return true;
}

//Begin der visibility-toggle funktionen//////////////////
document.addEventListener('DOMContentLoaded', () => {
  const ICONS = {
    lock: '../img/password.svg',
    visible: '../img/visibility.svg',
    hidden: '../img/visibility_off.svg'
  };

  // alle Passwort-Wrapper mit Toggle-Icon durchgehen
  document.querySelectorAll('.input-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input[type="password"]');
    const toggle = wrapper.querySelector('.toggle-password');
    const icon = toggle ? toggle.querySelector('img') : null;

    if (!input || !toggle || !icon) return;

    let state = 'locked';

    // beim Fokus: Schloss -> durchgestrichenes Auge
    input.addEventListener('focus', () => {
      if (state === 'locked') {
        icon.src = ICONS.hidden;
        state = 'hidden';
      }
    });

    // Klick toggelt sichtbar/unsichtbar
    toggle.addEventListener('click', () => {
      if (state === 'visible') {
        input.type = 'password';
        icon.src = ICONS.hidden;
        state = 'hidden';
      } else {
        input.type = 'text';
        icon.src = ICONS.visible;
        state = 'visible';
      }
    });
  });
});

