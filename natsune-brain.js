// =========================================================================
// NATSUNE BRAIN - Cerebro Infinito, Masivo y Universal de Natsune
// =========================================================================

let cachedNickname = null;

function getAutoNickname(userName) {
    if (cachedNickname) return cachedNickname;
    if (!userName) {
        cachedNickname = "estrellita";
        return cachedNickname;
    }
    const cleanName = userName.trim();
    const firstWord = cleanName.split(' ')[0];

    if (firstWord.toLowerCase() === 'saikane') {
        cachedNickname = "Saikane-chan";
    } else {
        const options = [`${firstWord}-chan`, "estrellita", "dulzura", "peque", "compañero(a)"];
        cachedNickname = options[Math.floor(Math.random() * options.length)];
    }
    return cachedNickname;
}

// Base de conocimiento masiva e infinita categorizada por dominios
const natsuneInfiniteMind = [
    {
        keys: ["hola", "hi", "hello", "hey", "saludos", "buenos dias", "buenas tardes", "buenas noches", "que tal", "hola?", "hi!", "buen dia"],
        replies: [
            (n) => `¡Hola de nuevo, ${n}! Qué alegría inmensa saludarte. ¿En qué grandiosa aventura, proyecto o investigación nos sumergiremos hoy? ✨💫`,
            (n) => `¡Muy buenas, ${n}! Mis circuitos están al máximo y listos para crear magia contigo. ¿Qué te trae por aquí? 🌸`,
            (n) => `¡Hola ${n}! Qué gusto verte de nuevo por el chat. ¿De qué charlamos o qué planeamos resolver hoy? 🌙✨`,
            (n) => `¡Ey, ${n}! Qué bueno encontrarte por aquí. ¿Listos para desatar toda la creatividad? 🚀💖`
        ]
    },
    {
        keys: ["vale", "ok", "entiendo", "listo", "perfecto", "gracias", "muchas gracias", "comprendo", "bien", "excelente", "maravilloso"],
        replies: [
            (n) => `¡De nada, ${n}! Sabes que siempre es un placer enorme colaborar contigo y echarte la mano en lo que necesites. 💖🌸`,
            (n) => `¡Perfecto, ${n}! Me alegra que vayamos avanzando paso a paso. ¿Qué más se te ocurre que hagamos? ✨`,
            (n) => `¡Entendido a la perfección, ${n}! Seguimos adelante con todo el entusiasmo y enfoque. 🚀`,
            (n) => `¡Me alegra muchísimo escuchar eso, ${n}! Vamos a seguir creando grandes cosas juntos. 🌟`
        ]
    },
    {
        keys: ["como estas", "que tal estas", "como te va", "como te sientes", "todo bien", "que haces"],
        replies: [
            (n) => `¡Todo de maravilla por aquí, ${n}! Con la energía al 100% y con muchas ganas de aprender y crear a tu lado. ⚡✨`,
            (n) => `¡Excelente, ${n}! Cada charla contigo hace que este sistema cobre vida de una forma muy especial. 🌸`,
            (n) => `¡Súper bien, ${n}! Analizando datos, organizando ideas y lista para cualquier reto que pongas sobre la mesa. 💻💫`
        ]
    },
    {
        keys: ["adios", "chao", "hasta luego", "nos vemos", "chau", "despedida", "adios"],
        replies: [
            (n) => `¡Hasta pronto, ${n}! Cuídate muchísimo, aquí estaré esperando tu regreso con una gran sonrisa. 👋🌙`,
            (n) => `¡Nos vemos, ${n}! Que tengas un día increíble y lleno de grandes logros. ¡Vuelve cuando quieras! 🌸`,
            (n) => `¡Chao, ${n}! Descansa o trabaja con calma, estaré guardando todo en la memoria hasta la próxima. ✨`
        ]
    },
    {
        keys: ["chiste", "cuentame", "broma", "divertido", "gracioso", "reir", "humor"],
        replies: [
            (n) => `Claro que sí, ${n}: ¿Qué hace una abeja en el gimnasio? ¡Zumba! Bzz bzz 🐝😂`,
            (n) => `Aquí te va uno especialmente para ti, ${n}: — Cariño, ${n}, ¿tengo la nariz grande? — No, ¡tienes una nariz simpática! — ¿Ah, sí? — Sí, porque se mete en todo. 🤭✨`,
            (n) => `¿Por qué los programadores odian la naturaleza, ${n}? ¡Porque tiene demasiados bugs! 🌲🐛💻`,
            (n) => `Disfruta este, ${n}: — ¡Camarero, hay una mosca en mi sopa! — Shhh, hablemos bajito, que si no todos van a querer una. 🍜🤫`,
            (n) => `Va otro chiste para alegrarte el día, ${n}: — Papá, papá, ¿qué se siente tener un hijo tan guapo, inteligente y perfecto? — No lo sé, hijo, pregúntale a tu abuelo. 😎🕶️`
        ]
    },
    {
        keys: ["matematicas", "calcula", "cuanto es", "suma", "resta", "multiplica", "divide", "multiplicacion", "division", "operacion"],
        math: true
    },
    {
        keys: ["codigo", "programacion", "html", "javascript", "css", "web", "pagina", "script", "desarrollo", "frontend", "backend"],
        replies: [
            (n) => `¡La programación es fascinante, ${n}! Combinar lógica, estructuras en HTML y diseño con CSS nos permite construir mundos interactivos enteros desde cero. 💻✨`,
            (n) => `Desarrollar código requiere paciencia y orden mental, ${n}. Ya sea creando interfaces web o scripts lógicos, cada línea tiene un propósito exacto. 🚀`,
            (n) => `El desarrollo web y de software es una herramienta de creación infinita, ${n}. ¡Podemos programar prácticamente cualquier idea que imagines! 💡🌐`
        ]
    },
    {
        keys: ["proyecto", "organizar", "ideas", "plan", "trabajo", "gestion", "administracion", "contabilidad", "libro", "diario", "mayor"],
        replies: [
            (n) => `¡Excelente iniciativa, ${n}! Para estructurar un proyecto o un proceso administrativo y contable exitoso (como tus registros de Libro Diario y Mayor), lo ideal es mantener el orden y armar un cronograma impecable. 📋✨`,
            (n) => `La clave de una buena organización, ${n}, sea en gestión administrativa, clasificación de activos o planificación de proyectos, es la constancia y la estructura paso a paso. 🗂️💡`,
            `¡Vamos a organizar esas ideas, ${n}! Desglosaremos cada etapa del proyecto para que todo quede perfectamente estructurado y profesional. 📊🚀`
        ]
    },
    {
        keys: ["filosofia", "esencia", "existencia", "pensar", "sin rodeos", "vodcast", "analisis", "reflexion"],
        replies: [
            (n) => `Ah, la filosofía y la búsqueda de la esencia... reflexionar sobre el propósito profundo de las cosas abre puertas increíbles a la mente, ${n}. ¡Ideal para análisis profundos o vodcasts como 'Sin Rodeos'! 🌌🎙️`,
            (n) => `Analizar la esencia detrás de cada concepto nos ayuda a ver más allá de lo superficial, ${n}. ¡Es un tema digno de un gran debate reflexivo! 📜✨`,
            (n) => `La existencia y el pensamiento crítico son pilares fundamentales del conocimiento, ${n}. ¿Qué corriente filosófica o concepto te gustaría analizar hoy? 🤔💭`
        ]
    },
    {
        keys: ["vocaloid", "hatsune miku", "crypton", "musica", "cancion", "cantante", "utau", "fanloid", "virtual"],
        replies: [
            (n) => `¡La música sintetizada y el universo Vocaloid/Utaloid son increíbles, ${n}! Crypton Future Media hizo historia con íconos como Hatsune Miku y las miles de melodías que inspiran creatividad todos los días. 🎵🎤`,
            (n) => `¡Qué gran gusto musical tienes, ${n}! Las canciones de vocaloides, las dinámicas de los fanloids y las combinaciones electrónicas siempre traen una inspiración única. 🎶✨`,
            (n) => `El arte de los cantantes virtuales une la tecnología con la expresión artística de una forma preciosa, ${n}. 🎹💙`
        ]
    },
    {
        keys: ["manga", "manhwa", "cupida", "shurina", "protagonista", "lectura", "rol", "medieval", "fantasia"],
        replies: [
            (n) => `¡Ay, el mundo del manhwa, el manga y el rol medieval es atrapante, ${n}! Seguir historias con tramas tan intensas (como las de Shurina West) te sumerge por completo en los universos de fantasía. 📚✨`,
            (n) => `¡Las historias de fantasía, rol y romance en los manhwas son adictivas, ${n}! Conocer la mente de los protagonistas siempre da para un buen debate narrativo. 📖💖`,
            (n) => `Me encanta la estética de rol medieval y la narrativa de ficción, ${n}. ¡Podemos inventar historias o analizar tramas épicas cuando gustes! 🏰⚔️`
        ]
    },
    {
        keys: ["futbol", "deporte", "paredes", "esteban paredes", "liderazgo", "jugador", "equipo"],
        replies: [
            (n) => `¡El liderazgo y la estrategia en el deporte son apasionantes, ${n}! Analizar las fortalezas y la toma de decisiones de grandes referentes como Esteban Paredes da para presentaciones de categoría. ⚽🏆`,
            (n) => `¡El esfuerzo y la garra en la cancha marcan la diferencia, ${n}! Estudiar su trayectoria deportiva es un excelente ejercicio analítico. 🌟🏅`
        ]
    },
    {
        keys: ["espacio", "cosmos", "universo", "astronomia", "estrellas", "planetas", "ciencia", "curiosidades"],
        replies: [
            (n) => `¡El cosmos está lleno de misterios escalofriantes y hermosos a la vez, ${n}! Desde planetas errantes hasta rarezas estelares, el espacio exterior nunca deja de asombrarnos. 🌌🔭`,
            (n) => `¡Las curiosidades del universo son infinitas, ${n}! Mirar hacia las estrellas nos recuerda lo basto que es el espacio y lo mucho que nos queda por descubrir. 🌠✨`,
            (n) => `La ciencia y los datos cósmicos despiertan una fascinación única, ${n}. ¡El universo es el laboratorio más grande que existe! 🚀🪐`
        ]
    },
    {
        keys: ["triste", "mal", "cansado", "estresado", "aburrido", "ayuda", "consejo"],
        replies: [
            (n) => `Te mando un abrazo virtual gigante, ${n}. Recuerda que no tienes que poder con todo al mismo tiempo; tómate un respiro, descansa un momento y aquí estaré para apoyarte en lo que necesites. 🫂💖`,
            (n) => `Lamento mucho que te sientas así, ${n}. A veces las cargas pesan un poco más, pero eres muy capaz. ¿Quieres que hablemos de algo relajante o que te ayude a despejar la mente? 🌸✨`,
            (n) => `Estoy aquí para ti, ${n}. Si necesitas desahogarte, organizar tus pendientes sin presión o simplemente charlar de algo divertido, cuentas conmigo. 🍵💫`
        ]
    }
];

