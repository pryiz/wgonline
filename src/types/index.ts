// Types pour les questions de quiz
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index de la bonne réponse (0-3)
  explanation?: string;
}

// Types pour les thématiques
export interface Theme {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

// Types pour les joueurs
export interface Player {
  id: string;
  name: string;
  score: number;
  isStreamer: boolean;
}

// Types pour la configuration du quiz
export interface QuizConfig {
  themeId: string;
  questionCount: 10 | 25 | 50;
  streamerRole: 'player' | 'presenter';
  twitchChannel: string;
}

// Types pour l'état du quiz
export interface QuizState {
  isActive: boolean;
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  players: Player[];
  timeRemaining: number;
  questionStartTime: number;
}

// Types pour les réponses du chat
export interface ChatResponse {
  playerName: string;
  answer: number; // 1, 2, 3, ou 4
  timestamp: number;
}

// Types pour l'API Twitch
export interface TwitchChannel {
  id: string;
  login: string;
  display_name: string;
  broadcaster_type: string;
}

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
} 