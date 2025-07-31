'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('✅ TestPage JavaScript chargé !');
    setMessage('JavaScript fonctionne !');
    alert('TestPage JavaScript chargé !');
  }, []);

  const handleClick = () => {
    console.log('🖱️ Bouton test cliqué !');
    alert('Bouton test fonctionne !');
    setMessage('Bouton cliqué !');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Test JavaScript</h1>
        <p className="mb-4">{message}</p>
        <button 
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cliquez ici pour tester
        </button>
        <div className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
} 