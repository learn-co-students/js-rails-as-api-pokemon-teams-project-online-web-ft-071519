const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers/`;

const createPoke = function(poke) {
    const li = document.createElement('li');
    li.id = `${poke.id}-poke`
    const pokeData = document.createTextNode(`${poke.attributes.nickname} (${poke.attributes.species})`);
    li.appendChild(pokeData);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'release';
    deleteBtn.setAttribute('data-pokemon-id' ,`${poke.id}`);
    const release = document.createTextNode('Release');
    deleteBtn.appendChild(release);
    deleteBtn.addEventListener('click', function() {
        deletePoke(poke.id, poke.attributes.trainer_id)
    });
    li.appendChild(deleteBtn);
    const ul = document.getElementById(`${poke.attributes.trainer_id}-pokes`);
    ul.appendChild(li);
};

const addPoke = function(trainerId) {
    console.log(`Add a pokemon for ${trainerId}`);
    let newURL = TRAINERS_URL + trainerId + `/pokemons`;

    let configObj = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(trainerId)
    };

    fetch(newURL, configObj)
    .then(function (response) {
        return response.json();
    })
    .then(function (object) {
        let poke = object.data;
        createPoke(poke)
    })
    .catch(function (error) {
        alert('It got away!');
        console.log(error.message)
    })
};

const deletePoke = function(pokeId, trainerId) {
    console.log(`Delete a pokemon for ${pokeId}`);
    let delURL = TRAINERS_URL + trainerId + `/pokemons/` + pokeId;

    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pokeId)
    };

    fetch(delURL, configObj)
        .then(function (response) {
            return response.json();
        })
        .then(function (object) {
            const li = document.getElementById(`${pokeId}-poke`)
            li.parentNode.removeChild(li)
            // const ul = document.getElementById(`${trainerId}-pokes`);
            // ul.removeChild(li)
        })
        .catch(function (error) {
            alert('It got away!');
            console.log(error.message)
        });
};

const createTrainerCard = function(trainer, object) {
    const main = document.querySelector('main');
    // <div class="card" data-id="1">
    const div = document.createElement('div');
    div.className = 'card';
    div.setAttribute('data-id' , trainer.id);
    main.appendChild(div);

    // <p>Prince</p>
    const p = document.createElement('p');
    const name = document.createTextNode(trainer.attributes.name);
    p.appendChild(name);
    div.appendChild(p);

    // <button data-trainer-id="1">Add Pokemon</button>
    const addBtn = document.createElement('button');
    addBtn.setAttribute('data-trainer-id' , trainer.id);
    const add = document.createTextNode('Add Pokemon');
    addBtn.appendChild(add);
    div.appendChild(addBtn);

    addBtn.addEventListener('click', function() {
        const pokeCount = document.getElementById(`${trainer.id}-pokes`).children.length;
        if (pokeCount < 6) {
            addPoke(trainer.id)
        } else {
            alert(`${trainer.attributes.name} can only have 6 Pokemon!`)
        }
    } );

    // <ul>
    const ul = document.createElement('ul');
    ul.id = `${trainer.id}-pokes`;
    div.appendChild(ul);

    // <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    let pokemonArray = trainer.relationships.pokemon.data;
    for (const element of pokemonArray) {
        const pokeObject = object.included.findIndex(i => i.id === element.id);
        const pokemon = object.included[pokeObject];
        createPoke(pokemon)
    }

};

const renderTrainers = function() {
  fetch('http://localhost:3000/trainers')
      .then(function (response) {
          return response.json();
      })
      .then(function(object) {
          for (const trainer of object.data) {
              createTrainerCard(trainer, object)
          }
      })
};

document.addEventListener('DOMContentLoaded', function() {
    console.log("Gotta Catch 'Em All!");
    renderTrainers()
});