import { site } from './site';

export const paginasComunas = site.areaServida.map((nombre) => ({
  nombre,
  slug: nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
}));

export const paginasServicios = [
  {
    slug: 'cuidadoras-adulto-mayor',
    nombre: 'Cuidadoras de adultos mayores',
    titulo: 'Cuidadoras de adultos mayores a domicilio',
    descripcion:
      'Acompañamiento y apoyo cotidiano para adultos mayores, con una atención cercana y adaptada a la rutina de cada familia.',
    incluye: [
      'Acompañamiento y compañía en el hogar',
      'Apoyo en actividades de la vida diaria',
      'Apoyo en alimentación, higiene y movilización según el acuerdo de servicio',
      'Supervisión del bienestar y comunicación con la familia',
    ],
    valor: 'Turnos diurnos, nocturnos y de 24 horas: consultar disponibilidad y valor.',
  },
  {
    slug: 'tens-a-domicilio',
    nombre: 'TENS a domicilio',
    titulo: 'TENS a domicilio en Santiago',
    descripcion:
      'Apoyo técnico en el hogar para personas que necesitan acompañamiento y cuidados según su situación particular.',
    incluye: [
      'Turno TENS de 8 horas desde $60.000',
      'Turno TENS de 24 horas desde $160.000',
      'Apoyo en rutinas y cuidados acordados',
      'Coordinación con la familia y orientación antes de comenzar',
    ],
    valor: 'Los valores son referenciales y se confirman antes de agendar.',
  },
  {
    slug: 'enfermeria-a-domicilio',
    nombre: 'Enfermería a domicilio',
    titulo: 'Enfermería a domicilio en Santiago',
    descripcion:
      'Atenciones de enfermería y procedimientos domiciliarios coordinados según las necesidades de cada persona.',
    incluye: [
      'Control de signos vitales desde $15.000',
      'Curaciones simples y avanzadas desde $22.000',
      'Hidratación EV domiciliaria desde $45.000',
      'Cuidados paliativos avanzados desde $70.000',
    ],
    valor: 'Cada atención se evalúa previamente para confirmar alcance, disponibilidad y valor final.',
  },
  {
    slug: 'tecnicos-kinesiologos-a-domicilio',
    nombre: 'Técnicos kinesiólogos',
    titulo: 'Técnicos kinesiólogos a domicilio',
    descripcion:
      'Apoyo domiciliario asociado a movilidad y recuperación, coordinado de acuerdo con la situación de cada paciente.',
    incluye: [
      'Atención domiciliaria según evaluación del caso',
      'Apoyo en movilidad y recuperación',
      'Coordinación con la familia sobre horarios y necesidades',
      'Orientación previa antes de agendar',
    ],
    valor: 'Valor y disponibilidad: consultar por comuna y horario.',
  },
];

export function paginaComuna(nombre: string) {
  return paginasComunas.find((pagina) => pagina.nombre === nombre);
}
