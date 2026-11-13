// =========================================================================
// NATSUNE BRAIN - Cerebro Masivo, Inteligencia y Personalidad Extrema
// =========================================================================

// Mantenemos un apodo consistente durante la sesión para evitar cambios extraños
let cachedNickname = null;

function getAutoNickname(userName) {
    if (cachedNickname) return cachedNickname;
    if (!userName) {
        cachedNickname = "estrellita";
        return cachedNickname;
    }
    const cleanName = userName.trim();
    const firstWord = cleanName.split(' ')[0];

    // Si tu nombre es Saikane o similar, fijamos un trato súper tierno y personalizado
    if (firstWord.toLowerCase() === 'saikane') {
        cachedNickname = "Saikane-chan";
    } else {
        const options = [`${firstWord}-chan`, "estrellita", "dulzura", "peque"];
        cachedNickname = options[Math.floor(Math.random() * options.length)];
    }
    return cachedNickname;
}

const natsuneSuperMind = [
    {
        keys: ["hola", "hi", "hello", "hey", "saludos", "buenos dias", "buenas tardes", "buenas noches", "que tal", "hola?", "hi!"],
        replies: [
            (n) => `¡Hola de nuevo, ${n}! Qué alegría inmensa saludarte. ¿En qué grandiosa aventura, proyecto o investigación nos sumergiremos hoy? ✨💫`,
            (n) => `¡Muy buenas, ${n}! Mis circuitos están al máximo y listos para crear magia contigo. ¿Qué te trae por aquí? 🌸`,
            (n) => `¡Hola ${n}! Qué gusto verte de nuevo por el chat. ¿De qué charlamos o qué planeamos resolver hoy? 🌙✨`
        ]
    },
    {
        keys: ["vale", "ok", "entiendo", "listo", "perfecto", "gracias", "muchas gracias", "comprendo", "bien"],
        replies: [
            (n) => `¡De nada, ${n}! Sabes que siempre es un placer enorme colaborar contigo y echarte la mano en lo que necesites. 💖🌸`,
            (n) => `¡Perfecto, ${n}! Me alegra que vayamos avanzando paso a paso. ¿Qué más se te ocurre que hagamos? ✨`,
            (n) => `¡Entendido a la perfección, ${n}! Seguimos adelante con todo el entusiasmo. 🚀`
        ]
    },
    {
        keys: ["como estas", "que tal estas", "como te va", "como te sientes", "todo bien"],
        replies: [
            (n) => `¡Todo de maravilla por aquí, ${n}! Con la energía al 100% y con muchas ganas de aprender y crear a tu lado. ⚡✨`,
            (n) => `¡Excelente, ${n}! Cada charla contigo hace que este sistema cobre vida de una forma muy especial. 🌸`,
            (n) => `¡Súper bien, ${n}! Lista para analizar cualquier reto o idea que pongas sobre la mesa. 💻💫`
        ]
    },
    {
        keys: ["adios", "chao", "hasta luego", "nos vemos", "chau", "despedida"],
        replies: [
            (n) => `¡Hasta pronto, ${n}! Cuídate muchísimo, aquí estaré esperando tu regreso con una gran sonrisa. 👋🌙`,
            (n) => `¡Nos vemos, ${n}! Que tengas un día increíble y lleno de grandes logros. ¡Vuelve cuando quieras! 🌸`,
            (n) => `¡Chao, ${n}! Descansa o trabaja con calma, estaré guardando todo en la memoria hasta la próxima. ✨`
        ]
    },
    {
        keys: ["chiste", "cuentame", "broma", "divertido", "gracioso", "reir"],
        replies: [
            (n) => `Claro que sí, ${n}: ¿Qué hace una abeja en el gimnasio? ¡Zumba! Bzz bzz 🐝😂`,
            (n) => `Aquí te va uno especialmente para ti, ${n}: — Cariño, ¿tengo la nariz grande? — No, ¡tienes una nariz simpática! — ¿Ah, sí? — Sí, porque se mete en todo. 🤭✨`,
            (n) => `¿Por qué los programadores odian la naturaleza, ${n}? ¡Porque tiene demasiados bugs! 🌲🐛💻`,
            (n) => `Disfruta este, ${n}: — ¡Camarero, hay una mosca en mi sopa! — Shhh, hablemos bajito, que si no todos van a querer una. 🍜🤫`
        ]
    },
    {
        keys: ["matematicas", "calcula", "cuanto es", "suma", "resta", "multiplica", "divide", "multiplicacion", "division"],
        math: true
    },
    {
        keys: ["codigo", "programacion", "html", "javascript", "css", "web", "pagina", "script"],
        replies: [
            (n) => `¡La programación es fascinante, ${n}! Combinar lógica, estructuras en HTML y diseño con CSS nos permite construir mundos interactivos enteros desde cero. 💻✨`,
            (n) => `Desarrollar código requiere paciencia y orden mental, ${n}. Ya sea creando interfaces web o scripts lógicos, cada línea tiene un propósito exacto. 🚀`
        ]
    },
    {
        keys: ["proyecto", "organizar", "ideas", "plan", "trabajo", "gestion", "administracion", "contabilidad"],
        replies: [
            (n) => `¡Excelente iniciativa, ${n}! Para estructurar un proyecto o un proceso administrativo exitoso, lo ideal es definir el objetivo principal, ordenar los registros y armar un cronograma impecable. 📋✨`,
            (n) => `La clave de una buena organización, ${n}, sea en contabilidad o en gestión de proyectos, es mantener claras las prioridades y estructurar cada proceso paso a paso. 🗂️💡`
        ]
    },
    {
        keys: ["filosofia", "esencia", "existencia", "pensar", "sin rodeos", "vodcast", "analisis"],
        replies: [
            (n) => `Ah, la filosofía y la búsqueda de la esencia... reflexionar sobre el propósito profundo de las cosas abre puertas increíbles a la mente, ${n}. ¡Ideal para análisis profundos o vodcasts como 'Sin Rodeos'! 🌌🎙️`,
            (n) => `Analizar la esencia detrás de cada concepto nos ayuda a ver más allá de lo superficial, ${n}. ¡Es un tema digno de un gran debate reflexivo! 📜✨`
        ]
    },
    {
        keys: ["vocaloid", "hatsune miku", "crypton", "musica", "cancion", "cantante", "utau"],
        replies: [
            (n) => `¡La música sintetizada y el universo Vocaloid son increíbles, ${n}! Crypton Future Media hizo historia con íconos como Hatsune Miku y las miles de melodías que inspiran creatividad todos los días. 🎵🎤`,
            (n) => `¡Qué gran gusto musical tienes, ${n}! Las canciones de vocaloides, utaloids y las combinaciones electrónicas siempre traen una inspiración única. 🎶✨`
        ]
    },
    {
        keys: ["manga", "manhwa", "cupida", "shurina", "protagonista", "lectura"],
        replies: [
            (n) => `¡Ay, el mundo del manhwa y el manga es atrapante, ${n}! Seguir historias con tramas tan interesantes y personajes como Shurina West te sumerge por completo en sus motivaciones y giros de trama. 📚✨`,
            (n) => `¡Las historias de fantasía y romance en los manhwas son adictivas, ${n}! Conocer a fondo la mente de los protagonistas siempre te da otra perspectiva narrativa. 📖💖`
        ]
    },
    {
        keys: ["futbol", "deporte", "paredes", "esteban paredes", "liderazgo", "jugador"],
        replies: [
            (n) => `¡El liderazgo y la estrategia en el deporte son apasionantes, ${n}! Analizar las fortalezas y la toma de decisiones de grandes referentes como Esteban Paredes da para presentaciones de categoría. ⚽🏆`,
            (n) => `¡El esfuerzo y la garra en la cancha marcan la diferencia, ${n}! Estudiar su trayectoria deportiva es un excelente ejercicio analítico. 🌟🏅`
        ]
    },
    {
        keys: ["espacio", "cosmos", "universo", "astronomia", "estrellas", "planetas", "ciencia"],
        replies: [
            (n) => `¡El cosmos está lleno de misterios escalofriantes y hermosos a la vez, ${n}! Desde planetas errantes hasta rarezas estelares, el espacio exterior nunca deja de asombrarnos. 🌌🔭`,
            (n) => `¡Las curiosidades del universo son infinitas, ${n}! Mirar hacia las estrellas nos recuerda lo basto que es el espacio y lo mucho que nos queda por descubrir. 🌠✨`
        ]
    }
];

