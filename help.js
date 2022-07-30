function openPokedex() {
    document.getElementById('overlay').style = ('display: none');
    document.body.classList.remove('hidden');
}


function closeFullCard() {
    document.getElementById('openedCard').innerHTML = ``;
}


function buildArrayOfPokemon(responseAsJson, speciesJson) {
    return allPokemons.push({
        id: speciesJson.id,
        pokemonName: responseAsJson.name,
        pokemonImg: responseAsJson.sprites.other.home.front_default,
        type: responseAsJson.types,
        moves: responseAsJson.moves,
        text: speciesJson.flavor_text_entries[6],
        stats: responseAsJson.stats,
        weight: responseAsJson.weight,
        height: responseAsJson.height,
        info: speciesJson,
        mainInfo: responseAsJson,
    })
}


function swipeRight(i) {
    if (i < allPokemons.length - 1) {
        openFullInfo(i + 1);
        // showImages(i, allPokemons);
    } else {
        openFullInfo(0);
        // showImages(i, allPokemons);
    }
}


function swipeLeft(i) {
    if (i > 0) {
        openFullInfo(i - 1);
        // showImages(i, allPokemons);
    } else {
        openFullInfo(allPokemons.length - 1);
        // showImages(i, allPokemons);
    }
}


// function showImages(i, allPokemons) {
// if (allPokemons.id >= 650) {
//     document.getElementById('pokemonImg').src = `${allPokemons[i].mainInfo.sprites.other.dream_world.front_default}`;
// } else {
//     document.getElementById(`pokemonImg${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home//${allPokemons[i].id}.png`;
// }
// }


function updateProgressBar(i, x) {
    let percent = allPokemons[i].stats[x].base_stat;
    document.getElementById(`progressBar${x}`).style.cssText = `width: ${percent}% !important`;
    let bar = document.getElementsByClassName('progress-bar-striped');
    for (let y = 0; y < bar.length; y++) {
        bar[x].style.cssText = (`background-image: linear-gradient(45deg, ${colours[allPokemons[i].type[0].type.name]} 25%,white 50%,${colours[allPokemons[i].type[0].type.name]} 50%); !important ; width: ${percent}px; !Important`);
    }
}


function styleFullCard(i) {
    let idsToStyle = document.querySelectorAll("#colorofOpenedCard, #curvedLine");
    for (let y = 0; y < allPokemons[i].type.length; y++) {
        idsToStyle[y].style = (`background-color: ${colours[allPokemons[i].type[0].type.name]}`);
    }
    document.getElementById(`pokemonImgFullCard${i}`).src = `${allPokemons[i].mainInfo.sprites.other.home.front_default}`;
}


function changeToShiny(i) {
    if (document.getElementById(`pokemonImgFullCard${i}`).src == `${allPokemons[i].mainInfo.sprites.other.home.front_default}`) {
        document.getElementById(`pokemonImgFullCard${i}`).src = `${allPokemons[i].mainInfo.sprites.other.home.front_shiny}`;
        document.getElementById(`pokemonImgFullCard${i}`).classList.add('slide-in-top');
    } else if (document.getElementById(`pokemonImgFullCard${i}`).src == `${allPokemons[i].mainInfo.sprites.other.home.front_shiny}`) {
        document.getElementById(`pokemonImgFullCard${i}`).src = `${allPokemons[i].mainInfo.sprites.other.home.front_default}`;
        document.getElementById(`pokemonImgFullCard${i}`).classList.remove('slide-in-top');
        document.getElementById(`pokemonImgFullCard${i}`).classList.add('slide-in-bck-center');
    }

}


async function getJsons(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    let responseAsJson = await response.json();
    // console.log(responseAsJson);

    let speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`);
    let speciesJson = await speciesResponse.json();
    // console.log(speciesJson);
    buildArrayOfPokemon(responseAsJson, speciesJson);
}


async function getEvolution(i) {
    let url = allPokemons[i].info.evolution_chain.url;
    let evolution = await fetch(`${url}`);
    currentPokemonEvolution = await evolution.json();
    console.log(currentPokemonEvolution);
}


function checkEvo() {
    if (currentPokemonEvolution.chain.evolves_to.length >= 1) {

        let currentPokemon = allPokemons.find(n => {
            return n.pokemonName === currentPokemonEvolution.chain.evolves_to[0].species.name;
        });
        document.getElementById(`secondEvolution`).src = currentPokemon.mainInfo.sprites.other.dream_world.front_default;

    } else {
        document.getElementById(`secondEvolution`).innerHTML = '';
    }

    if (currentPokemonEvolution.chain.evolves_to.length >= 1) {

        let currentPokemon = allPokemons.find(n => {
            return n.pokemonName === currentPokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name;
        });
        document.getElementById(`thirdEvolution`).src = currentPokemon.mainInfo.sprites.other.dream_world.front_default;

    } else {
        document.getElementById(`thirdEvolution`).innerHTML = '';
    } return
}