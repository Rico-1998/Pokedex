let allPokemons = [];
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


async function loadPokemonNames() {
    for (let i = 0; i < 10; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        let responseAsJson = await response.json();
        console.log(responseAsJson);

        const pokemon = responseAsJson.name;
        const pokemonWeight = responseAsJson.weight;

        let firstType = responseAsJson.types[0].type.name;
        let secondType = responseAsJson.types[1]?.type.name;
        console.log('das ist types ');

        allPokemons.push({
            id: i + 1,
            pokemonName: pokemon,
            type: [firstType, secondType || ''],
            weight: pokemonWeight,
        })


        let content = document.getElementById('pokemonContent');
        content.innerHTML += createPokemonCard(i);
        document.getElementById(`typeOfPokemon${i}`).innerHTML = '';
        for (let j = 0; j < 2; j++) {
            const actualType = allPokemons[i].type[j];
            document.getElementById(`typeOfPokemon${i}`).innerHTML += `<div> <span>${actualType}</span> </div> `;
        }

        showImages(i, allPokemons);

    }
}


function openPokedex() {
    document.getElementById('overlay').style = ('display: none');
}



function showImages(i, allPokemons) {
    if (allPokemons.id >= 650) {
        document.getElementById('pokemonImg').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${allPokemons.id}.png`;
    } else {
        document.getElementById(`pokemonImg${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${allPokemons[i].id}.gif`
    }
}
















// 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/'

// async function loadPokemonNames() {
//     let response = await fetch('https://pokeapi.co/api/v2/pokemon/');
//     let responseAsJson = await response.json();
//     console.log(responseAsJson);
//     for (let i = 0; i < responseAsJson.results.length; i++) {
//         const pokemon = responseAsJson.results[i];
//         let content = document.getElementById('pokemonContent');

//         allPokemons.push({
//             id: i + 1,
//             pokemonName: pokemon.name,
//             type: [],
//         })

//         content.innerHTML += createPokemonCard(i);
//     }
// }


// let responseImg = await fetch('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
// let imgAsJson = await responseImg.json();