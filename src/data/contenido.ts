/** Contenido de las secciones de la página de inicio. */

export const hero = {
  h1: 'Cuidado profesional para quienes más quieres.',
  bajada:
    'Acompañamos a adultos mayores en su casa con cuidadoras, TENS y enfermería según lo que necesite cada familia. Atendemos en Santiago y coordinamos horarios, tareas y comunicación antes de comenzar.',
  cta: 'Solicitar orientación',
  ctaSecundario: 'Hablar por WhatsApp',
  nota: 'Hablemos sobre las necesidades de tu familiar.',
  indicadores: ['Atención según la necesidad', 'En la comodidad del hogar', 'Trato respetuoso'],
  tarjetaFlotante: 'Cuidado coordinado en casa',
};

export const filosofia = {
  titulo: 'El cuidado comienza escuchando',
  bajada:
    'Antes de recomendar un servicio, conversamos contigo sobre la rutina, la autonomía y las horas de apoyo que necesita tu familiar.',
  tarjetas: [
    {
      icono: 'acompanamiento',
      titulo: 'Acompañamiento',
      texto:
        'Acompañamos durante el día, apoyamos la rutina y respetamos la forma de vivir de cada persona.',
    },
    {
      icono: 'personalizado',
      titulo: 'Apoyo según la rutina',
      texto:
        'Definimos las tareas, el horario y el perfil de apoyo antes de comenzar.',
    },
    {
      icono: 'familia',
      titulo: 'Tranquilidad para la familia',
      texto:
        'La familia sabe qué incluye el servicio, quién coordina y cómo comunicarse con nosotros.',
    },
  ],
};

export const servicios = {
  titulo: 'Servicios de cuidado',
  bajada:
    'Cuéntanos qué necesita tu familiar y revisaremos contigo qué perfil profesional, tareas y horario corresponden a cada caso.',
  tarjetas: [
    {
      icono: 'acompanamiento',
      titulo: 'Cuidado y acompañamiento',
      href: '/servicios/cuidadoras-adulto-mayor/',
      texto:
        'Apoyo cercano para las actividades y rutinas del día a día, siempre respetando la autonomía y dignidad de cada persona.',
    },
    {
      icono: 'rutina',
      titulo: 'Asistencia en actividades diarias',
      href: '/servicios/cuidadoras-adulto-mayor/',
      texto: 'Acompañamiento y apoyo en las necesidades cotidianas dentro del hogar.',
    },
    {
      icono: 'bienestar',
      titulo: 'Supervisión y bienestar',
      href: '/servicios/tens-a-domicilio/',
      texto:
        'Apoyo en rutinas, observación del estado general y comunicación con la familia, según lo acordado.',
    },
    {
      icono: 'personalizado',
      titulo: 'Apoyo según la situación',
      href: '/servicios/',
      texto: 'Revisamos la situación antes de definir el servicio y confirmamos el alcance por escrito.',
    },
  ],
  /** Se declara con transparencia para no prometer de más. */
  alcance: {
    titulo: 'Qué incluye el servicio',
    texto:
      'Cada familia recibe por escrito el detalle del servicio: tareas incluidas, horarios, perfil profesional asignado y forma de comunicación con nosotros. Si una necesidad requiere un procedimiento clínico o administración de medicamentos, lo evaluamos caso a caso con el equipo profesional correspondiente.',
  },
};

