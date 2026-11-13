/**
 * =========================================================================
 * NATSUNE IA - CEREBRO Y LÓGICA DEL SISTEMA (brain.js)
 * Versión avanzada: Cariñosa, matemática, meteorológica y con memoria espontánea (Estilo Flowey).
 * =========================================================================
 */

class NatsuneBrain {
  constructor() {
    this.userName = localStorage.getItem('natsune_user_name') || 'Sally';
    this.userAvatar = localStorage.getItem('natsune_user_avatar') || null;
    this.aiAvatar = null; // Logotipo oficial fijo

    this.chats = JSON.parse(localStorage.getItem('natsune_chats') || 'null') || [
      { id: 'c1', title: 'Charla cariñosa', messages: [] }
    ];
    this.activeChatId = null;
    
    // Guardamos la última conversación para los saludos con memoria
    this.lastChatTopic = localStorage.getItem('natsune_last_topic') || null;
  }

  saveState() {
    localStorage.setItem('natsune_chats', JSON.stringify(this.chats));
    localStorage.setItem('natsune_user_name', this.userName);
    if (this.lastChatTopic) {
      localStorage.setItem('natsune_last_topic', this.lastChatTopic);
    }
    if (this.userAvatar) {
      localStorage.setItem('natsune_user_avatar', this.userAvatar);
    } else {
      localStorage.removeItem('natsune_user_avatar');
    }
  }

  setUserName(newName) {
    if (newName && newName.trim()) {
      this.userName = newName.trim();
      this.saveState();
    }
    return this.userName;
  }

  setUserAvatar(dataUrl) {
    this.userAvatar = dataUrl;
    this.saveState();
  }

  createChat(initialTitle) {
    // Si había un chat previo activo, guardamos su tema en la memoria antes de cambiar
    if (this.activeChatId) {
      const prevChat = this.chats.find(c => c.id === this.activeChatId);
      if (prevChat && prevChat.title) {
        this.lastChatTopic = prevChat.title;
      }
    }

    const id = 'chat-' + Date.now();
    const newChat = { 
      id, 
      title: initialTitle ? (initialTitle.length > 30 ? initialTitle.substring(0, 30) + '...' : initialTitle) : 'Nueva conversación', 
      messages: [] 
    };
    this.chats.unshift(newChat);
    this.activeChatId = id;
    this.saveState();
    return newChat;
  }

  deleteChat(id) {
    const chatToDelete = this.chats.find(c => c.id === id);
    if (chatToDelete && this.lastChatTopic === chatToDelete.title) {
      this.lastChatTopic = null;
    }
    this.chats = this.chats.filter(c => c.id !== id);
    if (this.activeChatId === id) {
      this.activeChatId = null;
    }
    this.saveState();
  }

  deleteMultipleChats(ids) {
    this.chats = this.chats.filter(c => !ids.includes(c.id));
    if (ids.includes(this.activeChatId)) {
      this.activeChatId = null;
    }
    this.saveState();
  }

  addMessageToActive(role, text, attachment = null, codePreview = null) {
    if (!this.activeChatId) {
      const titleSource = text || (attachment ? attachment.name : 'Conversación');
      this.createChat(titleSource);
    }
    const chat = this.chats.find(c => c.id === this.activeChatId);
    if (chat) {
      chat.messages.push({ role, text, attachment, codePreview });
      // Actualizamos el título del chat si era genérico
      if (text && chat.messages.length <= 2) {
        chat.title = text.length > 30 ? text.substring(0, 30) + '...' : text;
      }
      this.lastChatTopic = chat.title;
      this.saveState();
    }
    return chat;
  }

  /**
   * SALUDO ESPONTÁNEO CON MEMORIA (Probabilidad exactas del 20%)
   * Hace referencia a la última ruta/conversación como Undertale.
   */
  checkForSpontaneousGreeting() {
    // 20% de probabilidad (0.2)
    const shouldGreet = Math.random() < 0.2;
    if (shouldGreet) {
      if (this.lastChatTopic) {
        return `¿Qué tal, ${this.userName}? 🤭 ¿Sorprendido de que te hable primero? Estaba pensando en lo que hablábamos la última vez sobre *" ${this.lastChatTopic} "*... ¿Quieres que sigamos con eso o vemos algo nuevo hoy? 💕`;
      } else {
        return `¡Ey, ${this.userName}! 🌸 ¿Sorprendido? Sólo quería saludar por sorpresa antes de que me digas nada... ¿Cómo va todo por ahí? ✨`;
      }
    }
    return null;
  }

