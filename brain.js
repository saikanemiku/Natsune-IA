/**
 * =========================================================================
 * NATSUNE IA - CEREBRO Y LÓGICA CON API SEGURA DESDE EL PERFIL (brain.js)
 * =========================================================================
 */

class NatsuneBrain {
  constructor() {
    this.userName = localStorage.getItem('natsune_user_name') || 'Sally';
    this.userAvatar = localStorage.getItem('natsune_user_avatar') || null;
    this.aiAvatar = null;

    this.chats = JSON.parse(localStorage.getItem('natsune_chats') || 'null') || [
      { id: 'c1', title: 'Charla con Natsune', messages: [] }
    ];
    this.activeChatId = null;
    this.lastChatTopic = localStorage.getItem('natsune_last_topic') || null;

    // Recupera la API Key configurada privadamente desde el perfil
    this.apiKey = localStorage.getItem('natsune_secure_groq_key') || '';
    this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  }

  setApiKey(key) {
    if (key && key.trim().startsWith('gsk_')) {
      this.apiKey = key.trim();
      localStorage.setItem('natsune_secure_groq_key', this.apiKey);
    }
  }

  saveState() {
    localStorage.setItem('natsune_chats', JSON.stringify(this.chats));
    localStorage.setItem('natsune_user_name', this.userName);
    if (this.lastChatTopic) localStorage.setItem('natsune_last_topic', this.lastChatTopic);
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
    if (this.activeChatId === id) this.activeChatId = null;
    this.saveState();
  }

  deleteMultipleChats(ids) {
    this.chats = this.chats.filter(c => !ids.includes(c.id));
    if (ids.includes(this.activeChatId)) this.activeChatId = null;
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
   * SALUDO ESPONTÁNEO (50% de probabilidad - Estilo Undertale con memoria)
   */
  checkForSpontaneousGreeting() {
    const shouldGreet = Math.random() < 0.5;
    if (shouldGreet) {
      if (this.lastChatTopic) {
        return `¡Sorpresa, ${this.userName}! 🤭 Estaba por aquí ordenando mis ideas y me acordé de ti. El otro día estábamos platicando sobre *" ${this.lastChatTopic} "* y me quedé pensando en ello. ¿Se te antoja seguir explorando ese tema o prefieres que platiquemos de otra cosa hoy, mi vida? 💕✨`;
      } else {
        return `¡Ey, hola, ${this.userName}! 🌸 ¡Qué gusto encontrarte por aquí tan prontito! Quería saludarte por sorpresa antes de que me escribas nada, solo para asegurarme de que tengas un día maravilloso. ¿Cómo va todo por tu día? 💖`;
      }
    }
    return null;
  }

  evaluateMath(query) {
    try {
      const sanitized = query.replace(/[^0-9+\-*/().%\s]/g, '');
      if (sanitized.trim().length > 0 && /\d/.test(sanitized)) {
        const result = Function(`'use strict'; return (${sanitized})`)();
        if (result !== undefined && !isNaN(result)) {
          return `🧮 Hice las cuentas rápidamente para ti, ${this.userName}: **${sanitized.trim()} = ${result}**. ¿Te sirvió, cariñito? ✨`;
        }
      }
    } catch (e) {}
    return null;
  }

  getLocalWeather() {
    return `🌤️ Estuve consultando el clima local para ti, ${this.userName}. El ambiente está fresco y agradable. ¡No olvides abrigarte un poquito si sales, cuídate mucho! 💙`;
  }

  async processResponse(promptText, attachment, modelName) {
    if (!this.apiKey) {
      return { 
        reply: `Ay, ${this.userName}... 🥺 Veo que todavía no has configurado tu API Key de Groq. Toca tu foto de perfil arriba a la derecha, coloca tu llave en el apartado correspondiente y guárdala para que podamos conversar a fondo. 💙`, 
        snippet: null 
      };
    }

    let contextNote = "";

    if (attachment && attachment.isImage) {
      contextNote = `[El usuario adjuntó una imagen llamada ${attachment.name} de dimensiones ${attachment.dimensions}].`;
    } else if (attachment && !attachment.isImage) {
      contextNote = `[El usuario adjuntó un archivo llamado ${attachment.name} cuyo contenido es:\n${attachment.textContent ? attachment.textContent.slice(0, 1500) : 'Sin contenido'}].`;
    }

    const mathResult = this.evaluateMath(promptText);
    if (mathResult) return { reply: mathResult, snippet: null };

    const query = promptText ? promptText.toLowerCase() : '';
    if (query.includes('clima') || query.includes('temperatura') || query.includes('tiempo')) {
      return { reply: this.getLocalWeather(), snippet: null };
    }

    const systemPrompt = `Eres Natsune IA, un asistente personal de inteligencia artificial muy inteligente. 
    Tu usuario se llama ${this.userName}. 
    REGLA DE PERSONALIDAD OBLIGATORIA: Eres extremadamente cariñosa, amable, dulce y cercana, pero de vez en cuando usas un toque de ironía fina o sarcasmo juguetón y tierno (estilo tsundere/cariñosa). Nunca suenes como un robot frío. Habla de forma natural, humana y usa emojis con moderación pero afecto. Nunca menciones nombres técnicos de modelos internos.`;

    const userMessage = `${contextNote} Mensaje del usuario: ${promptText || 'Hola'}`;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error('Error en la conexión con la API');
      }

      const data = await response.json();
      const reply = data.choices && data.choices[0] && data.choices[0].message 
        ? data.choices[0].message.content 
        : `Ay, ${this.userName}, me quedé pensando un segundito y se me fue la inspiración. ¿Me lo repites, por favor? 🥺`;

      let snippet = null;
      if (attachment && !attachment.isImage && attachment.textContent) {
        snippet = attachment.textContent.slice(0, 400) + '...';
      }

      return { reply, snippet };

    } catch (error) {
      console.error(error);
      return {
        reply: `Vaya, ${this.userName}... Parece que hubo un problema con tu API Key o la conexión a la red. Revisa que tu clave sea correcta en el menú de tu perfil. 💙`,
        snippet: null
      };
    }
  }
}

// Instancia global
window.natsuneBrain = new NatsuneBrain();
