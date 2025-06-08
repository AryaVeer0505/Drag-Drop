const toolbox = document.getElementById("toolbox");
const canvas = document.getElementById("canvas");
const form = document.getElementById("property-form");
const propText = document.getElementById("prop-text");
const propFontSize = document.getElementById("prop-font-size");
const propColor = document.getElementById("prop-color");
let selectedElement = null;

toolbox.querySelectorAll("[draggable=true]").forEach((el) => {
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("type", e.target.dataset.type);
  });
});

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  const newEl = document.createElement("div");
  newEl.className = "canvas-element";
  newEl.setAttribute("contenteditable", "true");

  switch (type) {
    case "text":
      newEl.textContent = "Editable text";
      break;
    case "image":
      newEl.innerHTML =
        '<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.skyweaver.net%2Fmedia%2Fwallpapers%2F&psig=AOvVaw2_2gkEiTOtLPBmKvdvsraC&ust=1749443083812000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiW07_94I0DFQAAAAAdAAAAABAE" width="100%" />';
      break;
    case "button":
      newEl.innerHTML = "<button>Click Me</button>";
      break;
  }

  newEl.addEventListener("click", () => {
    selectedElement = newEl;
    form.style.display = "block";
    const innerText =
      selectedElement.innerText ||
      selectedElement.querySelector("img, button")?.src ||
      "";
    propText.value = innerText;
    propFontSize.value =
      parseInt(window.getComputedStyle(selectedElement).fontSize) || 16;
    propColor.value = rgbToHex(window.getComputedStyle(selectedElement).color);
  });

  canvas.appendChild(newEl);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (selectedElement) {
    if (selectedElement.querySelector("img")) {
      selectedElement.querySelector("img").src = propText.value;
    } else if (selectedElement.querySelector("button")) {
      selectedElement.querySelector("button").textContent = propText.value;
    } else {
      selectedElement.textContent = propText.value;
    }
    selectedElement.style.fontSize = propFontSize.value + "px";
    selectedElement.style.color = propColor.value;
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
