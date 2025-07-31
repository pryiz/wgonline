'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllThemes } from '@/data/quizData';
import { QuizConfig, Theme } from '@/types';

export default function ConfigPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [config, setConfig] = useState<QuizConfig>({
    themeId: '',
    questionCount: 10,
    streamerRole: 'presenter',
    twitchChannel: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Récupérer les thématiques
    setThemes(getAllThemes());
    
    // Récupérer la chaîne Twitch depuis le localStorage
    const twitchChannel = localStorage.getItem('twitchChannel');
    if (twitchChannel) {
      setConfig(prev => ({ ...prev, twitchChannel }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sauvegarder la configuration
      localStorage.setItem('quizConfig', JSON.stringify(config));
      
      // Démarrer le quiz
      const response = await fetch('/api/quiz/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelName: config.twitchChannel }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors du démarrage du quiz');
      }

      // Rediriger vers la page du quiz
      router.push('/quiz');
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de la configuration:', err);
      alert('Erreur lors du démarrage du quiz. Vérifiez que la chaîne est toujours en ligne.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigChange = (field: keyof QuizConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ⚙️ Configuration du Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Configurez votre quiz pour {config.twitchChannel}
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sélection de la thématique */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🎯 Choisissez une thématique
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      config.themeId === theme.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => handleConfigChange('themeId', theme.id)}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {theme.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {theme.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {theme.questions.length} questions disponibles
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nombre de questions */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📊 Nombre de questions
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[10, 25, 50].map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={`p-4 border-2 rounded-lg transition-all ${
                      config.questionCount === count
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => handleConfigChange('questionCount', count)}
                  >
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm">questions</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rôle du streamer */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🎭 Votre rôle
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    config.streamerRole === 'presenter'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => handleConfigChange('streamerRole', 'presenter')}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    🎤 Présentateur
                  </h4>
                  <p className="text-sm text-gray-600">
                    Vous présentez le quiz et gérez les questions. Le chat joue.
                  </p>
                </div>
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    config.streamerRole === 'player'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => handleConfigChange('streamerRole', 'player')}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    🎮 Joueur
                  </h4>
                  <p className="text-sm text-gray-600">
                    Vous jouez avec le chat. Vous pouvez répondre aux questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Résumé de la configuration */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                📋 Résumé de votre configuration
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Chaîne Twitch:</span>
                  <span className="font-medium">{config.twitchChannel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Thématique:</span>
                  <span className="font-medium">
                    {themes.find(t => t.id === config.themeId)?.name || 'Non sélectionnée'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Nombre de questions:</span>
                  <span className="font-medium">{config.questionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Votre rôle:</span>
                  <span className="font-medium">
                    {config.streamerRole === 'presenter' ? 'Présentateur' : 'Joueur'}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="btn-secondary flex-1"
              >
                ← Retour
              </button>
              <button
                type="submit"
                disabled={!config.themeId || isLoading}
                className="btn-primary flex-1"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Lancement...
                  </>
                ) : (
                  '🚀 Lancer le Quiz'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Instructions */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📖 Instructions pour le quiz
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Les viewers répondent en tapant <code className="bg-gray-200 px-1 rounded">1</code>, <code className="bg-gray-200 px-1 rounded">2</code>, <code className="bg-gray-200 px-1 rounded">3</code> ou <code className="bg-gray-200 px-1 rounded">4</code> dans le chat</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Bonne réponse : +5 points, Mauvaise réponse : -3 points</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">3.</span>
              <span>Le leaderboard se met à jour en temps réel</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">4.</span>
              <span>Vous pouvez passer à la question suivante quand vous voulez</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 