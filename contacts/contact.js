function addNewContact() {
  const popup = document.getElementById("popup-new-contact");
  popup.classList.toggle("active");

  popup.innerHTML = popupHTML();
}


function editContact(initials, contact) {
  const editPopup = document.getElementById("popup-edit");
  editPopup.classList.toggle("active");

  editPopup.innerHTML = editHTML(initials, contact);

//   das ist neu
  current = contact; 
}


function closePopupWindow() {
    const popup = document.getElementById("popup-new-contact");
    setTimeout(() => {
        popup.classList.toggle("active");
    }, 300);
}


function closeEditPopup() {
    const popup = document.getElementById("popup-edit");
    setTimeout(() => {
        popup.classList.toggle("active");
    }, 300);
}


function createContact() {
  if (formValidationCreateContact()) {
    prepContact();
  }
}


function formValidationCreateContact() {
    const name = document.getElementById("name-contact").value;
    const email = document.getElementById("email-contact").value;
    const phone = document.getElementById("phone-contact").value;
    
    if (name === "" || email === "" || phone === "") {
        displayRequiredMessageCreateContact();
        return false;
    }
    return true;
}


function displayRequiredMessageCreateContact() {
    const nameInput = document.getElementById("name-contact");
    const emailInput = document.getElementById("email-contact");
    const phoneInput = document.getElementById("phone-contact");

    if (nameInput.value.trim() === "") {
        nameInput.classList.add("input-error");
        nameInput.placeholder = "Name is required";
    } else {
        nameInput.classList.remove("input-error");
        nameInput.placeholder = "Name";
    }

    if (emailInput.value.trim() === "") {
        emailInput.classList.add("input-error");
        emailInput.placeholder = "Email is required";
    } else {
        emailInput.classList.remove("input-error");
        emailInput.placeholder = "Email";
    }

    if (phoneInput.value.trim() === "") {
        phoneInput.classList.add("input-error");
        phoneInput.placeholder = "Phone is required";
    } else {
        phoneInput.classList.remove("input-error");
        phoneInput.placeholder = "Phone";
    }
}


let contacts = [];
let justCreatedContact;
let current;
let firstLetter;
let initials;
let activeContactId = null;

let colors = [
    "#FF7A00",
    "#FF5EB3",
    "#6E52FF",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B"
];


async function prepContact() {
    const name = document.getElementById("name-contact").value;
    const email = document.getElementById("email-contact").value;
    const phone = document.getElementById("phone-contact").value;

    const contactData = {
    name: name,
    email: email,
    phone: phone,
    id: contacts.length,
    color: colors[Math.floor(Math.random() * colors.length)],
    assigned: false,
    init: name
      .split(" ")
      .map(p => p[0].toUpperCase())
      .join("")
};

    if (name && email && phone) {
        await postData("contacts/", contactData);

        document.getElementById("name-contact").value = "";
        document.getElementById("email-contact").value = "";
        document.getElementById("phone-contact").value = "";
    }

    justCreatedContact = contactData;

    localStorage.setItem("lastCreatedContactId", contactData.id);

    await initContacts();
    renderContact();
}


async function initContacts(){
    await loadData();
    await loadContacts();
}


// async function loadContacts() {
//     const data = await loadData("contacts");
//     contacts = Object.values(data || {});
// }
async function loadContacts() {
    const data = await loadData("contacts");
    contacts = [];

    if (data) {
        for (const key in data) {
            contacts.push({
                ...data[key],
                firebaseId: key
            });
        }
    }
}



function renderContact() {
   current = justCreatedContact;

   if (current) {
      let parts = current.name.trim().split(" ");
      initials = parts.map(p => p[0].toUpperCase()).join("");
   }

   document.getElementById("contact-overview").innerHTML = overviewHTML(initials, current);

   useRandomColor("contact-initials", current);
   closePopup();
   showSucces();
   prepContactNav(initials);
}


function showSucces() {
    const succesBox = document.querySelector(".show-succes");
    succesBox.classList.add("active");

    setTimeout(() => {
        succesBox.classList.remove("active");
    }, 2000);
}


function useRandomColor(id, contact) {
  if (!contact.color) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    contact.color = colors[randomIndex];
  }
  document.getElementById(id).style.background = contact.color;
}


function syncBG(refName){
    let refEl = document.getElementById("contact-initials");
    let refBG = window.getComputedStyle(refEl).backgroundColor;

    let initialBG = document.getElementById(`contact-nav-initials-${refName}`);
    initialBG.style.backgroundColor = refBG;
}



