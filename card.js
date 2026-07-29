const input_section = document.getElementById("input_section");
const name_input = document.getElementById("name_input");
const img_input = document.getElementById("img_input");
const description_input = document.getElementById("description_input");
const add_button = document.getElementById("add_button");
const Clear_button = document.getElementById("Clear_button");
const Cards_section = document.getElementById("Cards_section");
const massge = document.getElementById("p");
const search = document.getElementById("search");

let cards_array = [];
let edit_index = null;

function delete_p(index) {
  cards_array.splice(index, 1);
  save_cards();
  create_cards();
};

function save_cards() {
  localStorage.setItem("saved_cards", JSON.stringify(cards_array));
};

function get_cards() {
  cards_array = JSON.parse(localStorage.getItem("saved_cards")) || [];
};

function edit_card(index) {
  name_input.value = cards_array[index].name;
  img_input.value = cards_array[index].img;
  description_input.value = cards_array[index].description;
  add_button.textContent = "update the card";
  edit_index = index;
  add_button.textContent = "Update Card";
};

function search_function() {
  const containers = document.querySelectorAll(".container");
  const the_pattern = /\W+/gi;
  if (the_pattern.test(search.value) === true) {
    search.style.border = "red 1px solid";
    return;
  } else {
    search.style.border = "blue 1px solid";
  }
  const my_pattern = new RegExp(search.value, "i");



  for (let i = 0; i < cards_array.length; i++) {
    const search_result = my_pattern.test(cards_array[i].name);
    if (search_result === false) {
      containers[i].style.display = "none";
    } else if (search_result === true) {
      containers[i].style.display = "flex";
      coloring_search(i);
    };
  };
};

function coloring_search(i) {
  const names = cards_array[i].name;
  const pattern = new RegExp(`(${search.value})`, "ig")
  const replacnig = names.replace(pattern, "<span>$1</span>");
  const h2 = document.querySelectorAll(".container h2");
  h2[i].innerHTML = replacnig;
};

search.addEventListener("input", function () {
  search_function();
});

function create_cards() {
  Cards_section.innerHTML = "";
  cards_array.forEach(function (card_name, index) {
    Cards_section.innerHTML += `
    <div class="container">
      <div class="functions_div">
        <a class="edit_a" href="#input_section" onclick="edit_card(${index})">Edit</a>
        <p class="delete_p" onclick="delete_p(${index})">X</p>
      </div>
      <div class="img_div">
        <img class="rounded_img" src="${card_name.img}">
      </div>
      <h2>${card_name.name}</h2>
      <p>${card_name.description}</p>
    </div>
    `;
    //<span>${card_name.name}</span>
  });
  name_input.value = "";
  img_input.value = "";
  description_input.value = "";
  search.value = "";
};

Clear_button.addEventListener("click", function () {
  name_input.value = "";
  img_input.value = "";
  description_input.value = "";
});

add_button.addEventListener("click", function () {
  let cards_object = {
    img: img_input.value,
    name: name_input.value,
    description: description_input.value,
  };
  if (cards_object.name === "" || cards_object.description === "") {
    massge.textContent = "please enter the missed value";
    return;
  }
  if (cards_object.img === "") {
    cards_object.img = "unkown.jpg";
  }

  if (edit_index === null) {
    cards_array.push(cards_object);
  } else {
    cards_array[edit_index] = cards_object;
    edit_index = null;
    add_button.textContent = "Add a card";
  }

  save_cards();
  create_cards();
  massge.textContent = "";
  name_input.value = "";
  img_input.value = "";
  description_input.value = "";
});

get_cards();
create_cards();

