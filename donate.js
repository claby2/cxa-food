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

let itemgrid = document.getElementById("itemgrid");

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

function createCard(i, name, expiry, info, seller){
    let foodcard = document.createElement('div');
    let foodimg = document.createElement('img');
    let foodname = document.createElement('h2');
    let foodexpiry = document.createElement('p');
    let foodinfo = document.createElement('p');
    let foodseller = document.createElement('h4');

    storageRef.child((i+1).toString(10)).getDownloadURL().then(function(url) {
        foodimg.src = url;
        console.log(url)
    }).catch(function(error) {})
    // foodimg.src = img;
    foodname.innerText = name;
    foodexpiry.innerText = "expires: " +  expiry;
    foodinfo.innerText = info;
    foodseller.innerText = seller;

    foodcard.classList.add("sellcard")
    foodcard.onclick = goPreview()

    foodimg.classList.add("foodimage")

    foodcard.appendChild(foodimg)
    foodcard.appendChild(foodname)
    foodcard.appendChild(foodexpiry)
    foodcard.appendChild(foodinfo)
    foodcard.appendChild(foodseller)

    itemgrid.append(foodcard)
}
// for (let i = 0; i < 20; i++){
//     createCard("./foodimg.jpg", "Lay's Classic Potato Chips", "8/11/19", "Unopened chips which I do not plan on eating anytime soon.", "Edward")
// }


// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
// var storageRef = storage.ref();

// storageRef.child[i].getDownloadURL().then(function(url) {
//     // `url` is the download URL for 'images/stars.jpg'
//     let img = document.getElementById('myimg')
//     img.src = url
// }).catch(function(error) {})j

// for (let i = 0; i < foodid.length; i++){
//     // storageRef.child[i].getDownloadURL().then(function(url) {
//     //     img = url;
//     // }).catch(function(error) {})
// }



// for(let i = 0; i < _; i++){
//     firebase.database().ref('fooditems').once('value').then(function(snapshot){
//         keys.push()
//     })
// }

// var key = Object.keys(snapshot.val())[0];

let p = new Promise((resolve, reject) => {
    
    let query = firebase.database().ref("fooditems").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        let keys = [];
        snapshot.forEach(function(childSnapshot) {
            keys.push(childSnapshot.key);
        });
        resolve(keys);
    });
});

p.then(keys => {
    console.log(keys)
    console.log(keys.length)
    for(let i = 0; i < keys.length; i++){
        firebase.database().ref('fooditems/' + keys[i]).once('value').then(function(snapshot){
            name = snapshot.val().foodname
            expiry = snapshot.val().foodexpiry
            info = snapshot.val().foodinfo
            seller = snapshot.val().foodseller
            createCard(i, name, expiry, info, seller)
        })
        // storage.ref().child('image/' + i + '.jpeg').getDownloadURL().then(function(url) {
        //     img = url
        // }).catch(function(error) {})

        // createCard(i, name, expiry, info, seller)
    }
})

let goPreview = function() {
    window.location.href = "./preview.html";
};

// storageRef.child('image/' + i + '.jpeg').getDownloadURL().then(function(url) {
//     // `url` is the download URL for 'images/stars.jpg'
//     img = url
// })
// .catch(function(error) {

// })


// fooditemsdb.forEach(e=>{
//     createCard("./foodimg.jpg", snapshot.val().foodname, snapshot.val().foodexpiry, snapshot.val().foodinfo, snapshot.val().foodseller)
// })

// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//     // ...
//   });
