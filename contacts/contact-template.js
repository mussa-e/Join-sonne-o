function popupHTML(){
    return `
              <div class="left-wrapper">
                <img class="logo" src="../img/join-logo-white.svg">
                <h1>Add contact</h1>
                <p>Tasks are better with a team!</p>
                <img class="popup-line" src="../img/delimiter-horizontal-blue.svg">
            </div>

            <div class="right-wrapper">
                <div class="person-icon">
                    <img src="../img/contact-popup.svg">
                </div>

                <div class="right-wrapper-right">
                    <div onclick="closePopupWindow()" class="close-icon"><img src="../img/close-icon.svg"></div>
                    <form class="formular">

                        <input id="name-contact" type="text" placeholder="Name">
                        <span class="icon"><img src="../img/input-field-name.svg"></span>
                        

                        <input id="email-contact" type="text" placeholder="Email">
                        <span class="icon"><img src="../img/mail.svg"></span>
                        

                        <input id="phone-contact" type="text" placeholder="Phone">
                        <span class="icon"><img src="../img/call.svg"></span>
                        

                    </form>

                    <div class="btn-div">
                        <button onclick="closePopupWindow()" class="cancel">
                            Cancel <img src="../img/close-icon.svg">
                        </button>

                        <button onclick="createContact()" class="create-contact">
                            Create contact <img src="../img/check.svg">
                        </button>
                    </div>
                </div>

            </div>
            `
}


function overviewHTML(initials, current){
    return `
            <div class="contact-overview-header">
                <div id="contact-initials" class="contact-initials">
                    ${initials}
                </div>

                <div class="contact-name-section">
                    <p id="contact-name">${current.name}</p>
                    <section>
                        <img onclick='editContact("${initials}", ${JSON.stringify(current)})' src="../img/edit-contact.svg">
                        <img onclick="deleteContact('${current.firebaseId}')" src="../img/delete-contact.svg">
                    </section>
                </div>
            </div>

            <p class="contact-information-text">
                Contact Information
            </p>

            <div class="under-div">
                <p class="under-div-email-header">Email</p>
                <p id="under-div-email" class="under-div-email">${current.email}</p>
                <p class="under-div-phone-header">Phone</p>
                <p id="under-div-phone" class="under-div-phone">${current.phone}</p>
            </div>
    `
}


function showFromContactListHTML(initials, contact){
    return `
            <div class="contact-overview-header">
                <div id="contact-initials" class="contact-initials" style="background:${contact.color}">
                    ${initials}
                </div>

                <div class="contact-name-section">
                    <p id="contact-name">${contact.name}</p>
                    <section>
                        <img onclick='editContact("${initials}", ${JSON.stringify(contact)})' src="../img/edit-contact.svg">
                        <img onclick="deleteContact('${contact.firebaseId}')" src="../img/delete-contact.svg">

                    </section>
                </div>
            </div>

            <p class="contact-information-text">
                Contact Information
            </p>

            <div class="under-div">
                <p class="under-div-email-header">Email</p>
                <p id="under-div-email" class="under-div-email">${contact.email}</p>
                <p class="under-div-phone-header">Phone</p>
                <p id="under-div-phone" class="under-div-phone">${contact.phone}</p>
            </div>
    `
}


function contactNavHTML(initials, refName){
    return `
         <div 
            onclick="focusContact(this); showFromContactList('${initials}', '${justCreatedContact}')" 
            class="contact-nav">

            <div id="contact-nav-initials-${refName}" class="contact-nav-initials">
                ${initials}
            </div>

            <div class="contact-nav-details">
                <p class="contact-nav-details-name">${justCreatedContact.name}</p>
                <p class="contact-nav-details-email">${justCreatedContact.email}</p>
            </div>
            
        </div>
        `;
}




function editHTML(initials, contact){
    return `
              <div class="left-wrapper">
                <img class="logo" src="../img/join-logo-white.svg">
                <h1>Add contact</h1>
                <p>Tasks are better with a team!</p>
                <img class="popup-line" src="../img/delimiter-horizontal-blue.svg">
            </div>

            <div class="right-wrapper">
                <div class="person-icon">
                    <p style="background:${contact.color}">${initials}</p>
                </div>

                <div class="right-wrapper-right">
                    <div onclick="closeEditPopup()" class="close-icon"><img src="../img/close-icon.svg"></div>
                    <form class="formular">

                        <input id="name-contact" type="text" placeholder="Name" value="${contact.name}">
                        <span class="icon"><img src="../img/input-field-name.svg"></span>
                        

                        <input id="email-contact" type="text" placeholder="Email" value="${contact.email}">
                        <span class="icon"><img src="../img/mail.svg"></span>
                        

                        <input id="phone-contact" type="text" placeholder="Phone" value="${contact.phone}">
                        <span class="icon"><img src="../img/call.svg"></span>
                        

                    </form>

                    <div class="btn-div">
                        <button onclick="deleteContact('${contact.firebaseId}')" class="cancel">
                            Delete
                        </button>

                        <button onclick="updateContact()" class="create-contact">
                            Save <img src="../img/check.svg">
                        </button>
                    </div>
                </div>

            </div>
            `
}