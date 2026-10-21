/** Contenido de las secciones de la página de inicio. */

export const hero = {
  h1: 'Cuidado profesional para quienes más quieres.',
  bajada:
    'Cuidados para adultos mayores a domicilio en Santiago, con atención profesional, cercana y adaptada a las necesidades de cada familia.',
  cta: 'Solicitar orientación',
  ctaSecundario: 'Hablar por WhatsApp',
  nota: 'Hablemos sobre las necesidades de tu familiar.',
  indicadores: ['Atención personalizada', 'En la comodidad del hogar', 'Trato humano'],
  tarjetaFlotante: 'Cuidado cercano y personalizado',
};

export const filosofia = {
  titulo: 'El cuidado comienza escuchando',
  bajada:
    'Porque no existen dos familias iguales, tampoco debería existir un único modelo de cuidado.',
  tarjetas: [
    {
      icono: 'acompanamiento',
      titulo: 'Acompañamiento',
      texto:
        'Apoyo cotidiano y compañía para que cada persona pueda sentirse segura, acompañada y respetada en su propio hogar.',
    },
    {
      icono: 'personalizado',
      titulo: 'Cuidado personalizado',
      texto:
        'Una atención adaptada a las necesidades, rutinas y nivel de autonomía de cada persona.',
    },
    {
      icono: 'familia',
      titulo: 'Tranquilidad para la familia',
      texto:
        'Una comunicación cercana para que puedas sentir que tu familiar está acompañado y cuidado.',
    },
  ],
};

export const servicios = {
  titulo: 'Servicios de cuidado',
  bajada:
    'Nuestro equipo está formado por TENS y enfermeras. Definimos contigo el tipo de apoyo que corresponde a cada caso, sin prometer más de lo que el cuidado permite.',
  tarjetas: [
    {
      icono: 'acompanamiento',
      titulo: 'Cuidado y acompañamiento',
      texto:
        'Apoyo cercano para las actividades y rutinas del día a día, siempre respetando la autonomía y dignidad de cada persona.',
    },
    {
      icono: 'rutina',
      titulo: 'Asistencia en actividades diarias',
      texto: 'Acompañamiento y apoyo en las necesidades cotidianas dentro del hogar.',
    },
    {
      icono: 'bienestar',
      titulo: 'Supervisión y bienestar',
      texto:
        'Una presencia responsable orientada a entregar seguridad, comodidad y tranquilidad.',
    },
    {
      icono: 'personalizado',
      titulo: 'Cuidados personalizados',
      texto: 'Adaptamos la atención a las necesidades particulares de cada persona y familia.',
    },
  ],
  /** Se declara con transparencia para no prometer de más. */
  alcance: {
    titulo: 'Para que sepas exactamente qué contratas',
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
      descripcion: 'Apoyo técnico y acompañamiento según la necesidad de cada persona.',
      servicios: [
        { nombre: 'Turno TENS de 8 horas', precio: 'Desde $60.000' },
        { nombre: 'Turno TENS de 24 horas', precio: 'Desde $160.000' },
      ],
    },
    {
      titulo: 'Cuidadora',
      descripcion: 'Acompañamiento y apoyo en las actividades diarias del hogar.',
      servicios: [
        { nombre: 'Turno diurno', precio: 'Consultar' },
        { nombre: 'Turno nocturno', precio: 'Consultar' },
        { nombre: 'Turno 24 horas / 24-7', precio: 'Consultar' },
      ],
    },
    {
      titulo: 'Técnicos kinesiólogos',
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
  titulo: 'Para tu familiar. Para tu tranquilidad.',
  texto:
    'Sabemos que elegir a alguien para cuidar a un familiar no es una decisión cualquiera. Por eso ponemos especial atención en la confianza, el respeto y la calidad humana de cada cuidado.',
  pilares: [
    { titulo: 'Respeto', texto: 'Cada persona merece ser tratada con dignidad.' },
    { titulo: 'Confianza', texto: 'Comunicación clara y cercana con la familia.' },
    {
      titulo: 'Compromiso',
      texto: 'Cuidamos cada detalle porque sabemos lo que está en juego.',
    },
  ],
};

export const proceso = {
  titulo: 'Así comienza el cuidado',
  bajada: 'Cuatro pasos simples, sin formularios interminables ni respuestas automáticas.',
  pasos: [
    {
      titulo: 'Cuéntanos tu situación',
      texto:
        'Nos explicas qué necesita tu familiar, su rutina y el tipo de apoyo que estás buscando.',
    },
    {
      titulo: 'Conocemos sus necesidades',
      texto: 'Conversamos contigo para comprender mejor sus necesidades y las de tu familia.',
    },
    {
      titulo: 'Definimos la alternativa adecuada',
      texto:
        'Te orientamos sobre la modalidad de cuidado que mejor se adapta a cada situación.',
    },
    {
      titulo: 'Comenzamos el acompañamiento',
      texto:
        'Coordinamos el servicio y mantenemos una comunicación cercana durante el proceso.',
    },
  ],
};

export const cierre = {
  titulo: 'Encuentra el cuidado adecuado para tu familia',
  texto:
    'Cuéntanos qué necesita tu familiar y te orientaremos sobre la modalidad de atención más adecuada.',
  cta: 'Solicitar orientación',
};

export const ctaFinal = {
  titulo: '¿Necesitas apoyo para cuidar a alguien que quieres?',
  texto: 'Estamos aquí para orientarte.',
  cta: 'Conversar con Aeterna Care',
};
