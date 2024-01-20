let pokemonRepository = (function () {
    let pokemonList = [
          { name: 'Mimikyu', types: ['ghost', 'fairy'], number: '#0778', weight: 1.5},
          { name: 'Gardevoir', types: ['psychic', 'fairy'], number: '#0282', weight: 106.7},
          { name: 'Polteageist', types: ['ghost'], number: '#08550', weight: 0.9},
      ];
  
    function add(poke) {
      if ((typeof poke) !== Object) {
        document.write(`This Pokemon isn't formatted correctly!`)
    }
    else {pokemonList.push(pokemon);}
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();

// Lists names and weights of pokemonList

(pokemonRepository.getAll()).forEach(function(poke) {
    let pokeName = poke.name;
    let pokeWeight = poke.weight;
    document.write(`${pokeName} (weight: ${pokeWeight})`);
    if (pokeWeight > 100) {
        document.write(` Wow, that's big!<br>`);}
        else {document.write('<br>')}
  });


