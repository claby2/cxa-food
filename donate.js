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

function createCard(img, name, expiry, info, seller){
    let foodcard = document.createElement('div');
    let foodimg = document.createElement('img');
    let foodname = document.createElement('h2');
    let foodexpiry = document.createElement('p');
    let foodinfo = document.createElement('p');
    let foodseller = document.createElement('h4');

    foodimg.src = img;
    foodname.innerText = name;
    foodexpiry.innerText = "expires: " +  expiry;
    foodinfo.innerText = info;
    foodseller.innerText = seller;

    foodcard.classList.add("sellcard")

    foodimg.classList.add("foodimage")

    foodcard.appendChild(foodimg)
    foodcard.appendChild(foodname)
    foodcard.appendChild(foodexpiry)
    foodcard.appendChild(foodinfo)
    foodcard.appendChild(foodseller)

    itemgrid.append(foodcard)
}
for (let i = 0; i < 20; i++){
    createCard("./foodimg.jpg", "Lay's Classic Potato Chips", "8/11/19", "Unopened chips which I do not plan on eating anytime soon.", "Edward")
}
