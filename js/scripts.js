let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Mimikyu', types: ['ghost', 'fairy'], number: '#0778', weight: 1.5 },
        { name: 'Gardevoir', types: ['psychic', 'fairy'], number: '#0282', weight: 106.7 },
        { name: 'Polteageist', types: ['ghost'], number: '#08550', weight: 0.9 },
    ];

    function add(poke) {
        if ((typeof poke) !== "object") {
            console.log(`This Pokemon isn't formatted as an object!`)
        }
        else if ((poke.hasOwnProperty('name' || 'types' || 'number' || 'weight'))) {
            { pokemonList.push(poke); }
        }
        else console.log(`This Pokemon doesn't have any of the correct keys!`)
    }

    function getAll() {
        return pokemonList;
    }

    function nameFilter(poke) {
        return (pokemonList.filter(pokemon => pokemon.name == poke));
    }

    function showDetails(poke) {
        console.log(poke.name)
    }


    function addListItem(poke) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = poke.name;
        button.classList.add('button-style')
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(poke);
        }
        )
    }

    return {
        add: add,
        getAll: getAll,
        nameFilter: nameFilter,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();

// Lists names and weights of pokemonList

pokemonRepository.getAll().forEach(function (poke) {
    pokemonRepository.addListItem(poke);
});

// Search pokemonList by name

pokemonRepository.nameFilter().forEach(function (poke) {
    let pokeName = poke.name;
    let pokeWeight = poke.weight;
    document.write(`${pokeName} (weight: ${pokeWeight})`);
    if (pokeWeight > 100) {
        document.write(` Wow, that's big!<br>`);
    }
    else { document.write('<br>') }
});





