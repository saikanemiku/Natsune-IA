/**
 * NATSUNE IA - CEREBRO Y LÓGICA DEL SISTEMA (brain.js)
 * Maneja el estado global, el almacenamiento local, el procesamiento
 * de archivos/imágenes y la generación de respuestas según el modelo activo.
 */

class NatsuneBrain {
  constructor() {
    this.userName = localStorage.getItem('natsune_user_name') || 'Sally';
    this.userAvatar = localStorage.getItem('natsune_user_avatar') || null;
    this.aiAvatar = localStorage.getItem('natsune_ai_avatar') || null;
    this.chats = JSON.parse(localStorage.getItem('natsune_chats') || 'null') || [
      { id: 'c1', title: 'Análisis de documentos', messages: [] },
      { id: 'c2', title: 'Ideas creativas con Natsune', messages: [] }
    ];
    this.activeChatId = null;
  }

  saveState() {
    localStorage.setItem('natsune_chats', JSON.stringify(this.chats));
    localStorage.setItem('natsune_user_name', this.userName);
    if (this.userAvatar) localStorage.setItem('natsune_user_avatar', this.userAvatar);
    if (this.aiAvatar) localStorage.setItem('natsune_ai_avatar', this.aiAvatar);
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

  setAiAvatar(dataUrl) {
    this.aiAvatar = dataUrl;
    this.saveState();
  }

  createChat(initialTitle) {
    const id = 'chat-' + Date.now();
    const newChat = { id, title: initialTitle || 'Nueva conversación', messages: [] };
    this.chats.unshift(newChat);
    this.activeChatId = id;
    this.saveState();
    return newChat;
  }

  deleteChat(id) {
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
      this.createChat(text || (attachment ? attachment.name : 'Conversación'));
    }
    const chat = this.chats.find(c => c.id === this.activeChatId);
    if (chat) {
      chat.messages.push({ role, text, attachment, codePreview });
      this.saveState();
    }
    return chat;
  }

  /**
   * Cerebro de procesamiento principal según el modelo seleccionado
   * Modelos: Natsune Plus, Natsune Core, Natsune A-Z
   */
  processResponse(promptText, attachment, modelName) {
    // Aquí puedes conectar en el futuro tu API real (OpenAI, Gemini API, servidor local, etc.)
    let reply = "";
    let snippet = null;

    if (attachment && attachment.isImage) {
      reply = `[${modelName}] He procesado la imagen **${attachment.name}** (${attachment.dimensions}). ${promptText ? `Analizando tu solicitud: "${promptText}".` : 'La imagen está lista para ser evaluada en detalle.'}`;
    } else if (attachment && !attachment.isImage) {
      if (attachment.textContent) {
        const preview = attachment.textContent.slice(0, 400) + (attachment.textContent.length > 400 ? '\n... [contenido truncado]' : '');
        reply = `[${modelName}] He leído exitosamente el archivo **${attachment.name}**. ${promptText ? `Indicación aplicada: "${promptText}".` : ''} Aquí tienes un resumen del contenido detectado:`;
        snippet = preview;
      } else {
        reply = `[${modelName}] Archivo **${attachment.name}** recibido y cargado en el contexto de la sesión.`;
      }
    } else {
      switch (modelName) {
        case 'Natsune Plus':
          reply = `Hola ${this.userName}. Analizando tu consulta en profundidad con **Natsune Plus**: "${promptText}". He evaluado las distintas variables para ofrecerte una solución optimizada.`;
          break;
        case 'Natsune Core':
          reply = `[Core] Respuesta rápida para: "${promptText}". Todo en orden, ¿necesitas algo más?`;
          break;
        case 'Natsune A-Z':
          reply = `Saludos ${this.userName}. Como **Natsune A-Z** (modo clásico), he procesado tu mensaje: "${promptText}" manteniendo los estándares habituales de asistencia.`;
          break;
        default:
          reply = `Procesado por Natsune IA: "${promptText}"`;
      }
    }

    return { reply, snippet };
  }
}

// Exportar instancia global para la interfaz
window.natsuneBrain = new NatsuneBrain();
