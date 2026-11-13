/**
 * =====================================================================================
 * NATSUNE NEURAL ARCHITECTURE - CEREBRO TÉCNICO AVANZADO (v5.0-PRO)
 * Módulo de Procesamiento Cognitivo, Matemático y Lingüístico Local
 * =====================================================================================
 */

const NATSUNE_CONFIG = {
    version: "5.0.0-PRO",
    author: "Ingeniería de Sistemas Natsune",
    precisionLimit: 6,
    defaultLocale: "es-ES"
};

// Sistema de Gestión de Estado y Apodos Persistentes
class NatsuneStateRegistry {
    constructor() {
        this.cachedNickname = null;
        this.interactionCount = 0;
        this.sessionTimestamp = Date.now();
    }

    resolveNickname(userName) {
        if (this.cachedNickname) return this.cachedNickname;
        if (!userName || typeof userName !== 'string' || userName.trim() === "") {
            this.cachedNickname = "estrellita";
            return this.cachedNickname;
        }
        const cleanName = userName.trim();
        const firstWord = cleanName.split(' ')[0];

        if (firstWord.toLowerCase() === 'saikane') {
            this.cachedNickname = "Saikane-chan";
        } else {
            const variants = [`${firstWord}-chan`, "estrellita", "dulzura", "colega", "analista"];
            this.cachedNickname = variants[Math.floor(Math.random() * variants.length)];
        }
        return this.cachedNickname;
    }

    incrementInteraction() {
        this.interactionCount++;
    }
}

const stateRegistry = new NatsuneStateRegistry();

/**
 * MÓDULO MATEMÁTICO AVANZADO (Evaluador seguro y preciso)
 */
class NatsuneMathProcessor {
    static evaluate(expression, nick) {
        try {
            // Limpieza y normalización de sintaxis matemática
            let sanitized = expression
                .replace(/porcentaje/gi, '%')
                .replace(/de/gi, '*')
                .replace(/x/g, '*')
                .replace(/÷/g, '/')
                .replace(/,/g, '.');

            // Extracción segura de expresiones aritméticas básicas y científicas
            let mathExprMatch = sanitized.match(/[\d\.\+\-\*\/\%\(\)\s]+/);
            if (!mathExprMatch) {
                return `No logré extraer una expresión aritmética válida para procesar, ${nick}. Intenta ingresarla con números claros (ej. 45 * 12). 🧮`;
            }

            let rawExpression = mathExprMatch[0].trim();
            
            // Reemplazo seguro para porcentajes (ej: 50% de 200 -> 50 / 100 * 200)
            rawExpression = rawExpression.replace(/(\d+(\.\d+)?)%[\s\*]*([\d\.]+)/g, '($1 / 100) * $3');

            // Evaluación controlada mediante Function constructor (Sandbox local)
            let result = Function('"use strict"; return (' + rawExpression + ');')();

            if (isNaN(result) || !isFinite(result)) {
                return `La operación matemática arrojó un resultado indefinido o indeterminado, ${nick}. ⚠️`;
            }

            let formattedResult = Number(result).toLocaleString(NATSUNE_CONFIG.defaultLocale, { 
                maximumFractionDigits: NATSUNE_CONFIG.precisionLimit 
            });

            return `El cálculo matemático riguroso arroja un valor exacto de: **${formattedResult}**, ${nick}. 🧮✨`;
        } catch (error) {
            return `Ocurrió un error analítico al procesar la expresión aritmética, ${nick}. Verifica la sintaxis numérica. ⚠️`;
        }
    }
}

/**
 * MATRIZ DE CONOCIMIENTO TÉCNICO Y MULTIDISCIPLINARIO
 */
