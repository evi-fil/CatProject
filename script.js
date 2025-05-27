"use_strict";

window.addEventListener('DOMContentLoaded', () => {
  getRandomCatImage();
  clearButton();
});

const getCatButton = document.getElementById("get-cat");
const catImageContainer = document.getElementById("cat-container");
const clearCatButton = document.getElementById("clear");

let imageCounter = 0;

function getRandomCatImage(){
  getCatButton.addEventListener("click", () => {
      getApiCatImage();
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

const config = import('./config.json');

function getApiCatImage() {
  fetch("https://api.thecatapi.com/v1/images/search", {
          headers: {
            "x-api-key": config.catApiKey
          }
        })
        .then(response => response.json())  
        .then(data => {                     
          console.log(data);               
          const img = document.createElement("img");
          img.src = data[0].url;
          img.alt = "Cute cat";

          // Add Tailwind classes:
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

          // Set random position inside container:
          setRandomPosition(img);

          catImageContainer.appendChild(img);
        })
        .catch(error => {
          console.error("Error fetching cat:", error);
        }); 
}

function setRandomPosition(element) {
  const containerRect = catImageContainer.getBoundingClientRect();
  
  // Add padding to avoid cutting off:
  const padding = 20;
  const maxLeft = catImageContainer.clientWidth - 200 - padding;
  const maxTop = catImageContainer.clientHeight - 200 - padding;

  const randomLeft = Math.floor(Math.random() * maxLeft) + padding;
  const randomTop = Math.floor(Math.random() * maxTop) + padding;

  element.style.left = `${randomLeft}px`;
  element.style.top = `${randomTop}px`;
}
