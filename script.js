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
    for (let i = 0; i < 30; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        let responseAsJson = await response.json();
        console.log(responseAsJson);

        let speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`);
        let speciesJson = await speciesResponse.json();
        let pokemonText = speciesJson.flavor_text_entries[6];
        let moves = responseAsJson.moves;
        console.log('das ist moves', moves);
        let pokemon = responseAsJson.name;
        let pokemonWeight = responseAsJson.weight;
        let stats = responseAsJson.stats;
        let firstType = responseAsJson.types[0].type.name;
        let secondType = responseAsJson.types[1]?.type.name; // das fragezeichen fragt ab ob die variable für jedes element existiert.

        allPokemons.push({
            id: i + 1,
            pokemonName: pokemon,
            type: [firstType, secondType || ''], // wenn secoondType undefinded ist soll einfach ein leerer string eingesetzt werden
            moves: moves,
            text: pokemonText,
            stats: stats,
            weight: pokemonWeight,
        })


        document.getElementById('pokemonContent').innerHTML += createPokemonCard(i);;
        stylePokemonCard(i);
        showImages(i, allPokemons);
    }
}


function showImages(i, allPokemons) {
    if (allPokemons.id >= 650) {
        document.getElementById('pokemonImg').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${allPokemons[i].id}.png`;
    } else {
        // document.getElementById(`pokemonImg${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${allPokemons[i].id}.gif`
        document.getElementById(`pokemonImg${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home//${allPokemons[i].id}.png`;
    }
}


function updateProgressBar(i, x) {
    let percent = allPokemons[i].stats[x].base_stat;
    document.getElementById(`progressBar${x}`).innerHTML = `${percent} `;
    document.getElementById(`progressBar${x}`).style = `width: ${percent}%;`;
}


function stylePokemonCard(i) {
    // document.getElementById(`pokemonCard${i}`).style = (`background-color: ${colours[allPokemons[i].type[0]]}`);
    document.getElementById(`pokemonCard${i}`).style = (`background: radial-gradient(circle, ${colours[allPokemons[i].type[0]]} 84%, rgba(252,252,252,0.9766500350140056) 100%);`);
    document.getElementById(`firstPokemonType${i}`).style = (`background-color: ${colours[allPokemons[i].type[0]]}`);
    document.getElementById(`secondPokemonType${i}`).style = (`background-color: ${colours[allPokemons[i].type[1]]}`);
}


Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});


function openPokedex() {
    document.getElementById('overlay').style = ('display: none');
}


function closeFullCard() {
    document.getElementById('openedCard').innerHTML = ``;
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


        // document.getElementById(`typeOfPokemon${ i } `).innerHTML = '';
        // for (let j = 0; j < 2; j++) {
        //     const actualType = allPokemons[i].type[j];
        //     document.getElementById(`typeOfPokemon${ i } `).innerHTML += ` < div id = "color${i}" > <span>${allPokemons[i].type[0]}</span> </div > `;
        //     document.getElementById(`color${ i } `).style = (`background - color: ${ colours[actualType] } `);
        // }
        // document.getElementById(`typeOfPokemon${ i } `).innerHTML += ` < div id = "color${i}" > <span id='firstPokemonType${i}'>${allPokemons[i].type[0]}</span> <span></span> </div > `;
        // document.getElementById(`typeOfPokemon${ i } `).innerHTML += ` < div id = "color${i}" > <span id='secondPokemonType${i}>${allPokemons[i]?.type[1]}</span> </div> `;


// let responseImg = await fetch('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
// let imgAsJson = await responseImg.json();