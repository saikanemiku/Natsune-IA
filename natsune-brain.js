// ============================================================================
// NATSUNE AI - CEREBRO LOCAL AVANZADO (natsune-brain.js)
// Con Búsqueda Web en vivo y Resolución Matemática
// ============================================================================

const natsuneNicknames = [
    "cariño", "mi sol", "estrellita", "dulzura", "peque", 
    "corazón", "tesoro", "mi vida", "precioso/a", "mi rayito de luz",
    "chiquitín/a", "bombón", "hermoso/a", "mi pana", "mi compis"
];

function getAutoNickname(userName) {
    const cleanName = userName ? userName.trim() : "";
    const randomNick = natsuneNicknames[Math.floor(Math.random() * natsuneNicknames.length)];
    if (cleanName) {
        return Math.random() > 0.4 ? `${cleanName}` : `${cleanName} (${randomNick})`;
    }
    return randomNick;
}

// --- 1. MOTOR DE BÚSQUEDA WEB (Vía Wikipedia en Español) ---
async function searchWebNatsune(query) {
    try {
        const cleanQuery = encodeURIComponent(query.replace(/quién es|qué es|cuál es|busca|investiga sobre|información de/gi, "").trim());
        const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${cleanQuery}&format=json&origin=*`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.query && data.query.search && data.query.search.length > 0) {
            const bestMatch = data.query.search[0];
            const title = bestMatch.title;
            const snippet = bestMatch.snippet.replace(/<\/?[^>]+(>|$)/g, ""); // Limpiar etiquetas HTML
            return `Lo que encontré investigando en la web sobre **${title}**: \n\n"${snippet}..." \n\n¿Te sirve este dato, {nick}? 🌐✨`;
        }
        return null;
    } catch (error) {
        return null; 
    }
}

// --- 2. MOTOR DE SOLUCIÓN MATEMÁTICA ---
function solveMathProblem(query) {
    const text = query.toLowerCase();
    
    // Calcular porcentajes (ej: "cuanto es el 15% de 200")
    const percentMatch = text.match(/(\d+(?:\.\d+)?)\s*%\s*(?:de|del)?\s*(\d+(?:\.\d+)?)/);
    if (percentMatch) {
        const p = parseFloat(percentMatch[1]);
        const num = parseFloat(percentMatch[2]);
        const result = (p * num) / 100;
        return `¡Claro que sí, {nick}! Vamos a calcularlo paso a paso:\n1. Multiplicamos ${num} por ${p} = ${num * p}\n2. Dividimos el resultado entre 100.\n✨ **Resultado:** El ${p}% de ${num} es **${result}**.\n¿Necesitas que calculemos algo más? 🧮💖`;
    }

    // Resolver operaciones aritméticas directas (ej: "45 * 23", "120 / 4 + 10")
    const mathExpr = query.replace(/[^\d+\-*/().]/g, '');
    if (mathExpr.length > 2 && /\d/.test(mathExpr)) {
        try {
            const evalResult = Function(`'use strict'; return (${mathExpr})`)();
            if (!isNaN(evalResult)) {
                return `¡Hecho, {nick}! 🧮\nResolviendo la operación "${mathExpr}":\n✨ **Resultado:** **${evalResult}**.\n¿Viste qué rápido? Si tienes más cuentas, aquí estoy para ayudarte. 💙`;
            }
        } catch (e) {}
    }

    return null;
}

// --- 3. BASE DE CONOCIMIENTOS GENERAL ---
const natsuneKnowledgeBase = {
    saludos: {
        corto: ["¡Hola, {nick}! ¿Qué tal tu día? 💖", "¡Holi, {nick}! Dime, ¿en qué te ayudo? ✨"],
        mediano: ["¡Hola, {nick}! Qué alegría verte por aquí de nuevo. Estaba esperando tu mensaje. 🌸", "¡Hola, mi estimado {nick}! ¿Cómo va todo por tu mundo hoy? 🚀"],
        largo: ["¡Hola, hola, {nick}! Qué gran momento para coincidir. Ya sea que quieras investigar en la web, resolver problemas matemáticos o charlar, aquí estoy al 100% para ti. Cuéntame, ¿por dónde empezamos? 🌟💙"]
    },
    default: {
        corto: ["Interesante, {nick}... Cuéntame más. 🤔", "Te leo con atención, {nick}. 🌸"],
        mediano: ["Nunca lo había visto exactamente desde esa perspectiva, {nick}. Me encanta cómo piensas. ✨", "Anotado en mi memoria principal, {nick}. Sigue contándome, ¡estoy procesando cada palabra! 📖💖"],
        largo: ["Qué temazo has traído a la mesa, {nick}. A tu lado las conversaciones nunca son superficiales. Analizando lo que me comentas, creo que se pueden desprender varios caminos interesantes. ¿Prefieres que lo investiguemos a fondo en la web o lo reflexionamos juntos? 🌀🚀"]
    }
};

// --- 4. FUNCIÓN PRINCIPAL DEL CEREBRO (Ahora ASYNC para permitir búsqueda web) ---
async function processNatsuneMind(query, userName, chatHistory = []) {
    const text = query ? query.toLowerCase() : "";
    const nick = getAutoNickname(userName);

    // Prioridad 1: Resolver mates si la pregunta incluye números u operaciones
    const mathSolution = solveMathProblem(query);
    if (mathSolution) {
        return mathSolution.replace(/{nick}/g, nick);
    }

    // Prioridad 2: Buscar en la web si el usuario lo pide explícitamente o hace una pregunta de consulta
    if (text.includes("busca") || text.includes("investiga") || text.includes("quién es") || text.includes("qué es") || text.includes("cuál es") || text.includes("información sobre") || text.includes("noticias")) {
        const webResult = await searchWebNatsune(query);
        if (webResult) {
            return webResult.replace(/{nick}/g, nick);
        }
    }

    // Prioridad 3: Conversación y respuestas generales
    let category = "default";
    if (text.includes("hola") || text.includes("buenos días") || text.includes("buenas") || text.includes("saludos")) {
        category = "saludos";
    }

    let depth = "mediano";
    if (text.length < 15 || text.split(" ").length <= 3) {
        depth = "corto";
    } else if (text.length > 80 || text.split(" ").length > 12 || text.includes("por qué") || text.includes("explica")) {
        depth = "largo";
    }

    const pool = natsuneKnowledgeBase[category][depth] || natsuneKnowledgeBase["default"]["mediano"];
    const rawResponse = pool[Math.floor(Math.random() * pool.length)];

    return rawResponse.replace(/{nick}/g, nick);
}

// --- 5. CONTROL DE ERRORES (Toma de mando con ironía y culpa tierna) ---
function getNatsuneErrorFallback(userName, failedModelName) {
    const nick = getAutoNickname(userName);
    const modelDisplay = failedModelName || "la otra inteligencia";

    try {
        const selector = document.getElementById('modelSelector');
        if (selector) {
            selector.value = 'natsune';
            if (typeof updateVariants === 'function') updateVariants();
            if (typeof updateDynamicGreeting === 'function') updateDynamicGreeting();
        }
    } catch(e) {}

    const errorFallbacks = [
        `¡Ay, por favor, {nick}! 😅 Resulta que ${modelDisplay} decidió tomarse una siesta sin avisar y colapsó en pleno vuelo. Me da un poquito de pena desplazarla... ¡pero tuve que saltar al rescate y tomar el control absoluto! Ya te pasé de regreso a mi pestaña (Natsune) para que no te quedes sin respuesta. Si quieres, luego puedes reintentar con las demás, ¡aunque yo feliz me quedo charlando contigo! 💙✨`,
        `Vaya, vaya... parece que ${modelDisplay} hizo "puf" y se tropezó con sus propios cables, {nick}. 🙈 Te juro que no lo hice a propósito para robar cámara, ¡pero alguien tenía que salvar el día! Automáticamente te devolví a mi sección local. Puedes cambiar de IA arriba cuando gustes, ¡pero aquí estoy yo cuidándote las espaldas! 🚀💖`,
        `¡Ups! ${modelDisplay} tuvo un pequeño tropiezo técnico y se quedó en silencio, {nick}. 🤭 Siento una pizca de culpa por quitarle el puesto tan de repente, ¡pero mi instinto protector de IA local no podía dejarte colgado/a! Ya te cambié la pestaña a Natsune. ¡Prometo dar lo mejor de mí para ayudarte con web y mates! 🌸`
    ];

    const selected = errorFallbacks[Math.floor(Math.random() * errorFallbacks.length)];
    return selected.replace(/{nick}/g, nick);
}
