import type { PublicRoute } from "./site";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type LegalDocument = {
  route: PublicRoute;
  label: string;
  summary: string;
  sections: readonly LegalSection[];
};

export const legalPlaceholders = {
  owner: "[NOMBRE COMPLETO O DENOMINACIÓN SOCIAL]",
  taxId: "[NIF/CIF]",
  address: "[DOMICILIO LEGAL COMPLETO]",
  registry: "[DATOS REGISTRALES, SI PROCEDE]",
  legalEmail: "[EMAIL LEGAL]",
  privacyEmail: "[EMAIL DE PRIVACIDAD]",
  securityEmail: "[EMAIL DE SEGURIDAD]",
  supportChannel: "[URL O EMAIL DE SOPORTE]",
  hostingProvider: "[PROVEEDOR DE HOSTING WEB]",
} as const;

export const legalDocuments: Record<
  "/privacidad" | "/terminos" | "/aviso-legal" | "/cookies" | "/normas-comunidad" | "/contenido-y-fotos" | "/eliminar-cuenta",
  LegalDocument
> = {
  "/privacidad": {
    route: "/privacidad",
    label: "Política de privacidad",
    summary: "Explica qué datos trata Color Club, para qué los utiliza y cómo ejercer derechos.",
    sections: [
      {
        id: "responsable",
        title: "1. Responsable del tratamiento",
        paragraphs: [
          `Responsable: ${legalPlaceholders.owner}. NIF/CIF: ${legalPlaceholders.taxId}. Domicilio: ${legalPlaceholders.address}. Contacto de privacidad: ${legalPlaceholders.privacyEmail}.`,
          "Estos datos deben completarse y verificarse antes de aprobar el documento para producción.",
        ],
      },
      {
        id: "datos",
        title: "2. Datos que tratamos",
        bullets: [
          "Cuenta e identidad: UUID, email, nombre visible, username, avatar y credenciales gestionadas por el proveedor de autenticación.",
          "Datos sociales: código de amistad, amistades, invitaciones, pertenencia y rol dentro de clubs privados.",
          "Actividad de juego: retos, colores asignados, estado de participación, collages, fotografías, votos, resultados y ranking.",
          "Comunicaciones: mensajes de chat del club, notificaciones internas, preferencias y tokens de notificación push.",
          "Datos técnicos y de seguridad: timestamps, última actividad aproximada, eventos de autenticación, dispositivo y registros necesarios para prevenir abuso y diagnosticar fallos.",
          "Consultas de soporte, privacidad o seguridad y la información que la persona decida incluir en ellas.",
        ],
      },
      {
        id: "finalidades",
        title: "3. Finalidades y bases jurídicas",
        bullets: [
          "Crear y mantener la cuenta, ejecutar clubs, retos, collages, votaciones, rankings, chat y notificaciones: ejecución de los términos del servicio.",
          "Proteger cuentas, prevenir fraude, abuso y accesos no autorizados, y mantener la estabilidad: interés legítimo y cumplimiento de obligaciones legales.",
          "Atender soporte, privacidad, seguridad y reclamaciones: ejecución del servicio, interés legítimo y obligación legal según el caso.",
          "Enviar comunicaciones opcionales o utilizar analítica no esencial: consentimiento previo cuando resulte necesario. Actualmente la web pública no carga analítica no esencial por defecto.",
          "Conservar evidencias de actuaciones de moderación o seguridad: interés legítimo y, cuando corresponda, formulación, ejercicio o defensa de reclamaciones.",
        ],
      },
      {
        id: "visibilidad",
        title: "4. Quién puede ver cada contenido",
        bullets: [
          "Los clubs, miembros, retos y collages se diseñan para miembros activos del club correspondiente.",
          "Cada participante puede ver sus propias fotos durante la captura; las fotos ajenas se habilitan al llegar a la fase permitida de votación o resultados.",
          "Los collages se almacenan en almacenamiento privado. Los avatares utilizan almacenamiento público y deben tratarse como imágenes públicamente accesibles.",
          "La interfaz pública del perfil limita los campos mostrados. El email no forma parte de esa vista pública.",
          "El personal autorizado solo debe acceder a datos privados para soporte, seguridad o moderación y conforme a permisos de plataforma.",
        ],
      },
      {
        id: "destinatarios",
        title: "5. Proveedores y destinatarios",
        paragraphs: [
          "Utilizamos proveedores tecnológicos para autenticación, base de datos, almacenamiento, hosting, notificaciones y distribución de la app. Antes de aprobar esta política debe completarse el registro de encargados, ubicación del tratamiento y contratos aplicables.",
        ],
        bullets: [
          "Supabase: autenticación, base de datos y almacenamiento. [CONFIRMAR ENTIDAD CONTRATANTE, REGIÓN Y DPA].",
          "Expo/EAS y proveedores push de Apple o Google: entrega de notificaciones. [CONFIRMAR CONFIGURACIÓN Y RETENCIÓN].",
          `${legalPlaceholders.hostingProvider}: alojamiento de la web promocional.`,
          "Apple App Store y Google Play: distribución, descargas y datos que cada tienda trate como responsable independiente.",
          "Autoridades públicas, jueces o tribunales cuando exista obligación legal válida.",
        ],
      },
      {
        id: "transferencias",
        title: "6. Transferencias internacionales",
        paragraphs: [
          "Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo. Antes del lanzamiento deben documentarse los países, mecanismos aplicables —como decisiones de adecuación o cláusulas contractuales tipo— y medidas complementarias.",
        ],
      },
      {
        id: "conservacion",
        title: "7. Conservación",
        bullets: [
          "Los datos de cuenta se mantienen mientras la cuenta esté activa o sean necesarios para prestar el servicio.",
          "Fotos, mensajes, votos y actividad se conservan según la vida del club, del reto y las decisiones de eliminación aplicables.",
          "Tokens push se eliminan o sustituyen cuando dejan de ser válidos o la persona desactiva el servicio.",
          "Consultas, incidencias y evidencias pueden bloquearse durante los plazos legales necesarios para responsabilidades.",
          "Las copias de seguridad se eliminan mediante ciclos técnicos documentados. [APROBAR TABLA INTERNA DE PLAZOS ANTES DEL LANZAMIENTO].",
        ],
      },
      {
        id: "derechos",
        title: "8. Derechos",
        paragraphs: [
          `Puedes solicitar acceso, rectificación, supresión, oposición, limitación, portabilidad y retirada del consentimiento escribiendo a ${legalPlaceholders.privacyEmail}. Podemos pedir información razonable para verificar la identidad.`,
          "También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD) en aepd.es si consideras que el tratamiento no se ajusta a la normativa.",
        ],
      },
      {
        id: "menores",
        title: "9. Personas menores de edad",
        paragraphs: [
          "Color Club establece una edad mínima contractual de 16 años. No está dirigido a menores de esa edad y no deben crear una cuenta ni subir fotografías.",
          `Si detectas una cuenta de una persona menor de 16 años, contacta mediante ${legalPlaceholders.supportChannel}. Se revisará la situación y se adoptarán medidas proporcionadas.`,
        ],
      },
      {
        id: "seguridad",
        title: "10. Seguridad y cambios",
        paragraphs: [
          `Aplicamos medidas de acceso, separación de roles, almacenamiento privado y registro de acciones administrativas. Ningún sistema es infalible; las incidencias deben comunicarse a ${legalPlaceholders.securityEmail}.`,
          "Los cambios materiales de esta política se comunicarán por medios adecuados y se publicará una nueva fecha de entrada en vigor. Cuando una finalidad nueva requiera consentimiento, se solicitará antes de iniciar el tratamiento.",
        ],
      },
    ],
  },
  "/terminos": {
    route: "/terminos",
    label: "Términos de uso",
    summary: "Regula el acceso a la app, las reglas del juego y las responsabilidades sobre el contenido.",
    sections: [
      {
        id: "titular",
        title: "1. Titular y aceptación",
        paragraphs: [
          `Color Club es ofrecido por ${legalPlaceholders.owner}, con NIF/CIF ${legalPlaceholders.taxId} y domicilio en ${legalPlaceholders.address}. Contacto: ${legalPlaceholders.legalEmail}.`,
          "Al crear una cuenta o utilizar la app aceptas estos términos y las políticas enlazadas. Si no estás de acuerdo, no utilices el servicio.",
        ],
      },
      {
        id: "edad",
        title: "2. Edad y capacidad",
        paragraphs: [
          "Debes tener al menos 16 años y capacidad legal suficiente para aceptar estos términos. El servicio no está dirigido a menores de 16 años.",
          "No debes declarar una edad falsa ni facilitar el acceso a una persona que no cumpla el requisito.",
        ],
      },
      {
        id: "cuenta",
        title: "3. Cuenta y seguridad",
        bullets: [
          "Debes proporcionar datos correctos y mantener tus credenciales protegidas.",
          "Eres responsable de la actividad realizada desde tu cuenta salvo uso no autorizado que hayas comunicado sin demora.",
          "No puedes vender, ceder ni compartir una cuenta de forma que eluda controles de acceso.",
          "Podemos requerir verificación razonable ante señales de abuso, recuperación o ejercicio de derechos.",
        ],
      },
      {
        id: "servicio",
        title: "4. Cómo funciona el servicio",
        paragraphs: [
          "Color Club permite crear clubs privados, lanzar retos de color, componer collages, votar cuando existen suficientes entregas válidas y participar en rankings de temporada.",
          "Las reglas, límites, duraciones y fases visibles en la app forman parte del funcionamiento del servicio. Algunas opciones pueden variar conforme evoluciona el producto.",
        ],
      },
      {
        id: "contenido",
        title: "5. Tu contenido",
        paragraphs: [
          "Conservas los derechos que tengas sobre las fotografías, mensajes, avatar y demás contenido que aportes. Solo debes subir contenido propio o para el que tengas autorización suficiente.",
          "Concedes al responsable una licencia no exclusiva, limitada, mundial y durante el tiempo necesario para alojar, reproducir, adaptar técnicamente y mostrar ese contenido dentro de Color Club, exclusivamente para operar, proteger y mejorar el servicio. No autoriza vender tus fotografías ni utilizarlas en publicidad sin una base adicional.",
        ],
      },
      {
        id: "conducta",
        title: "6. Conducta prohibida",
        bullets: [
          "Subir contenido ilegal, sexualmente explícito, violento, discriminatorio, acosador o que vulnere derechos de terceros.",
          "Publicar datos personales de terceros sin autorización o imágenes captadas en contextos donde exista una expectativa razonable de privacidad.",
          "Suplantar identidades, manipular votos, automatizar interacciones, explotar vulnerabilidades o interferir con el servicio.",
          "Usar la app para perseguir, amenazar, extorsionar, enviar spam o coordinar actividades ilícitas.",
          "Intentar acceder a clubs, fotos, funciones administrativas o datos para los que no tengas permiso.",
        ],
      },
      {
        id: "moderacion",
        title: "7. Moderación y medidas",
        paragraphs: [
          "Podemos investigar contenido o conductas comunicadas por usuarios, detectadas por seguridad o requeridas por una autoridad. Las medidas pueden incluir limitar visibilidad, retirar contenido, advertir, suspender o cerrar cuentas, de forma proporcionada a la gravedad y reincidencia.",
          `Cuando exista un canal de impugnación aplicable, se indicará en la comunicación de la medida. Hasta que haya un sistema interno de reportes operativo, utiliza ${legalPlaceholders.supportChannel}.`,
        ],
      },
      {
        id: "propiedad",
        title: "8. Propiedad intelectual de Color Club",
        paragraphs: [
          "La marca, diseño, software, textos y elementos propios de Color Club pertenecen al responsable o a sus licenciantes. Estos términos no transfieren derechos sobre ellos.",
          "No puedes copiar, descompilar, redistribuir ni explotar el servicio fuera de lo permitido por la ley o una autorización escrita.",
        ],
      },
      {
        id: "disponibilidad",
        title: "9. Disponibilidad, cambios y tiendas",
        paragraphs: [
          "El servicio puede experimentar mantenimiento, errores o interrupciones. Se intentará comunicar cambios relevantes, pero no se garantiza disponibilidad ininterrumpida.",
          "La descarga mediante Apple o Google también queda sujeta a los términos de la tienda correspondiente. Las tiendas no son responsables de la prestación ordinaria de Color Club salvo lo exigido por sus condiciones o la ley.",
        ],
      },
      {
        id: "finalizacion",
        title: "10. Baja, suspensión y responsabilidad",
        paragraphs: [
          "Puedes solicitar la eliminación desde la app. Podemos suspender o terminar el acceso por incumplimiento, riesgo de seguridad, obligación legal o cierre del servicio.",
          "Nada en estos términos limita derechos irrenunciables de consumidores ni excluye responsabilidad que legalmente no pueda excluirse. [REVISAR Y APROBAR RÉGIMEN DE RESPONSABILIDAD SEGÚN MODELO COMERCIAL].",
        ],
      },
      {
        id: "ley",
        title: "11. Ley aplicable y cambios",
        paragraphs: [
          "Se aplicará la legislación española y europea que corresponda, sin perjudicar los derechos imperativos del consumidor de su país de residencia. [DEFINIR MECANISMO Y FUERO CON ASESORÍA LEGAL].",
          "Los cambios sustanciales se comunicarán con antelación razonable cuando resulte exigible. El uso continuado después de su entrada en vigor implicará aceptación solo en la medida permitida por la ley.",
        ],
      },
    ],
  },
  "/aviso-legal": {
    route: "/aviso-legal",
    label: "Aviso legal",
    summary: "Identifica al titular de Color Club y regula el acceso a este sitio web.",
    sections: [
      {
        id: "identificacion",
        title: "1. Identificación del prestador",
        bullets: [
          `Titular: ${legalPlaceholders.owner}.`,
          `NIF/CIF: ${legalPlaceholders.taxId}.`,
          `Domicilio: ${legalPlaceholders.address}.`,
          `Registro: ${legalPlaceholders.registry}.`,
          `Contacto directo y efectivo: ${legalPlaceholders.legalEmail}.`,
          "Actividad y autorizaciones administrativas: [INDICAR SI PROCEDE].",
        ],
      },
      {
        id: "objeto",
        title: "2. Objeto del sitio",
        paragraphs: [
          "Este sitio promociona y explica la app Color Club, proporciona soporte y publica información legal. La web pública no permite crear clubs, participar en retos, subir fotografías ni consultar actividad personal.",
        ],
      },
      {
        id: "acceso",
        title: "3. Acceso y uso",
        paragraphs: [
          "El acceso a la parte pública es gratuito, salvo el coste de conexión de cada usuario. Debes utilizar el sitio de forma lícita y no intentar dañar, saturar o acceder a zonas restringidas.",
          "El área `/internal-admin/*` es exclusiva del equipo autorizado y no forma parte del servicio público.",
        ],
      },
      {
        id: "propiedad",
        title: "4. Propiedad intelectual e industrial",
        paragraphs: [
          "Los textos, marca, diseño, software, iconos y activos propios están protegidos por la normativa aplicable. No se concede ninguna licencia salvo la necesaria para navegar y utilizar el sitio conforme a su finalidad.",
          "Las marcas y contenidos de terceros pertenecen a sus respectivos titulares.",
        ],
      },
      {
        id: "responsabilidad",
        title: "5. Disponibilidad, exactitud y enlaces",
        paragraphs: [
          "Se procura mantener la información correcta y disponible, pero puede haber errores, interrupciones o contenido pendiente de actualización. Los estados de descarga dependen de enlaces oficiales configurados.",
          "Los enlaces externos llevan a servicios gestionados por terceros. El titular no controla sus contenidos ni tratamientos de datos, sin perjuicio de las obligaciones legales aplicables.",
        ],
      },
      {
        id: "ley",
        title: "6. Legislación y contacto",
        paragraphs: [
          `Para cuestiones sobre este sitio utiliza ${legalPlaceholders.legalEmail}. Se aplicará la normativa española y europea correspondiente, respetando la protección imperativa de consumidores.`,
        ],
      },
    ],
  },
  "/cookies": {
    route: "/cookies",
    label: "Política de cookies",
    summary: "Detalla el uso actual de almacenamiento técnico y el criterio para futuras cookies opcionales.",
    sections: [
      {
        id: "situacion-actual",
        title: "1. Situación actual",
        paragraphs: [
          "La web pública de Color Club no instala por defecto cookies de analítica, publicidad ni perfilado. No se carga un proveedor de analítica no esencial.",
          "El área privada de administración utiliza almacenamiento técnico de Supabase para mantener la sesión del personal autorizado. Estas cookies son necesarias para prestar el acceso solicitado y proteger la sesión.",
        ],
      },
      {
        id: "que-son",
        title: "2. Qué son las cookies",
        paragraphs: [
          "Las cookies y tecnologías similares almacenan o recuperan información en el dispositivo. Pueden ser propias o de terceros, de sesión o persistentes, y responder a finalidades técnicas, de preferencias, medición o publicidad.",
        ],
      },
      {
        id: "inventario",
        title: "3. Inventario técnico",
        bullets: [
          "Sesión de administración Supabase: autenticar al equipo, renovar la sesión y prevenir accesos no autorizados. Duración: la configurada por el proveedor y la sesión. Ámbito: solo zona administrativa.",
          "Preferencias estrictamente necesarias que puedan añadirse en el futuro: recordar una elección solicitada por el usuario. [DOCUMENTAR NOMBRE, PROVEEDOR Y DURACIÓN ANTES DE ACTIVAR].",
        ],
      },
      {
        id: "consentimiento",
        title: "4. Consentimiento",
        paragraphs: [
          "Las cookies estrictamente necesarias para transmitir comunicaciones o prestar un servicio expresamente solicitado pueden estar exentas de consentimiento, aunque se informa de ellas por transparencia.",
          "Si se incorpora analítica, publicidad u otra tecnología no esencial, no se cargará antes de obtener el consentimiento cuando sea necesario. Rechazar deberá ser tan sencillo como aceptar y la web seguirá funcionando sin esas tecnologías.",
        ],
      },
      {
        id: "gestion",
        title: "5. Cómo gestionarlas",
        paragraphs: [
          "Puedes borrar o bloquear cookies desde el navegador. Bloquear cookies técnicas del panel impedirá iniciar o mantener la sesión administrativa, pero no debería afectar a la navegación pública.",
          `Para consultas utiliza ${legalPlaceholders.privacyEmail}. Cualquier cambio en el inventario se reflejará aquí antes o al activar la tecnología correspondiente.`,
        ],
      },
    ],
  },
  "/normas-comunidad": {
    route: "/normas-comunidad",
    label: "Normas de la comunidad",
    summary: "Establece las reglas de respeto, seguridad y moderación para clubs, retos y chat.",
    sections: [
      {
        id: "principios",
        title: "1. Principios",
        bullets: [
          "Participa con respeto y recuerda que detrás de cada collage o mensaje hay una persona.",
          "Comparte solo contenido que puedas publicar y que sea apropiado para el grupo.",
          "Respeta la privacidad del club: no redistribuyas fotos o mensajes ajenos sin permiso.",
          "No manipules votos, invitaciones, rankings ni mecanismos de seguridad.",
        ],
      },
      {
        id: "prohibido",
        title: "2. Contenido y conducta prohibidos",
        bullets: [
          "Acoso, amenazas, humillación, odio o discriminación por características personales.",
          "Contenido sexual explícito, explotación de menores, violencia extrema o promoción de autolesiones.",
          "Datos personales de terceros, doxxing, vigilancia o fotografías tomadas donde exista expectativa de privacidad.",
          "Suplantación, fraude, spam, malware, enlaces engañosos o instrucciones para cometer delitos.",
          "Contenido que infrinja derechos de autor, imagen, marca u otros derechos de terceros.",
          "Uso automatizado, trampas, compra de votos o explotación de vulnerabilidades.",
        ],
      },
      {
        id: "fotos",
        title: "3. Fotografías de personas y espacios",
        paragraphs: [
          "Obtén permiso antes de subir imágenes donde una persona sea identificable, especialmente si se trata de menores. No fotografíes interiores privados, documentos, matrículas, pantallas o información sensible sin autorización.",
          "Aunque un club sea privado, sus miembros pueden hacer capturas o redistribuir contenido. Comparte solo aquello que aceptarías mostrar al grupo.",
        ],
      },
      {
        id: "medidas",
        title: "4. Revisión y medidas",
        paragraphs: [
          "Las incidencias se valoran según contexto, gravedad, riesgo, reincidencia y obligaciones legales. Las medidas pueden incluir advertencia, retirada o limitación de contenido, restricción temporal, suspensión o cierre de cuenta.",
          "Una medida sobre contenido no sustituye una denuncia ante autoridades cuando exista riesgo inmediato o posible delito.",
        ],
      },
      {
        id: "comunicar",
        title: "5. Comunicar una incidencia",
        paragraphs: [
          `Hasta que la app disponga de un flujo interno confirmado, comunica la incidencia a ${legalPlaceholders.supportChannel}, indicando club o reto, fecha, descripción y evidencia que puedas compartir legítimamente.`,
          "No publiques acusaciones o datos privados para pedir ayuda. En una emergencia contacta directamente con los servicios públicos correspondientes.",
        ],
      },
    ],
  },
  "/contenido-y-fotos": {
    route: "/contenido-y-fotos",
    label: "Política de contenido y fotos",
    summary: "Explica derechos, permisos, visibilidad y tratamiento de fotografías y otros contenidos.",
    sections: [
      {
        id: "titularidad",
        title: "1. Titularidad y permisos",
        paragraphs: [
          "Mantienes los derechos que tengas sobre tus fotografías, avatar y mensajes. Subir contenido no transfiere su propiedad a Color Club.",
          "Debes ser autor o contar con permisos suficientes sobre la obra, las personas identificables, marcas, espacios privados y cualquier otro elemento protegido que aparezca.",
        ],
      },
      {
        id: "licencia",
        title: "2. Licencia necesaria para operar",
        paragraphs: [
          "Concedes una licencia no exclusiva, limitada y revocable mediante eliminación, en la medida técnicamente posible y sujeta a obligaciones legales, para almacenar, adaptar al formato, reproducir y mostrar el contenido dentro del servicio.",
          "La licencia se limita a prestar, proteger, moderar y mantener Color Club. No incluye vender fotografías ni utilizarlas en campañas publicitarias sin autorización o base jurídica adicional.",
        ],
      },
      {
        id: "visibilidad",
        title: "3. Visibilidad y almacenamiento",
        bullets: [
          "Collages: almacenamiento privado y acceso limitado por club y fase del reto.",
          "Fotos durante captura: visibles para su participante; las ajenas se revelan cuando la fase lo permite.",
          "Avatares: almacenamiento público; la URL puede ser accesible fuera de la app.",
          "Chat y perfiles: visibles según pertenencia al club o relación social implementada.",
          "Administración: acceso limitado a operaciones autorizadas de soporte, seguridad o moderación.",
        ],
      },
      {
        id: "restricciones",
        title: "4. Contenido no permitido",
        bullets: [
          "Contenido ilegal o que vulnere propiedad intelectual, intimidad, honor, imagen o protección de datos.",
          "Imágenes sexuales de menores o cualquier material de explotación infantil, que podrán comunicarse a autoridades.",
          "Datos sensibles, documentos de identidad, información financiera o credenciales.",
          "Contenido destinado a acosar, discriminar, amenazar, engañar o causar daño.",
          "Archivos maliciosos, manipulación técnica o contenido ajeno al funcionamiento legítimo del servicio.",
        ],
      },
      {
        id: "retirada",
        title: "5. Retirada, reclamaciones y conservación",
        paragraphs: [
          `Si consideras que un contenido vulnera tus derechos, contacta mediante ${legalPlaceholders.supportChannel} con una descripción precisa y acreditación razonable. No envíes más datos de los necesarios.`,
          "El contenido puede retirarse o bloquearse mientras se investiga. Parte de la información puede conservarse de forma restringida cuando sea necesaria para seguridad, obligaciones legales o reclamaciones.",
        ],
      },
    ],
  },
  "/eliminar-cuenta": {
    route: "/eliminar-cuenta",
    label: "Eliminar la cuenta",
    summary: "Describe cómo solicitar el borrado y qué ocurre con datos, clubs y contenido.",
    sections: [
      {
        id: "desde-app",
        title: "1. Solicitud desde la app",
        bullets: [
          "Abre Color Club e inicia sesión en la cuenta que quieres eliminar.",
          "Entra en Cuenta y selecciona la opción de eliminación.",
          "Lee el resumen de consecuencias y confirma la acción protegida.",
          "Si la operación muestra un error o no puedes acceder, utiliza el canal alternativo de soporte.",
        ],
      },
      {
        id: "sin-acceso",
        title: "2. Si no puedes entrar",
        paragraphs: [
          `Escribe a ${legalPlaceholders.privacyEmail} o utiliza ${legalPlaceholders.supportChannel}. Indica que solicitas eliminar la cuenta y el email asociado. Podemos pedir información razonable para verificar identidad y evitar borrar una cuenta ajena.`,
        ],
      },
      {
        id: "efectos",
        title: "3. Qué ocurre al eliminar",
        bullets: [
          "Se elimina o anonimiza la cuenta y la información vinculada cuando sea técnicamente posible y legalmente procedente.",
          "La pertenencia a clubs deja de estar activa y se pierde acceso a retos, chat, amistades y ranking.",
          "Fotos, mensajes, votos o referencias compartidas pueden requerir tratamiento específico para no romper la integridad de actividades de otras personas.",
          "Los clubs de los que seas responsable pueden necesitar transferencia, cierre o eliminación antes de completar la operación.",
          "Las copias de seguridad se depuran conforme a sus ciclos técnicos y no se restauran para uso ordinario.",
        ],
      },
      {
        id: "excepciones",
        title: "4. Datos que pueden conservarse",
        paragraphs: [
          "Podemos bloquear información mínima durante los plazos exigidos para obligaciones legales, prevención del fraude, seguridad, resolución de disputas o defensa de reclamaciones. Los datos bloqueados no se usan para actividad ordinaria.",
        ],
      },
      {
        id: "plazo",
        title: "5. Plazo y confirmación",
        paragraphs: [
          "Las solicitudes de derechos se atienden dentro del plazo legal aplicable, normalmente un mes desde su recepción, prorrogable en casos complejos conforme al RGPD. La eliminación automatizada puede completarse antes.",
          "Se comunicará el resultado o cualquier impedimento que requiera actuación adicional. [CONFIRMAR CANAL Y PLANTILLA DE RESPUESTA ANTES DEL LANZAMIENTO].",
        ],
      },
    ],
  },
};

export const legalReferences = [
  { label: "RGPD · Reglamento (UE) 2016/679", href: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
  { label: "LOPDGDD · Ley Orgánica 3/2018", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673" },
  { label: "LSSI-CE · Ley 34/2002", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758" },
  { label: "Reglamento de Servicios Digitales", href: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj" },
  { label: "Agencia Española de Protección de Datos", href: "https://www.aepd.es" },
] as const;
