
console.log('test')
let image = document.getElementById('image')

let uploader = document.getElementById('uploader')
let fileButton = document.getElementById('fileButton')
// Create a root reference

let stringRef = firebase.storage().ref('string.txt')

let storage = firebase.storage()
let storageRef = storage.ref()
//listen to file upload

fileButton.addEventListener("change", function(e){
    let p = new Promise((resolve, reject) => {
        firebase.database().ref().child("fooditems").on("value", function(snapshot){
            let len = snapshot.numChildren();
            resolve(len);
        })
    })

    p.then(len => {
        let imageRef = firebase.storage().ref((len+1).toString(10));
        let file = e.target.files[0];
        let metadata = {
            contentType: 'image/jpeg',
        };
        let task = imageRef.put(file, metadata);
    
        task.on('state_changed',
            function progress(snapshot){
                let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                uploader.value = percentage
    
            },
    
            function err(err){
                console.log(err)
            },
    
            function complete(){
                console.log('File uploaded')
                image.classList.remove("hide")
            }
        );

    })
})

function writeFoodData(name, expiry, info, seller) {
    // console.log(len)
    firebase.database().ref('fooditems/').push({
        foodname: name,
        foodexpiry: expiry,
        foodinfo: info,
        foodseller: seller
    });

}

function updateValue(seller){
    // foo = {}; 
    getOldValue(seller).then(newValue => 
        firebase.database().ref('/values/' + seller + '/foo/' + seller).set(newValue+1)
    );

}

function getOldValue(seller){
    return firebase.database().ref('/values/' + seller + '/foo/').once('value').then(function(snapshot){
        console.log(snapshot.val()[seller])
        return snapshot.val()[seller]
    })
}
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//     // ...
//   });

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

    // let userid = firebase.database().ref('users/').once("value").then(function(snapshot){snapshot.val()})

// function updateValue(seller){
//     // let p = new Promise((resolve, reject) =>{
//     //     firebase.database().ref().child("users").on("value", function(snapshot){
//     //         let userlength = snapshot.numChildren()
//     //         resolve(userlength)
//     //     })
//     // })

//     // p.then(userlength =>{
//     //     let p2 = new Promise((resolve, reject) =>{
//     //         let modifiableIDS = []
//     //         for(let i = 0; i < userlength; i++){
//     //             firebase.database().ref().child("users/" + i).on("value", function(snapshot){
//     //                 console.log(snapshot.val().username)
//     //                 console.log(seller)
//     //                 if(snapshot.val().username === seller){
//     //                     console.log("found same")
//     //                     modifiableIDS.push(i, snapshot.val().value)
//     //                     resolve(modifiableIDS)
//     //                 }
//     //             })
//     //         }
//     //     })

//     //     p2.then(modifiableIDS =>{
//     //         console.log(modifiableIDS)
//     //         console.log(modifiableIDS[0][0])
//     //         for(let i = 0; i < modifiableIDS.length; i++){
//     //             firebase.database().ref().child("users/" + modifiableIDS[i][0]).update({
//     //                 value : (modifiableIDS[i][1] + 1)
//     //             })
//     //         }
//     //     })
//     // })

//     // firebase.database().ref('users').orderByChild('username').equalTo(seller).on("value", function(snapshot) {
//     //     if (snapshot.exists()){
//     //         let value = snapshot.val().value;
//     //         let key = snapshot.ref.parent.key;
//     //         addToValue(value, key)
//     //     }
//     // })
// }

// function addToValue(value, p){
//     firebase.database().ref('users/' + p).update({
//         value : (value + 1)
//     })
// }


// console.log(snapshot.ref.parent.key)
// firebase.database().ref(snapshot.ref.parent.key).update({
//     value : (value + 1)
// })

// var ref = firebase.database().ref("users/ada");
// ref.once("value")
//   .then(function(snapshot) {
//     var a = snapshot.numChildren(); // 1 ("name")
//     var b = snapshot.child("name").numChildren(); // 2 ("first", "last")
//     var c = snapshot.child("name/first").numChildren(); // 0
//   });

// let ref = firebase.database().ref("fooditems");
// ref.once("value").then(function(snapshot){return snapshot.numChildren();})

// function getFoodItemAmount(){
//     // firebase.database().ref("fooditems").on("value", function(snapshot) {
//     //     return snapshot.numChildren()
//     // })
//     let ref = firebase.database().ref("fooditems/");
//     // return Object.keys(ref)
//     ref.once("value").then(function(snapshot){
//         let fooditems = Object.keys(snapshot.val())
//         console.log (fooditems.length )
        
//         return fooditems.length
//     })
// }

// ref.on("child_added", function(snapshot, prevChildKey) {
//     var newPost = snapshot.val();
//     console.log("Author: " + newPost.author);
//     console.log("Title: " + newPost.title);
//     console.log("Previous Post ID: " + prevChildKey);
//   });

nameinput = document.getElementById("input-name");
expiryinput = document.getElementById("input-expiry");
infoinput = document.getElementById("input-info");
sellerinput = document.getElementById("input-seller");

// writeFoodData("coolfoodname", "420/420/420", "this cool food is fresh", "me");

uploadbutton = document.getElementById("upload-button");

uploadbutton.addEventListener("click", ()=>{
    writeFoodData(nameinput.value, expiryinput.value, infoinput.value, sellerinput.value)
    updateValue(sellerinput.value)
})