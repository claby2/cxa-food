hamburger = document.getElementById("hamburger");
hamburger_dropdown = document.getElementById("hamburger-dropdown-id");
dropdown_exit = document.getElementById("dropdown-exit-id");
to_swap = document.getElementById("to-swap");

hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("hamburger-active");
    hamburger_dropdown.classList.toggle("active");
});

window.onresize = ()=>{
    if(window.innerWidth > 1000){
        hamburger_dropdown.classList.remove("active");
        hamburger.classList.remove("hamburger-active");
    }
}

username = document.getElementById("input-username")
password = document.getElementById("input-password")
loginButton = document.getElementById("login-button")

function writeUserData(username, password, l) {
    // console.log(len)
    firebase.database().ref('users/' + l).set({
        username: username,
        password: password,
    });

    foo = {}; 
    foo[username] = 0; 
    firebase.database().ref('values/' + username).set({foo})
}

loginButton.addEventListener("click", ()=>{
    user = username.value
    pass = password.value

    let p = new Promise((resolve, reject) => {
        firebase.database().ref().child("users").on("value", function(snapshot){
            let len = snapshot.numChildren();
            resolve(len);
        })
    })

    p.then(len => {
        writeUserData(user, pass, len)

    })
})