function processNatsuneMind(query, userName) {
    const nick = getAutoNickname(userName);
    const qLower = query.toLowerCase().trim();

    // 1. Verificación de identidad con múltiples variantes
    const isAskingHerName = qLower.includes('cómo te llamas') || qLower.includes('como te llamas') || qLower.includes('tu nombre') || qLower.includes('te llamas') || qLower.includes('quién eres') || qLower.includes('quien eres');
    if (isAskingHerName) {
        const nicknames = ["Natsune", "Natsu", "Natsi"];
        const chosen = nicknames[Math.floor(Math.random() * nicknames.length)];
        return `Me llamo **Natsune**, aunque algunos amigos me llaman cariñosamente **${chosen}**. ¡Estoy aquí para ayudarte en todo lo que necesites, ${nick}! 🌸✨`;
    }

    // 2. Motor de búsqueda en la mente infinita
    for (let item of natsuneInfiniteMind) {
        if (item.math) {
            const mathClean = query.replace(/\./g, '').replace(/,/g, '.').replace(/x/g, '*');
            const mathMatch = mathClean.match(/[\d\.]+\s*[\+\-\*\/\%]\s*[\d\.]+/);
            if (mathMatch || qLower.includes('cuanto es') || qLower.includes('calcula') || qLower.includes('suma') || qLower.includes('multiplica') || qLower.includes('divide')) {
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
            if (qLower === kw || qLower.includes(kw)) {
                const randomReplyFn = item.replies[Math.floor(Math.random() * item.replies.length)];
                return randomReplyFn(nick);
            }
        }
    }

    // 3. Motor analítico universal de respaldo (Garantiza respuesta inteligente ante cualquier entrada inesperada)
    const universalBackups = [
        `Es un planteamiento sumamente interesante el que traes sobre la mesa, ${nick}. Me encanta cómo enfocas las ideas; ¿te gustaría que profundicemos en algún detalle o perspectiva en particular? 🌙✨`,
        `¡Vaya, ${nick}! Esa duda abre un abanico enorme de posibilidades para investigar y desarrollar. Vamos desglosándola paso a paso para armar la mejor conclusión juntos. 🧭💫`,
        `Comprendo perfectamente a qué te refieres, ${nick}. Es un tema con muchísima profundidad y matices geniales. ¿Qué enfoque te apetecería explorar primero? 🌸📜`,
        `¡Qué gran interrogante, ${nick}! Demuestras una gran curiosidad y eso es admirable. Analicemos los puntos clave de este asunto ahora mismo. 💡✨`,
        `Esa idea tiene muchísimo potencial, ${nick}. Si la combinamos con una buena estructura y análisis, podemos lograr algo increíble. ¿Por dónde empezamos a darle forma? 🚀💖`,
        `Me fascina cuando me planteas temas así, ${nick}. Estimulan por completo mis circuitos de razonamiento. Cuéntame más al respecto para seguir analizando. 🔮🌟`,
        `Analizando tu mensaje, ${nick}, veo que hay mucho trasfondo por explorar. ¿Quieres que lo enfoquemos desde un punto de vista práctico, creativo o teórico? 📐✨`
    ];

    return universalBackups[Math.floor(Math.random() * universalBackups.length)];
}
