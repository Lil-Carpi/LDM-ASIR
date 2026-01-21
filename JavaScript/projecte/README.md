# Investigacions

En aquest README m'encarrego principalment de recopilar totes les coses noves que vagi aprenent mentre faig el projecte, així com noves idees per implementar-hi. Suposo que és una bona pràctica documentar allò que s'aprèn.

---

## 1. Estils Visuals i Efectes

### Glassmorfisme (Efecte Vidre)
Efecte de tipus vidre opac, popularitzat per Apple i Windows Aero. En aquest projecte s'utilitza intensivament a la **Navbar**, el **Footer** i els **Formularis**.

**Com s'aconsegueix en CSS:**
Per aconseguir aquest efecte "glass" sobre fons foscos, hem utilitzat tres propietats clau:
1.  **Color semi-transparent:** `background: rgba(255, 255, 255, 0.05);` (molt subtil).
2.  **Desenfocament del fons:** `backdrop-filter: blur(12px);` (això és el que fa que el que hi ha darrere es vegi borrós).
3.  **Borde subtil:** `border: 1px solid rgba(255, 255, 255, 0.2);` per delimitar el vidre.

### Efecte Neó (Glow)
Per donar l'estètica "Gamer/Ciberpunk", s'utilitzen ombres de colors brillants sobre fons foscos.

* **En text:** `text-shadow: 0 0 10px #00c3ff;` (crea una resplendor al voltant de les lletres).
* **En botons/caixes:** `box-shadow: 0 0 20px rgba(...);`.
* **Enllaços:** Al fer *hover*, el color canvia a cian (`#00c3ff`) o verd, típic de neons.

---

## 2. Layout i Estructura (Maquetació)

### CSS Grid (Graella de Rànquing)
Per a la secció de rànquings (`.ranking-grid`), hem utilitzat **CSS Grid** en lloc de Flexbox.
* **Codi:** `grid-template-columns: repeat(3, 1fr);`
* **Què fa:** Crea automàticament 3 columnes d'igual amplada.
* **Responsive:** Amb una *Media Query*, quan la pantalla és petita (`max-width: 900px`), canviem a `grid-template-columns: 1fr;` perquè les targetes es posin una sota l'altra.

### Flexbox (Navbar i Footer)
S'utilitza per a alineacions unidimensionals (una fila).
* `justify-content: space-between;`: Separa el logo a l'esquerra i els enllaços a la dreta.
* `align-items: center;`: Centra verticalment els elements.

---

## 3. Menú Hamburguesa sense JavaScript (El "Checkbox Hack")
Aquesta és una de les parts més interessants. Hem creat un menú mòbil que s'obre i es tanca **només amb CSS**, sense utilitzar JavaScript.

**Com funciona?**
1.  Tenim un `<input type="checkbox" id="menu-toggle">` que està ocult (`display: none`).
2.  Tenim una `<label>` amb la icona de l'hamburguesa vinculada a aquest input.
3.  Utilitzem el selector de "germans" (`~`) per detectar quan el checkbox està marcat:

```css
#menu-toggle:checked ~ .navbarLinks {
    display: flex;
    animation: fadeIn 0.4s ease forwards;
}