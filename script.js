let allPokemons = [];
let language = 'en';
console.log('Das ist das Array', allPokemons);

const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};


function loadPokemon() {
    loadPokemonNames();
}
// async function loadPokemon() {
//     await loadPokemonNames();
// }


async function loadPokemonNames() {
    for (let i = 0; i < 30; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        let responseAsJson = await response.json();
        console.log(responseAsJson);

        let speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`);
        let speciesJson = await speciesResponse.json();
        // let evolution = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i + 1}`)
        // let evolutionJson = await evolution.json();
        // console.log('das ist evolution', evolutionJson);
        let pokemonText = speciesJson.flavor_text_entries[6];
        let moves = responseAsJson.moves;
        let pokemon = responseAsJson.name;
        let pokemonWeight = responseAsJson.weight;
        let pokemonHeight = responseAsJson.height;
        let stats = responseAsJson.stats;
        let types = responseAsJson.types;
        console.log('das ist species', speciesJson);

        allPokemons.push({
            id: i + 1,
            pokemonName: pokemon,
            type: types,
            moves: moves,
            text: pokemonText,
            stats: stats,
            weight: pokemonWeight,
            height: pokemonHeight,
            info: speciesJson,
        })

        console.log(getStatsNameByLanguage(i));

        document.getElementById('pokemonContent').innerHTML += createPokemonCard(i);;
        stylePokemonCard(i);
        showImages(i, allPokemons);
    }
}


function showImages(i, allPokemons) {
    if (allPokemons.id >= 650) {
        document.getElementById('pokemonImg').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${allPokemons[i].id}.png`;
    } else {
        document.getElementById(`pokemonImg${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home//${allPokemons[i].id}.png`;
    }
}


function updateProgressBar(i, x) {
    let percent = allPokemons[i].stats[x].base_stat;
    document.getElementById(`percent${x}`).innerHTML = `${percent} `;
    document.getElementById(`progressBar${x}`).style = `width: ${percent}%`;
}


function stylePokemonCard(i) {
    for (let j = 0; j < allPokemons[i].type.length; j++) {
        const type = allPokemons[i].type[j].type.name;
        let id = document.getElementById(`typeOfPokemon${i}`);

        id.innerHTML += /*html*/ `
            <div id="typeColour${j}${i}" class="typeColour"><span>${type}</span></div>
        `;

        document.getElementById(`typeColour${j}${i}`).style = (`background-color: ${colours[allPokemons[i].type[j].type.name]}`);
    }
}


function openPokedex() {
    document.getElementById('overlay').style = ('display: none');
}


function closeFullCard() {
    document.getElementById('openedCard').innerHTML = ``;
}


function swipeRight(i) {
    if (i < allPokemons.length - 1) {
        openFullInfo(i + 1);
        stylePokemonCard(i);
        showImages(i, allPokemons);
    } else {
        openFullInfo(0);
        stylePokemonCard(i);
        showImages(i, allPokemons);
    }
}


function swipeLeft(i) {
    if (i > 0) {
        openFullInfo(i - 1);
        stylePokemonCard(i);
        showImages(i, allPokemons);
    } else {
        openFullInfo(allPokemons.length - 1);
        stylePokemonCard(i);
        showImages(i, allPokemons);
    }
}


function filterNames() {
    let search = document.getElementById('searchPokemon').value;
    search = search.toLowerCase(); // Den input.value in kleinbuchstaben umwandeln


    for (let i = 0; i < allPokemons.length; i++) {
        let found = document.getElementById('foundedPokemon');
        let item = allPokemons[i];
        let foundedPokemon = item.pokemonName;
        console.log(foundedPokemon);
        if (foundedPokemon.toLowerCase().startsWith(search)) {
            found.innerHTML += `<li>${foundedPokemon}</li>`;
        }
    }
}