/** Información comercial entregada por la clienta en las capturas de referencia. */
export const catalogoServicios = {
  titulo: 'Servicios y valores referenciales',
  bajada:
    'Conoce algunas de las atenciones disponibles y sus valores desde. La cotización final depende del tipo de atención, horario, comuna y necesidades de cada caso.',
  grupos: [
    {
      titulo: 'Enfermería',
      slug: 'enfermeria-a-domicilio',
      descripcion: 'Atenciones y procedimientos de enfermería a domicilio.',
      servicios: [
        { nombre: 'Control de signos vitales', precio: 'Desde $15.000' },
        { nombre: 'Curaciones simples y avanzadas', precio: 'Desde $22.000' },
        { nombre: 'Hidratación EV domiciliaria', precio: 'Desde $45.000' },
        { nombre: 'Visita médica general', precio: 'Desde $90.000' },
        { nombre: 'Teleconsulta médica', precio: 'Desde $50.000' },
        { nombre: 'Cuidados paliativos avanzados', precio: 'Desde $70.000' },
      ],
    },
    {
      titulo: 'TENS',
      slug: 'tens-a-domicilio',
      descripcion: 'Apoyo técnico y acompañamiento según la necesidad de cada persona.',
      servicios: [
        { nombre: 'Turno TENS de 8 horas', precio: 'Desde $60.000' },
        { nombre: 'Turno TENS de 24 horas', precio: 'Desde $160.000' },
      ],
    },
    {
      titulo: 'Cuidadora',
      slug: 'cuidadoras-adulto-mayor',
      descripcion: 'Acompañamiento y apoyo en las actividades diarias del hogar.',
      servicios: [
        { nombre: 'Turno diurno', precio: 'Consultar' },
        { nombre: 'Turno nocturno', precio: 'Consultar' },
        { nombre: 'Turno 24 horas / 24-7', precio: 'Consultar' },
      ],
    },
    {
      titulo: 'Técnicos kinesiólogos',
      slug: 'tecnicos-kinesiologos-a-domicilio',
      descripcion: 'Apoyo asociado a movilidad y recuperación, según evaluación del caso.',
      servicios: [{ nombre: 'Atención domiciliaria', precio: 'Consultar' }],
    },
  ],
  nota:
    'Los valores son referenciales y pueden variar según la comuna, horario, complejidad y disponibilidad. Confirma el valor final antes de agendar.',
};

export const cobertura = {
  titulo: 'Modalidades y comunas de atención',
  bajada: 'Coordinamos el apoyo según el horario que tu familiar necesita y la comuna donde se encuentra.',
  turnos: ['Diurno', 'Nocturno', '24 horas (día y noche) · 24/7'],
  profesionales: ['Enfermeras', 'TENS', 'Cuidadoras', 'Técnicos kinesiólogos'],
};

export const urgenciaMensaje =
  'Hola, necesito orientación urgente para una atención domiciliaria. Mi comuna es: ';

export const confianza = {
  titulo: 'Cómo trabajamos con tu familia',
  texto:
    'Antes de comenzar, acordamos las tareas, el horario, el perfil de apoyo y la forma de comunicación con la familia.',
  pilares: [
    { titulo: 'Respeto', texto: 'Cada persona merece ser tratada con dignidad.' },
    { titulo: 'Información clara', texto: 'La familia conoce el alcance del servicio antes de agendar.' },
    {
      titulo: 'Compromiso',
      texto: 'Cuidamos cada detalle porque sabemos lo que está en juego.',
    },
  ],
};

export const proceso = {
  titulo: 'Así comienza el cuidado',
  bajada: 'Primero conocemos la situación. Después confirmamos qué apoyo se puede coordinar.',
  pasos: [
    {
      titulo: 'Cuéntanos tu situación',
      texto:
        'Nos explicas qué necesita tu familiar, su rutina y el tipo de apoyo que estás buscando.',
    },
    {
      titulo: 'Conocemos sus necesidades',
      texto: 'Revisamos la rutina, el nivel de autonomía, los horarios y cualquier indicación relevante.',
    },
    {
      titulo: 'Definimos la alternativa adecuada',
      texto:
        'Te explicamos qué perfil, tareas y horario corresponden a la situación que nos describes.',
    },
    {
      titulo: 'Comenzamos el acompañamiento',
      texto:
        'Confirmamos disponibilidad, valor y forma de comunicación antes de agendar.',
    },
  ],
};

export const cierre = {
  titulo: 'Encuentra el cuidado adecuado para tu familia',
  texto:
    'Cuéntanos qué necesita tu familiar. Revisaremos contigo el tipo de apoyo, horario y comuna antes de proponerte un servicio.',
  cta: 'Solicitar orientación',
};

export const ctaFinal = {
  titulo: '¿Necesitas apoyo para cuidar a un familiar?',
  texto: 'Cuéntanos la situación y revisemos juntos qué se puede coordinar.',
  cta: 'Conversar con Aeterna Care',
};
