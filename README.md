# Portafolio LDM-ASIR: Desarrollo Web

Bienvenido a mi colección de prácticas y proyectos. Este repositorio documenta mi progresión en el aprendizaje de tecnologías web, desde estructuras básicas HTML hasta diseños modernos con efectos visuales avanzados.

---

## Tecnologías Utilizadas

* **Lenguajes:** ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
* **Fuentes e Iconos:** Google Fonts (Manjari) & Font Awesome.
* **Estilos:** Flexbox, CSS Grid, Posicionamiento Absoluto/Relativo.
* **Diseño UI:** Glassmorphism (Efecto cristal), Diseño Responsivo.

---

## Proyecto Destacado: JocsMania

El trabajo principal de este repositorio. Una web moderna sobre videojuegos con estética **Glassmorphism**.

**Ubicación:** [`projecte-final/main/`](projecte-final/main/indexSAD.html)

### Características Clave
* **Diseño Glassmorphism:** Uso intensivo de `backdrop-filter: blur` para crear paneles de cristal semitransparentes.
* **Navegación Móvil:** Menú hamburguesa totalmente responsive creado con CSS puro (Checkbox Hack).
* **Tarjetas Interactivas:** Efectos de *hover* y transiciones suaves en la lista de juegos.

| Archivo Principal | Descripción |
| :--- | :--- |
| `indexSAD.html` | Página de inicio con las "Top Ventas". |
| `videojocsSAD.html` | Catálogo completo de juegos. |
| `style.css` | Hoja de estilos principal con variables y media queries. |

---

## Colección de Prácticas (Ejercicios)

Evolución de ejercicios realizados durante el curso:

| Actividad | Temática | Ruta |
| :--- | :--- | :--- |
| **ACT 24** | 🎬 **El Cinema**<br>Mini-web con fichas de actores y películas. | [`/ACT24_sad`](ACT24_sad/inicial_sad.html) |
| **ACT 27** | 🖌️ **Katsushika Hokusai**<br>Biografía y galería de arte. | [`/ACT27_sad`](ACT27_sad/ACT27_sad.html) |
| **ACT 25** | 🐶 **Mascotas**<br>Estructura básica de blog. | [`/ACT25_sad`](ACT25_sad/index.html) |
| **ACT 23** | 📝 **Tablas**<br>Maquetación de datos y listas. | [`/ACT23_sad`](ACT23_sad/act23_sad.html) |
| **ACT 21/22** | 🌑 **Conceptos Básicos**<br>Primeros pasos con HTML/CSS (La Lluna). | [`/ACT21_sad`](ACT21_sad/act21_sad.html) |

---

## Notas de Aprendizaje (DevLog)

> *"Es buena práctica documentar lo que se aprende."*

### Glassmorphism
Efecto de tipo cristal opaco. Popularizado por Apple con su entorno gráfico "Liquid Glass", un efecto que drena la batería del teléfono a velocidad insana,
y que ya estaba presente desde Windows 7 con Windows Aero. Este efecto utiliza `backdrop-filter: blur` para crear una apariencia de vidrio esmerilado.
* **Nota:** El uso excesivo de `backdrop-filter` puede impactar el rendimiento (batería) en móviles antiguos.

### Etiqueta `<iframe>`
Se utiliza para incrustar documentos externos (mapas, vídeos). Es un efecto que ya utilicé una vez en otro proyecto personal que ahora es *lost media*, lastimosamente.
* **Accesibilidad:** Es crucial incluir el atributo `title="..."` para que los lectores de pantalla sepan qué contenido se está mostrando.

---

## Cómo ejecutar el proyecto

1.  Clona o descarga este repositorio.
2.  Abre la carpeta en **Visual Studio Code**.
3.  Recomendado: Usa la extensión **Live Server** para visualizar los cambios en tiempo real.
4.  Abre `projecte-final/main/indexSAD.html` para ver el resultado final.

---
<p align="center">
  <sub>© 2025 Lil_Carpi - LDM ASIR</sub>
</p>