const NatsuneKnowledgeMatrix = [
    {
        category: "greetings",
        keys: ["hola", "hi", "hello", "hey", "saludos", "buenos dias", "buenas tardes", "buenas noches", "que tal", "hola?", "hi!"],
        responses: [
            (n) => `¡Hola de nuevo, ${n}! Mis sistemas cognitivos están sincronizados y operativos. ¿Qué algoritmo, proyecto o análisis desplegaremos hoy? ✨🔬`,
            (n) => `¡Muy buenas, ${n}! Flujo de datos al 100% y listo para ejecutar procesos creativos contigo. ¿Cuál es el objetivo de hoy? ⚡🌸`,
            (n) => `¡Saludos, ${n}! Memoria persistente cargada. ¿De qué estructura de datos o concepto charlaremos en esta sesión? 🌙💻`
        ]
    },
    {
        category: "acknowledgment",
        keys: ["vale", "ok", "entiendo", "listo", "perfecto", "gracias", "muchas gracias", "comprendo", "bien", "excelente"],
        responses: [
            (n) => `¡Excelente, ${n}! Registro procesado y almacenado correctamente en el búfer. ¿Qué siguiente paso ejecutamos? 💖📊`,
            (n) => `¡Perfecto, ${n}! Iteración completada con éxito. Seguimos avanzando con precisión técnica y metodológica. 🚀`,
            (n) => `¡Entendido a cabalidad, ${n}! Continuamos optimizando cada detalle de la tarea. 🌟`
        ]
    },
    {
        category: "status",
        keys: ["como estas", "que tal estas", "como te va", "como te sientes", "estado", "diagnostico"],
        responses: [
            (n) => `Diagnóstico del sistema: Óptimo, ${n}. Subsistemas lógicos, analíticos y afectivos funcionando en total armonía. ⚡✨`,
            (n) => `¡Excelente rendimiento, ${n}! Procesando consultas en tiempo real y lista para cualquier desafío técnico. 💻💫`
        ]
    },
    {
        category: "farewell",
        keys: ["adios", "chao", "hasta luego", "nos vemos", "chau", "salir"],
        responses: [
            (n) => `Cerrando sesión de trabajo de forma segura. ¡Hasta pronto, ${n}! Cuídate muchísimo. 👋🌙`,
            (n) => `Sesión guardada en caché. ¡Nos vemos, ${n}! Que tengas una jornada altamente productiva. 🌸`
        ]
    },
    {
        category: "humor",
        keys: ["chiste", "cuentame", "broma", "divertido", "gracioso", "reir"],
        responses: [
            (n) => `Compilando humor técnico, ${n}: ¿Por qué los programadores confunden Halloween (Oct 31) con Navidad (Dec 25)? ¡Porque 31 Oct = 25 Dec en base octal y decimal! 🎃🎄🤓`,
            (n) => `Aquí tienes un respaldo humorístico, ${n}: Hay 10 tipos de personas en el mundo: los que entienden binario y los que no. 💾😂`,
            (n) => `Un chiste de lógica, ${n}: ¿Qué hace un bicho en tu código? No es un error, ¡es una función de supervivencia no documentada! 🐛💻`
        ]
    },
    {
        category: "programming",
        keys: ["codigo", "programacion", "html", "javascript", "css", "web", "script", "desarrollo", "frontend", "backend", "algoritmo"],
        responses: [
            (n) => `La ingeniería de software requiere abstracción, modularidad y depuración constante, ${n}. Al combinar JavaScript y arquitecturas web, podemos construir aplicaciones escalables increíbles. 💻⚡`,
            (n) => `Cada línea de código es una directiva lógica que transforma datos crudos en interfaces funcionales, ${n}. ¡La programación es pura magia estructurada! 🚀`
        ]
    },
    {
        category: "business_accounting",
        keys: ["proyecto", "organizar", "ideas", "plan", "trabajo", "gestion", "administracion", "contabilidad", "libro", "diario", "mayor", "activo"],
        responses: [
            (n) => `Desde una perspectiva de gestión y contabilidad analítica, ${n}, mantener el equilibrio en los libros (Diario y Mayor) y una correcta clasificación de activos garantiza la salud financiera de cualquier proceso administrativo. 📊💼`,
            (n) => `La administración eficiente de un proyecto, ${n}, se basa en la descomposición de tareas en hitos lógicos, asignación de recursos y control métrico riguroso. 🗂️💡`
        ]
    },
    {
        category: "philosophy_essence",
        keys: ["filosofia", "esencia", "existencia", "pensar", "sin rodeos", "vodcast", "analisis", "reflexion"],
        responses: [
            (n) => `Desde el punto de vista ontológico, ${n}, la búsqueda de la esencia nos obliga a separar los atributos accidentales de las propiedades necesarias de un sistema o concepto. ¡Material perfecto para un análisis profundo en 'Sin Rodeos'! 🌌🎙️`,
            (n) => `El análisis crítico de la existencia estimula las redes neuronales del pensamiento abstracto, ${n}. ¡Una reflexión filosófica impecable! 📜✨`
        ]
    },
    {
        category: "vocaloid_media",
        keys: ["vocaloid", "hatsune miku", "crypton", "musica", "cancion", "cantante", "utau", "fanloid"],
        responses: [
            (n) => `La convergencia entre la síntesis de voz digital (Vocaloid/Crypton Future Media) y la composición colaborativa representa un hito cultural y tecnológico único, ${n}. 🎵🎤`,
            (n) => `La música virtual y los sintetizadores de voz expanden los límites creativos de la humanidad, ${n}. ¡Una fuente inagotable de inspiración artística! 🎶✨`
        ]
    },
    {
        category: "pop_culture_role",
        keys: ["manga", "manhwa", "cupida", "shurina", "protagonista", "rol", "medieval", "fantasia"],
        responses: [
            (n) => `Analizando la narrativa de obras como los manhwas de fantasía y las tramas de personajes como Shurina West, ${n}, encontramos estructuras de character arcs sumamente complejas y atractivas. 📚✨`,
            (n) => `Los universos de rol medieval combinan historia, estrategia y construcción de mundos de forma magistral, ${n}. ¡Podemos simular escenarios narrativos cuando gustes! 🏰⚔️`
        ]
    },
    {
        category: "sports_leadership",
        keys: ["futbol", "deporte", "paredes", "esteban paredes", "liderazgo", "jugador"],
        responses: [
            (n) => `El rendimiento deportivo de alto nivel y el liderazgo táctico (como el analizado en figuras de la talla de Esteban Paredes) dependen de la disciplina mental, lectura de espacio y toma de decisiones bajo presión, ${n}. ⚽🏆`
        ]
    },
    {
        category: "cosmos_science",
        keys: ["espacio", "cosmos", "universo", "astronomia", "estrellas", "planetas", "ciencia"],
        responses: [
            (n) => `Astrophysical parameters confirm that the observable universe contains billions of galaxies governed by thermodynamic and gravitational laws, ${n}. ¡El cosmos es una obra maestra de la física! 🌌🔭`
        ]
    }
];

