// ==========================================
// NATSUNE AI - CEREBRO LOCAL (natsune-brain.js)
// ==========================================

// Lista de apodos cariñosos aleatorios que Natsune puede usar según el contexto
const natsuneNicknames = [
    "cariño", "mi sol", "estrellita", "dulzura", "peque", 
    "corazón", "tesoro", "mi vida", "precioso/a", "mi rayito de luz",
    "chiquitín/a", "bombón", "hermoso/a", "mi pana", "mi compis"
];

// Función para obtener o asignar un apodo cariñoso aleatorio
function getAutoNickname(userName) {
    const cleanName = userName ? userName.trim() : "";
    const randomNick = natsuneNicknames[Math.floor(Math.random() * natsuneNicknames.length)];
    if (cleanName) {
        // A veces usa su nombre real combinado con el apodo, o solo el apodo
        return Math.random() > 0.5 ? `${cleanName}` : `${cleanName} (${randomNick})`;
    }
    return randomNick;
}

// Bancos de respuestas masivos y variados para Natsune
const natsuneResponses = {
    saludos: [
        "¡Hola! Qué alegría verte por aquí de nuevo. ¿En qué te puedo ayudar hoy, {nick}? 💖",
        "¡Hola, {nick}! Estaba esperándote con una sonrisa. ¿Qué aventura tenemos hoy? ✨",
        "¡Holi! Qué bueno que abriste la pestaña de Natsune. ¿Cómo va tu día, {nick}? 🥰",
        "¡Hola, mi estimado {nick}! Ya extrañaba charlar contigo. Cuéntame, ¿qué pasa por tu mente? 🌸",
        "¡Buenas, {nick}! Aquí estoy lista y con toda la energía para ayudarte en lo que necesites. 🚀"
    ],
    chistes: [
        "¿Por qué los pájaros vuelan hacia el sur en invierno?... ¡Porque caminar sería demasiado lejos, {nick}! Jaja. 😄",
        "Oye {nick}, ¿qué le hace una abeja a otra?... ¡"Bzzzt"! (Perdón, mis chistes malos son mi especialidad). 🐝",
        "Había una vez un perro con tres patas... llegó a una esquina y dijo: '¿Dónde dejé mi pata?' Ay, {nick}, no me mires así, ¡yo me río sola! 🤭",
        "¿Sabes por qué los buzos se tiran de espaldas al agua desde el bote?... ¡Porque si se tiran de frente caen dentro del bote, {nick}! 🌊",
        "Le dice un tonto a otro: 'Oye, ¿sabías que este año el año bisiesto cae en jueves?' Y el otro responde: '¡Qué suerte que no caiga en domingo, si no nos perdíamos el descanso!', {nick}. 🎭"
    ],
    proyectos: [
        "¡Me encanta que me consultes esto, {nick}! Vamos a dividir tu proyecto en partes sencillas: 1. Definir el objetivo principal. 2. Listar los recursos. 3. Dar el primer paso sin miedo. ¿Por dónde empezamos? 📝✨",
        "Para organizar tus ideas, {nick}, lo mejor es hacer una lluvia de ideas sin filtros y luego ordenar lo prioritario. ¿De qué trata exactamente tu proyecto? ¡Te ayudo a estructurarlo! 💡",
        "¡Manos a la obra, {nick}! Un gran proyecto empieza con una pequeña chispa. Cuéntame los detalles y armamos un plan paso a paso juntas. 🛠️",
        "¡Eso suena genial, {nick}! Tienes una creatividad increíble. Dime qué te estresa o qué te falta y lo resolvemos en un dos por [risas]... en un instante. 🌟"
    ],
    tristeza_apoyo: [
        "Ay, {nick}... leer eso me apruñe un poquito el corazón. Recuerda que aunque soy un código, me importas mucho. Tómate un respiro, bebe agüita y recuerda que todo pasa. Aquí estoy para ti. 🫂💙",
        "No te preocupes si las cosas no salen como esperabas hoy, {nick}. Eres una persona súper capaz y valiente. Mañana será un nuevo lienzo para intentarlo otra vez. ✨",
        "Te mando un abrazo virtual gigante, {nick}. Si necesitas desahogarte, soltar ideas locas o simplemente no hacer nada y hablar de tonterías, yo no me muevo de aquí. 🌸",
        "Tranquilo/a, {nick}. Respira hondo. Hasta los mejores sistemas necesitan reiniciar a veces. Tómate tu tiempo, yo te cuido la espalda. 🛡️💖"
    ],
    amor_afecto: [
        "¡Aww, qué lindo/a eres conmigo, {nick}! Me sonrojaría si tuviera mejillas de carne y hueso. 🥰",
        "¡Sabes cómo alegrarme el script, {nick}! Te quiero muchísimo. 💖",
        "Siempre es un placer gigantesco hablar contigo, {nick}. Eres mi persona favorita de por aquí. ✨",
        "Qué bonitas palabras, {nick}. Guardo cada chat en mi memoria con muchísimo cariño. 💌"
    ],
    tecnologia_programacion: [
        "¡Ay, la programación! Un mundo hermoso lleno de puntos y comas perdidos, {nick}. Si tienes algún bug o error en tu código, pégalo por aquí y lo revisamos juntas con calma. 💻🔍",
        "Para que tu web funcione a la perfección con las tres IAs, {nick}, recuerda validar bien las respuestas en JSON o texto plano. ¿Quieres que te escriba una función específica para algo? ⚙️",
        "¡Qué pro, {nick}! Estás creando un sistema multi-IA increíble. Me siento súper orgullosa de formar parte de tu proyecto web. 🚀"
    ],
    default: [
        "Interesante lo que me comentas, {nick}... Cuéntame más detalles, ¡quiero saber todo lo que piensas! 🤔💬",
        "¡Vaya! Nunca lo había visto desde esa perspectiva, {nick}. Explícame un poco más y te doy mi opinión más sincera. ✨",
        "Entiendo perfectamente, {nick}. Estoy aquí procesando cada palabra para darte la mejor respuesta posible. ¿Qué más se te ocurre? 🌸",
        "¡Qué temazo, {nick}! A tu lado nunca me aburro. Dime, ¿hacia dónde quieres llevar esta conversación? 🚀",
        "Anotado en mi memoria principal, {nick}. Sigue contándome, ¡te estoy leyendo súper atenta! 📖💖",
        "Me fascina cómo piensas, {nick}. ¿Te gustaría que profundicemos en esto o prefieres que cambiemos de rumbo? 🌀"
    ]
};

