// Verificación que el código carga
console.log("Código JS cargado correctamente.")
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


// Event listeners:
//
// 1

document.getElementById("btn01").addEventListener("click", exer01);
document.getElementById("btn02").addEventListener("click", exer02);
document.getElementById("btn03").addEventListener("click", exer03);
document.getElementById("btn04").addEventListener("click", exer04);
document.getElementById("btn05").addEventListener("click", exer05);
document.getElementById("btn06").addEventListener("click", exer06);
document.getElementById("btn07").addEventListener("click", exer07);
document.getElementById("btn08").addEventListener("click", exer08);
document.getElementById("btn09").addEventListener("click", exer09);
document.getElementById("btn10").addEventListener("click", exer10);
document.getElementById("btn11").addEventListener("click", exer11);
document.getElementById("btn12").addEventListener("click", exer12);
document.getElementById("btn13").addEventListener("click", exer13);
document.getElementById("btn14").addEventListener("click", exer14);
document.getElementById("btn15").addEventListener("click", exer15);
document.getElementById("btn16").addEventListener("click", exer16);
document.getElementById("btn17").addEventListener("click", exer17);
document.getElementById("btn18").addEventListener("click", exer18);
document.getElementById("btn19").addEventListener("click", exer19);
document.getElementById("btn20").addEventListener("click", exer20);
// Activitats
// 1. Seleccionar un element HTML pel seu ID i modifiqueu alguna de les seves propietats.
function exer01() {
  const element = document.getElementById("exer01");
  element.style.color = "red";
  element.style.fontWeight = "bold";
  element.innerHTML = "Elemento cambiado D:";
}
// 2. Seleccionar elements HTML per la seva classe i modifiqueu alguna de les seves propietats.
function exer02() {
  const element = document.querySelector(".exer02");
  element.style.color = "blue";
  element.style.fontWeight = "bold";
  element.innerHTML = "Elemento enojado >:\\";
}
// 3. Seleccionar elements HTML per la seva etiqueta i modifiqueu alguna de les seves propietats.
function exer03() {
  const container = document.getElementById("exer03");
  const element = container.getElementsByTagName("p")[0];
  element.style.fontSize = "30px";
  element.innerHTML = "Mucho mejor :)"
}

// 4. Seleccionar el primer element HTML que coincideixi amb un selector CSS i modifiqueu alguna de les seves propietats.
function exer04() {
  const container = document.querySelector("#exer04");
  const element = container.querySelector(".texto");
  element.style.fontWeight = "bold";
  element.style.fontSize = "30px";
  element.style.color = "#FFD700";
}

// 5. Seleccionar tots els elements HTML que coincideixi amb un selector CSS i modifiqueu alguna de les seves propietats.
function exer05() {
  const container = document.querySelector("#exer05");
  const element = container.querySelectorAll(".texto");
  element.forEach(el => {
    el.style.fontWeight = "bold";
    el.style.fontSize = "30px";
    el.style.color = "#FFD700";
    el.innerHTML = "Todos son dorados!";
  });
}
// 6. Crear un nou element HTML i afegir-lo al DOM.
function exer06() {
  const container = document.querySelector("#exer06");
  const creador = document.createElement("p");
  creador.innerHTML = `Hola, me llamo Clippy :) <br> <br>
    ¿Conoces al Weta? Son insectos provenientes de Nueva Zelanda y son los más pesados del mundo, ¡con unos increíbles 71 gramos! ¡Eso es más que un gorrión :O! 
    También, ¡Pueden llegar a medir 10 cm de largo y sus patas pueden llegar a medir hasta los 20 cm! <br>
    Son tan grandes, que han asumido el papel de ratones pequeños. Son una especie de insecto muy antigua, ya que se han encontrado fosiles en Queensland, Australia, que datan del Triásico, hace 180-190 millones de años. <br>
    <a href="https://es.wikipedia.org/wiki/Weta"target="_blank">
      <img src="assets/img/weta.jpg" style="border-radius: 20px; margin: 20px;">
    </a> <br>
    Un Weta`;
  container.appendChild(creador);
}
// 7. Inserir un element HTML abans d’un altre.
function exer07() {
  const container = document.querySelector("#exer07");
  const creador = document.createElement("p");
  creador.innerText = "Soy el nuevo primero >:D";
  container.insertBefore(creador, container.firstChild);
}
// 8. Clonar un element HTML.
function exer08() {
  const container = document.querySelector("#exer08");
  const original = container.querySelector(".copia");
  const copia = original.cloneNode(true);
  container.appendChild(copia);
}
// 9. Eliminar un element HTML del DOM.
function exer09() {
  const container = document.querySelector("#exer09");
  const objetivo = container.querySelector(".objetivo");
  objetivo.remove();
}
// 10. Canviar l’estil d’un element HTML.
function exer10() {
  const container = document.querySelector("#exer10");
  const elemento = container.querySelector(".texto");
  elemento.style.color = "red";
  elemento.style.fontSize = "20px";
}
// 11. Afegir una classe a un element HTML.
function exer11() {
  const container = document.querySelector("#exer11");
  const elemento = container.querySelector(".texto");
  elemento.classList.add("activo");
}
// 12. Eliminar una classe d'un element HTML.
function exer12() {
  const container = document.querySelector("#exer12");
  const elemento = container.querySelector(".texto");
  elemento.classList.remove("activo");
}
// 13. Alternar (assignar / desassignar) una classe en un element HTML.
function exer13() {
  const container = document.querySelector("#exer13");
  const elemento = container.querySelector(".texto");
  elemento.classList.toggle("activo");
}
// 14. Canviar el contingut HTML d'un element.
function exer14() {
  const container = document.querySelector("#exer14");
  const elemento = container.querySelector(".texto");
  elemento.innerHTML = "<strong>Hola, ¡soy Tux :D!</strong>"
}
// 15. Canviar atributs d’un element HTML.
function exer15() {
  const container = document.querySelector("#exer15");
  const img = container.querySelector("img");
  img.setAttribute("src", "assets/img/weta_gigante.png");
  img.setAttribute("alt", "Un weta gigante.")
}
// 16. Crear un element HTML i afegir-lo dins d’un altre.
function exer16() {
  const container = document.querySelector("#exer16");
  const creador = document.createElement("li");
  creador.innerText = "Soy un item, Hola :)";
  container.appendChild(creador);
}
// 17. Elimina tots els fills d’un element HTML.
function exer17() {
  const container = document.querySelector("#exer17");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
// 18. Modificar el text d’un element HTML.
function exer18() {
  const container = document.querySelector("#exer18");
  const elemento = container.querySelector(".texto");
  elemento.innerText = "Texto actualizado";
}
// 19. Modificar múltiples estils d'un element HTML.
function exer19() {
  const container = document.querySelector("#exer19");
  const elemento = container.querySelector(".texto");
  elemento.style.color = "#FFD700";
  elemento.style.backgroundColor = "#E3E4E5";
  elemento.style.borderRadius = "10px";
  elemento.style.padding = "10px";
}
// 20. Alternar visibilitat (visible/no visible) d’un element HTML.
function exer20() {
  const container = document.querySelector("#exer20");
  const elemento = container.querySelector(".texto");
  if (elemento.style.display === "none") {
    elemento.style.display = "block";
  } else {
    elemento.style.display = "none";
  }
}
