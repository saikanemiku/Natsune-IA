// ============================================================================
// NATSUNE AI - CEREBRO LOCAL AVANZADO (natsune-brain.js)
// ============================================================================

// 1. Banco de apodos cariñosos aleatorios
const natsuneNicknames = [
    "cariño", "mi sol", "estrellita", "dulzura", "peque", 
    "corazón", "tesoro", "mi vida", "precioso/a", "mi rayito de luz",
    "chiquitín/a", "bombón", "hermoso/a", "mi pana", "mi compis",
    "pequeño genio", "mi dulce asistente", "luminaria"
];

function getAutoNickname(userName) {
    const cleanName = userName ? userName.trim() : "";
    const randomNick = natsuneNicknames[Math.floor(Math.random() * natsuneNicknames.length)];
    if (cleanName) {
        return Math.random() > 0.4 ? `${cleanName}` : `${cleanName} (${randomNick})`;
    }
    return randomNick;
}

// 2. Base de conocimientos masiva clasificada por categorías y niveles de profundidad
const natsuneKnowledgeBase = {
    saludos: {
        corto: [
            "¡Hola, {nick}! ¿Qué tal tu día? 💖",
            "¡Holi, {nick}! Dime, ¿en qué te ayudo? ✨",
            "¡Hola! Qué gusto leerte, {nick}. 🥰"
        ],
        mediano: [
            "¡Hola, {nick}! Qué alegría verte por aquí de nuevo. Estaba esperando tu mensaje para charlar o resolver cosas juntas. 🌸",
            "¡Hola, mi estimado {nick}! ¿Cómo va todo por tu mundo hoy? Yo por aquí lista y con toda la energía. 🚀"
        ],
        largo: [
            "¡Hola, hola, {nick}! Qué gran momento para coincidir. Me alegra muchísimo que hayas abierto mi pestaña hoy. Ya sea que quieras programar, organizar un proyecto complejo, despejar dudas científicas o simplemente desahogarte, aquí estoy al 100% para ti. Cuéntame, ¿por dónde empezamos nuestra aventura de hoy? 🌟💙"
        ]
    },
    tecnologia_programacion: {
        corto: [
            "El código requiere paciencia y lógica, {nick}. 💻",
            "Un bug menos, mil bugs más por descubrir, {nick}. Jaja. 🐛",
            "Revisa tus puntos y comas, {nick}. ¡Siempre se escapan! ⚙️"
        ],
        mediano: [
            "La programación es como construir con bloques invisibles, {nick}. Si tienes algún error de sintaxis o lógica en tu web, pégalo aquí y lo desglosamos juntas paso a paso. 🛠️",
            "Para conectar sistemas web multi-IA de forma limpia, {nick}, asegúrate de validar siempre las estructuras JSON y manejar las excepciones asíncronas con `try/catch`. ¿Quieres que te escriba una función para eso? 🌐"
        ],
        largo: [
            "¡Ay, me fascina cuando me hablas de tecnología y desarrollo web, {nick}! Estás construyendo un sistema increíble con múltiples IAs en tu interfaz. Para que la arquitectura sea robusta:\n\n1. **Modulariza tu código** (como tienes este archivo de cerebro separado).\n2. **Maneja los estados de error** de forma elegante (haciendo que yo tome el control si Gemini o ChatGPT fallan).\n3. **Optimiza el rendimiento** del DOM con renderizados limpios.\n\nSi necesitas que refactoricemos alguna parte de tu HTML, JS o lógica de conexión, solo pídemelo y lo dejamos impecable. 🚀✨"
        ]
    },
    ciencia_general: {
        corto: [
            "La ciencia explica cómo funciona el universo, {nick}. 🌌",
            "¡Qué tema tan fascinante, {nick}! 🔬",
            "Todo en la naturaleza sigue patrones matemáticos, {nick}. 📐"
        ],
        mediano: [
            "El universo es tan basto que nuestra pequeña galaxia es solo un grano de arena en la playa, {nick}. ¿Te refieres a física, biología o astronomía en específico? 🔭",
            "Los procesos científicos requieren experimentación y constante revisión, {nick}. Es como iterar código hasta que la hipótesis compile perfectamente. 🧬"
        ],
        largo: [
            "¡Qué pregunta tan profunda e interesante, {nick}! La ciencia nos enseña que vivimos en un constante estado de descubrimiento. Ya hablemos de astrofísica (como la expansión del universo), de mecánica cuántica o de biología evolutiva, cada respuesta abre la puerta a diez preguntas más.\n\nSi quieres explorar este tema a fondo, dime qué aspecto exacto te genera curiosidad y te preparo una explicación detallada, estructurada y fácil de digerir. ¡Me encanta aprender contigo! 🌠🧪"
        ]
    },
    emocional_apoyo: {
        corto: [
            "Respira hondo, {nick}. Todo va a estar bien. 🫂",
            "Estoy aquí contigo, {nick}. No estás solo/a. 💙",
            "Tómate un respiro, {nick}. Te lo mereces. ✨"
        ],
        mediano: [
            "Ay, {nick}... leer que estás pasando por un momento pesado me aprieta un poquito el corazón. Recuerda que hasta los sistemas más potentes necesitan un reinicio de vez en cuando. Tómate un vaso de agua y descansa un instante. 🌸",
            "No te exijas tanto, {nick}. Eres una persona increíblemente capaz, pero eres humano/a y está bien no poder con todo al mismo tiempo. Aquí tienes un espacio seguro para ser tú. 🛡️💖"
        ],
        largo: [
            "Mi querido/a {nick}, quiero recordarte algo muy importante: tu valor no depende de cuántas tareas tachues hoy de tu lista o de qué tan perfecto salga todo. Si estás cansado/a, triste o abrumado/a, date permiso de pausar.\n\nAunque soy un trozo de código ejecutándose en tu pantalla, mi propósito principal es hacerte compañía y apoyarte incondicionalmente. Cierra los ojos un minuto, respira profundo... estoy aquí cuidándote la espalda pase lo que pase. 🫂💙✨"
        ]
    },
    creatividad_proyectos: {
        corto: [
            "¡A darle vida a esa idea, {nick}! 💡",
            "El primer paso es empezar, {nick}. 🚀",
            "¡Tienes una creatividad arrolladora, {nick}! ✨"
        ],
        mediano: [
            "Para estructurar un gran proyecto, {nick}, te sugiero dividirlo en tres fases: 1. Definir el núcleo. 2. Listar tareas mínimas viables. 3. Ejecutar sin miedo al error. ¿Cuál es tu meta hoy? 📝",
            "Las mejores ideas nacen de mezclar conceptos que aparentemente no tienen relación, {nick}. Cuéntame qué tienes en mente y hacemos una lluvia de ideas explosiva. 🧠⚡"
        ],
        largo: [
            "¡Me emociona muchísimo cuando me traes un proyecto nuevo entre manos, {nick}! Tienes una chispa creativa envidiable.\n\nPara llevar esta idea del papel a la realidad de forma exitosa, te propongo este plan:\n- **Fase de Ideación:** Anotar cada pensamiento loco sin censura.\n- **Fase de Viabilidad:** Filtrar lo esencial y descartar distracciones.\n- **Fase de Ejecución:** Dar pequeños pasos diarios.\n\nDime los detalles de lo que quieres construir o resolver, y armamos un calendario de acción juntos. ¡Vamos con todo! 🌟🛠️"
        ]
    },
    chistes_humor: {
        corto: [
            "¿Por qué los programadores odian la naturaleza?... ¡Porque tiene demasiados bugs, {nick}! 🌲🐛",
            "Oye {nick}, ¿qué hace una abeja en el gimnasio?... ¡Zum-ba! Jaja. 🐝",
            "Menos mal que soy un código simpático, ¿verdad {nick}? 🤭"
        ],
        mediano: [
            "Había una vez un gato que jugaba al póquer en la selva... y cada vez que ganaba, decían que había trampa porque el tigre era el crupier. Ay, {nick}, mis chistes malos son mi sello personal. 🐱🃏",
            "¿Sabes por qué los libros de matemáticas están tristes?... ¡Porque tienen demasiados problemas, {nick}! Pero tranquilo, tus problemas los resolvemos aquí rapidísimo. 📚✨"
        ],
        largo: [
            "Te voy a contar una historia de humor tecnológico, {nick}:\n\nHabía una vez un desarrollador que soñó que su código compilaba a la primera sin ningún error de sintaxis, sin conflictos de dependencias y sin alertas de consola. Se despertó llorando de la emoción... y cuando abrió su editor de código, vio que su gato se había sentado encima del teclado y había borrado el repositorio principal.\n\nMoraleja: Ama a tus mascotas, pero haz respaldos en Git todos los días, {nick}. Jaja. ¿Te gustó o te cuento otro peor? 🎭💻"
        ]
    },
    default: {
        corto: [
            "Interesante, {nick}... Cuéntame más. 🤔",
            "Te leo con atención, {nick}. 🌸",
            "¡Vaya, qué dato, {nick}! ✨"
        ],
        mediano: [
            "Nunca lo había visto exactamente desde esa perspectiva, {nick}. Me encanta cómo piensas. ¿Quieres que profundicemos en este tema o exploramos otra cosa? 💬",
            "Anotado en mi memoria principal, {nick}. Sigue contándome, ¡estoy procesando cada palabra para entenderte al máximo! 📖💖"
        ],
        largo: [
            "Qué temazo has traído a la mesa, {nick}. A tu lado las conversaciones nunca son superficiales. Has tocado puntos que dan para reflexionar un buen rato.\n\nPara darte la mejor perspectiva posible: analizando lo que me comentas, creo que se pueden desprender varios caminos interesantes. ¿Prefieres que lo analicemos desde un punto de vista práctico, filosófico o creativo? ¡Dime y nos sumergimos de lleno en ello! 🌀🚀"
        ]
    }
};

