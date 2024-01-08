"use strict";

const colorsList = "html";
const API_URL = `https://api.color.pizza/v1/?list=${colorsList}`;

const getColors = async function () {
   try {
      const response = await fetch(API_URL);
      const json = await response.json();

      return json.colors || [];
   } catch (error) {
      return [error.message];
   }
};

const setColorType = function (colorSwitchers, number) {
   colorSwitchers.forEach((switcher) => {
      switcher.classList.remove("active");
   });

   colorSwitchers[number].classList.add("active");
};

window.addEventListener("load", () => {
   const colorDisplay = document.querySelector(".main__color-palete");
   const switchColorButton = document.querySelector(".main__btn");
   const main = document.querySelector(".main");
   const switchersColorType = document.querySelectorAll(".nav__color-type li");
   let randomColor;

   setColorType(switchersColorType, 0);

   switchColorButton.addEventListener("click", () => {
      getColors().then((colors) => {
         randomColor = colors[Math.floor(Math.random() * colors.length)];

         const displayColorValue = switchersColorType[1].classList.contains("active")
            ? randomColor.hex
            : randomColor.name;

         colorDisplay.innerText = displayColorValue;
         main.style.backgroundColor = displayColorValue;
      });
   });

   switchersColorType.forEach((switcher, index) => {
      switcher.addEventListener("click", () => {
         setColorType(switchersColorType, index);

         switch (switcher.classList.contains("nav__hex", "active")) {
            case true:
               colorDisplay.innerText = randomColor ? randomColor.hex : "#f0f8ff";
               break;
            case false:
               colorDisplay.innerText = randomColor ? randomColor.name : "aliceblue";
               break;
         }
      });
   });
});
