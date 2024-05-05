const modalTitle = $(".modal-title");
const modalImg = $(".modal-img");
const modalText = $(".modal-text");

function showModal(poke) {
  let typesText = poke.types
    .map(function (type) {
      return type.type.name;
    })
    .join(", ");

  modalTitle.text(poke.name);
  modalImg.attr("src", poke.imageUrl);
  modalText.text(
    `Height: ${poke.height}
Types: ${typesText}`
  );
}

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(poke) {
    if (typeof poke !== "object") {
      console.log(`This Pokemon isn't formatted as an object!`);
    } else if (poke.hasOwnProperty("name" || "types" || "number" || "weight")) {
      {
        pokemonList.push(poke);
      }
    } else console.log(`This Pokemon doesn't have any of the correct keys!`);
  }

  function getAll() {
    return pokemonList;
  }

  function addListener(button, poke) {
    $(button).on("click", function () {
      showDetails(poke);
    });
  }

  function addListItem(poke) {
    let pokeList = $("#pokelist");
    let listItem = $('<li class="list-group-item"></li>');
    let button = $(
      '<button type="button" class="btn button-style text-capitalize btn-block text-sm-left" data-toggle="modal" data-target="#modal">' +
        poke.name +
        "</button>"
    );
    listItem.append(button);
    pokeList.append(listItem);
    addListener(button, poke);
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: "json" })
      .then(function (responseJSON) {
        $.each(responseJSON.results, function (index, item) {
          let poke = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(poke);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(poke) {
    let pokeUrl = poke.detailsUrl;
    return $.ajax(pokeUrl, { dataType: "json" })
      .then(function (details) {
        // Now we add the details to the item
        poke.imageUrl = details.sprites.front_default;
        poke.height = details.height;
        poke.types = details.types;
      })
      .catch(function (e) {
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
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// Loads data and constructs list

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (poke) {
    pokemonRepository.addListItem(poke);
  });
});

$('#modal').on('hidden.bs.modal', function(){ // empties contents of modal when closed
  modalTitle.empty();
  modalImg.attr("src", "");
  modalText.empty();
})
