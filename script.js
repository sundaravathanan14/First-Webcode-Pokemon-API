// fetching all pokemon list from a api

// for (let i=1;i<=60;i++){
//  var pokemonList = fetch( `https://pokeapi.co/api/v2/pokemon/${i}`);
//   getpokemonDetails(pokemonList);

// }
// async function getpokemonDetails(data){
//     try{
//         var list=await data;
//         var plist=await list.json();
//         displayPokemon(plist);
//     }
//     catch(error){
//         console.log(error);
//     }
// }



// function displayPokemon(data){
//     console.log(data);
// }

function fetchTable(url) {
    var pokemonList = fetch(url);
    getallpokemon();

    // used async await function for data formating 
    async function getallpokemon() {
        try {
            var list = await pokemonList;
            var plist = await list.json();

            displayTable(plist);
            setButton(plist);
        }
        catch (error) {
            console.log(error);
        }
    }

}


fetchTable("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0");
//getallpokemon();
getSinglePokemon('https://pokeapi.co/api/v2/pokemon/1/');

//creating table for list 
var container = document.createElement("div");
container.setAttribute("class", "container");

var table = document.createElement("table");
var tr = document.createElement("tr");
var th1 = document.createElement("th");
var th2 = document.createElement("th");
var tbody = document.createElement("tbody");
table.setAttribute("border", "1");
tr.append(th1, th2);
table.append(tr, tbody);
th1.innerHTML = "Name";
th2.innerHTML = "Action";
var cardContainer = document.createElement("div");
cardContainer.setAttribute("class", "card-container");
var card = document.createElement("div");
card.setAttribute("class", "card");
card.setAttribute("id", "item");
var buttonDiv = document.createElement("div");
buttonDiv.setAttribute("class", "buttons");
// var prevButton = document.createElement("button");
// prevButton.innerHTML = "Prev";
// var nextButton = document.createElement("button");
// nextButton.innerHTML = "Next";

//buttonDiv.append(prevButton,nextButton);


cardContainer.append(card);
container.append(table, cardContainer);
document.body.append(container, buttonDiv);
function displayTable(data) {
    tbody.innerHTML = "";
    for (let i = 0; i < data.results.length; i++) {
        tbody.innerHTML += `<tr>
    <td>${data.results[i].name}</td>
    <td><a onclick="getSinglePokemon('${data.results[i].url}')">Show Detail</a></td>
    </tr>
    `;

    }


}
function setButton(data) {
    buttonDiv.innerHTML = "";
    buttonDiv.innerHTML += `<button onclick="fetchTable('${data.previous}')">Prev</button><button onclick="fetchTable('${data.next}')">Next</button>`;
}
function getSinglePokemon(data) {
    var pokemon = fetch(data);
    getpokemon();
    async function getpokemon() {
        try {
            var item = await pokemon;
            var pitem = await item.json();

            displayCard(pitem);
        }
        catch (error) {
            console.log(error);
        }
    }
}
function displayCard(data) {
    var pokemon1 = document.getElementById("item");  
    pokemon1.innerHTML = `<div class="card">
   <div class="card-img"><img src="${data.sprites.front_default}" alt="${data.name}">
     <h1>${data.name}</h1>
   </div>
   <div class="card-details"><span>Weight: ${data.weight}</span><span>Moves:${data.moves.length}</span></div>
   
   
 </div>`;

    var cardText = document.createElement("div");
    cardText.setAttribute("class", "card-text");
    cardText.innerHTML = `<h2>Ability</h2>`
    for (let i = 0; i < data.abilities.length; i++) {
        cardText.innerHTML += `<p>${data.abilities[i].ability.name}</p>`;
    }
    pokemon1.append(cardText);

}



