'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getThemeById } from '@/data/quizData';
import { QuizConfig, Question, Player, ChatResponse } from '@/types';

export default function QuizPage() {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [chatResponses, setChatResponses] = useState<ChatResponse[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isQuestionActive, setIsQuestionActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Récupérer la configuration depuis le localStorage
    const savedConfig = localStorage.getItem('quizConfig');
    if (!savedConfig) {
      router.push('/');
      return;
    }

    const parsedConfig: QuizConfig = JSON.parse(savedConfig);
    setConfig(parsedConfig);

    // Récupérer les questions de la thématique
    const theme = getThemeById(parsedConfig.themeId);
    if (!theme) {
      router.push('/config');
      return;
    }

    // Mélanger les questions et en prendre le nombre demandé
    const shuffledQuestions = [...theme.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, parsedConfig.questionCount);

    // Initialiser les joueurs
    const initialPlayers: Player[] = [];
    if (parsedConfig.streamerRole === 'player') {
      initialPlayers.push({
        id: 'streamer',
        name: parsedConfig.twitchChannel,
        score: 0,
        isStreamer: true
      });
    }

    setPlayers(initialPlayers);
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (!config) return;

    const theme = getThemeById(config.themeId);
    if (!theme) return;

    const shuffledQuestions = [...theme.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.questionCount);

    if (currentQuestionIndex < shuffledQuestions.length) {
      setCurrentQuestion(shuffledQuestions[currentQuestionIndex]);
    }
  }, [config, currentQuestionIndex]);

  useEffect(() => {
    if (!isQuestionActive || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleQuestionEnd();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuestionActive, currentQuestion]);

  // Connexion au chat Twitch réel
  useEffect(() => {
    if (!config?.twitchChannel) return;

    const connectToChat = async () => {
      try {
        const { twitchChatServerService } = await import('@/lib/twitch-chat-server');
        
        // Écouter les réponses du quiz
        twitchChatServerService.onQuizResponse((response) => {
          console.log(`🎯 Réponse reçue dans le quiz: ${response.playerName} -> ${response.answer}`);
          setChatResponses(prev => [...prev, response]);
          handlePlayerAnswer(response.playerName, response.answer);
        });

        console.log(`✅ Quiz connecté au chat de ${config.twitchChannel}`);
      } catch (error) {
        console.error('Erreur connexion chat:', error);
      }
    };

    connectToChat();

    // Nettoyage à la déconnexion
    return () => {
      const cleanup = async () => {
        const { twitchChatServerService } = await import('@/lib/twitch-chat-server');
        twitchChatServerService.offQuizResponse(() => {});
      };
      cleanup();
    };
  }, [config?.twitchChannel]);

  const handlePlayerAnswer = (playerName: string, answer: number) => {
    if (!currentQuestion) return;

    const isCorrect = answer - 1 === currentQuestion.correctAnswer;
    const points = isCorrect ? 5 : -3;

    setPlayers(prev => {
      const existingPlayer = prev.find(p => p.name === playerName);
      if (existingPlayer) {
        return prev.map(p => 
          p.name === playerName 
            ? { ...p, score: p.score + points }
            : p
        );
      } else {
        return [...prev, {
          id: `player-${Date.now()}`,
          name: playerName,
          score: points,
          isStreamer: false
        }];
      }
    });
  };

  const handleQuestionEnd = () => {
    setIsQuestionActive(false);
    setShowAnswer(true);
    setTimeRemaining(30);
  };

  const handleNextQuestion = () => {
    if (!config) return;

    const theme = getThemeById(config.themeId);
    if (!theme) return;

    const shuffledQuestions = [...theme.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.questionCount);

    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
      setIsQuestionActive(true);
      setChatResponses([]);
    } else {
      // Quiz terminé
      router.push('/results');
    }
  };

  const startQuestion = () => {
    setIsQuestionActive(true);
    setShowAnswer(false);
    setChatResponses([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  if (!config || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Erreur de configuration</p>
          <button onClick={() => router.push('/config')} className="btn-primary mt-4">
            Retour à la configuration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🎮 Quiz en cours
            </h1>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} sur {config.questionCount}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {timeRemaining}s
            </div>
            <div className="text-sm text-gray-500">Temps restant</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Zone principale - Question */}
          <div className="lg:col-span-2">
            <div className="card">
              {!isQuestionActive && !showAnswer ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Prêt à commencer la question ?
                  </p>
                  <button onClick={startQuestion} className="btn-primary text-lg px-8 py-3">
                    🚀 Commencer la question
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentQuestion.question}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        disabled={!isQuestionActive}
                        className={`p-4 text-left rounded-lg border-2 transition-all ${
                          showAnswer
                            ? index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-gray-200 bg-gray-50 text-gray-500'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <span className="font-bold mr-3">{index + 1}.</span>
                        {option}
                      </button>
                    ))}
                  </div>

                  {showAnswer && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2">
                        💡 Explication
                      </h3>
                      <p className="text-blue-800">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {showAnswer && (
                    <div className="text-center">
                      <button onClick={handleNextQuestion} className="btn-primary text-lg px-8 py-3">
                        {currentQuestionIndex + 1 < config.questionCount ? 'Question suivante' : 'Terminer le quiz'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Réponses du chat en temps réel */}
            {isQuestionActive && (
              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  💬 Réponses du chat
                </h3>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {chatResponses.slice(-10).map((response, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium text-gray-900">
                        {response.playerName}
                      </span>
                      <span className="text-gray-600">
                        Réponse: {response.answer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🏆 Leaderboard
              </h3>
              <div className="space-y-3">
                {players
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 10)
                  .map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.isStreamer
                          ? 'bg-primary-50 border border-primary-200'
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-bold text-gray-500 mr-3">
                          #{index + 1}
                        </span>
                        <span className={`font-medium ${
                          player.isStreamer ? 'text-primary-700' : 'text-gray-900'
                        }`}>
                          {player.name}
                          {player.isStreamer && ' 👑'}
                        </span>
                      </div>
                      <span className={`font-bold ${
                        player.score >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {player.score > 0 ? '+' : ''}{player.score}
                      </span>
                    </div>
                  ))}
              </div>
              
              {players.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucun joueur pour le moment
                </div>
              )}
            </div>

            {/* Statistiques */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Statistiques
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Joueurs actifs:</span>
                  <span className="font-medium">{players.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Réponses reçues:</span>
                  <span className="font-medium">{chatResponses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Question actuelle:</span>
                  <span className="font-medium">{currentQuestionIndex + 1}/{config.questionCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 