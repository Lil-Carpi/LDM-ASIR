// class GlassElement extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//   }

//   connectedCallback() {
//     const quality = this.getAttribute('quality') || 'high';

//     const config = {
//       low:    { blur1: 6,  blur2: 2,  scale: 15 },
//       medium: { blur1: 10, blur2: 4,  scale: 25 },
//       high:   { blur1: 14, blur2: 6,  scale: 40 },
//     }[quality] || { blur1: 14, blur2: 6, scale: 40 };

//     const isChromium = /chrome|chromium|crios|edg/i.test(navigator.userAgent);

//     const style = document.createElement('style');
//     style.textContent = `
//       :host {
//         display: block;
//         position: relative;
//       }

//       .glass-box {
//         position: absolute;
//         inset: 0;
//         backdrop-filter:
//           blur(${config.blur1}px)
//           url("#liquid-glass-filter")
//           blur(${config.blur2}px)
//           saturate(1.4)
//           brightness(1.1);
//         -webkit-backdrop-filter:
//           blur(${config.blur1}px)
//           url("#liquid-glass-filter")
//           blur(${config.blur2}px)
//           saturate(1.4)
//           brightness(1.1);
//         background: rgba(20, 20, 20, 0.35);
//         border-bottom: 1px solid rgba(255,255,255,0.15);
//       }

//       .glass-content {
//         position: relative;
//         z-index: 1;
//       }

//       /* fallback */
//       .fallback {
//         background: rgba(20, 20, 20, 0.9);
//       }
//     `;

//     const box = document.createElement('div');
//     box.className = 'glass-box';

//     const content = document.createElement('div');
//     content.className = 'glass-content';

//     while (this.firstChild) {
//       content.appendChild(this.firstChild);
//     }

//     this.shadowRoot.append(style, box, content);

//     if (!isChromium || !CSS.supports('backdrop-filter', 'blur(1px)')) {
//       box.classList.add('fallback');
//     }
//   }
// }

// customElements.define('glass-element', GlassElement);
console.log("glass-element.js cargado correctamente.")

// class GlassElement extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//   }
//   connectedCallback() {
//     this.injectSvgFilter();
//     const quality = this.getAttribute('quality') || 'high';

//     const config = {
//       low:    {blur: '6px',  opacity: 0.4 },
//       medium: {blur: '10px', opacity: 0.3 },
//       high:   {blur: '16px', opacity: 0.2 },
//     } [quality];
//     const style = document.createElement('style');
//     style.textContent = `
//       :host {
//         display: block;
//         position: relative;
//         overflow: hidden;
//         border-radius: inherit;
//       }  

//       .glass-background {
//         position: absolute;
//         inset: 0;
//         z-index: 0;
//         background: rgba(255, 255, 255, ${config.opacity});
//         backdrop-filter: blur(${config.blur}) saturate(180%);
//         -webkit-backdrop-filter: blur(${config.blur}) saturate(180%);
//         border: 1px solid rgba(255, 255, 255, 0.3);
//         border-top: 1px solid rgba(255, 255, 255, 0.5);
//         border-left: 1px solid rgba(255, 255, 255, 0.5);
//         box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
//         border-radius: inherit;
//         pointer-events: none;

//       }

//       .liquid-mode {
//         backdrop-filter: blur(${config.blur}) url("#liquid-glass-filter") saturate(140%);
//         -webkit-backdrop-filter: blur(${config.blur}) url("#liquid-glass-filter")saturate(140%);
//       }
      
//       .content {
//         position: relative;
//         z-index:1;
//         height:100%;
//       }
//     `;

//     this.shadowRoot.innerHTML = `
//       <div class="glass-background"></div>
//       <div class="content">
//         <slot></slot>
//       </div>
//     `;

