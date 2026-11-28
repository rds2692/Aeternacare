import { animate } from 'animejs';

/**
 * Animaciones de entrada con Anime.js.
 *
 * El contenido sigue siendo estático en el HTML. Anime.js solo controla la
 * aparición, por lo que la página sigue siendo legible si JavaScript no carga.
 */
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let iniciado = false;

const leerRetardo = (elemento: HTMLElement): number => {
  const valor = getComputedStyle(elemento).getPropertyValue('--retardo').trim();
  return Number.parseFloat(valor) || 0;
};

const dejarVisible = (elemento: HTMLElement): void => {
  elemento.classList.add('es-visible');
  elemento.style.removeProperty('transform');
  elemento.style.removeProperty('opacity');
  elemento.style.removeProperty('will-change');
};

const animarEntrada = (elemento: HTMLElement): void => {
  const esHeroTitulo = elemento.matches('.hero__h1');
  const esEncabezado = elemento.matches('.encabezado, .cabecera-pagina__inner');
  const esTarjeta = elemento.matches('.tarjeta');
  const esPaso = elemento.matches('.paso');
  const esFoto = elemento.matches('figure.foto');
  const esTarjetaHero = elemento.matches('.hero__tarjeta');

  let distancia = 26;
  let escala: [number, number] | undefined;
  let duracion = 760;

  if (esHeroTitulo) {
    distancia = 34;
    duracion = 940;
  } else if (esEncabezado) {
    distancia = 14;
    duracion = 820;
  } else if (esTarjeta) {
    distancia = 32;
    escala = [0.97, 1];
    duracion = 820;
  } else if (esPaso) {
    distancia = 22;
    duracion = 760;
  } else if (esFoto) {
    distancia = elemento.matches('.hero__figura') ? 42 : 24;
    escala = elemento.matches('.hero__figura') ? [1.045, 1] : [1.025, 1];
    duracion = 1080;
  } else if (esTarjetaHero) {
    distancia = 18;
    escala = [0.94, 1];
    duracion = 720;
  }

  elemento.style.willChange = 'transform, opacity';

  animate(elemento, {
    opacity: [0, 1],
    y: [distancia, 0],
    ...(escala ? { scale: escala } : {}),
    duration: duracion,
    delay: leerRetardo(elemento),
    ease: esFoto ? 'outQuart' : 'outExpo',
    onComplete: () => dejarVisible(elemento),
  });
};

const animarFondoHero = (): void => {
  const fondo = document.querySelector<HTMLElement>('.hero__fondo');
  if (!fondo) return;

  animate(fondo, {
    x: [-7, 7],
    y: [4, -4],
    scale: [1, 1.045],
    opacity: [0.82, 1],
    duration: 9000,
    loop: true,
    alternate: true,
    ease: 'inOutSine',
  });
};

const animarAcordeon = (detalles: HTMLDetailsElement): void => {
  if (!detalles.open || movimientoReducido) return;

  const contenido = Array.from(detalles.children).filter(
    (hijo): hijo is HTMLElement => hijo instanceof HTMLElement && hijo.tagName !== 'SUMMARY',
  );
  if (contenido.length === 0) return;

  animate(contenido, {
    opacity: [0, 1],
    y: [-7, 0],
    duration: 280,
    delay: (_elemento, indice) => (indice ?? 0) * 38,
    ease: 'outCubic',
  });
};

const iniciarAcordeones = (): void => {
  document.querySelectorAll<HTMLDetailsElement>('details').forEach((detalles) => {
    detalles.addEventListener('toggle', () => animarAcordeon(detalles));
  });
};

export function iniciarReveals(): void {
  if (iniciado) return;
  iniciado = true;
  document.documentElement.classList.add('animaciones-iniciadas');

  const elementos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  if (movimientoReducido || !('IntersectionObserver' in window)) {
    elementos.forEach(dejarVisible);
    return;
  }

  const hero = document.querySelector<HTMLElement>('.hero');
  const elementosHero = new Set(
    hero ? Array.from(hero.querySelectorAll<HTMLElement>('[data-reveal]')) : [],
  );

  elementosHero.forEach(animarEntrada);
  animarFondoHero();

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        observador.unobserve(entrada.target);
        animarEntrada(entrada.target as HTMLElement);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
  );

  elementos
    .filter((elemento) => !elementosHero.has(elemento))
    .forEach((elemento) => observador.observe(elemento));

  iniciarAcordeones();
}

