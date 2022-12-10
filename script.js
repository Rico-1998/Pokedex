let allPokemons = [];
let pokemonStats = [];
let language = 'en';
let limit = 20;
let currentPokemonEvolution = [];



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
    activateLoader();
    for (let i = 0; i < limit; i++) {
        await getJsons(i);
    }
    renderPokemonCard();
    deactivateLoader();
}

function activateLoader() {
    document.querySelector('.loaderBox').classList.remove('d-none');
    document.body.style = 'overflow: hidden';
}

function deactivateLoader() {
    document.querySelector('.loaderBox').classList.add('d-none');
    document.body.style = 'overflow: auto';
}


function filterNames() {
    let actualPokemon = [];
    document.getElementById('pokemonContent').classList.add('d-none');
    document.getElementById('foundedPokemon').innerHTML = '';
    let search = document.getElementById('searchPokemon').value.toLowerCase();
    getActualPokemonForSearch(search, actualPokemon);
}


function getActualPokemonForSearch(search, actualPokemon) {
    if (search.length === 0) {
        renderPokemonCard();
        document.getElementById('pokemonContent').classList.remove('d-none');
        document.body.style = 'overflow: auto';
    } else {
        for (let j = 0; j < allPokemons.length; j++) {
            if (search) {
                checkForPokemon(j, search, actualPokemon);
            }
        }
    }
}


function checkForPokemon(j, search, actualPokemon) {
    let actualName = allPokemons[j].pokemonName;
    if (actualName.toLowerCase().includes(search)) {
        actualPokemon = allPokemons[j];
        let i = actualPokemon.id - 1;
        showSearchedPokemon(i);
        document.body.style = 'overflow: hidden';
    }
}


function showSearchedPokemon(i) {
    document.getElementById('foundedPokemon').innerHTML += createPokemonCard(i);
    renderPokemonTypeColour(i);
}


window.addEventListener('scroll', lazyLoad);
let isLoading = false;
function lazyLoad() {
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
    activateLoader();
    for (let i = allPokemons.length; i < limit; i++) {
        await getJsons(i);
    }
    renderPokemonCard();
    isLoading = false;
    deactivateLoader();
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

