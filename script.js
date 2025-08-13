"use_strict";

let breedId;

let breedSearch = false;

let imageCounter = 0;

const getCatButton = document.getElementById("get-cat");
const catImageContainer = document.getElementById("cat-container");
const clearCatButton = document.getElementById("clear");
const breedSelect = document.querySelector("#breed-select");

window.addEventListener('DOMContentLoaded', async () => {
  await getBreeds();
  getCatImage();
  clearButton();

  breedSelect.addEventListener("change", (e) => {
    const selectedOption = e.target.selectedOptions[0];

    if (selectedOption.value !== "")
    {
      breedSearch = true;
      breedId = selectedOption.value;
      getCatButton.innerText = "Get " + selectedOption.text + " Cat";
    }
    else
    {
      breedSearch = false;
      getCatButton.innerText = "Get a random Cat";
    }
  })
});

function getCatImage(){
  getCatButton.addEventListener("click", () => {

    breedSearch ? getCatBreedImage() : getApiCatImage();

    clearCatButton.disabled = false;

    imageCounter++;
  });
}

function clearButton(){
  clearCatButton.addEventListener("click", () => {
    catImageContainer.innerHTML = "";
    clearCatButton.disabled = true; 
  });
}

async function getCatBreedImage() {
  const response = await fetch(`/.netlify/functions/breedCat?breed_id=${breedId}`);
  const data = await response.json();
  generateImage(data);
}

async function getBreeds() {
  const response = await fetch('/.netlify/functions/breeds');
  const breedData = await response.json();

  breedData.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.innerText = breed.name;
    breedSelect.appendChild(option);
  });
}

async function getApiCatImage() {
  const response = await fetch('/.netlify/functions/randomCat');
  const data = await response.json();
  generateImage(data);
}

function generateImage(imageData) {

  const img = document.createElement("img");
  img.src = imageData[0].url;
  img.alt = "Cute cat";

  img.classList.add(
      "absolute", 
      "max-w-[200px]", 
      "rounded-xl", 
      "shadow-lg", 
      "transition-transform", 
      "duration-300", 
      "hover:scale-105",
      "float"
    );

  setRandomPosition(img);

  catImageContainer.appendChild(img);
}

function setRandomPosition(element) {

  const padding = 20;
  const maxLeft = catImageContainer.clientWidth - 200 - padding;
  const maxTop = catImageContainer.clientHeight - 200 - padding;

  const randomLeft = Math.floor(Math.random() * maxLeft) + padding;
  const randomTop = Math.floor(Math.random() * maxTop) + padding;

  element.style.left = `${randomLeft}px`;
  element.style.top = `${randomTop}px`;
}