//     this.shadowRoot.appendChild(style);
//   }
//   injectSvgFilter() {
//     if (document.getElementById('liquid-glass-filter')) return;
//     const svgNS = "http://www.w3.org/2000/svg";
//     const svg = document.createElementNS(svgNS, "svg");
//     svg.setAttribute("style", "position: absolute; width: 0; height: 0;");
//     svg.innerHTML = `
//       <filter id="liquid-glass-filter">
//         <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise"/>
//         <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G"/>
//       </filter>
//     `;
//     document.body.appendChild(svg);
//   }
// }
// customElements.define('glass-element', GlassElement);
/**
 * glass-element.js
 * Combina la lógica de desplazamiento SVG y el Web Component.
 */

// ==========================================
// PARTE 1: UTILIDADES DE DESPLAZAMIENTO (DisplacementUtils)
// ==========================================

// const DisplacementUtils = {
//     /**
//      * Crea el mapa de desplazamiento (la "forma" de la lente)
//      */
//     getDisplacementMap({ height, width, radius, depth }) {
//         const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil((radius / height) * 15)}%" y2="${Math.floor(100 - (radius / height) * 15)}%">
//                     <stop offset="0%" stop-color="#0F0" />
//                     <stop offset="100%" stop-color="#000" />
//                 </linearGradient>
//                 <linearGradient id="X" x1="${Math.ceil((radius / width) * 15)}%" x2="${Math.floor(100 - (radius / width) * 15)}%" y1="0" y2="0">
//                     <stop offset="0%" stop-color="#F00" />
//                     <stop offset="100%" stop-color="#000" />
//                 </linearGradient>
//             </defs>
//             <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
//             <g filter="blur(2px)">
//                 <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
//                 <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" style="mix-blend-mode: screen;" />
//                 <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" style="mix-blend-mode: screen;" />
//                 <rect x="${depth}" y="${depth}" height="${Math.max(0, height - 2 * depth)}" width="${Math.max(0, width - 2 * depth)}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
//             </g>
//         </svg>`;
//         return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
//     },

//     /**
//      * Crea el filtro final aplicando aberración cromática
//      */
//     getDisplacementFilter({ height, width, radius, depth, strength = 10, chromaticAberration = 0 }) {
//         const displacementMapUrl = this.getDisplacementMap({ height, width, radius, depth });
//         const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <filter id="displace" color-interpolation-filters="sRGB">
//                     <feImage x="0" y="0" height="${height}" width="${width}" href="${displacementMapUrl}" result="displacementMap" />
//                     <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration * 2}" xChannelSelector="R" yChannelSelector="G" />
//                     <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR" />
//                     <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration}" xChannelSelector="R" yChannelSelector="G" />
//                     <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG" />
//                     <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G" />
//                     <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB" />
//                     <feBlend in="displacedR" in2="displacedG" mode="screen"/>
//                     <feBlend in2="displacedB" mode="screen"/>
//                 </filter>
//             </defs>
//         </svg>`;
//         return "data:image/svg+xml;utf8," + encodeURIComponent(svg) + "#displace";
//     }
// };

// // ==========================================
// // PARTE 2: EL WEB COMPONENT (GlassElement)
// // ==========================================

// class GlassElement extends HTMLElement {
//     constructor() {
//         super();
//         this.clicked = false;
//         this.attachShadow({ mode: 'open' });
        
//         // Detección de soporte (Chromium vs Firefox/Safari)
//         if (GlassElement._svgFilterSupport === undefined) {
//             const userAgent = navigator.userAgent.toLowerCase();
//             // Asumimos soporte en Chrome/Edge, fallback en otros
//             const isChromium = /chrome|chromium|crios|edg/.test(userAgent) && !/firefox|fxios/.test(userAgent);
//             GlassElement._svgFilterSupport = isChromium;
//             console.log(`[GlassElement] Modo Avanzado (Chromium): ${isChromium}`);
//         }
//     }

//     static get observedAttributes() {
//         return ['width', 'height', 'radius', 'depth', 'blur', 'strength', 'chromatic-aberration', 'auto-size'];
//     }

//     connectedCallback() {
//         this.render();
//         this.setupEventListeners();
        
//         // Si usa auto-size, observamos cambios de tamaño
//         if (this.hasAttribute('auto-size')) {
//             // Pequeño delay para asegurar que el DOM padre existe
//             setTimeout(() => this.updateStyles(), 50);
            
