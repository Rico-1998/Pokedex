function createPokemonCard(i) {
    return /*html*/`

    <div class="pokemonCard" onclick="openFullInfo(${i})" id="pokemonCard${i}">

    <div class="nr">
    <h2 class="idOfPokemon${i}" >#${allPokemons[i].id}</h2>
    </div>

    <div class="structure">

        <div class="pokemonNamesandNr d-flex flex-column ms-5">
            <span class="pokName">${allPokemons[i].pokemonName}</span>
                 <div class="type text-white d-flex flex-column " id="typeOfPokemon${i}"></div>
        </div>


        <div class="pokemonImg d-flex justify-content-end">
            <img class="picture"  id="pokemonImg${i}">
        </div>

    </div>

    </div >
    `
}


function openFullInfo(i) {
    let openedCard = document.getElementById(`openedCard`);
    openedCard.innerHTML = '';
    openedCard.innerHTML += /*html*/`

    <div class="backgroundofFullCard">

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
                    <button class ="btn btn-info" onclick= "renderStats(${i})">Stats</button>
                    <button class ="btn btn-info" onclick= "renderPokemonText(${i})">About</button>
                    <button class ="btn btn-info" onclick= "renderMoves(${i})">Moves</button>
                    <button class ="btn btn-info" onclick= "renderInfo(${i})">Info</button>
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


function createStats(i, x) {
    return /*html*/`
    <div class="d-flex justify-content-between">
        <div><h5>${allPokemons[i].stats[x].stat.name}</h5></div>

        <div id="percent${x}"></div>
        
        <div class="progress">
            <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${x}"></div>
        </div>

    </div>
 `;
}


function renderPokemonTypes(i) {
    let image = document.getElementById('typeImages');
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
    for (let x = 0; x < 6; x++) {
        document.getElementById(`currentInformations`).innerHTML += createStats(i, x);
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
            <div><span>Abilitie:</span> <span></span></div> <!-- abilitie und hidden Abbilitie noch eintragen -->
        </div>
    `;
    renderEggGroup(i);
}


function renderEggGroup(i) {
    for (let x = 0; x < allPokemons[i].info.egg_groups.length; x++) {
        const egg = allPokemons[i].info.egg_groups[x];
        document.getElementById(`eggGroup`).innerHTML += /*html*/ ` 
            <span>${egg.name}</span>
        `
    }
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


function getStatsNameByLanguage(i) {
    return allPokemons[i].info.names.find((n) => n.language.name == language);
}

        // https://dev.to/mcube25/7-javascript-array-methods-you-should-know-7mf