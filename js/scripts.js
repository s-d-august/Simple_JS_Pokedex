let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

    function addListener(button, poke) {
        button.addEventListener('click', function () {
            showDetails(poke);
        })}


    function addListItem(poke) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = poke.name;
        button.classList.add('button-style')
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
        addListener(button, poke);
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





