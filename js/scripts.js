let pokemonList = [
    { name: 'Mimikyu', types: ['ghost', 'fairy'], number: '#0778', weight: 1.5},
    { name: 'Gardevoir', types: ['psychic', 'fairy'], number: '#0282', weight: 106.7},
    { name: 'Polteageist', types: ['ghost'], number: '#08550', weight: 0.9},
];

// Lists names and weights of pokemonList
for (let i = 0; i < pokemonList.length; i++){
    let pokename = pokemonList[i].name;
    let pokeweight = pokemonList[i].weight;
    if (pokeweight > 100) {
        document.write(`${pokename} (weight: ${pokeweight}) Wow, that's big!<br>`)
    } // Pokemon with weight over 100 get flagged with "Wow, that's big!"
    else{
        document.write(`${pokename} (weight: ${pokeweight})<br>`)}
    
}