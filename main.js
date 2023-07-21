const THEMES = ["light", "dark"];
const MODIFIERS = ["normal", "bright"];
const COLORS = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];

function getPalette(theme) {
  const palette = [undefined];
  for (const modifier of MODIFIERS) {
    for (const color of COLORS) {
      palette.push(`color-mix(in srgb, var(--${color}) var(--opacity-${modifier}), var(--background-${theme}))`);
    }
  }
  return palette;
}

function createDiv(parent, classes) {
  const el = document.createElement("div");
  for (const cls of classes) {
    el.classList.add(cls);
  }
  parent.appendChild(el);
  return el;
}

window.onload = function() {
  const root = document.getElementById("root");
  for (const theme of THEMES) {
    const bg = createDiv(root, ["bg"]);
    bg.style.setProperty("background-color", `var(--background-${theme})`);
    bg.style.setProperty("color", `var(--foreground-${theme})`);
    const palette = getPalette(theme);
    for (const bgColor of palette) {
      const row = createDiv(bg, ["row"]);
      row.style.setProperty("background-color", bgColor);
      for (const fgColor of palette) {
        const cell = createDiv(row, ["cell"]);
        cell.style.setProperty("color", fgColor);
        cell.innerText = "M";
      }
    }
  }
}
