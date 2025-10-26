const body = document.querySelector("body");
const themeChangeBtn = document.querySelector("#themeChangeBtn");
const themeName = document.querySelector("#themeName");
const themeIcon = document.querySelector("#themeIcon");

export function setInitialTheme() {
  document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      themeChange();
    }
  });
}

function themeChange() {
  body.classList.toggle("dark");
  const theme = localStorage.getItem("theme") || "light";

  if (themeName.textContent === "DARK") {
    localStorage.setItem("theme", "dark");
    themeName.textContent = "LIGHT";
    themeIcon.src = "/assets/icon-sun.svg";
  } else {
    localStorage.setItem("theme", "light");
    themeName.textContent = "DARK";
    themeIcon.src = "/assets/icon-moon.svg";
  }
}

export function themeChangeAction() {
  themeChangeBtn.addEventListener("click", themeChange);
}
