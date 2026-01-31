console.log("JS cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("navLinks");

  /**
   * Cierra el menú respetando la animación de cierre.
   * 
   * Problema que resuelve:
   * - Si quitas la clase "active" directamente, la animación de cierre no se reproduce.
   * - Por eso se añade primero la clase "closing" y se espera al evento "animationend".
   * 
   * Protección:
   * - Evita relanzar el cierre si ya se está cerrando (doble click rápido, spam de clicks).
   */
  const closeMenu = () => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.classList.contains("closing")
    ) {
      navLinks.classList.add("closing");

      navLinks.addEventListener(
        "animationend",
        () => {
          // Cuando termina la animación:
          // - Se elimina el estado visible
          // - Se limpia el estado de cierre para permitir futuras animaciones
          navLinks.classList.remove("active");
          navLinks.classList.remove("closing");
        },
        { once: true }, // Garantiza que el listener no se acumule con cada cierre
      );
    }
  };

  /**
   * Abre el menú.
   * 
   * Nota:
   * - No se gestiona aquí animación porque la animación de apertura
   *   ocurre automáticamente al añadir la clase "active".
   */
  const openMenu = () => {
    navLinks.classList.add("active");
  };

  /**
   * Toggle de menú:
   * - Si está abierto → se cierra con animación.
   * - Si está cerrado → se abre.
   */
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  /**
   * Cierra el menú cuando se pulsa un link interno.
   * 
   * UX:
   * - Evita que el menú quede abierto al navegar.
   * - Mejora experiencia en móvil.
   */
  const links = document.querySelectorAll(".navbarLinks a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // ---------------- SLIDER ----------------

  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const playPauseBtn = document.getElementById('toggle-play');

  /**
   * Protección:
   * - Evita errores si este JS se carga en una página que no tiene slider.
   */
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;
    const intervalTime = 4000;

    /**
     * Muestra un slide concreto y normaliza el índice.
     * 
     * Casos borde:
     * - Si se pasa del último → vuelve al primero
     * - Si baja de 0 → salta al último
     * 
     * Esto permite navegación circular infinita.
     */
    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));

      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      } 

      slides[currentSlide].classList.add('active');
    };

    /**
     * Navegación secuencial desacoplada de la lógica de render.
     * Esto te permite cambiar la lógica interna sin tocar los botones.
     */
    const nextSlide = () => {
      showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      showSlide(currentSlide - 1);
    };

    /**
     * Control centralizado del autoplay.
     * 
     * Ventaja:
     * - Puedes pausar / reanudar sin duplicar lógica.
     */
    const startSlideTimer = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };

    const stopSlideTimer = () => {
      clearInterval(slideInterval);
    };

    /**
     * Al pulsar manualmente:
     * - Se avanza o retrocede
     * - Se reinicia el temporizador para que no haga salto inmediato
     */
    nextBtn.addEventListener('click', () => {
      nextSlide();
      if (isPlaying) {
        stopSlideTimer();
        startSlideTimer();
      }
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      if (isPlaying) {
        stopSlideTimer();
        startSlideTimer();
      }
    });

    /**
     * Toggle de autoplay:
     * - Cambia icono
     * - Detiene o reinicia el intervalo
     * 
     * Detalle fino:
     * - Al reanudar, haces un avance inmediato para que el usuario perciba respuesta.
     */
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopSlideTimer();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlaying = false;
      } else {
        startSlideTimer();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = true;
        nextSlide();
      }
    });

    /**
     * Arranque automático del carrusel al cargar la página.
     */
    startSlideTimer();
  }
});

