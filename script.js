let allPokemons = [];
console.log('Das ist das Array', allPokemons);


function loadPokemon() {
    loadPokemonNames();
    loadPokemonTypes();
}


async function loadPokemonNames() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10');
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    for (let i = 0; i < responseAsJson.results.length; i++) {
        const pokemon = responseAsJson.results[i];
        let content = document.getElementById('pokemonContent');

        allPokemons.push({
            id: i + 1,
            pokemonName: pokemon.name,
            type: [],
        })
        content.innerHTML += /*html*/`
            <div class="pokemonCard" id="pokemonCard">
                <span>${allPokemons[i].pokemonName}</span> <span>#${allPokemons[i].id}</span >
            </div >
            `
    }
}


async function loadPokemonTypes() {
    for (let i = 0; i < 18; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/type/${i + 1}`);
        let responseAsJson = await response.json();
        // console.log('das ist responseasjson', responseAsJson);
        let currentPokemon = responseAsJson.pokemon;
        console.log('das ist currentpokemon', currentPokemon);
        for (let j = 0; j < currentPokemon.length; j++) {
            const pokemon = currentPokemon[j].pokemon;
            if (pokemon <= allPokemons) {
                // allPokemons[pokemon].type.push(responseAsJson.name);
            }
        }

    }

}


// 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/'


