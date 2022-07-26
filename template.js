function createPokemonCard() {
    let pokemonCards = document.getElementById('pokemonContent');
    pokemonCards.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        pokemonCards.innerHTML += /*html*/`
        <div class="pokemonCard" onclick="openFullInfo(${i})" id="pokemonCard${i}">

        <div class="nr">
            <h2 class="idOfPokemon">#${allPokemons[i].id}</h2>
        </div>

        <div class="structure">

            <div class="pokemonNamesandNr d-flex flex-column ms-5">
                <span class="pokName">${allPokemons[i].pokemonName}</span>
                <div class="type text-white d-flex flex-column " id="typeOfPokemon${i}"></div>
            </div>


            <div class="pokemonImg d-flex justify-content-end">
                <img class="picture" id="pokemonImg${i}">
            </div>

        </div>

        </div>
    `
        createPokemonType(i);
        showImages(i, allPokemons);
    }
}


function openFullInfo(i) {
    let openedCard = document.getElementById(`openedCard`);
    openedCard.innerHTML = '';
    openedCard.innerHTML += /*html*/`

    <div class="backgroundofFullCard rotateIn">

        <div class="openedCard" id="colorofOpenedCard">
            <div class="headerCard ">
                <img src="./img/left-arrow.png" onclick="closeFullCard()">
            </div>

            <div class="fullInformation">
                <span class="idOfPokemon${i}" >#${allPokemons[i].id}</span>

                <h2>${allPokemons[i].pokemonName}</h2>


                <div id="typeImages" class="d-flex"></div>

            </div>
            
            <div class="w-100 d-flex justify-content-center secondImage">
                <div class="rightArrow">
                    <img onclick="swipeRight(${i})" src="./img/arrow-55-32.png">
                </div>

                <div class="leftArrow">
                    <img onclick="swipeLeft(${i})" src="./img/arrow-87-32.png">
                </div>

                <img id="pokemonImgFullCard${i}" class="pokemonImgFullCard" onclick="changeToShiny(${i})">
                <div id="curvedLine"></div>
            </div>

            <div class="ContentContainer">
                <div class="btns d-flex justify-content-around">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                    <button type="button" class="btn btn-outline-dark" onclick= "renderStats(${i})">Stats</button>
                    <button type="button" class="btn btn-outline-dark" onclick= "renderPokemonText(${i})">About</button>
                    <button type="button" class="btn btn-outline-dark" onclick= "renderMoves(${i})">Moves</button>
                    <button type="button" class="btn btn-outline-dark" onclick= "renderInfo(${i})">Info</button>
                    <button type="button" class="btn btn-outline-dark" onclick= "renderEvolution(${i})">Evolution</button>
                </div>

                </div>

                <div class="currentInformations">
                    <div id="currentInformations"></div>
                </div>

            </div>
        </div>

    </div>
    `
    renderPokemonTypes(i);
    styleFullCard(i);
    renderStats(i);
}


function createStats(i) {
    return /*html*/`
    <table class="stats">
        <tbody>
            <tr>
            <td><div><h5>${allPokemons[i].stats[0].stat.name}</h5></div></td>
            <td> <div>${allPokemons[i].stats[0].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${0}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[1].stat.name}</h5></div></td>
            <td> <div>${allPokemons[i].stats[1].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${1}"></div>
            </div></td>
            </tr>

            <tr>
             <td><div><h5>${allPokemons[i].stats[2].stat.name}</h5></div></td>
            <td> <div>${allPokemons[i].stats[2].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${2}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[3].stat.name}</h5></div></td>
            <td> <div>${allPokemons[i].stats[3].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${3}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[4].stat.name}</h5></div></td>
            <td> <div>${allPokemons[i].stats[4].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${4}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[5].stat.name}</h5></div></td>
            <td> <div>${allPokemons[i].stats[5].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${5}"></div>
            </div></td>
            </tr>

        </tbody>
</table>
 `;
}


