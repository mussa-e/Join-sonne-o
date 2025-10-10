let selectedEditContacts = [];

// Wird nach dem Öffnen des Edit-Tickets aufgerufen
async function initEditCustomSelect() {
  await initContacts(); // sorgt dafür, dass contacts geladen sind
  initEditSelect();
  setupEditSearch(contacts);
  document.addEventListener("click", () => closeAllEditSelects());
}

function initEditSelect() {
  document.querySelectorAll(".custom-select").forEach(select => {
    const trigger = select.querySelector(".edit-assign-input");
    const arrowImg = select.querySelector(".assign-img");
    const options = select.querySelector(".options");

    if (!trigger || !options) return;

    setupEditTrigger(trigger, arrowImg, options, select);
    setupEditOptions(trigger, options);
  });
}

function setupEditTrigger(input, arrowImg, options, select) {
  const toggleDropdown = (e) => {
    e.stopPropagation();
    const isOpen = options.style.display === "block";
    closeAllEditSelects(select);

    if (!isOpen) {
      if (options.id === "editContactSelection") {
        renderEditContactsDropdown(contacts);
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

function setupEditOptions(trigger, options) {
  options.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      if (option.textContent.trim() !== "") {
        trigger.value = option.textContent;
        trigger.setAttribute("data-value", option.dataset.value || option.textContent);
      }
      options.style.display = "none";
    });
  });
}

function closeAllEditSelects(exception) {
  document.querySelectorAll(".custom-select").forEach(select => {
    const options = select.querySelector(".options");
    const arrowImg = select.querySelector(".assign-img");

    if (!exception || select !== exception) {
      if (options) options.style.display = "none";
      if (arrowImg) toggleArrow(arrowImg, false);
    }
  });
}

function renderEditContactsDropdown(contacts) {
  const list = document.getElementById("editContactSelection");
  list.innerHTML = "";

  contacts.forEach(contact => {
    const isSelected = selectedEditContacts.some(c => c.id === contact.id);

    const li = document.createElement("li");
    li.innerHTML = `
      <label id="edit-assigned-list-${contact.id}" class="assigned-list" style="${isSelected ? 'background:#2A3647;' : ''}">
        <span style="background-color:${contact.color}; width:43px" class="assigned-list-initials">${contact.init}</span> 
        <span class="assigned-list-name" style="${isSelected ? 'color:#fff;' : ''}">${contact.name}</span>
        <img class="checkbox" 
             src="${isSelected ? '../img/clicked.svg' : '../img/check-button.svg'}" 
             data-checked="${isSelected}" 
             value="${contact.id}">
      </label>
    `;
    list.appendChild(li);

    const label = li.querySelector("label");
    const img = li.querySelector("img");
    setupEditCheckboxToggle(label, img, "#2A3647");
  });
}

function setupEditCheckboxToggle(label, img, color) {
  label.addEventListener("click", (e) => {
    e.stopPropagation();
    const checked = img.dataset.checked === "true";
    const name = label.querySelector(".assigned-list-name");
    const initials = label.querySelector(".assigned-list-initials");

    if (!checked && selectedEditContacts.length < 3) {
      img.src = "../img/clicked.svg";
      img.dataset.checked = "true";
      label.style.backgroundColor = color;
      name.style.color = "#fff";
      selectedEditContacts.push({
        id: img.value,
        name: name.textContent,
        init: initials.textContent,
        color: initials.style.backgroundColor
      });
    } else {
      img.src = "../img/check-button.svg";
      img.dataset.checked = "false";
      label.style.backgroundColor = "";
      name.style.color = "";
      selectedEditContacts = selectedEditContacts.filter(c => c.id !== img.value);
    }
    updateEditAssignedSymbols();
  });
}

function updateEditAssignedSymbols() {
  const box = document.getElementById("edit-assigned-symbols");
  box.innerHTML = "";
  selectedEditContacts.slice(0,3).forEach(c => {
    const div = document.createElement("div");
    div.className = "assigned-symbol";
    div.style.backgroundColor = c.color;
    div.textContent = c.init;
    box.appendChild(div);
  });
}

function setupEditSearch(contacts) {
  const input = document.getElementById("edit-assign-input");
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(query));
    renderEditContactsDropdown(filtered);
  });
}
