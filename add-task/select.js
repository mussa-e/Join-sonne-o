let selectedContacts = [];


document.addEventListener("DOMContentLoaded", async () => {
  await initContacts();// Warten bis Firebase-Kontakte geladen sind (aus contacts.js)
  initCustomSelects();
  setupSearch(contacts);

  document.addEventListener("click", () => closeAllSelects());
});


function initCustomSelects() {
  document.querySelectorAll(".custom-select").forEach(select => {
    const trigger = select.querySelector(".select-trigger"); // button oder input
    let arrowImg = select.querySelector(".assign-img"); // externes img
    const options = select.querySelector(".options");

    if (!trigger || !options) {
      console.warn("Custom select fehlt ein Element:", select);
      return;
    }

    // Falls img innerhalb des Buttons (z.B. Category)
    if (!arrowImg) {
      arrowImg = trigger.querySelector("img");
    }

    setupTrigger(trigger, arrowImg, options, select);
    setupOptions(trigger, options);
  });
}



function setupTrigger(input, arrowImg, options, select) {
  const toggleDropdown = (e) => {
    e.stopPropagation();
    const isOpen = options.style.display === "block";
    closeAllSelects(select);

    if (!isOpen) {
      if (options.id === "contactSelection") {
        renderContactsDropdown(contacts);
      }
      options.style.display = "block";
      toggleArrow(arrowImg, true);
    } else {
      options.style.display = "none";
      toggleArrow(arrowImg, false);
    }
  };

  input.addEventListener("click", toggleDropdown);
  arrowImg.addEventListener("click", toggleDropdown);
}


function setupOptions(trigger, options) {
  options.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      if (option.textContent.trim() !== "") {
        if (trigger.tagName.toLowerCase() === "input") {
          trigger.value = option.textContent;
        } else {
          trigger.firstChild.textContent = option.textContent;
        }
        trigger.setAttribute("data-value", option.dataset.value || option.textContent);
      }
      options.style.display = "none";
    });
  });
}


function closeAllSelects(exception) {
  document.querySelectorAll(".custom-select").forEach(select => {
    const options = select.querySelector(".options");
    const arrowImg = select.querySelector(".assign-img") || select.querySelector(".select-trigger img");

    if (!exception || select !== exception) {
      if (options) options.style.display = "none";
      if (arrowImg) toggleArrow(arrowImg, false); // Pfeil zurücksetzen
    }
  });
}


function toggleArrow(img, open) {
  if (!img) return;
  img.src = open 
    ? "../img/arrow_drop_up.svg"
    : "../img/arrow_drop_downaa.svg";
}


function renderContactsDropdown(contacts) {
  const list = document.getElementById("contactSelection");
  list.innerHTML = "";

  contacts.forEach(contact => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label id="assigned-list-${contact.id}" class="assigned-list">
        <span style="background-color:${contact.color}" class="assigned-list-initials">${contact.init}</span> 
        <span class="assigned-list-name">${contact.name}</span>
        <img class="checkbox" src="../img/check-button.svg" data-checked="false" value="${contact.id}">
      </label>
    `;
    list.appendChild(li);

    let checkedColor = "#2A3647"; 
    const label = li.querySelector("label");
    const img = li.querySelector("img");
    setupCheckboxToggle(label, img, checkedColor);
  });
}


function setupCheckboxToggle(label, img, color) {
  label.addEventListener("click", (e) => {
    e.stopPropagation();
    const checked = img.dataset.checked === "true";
    const name = label.querySelector(".assigned-list-name");
    const initials = label.querySelector(".assigned-list-initials");

    if (!checked && selectedContacts.length < 3) {
      img.src = "../img/clicked.svg"; img.dataset.checked = "true";
      label.style.backgroundColor = color; name.style.color = "#fff";
      selectedContacts.push({id: img.value, name: name.textContent, init: initials.textContent, color: initials.style.backgroundColor});
    } else {
      img.src = "../img/check-button.svg"; img.dataset.checked = "false";
      label.style.backgroundColor = ""; name.style.color = "";
      selectedContacts = selectedContacts.filter(c => c.id !== img.value);
    }
    updateAssignedSymbols();
  });
}


function updateAssignedSymbols() {
  const box = document.getElementById("assigned-symbols");
  box.innerHTML = "";
  selectedContacts.slice(0,3).forEach(c => {
    const div = document.createElement("div");
    div.className = "assigned-symbol";
    div.style.backgroundColor = c.color;
    div.textContent = c.init;
    box.appendChild(div);
  });
}


function setupSearch(contacts) {
  const input = document.getElementById("assign-input");
  
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(query));
    renderContactsDropdown(filtered);
  });
}


