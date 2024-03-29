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

let getRecipeAPI = async (x) => {
    foodDisplay.innerText = "";
    let obj = { ingredients: x }
    console.log(obj.ingredients)
    let response = await fetch(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${obj.ingredients}`)
  
    let data = await response.json()
  
  
  
    let allTitles = data.results.map((elem) => {
        let dishlink = document.createElement("a");
        let dishcard = document.createElement("div");
        let dishname = document.createElement("h2");
        let dishingredients = document.createElement("p");
        dishcard.classList.add("dishcard")
        dishname.innerText = elem.title;
        dishname.innerText = dishname.innerText.replace(/(\r\n|\n|\r)/gm,"");
        dishlink.href = elem.href;
        dishlink.target = "_blank";
        dishingredients.innerText = elem.ingredients;
        // dishname.append(dishnamelink.href);
        dishcard.append(dishname);
        dishcard.append(dishingredients);
        dishlink.append(dishcard)
        foodDisplay.append(dishlink)
    })
  
}

let foodDisplay = document.getElementById("recipe-display")

let button_ingredients = document.getElementById("search-ingredients-button")
let input_ingredients = document.getElementById("input-ingredients")

button_ingredients.addEventListener("click", ()=>{
    getRecipeAPI(input_ingredients.value)
})