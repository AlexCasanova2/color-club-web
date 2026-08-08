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

export const legalDetails = {
  owner: "Alex Casanova",
  taxId: "25369405Z",
  address: "Carrer Elisenda de Montcada, 26, 08330 Premià de Mar, España",
  email: "info@getcolorclub.com",
  hostingProvider: "Vercel",
  supabaseRegion: "Irlanda",
  minimumAge: 16,
  effectiveDate: "8 de agosto de 2026",
} as const;

const contact = legalDetails.email;

export const legalDocuments: Record<
  "/privacidad" | "/terminos" | "/aviso-legal" | "/cookies" | "/normas-comunidad" | "/contenido-y-fotos" | "/eliminar-cuenta",
  LegalDocument
> = {
  "/privacidad": {
    route: "/privacidad",
    label: "Política de privacidad",
    summary: "Esta política explica qué datos trata Color Club, para qué los utiliza, con quién los comparte y cómo puedes ejercer tus derechos.",
    sections: [
      {
        id: "responsable",
        title: "1. Responsable del tratamiento",
        paragraphs: [
          `El responsable del tratamiento es ${legalDetails.owner}, con NIF ${legalDetails.taxId} y domicilio en ${legalDetails.address}. Para cualquier cuestión de privacidad puedes escribir a ${contact}.`,
          "Esta política se aplica a la app Color Club, a su web pública y a las consultas de soporte, privacidad y seguridad relacionadas con el servicio.",
        ],
      },
      {
        id: "datos",
        title: "2. Datos que tratamos",
        bullets: [
          "Cuenta y autenticación: email, UUID, confirmación de correo, recuperación de contraseña y credenciales gestionadas por Supabase Auth. Color Club no puede consultar tu contraseña.",
          "Perfil: nombre visible, username, avatar, bio, estado, color favorito y preferencias.",
          "Relaciones sociales: amistades, invitaciones, pertenencia y roles en clubs privados de hasta 12 integrantes.",
          "Actividad: retos, fotografías, collages, votos, rankings, participación y estado de cada fase.",
          "Comunicaciones: mensajes del chat privado de cada club y consultas enviadas a soporte, privacidad o seguridad.",
          "Notificaciones: tokens push, preferencias y datos necesarios para entregar notificaciones internas o push.",
          "Seguridad y moderación: última actividad, datos técnicos necesarios para proteger el servicio, denuncias y evidencias mínimas asociadas.",
        ],
      },
      {
        id: "finalidades",
        title: "3. Finalidades y bases jurídicas",
        paragraphs: [
          "Color Club no muestra publicidad, no utiliza IDFA, no vende datos personales y no realiza seguimiento publicitario. Actualmente tampoco utiliza analítica no esencial en la web pública.",
        ],
        bullets: [
          "Crear la cuenta y prestar clubs, retos, collages, votaciones, rankings, chat y notificaciones: ejecución de los términos del servicio.",
          "Confirmar el correo, recuperar el acceso y gestionar la cuenta: ejecución del servicio y medidas solicitadas por la persona usuaria.",
          "Atender soporte y solicitudes de privacidad: ejecución del servicio, cumplimiento de obligaciones legales e interés legítimo en resolver incidencias.",
          "Prevenir fraude, abuso, accesos no autorizados y fallos; aplicar bloqueos, filtrado y moderación: interés legítimo en proteger a las personas y el servicio, además de obligaciones legales cuando proceda.",
          "Enviar notificaciones push: consentimiento mediante los permisos del dispositivo, que puede retirarse desde el sistema o las preferencias de la app.",
          "Conservar información mínima ante una denuncia o reclamación: interés legítimo y formulación, ejercicio o defensa de reclamaciones.",
        ],
      },
      {
        id: "visibilidad",
        title: "4. Visibilidad de perfiles y contenido",
        bullets: [
          "Los clubs son privados. Sus retos, chat, integrantes y collages se muestran únicamente a integrantes autorizados según su rol y la fase del reto.",
          "Las fotos propias son visibles para quien las toma durante la captura. Las fotos ajenas se revelan cuando la fase del reto permite votar o consultar resultados.",
          "Los collages se almacenan de forma privada. Los avatares se alojan actualmente como archivos públicos y una persona que conozca su URL puede acceder a ellos fuera de la app.",
          "El email y las credenciales no se muestran en el perfil. El resto de campos de perfil se presenta según las relaciones y pantallas habilitadas en la app.",
          "El personal autorizado puede acceder a información limitada cuando sea necesario para soporte, seguridad o moderación.",
          "Color Club no ofrece cifrado extremo a extremo para el chat o el contenido.",
        ],
      },
      {
        id: "proveedores",
        title: "5. Proveedores y destinatarios",
        bullets: [
          `Supabase, con el proyecto alojado en ${legalDetails.supabaseRegion}: autenticación, PostgreSQL, almacenamiento, Realtime y Edge Functions.`,
          "Expo/EAS y Expo Push: compilación, servicios técnicos de la app y entrega de notificaciones push.",
          "Apple Push Notification Service: entrega de notificaciones en dispositivos Apple.",
          "Resend: entrega por SMTP de emails de autenticación, confirmación y recuperación.",
          `${legalDetails.hostingProvider}: alojamiento y entrega de la web pública.`,
          "Apple App Store y, si la app se distribuye allí, Google Play: distribución y datos tratados por cada tienda bajo sus propias condiciones.",
          "Autoridades públicas, jueces o tribunales cuando exista una obligación legal válida.",
        ],
      },
      {
        id: "transferencias",
        title: "6. Transferencias internacionales",
        paragraphs: [
          "Aunque el proyecto de Supabase está situado en Irlanda, algunos proveedores operan globalmente y pueden implicar acceso o tratamiento desde países situados fuera del Espacio Económico Europeo.",
          "Cuando un tratamiento implique una transferencia internacional, se aplicará el mecanismo previsto por la normativa y por el contrato del proveedor, como una decisión de adecuación, cláusulas contractuales tipo de la Comisión Europea u otras garantías válidas. Puedes solicitar información sobre las garantías aplicables escribiendo al contacto de privacidad.",
        ],
      },
      {
        id: "conservacion",
        title: "7. Conservación y eliminación",
        bullets: [
          "Los datos de cuenta y actividad se conservan mientras la cuenta permanezca activa y sean necesarios para prestar el servicio.",
          "Al borrar la cuenta se eliminan de los sistemas activos la cuenta, el perfil, las relaciones, los mensajes, los avatares, los collages y el contenido asociado, además de los datos locales vinculados.",
          "Los tokens push se eliminan o dejan de utilizarse cuando dejan de ser necesarios o válidos, o cuando se desactivan las notificaciones.",
          "Las consultas y evidencias se conservan solo mientras sean necesarias para atenderlas. Después podrán permanecer bloqueadas durante los plazos legales aplicables a obligaciones y reclamaciones.",
          "Podrá conservarse de forma restringida la información mínima necesaria para cumplir una obligación legal, prevenir fraude, proteger la seguridad o formular, ejercer o defender reclamaciones. No se utilizará para la actividad ordinaria.",
        ],
      },
      {
        id: "derechos",
        title: "8. Tus derechos",
        paragraphs: [
          `Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad, así como retirar un consentimiento, escribiendo a ${contact}. Podemos solicitar información razonable para verificar tu identidad y proteger la cuenta.`,
          "También puedes presentar una reclamación ante la Agencia Española de Protección de Datos en aepd.es, especialmente si consideras que no hemos atendido correctamente el ejercicio de tus derechos.",
        ],
      },
      {
        id: "menores",
        title: "9. Personas menores de edad",
        paragraphs: [
          `Color Club exige una edad mínima de ${legalDetails.minimumAge} años. El servicio no está dirigido a menores de esa edad, que no deben crear una cuenta ni subir fotografías.`,
          `Si crees que una persona menor de ${legalDetails.minimumAge} años utiliza el servicio, escribe a ${contact}. Revisaremos la situación y adoptaremos las medidas apropiadas.`,
        ],
      },
      {
        id: "seguridad",
        title: "10. Seguridad y cambios",
        paragraphs: [
          `Aplicamos controles de acceso, separación de roles, almacenamiento privado para collages, bloqueo bilateral, filtrado básico y una cola interna de moderación. Ningún sistema es infalible; comunica una incidencia de seguridad a ${contact}.`,
          "Podemos actualizar esta política para reflejar cambios legales, técnicos o del servicio. Publicaremos la fecha de la última actualización y, si el cambio es relevante, lo comunicaremos por un medio adecuado.",
        ],
      },
    ],
  },
  "/terminos": {
    route: "/terminos",
    label: "Términos de uso",
    summary: "Estos términos regulan el acceso a Color Club, el funcionamiento de los retos y las responsabilidades sobre cuentas y contenido.",
    sections: [
      {
        id: "titular",
        title: "1. Titular y aceptación",
        paragraphs: [
          `Color Club es ofrecido por ${legalDetails.owner}, con NIF ${legalDetails.taxId}, domicilio en ${legalDetails.address} y contacto en ${contact}.`,
          "Al crear una cuenta o utilizar la app aceptas estos términos, la Política de privacidad, las Normas de la comunidad y la Política de contenido y fotos. Si no estás de acuerdo, no utilices el servicio.",
        ],
      },
      {
        id: "edad",
        title: "2. Edad y capacidad",
        paragraphs: [
          `Debes tener al menos ${legalDetails.minimumAge} años y capacidad legal suficiente para aceptar estos términos. El servicio no está dirigido a menores de ${legalDetails.minimumAge} años.`,
          "No debes declarar una edad falsa ni facilitar el acceso a una persona que no cumpla este requisito.",
        ],
      },
      {
        id: "cuenta",
        title: "3. Cuenta y credenciales",
        bullets: [
          "Debes proporcionar información correcta y mantenerla actualizada.",
          "Debes proteger tus credenciales, no compartirlas y avisarnos si sospechas un acceso no autorizado.",
          "Eres responsable de la actividad de tu cuenta salvo que derive de un uso no autorizado que no te sea imputable.",
          "No puedes vender, ceder ni utilizar cuentas para eludir bloqueos, suspensiones o controles de acceso.",
        ],
      },
      {
        id: "servicio",
        title: "4. Clubs, retos, collages y votos",
        paragraphs: [
          "Color Club permite crear clubs privados de hasta 12 integrantes, gestionar invitaciones y roles, participar en retos fotográficos por colores, formar collages, votar y consultar rankings.",
          "Los participantes, fases, plazos, número de fotografías y condiciones de votación que muestra la app forman parte de cada reto. Las fotos ajenas se ocultan y revelan según la fase correspondiente.",
          "Los resultados dependen de la participación y los votos válidos. No se garantiza que todos los retos lleguen a votación o produzcan el resultado esperado por una persona.",
        ],
      },
      {
        id: "contenido",
        title: "5. Tu contenido y la licencia técnica",
        paragraphs: [
          "Conservas los derechos que tengas sobre fotografías, mensajes, avatar y demás contenido que aportes. Solo debes subir contenido propio o para el que cuentes con autorización suficiente.",
          "Concedes al titular una licencia no exclusiva, limitada, mundial y durante el tiempo necesario para alojar, reproducir, adaptar técnicamente y mostrar el contenido dentro de Color Club. La licencia se limita a operar, proteger y moderar el servicio; no permite vender tus fotografías ni usarlas en publicidad sin otra autorización o base jurídica.",
        ],
      },
      {
        id: "conducta",
        title: "6. Conductas prohibidas",
        bullets: [
          "Publicar contenido ilegal, sexual, violento, discriminatorio, acosador o que vulnere derechos de terceros.",
          "Amenazar, humillar, perseguir, extorsionar o divulgar datos e imágenes de otras personas sin permiso.",
          "Suplantar identidades, enviar spam, manipular votos o rankings, automatizar interacciones o coordinar actividades ilícitas.",
          "Intentar acceder a clubs, fotografías, cuentas, datos o funciones para los que no tengas autorización.",
          "Explotar vulnerabilidades, introducir código malicioso o interferir con el funcionamiento y la seguridad del servicio.",
        ],
      },
      {
        id: "moderacion",
        title: "7. Denuncias, moderación y medidas",
        paragraphs: [
          "La app permite denunciar perfiles, mensajes y collages, bloquear bilateralmente a otras personas y somete las denuncias a una cola interna de moderación.",
          "Podemos revisar contenido y conductas denunciadas o detectadas por los mecanismos de seguridad. Según contexto, gravedad y reincidencia, podremos retirar o limitar contenido, restringir funciones, suspender o cerrar una cuenta y colaborar con autoridades cuando sea legalmente necesario.",
          `Para comunicar un caso fuera de la app o apelar una medida, escribe a ${contact} con la información mínima necesaria para localizarlo.`,
        ],
      },
      {
        id: "propiedad",
        title: "8. Propiedad intelectual de Color Club",
        paragraphs: [
          "La marca, el diseño, el software, los textos y los demás elementos propios de Color Club pertenecen al titular o a sus licenciantes. Estos términos no transfieren ningún derecho sobre ellos.",
          "No puedes copiar, descompilar, redistribuir ni explotar el servicio fuera de lo permitido por la ley o por una autorización escrita.",
        ],
      },
      {
        id: "disponibilidad",
        title: "9. Disponibilidad y cambios del servicio",
        paragraphs: [
          "El servicio puede experimentar mantenimiento, errores o interrupciones y no se garantiza una disponibilidad ininterrumpida. Intentaremos resolver incidencias y comunicar cambios relevantes por medios razonables.",
          "Podemos modificar, añadir o retirar funciones por razones técnicas, de seguridad, legales o de producto, respetando los derechos que resulten aplicables.",
          "La descarga desde Apple App Store o Google Play también está sujeta a las condiciones de la tienda correspondiente.",
        ],
      },
      {
        id: "baja",
        title: "10. Baja, suspensión y responsabilidad",
        paragraphs: [
          "Puedes borrar tu cuenta desde la app. También podemos suspender o terminar el acceso por incumplimiento, riesgo de seguridad, obligación legal o cierre del servicio.",
          "Color Club responde conforme a la legislación aplicable. Nada en estos términos excluye o limita la responsabilidad que no pueda excluirse legalmente ni los derechos irrenunciables de consumidores y usuarios.",
          "No respondemos de pérdidas atribuibles al incumplimiento de estos términos, a terceros o a acontecimientos fuera de nuestro control razonable, salvo que la ley disponga otra cosa.",
        ],
      },
      {
        id: "ley",
        title: "11. Ley aplicable y consumidores",
        paragraphs: [
          "Se aplica la legislación española, sin privarte de la protección imperativa que corresponda como consumidor en tu lugar de residencia.",
          "Cualquier conflicto se intentará resolver primero mediante el canal de contacto. Si no es posible, será competente el juzgado determinado por la normativa aplicable; estos términos no imponen a consumidores un fuero distinto del que legalmente les corresponda.",
          "Los cambios sustanciales se comunicarán con antelación razonable cuando resulte exigible.",
        ],
      },
    ],
  },
  "/aviso-legal": {
    route: "/aviso-legal",
    label: "Aviso legal",
    summary: "Información del titular y condiciones básicas de acceso a la web pública de Color Club.",
    sections: [
      {
        id: "identificacion",
        title: "1. Identificación del titular",
        bullets: [
          `Titular: ${legalDetails.owner}.`,
          `NIF: ${legalDetails.taxId}.`,
          `Domicilio: ${legalDetails.address}.`,
          `Contacto directo y efectivo: ${contact}.`,
        ],
      },
      {
        id: "objeto",
        title: "2. Objeto y condiciones de acceso",
        paragraphs: [
          "Esta web presenta la app Color Club, explica su funcionamiento, ofrece soporte y publica información legal. La parte pública no permite jugar, iniciar sesión, consultar clubs ni acceder a datos de usuarios.",
          "El acceso es gratuito, salvo el coste de conexión de cada visitante. Debes utilizar el sitio de forma lícita y no intentar dañar, saturar o acceder a áreas restringidas.",
        ],
      },
      {
        id: "propiedad",
        title: "3. Propiedad intelectual e industrial",
        paragraphs: [
          "La marca, los textos, el diseño, el software, los iconos y los activos propios están protegidos por la normativa aplicable y pertenecen al titular o a sus licenciantes.",
          "No se concede ninguna licencia salvo la necesaria para navegar por el sitio conforme a su finalidad. Las marcas y contenidos de terceros pertenecen a sus respectivos titulares.",
        ],
      },
      {
        id: "responsabilidad",
        title: "4. Disponibilidad y enlaces",
        paragraphs: [
          "Se procura mantener la web segura, correcta y disponible, pero puede haber errores, tareas de mantenimiento o interrupciones. El titular no garantiza disponibilidad continua, sin perjuicio de las responsabilidades exigidas por la ley.",
          "Los enlaces externos llevan a sitios administrados por terceros. No controlamos sus contenidos, disponibilidad o tratamientos de datos y cada servicio aplica sus propias condiciones.",
        ],
      },
      {
        id: "ley",
        title: "5. Legislación aplicable",
        paragraphs: [
          `Para consultas sobre el sitio escribe a ${contact}. Se aplica la legislación española y europea correspondiente, respetando siempre la protección imperativa de consumidores y usuarios.`,
        ],
      },
    ],
  },
  "/cookies": {
    route: "/cookies",
    label: "Política de cookies",
    summary: "La web pública no utiliza cookies de analítica, publicidad o seguimiento; solo existen tecnologías técnicas donde son necesarias.",
    sections: [
      {
        id: "situacion",
        title: "1. Situación actual",
        paragraphs: [
          "La parte pública de getcolorclub.com no instala cookies de analítica, publicidad o perfilado y no utiliza identificadores para seguimiento publicitario. Tampoco utiliza almacenamiento local no esencial.",
          "Por este motivo no se muestra un banner de consentimiento: no se cargan tecnologías opcionales que requieran aceptar o rechazar su uso.",
        ],
      },
      {
        id: "tecnologias",
        title: "2. Tecnologías estrictamente necesarias",
        paragraphs: [
          "El área interna de administración utiliza cookies técnicas de Supabase Auth para autenticar al personal autorizado, mantener la sesión y proteger el acceso. No se utilizan para observar la navegación de visitantes de la web pública.",
          "Estas cookies son necesarias para prestar el acceso solicitado al panel y su duración depende de la sesión y de la configuración técnica del servicio de autenticación.",
        ],
      },
      {
        id: "gestion",
        title: "3. Gestión desde el navegador",
        paragraphs: [
          "Puedes consultar, borrar o bloquear cookies desde la configuración de tu navegador. Bloquear las cookies técnicas impide iniciar o mantener una sesión en el panel interno, pero no afecta a la navegación por las páginas públicas.",
        ],
      },
      {
        id: "cambios",
        title: "4. Cambios en este uso",
        paragraphs: [
          "Si en el futuro se incorpora analítica u otra tecnología no esencial, se actualizará esta política y, cuando sea necesario, se solicitará consentimiento antes de activarla. Rechazar será tan sencillo como aceptar.",
          `Para cualquier consulta sobre cookies o privacidad escribe a ${contact}.`,
        ],
      },
    ],
  },
  "/normas-comunidad": {
    route: "/normas-comunidad",
    label: "Normas de la comunidad",
    summary: "Color Club aplica tolerancia cero frente al abuso y exige respeto por las personas, sus imágenes y la privacidad de cada club.",
    sections: [
      {
        id: "tolerancia-cero",
        title: "1. Tolerancia cero frente al abuso",
        bullets: [
          "No se permite el acoso, las amenazas, la intimidación, la humillación ni la persecución.",
          "No se permite el odio o la discriminación por origen, raza, nacionalidad, sexo, género, orientación sexual, religión, discapacidad, edad u otra característica personal.",
          "No se permite fomentar autolesiones, explotación, extorsión o daño contra una persona o grupo.",
        ],
      },
      {
        id: "contenido-prohibido",
        title: "2. Contenido prohibido",
        bullets: [
          "Contenido sexual explícito, desnudez sexualizada, explotación infantil o cualquier sexualización de menores.",
          "Violencia extrema, amenazas creíbles, crueldad o contenido que facilite actividades ilegales.",
          "Datos personales, documentos, imágenes o conversaciones de terceros publicados sin permiso.",
          "Contenido que vulnere derechos de autor, imagen, intimidad, honor, marca u otros derechos.",
        ],
      },
      {
        id: "integridad",
        title: "3. Integridad de la comunidad",
        bullets: [
          "No suplantes a otra persona ni crees identidades engañosas.",
          "No envíes spam, enlaces maliciosos, fraude o comunicaciones comerciales no solicitadas.",
          "No manipules votos, rankings, invitaciones o retos, ni utilices automatización o vulnerabilidades para obtener ventaja.",
          "No intentes eludir bloqueos, suspensiones, límites de acceso o medidas de moderación.",
        ],
      },
      {
        id: "fotos",
        title: "4. Fotos, privacidad y menores",
        paragraphs: [
          "Publica solo fotografías propias o autorizadas. Obtén permiso antes de subir una imagen en la que otra persona sea identificable, especialmente si es menor de edad.",
          "No fotografíes ni compartas interiores privados, documentos, pantallas, matrículas o información sensible sin autorización. Que un club sea privado no autoriza a redistribuir fuera de él las fotos o mensajes de otras personas.",
        ],
      },
      {
        id: "denunciar",
        title: "5. Cómo denunciar y bloquear",
        paragraphs: [
          "Para denunciar un perfil, mensaje o collage, abre sus opciones dentro de la app, selecciona Denunciar, elige el motivo y añade solo el contexto necesario. La denuncia entra en la cola interna de moderación.",
          "Para bloquear a una persona, abre las opciones de su perfil y selecciona Bloquear. El bloqueo es bilateral y restringe la interacción entre ambas cuentas. Puedes recurrir a los servicios públicos si existe peligro inmediato o un posible delito.",
        ],
      },
      {
        id: "medidas",
        title: "6. Revisión, medidas y apelaciones",
        paragraphs: [
          "Nos comprometemos a revisar las denuncias recibidas y a valorar el contexto, la gravedad, el riesgo y la reincidencia, sin prometer un plazo fijo que pueda comprometer una revisión adecuada.",
          "Las medidas pueden incluir retirada o limitación del contenido, restricción de funciones, suspensión temporal o cierre de la cuenta. Cuando proceda, podremos preservar información mínima o colaborar con autoridades conforme a la ley.",
          `Para comunicar un caso fuera de la app o apelar una decisión escribe a ${contact}. No envíes contraseñas ni más datos personales de los necesarios.`,
        ],
      },
    ],
  },
  "/contenido-y-fotos": {
    route: "/contenido-y-fotos",
    label: "Política de contenido y fotos",
    summary: "Tus fotos siguen siendo tuyas. Esta política explica los permisos necesarios, su visibilidad y el tratamiento técnico que permite operar Color Club.",
    sections: [
      {
        id: "derechos",
        title: "1. Tus derechos y tus permisos",
        paragraphs: [
          "Conservas los derechos que tengas sobre fotografías, avatar, mensajes y demás contenido. Subirlo a Color Club no transfiere su propiedad.",
          "Solo puedes subir contenido propio o para el que tengas autorización suficiente sobre la obra, las personas identificables, los espacios privados, las marcas y cualquier otro elemento protegido.",
        ],
      },
      {
        id: "licencia",
        title: "2. Licencia técnica limitada",
        paragraphs: [
          "Concedes a Color Club una licencia no exclusiva, limitada y mundial para alojar, copiar, adaptar al formato técnico, procesar y mostrar el contenido durante el tiempo necesario para prestar, proteger y moderar el servicio.",
          "Esta licencia no permite vender tus fotografías ni usarlas en publicidad sin una autorización o base jurídica adicional. Termina cuando se elimina el contenido, salvo la conservación mínima exigida legalmente.",
        ],
      },
      {
        id: "visibilidad",
        title: "3. Visibilidad y almacenamiento",
        bullets: [
          "Los collages se almacenan de forma privada y se muestran a integrantes autorizados del club según la fase del reto.",
          "Durante la captura cada participante ve sus propias fotos; las fotos ajenas se revelan en la fase de votación o resultados que corresponda.",
          "Los avatares son archivos públicamente accesibles mediante URL, incluso fuera de la app. No utilices como avatar una imagen que no quieras hacer pública.",
          "El chat se limita al club correspondiente. El personal autorizado solo accede a contenido cuando resulta necesario para soporte, seguridad o moderación.",
          "Un integrante puede hacer una captura o redistribuir contenido fuera de la app pese a las normas; comparte únicamente aquello que aceptarías mostrar al grupo.",
        ],
      },
      {
        id: "imagen-menores",
        title: "4. Imagen, privacidad y menores",
        paragraphs: [
          "Obtén permiso de las personas identificables antes de publicar su imagen. Respeta especialmente la intimidad, el honor, los espacios privados y la protección de datos.",
          "No publiques contenido de menores sin autorización suficiente de quienes deban prestarla, ni contenido sexual, explotador o que pueda ponerles en riesgo. Color Club no admite usuarios menores de 16 años.",
        ],
      },
      {
        id: "denuncia",
        title: "5. Denuncia y retirada",
        paragraphs: [
          `Puedes denunciar perfiles, mensajes y collages desde sus opciones en la app. Si eres una persona afectada sin acceso a la app, escribe a ${contact} e identifica el contenido y el derecho afectado sin aportar más datos de los necesarios.`,
          "Podemos limitar o retirar contenido mientras se revisa y adoptar medidas sobre la cuenta responsable. Si existe riesgo inmediato o posible delito, contacta también con las autoridades competentes.",
        ],
      },
      {
        id: "eliminacion",
        title: "6. Eliminación y conservación",
        paragraphs: [
          "Al borrar la cuenta se eliminan los avatares, collages, mensajes y demás contenido asociado de los sistemas activos. También se eliminan los datos locales vinculados.",
          "Solo podrá conservarse de forma restringida la información mínima necesaria para cumplir obligaciones legales, proteger la seguridad o formular, ejercer o defender reclamaciones durante los plazos legalmente aplicables.",
        ],
      },
    ],
  },
  "/eliminar-cuenta": {
    route: "/eliminar-cuenta",
    label: "Eliminar la cuenta",
    summary: "Puedes borrar tu cuenta directamente desde Color Club. El email es una alternativa únicamente si no puedes acceder a la app.",
    sections: [
      {
        id: "desde-app",
        title: "1. Borrar la cuenta desde la app",
        bullets: [
          "Abre Color Club e inicia sesión en la cuenta que quieres eliminar.",
          "Ve a Cuenta → Borrar cuenta.",
          "Lee las consecuencias de la eliminación.",
          "Escribe BORRAR en el campo de confirmación y confirma la acción.",
        ],
      },
      {
        id: "efectos",
        title: "2. Qué se elimina",
        bullets: [
          "La cuenta de autenticación y el perfil, incluidos nombre, username, bio, estado y preferencias.",
          "Amistades, invitaciones, pertenencias, roles y demás relaciones asociadas a la cuenta.",
          "Mensajes, fotografías, collages, votos, participaciones y demás contenido asociado.",
          "Los archivos de avatar y collage vinculados a la cuenta.",
          "Los datos locales asociados a la cuenta en el dispositivo.",
        ],
      },
      {
        id: "consecuencias",
        title: "3. Consecuencias",
        paragraphs: [
          "La eliminación es irreversible: perderás el acceso a clubs, retos, chat, amistades y rankings. La actividad de otras personas puede reorganizarse para mantener el funcionamiento de sus clubs, pero tus datos y contenido asociados se eliminan.",
          "Antes de confirmar, guarda por tu cuenta cualquier fotografía o información que quieras conservar.",
        ],
      },
      {
        id: "sin-acceso",
        title: "4. Si no puedes acceder a la app",
        paragraphs: [
          `Si no puedes iniciar sesión, escribe a ${contact} desde el email asociado a la cuenta e indica que solicitas su eliminación. Podemos pedir información razonable para verificar tu identidad y evitar borrar una cuenta ajena.`,
          "El contacto por email es un canal alternativo. Si puedes entrar en la app, utiliza Cuenta → Borrar cuenta como método principal.",
        ],
      },
      {
        id: "retencion",
        title: "5. Conservación excepcional",
        paragraphs: [
          "La eliminación retira los datos de los sistemas activos. Solo podrá conservarse de forma bloqueada la información mínima necesaria para una obligación legal, prevenir fraude, proteger la seguridad o formular, ejercer o defender reclamaciones durante los plazos legalmente aplicables.",
          "La información bloqueada no se utiliza para prestar el servicio ni para actividad ordinaria.",
        ],
      },
      {
        id: "derechos",
        title: "6. Solicitudes de privacidad",
        paragraphs: [
          "Las solicitudes de derechos se atienden dentro del plazo legal aplicable, normalmente un mes desde su recepción. Ese plazo puede ampliarse en casos complejos conforme al RGPD, informando de los motivos.",
          `Para consultar el estado de una solicitud de privacidad escribe a ${contact}.`,
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
