
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

function writeFoodData(name, expiry, info, seller, id) {
    // console.log(len)
    firebase.database().ref('fooditems/').push({
        foodname: name,
        foodexpiry: expiry,
        foodinfo: info,
        foodseller: seller
    });
}

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
})