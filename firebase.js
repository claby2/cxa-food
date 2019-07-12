let DB = firebase.database()

let user = DB.ref("/")

// let checkData = async(path) => {
//     let loc = database.ref(path)
//     let snapshot = await loc.once("value")
//     let data = snapshot.val()
//     console.log(data)
//     console.log(Object.keys(data))
//}

user.on("value", ()=>{
    console.log("user added")
})

// user.push({'Craig':'123456

//Storage
let file = "https://anacortesoilandvinegarbar.com/wp-content/uploads/2015/11/apple.jpg"
let storage = firebase.storage()
let storageRef = storage.ref('food.jpeg')

let imageBlob = new Blob(['./food.jpeg'],{type:'image/jpeg' })

storageRef.put(imageBlob).then(function (snapshot){
    console.log('uploaded a blob or file!')
})

console.log(storageRef)