//             // Observer por si cambia el contenido o la ventana
//             window.addEventListener('resize', () => this.updateStyles());
//             const observer = new MutationObserver(() => this.updateStyles());
//             observer.observe(this, { childList: true, subtree: true, characterData: true });
//         } else {
//             this.updateStyles();
//         }
//     }

//     // Getters con valores por defecto
//     get width() { return parseInt(this.getAttribute('width')) || this.offsetWidth || 200; }
//     get height() { return parseInt(this.getAttribute('height')) || this.offsetHeight || 100; }
//     get radius() { return parseInt(this.getAttribute('radius')) || 20; }
//     get baseDepth() { return parseInt(this.getAttribute('depth')) || 20; }
//     get blur() { return parseInt(this.getAttribute('blur')) || 10; }
//     get strength() { return parseInt(this.getAttribute('strength')) || 10; }
//     get chromaticAberration() { return parseInt(this.getAttribute('chromatic-aberration')) || 5; } // Efecto RGB
//     get depth() { return this.baseDepth / (this.clicked ? 0.5 : 1); } // Al clicar se hunde

//     setupEventListeners() {
//         const box = this.shadowRoot.querySelector('.glass-box');
//         if(!box) return;
        
//         box.addEventListener('mousedown', () => { this.clicked = true; this.updateStyles(); });
//         box.addEventListener('mouseup', () => { this.clicked = false; this.updateStyles(); });
//         box.addEventListener('mouseleave', () => { this.clicked = false; this.updateStyles(); });
//     }

//     updateStyles() {
//         const glassBox = this.shadowRoot.querySelector('.glass-box');
//         if (!glassBox) return;

//         // Calcular dimensiones reales
//         let w = this.hasAttribute('auto-size') ? glassBox.offsetWidth : this.width;
//         let h = this.hasAttribute('auto-size') ? glassBox.offsetHeight : this.height;

//         // Evitar errores con tamaños 0
//         if (w <= 0) w = 200; 
//         if (h <= 0) h = 100;

//         glassBox.style.borderRadius = `${this.radius}px`;

//         if (GlassElement._svgFilterSupport) {
//             // MODO CHROME/EDGE: Filtro SVG complejo (Refracción real)
//             const filterUrl = DisplacementUtils.getDisplacementFilter({
//                 width: w,
//                 height: h,
//                 radius: this.radius,
//                 depth: this.depth,
//                 strength: this.strength,
//                 chromaticAberration: this.chromaticAberration
//             });
            
//             glassBox.style.backdropFilter = `url('${filterUrl}') blur(${this.blur}px)`;
//             glassBox.style.webkitBackdropFilter = `url('${filterUrl}') blur(${this.blur}px)`;
//             glassBox.style.background = 'rgba(255, 255, 255, 0.05)'; // Muy transparente
//             glassBox.style.boxShadow = 'inset 0 0 20px rgba(255,255,255,0.1), 0 10px 20px rgba(0,0,0,0.2)';
//             glassBox.style.border = '1px solid rgba(255,255,255,0.2)';
//         } else {
//             // FALLBACK (Firefox/Safari): Solo Blur estándar
//             glassBox.style.backdropFilter = `blur(${this.blur * 2}px)`;
//             glassBox.style.webkitBackdropFilter = `blur(${this.blur * 2}px)`;
//             glassBox.style.background = 'rgba(255, 255, 255, 0.1)';
//             glassBox.style.border = '1px solid rgba(255,255,255,0.3)';
//         }
//     }

//     render() {
//         const isAutoSize = this.hasAttribute('auto-size');
        
