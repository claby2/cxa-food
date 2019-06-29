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

// user.push({'Craig':'123456'})