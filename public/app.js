const pizzaListElement = document.getElementById("pizza-list");
const searchInputElement = document.getElementById("search-input");
const searchButtonElement = document.getElementById("search-button");

let pizzasJson; 

fetch('/pizza')
   .then(response => response.json())
   .then(pizzas => {
     pizzasJson = pizzas;
     displayPizzas(pizzas)
   })
   .catch((error) => console.error(error));

function displayPizzas(pizzas) {
  pizzaListElement.innerHTML = ""; // Limpiamos la lista antes de mostrar las pizzas
  pizzas.forEach((pizza) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${pizza.Nombre}</strong> - ${pizza.Descripcion}`;
    pizzaListElement.appendChild(li);
  });
}

searchButtonElement.addEventListener("click", () => {
  const searchText = searchInputElement.value.toLowerCase(); // Obtenemos el texto ingresado por el usuario
  console.log(searchText.toLowerCase);

  const filteredPizzas = pizzasJson.filter((pizza) =>
    pizza.Descripcion.toLowerCase().includes(searchText)
  ); // Filtramos las pizzas

  displayPizzas(filteredPizzas); // Mostramos solo las pizzas filtradas
});