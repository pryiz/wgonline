'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Player } from '@/types';

export default function ResultsPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Récupérer les données depuis le localStorage
    const savedConfig = localStorage.getItem('quizConfig');
    const savedPlayers = localStorage.getItem('quizPlayers');
    
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
    
    setIsLoading(false);
  }, []);

  const handleNewQuiz = () => {
    // Nettoyer le localStorage et rediriger vers la configuration
    localStorage.removeItem('quizConfig');
    localStorage.removeItem('quizPlayers');
    router.push('/config');
  };

  const handleBackToHome = () => {
    // Nettoyer le localStorage et rediriger vers l'accueil
    localStorage.removeItem('quizConfig');
    localStorage.removeItem('quizPlayers');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  const sortedPlayers = players.sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const totalPlayers = players.length;
  const averageScore = players.length > 0 
    ? Math.round(players.reduce((sum, p) => sum + p.score, 0) / players.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🏆 Résultats du Quiz
            </h1>
            <p className="text-lg text-gray-600">
              {config?.twitchChannel ? `Quiz terminé pour ${config.twitchChannel}` : 'Quiz terminé'}
            </p>
          </div>

          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {totalPlayers}
              </div>
              <div className="text-gray-600">Joueurs participants</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {averageScore}
              </div>
              <div className="text-gray-600">Score moyen</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {config?.questionCount || 0}
              </div>
              <div className="text-gray-600">Questions jouées</div>
            </div>
          </div>

          {/* Podium */}
          {winner && (
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                🎉 Vainqueur du Quiz
              </h2>
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-4 rounded-full mb-4">
                  <div className="text-2xl font-bold">
                    {winner.name}
                    {winner.isStreamer && ' 👑'}
                  </div>
                  <div className="text-lg">
                    {winner.score} points
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Classement complet */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📊 Classement Final
            </h2>
            <div className="space-y-4">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-300'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${
                      index === 0
                        ? 'bg-yellow-500 text-white'
                        : index === 1
                        ? 'bg-gray-500 text-white'
                        : index === 2
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className={`font-semibold ${
                        player.isStreamer ? 'text-primary-700' : 'text-gray-900'
                      }`}>
                        {player.name}
                        {player.isStreamer && ' 👑'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {player.isStreamer ? 'Streamer' : 'Viewer'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${
                      player.score >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {player.score > 0 ? '+' : ''}{player.score} points
                    </div>
                    {index < 3 && (
                      <div className="text-sm text-gray-500">
                        {index === 0 ? '🥇 1er' : index === 1 ? '🥈 2ème' : '🥉 3ème'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {sortedPlayers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun joueur n'a participé au quiz
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleNewQuiz}
              className="btn-primary flex-1"
            >
              🎮 Nouveau Quiz
            </button>
            <button
              onClick={handleBackToHome}
              className="btn-secondary flex-1"
            >
              🏠 Retour à l'accueil
            </button>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-8 card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📈 Statistiques détaillées
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Joueurs avec score positif:</span>
                  <span className="font-medium">
                    {players.filter(p => p.score > 0).length}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Joueurs avec score négatif:</span>
                  <span className="font-medium">
                    {players.filter(p => p.score < 0).length}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Score le plus élevé:</span>
                  <span className="font-medium">
                    {Math.max(...players.map(p => p.score))}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Score le plus bas:</span>
                  <span className="font-medium">
                    {Math.min(...players.map(p => p.score))}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Écart de points:</span>
                  <span className="font-medium">
                    {Math.max(...players.map(p => p.score)) - Math.min(...players.map(p => p.score))}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Thématique jouée:</span>
                  <span className="font-medium">
                    {config?.themeId || 'Non définie'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 