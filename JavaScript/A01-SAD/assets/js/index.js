// Boton de cambio de tema
const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

toggleBtn.addEventListener("click", () => {
  const current = root.dataset.theme;
  const next = current === "dark" ? "light" : "dark";

  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});


document.getElementById(act01).innerHTML="Hola"
