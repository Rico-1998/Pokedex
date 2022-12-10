function renderPokemonCard() {
    let pokemonCards = document.getElementById('pokemonContent');
    pokemonCards.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        pokemonCards.innerHTML += createPokemonCard(i);
        renderPokemonTypeColour(i);
    }
}


function openFullInfo(i) {
    document.body.style = ('overflow: hidden');
    let openedCard = document.getElementById(`openedCard`);
    openedCard.innerHTML = '';
    openedCard.innerHTML += createFullCard(i);
    document.querySelector('.backgroundofFullCard').classList.toggle('swing-in-top-fwd');
    renderPokemonTypes(i);
    styleFullCard(i);
    renderStats(i);
}


function renderPokemonTypes(i) {
    let image = document.getElementById('typeImages');
    image.innerHTML = '';
    for (let x = 0; x < allPokemons[i].type.length; x++) {
        let actualImage = allPokemons[i].type[x].type.name;
        image.innerHTML += /*html*/`
           <div class="typeSvg" id="typeSvg${x}${i}"> <img src="./icons/${actualImage}.svg"> </div>
        `;
        document.getElementById(`typeSvg${x}${i}`).style = (`background-color: ${colours[allPokemons[i].type[x].type.name]}`);
        document.getElementById(`curvedLine`).style = (`background-color: ${colours[allPokemons[i].type[0].type.name]}`);
    }

}


function renderPokemonTypeColour(i) {
    let id = document.getElementById(`typeOfPokemon${i}`);
    id.innerHTML = '';
    for (let j = 0; j < allPokemons[i].type.length; j++) {
        const type = allPokemons[i].type[j].type.name;
        id.innerHTML += /*html*/ `
            <div id="typeColour${j}${i}" class="typeColour"><span>${type}</span></div>
        `;

        document.getElementById(`typeColour${j}${i}`).style = (`background-color: ${colours[allPokemons[i].type[j].type.name]}`);
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
    document.getElementById('infoContainer').innerHTML += createEggGroup(i);
    renderEggGroup(i);
    renderAbility(i);
}


async function renderEvolution(i) {
    document.getElementById(`currentInformations`).innerHTML = '';
    document.getElementById(`currentInformations`).innerHTML += /*html*/` <div id="evolution${i}" class="evolutionContainer"></div> `
    let evolution = document.getElementById(`evolution${i}`);
    evolution.innerHTML += buildEvolution(i);
    currentPokemonEvolution = []; // das muss gemacht werden um das array zu leeren bei jedem onclick.
    await getEvolution(i);
    buildFirstEvo();
}


function buildFirstEvo() {
    let currentPokemon = allPokemons.find(n => {
        return n.pokemonName === currentPokemonEvolution.chain.species.name;
    });
    document.getElementById(`firstEvolution`).src = currentPokemon.mainInfo.sprites.other.dream_world.front_default;
    checkEvo();
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