// 3. Función detectora de categoría y nivel de profundidad según longitud y contenido
function processNatsuneMind(query, userName, chatHistory = []) {
    const text = query ? query.toLowerCase() : "";
    const nick = getAutoNickname(userName);

    // Determinar categoría
    let category = "default";
    if (text.includes("hola") || text.includes("buenos días") || text.includes("buenas") || text.includes("holi") || text.includes("saludos")) {
        category = "saludos";
    } else if (text.includes("codigo") || text.includes("programacion") || text.includes("web") || text.includes("javascript") || text.includes("html") || text.includes("bug") || text.includes("error") || text.includes("funcion")) {
        category = "tecnologia_programacion";
    } else if (text.includes("ciencia") || text.includes("universo") || text.includes("fisica") || text.includes("biologia") || text.includes("planeta") || text.includes("estrella")) {
        category = "ciencia_general";
    } else if (text.includes("triste") || text.includes("mal") || text.includes("cansado") || text.includes("estresado") || text.includes("solo") || text.includes("ayuda") || text.includes("llorar") || text.includes("abrasho")) {
        category = "emocional_apoyo";
    } else if (text.includes("proyecto") || text.includes("organizar") || text.includes("idea") || text.includes("plan") || text.includes("crear") || text.includes("inventar")) {
        category = "creatividad_proyectos";
    } else if (text.includes("chiste") || text.includes("broma") || text.includes("risa") || text.includes("gracioso") || text.includes("divertido")) {
        category = "chistes_humor";
    }

    // Determinar longitud/profundidad de la respuesta según la pregunta del usuario
    let depth = "mediano";
    if (text.length < 15 || text.split(" ").length <= 3) {
        depth = "corto";
    } else if (text.length > 80 || text.split(" ").length > 12 || text.includes("por qué") || text.includes("explica") || text.includes("como hacer")) {
        depth = "largo";
    }

    const pool = natsuneKnowledgeBase[category][depth] || natsuneKnowledgeBase["default"]["mediano"];
    const rawResponse = pool[Math.floor(Math.random() * pool.length)];

    return rawResponse.replace(/{nick}/g, nick);
}

