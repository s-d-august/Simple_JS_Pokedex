let pokemonList = [
    { name: 'Mimikyu', types: ['ghost', 'fairy'], number: '#0778', weight: 1.5},
    { name: 'Gardevoir', types: ['psychic', 'fairy'], number: '#0282', weight: 106.7},
    { name: 'Polteageist', types: ['ghost'], number: '#08550', weight: 0.9},
];

// Lists names and weights of pokemonList
function printArray(list){
for (let i = 0; i < list.length; i++){
    let pokeName = list[i].name;
    let pokeWeight = list[i].weight;
    document.write(`${pokeName} (weight: ${pokeWeight})`);
    if (pokeWeight > 100) {
        document.write(` Wow, that's big!<br>`);}
        else {document.write('<br>')}
    }} // Pokemon with weight over 100 get flagged with "Wow, that's big!"

    printArray(pokemonList);

