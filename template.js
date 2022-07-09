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
                    <img id="secondTypeImg" src="./icons/${allPokemons[i].type[1]}.svg">
                </div>
                </div>
            </div>
            
            <div class="w-100 d-flex justify-content-center secondImage">
                <img id="pokemonImgFullCard">
                <div id="curvedLine"></div>
            </div>

            <div class="statsContainer">
                <div class="btns d-flex justify-content-around">
                    <button>Stats</button>
                    <button>Evolution</button>
                    <button>About</button>
                </div>

                <div class="stats">
                    <div id="stats"></div>

                    <div id="progress"></div>

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