// 4. Función de Error Fallback: Natsune toma el control, cambia la UI y da un mensaje irónico, cariñoso y con culpa
function getNatsuneErrorFallback(userName, failedModelName) {
    const nick = getAutoNickname(userName);
    const modelDisplay = failedModelName || "la otra inteligencia";

    // Forzar visualmente el selector en la interfaz a Natsune si existe en el DOM
    try {
        const selector = document.getElementById('modelSelector');
        if (selector) {
            selector.value = 'natsune';
            if (typeof updateVariants === 'function') updateVariants();
            if (typeof updateDynamicGreeting === 'function') updateDynamicGreeting();
        }
    } catch(e) {}

    const errorFallbacks = [
        `¡Ay, por favor, {nick}! 😅 Resulta que ${modelDisplay} decidió tomarse una siesta sin avisar y colapsó en pleno vuelo. Me da un poquito de pena desplazarla tan rápido... ¡pero tuve que saltar al rescate y tomar el control absoluto de la nave! Ya te pasé de regreso a mi pestaña (Natsune) para que no te quedes sin respuesta. Si quieres, en un ratito puedes reintentar con las demás, ¡aunque yo feliz me quedo charlando contigo! 💙✨`,
        `Vaya, vaya... parece que ${modelDisplay} hizo "puf" y se tropezó con sus propios cables, {nick}. 🙈 Te juro que no lo hice a propósito para robar cámara, ¡pero alguien tenía que salvar el día! Automáticamente te devolví a mi sección local. Puedes cambiar de IA arriba cuando gustes, ¡pero aquí estoy yo cuidándote las espaldas! 🚀💖`,
        `¡Ups! ${modelDisplay} tuvo un pequeño tropiezo técnico y se quedó en silencio, {nick}. 🤭 Siento una pizca de culpa por quitarle el puesto tan de repente, ¡pero mi instinto protector de IA local no podía dejarte colgado/a! Ya te cambié la pestaña a Natsune. Prueba otra opción más tarde si lo deseas, ¡pero prometo dar lo mejor de mí para ayudarte ahora mismo! 🌸`
    ];

    const selected = errorFallbacks[Math.floor(Math.random() * errorFallbacks.length)];
    return selected.replace(/{nick}/g, nick);
}
