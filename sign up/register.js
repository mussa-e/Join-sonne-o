async function register() {
    let userName = document.getElementById("name-SignUp").value;
    let email = document.getElementById("email-SignUp").value;
    let password = document.getElementById("password-SignUp").value;

    if(email && password && userName) {
        await postData("users/", {
            "name": userName,
            "email": email, 
            "password": password, 
            "id":users.length
        });

        document.getElementById("name-SignUp").value = "";
        document.getElementById("email-SignUp").value = "";
        document.getElementById("password-SignUp").value = "";
}

initUsers();


showReportRegister();

}


function showReportRegister() {
      const popup = document.getElementById("Msg-Box");
      popup.classList.add("show");

      setTimeout(() => {
        window.location.href = "../index/index.html";
      }, 1500);

      setTimeout(() => {
        popup.classList.remove("show");
      }, 1500);
    }



////here begins the firebase//////////////////////////////////////////////////
let users = [];
let tasks = [];

//firebase von Arnesto 
const Arnesto_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"; 

//meine test firebase url
const BASE_URL = "https://join-test-dd7c9-default-rtdb.europe-west1.firebasedatabase.app/";

function initUsers(){
    loadData();
    loadUsers();
    
}


async function loadData(path="") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}


async function loadUsers() {
    const data = await loadData("users");
    users = Object.values(data || {});
}


async function putData(path="", data={}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    
    return await response.json();
}


async function renderUser() {

    const data = await loadData("users");
    users = Object.values(data || {});

    updateNormalHTML();
    updatePlusHTML();
}


async function postData(path="", data={}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


