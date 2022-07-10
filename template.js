function createPokemonCard(i) {
    return /*html*/`

    <div class="pokemonCard" id="pokemonCard${i}">

    <div class="nr">
    <h2 class="idOfPokemon${i}" >#${allPokemons[i].id}</h2>
    </div>

    <div class="structure">

        <div class="pokemonNamesandNr d-flex flex-column ms-5">
            <span class="pokName">${allPokemons[i].pokemonName}</span>
                    <div class="type text-white d-flex flex-column " id="typeOfPokemon${i}">
                        <span id='firstPokemonType${i}'>${allPokemons[i].type[0]}</span>
                        <span id='secondPokemonType${i}'>${allPokemons[i].type[1]}</span>
                    </div>
        </div>


        <div class="pokemonImg d-flex justify-content-end">
            <img class="picture" onclick="openFullInfo(${i})" id="pokemonImg${i}">
        </div>

    </div>

    <!-- <img src="./img/background-card.png"> -->

    </div >
    `
}


function openFullInfo(i) {
    let openedCard = document.getElementById(`openedCard`);
    openedCard.innerHTML += /*html*/`

    <!-- <div>
        <img src="./img/pokedex.png" alt="">
        </div> -->
    <div class="backgroundofFullCard">

        <div class="openedCard" id="colorofOpenedCard">
            <div class="headerCard ">
                <img src="./img/left-arrow.png" onclick="closeFullCard()">
            </div>

            <div class="fullInformation">
                <span class="idOfPokemon${i}" >#${allPokemons[i].id}</span>

                <h2>${allPokemons[i].pokemonName}</h2>


                <div class="d-flex">
                <div class="typeOpenedCard" id="imgBackground">
                    <img id="firstTypeImg" src="./icons/${allPokemons[i].type[0]}.svg">
                </div>

                <div class="typeOpenedCard" id="imgBackground2">
                    <img id="secondTypeImg" src="./icons/${allPokemons[i].type[1]}.svg"> <!-- Fehler noch beheben -->
                </div>
                </div>
            </div>
            
            <div class="w-100 d-flex justify-content-center secondImage">
                <div class="rightArrow">
                    <img src="./img/arrow-55-32.png">
                </div>

                <div class="leftArrow">
                    <img src="./img/arrow-87-32.png">
                </div>

                <img id="pokemonImgFullCard">
                <div id="curvedLine"></div>
            </div>

            <div class="ContentContainer">
                <div class="btns d-flex justify-content-around">
                    <button class ="btn btn-info" onclick= "renderStats(${i})">Stats</button>
                    <button class ="btn btn-info" onclick= "renderPokemonText(${i})">About</button>
                    <button class ="btn btn-info" onclick= "renderMoves(${i})">Moves</button>
                </div>

                <div class="currentInformations">
                    <div id="currentInformations"></div>
                </div>

            </div>
        </div>

    </div>
    `


    document.getElementById(`imgBackground`).style = (`background-color: ${colours[allPokemons[i].type[0]]}`);

    if (allPokemons[i].type[1]) {
        document.getElementById(`imgBackground2`).style = (`background-color: ${colours[allPokemons[i].type[1]]}`);
    } else {
        document.getElementById(`imgBackground2`).innerHTML = '';
    }

    document.getElementById(`colorofOpenedCard`).style = (`background-color: ${colours[allPokemons[i].type[0]]}`);
    document.getElementById(`firstTypeImg`).style = (`background-color: ${colours[allPokemons[i].type[0]]}`);
    document.getElementById(`pokemonImgFullCard`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home//${allPokemons[i].id}.png`;
    document.getElementById(`curvedLine`).style = (`background-color: ${colours[allPokemons[i].type[0]]}`);


    renderStats(i);
}


function createStats(i, x) {
    return /*html*/`
    <div class="d-flex justify-content-between">
        <h5>${allPokemons[i].stats[x].stat.name}</h5>

        <div class="progress">
            <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${x}"></div>
        </div>

    </div>
 `;
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