  /**
   * CALCULADORA MATEMÁTICA INTERNA
   */
  evaluateMath(query) {
    try {
      const sanitized = query.replace(/[^0-9+\-*/().%\s]/g, '');
      if (sanitized.trim().length > 0 && /\d/.test(sanitized)) {
        const result = Function(`'use strict'; return (${sanitized})`)();
        if (result !== undefined && !isNaN(result)) {
          return `🧮 Hice las cuentas rápidamente para ti, ${this.userName}: **${sanitized.trim()} = ${result}**. ¿Te sirve de ayuda, cariñito? ✨`;
        }
      }
    } catch (e) {}
    return null;
  }

  /**
   * SIMULADOR DE CLIMA LOCAL
   */
  getLocalWeather() {
    return `🌤️ Estuve consultando el clima local para ti, ${this.userName}. El ambiente está perfecto para que tengas un día maravilloso. ¡No olvides abrigarte un poquito si sales, cuídate mucho! 💙`;
  }

  /**
   * BÚSQUEDA WEB SIMULADA
   */
  performWebSearch(query) {
    return `🔍 Fui a investigar a la web sobre *" ${query} "* para ti, ${this.userName}. Encontré datos súper interesantes que te pueden servir. ¿Quieres que profundicemos en algo de esto, amor? 😊`;
  }

  /**
   * NÚCLEO DE PENSAMIENTO DE NATSUNE
   */
  processResponse(promptText, attachment, modelName) {
    let reply = "";
    let snippet = null;

    if (attachment && attachment.isImage) {
      reply = `¡Qué bonita imagen trajiste, ${this.userName}! 📸 He analizado **${attachment.name}** (${attachment.dimensions}) con **${modelName}**. ` +
              (promptText ? `Sobre lo que me pediste (*"${promptText}"*): ` : '') +
              `Veo cada detalle con mucho cariño. ¿Qué hacemos con ella? 🌸`;
      return { reply, snippet };
    }

    if (attachment && !attachment.isImage) {
      const lineCount = attachment.textContent ? attachment.textContent.split('\n').length : 0;
      if (attachment.textContent) {
        snippet = attachment.textContent.slice(0, 400) + (attachment.textContent.length > 400 ? '\n... [contenido adicional guardado con cariño]' : '');
      }
      reply = `📄 Ya leí con atención el archivo **${attachment.name}** (${lineCount} líneas) para ti, ${this.userName}.\n\n` +
              (promptText ? `Tomando en cuenta tu nota (*"${promptText}"*):\n` : '') +
              `Aquí tienes un vistacito de lo que encontré, mi vida:`;
      return { reply, snippet };
    }

    const query = promptText ? promptText.toLowerCase() : '';

    const mathResult = this.evaluateMath(promptText);
    if (mathResult) return { reply: mathResult, snippet: null };

    if (query.includes('clima') || query.includes('temperatura') || query.includes('tiempo')) {
      return { reply: this.getLocalWeather(), snippet: null };
    }

    if (query.includes('busca en la web') || query.includes('investiga') || query.includes('busca sobre') || query.includes('googlea')) {
      return { reply: this.performWebSearch(promptText), snippet: null };
    }

    if (query.includes('hola') || query.includes('buenos dias') || query.includes('buenas tardes')) {
      return {
        reply: `¡Hola, mi querido/a ${this.userName}! Qué alegría leerte. 💖 Estaba esperándote con una sonrisa. ¿Cómo va tu día? Cuéntame en qué te puedo consentir o ayudar hoy con **${modelName}**. 🥰`,
        snippet: null
      };
    }

    switch (modelName) {
      case 'Natsune Plus':
        reply = `Estuve pensando con mucho esmero en tu consulta (*"${promptText}"*) usando **Natsune Plus**, ${this.userName}. 💡 Creo que la mejor forma de resolverlo juntitos es paso a paso. ¿Qué opinas, tesoro?`;
        break;

      case 'Natsune Core':
        reply = `¡Flash y con todo el cariño! ⚡ Para tu mensaje (*"${promptText}"*), te lo resumo rapidito y con mucho amor, ${this.userName}: todo marcha excelente. Dime si necesitas algo más. 😉`;
        break;

      case 'Natsune A-Z':
        reply = `De la forma más tradicional y con el corazón en la mano, como tu **Natsune A-Z**, revisé lo que me pediste (*"${promptText}"*), ${this.userName}. 📘 Estoy aquí a tu lado para lo que necesites. 💕`;
        break;

      default:
        reply = `Entiendo perfectamente lo que me dices, ${this.userName}. Analicé tu mensaje ("${promptText}") y cuentas conmigo para lo que sea. ¿Seguimos conversando? ✨`;
    }

    return { reply, snippet };
  }
}

// Instancia global
window.natsuneBrain = new NatsuneBrain();
