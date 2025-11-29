function updateLogo() {
    const logo = document.querySelector('.nav-logo');

    if (window.matchMedia("(max-width: 900px)").matches) {
        logo.src = "../img/join-logo-blue.svg";
    } else {
        logo.src = "../img/join-logo-white.svg";
    }
}

updateLogo();

window.addEventListener('resize', updateLogo);
