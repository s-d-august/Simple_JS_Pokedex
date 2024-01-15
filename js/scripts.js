let pokemonList = [
    { name: 'Mimikyu', types: ['ghost', 'fairy'], number: '#0778', weight: 1.5},
    { name: 'Gardevoir', types: ['psychic', 'fairy'], number: '#0282', weight: 106.7},
    { name: 'Polteageist', types: ['ghost'], number: '#08550', weight: 0.9},
];


for (let i = 0; i < pokemonList.length; i++){
    let pokename = pokemonList[i].name;
    let pokeweight = pokemonList[i].weight;
    document.write(`${pokename} (weight: ${pokeweight})<br>`)


}