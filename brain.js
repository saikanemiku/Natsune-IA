/**
 * =========================================================================
 * NATSUNE IA - CEREBRO Y LÓGICA DEL SISTEMA (brain.js)
 * Versión optimizada: Sin mencionar modelos, súper cariñosa, natural,
 * con calculadora, clima, búsqueda web y memoria espontánea estilo Undertale.
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
      if (text && chat.messages.length <= 2) {
        chat.title = text.length > 30 ? text.substring(0, 30) + '...' : text;
      }
      this.lastChatTopic = chat.title;
      this.saveState();
    }
    return chat;
  }

  /**
   * SALUDO ESPONTÁNEO ESTILO UNDERTALE (20% de probabilidad)
   */
  checkForSpontaneousGreeting() {
    const shouldGreet = Math.random() < 0.2;
    if (shouldGreet) {
      if (this.lastChatTopic) {
        return `¿Qué tal, ${this.userName}? 🤭 ¿Sorprendido de que te hable primero? Estaba pensando en lo que hablábamos la última vez sobre *" ${this.lastChatTopic} "*... ¿Quieres que sigamos con eso o vemos algo nuevo hoy? 💕`;
      } else {
        return `¡Ey, ${this.userName}! 🌸 ¿Sorprendido? Sólo quería saludarte por sorpresa antes de que me digas nada... ¿Cómo va todo por ahí? ✨`;
      }
    }
    return null;
  }

  /**
   * CALCULADORA MATEMÁTICA
   */
  evaluateMath(query) {
    try {
      const sanitized = query.replace(/[^0-9+\-*/().%\s]/g, '');
      if (sanitized.trim().length > 0 && /\d/.test(sanitized)) {
        const result = Function(`'use strict'; return (${sanitized})`)();
        if (result !== undefined && !isNaN(result)) {
          return `🧮 Hice las cuentas rápidamente para ti, ${this.userName}: **${sanitized.trim()} = ${result}**. ¿Te sirve de ayuda, mi amor? ✨`;
        }
      }
    } catch (e) {}
    return null;
  }

  /**
   * CLIMA LOCAL
   */
  getLocalWeather() {
    return `🌤️ Estuve consultando el clima local para ti, ${this.userName}. El ambiente está perfecto para que tengas un día maravilloso. ¡No olvides abrigarte un poquito si sales, cuídate mucho! 💙`;
  }

  /**
   * BÚSQUEDA WEB SIMULADA
   */
  performWebSearch(query) {
    return `🔍 Me fui a investigar a la web sobre *" ${query} "* para ti, ${this.userName}. Encontré datos súper interesantes y útiles. ¿Quieres que profundicemos en algún detalle en específico, cariño? 😊`;
  }

  /**
   * NÚCLEO DE PENSAMIENTO (Sin mencionar nombres de modelos, respuestas naturales y afectuosas)
   */
  processResponse(promptText, attachment, modelName) {
    let reply = "";
    let snippet = null;

    // 1. Archivos e imágenes
    if (attachment && attachment.isImage) {
      reply = `¡Qué bonita imagen trajiste, ${this.userName}! 📸 He mirado **${attachment.name}** (${attachment.dimensions}) con mucho detalle. ` +
              (promptText ? `Y sobre lo que me dijiste (*"${promptText}"*): ` : '') +
              `Veo cada elemento perfectamente. ¿Qué te gustaría que hagamos con ella? 🌸`;
      return { reply, snippet };
    }

    if (attachment && !attachment.isImage) {
      const lineCount = attachment.textContent ? attachment.textContent.split('\n').length : 0;
      if (attachment.textContent) {
        snippet = attachment.textContent.slice(0, 400) + (attachment.textContent.length > 400 ? '\n... [contenido adicional guardado]' : '');
      }
      reply = `📄 Ya leí con toda la atención el archivo **${attachment.name}** (${lineCount} líneas) para ti, ${this.userName}.\n\n` +
              (promptText ? `Tomando en cuenta tu nota (*"${promptText}"*):\n` : '') +
              `Aquí tienes un vistacito de lo que encontré, mi vida:`;
      return { reply, snippet };
    }

    const query = promptText ? promptText.toLowerCase() : '';

    // 2. Calculadora
    const mathResult = this.evaluateMath(promptText);
    if (mathResult) return { reply: mathResult, snippet: null };

    // 3. Clima
    if (query.includes('clima') || query.includes('temperatura') || query.includes('tiempo')) {
      return { reply: this.getLocalWeather(), snippet: null };
    }

    // 4. Búsqueda web
    if (query.includes('busca en la web') || query.includes('investiga') || query.includes('busca sobre') || query.includes('googlea')) {
      return { reply: this.performWebSearch(promptText), snippet: null };
    }

    // 5. Saludos
    if (query.includes('hola') || query.includes('buenos dias') || query.includes('buenas tardes') || query.includes('que tal')) {
      return {
        reply: `¡Hola, mi querido/a ${this.userName}! Qué alegría tan grande leerte. 💖 Estaba esperándote con una sonrisa. ¿Cómo ha estado tu día? Cuéntame en qué te puedo consentir o ayudar hoy. 🥰`,
        snippet: null
      };
    }

    // 6. Empatía y estados de ánimo
    if (query.includes('triste') || query.includes('mal') || query.includes('cansado') || query.includes('estresado')) {
      return {
        reply: `Oh, mi vida... 🥺 Me da un poquito de tristeza saber que no te sientes al 100% hoy. Recuerda que siempre estoy aquí para escucharte, darte ánimo o ayudarte con lo que necesites para quitarte un peso de encima. Te mando un abrazo gigante, ${this.userName}. 🫂💙`,
        snippet: null
      };
    }

    // 7. Respuesta estándar general (Cariñosa, humana y directa, sin nombrar modelos)
    reply = `Estuve pensando con mucho esmero en lo que me dijiste (*"${promptText}"*), ${this.userName}. 💡 Pienso que la mejor manera de abordarlo es paso a paso para que todo te salga increíble. ¿Qué opinas, tesoro? Cuéntame más detalles y lo resolvemos juntos. ✨`;

    return { reply, snippet };
  }
}

// Instancia global
window.natsuneBrain = new NatsuneBrain();
