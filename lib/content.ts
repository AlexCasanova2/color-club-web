export const gameSteps = [
  {
    number: "01",
    title: "Junta a tu gente.",
    text: "Crea un club privado e invita hasta completar un grupo de 12 personas.",
  },
  {
    number: "02",
    title: "Recibid un color.",
    text: "Elige un color común o deja que la app asigne uno compartido o distinto para cada participante.",
  },
  {
    number: "03",
    title: "Sal a encontrarlo.",
    text: "Fotografía lo que veas y completa un collage de entre 2 y 12 imágenes antes de que termine el tiempo.",
  },
  {
    number: "04",
    title: "Votad sin pistas.",
    text: "Con tres o más collages válidos comienza la votación: un voto por participante y nunca por el collage propio.",
  },
] as const;

export const faqItems = [
  {
    question: "¿Cómo creo un club o me uno a uno?",
    answer:
      "Desde la app puedes crear un club privado o introducir la invitación que te comparta alguien del grupo.",
  },
  {
    question: "¿Cuántas personas caben en un club?",
    answer: "Hasta 12 miembros activos, incluida la persona que lo creó.",
  },
  {
    question: "¿Qué pasa si no termino el collage?",
    answer:
      "Cuando vence el tiempo, un collage incompleto queda descalificado y no participa en la votación.",
  },
  {
    question: "¿Puedo editarlo después de enviarlo?",
    answer:
      "No. El envío es definitivo, así que la app te pide completar todas las fotos antes de confirmarlo.",
  },
  {
    question: "¿Cuándo puedo ver los collages de los demás?",
    answer:
      "Se mantienen ocultos durante la captura y se revelan cuando el reto entra en votación. Tu propio collage enviado sí queda visible para ti.",
  },
  {
    question: "¿Cómo funciona la votación?",
    answer:
      "Si hay al menos tres collages válidos, cada participante que entregó el suyo puede emitir un voto y no puede votarse a sí mismo. Con uno o dos collages válidos, el reto se resuelve sin votación.",
  },
  {
    question: "¿Por qué no participo en un reto del club?",
    answer:
      "Los participantes quedan fijados al crear el reto. Si entraste en el club después, podrás jugar a partir del siguiente.",
  },
  {
    question: "¿Cómo recupero mi contraseña?",
    answer:
      "En la pantalla de acceso de la app puedes solicitar un correo de recuperación. Si el cambio no se completa, utiliza el canal de soporte configurado en esta página.",
  },
  {
    question: "¿Cómo elimino mi cuenta?",
    answer:
      "La opción está en Cuenta, dentro de la app. La eliminación es una acción protegida y requiere confirmación.",
  },
  {
    question: "¿Por qué no me llegan las notificaciones?",
    answer:
      "Comprueba los permisos del sistema y las preferencias de la app. Las notificaciones push también requieren conexión y pueden verse afectadas por el ahorro de batería.",
  },
] as const;
