function toggleResponsivView() {
    let conDiv = document.getElementById("contact-div");
    let mainHeader = document.getElementById("main-header");
    let conOverview = document.getElementById("contact-overview");
    let backArrow = document.getElementById("contact-back-arrow");


    if (window.innerWidth <= 670) {
        conDiv.style.display = "none";
        mainHeader.style.display = "flex";
        conOverview.style.display = "block";
        backArrow.style.display = "block";
    }
}

function backToContactList() {
    let conDiv = document.getElementById("contact-div");
    let mainHeader = document.getElementById("main-header");
    let conOverview = document.getElementById("contact-overview");
    let backArrow = document.getElementById("contact-back-arrow");

    if (window.innerWidth <= 670) {
    conDiv.style.display = "flex";
    mainHeader.style.display = "none";
    conOverview.style.display = "none";
    backArrow.style.display = "none";
    }
}