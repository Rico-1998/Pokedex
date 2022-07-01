function createPokemonCard(i) {
    return /*html*/`

    <div class="pokemonCard" id="pokemonCard${i}">

    <span class="idOfPokemon" >#${allPokemons[i].id}</span>

        <div class="pokemonNamesandNr d-flex flex-column ms-5">
            <span class="pokName">${allPokemons[i].pokemonName}</span>
                    <div class="type text-white d-flex flex-column " id="typeOfPokemon${i}">
                        
                    </div>
        </div>


        <div class="pokemonImg d-flex justify-content-end">
            <img class="picture" id="pokemonImg${i}">
        </div>
    </div >
    `
}