//         this.shadowRoot.innerHTML = `
//             <style>
//                 :host {
//                     display: ${isAutoSize ? 'inline-block' : 'block'};
//                     position: relative;
//                 }
//                 .glass-box {
//                     position: relative;
//                     transition: all 0.2s ease-out;
//                     overflow: hidden;
//                     /* Asegurar que el contenedor ocupe el espacio */
//                     width: ${isAutoSize ? 'auto' : '100%'};
//                     height: ${isAutoSize ? 'auto' : '100%'};
//                     min-width: 50px;
//                     min-height: 50px;
//                 }
//                 .content {
//                     position: relative;
//                     z-index: 2;
//                     height: 100%;
//                 }
//             </style>
//             <div class="glass-box">
//                 <div class="content">
//                     <slot></slot>
//                 </div>
//             </div>
//         `;
//     }
// }

// customElements.define('glass-element', GlassElement);
/**
 * glass-element.js (Versión Ultra-Líquida & Animada)
 */

// ==========================================
// PARTE 1: MOTORES DE DESPLAZAMIENTO (DisplacementUtils)
// ==========================================

// const DisplacementUtils = {
//     /**
//      * Genera el mapa de altura (la forma de la gota).
//      * MODIFICACIÓN: Aumentado el factor de curvatura para bordes más "gordos".
//      */
//     getDisplacementMap({ height, width, radius, depth }) {
//         // Aumentamos el factor de 15 a 35 para que el borde líquido sea más ancho y visible
//         const liquidFactor = 35; 
        
//         const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil((radius / height) * liquidFactor)}%" y2="${Math.floor(100 - (radius / height) * liquidFactor)}%">
//                     <stop offset="0%" stop-color="#0F0" />
//                     <stop offset="100%" stop-color="#000" />
//                 </linearGradient>
//                 <linearGradient id="X" x1="${Math.ceil((radius / width) * liquidFactor)}%" x2="${Math.floor(100 - (radius / width) * liquidFactor)}%" y1="0" y2="0">
//                     <stop offset="0%" stop-color="#F00" />
//                     <stop offset="100%" stop-color="#000" />
//                 </linearGradient>
//             </defs>
//             <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
//             <g filter="blur(2px)">
//                 <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
//                 <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" style="mix-blend-mode: screen;" />
//                 <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" style="mix-blend-mode: screen;" />
//                 <rect x="${depth}" y="${depth}" height="${Math.max(0, height - 2 * depth)}" width="${Math.max(0, width - 2 * depth)}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
//             </g>
//         </svg>`;
//         return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
//     },

//     /**
//      * Crea el filtro final.
//      * MODIFICACIÓN: Separación RGB más agresiva para aberración cromática nítida.
//      */
//     getDisplacementFilter({ height, width, radius, depth, strength = 10, chromaticAberration = 0 }) {
//         const displacementMapUrl = this.getDisplacementMap({ height, width, radius, depth });
        
//         // Multiplicamos la aberración para exagerarla
//         const ca = chromaticAberration * 4; 

//         const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <filter id="displace" color-interpolation-filters="sRGB">
//                     <feImage x="0" y="0" height="${height}" width="${width}" href="${displacementMapUrl}" result="displacementMap" />
                    
//                     <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + ca}" xChannelSelector="R" yChannelSelector="G" />
//                     <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR" />
                    
//                     <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G" />
//                     <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG" />
                    
//                     <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength - ca}" xChannelSelector="R" yChannelSelector="G" />
//                     <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB" />
                    
//                     <feBlend in="displacedR" in2="displacedG" mode="screen"/>
//                     <feBlend in2="displacedB" mode="screen"/>
//                 </filter>
//             </defs>
//         </svg>`;
//         return "data:image/svg+xml;utf8," + encodeURIComponent(svg) + "#displace";
//     }
// };

// // ==========================================
// // PARTE 2: EL WEB COMPONENT (GlassElement)
// // ==========================================

// class GlassElement extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
        
//         if (GlassElement._svgFilterSupport === undefined) {
//             const userAgent = navigator.userAgent.toLowerCase();
//             const isChromium = /chrome|chromium|crios|edg/.test(userAgent) && !/firefox|fxios/.test(userAgent);
//             GlassElement._svgFilterSupport = isChromium;
//         }
//     }

//     static get observedAttributes() {
//         return ['width', 'height', 'radius', 'depth', 'blur', 'strength', 'chromatic-aberration', 'auto-size'];
//     }

