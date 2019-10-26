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

        //how do I make ul, form, and li's render in correct places?????
        renderPokemons(trainer, ul, div)
        createAddForm(trainer, div)
        addEventListenersToForms()
    })
}

function renderPokemons(trainer_json, list, trainerDiv){
  trainer_json.attributes.pokemons.forEach(pokemon => {

    const li = document.createElement('li')
    li.id = pokemon.id
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    list.appendChild(li)

    const releaseButton = document.createElement('button')
    releaseButton.class = 'release'
    releaseButton.innerHTML = 'Release'
    li.appendChild(releaseButton)

    addReleaseEventListener(releaseButton);

  })
}

 function addReleaseEventListener(button) {
   button.addEventListener('click', event => {
       const pokemonId = button.parentElement.id
       event.preventDefault();
       button.parentElement.parentElement.removeChild(document.getElementById(pokemonId))
       releasePokemon(pokemonId)
   })
 }


function createAddForm(trainer_json, trainerDiv){

  let f = document.createElement('form')
  f.setAttribute('method','post');
  f.className = 'new-pokemon-form'

  let i = document.createElement('input')
  i.setAttribute('type', 'text')
  i.setAttribute('name', 'nickname')
  i.setAttribute('value', 'Nickname')

  let i2 = document.createElement('input')
  i2.setAttribute('type', 'text')
  i2.setAttribute('name', 'species')
  i2.setAttribute('value', 'Species')

  let s = document.createElement('input')
  s.setAttribute('type', 'submit')
  s.setAttribute('value', 'Add Pokemon')

  f.appendChild(i)
  f.appendChild(i2)
  f.appendChild(s)
  trainerDiv.appendChild(f)
}


function addEventListenersToForms() {
    const forms = document.querySelectorAll('form')
  
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            addPokemon(event.target)
        })
    })
  }


function addPokemon(form) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
          "nickname": form.nickname.value, 
          "species": form.species.value, 
          "trainer_id": form.parentElement.id})
    }
//an error is occuring and the DOM is not updating automatically with new li for poke. Why??
    fetch('http://localhost:3000/pokemons', configObj)
    // .then(fetchTrainers())
    .then(function(response) {
        return response.json()
    })
    .then(function(object){
        createPokemon(object.data)
    })
}

function createPokemon(data) {
    //console.log(data)
    const ul = document.getElementById(data.relationships.trainer.data.id).querySelector('ul')
    const li = document.createElement('li')
    li.id = data.id
    li.innerText = `${data.attributes.nickname} (${data.attributes.species})`
    ul.appendChild(li)

}


 function releasePokemon(pokemonId) {
    configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pokemonId)
    }

    fetch(`http://localhost:3000/pokemons/${pokemonId}`, configObj)
    .then(function(response) {
        return response.json()
    })
    .catch(error => {
        console.log(error.message)
    })
}
