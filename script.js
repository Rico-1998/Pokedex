let allPokemons = [];
let pokemonStats = [];
let language = 'en';
let limit = 20;
let currentPokemonEvolution = [];
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


async function loadPokedex() {
    for (let i = 0; i < limit; i++) {
        await getJsons(i);
    }
    renderPokemonCard();
}


function filterNames() {
    let actualPokemon = [];
    let search = document.getElementById('searchPokemon').value;
    search = search.toLowerCase(); // Den input.value in kleinbuchstaben umwandeln
    console.log(search);
    getActualPokemonForSearch(search);
}


function getActualPokemonForSearch(search, actualPokemon) {
    if (search.length === 0) {
        renderPokemonCard();
    } else {
        for (let j = 0; j < allPokemons.length; j++) {
            if (isNaN(search)) {
                checkForPokemon(j, search, actualPokemon);
            }
        }
    }
}

function checkForPokemon(j, search, actualPokemon) {
    let actualName = allPokemons[j].pokemonName;
    if (actualName.toLowerCase().includes(search)) {
        actualPokemon = allPokemons[j];
        let foundedPokemon = document.getElementById('foundedPokemon');
        let i = actualPokemon.id - 1
        let pokemonName = actualName.pokemonName;
        let pokemonImg = allPokemons[i].mainInfo.sprites.other.dream_world.front_default;
        foundedPokemon.innerHTML = ''
        foundedPokemon.innerHTML += createPokemonCard(i, actualPokemon, pokemonName);
        renderPokemonTypeColour(i, actualPokemon, pokemonName);
        // showImages(i, actualPokemon, pokemonName);
    }
}


window.addEventListener('scroll', lazyLoad);
let isLoading = false;
function lazyLoad() {
    //   getElement('pokemonLoader').classList.remove('hide');
    let h = document.documentElement;
    let b = document.body;
    let st = 'scrollTop';
    let sh = 'scrollHeight';

    let percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

    if (percent > 70 && !isLoading) {
        isLoading = true;
        limit += 15;
        loadMorePokemons();
    }
}

async function loadMorePokemons() {
    for (let i = allPokemons.length + 1; i < limit; i++) {
        await getJsons(i);
    }
    renderPokemonCard();
    isLoading = false;
}



async function fetchUrl(url) {
    let response = await fetch(url);
    return (currentResponse = await response.json());
}


async function loadStats() {
    let promises = [];
    for (let i = 1; i < 6; i++) {
        let url = `https://pokeapi.co/api/v2/stat/` + i;
        promises.push(fetchUrl(url)); //pusht alle Serveranfragen in ein Array
    }
    pokemonStats = await Promise.all(promises);
    // alle funktionen die ein await brauchen zum bsp fetch url werden mit promise abgewartet also brauch man nicht bei allem await schreiben sondern nur einmal promise.all(promise)
}

function getStatsNameByLanguage() {
    return allPokemons[i].names.find(n => n.language.name === language);
}


function showCleanPokedex() {
    document.getElementById('stylesheet').href = 'cleanCard.css';
    openPokedex();
}


