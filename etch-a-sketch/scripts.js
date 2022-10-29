const DEFAULT_COLOR = "#333333";
const DEFALUT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFALUT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraseBtn = document.getElementById("eraseBtn");
const clearBtn = document.getElementById("clear");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

colorPicker.addEventListener("input", setCurrentColor);
colorBtn.addEventListener("click", setCurrentMode);
rainbowBtn.addEventListener("click", setCurrentMode);
eraseBtn.addEventListener("click", setCurrentMode);
clearBtn.addEventListener("click", reloadGrid);
sizeSlider.addEventListener("input", updateSizeValue);
sizeSlider.addEventListener("input", changeSize);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setCurrentColor(newColor) {
  currentColor = newColor.target.value;
  console.log(currentColor);
}

/* function setCurrentSize(newSize) {
  currentSize = newSize;
} */

function setCurrentMode(newMode) {
  if (newMode.target.textContent == "Color Mode") {
    currentMode = "color";
  } else if (newMode.target.textContent == "Rainbow Mode") {
    currentMode = "rainbow";
  } else if (newMode.target.textContent == "Eraser") {
    currentMode = "eraser";
  }

  activateButton(currentMode);
  console.log(currentMode);
}

function reloadGrid() {
  grid.innerHTML = "";
  setupGrid(currentSize);
}

function updateSizeValue(newSize) {
  let updatedSize = newSize.target.value;
  sizeValue.innerHTML = `${updatedSize} x ${updatedSize}`;
}

function changeSize(newSize) {
  grid.innerHTML = "";
  currentSize = newSize.target.value;
  setupGrid(currentSize);
}

/* function setCurrentSize(newSize) {} */

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mousedown", changeColor);
    gridElement.addEventListener("mouseover", changeColor);
    grid.appendChild(gridElement);
  }
}

function activateButton(newMode) {
  /* if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraseBtn.classList.remove("active");
  } */
  colorBtn.classList.remove("active");
  rainbowBtn.classList.remove("active");
  eraseBtn.classList.remove("active");

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraseBtn.classList.add("active");
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    randomR = Math.floor(Math.random() * 256);
    randomG = Math.floor(Math.random() * 256);
    randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFALUT_MODE);
};
