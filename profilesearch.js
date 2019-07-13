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

searchUsernameButton = document.getElementById("search-username")
username = document.getElementById("input-username")

profileDisplay = document.getElementById("profile-display")

leaderboardButton = document.getElementById("leaderboard-button")

function getValue(username){
    return firebase.database().ref('/values/' + username + '/foo/').once('value').then(function(snapshot){
        return snapshot.val()[username]
    })
}

function checkExist(u){
    console.log(u)
    return firebase.database().ref('users').orderByChild('username').equalTo(u).on("value", function(snapshot){
        if (snapshot.exists()){
            return true
        } else {
            return false
        }
    })
}

searchUsernameButton.addEventListener("click", ()=>{
    profileDisplay.innerText = null;
    if (checkExist(username.value)){
        let p = new Promise((resolve, reject)=> {
            let v = getValue(username.value)
            resolve(v)
        })

        p.then(v=>{
            let value = v;
            let div = document.createElement("div")
            let name = document.createElement("h2");
            let points = document.createElement("p");
            let rank = document.createElement("p");

            rank.innerText = "Rank: " + getRank(value)
        
            points.innerText = "Points: " + value;
            name.innerText = username.value;

            div.append(name)
            div.append(points)
            div.append(rank)

            div.classList.add("profile-card")

            profileDisplay.append(div)
        })
    }
})

leaderboardButton.addEventListener("click", ()=>{
    profileDisplay.innerText = null;
    let p = new Promise((resolve, reject)=>{
        firebase.database().ref('/values/').once('value').then(function(snapshot){
            obj = snapshot.val()
            resolve(obj)
        })
    })

    p.then(obj=>{
        entries = Object.entries(obj)
        entries.sort((a,b)=>b[1].foo[b[0]]-a[1].foo[a[0]])
        console.log(entries)
        for(let i = 0; i < entries.length; i++){
            let div = document.createElement("div");
            let name = document.createElement("h2");
            let points = document.createElement("p");
            let rank = document.createElement("p")

            rank.innerText = "Rank: " + getRank(entries[i][1].foo[entries[i][0]])

            points.innerText = "Points: " + entries[i][1].foo[entries[i][0]]
            name.innerText = entries[i][0]
            div.append(name)
            div.append(points)
            div.append(rank)
            div.classList.add("profile-card")
            profileDisplay.append(div)
        }
    })
})

function getRank(points){
    if(points === 0){
        return "Rookie"
    }else if (points < 3) {
        return "Avid Donator"
    }else {
        return "Master Donator"
    }
}


    // let p = new Promise((resolve, reject) => {
    //     firebase.database().ref().child("users/").on("value", function(snapshot){
    //         let values = snapshot.val();
    //         resolve(values);
    //     })
    // })

    // p.then(values => {
    //     console.log("values: " + values)
    //     let userid = values.filter(e=> e.username === seller);
    //     if(userid.length === 1){
    //         let p = new Promise((resolve, reject) => {
    //             firebase.database().ref().child("users/" + userid).on("value", function(snapshot){
    //                 let value = snapshot.val().value;
    //                 resolve(value);
    //             })
    //         })
        
    //         p.then(value => {
    //             console.log("values: " + value)
    //             let newvalue = value + 1;
    //             firebase.database().ref('users/' + userid).set({
    //                 value: newvalue
    //             })
    //         })
    //     }

    // })
