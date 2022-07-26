let allPokemons = [];
let pokemonStats = [];
let language = 'en';
let limit = 20;
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
    for (let i = 0; i < limit; i++) {
        await getJsons(i);
    }
    createPokemonCard();
}


function createPokemonType(i) {
    let id = document.getElementById(`typeOfPokemon${i}`);
    id.innerHTML = '';
    for (let j = 0; j < allPokemons[i].type.length; j++) {
        const type = allPokemons[i].type[j].type.name;
        id.innerHTML += /*html*/ `
            <div id="typeColour${j}${i}" class="typeColour"><span>${type}</span></div>
        `;

        document.getElementById(`typeColour${j}${i}`).style = (`background-color: ${colours[allPokemons[i].type[j].type.name]}`);
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
    createPokemonCard();
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
    // resolved all promises simultaneously
    pokemonStats = await Promise.all(promises); // resolved alle promises parallel und pusht diese in das leere Array z.B typesOfPokemon
}

function getStatsNameByLanguage() {
    return allPokemons[i].names.find(n => n.language.name === language);
}


function showCleanPokedex() {
    openPokedex();
    document.body.style.cssText = ('background-image: unset; background-color: rgb(91 83 83 / 50%)');
    styleCleanPokedex();
}


function styleCleanPokedex() {
    let cardCollection = document.getElementsByClassName('pokemonCard');
    for (let i = 0; i < allPokemons.length; i++) {
        let nameCollection = document.getElementsByClassName('pokName');
        document.getElementsByClassName('nr')[i].style = ('color: rgb(26 25 25 / 30%)');
        cardCollection[i].style = ('background-color: ghostwhite');
        nameCollection[i].style = ('color: black');
        document.getElementById(`pokemonCard${i}`).classList.remove("pokemonCard");
        document.getElementById(`pokemonCard${i}`).classList.add("cleanCard");
        document.getElementById(`pokemonImg${i}`).classList.add("cleanPicture");
    }
}