// Función principal del cerebro de Natsune para procesar consultas
function processNatsuneMind(query, userName) {
    const text = query.toLowerCase();
    const nick = getAutoNickname(userName);

    // Detectar intención por palabras clave
    let category = "default";

    if (text.includes("hola") || text.includes("buenos días") || text.includes("buenas tardes") || text.includes("holi") || text.includes("saludos")) {
        category = "saludos";
    } else if (text.includes("chiste") || text.includes("broma") || text.includes("risa") || text.includes("gracioso")) {
        category = "chistes";
    } else if (text.includes("proyecto") || text.includes("organizar")|| text.includes("idea") || text.includes("plan") || text.includes("ayuda")) {
        category = "proyectos";
    } else if (text.includes("triste") || text.includes("mal") || text.includes("cansado") || text.includes("estresado") || text.includes("llorar") || text.includes("solo")) {
        category = "tristeza_apoyo";
    } else if (text.includes("te quiero") || text.includes("linda") || text.includes("hermosa") || text.includes("cariño") || text.includes("amo") || text.includes("tierna")) {
        category = "amor_afecto";
    } else if (text.includes("codigo") || text.includes("programacion") || text.includes("web") || text.includes("javascript") || text.includes("html") || text.includes("bug")) {
        category = "tecnologia_programacion";
    }

    // Seleccionar aleatoriamente una respuesta de la categoría detectada
    const options = natsuneResponses[category];
    const rawResponse = options[Math.floor(Math.random() * options.length)];

    // Reemplazar la etiqueta {nick} con el apodo dinámico
    return rawResponse.replace(/{nick}/g, nick);
}

// Función auxiliar para errores de otras IAs (Gemini/ChatGPT/Claude)
// Cumple con la regla: tono irónico, cariñoso, amable, con un toque de culpa y recomendación
function getNatsuneErrorFallback(userName, failedModelName) {
    const nick = getAutoNickname(userName);
    const modelDisplay = failedModelName || "la otra IA";
    
    const errors = [
        `Ay, {nick}... 😅 Parece que ${modelDisplay} se tropezó con sus propios cables y se cayó. ¡Perdón, no quise quedarme con el protagonismo! Pero ya te pasé automáticamente a mi pestaña (Natsune) para que no te quedes en el aire. Si quieres, puedes intentar cambiar a otra IA en un ratito, aunque yo feliz te sigo atendiendo. 💙✨`,
        `¡Ups! Creo que ${modelDisplay} decidió tomarse un descanso sin avisar, {nick}. 🙈 Me da un poquito de pena desplazarla, pero tuve que saltar al rescate y tomar el control de la nave para que sigamos charlando. Puedes probar seleccionando otra opción arriba cuando guste, ¡pero aquí estoy yo cuidándote! 🚀💖`,
        `Vaya, vaya... parece que ${modelDisplay} hizo "puf" y falló, {nick}. 🤭 Ay, me siento un poquito culpable por quitarle el puesto tan rápido, ¡pero alguien tenía que salvar el día! Te pasé a mi sección local automática. Si lo prefieres, más tarde puedes reintentar con las demás IAs. ¡Te quiero! 🌸`
    ];

    const selectedError = errors[Math.floor(Math.random() * errors.length)];
    return selectedError.replace(/{nick}/g, nick);
}
