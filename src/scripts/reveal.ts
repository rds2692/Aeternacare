/**
 * Apariciones al hacer scroll.
 *
 * Es deliberadamente sobrio: opacidad + desplazamiento corto, con retardo
 * escalonado. Si la persona pidió reducir el movimiento, no se anima nada y el
 * CSS ya deja todo visible.
 */

/**
 * Las animaciones de entrada del sitio son transiciones CSS disparadas por
 * IntersectionObserver: mismo resultado percibido que una librería de
 * animación, sin enviar JavaScript adicional al navegador.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function iniciarReveals(): void {
  const elementos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (elementos.length === 0) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    elementos.forEach((elemento) => elemento.classList.add('es-visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('es-visible');
          observador.unobserve(entrada.target);
        }
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );

  elementos.forEach((elemento) => observador.observe(elemento));
}

