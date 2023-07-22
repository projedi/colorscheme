const THEMES = ["light", "dark"];
const MODIFIERS = ["normal", "bright"];
const COLORS = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];

function getBackgroundPalette(theme) {
  const palette = [undefined];
  const modifier = "normal";
  for (const color of COLORS) {
    palette.push(`color-mix(in srgb, var(--${color}) var(--opacity-${modifier}), var(--background-${theme}))`);
  }
  return palette;
}

function getForegroundPalette(theme) {
  const palette = [undefined];
  const modifier = "bright";
  for (const color of COLORS) {
    palette.push(`color-mix(in srgb, var(--${color}) var(--opacity-${modifier}), var(--background-${theme}))`);
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
    for (const bgColor of getBackgroundPalette(theme)) {
      const row = createDiv(bg, ["row"]);
      row.style.setProperty("background-color", bgColor);
      for (const fgColor of getForegroundPalette(theme)) {
        const cell = createDiv(row, ["cell"]);
        cell.style.setProperty("color", fgColor);
        cell.innerText = "M";
      }
    }
  }
}
