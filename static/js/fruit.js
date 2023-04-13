const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");

function extractFruit(event) {
  event.preventDefault();
  console.log(event.target.fruitInput.value);
  // validation of input value
  let validateInput = document.querySelector("#fruitInput ").value; // Typo here ID should be Id.
  if (validateInput == "") {
    alert("Nothing was Entered!");
  }
  !fetchFruitData(event.target.fruitInput.value) || validateInput
    ? processResponse
    : "";
  event.target.fruitInput.value = "";
}

let totalCalories = 0;
function addFruit(fruit) {
  const li = document.createElement("li");
  li.textContent = `${fruit.name} ${fruit.nutritions.calories} calories`;
  li.addEventListener("click", removeFruit, { once: true }); // once use, event listener will be removed
  fruitList.appendChild(li);
  displayTotalCalories(fruit)

  function removeFruit(e) {
    const choice = confirm("Are you sure?");
    choice ? e.target.remove() : "";
    
    totalCalories -= fruit.nutritions.calories;
    fruitNutrition.textContent = `${totalCalories} calories`;
   
  }
}

function displayTotalCalories({nutritions}){
  console.log(nutritions.calories)
  
    totalCalories += nutritions.calories;
 console.log('displayTotal Func;',totalCalories)
  if (totalCalories) {
    fruitNutrition.classList.add("total");
    fruitNutrition.textContent = `${totalCalories} calories`;
  }
}

// Fetch API
function fetchFruitData(fruit) {
  fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
    .then(processResponse)
    .then((data) => {
      // console.log("name", data.name);
      addFruit(data)
      console.log("nutrition", data.nutritions.calories);
    })
    .catch((e) => console.log(e));
}

function processResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw (
      (`Error: http status ${response.status}`,
      alert("Sorry, was not able to find your item!"))
    );
  }
}

module.exports = { extractFruit };
