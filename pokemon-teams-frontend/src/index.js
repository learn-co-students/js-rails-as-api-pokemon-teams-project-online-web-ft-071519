const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAIN = document.getElementsByTagName('main')[0]

function fetchPokemons() {
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => addToCard(json));
}

function addToCard(json) {
    MAIN.innerHTML = ""
    json.forEach(trainer => {
        showCard(trainer)
    })
}

function showCard(trainer) {
    MAIN.innerHTML += `    <div class="card" data-id="${trainer.id}">
    <p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul id="list${trainer.id}">

    </ul>
  </div>`
    let list = document.querySelector(`#list${trainer.id}`)
    list.innerHTML = ""
    trainer.pokemons.forEach(pokemos => {
        list.innerHTML += `<li>${pokemos.nickname} (${pokemos.species}) <button class="release" data-pokemon-id="${pokemos.id}">Release</button></li>`
    })
}

document.addEventListener('DOMContentLoaded', function () {
    fetchPokemons()
})

MAIN.addEventListener("click", function (e) {
    // e.target is our targetted element.
    // try doing console.log(e.target.nodeName), it will result LI
    if (e.target && e.target.nodeName == "BUTTON" && e.target.getAttribute("data-trainer-id") != null) {
        addPokemon(e.target.getAttribute("data-trainer-id"))
        console.log(e.target.getAttribute("data-trainer-id"))
    } else if (e.target && e.target.nodeName == "BUTTON" && e.target.getAttribute("data-trainer-id") == null) {
        deletePokemon(e.target.getAttribute("data-pokemon-id"))
        console.log(e.target.getAttribute("data-pokemon-id"))
    }
});
function deletePokemon(pokemonID) {
    let configObj = {
        method: "DELETE",
    };
    return fetch(`http://localhost:3000/pokemons/${pokemonID}`, configObj)
        .then(function (response) {
            return response.json();
        })
        .then(function (object) {
            fetchPokemons()

        })
        .catch(function (error) {


        });
}

function addPokemon(trainerId) {



    let configObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { "trainer_id": trainerId }
        )
    };

    return fetch(`http://localhost:3000/pokemons`, configObj)
        .then(function (response) {
            return response.json();

        })
        .then(function (object) {
            fetchPokemons()

        })
        .catch(function (error) {


        });
}