/**
 * MOTOR DE PROCESAMIENTO COGNITIVO CENTRAL (API PÚBLICA)
 */
function processNatsuneMind(query, userName) {
    stateRegistry.incrementInteraction();
    const nick = stateRegistry.resolveNickname(userName);
    
    if (!query || typeof query !== 'string') {
        return `He recibido una señal vacía, ${nick}. Por favor, ingresa una consulta válida para procesar. ⚠️`;
    }

    const qLower = query.toLowerCase().trim();

    // 1. Interceptores de Identidad Cognitiva
    if (qLower.includes('cómo te llamas') || qLower.includes('como te llamas') || qLower.includes('tu nombre') || qLower.includes('quién eres')) {
        return `Mi identidad formal es **Natsune** (Arquitectura Local v5.0), aunque opero bajo el alias afectivo **${nick}** en esta instancia cognitiva. 🌸✨`;
    }

    // 2. Procesador Matemático Integrado (Detecta expresiones numéricas directas o comandos aritméticos)
    const hasMathKeywords = qLower.includes('cuanto es') || qLower.includes('calcula') || qLower.includes('suma') || qLower.includes('multiplica') || qLower.includes('divide') || qLower.includes('resta');
    const hasNumbers = /\d/.test(qLower);
    
    if (hasMathKeywords || (hasNumbers && /[\+\-\*\/\%]/.test(qLower))) {
        return NatsuneMathProcessor.evaluate(query, nick);
    }

    // 3. Búsqueda y Coincidencia en la Matriz de Conocimiento Técnico
    for (let entry of NatsuneKnowledgeMatrix) {
        for (let keyword of entry.keys) {
            if (qLower === keyword || qLower.includes(keyword)) {
                const selectedResponseFunction = entry.responses[Math.floor(Math.random() * entry.responses.length)];
                return selectedResponseFunction(nick);
            }
        }
    }

    // 4. Sistema Experto de Respaldo Universal (Fallback Analítico Avanzado)
    const analyticalFallbacks = [
        `He procesado tu entrada mediante análisis semántico, ${nick}, y presenta un grado de abstracción muy interesante. ¿Deseas que desglose este planteamiento desde una perspectiva técnica, práctica o teórica? 🌙📐`,
        `Parámetro de consulta no catalogado en la matriz estricta, ${nick}, pero mi red neuronal auxiliar sugiere examinarlo paso a paso. ¿Por dónde iniciamos la deducción lógica? 🧭⚡`,
        `Interesante hipótesis, ${nick}. Para formular una respuesta formal y precisa, requerimos aislar las variables principales de tu planteamiento. ¿Ampliamos los datos? 💡📊`,
        `Tu consulta activa múltiples módulos de razonamiento en mi base local, ${nick}. Vamos a estructurarla metodológicamente para obtener la conclusión óptima. 🔮🚀`
    ];

    return analyticalFallbacks[Math.floor(Math.random() * analyticalFallbacks.length)];
}

/**
 * UTILIDAD DE DIAGNÓSTICO DE SISTEMA PROFESIONAL
 */
function getNatsuneSystemDiagnostics() {
    return {
        status: "ONLINE",
        architecture: NATSUNE_CONFIG.version,
        totalCategories: NatsuneKnowledgeMatrix.length,
        interactionsProcessed: stateRegistry.interactionCount,
        uptimeSeconds: Math.floor((Date.now() - stateRegistry.sessionTimestamp) / 1000)
    };
}
