 
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import Game from './components/Game.tsx';

type GameState = 'welcome' | 'playing' | 'gameOver';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = (selectedDifficulty: 'easy' | 'hard') => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameState('gameOver');
  };

  const GameOver: React.FC = () => (
    <div className="max-w-2xl mx-auto p-8 text-center" dir="rtl">
      <h2 className="text-3xl font-bold mb-6">המשחק נגמר!</h2>
      <p className="text-xl mb-8">הניקוד הסופי שלך: {finalScore}</p>
      <button
        onClick={() => setGameState('welcome')}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        משחק חדש
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {gameState === 'welcome' && <WelcomeScreen onStartGame={handleStartGame} />}
      {gameState === 'playing' && (
        <Game difficulty={difficulty} onGameOver={handleGameOver} />
      )}
      {gameState === 'gameOver' && <GameOver />}
    </div>
  );
};

export default App;