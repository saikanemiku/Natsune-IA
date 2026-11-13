/**
 * =========================================================================
 * NATSUNE IA - CEREBRO Y LÓGICA (brain.js)
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
    
    // URL con protocolo seguro HTTPS hacia tu servidor en Render
    this.backendUrl = 'https://natsune-ia.onrender.com/api/chat';
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

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${contextNote} Mensaje del usuario: ${promptText || 'Hola'}` }
    ];

    try {
      const response = await fetch(this.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages,
          model: 'llama-3.3-70b-versatile'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
        reply: `Vaya, ${this.userName}... Parece que el servidor en Render está tomando un respiro (a veces la versión gratuita se duerme si no se usa). Dale un segundito y vuelve a intentarlo, ¿sí? 💙`,
        snippet: null
      };
    }
  }
}

// Instancia global
window.natsuneBrain = new NatsuneBrain();
