

// FOR WAVES
let allWaves_WhiteSpace = document.querySelector(".waves");
let wave2 = document.getElementById("wave2");
let wave3 = document.getElementById("wave3");
let wave4 = document.getElementById("wave4");
let wave1 = document.getElementById("wave1");

window.addEventListener("scroll", function (e) {
  let value = this.window.scrollY;
  // console.log(value);

  /* to make waves move when scrollingwe add their previous value when 
    (window.scrollY) was 0, to new position that changes each time when scrolling frpm 0 to maybe 200.
    so that's why (wavePosition + value +"px") and multiplying on different numbers
    When scrolling on Y axis (up) , wave moves on X axis <--> (horizontal)*/
  wave1.style.backgroundPositionX = 400 + value * 2 + "px";
  wave2.style.backgroundPositionX = 300 + value * -2 + "px";
  wave3.style.backgroundPositionX = 200 + value * 1 + "px";
  wave4.style.backgroundPositionX = 100 + value * -1 + "px";
});

// /////////////////////////////////

// ////////////////////////////////////////

// For Bubbles
function createBubble() {
  const underWater = document.querySelector(".under-water");
  // creates new span element
  const createElement = document.createElement("span");
  // choose size and set width and height
  var size = Math.floor(Math.random() * 60);
  createElement.style.width = 20 + size + "px";
  createElement.style.height = 20 + size + "px";

  /* The read-only Window property innerWidth returns the interior width of the window in pixels. 
    This includes the width of the vertical scroll bar, if one is present. */
  createElement.style.left = Math.random() * innerWidth + "px";
  underWater.appendChild(createElement);

  setTimeout(() => {
    createElement.remove();
  }, 7000);
}
setInterval(createBubble, 900);

// //////////////////////////////////////

// WATER FLOW

let countPercents = document.getElementById("count");
let waterFlow = document.getElementById("water");
let remainedWater = document.getElementById("remained-water");

let percent = 0;

////////////////////

// FOR ADDING WATER

let currentWater = 0;
let goalWater = 2000;

const bigCup = document.querySelector(".big-cup");
const waterInside = document.querySelector(".water-inside");


// //////////////////////////////////////

// FOR BUTTONS

const addButton = document.querySelector(".btn-select.add");
const removeButton = document.querySelector(".btn-select.remove");

addButton.addEventListener("click", function () {
  // binding active element from carousel and get it's value
  let activeCarouselItem = document.querySelector(".carousel-item.active");
  // use destructuring
  let [mlAmount] = activeCarouselItem.textContent.trim().split(" ");
  let addWaterMl = Number(mlAmount);
  updateWater(addWaterMl);
  updatePercents(addWaterMl);
});

removeButton.addEventListener("click", function () {
  let activeCarouselItem = document.querySelector(".carousel-item.active");
  let [mlAmount] = activeCarouselItem.textContent.trim().split(" ");
  // making negative number, because user wants to remove water
  let removeWaterMl = Number(-mlAmount);
  updateWater(removeWaterMl);
  updatePercents(removeWaterMl);
});

function updateWater(waterMl) {
  currentWater += waterMl;
  if (currentWater > 0 && currentWater < goalWater) {
    remainedWater.innerText = `${(goalWater - currentWater) / 1000}L`;
  } else if (currentWater >= goalWater) {
    remainedWater.innerText = `${0}L. Goal achieved!`;
  } else if (currentWater <= 0) {
    remainedWater.innerText = `${goalWater / 1000}L`;
    currentWater = 0;
    allWaves_WhiteSpace.style.height = `100vh`;
  }
  console.log(currentWater);
}

function updatePercents(waterMl) {
  if (waterMl < 0 && percent < -((waterMl * 100) / goalWater)) {
    percent = 0;
    countPercents.innerHTML = percent;
    waterFlow.style.transform = "translate(0" + "," + (100 - percent) + "%)";
  } else {
    percent += Number((waterMl * 100) / goalWater);
    console.log(percent);
    countPercents.innerHTML = percent;

    if (percent >= 0 && percent <= 100) {
      //   change the style of water by manipulation with percents
      waterFlow.style.transform = "translate(0" + "," + (100 - percent) + "%)";

      allWaves_WhiteSpace.style.height = `${100 - percent}vh`;
    } else if (percent < 0) {
      percent = 0;
      countPercents.innerHTML = percent;
      waterFlow.style.transform = "translate(0" + "," + (100 - percent) + "%)";
    } else if (percent > 100) {
      waterFlow.style.transform = "translate(0, 0%)";
    }
  }
}

// /////////////////////////////////////


// WATER FORMULA 

// For males:

// TBW = 2.447 - 0.09156 × age + 0.1074 × height (cm) + 0.3362 × weight (kg)

// For females:

// TBW = -2.097 + 0.1069 × height (cm) + 0.2466 × weight (kg)

// ///////////////

