function openPokedex() {
    document.getElementById('overlay').style = ('display: none');
}


function closeFullCard() {
    document.getElementById('openedCard').innerHTML = ``;
}


function buildArrayOfPokemon(responseAsJson, speciesJson, evolutionJson) {
    return allPokemons.push({
        id: responseAsJson.id,
        pokemonName: responseAsJson.name,
        type: responseAsJson.types,
        moves: responseAsJson.moves,
        text: speciesJson.flavor_text_entries[6],
        stats: responseAsJson.stats,
        weight: responseAsJson.weight,
        height: responseAsJson.height,
        info: speciesJson,
        mainInfo: responseAsJson,
        evolution: evolutionJson,
    })
}


function swipeRight(i) {
    if (i < allPokemons.length - 1) {
        openFullInfo(i + 1);
        createPokemonType(i);
        showImages(i, allPokemons);
    } else {
        openFullInfo(0);
        createPokemonType(i);
        showImages(i, allPokemons);
    }
}


function swipeLeft(i) {
    if (i > 0) {
        openFullInfo(i - 1);
        createPokemonType(i);
        showImages(i, allPokemons);
    } else {
        openFullInfo(allPokemons.length - 1);
        createPokemonType(i);
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
    document.getElementById(`progressBar${x}`).style = `width: ${percent}%`;
    // document.getElementsById(`progressBar${0}`).style = `background-color: ${colours[allPokemons[i].type[0].type.name]} !Important`;
}


function styleFullCard(i) {
    let idsToStyle = document.querySelectorAll("#colorofOpenedCard, #curvedLine");
    for (let y = 0; y < allPokemons[i].type.length; y++) {
        idsToStyle[y].style = (`background-color: ${colours[allPokemons[i].type[0].type.name]}`);
    }
    document.getElementById(`pokemonImgFullCard${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home//${allPokemons[i].id}.png`;
}


function changeToShiny(i) {
    document.getElementById(`pokemonImgFullCard${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${allPokemons[i].id}.png`
}


async function getJsons(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    let responseAsJson = await response.json();
    // console.log(responseAsJson);

    let speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`);
    let speciesJson = await speciesResponse.json();
    let evolution = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i + 1}`);
    let evolutionJson = await evolution.json();
    console.log('das ist evolution', evolutionJson);
    buildArrayOfPokemon(responseAsJson, speciesJson, evolutionJson);
}