//     connectedCallback() {
//         this.render();
//         // Inicializar
//         setTimeout(() => this.updateStyles(), 50);
        
//         // Observers para reactividad
//         if (this.hasAttribute('auto-size')) {
//             window.addEventListener('resize', () => this.updateStyles());
//             const observer = new MutationObserver(() => this.updateStyles());
//             observer.observe(this, { childList: true, subtree: true, characterData: true });
//         }
//     }

//     // Getters
//     get width() { return parseInt(this.getAttribute('width')) || this.offsetWidth || 200; }
//     get height() { return parseInt(this.getAttribute('height')) || this.offsetHeight || 100; }
//     get radius() { return parseInt(this.getAttribute('radius')) || 20; }
//     get depth() { return parseInt(this.getAttribute('depth')) || 20; }
//     get blur() { return parseInt(this.getAttribute('blur')) || 10; }
//     get strength() { return parseInt(this.getAttribute('strength')) || 10; }
//     get chromaticAberration() { return parseInt(this.getAttribute('chromatic-aberration')) || 5; }

//     updateStyles() {
//         const glassBox = this.shadowRoot.querySelector('.glass-box');
//         if (!glassBox) return;

//         let w = this.hasAttribute('auto-size') ? glassBox.offsetWidth : this.width;
//         let h = this.hasAttribute('auto-size') ? glassBox.offsetHeight : this.height;
//         if (w <= 0) w = 200; 
//         if (h <= 0) h = 100;

//         glassBox.style.borderRadius = `${this.radius}px`;

//         if (GlassElement._svgFilterSupport) {
//             const filterUrl = DisplacementUtils.getDisplacementFilter({
//                 width: w,
//                 height: h,
//                 radius: this.radius,
//                 depth: this.depth,
//                 strength: this.strength,
//                 chromaticAberration: this.chromaticAberration
//             });
            
//             glassBox.style.backdropFilter = `url('${filterUrl}') blur(${this.blur}px)`;
//             glassBox.style.webkitBackdropFilter = `url('${filterUrl}') blur(${this.blur}px)`;
//         } else {
//             // Fallback
//             glassBox.style.backdropFilter = `blur(${this.blur * 2}px)`;
//             glassBox.style.webkitBackdropFilter = `blur(${this.blur * 2}px)`;
//         }
//     }

//     render() {
//         const isAutoSize = this.hasAttribute('auto-size');
        
//         this.shadowRoot.innerHTML = `
//             <style>
//                 :host {
//                     display: ${isAutoSize ? 'inline-block' : 'block'};
//                     position: relative;
//                     /* Evita parpadeos en transformaciones */
//                     -webkit-font-smoothing: antialiased; 
//                 }
                
//                 .glass-box {
//                     position: relative;
//                     width: ${isAutoSize ? 'auto' : '100%'};
//                     height: ${isAutoSize ? 'auto' : '100%'};
//                     min-width: 50px; 
//                     min-height: 50px;
                    
//                     /* ESTILOS VISUALES DEL CRISTAL */
//                     background: rgba(255, 255, 255, 0.03); /* Casi transparente */
//                     border: 1px solid rgba(255, 255, 255, 0.2);
//                     border-top: 1px solid rgba(255, 255, 255, 0.5); /* Luz arriba */
//                     border-bottom: 1px solid rgba(255, 255, 255, 0.05); /* Sombra abajo */
//                     box-shadow: 
//                         0 20px 40px rgba(0,0,0,0.2), /* Sombra difusa */
//                         inset 0 0 20px rgba(255,255,255,0.05); /* Brillo interior */

//                     /* ANIMACIÓN SUAVE */
//                     cursor: pointer;
//                     transition: 
//                         transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), /* Efecto rebote suave */
//                         box-shadow 0.4s ease,
//                         background 0.4s ease,
//                         backdrop-filter 0.4s ease;
//                 }

