import tmi from 'tmi.js';

export interface ChatMessage {
  username: string;
  message: string;
  timestamp: number;
  channel: string;
}

export interface ChatResponse {
  playerName: string;
  answer: number;
  timestamp: number;
}

class TwitchChatService {
  private client: tmi.Client | null = null;
  private isConnected = false;
  private currentChannel = '';
  private messageCallbacks: ((message: ChatMessage) => void)[] = [];
  private responseCallbacks: ((response: ChatResponse) => void)[] = [];

  constructor() {
    this.client = new tmi.Client({
      channels: [],
      connection: {
        reconnect: true,
        secure: true,
        timeout: 10000
      },
      options: {
        debug: true
      }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.client) return;

    this.client.on('connected', (addr, port) => {
      console.log(`Connecté au chat Twitch: ${addr}:${port}`);
      this.isConnected = true;
    });

    this.client.on('disconnected', (reason) => {
      console.log(`Déconnecté du chat Twitch: ${reason}`);
      this.isConnected = false;
    });

    this.client.on('message', (channel, tags, message, self) => {
      if (self) return; // Ignorer nos propres messages

      const chatMessage: ChatMessage = {
        username: tags.username || 'Anonymous',
        message: message,
        timestamp: Date.now(),
        channel: channel.replace('#', '')
      };

      // Notifier tous les callbacks de message
      this.messageCallbacks.forEach(callback => callback(chatMessage));

      // Vérifier si c'est une réponse au quiz (1, 2, 3, 4)
      const answerMatch = message.match(/^[1-4]$/);
      if (answerMatch) {
        const response: ChatResponse = {
          playerName: tags.username || 'Anonymous',
          answer: parseInt(answerMatch[0]),
          timestamp: Date.now()
        };

        // Notifier tous les callbacks de réponse
        this.responseCallbacks.forEach(callback => callback(response));
      }
    });

    this.client.on('error', (err) => {
      console.error('Erreur chat Twitch:', err);
    });
  }

  async connectToChannel(channelName: string): Promise<boolean> {
    try {
      if (!this.client) {
        throw new Error('Client TMI non initialisé');
      }

      console.log(`🔄 Tentative de connexion au chat de ${channelName}...`);

      // Se déconnecter du channel précédent si nécessaire
      if (this.currentChannel) {
        console.log(`📤 Déconnexion du channel ${this.currentChannel}`);
        await this.client.part(this.currentChannel);
      }

      // Se connecter au nouveau channel
      console.log(`📥 Connexion au channel ${channelName}...`);
      await this.client.join(channelName);
      
      // Attendre un peu pour confirmer la connexion
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.currentChannel = channelName;
      
      console.log(`✅ Connecté au chat de ${channelName}`);
      return true;
    } catch (error) {
      console.error(`❌ Erreur connexion au chat de ${channelName}:`, error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client && this.currentChannel) {
      await this.client.part(this.currentChannel);
      this.currentChannel = '';
      this.isConnected = false;
    }
  }

  // Méthodes pour s'abonner aux événements
  onMessage(callback: (message: ChatMessage) => void) {
    this.messageCallbacks.push(callback);
  }

  onQuizResponse(callback: (response: ChatResponse) => void) {
    this.responseCallbacks.push(callback);
  }

  // Méthodes pour se désabonner
  offMessage(callback: (message: ChatMessage) => void) {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
  }

  offQuizResponse(callback: (response: ChatResponse) => void) {
    this.responseCallbacks = this.responseCallbacks.filter(cb => cb !== callback);
  }

  // Vérifier si connecté
  isConnectedToChat(): boolean {
    return this.isConnected && this.currentChannel !== '';
  }

  // Obtenir le channel actuel
  getCurrentChannel(): string {
    return this.currentChannel;
  }
}

export const twitchChatService = new TwitchChatService(); 