function renderPokemonTypes(i) {
    let image = document.getElementById('typeImages');
    image.innerHTML += '';
    for (let x = 0; x < allPokemons[i].type.length; x++) {
        let actualImage = allPokemons[i].type[x].type.name;
        image.innerHTML += /*html*/`
           <div class="typeSvg" id="typeSvg${x}${i}"> <img src="./icons/${actualImage}.svg"> </div>
        `;
        document.getElementById(`typeSvg${x}${i}`).style = (`background-color: ${colours[allPokemons[i].type[x].type.name]}`);
        document.getElementById(`curvedLine`).style = (`background-color: ${colours[allPokemons[i].type[x].type.name]}`);
    }
}


function renderStats(i) {
    document.getElementById(`currentInformations`).innerHTML = '';
    document.getElementById(`currentInformations`).innerHTML += createStats(i);
    for (let x = 0; x < 6; x++) {
        updateProgressBar(i, x);
    }
}


function renderPokemonText(i) {
    document.getElementById(`currentInformations`).innerHTML = '';
    document.getElementById(`currentInformations`).innerHTML +=  /*html*/`
    <div class="d-flex justify-content-center">
        <div class="textField">
            <span>${allPokemons[i].text.flavor_text}</span>
        </div>
    </div>
    `
}


function renderMoves(i) {
    document.getElementById(`currentInformations`).innerHTML = '';
    document.getElementById(`currentInformations`).innerHTML += /*html*/` <div id="moveContainer"></div> `

    for (let x = 0; x < allPokemons.length; x++) {
        let actualMove = allPokemons[i].moves[x].move.name;
        document.getElementById(`moveContainer`).innerHTML += /*html*/`
            <div><span>${actualMove}</span></div>
        `
    }
}


function renderInfo(i) {
    let info = document.getElementById(`currentInformations`);
    info.innerHTML = '';
    info.innerHTML +=  /*html*/`<div id="infoContainer"></div>`;
    document.getElementById('infoContainer').innerHTML +=  /*html*/`
        <div class="infoFullcard">
            <h3>Pokedex data</h3>
            <div><span>Height: </span> <span>${allPokemons[i].height} (ft)</span></div>
            <div><span>Weight: </span> <span>${allPokemons[i].weight} (lbs)</span></div>
            <div><span>Egg Group:</span> <div id="eggGroup" class="d-flex flex-column"></div></div>
            <div><span>Habitat: </span> <span>${allPokemons[i].info.habitat.name}</span></div>
            <div><span>Ability:</span> <div id="ability" class=" d-flex flex-column"></div></div>
        </div>
    `;
    renderEggGroup(i);
    renderAbility(i);
}


function renderEvolution(i) {
    document.getElementById(`currentInformations`).innerHTML = '';
    document.getElementById(`currentInformations`).innerHTML += /*html*/` <div id="evolution${i}"></div> `
    let evolution = document.getElementById(`evolution${i}`);
    // for (let x = 0; x < allPokemons[i].length; x++) {
    evolution.innerHTML += /*html*/ `
            <span id="evolveName${i}"></span>
            <img id ="evolutionImage${i}">
            <span>test</span>
        `
    getEvolve(i);
    // }
}


function renderAbility(i) {
    for (let j = 0; j < allPokemons[i].mainInfo.abilities.length; j++) {
        let actualAbility = allPokemons[i].mainInfo.abilities[j];
        document.getElementById('ability').innerHTML += /*html*/ `
            <span>${actualAbility.ability.name}</span>
        `
    }
}


function renderEggGroup(i) {
    for (let x = 0; x < allPokemons[i].info.egg_groups.length; x++) {
        const egg = allPokemons[i].info.egg_groups[x];
        document.getElementById(`eggGroup`).innerHTML += /*html*/ ` 
            <span>${egg.name}</span>
        `
    }
}


function getStatsNameByLanguage(i) {
    return allPokemons[i].info.names.find((n) => n.language.name == language);
}

// https://dev.to/mcube25/7-javascript-array-methods-you-should-know-7mf


function getEvolve(i) {
    let currentEvolve = allPokemons[i].evolution.chain.evolves_to;
    if (currentEvolve.length <= 1) {
        let currentName = allPokemons[i].evolution.chain.species.name;
        showEvolveImg(currentName, i);
        console.log(currentName);
    }

}


function showEvolveImg(currentName, i) {
    if (allPokemons[i].pokemonName === currentName) {
        document.getElementById(`evolutionImage${i}`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home//${allPokemons[i].id}.png`;
    }
}