//                 /* EFECTO HOVER */
//                 .glass-box:hover {
//                     background: rgba(255, 255, 255, 0.08);
//                     box-shadow: 0 25px 50px rgba(0,0,0,0.3), inset 0 0 25px rgba(255,255,255,0.1);
//                     transform: translateY(-2px); /* Flota un poco al pasar el mouse */
//                 }

//                 /* EFECTO CLICK (HUNDIRSE) MEJORADO */
//                 .glass-box:active {
//                     transform: scale(0.96) translateY(2px); /* Se hace pequeño y baja */
//                     box-shadow: 0 5px 10px rgba(0,0,0,0.1); /* Sombra se reduce (más pegado al fondo) */
//                     background: rgba(255, 255, 255, 0.02); /* Se oscurece ligeramente */
//                     border-color: rgba(255, 255, 255, 0.1); /* Borde pierde brillo */
//                 }

//                 .content {
//                     position: relative;
//                     z-index: 2;
//                     height: 100%;
//                 }
//             </style>
//             <div class="glass-box">
//                 <div class="content">
//                     <slot></slot>
//                 </div>
//             </div>
//         `;
//     }
// }

// customElements.define('glass-element', GlassElement);
/**
 * glass-element.js (Versión NUCLEAR - High Visibility)
 */

const DisplacementUtils = {
    getDisplacementMap({ height, width, radius, depth }) {
        // Aumentamos el borde líquido al 45% (casi la mitad de la tarjeta)
        const liquidFactor = 45; 
        
        const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil((radius / height) * liquidFactor)}%" y2="${Math.floor(100 - (radius / height) * liquidFactor)}%">
                    <stop offset="0%" stop-color="#0F0" />
                    <stop offset="100%" stop-color="#000" />
                </linearGradient>
                <linearGradient id="X" x1="${Math.ceil((radius / width) * liquidFactor)}%" x2="${Math.floor(100 - (radius / width) * liquidFactor)}%" y1="0" y2="0">
                    <stop offset="0%" stop-color="#F00" />
                    <stop offset="100%" stop-color="#000" />
                </linearGradient>
            </defs>
            <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
            <g filter="blur(4px)"> <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
                <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" style="mix-blend-mode: screen;" />
                <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" style="mix-blend-mode: screen;" />
                <rect x="${depth}" y="${depth}" height="${Math.max(0, height - 2 * depth)}" width="${Math.max(0, width - 2 * depth)}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
            </g>
        </svg>`;
        return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    },

    getDisplacementFilter({ height, width, radius, depth, strength = 50, chromaticAberration = 10, animated = false }) {
        const displacementMapUrl = this.getDisplacementMap({ height, width, radius, depth });
        
        // MODIFICACIÓN: Multiplicadores agresivos
        // Si pones strength="10", aquí se convierte en 30.
        // La aberración cromática se multiplica por 8 para que se vea el RGB split brutal.
        const s = strength * 3; 
        const ca = chromaticAberration * 8; 

        // Turbulencia: 0.005 crea ondas grandes (tipo agua). 0.05 crea ruido (tipo arena).
        const frequency = "0.008"; 

        // Animación: Si está activada, añadimos tags <animate> al SVG
        const animationTags = animated ? `
            <animate attributeName="baseFrequency" values="0.008; 0.006; 0.008" dur="10s" repeatCount="indefinite" />
        ` : '';

        const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="displace" color-interpolation-filters="sRGB">
                    <feImage x="0" y="0" height="${height}" width="${width}" href="${displacementMapUrl}" result="displacementMap" />
                    
                    <feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="2" result="noise">
                        ${animationTags}
                    </feTurbulence>
                    <feDisplacementMap in="displacementMap" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="distortedMap"/>

                    <feDisplacementMap in="SourceGraphic" in2="distortedMap" scale="${s + ca}" xChannelSelector="R" yChannelSelector="G" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR" />
                    
                    <feDisplacementMap in="SourceGraphic" in2="distortedMap" scale="${s}" xChannelSelector="R" yChannelSelector="G" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG" />
                    
                    <feDisplacementMap in="SourceGraphic" in2="distortedMap" scale="${s - ca}" xChannelSelector="R" yChannelSelector="G" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB" />
                    
                    <feBlend in="displacedR" in2="displacedG" mode="screen"/>
                    <feBlend in2="displacedB" mode="screen"/>
                </filter>
            </defs>
        </svg>`;
        return "data:image/svg+xml;utf8," + encodeURIComponent(svg) + "#displace";
    }
};

class GlassElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Asumimos siempre soporte para Chrome/Edge en esta demo
        GlassElement._svgFilterSupport = true;
    }

    static get observedAttributes() {
        return ['width', 'height', 'radius', 'depth', 'blur', 'strength', 'chromatic-aberration', 'auto-size', 'animated'];
    }

    connectedCallback() {
        this.render();
        setTimeout(() => this.updateStyles(), 50);
        
        if (this.hasAttribute('auto-size')) {
            window.addEventListener('resize', () => this.updateStyles());
            const observer = new MutationObserver(() => this.updateStyles());
            observer.observe(this, { childList: true, subtree: true, characterData: true });
        }
    }

    get width() { return parseInt(this.getAttribute('width')) || this.offsetWidth || 200; }
    get height() { return parseInt(this.getAttribute('height')) || this.offsetHeight || 100; }
    get radius() { return parseInt(this.getAttribute('radius')) || 20; }
    get depth() { return parseInt(this.getAttribute('depth')) || 20; }
    get blur() { return parseInt(this.getAttribute('blur')) || 5; }
    get strength() { return parseInt(this.getAttribute('strength')) || 20; }
    get chromaticAberration() { return parseInt(this.getAttribute('chromatic-aberration')) || 10; }
    get animated() { return this.hasAttribute('animated'); }

    updateStyles() {
        const glassBox = this.shadowRoot.querySelector('.glass-box');
        if (!glassBox) return;

        let w = this.hasAttribute('auto-size') ? glassBox.offsetWidth : this.width;
        let h = this.hasAttribute('auto-size') ? glassBox.offsetHeight : this.height;
        if (w <= 0) w = 200; 
        if (h <= 0) h = 100;

        glassBox.style.borderRadius = `${this.radius}px`;

        const filterUrl = DisplacementUtils.getDisplacementFilter({
            width: w,
            height: h,
            radius: this.radius,
            depth: this.depth,
            strength: this.strength,
            chromaticAberration: this.chromaticAberration,
            animated: this.animated
        });
        
        // Aumentamos el contraste y la saturación del fondo para que el efecto destaque más
        glassBox.style.backdropFilter = `url('${filterUrl}') blur(${this.blur}px) saturate(200%) contrast(120%)`;
        glassBox.style.webkitBackdropFilter = `url('${filterUrl}') blur(${this.blur}px) saturate(200%) contrast(120%)`;
    }

    render() {
        const isAutoSize = this.hasAttribute('auto-size');
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: ${isAutoSize ? 'inline-block' : 'block'};
                    position: relative;
                }
                .glass-box {
                    position: relative;
                    width: ${isAutoSize ? 'auto' : '100%'};
                    height: ${isAutoSize ? 'auto' : '100%'};
                    min-width: 50px; 
                    min-height: 50px;
                    
                    /* BORDES MUY VISIBLES */
                    background: rgba(255, 255, 255, 0.02);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top: 2px solid rgba(255, 255, 255, 0.8);
                    border-left: 2px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 
                        0 25px 45px rgba(0,0,0,0.5), 
                        inset 0 0 30px rgba(255,255,255,0.1);

                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    cursor: pointer;
                }
                .glass-box:hover {
                    transform: scale(1.02);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.9);
                    box-shadow: 0 0 20px rgba(0, 195, 255, 0.4), inset 0 0 20px rgba(0, 195, 255, 0.2);
                }
                .glass-box:active {
                    transform: scale(0.95);
                }
                .content { position: relative; z-index: 2; height: 100%; }
            </style>
            <div class="glass-box">
                <div class="content"><slot></slot></div>
            </div>
        `;
    }
}
customElements.define('glass-element', GlassElement);