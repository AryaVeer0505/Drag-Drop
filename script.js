const toolboxItems = document.querySelectorAll(".draggable");
const canvas = document.getElementById("canvas");
const form = document.getElementById("prop-form");
const propText = document.getElementById("prop-text");
const propFont = document.getElementById("prop-font");
const propColor = document.getElementById("prop-color");
let selectedElement = null;

toolboxItems.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("type", e.target.dataset.type);
  });
});

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  const el = document.createElement("div");
  el.classList.add("canvas-element");

  if (type === "text") {
    el.textContent = "Editable Text";
  } else if (type === "image") {
    el.innerHTML = '<img src="https://via.placeholder.com/150" width="100%" />';
  } else if (type === "button") {
    el.innerHTML = "<button>Click Me</button>";
  }

  el.addEventListener("click", () => {
    selectedElement = el;
    form.style.display = "block";
    if (el.querySelector("img")) {
      propText.value = el.querySelector("img").src;
    } else if (el.querySelector("button")) {
      propText.value = el.querySelector("button").textContent;
    } else {
      propText.value = el.textContent;
    }
    propFont.value = parseInt(window.getComputedStyle(el).fontSize) || 16;
    propColor.value = rgbToHex(window.getComputedStyle(el).color);
  });

  canvas.appendChild(el);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!selectedElement) return;
  const val = propText.value;
  const size = propFont.value + "px";
  const color = propColor.value;

  if (selectedElement.querySelector("img")) {
    selectedElement.querySelector("img").src = val;
  } else if (selectedElement.querySelector("button")) {
    const btn = selectedElement.querySelector("button");
    btn.textContent = val;
    btn.style.color = color;
    btn.style.fontSize = size;
  } else {
    selectedElement.textContent = val;
    selectedElement.style.fontSize = size;
    selectedElement.style.color = color;
  }
});

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  return (
    "#" +
    result
      .map((x) => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
