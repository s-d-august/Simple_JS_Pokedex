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



    function addListener(button, poke) {
        button.addEventListener('click', function () {
            showDetails(poke);
        })
    }


    function addListItem(poke) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = poke.name;
        button.classList.add('button-style');
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
        addListener(button, poke);
    }



    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let poke = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(poke);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }



    function loadDetails(poke) {
        let url = poke.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            poke.imageUrl = details.sprites.front_default;
            poke.height = details.height;
            poke.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(poke) {
        loadDetails(poke).then(function () {
            console.log(poke);
        });
    }


    return {
        add: add,
        getAll: getAll,
        nameFilter: nameFilter,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

// Lists names and weights of pokemonList

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (poke) {
        pokemonRepository.addListItem(poke);
    });
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





