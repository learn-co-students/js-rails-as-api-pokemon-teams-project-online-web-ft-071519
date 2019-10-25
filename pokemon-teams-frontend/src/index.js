const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainersList = document.getElementById("trainers-list")

document.addEventListener("DOMContentLoaded", fetchTrainers());

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => loadTrainers(json))
}

function loadTrainers(json) {
    //console.log(json)
    json.data.forEach(trainer => {
        const div = document.createElement('div')
        div.className = 'card'
        div.id = trainer.attributes.id
        trainersList.appendChild(div)

        const h2 = document.createElement('h2')
        h2.innerText = trainer.attributes.name
        div.appendChild(h2)

        const ul = document.createElement('ul')
        ul.className = 'pokemons-list'
        div.appendChild(ul)

        renderPokemons(trainer);
    })
}

function renderPokemons(trainer_json){
    //console.log(trainer_json)
  trainer_json.attributes.pokemons.forEach(pokemon => {
    const trainerDiv = document.getElementById(trainer_json.id)

    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    trainerDiv.lastElementChild.appendChild(li)

  })
}