async function prepContactNav(initials) {
    await initContacts();

    firstLetter = justCreatedContact.name[0].toUpperCase();
    const refName = justCreatedContact.name;

    const section = document.getElementById(`letter-sec-${firstLetter}`);
    const renderDiv = document.getElementById(`render-sec-${firstLetter}`);

    if (section && renderDiv) {
        renderDiv.innerHTML += contactNavHTML(initials, refName);
        section.classList.remove("d-none");
    }

    window.location.href = "contacts.html"; 
}



function focusContact(clickedItem) {
    const contactNavItems = document.querySelectorAll(".contact-nav");

    contactNavItems.forEach(el => {
        el.classList.remove("active");
        const nameEl = el.querySelector(".contact-nav-details-name");
        if (nameEl) {
            nameEl.style.color = "";
        }
    });

    clickedItem.classList.add("active");

    const activeNameEl = clickedItem.querySelector(".contact-nav-details-name");
    if (activeNameEl) {
        activeNameEl.style.color = "white";
    }
}





async function renderContactList() {
    await initContacts();

    contacts.forEach(contact => {
        if (!contact.name) return;

        const firstLetter = contact.name[0].toUpperCase();
        const initials = contact.name
            .split(" ")
            .map(word => word[0].toUpperCase())
            .join("");

        const section = document.getElementById(`letter-sec-${firstLetter}`);
        const renderDiv = document.getElementById(`render-sec-${firstLetter}`);
        if (!section || !renderDiv) return;

        section.classList.remove("d-none");

        renderDiv.innerHTML += 
        `
        <div onclick="focusContact(this); showFromContactList('${initials}', '${contact.id}')" class="contact-nav">
            <div id="contact-nav-initials-${contact.name}" class="contact-nav-initials" style="background:${contact.color || ''}">
                ${initials}
            </div>

            <div class="contact-nav-details">
                <p class="contact-nav-details-name">${contact.name}</p>
                <p class="contact-nav-details-email">${contact.email}</p>
            </div>
            
        </div>
        `;

        if (!contact.color) {
        useRandomColor(`contact-nav-initials-${contact.name}`, contact);
        }

    });

    showAgain();
}


function showFromContactList(initials, contactId){
    const contact = contacts.find(c => c.id == contactId);
    document.getElementById("contact-overview").innerHTML = showFromContactListHTML(initials, contact);
}


function showAgain(){
    const lastId = localStorage.getItem("lastCreatedContactId");
    if (lastId) {
        const contact = contacts.find(c => c.id == lastId);
        if (contact) {
            let initials = contact.name.split(" ").map(p => p[0].toUpperCase()).join("");
            document.getElementById("contact-overview").innerHTML = overviewHTML(initials, contact);
            useRandomColor("contact-initials", contact);
        }
        
        localStorage.removeItem("lastCreatedContactId");
    }
}


async function deleteContact(firebaseId) {
        await deleteData(`contacts/${firebaseId}`);
        await initContacts();
        document.getElementById("contact-overview").innerHTML = "";
        document.querySelectorAll(".contact-nav").forEach(el => el.remove());
        renderContactList();
        window.location.href = "contacts.html"; 
    
}



async function updateContact() {
    const name = document.getElementById("name-contact").value.trim();
    const email = document.getElementById("email-contact").value.trim();
    const phone = document.getElementById("phone-contact").value.trim();

    if (name === "" || email === "" || phone === "") {
        displayRequiredMessageCreateContact();
        return;
    }

    // Hole den aktiven Kontakt über contacts[]
    const contact = contacts.find(c => c.firebaseId === current.firebaseId);
    if (!contact) return;

    // Werte updaten
    const updatedContact = {
        ...contact,
        name,
        email,
        phone
    };

    // Firebase/Backend aktualisieren
    await updateData(`contacts/${contact.firebaseId}`, updatedContact);

    // Kontakte neu laden
    await initContacts();

    // Neues aktuelles Contact setzen
    current = updatedContact;

    localStorage.setItem("lastCreatedContactId", current.id);

    let parts = current.name.trim().split(" ");
    initials = parts.map(p => p[0].toUpperCase()).join("");

    // Übersicht neu rendern
    document.getElementById("contact-overview").innerHTML = overviewHTML(initials, current);
    useRandomColor("contact-initials", current);

    closeEditPopup();
    showSucces();

    window.location.href = "contacts.html"; 
}


async function updateData(path, data) {
    try {
        const response = await fetch(`${BASE_URL}/${path}.json`, {
            method: "PATCH", // oder "PUT" wenn du ALLES ersetzen willst
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Update fehlgeschlagen: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Fehler beim Updaten:", error);
    }
}