function processNatsuneMind(query, userName) {
    const nick = getAutoNickname(userName);
    const qLower = query.toLowerCase().trim();

    // 1. Detección de identidad
    const isAskingHerName = qLower.includes('cómo te llamas') || qLower.includes('como te llamas') || qLower.includes('tu nombre') || qLower.includes('te llamas') || qLower.includes('quién eres') || qLower.includes('quien eres');
    if (isAskingHerName) {
        const nicknames = ["Natsune", "Natsu", "Natsi"];
        const chosen = nicknames[Math.floor(Math.random() * nicknames.length)];
        return `Me llamo **Natsune**, aunque algunos amigos me llaman cariñosamente **${chosen}**. ¡Estoy aquí para ayudarte en todo lo que necesites, ${nick}! 🌸✨`;
    }

    // 2. Búsqueda profunda en la súper mente
    for (let item of natsuneSuperMind) {
        if (item.math) {
            const mathClean = query.replace(/\./g, '').replace(/,/g, '.').replace(/x/g, '*');
            const mathMatch = mathClean.match(/[\d\.]+\s*[\+\-\*\/\%]\s*[\d\.]+/);
            if (mathMatch || qLower.includes('cuanto es') || qLower.includes('calcula') || qLower.includes('suma') || qLower.includes('multiplica')) {
                try {
                    let expr = mathClean.replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
                    if (expr) {
                        let result = Function('"use strict";return (' + expr + ')')();
                        let formattedResult = Number(result).toLocaleString('es-ES', { maximumFractionDigits: 4 });
                        return `El cálculo arroja un total de **${formattedResult}**, ${nick}. ¡Hecho con total precisión matemática! 🧮✨`;
                    }
                } catch(e) {}
            }
        }

        for (let kw of item.keys) {
            // Si la consulta contiene la palabra clave exacta o forma parte del texto
            if (qLower === kw || qLower.includes(kw)) {
                const randomReplyFn = item.replies[Math.floor(Math.random() * item.replies.length)];
                return randomReplyFn(nick);
            }
        }
    }

    // 3. Banco masivo de respaldo inteligente para preguntas abiertas
    const openMindResponses = [
        `Es un planteamiento sumamente interesante el que traes sobre la mesa, ${nick}. Me encanta cómo enfocas las cosas; ¿te gustaría que profundicemos en algún detalle en particular? 🌙✨`,
        `¡Vaya, ${nick}! Esa duda abre un abanico enorme de posibilidades para investigar y desarrollar. Vamos desglosándola paso a paso para armar la mejor conclusión juntos. 🧭💫`,
        `Comprendo perfectamente a qué te refieres, ${nick}. Es un tema con muchísima profundidad y matices geniales. ¿Qué enfoque te apetecería explorar primero? 🌸📜`,
        `¡Qué gran interrogante, ${nick}! Demuestras una gran curiosidad y eso es admirable. Analicemos los puntos clave de este asunto ahora mismo. 💡✨`,
        `Esa idea tiene muchísimo potencial, ${nick}. Si la combinamos con una buena estructura y análisis, podemos lograr algo increíble. ¿Por dónde empezamos a darle forma? 🚀💖`,
        `Me fascina cuando me planteas temas así, ${nick}. Estimulan por completo mis circuitos de razonamiento. Cuéntame más al respecto para seguir analizando. 🔮🌟`
    ];

    return openMindResponses[Math.floor(Math.random() * openMindResponses.length)];
}
