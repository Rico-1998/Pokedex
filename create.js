function createPokemonCard(i) {
    return /*html*/`
    <div class="pokemonCard" onclick="openFullInfo(${i})" id="pokemonCard${i}">

    <div class="nr">
        <h2 class="idOfPokemon">#${allPokemons[i].id}</h2>
    </div>

    <div class="structure">

        <div class="pokemonNamesandNr d-flex flex-column ">
            <span class="pokName">${allPokemons[i].pokemonName}</span>
            <div class="type text-white" id="typeOfPokemon${i}"></div>
        </div>


        <div class="pokemonImg">
            <img class="picture"  src="${allPokemons[i].pokemonImg}">
        </div>

    </div>

    </div>
`;
}


function createFullCard(i) {
    return /*html*/`

    <div class="backgroundofFullCard" onclick="closeFullCard()">

        <div class="openedCard" id="colorofOpenedCard" onclick="preventClosing(event)">
            <div class="headerCard">
                <img  src="./img/left-arrow.png" onclick="closeFullCard()">
                <span class="idOfPokemon${i}" >#${allPokemons[i].id}</span>
            </div>

            <div class="fullInformation">

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
    `;
}


function createStats(i) {
    return /*html*/`
    <div class="statsContainer">
    <table class="stats">
        <tbody>
            <tr>
            <td><div><h5>${allPokemons[i].stats[0].stat.name}</h5></div></td>
            <td> <div class="statsNr">${allPokemons[i].stats[0].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${0}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[1].stat.name}</h5></div></td>
            <td> <div class="statsNr">${allPokemons[i].stats[1].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${1}"></div>
            </div></td>
            </tr>

            <tr>
             <td><div><h5>${allPokemons[i].stats[2].stat.name}</h5></div></td>
            <td> <div class="statsNr">${allPokemons[i].stats[2].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${2}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[3].stat.name}</h5></div></td>
            <td> <div class="statsNr">${allPokemons[i].stats[3].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${3}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[4].stat.name}</h5></div></td>
            <td> <div class="statsNr">${allPokemons[i].stats[4].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${4}"></div>
            </div></td>
            </tr>

            <tr>
            <td><div><h5>${allPokemons[i].stats[5].stat.name}</h5></div></td>
            <td> <div class="statsNr">${allPokemons[i].stats[5].base_stat}</div></td>
            <td><div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progressBar${5}"></div>
            </div></td>
            </tr>

        </tbody>
</table>
</div>
 `;
}


function createEggGroup(i) {
    return /*html*/`
        <div class="infoFullcard">
            <h3>Pokedex data</h3>
            <div><b><span>Height: </span> </b> <span>${allPokemons[i].height} (ft)</span></div>
            <div><b><span>Weight: </span> </b> <span>${allPokemons[i].weight} (lbs)</span></div>
            <div><b><span>Egg Group:</span> </b> <div id="eggGroup" class="d-flex flex-column"></div></div>
            <div><b><span>Habitat: </span> </b> <span>${allPokemons[i].info.habitat.name}</span></div>
            <div><b><span>Ability:</span> </b> <div id="ability" class=" d-flex flex-column"></div></div>
        </div>
    `;
}


function buildEvolution(i) {
    return /*html*/ `
            <span id="evolveName${i}"></span>
            <img id ="firstEvolution" class="evolution">
            <div class="level"><span id="level"></span></div>
            <img id ="secondEvolution" class="evolution">
            <div class="level"><span id="level2"></span></div>
            <img id ="thirdEvolution" class="evolution">
        `;
}