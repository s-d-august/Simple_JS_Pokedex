let modalContainer = document.querySelector('#modal-container');

function showModal(poke) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close', 'btn', 'btn-outline-danger');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = poke.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + poke.height;

    let typesText = poke.types.map(function (type) {
        return type.type.name;
    }).join(', ');

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + typesText;

    let imgElement = document.createElement('img');
    imgElement.src = poke.imageUrl;



    modalBody.appendChild(closeButtonElement);
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imgElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typesElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

}

function hideModal() {
    modalContainer.classList.remove('is-visible');

}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
        hideModal();
    }
});



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
        $(button).on('click', function () {
            showDetails(poke);
        })
    }


    function addListItem(poke) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = $('<button type="button" class="btn button-style" data-toggle="modal" data-target="modal">' + poke.name + '</button>')
        listItem.append(button);
        pokeList.append(listItem);
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
            showModal(poke);
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





