const wrapper = document.getElementById("wrapper");
wrapper.classList.add("wrapper_active");

const scene = document.getElementById("parallax");
const layers = scene.children;
const depth = [0.1, 0.15, 0.3, 0.6, 0.3, 0.4, 0.5, 0.6, 0.6, 0.8, 1.0];

let wWidth = null;
let wHeight = null;
let wCenterX = null;
let wCenterY = null;

let inputX = 0;
let inputY = 0;

let offsetX = 0;
let offsetY = 0;

updateDimensions();
startAnimation();

function updateDimensions() {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  wCenterX = wWidth / 2;
  wCenterY = wHeight / 2;
}

function startAnimation() {
  window.addEventListener("resize", updateDimensions);
  scene.addEventListener("mousemove", onMouseMove);
  window.requestAnimationFrame(onAnimationFrame);
}

function onMouseMove(e) {
  const clientX = e.clientX;
  const clientY = e.clientY;

  if (wCenterX && wCenterY) {
    inputX = (clientX - wCenterX) / wCenterX;
    inputY = (clientY - wCenterY) / wCenterY;
  }
}

function onAnimationFrame() {
  const positionX = (inputX * wWidth) / 10;
  const positionY = (inputY * wHeight) / 10;

  offsetX += (positionX - offsetX) * 0.1;
  offsetY += (positionY - offsetY) * 0.1;

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const layerDepth = depth[i];
    const xOffset = offsetX * layerDepth * -1;
    const yOffset = offsetY * layerDepth * -1;

    setPosition(layer, xOffset, yOffset);
  }
  window.requestAnimationFrame(onAnimationFrame);
}

function setPosition(elem, x, y) {
  elem.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
}
