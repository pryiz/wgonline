'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [twitchUrl, setTwitchUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Test de chargement JavaScript
  useEffect(() => {
    console.log('✅ JavaScript chargé - HomePage monté');
    alert('JavaScript chargé !'); // Test visuel immédiat
  }, []);

  const handleSubmit = async () => {
    console.log('🚀 handleSubmit appelé');
    console.log('📝 URL saisie:', twitchUrl);
    
    if (!twitchUrl.trim()) {
      setError('Veuillez entrer une URL Twitch');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('🔍 Validation en cours...');

    try {
      // Test simple - extraction du nom de chaîne
      let channelName = '';
      let cleanUrl = twitchUrl.trim();
      
      if (cleanUrl.startsWith('@')) {
        cleanUrl = cleanUrl.substring(1);
      }
      
      // Pattern simple
      const match = cleanUrl.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
      if (match) {
        channelName = match[1];
      } else {
        // Juste le nom
        const nameMatch = cleanUrl.match(/^([a-zA-Z0-9_]{1,25})$/);
        if (nameMatch) {
          channelName = nameMatch[1];
        }
      }

      if (!channelName) {
        setError(`URL Twitch invalide: "${twitchUrl}"`);
        setIsLoading(false);
        return;
      }

      console.log(`📺 Nom de chaîne extrait: "${channelName}"`);
      setMessage(`✅ Chaîne validée: ${channelName}`);

      // Test de l'API
      const response = await fetch('/api/twitch/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelName }),
      });

      console.log('📡 Réponse API:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('📊 Données API:', data);
        setMessage(`✅ API OK - Chaîne: ${channelName}`);
        
        // Stocker les données
        localStorage.setItem('twitchChannel', channelName);
        localStorage.setItem('quizConfig', JSON.stringify({
          twitchChannel: channelName,
          theme: 'gaming',
          questionCount: 5,
          streamerRole: 'host'
        }));
        
        // Redirection simple
        setTimeout(() => {
          window.location.href = '/config';
        }, 2000);
      } else {
        setError('Erreur API');
      }

    } catch (err) {
      console.error('❌ Erreur:', err);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎮 Twitch Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Organisez des quiz interactifs avec votre chat Twitch
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Configuration de votre chaîne
          </h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="twitchUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL de votre chaîne Twitch
              </label>
              <input
                type="text"
                id="twitchUrl"
                value={twitchUrl}
                onChange={(e) => setTwitchUrl(e.target.value)}
                placeholder="https://twitch.tv/votre_channel"
                className="input-field"
              />
              <p className="text-sm text-gray-500 mt-1">
                Exemples: @https://www.twitch.tv/username, https://www.twitch.tv/username, @username
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-sm text-green-600">{message}</p>
              </div>
            )}

            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? 'Vérification en cours...' : 'Vérifier et continuer'}
            </button>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">✅ Mode Production</h3>
            <p className="text-sm text-green-700">
              L'application se connecte réellement au chat Twitch et lit les réponses en temps réel.
              Entrez une vraie URL Twitch pour commencer votre quiz !
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités</h3>
          <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <span className="mr-2">🎯</span>
              Quiz thématiques personnalisables
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">👥</span>
              Intégration avec le chat Twitch
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">🏆</span>
              Leaderboard en temps réel
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">⚡</span>
              Interface simple et intuitive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
