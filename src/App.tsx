import React, { useState } from 'react';
import Game from './components/Game';

type GameState = 'welcome' | 'playing' | 'levelUp' | 'gameOver';

const SCORE_TO_ADVANCE = 20;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [totalScore, setTotalScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score: number) => {
    setFinalScore(score + totalScore);
    setGameState('gameOver');
  };

  const getCurrentDifficulty = () => {
    return totalScore < SCORE_TO_ADVANCE ? 'easy' : 'hard';
  };

  const WelcomeScreen: React.FC = () => (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
        השלם את הפסוק
      </h1>
      
      <div className="mb-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-semibold text-blue-800">איך משחקים?</h2>
        <ul className="text-right text-lg space-y-3 text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            בכל שלב יוצג לך פסוק חלקי מהתנ״ך
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            עליך להשלים את המילים החסרות
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            על כל תשובה נכונה תקבל נקודה
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            לאחר שתי טעויות המשחק יסתיים
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            אחרי 20 נקודות תעבור לרמה הקשה!
          </li>
        </ul>
      </div>

      <button
        onClick={() => setGameState('playing')}
        className="w-full p-4 text-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl 
                   hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
      >
        התחל לשחק!
      </button>
    </div>
  );

  const LevelUpScreen: React.FC = () => (
    <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-2xl shadow-xl" dir="rtl">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
        כל הכבוד!
      </h2>
      <p className="text-xl mb-8">
        סיימת בהצלחה את הרמה הקלה עם {SCORE_TO_ADVANCE} נקודות!
      </p>
      <p className="text-lg mb-8 text-gray-700">
        עכשיו נעבור לרמה הקשה. האם אתה מוכן לאתגר?
      </p>
      <button
        onClick={() => setGameState('playing')}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg rounded-xl
                   hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
      >
        המשך לרמה הקשה
      </button>
    </div>
  );

  const GameOver: React.FC = () => (
    <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-2xl shadow-xl" dir="rtl">
      <h2 className="text-3xl font-bold mb-6">המשחק נגמר!</h2>
      <p className="text-xl mb-8">הניקוד הסופי שלך: {finalScore}</p>
      <p className="text-lg mb-8 text-gray-600">
        {finalScore >= SCORE_TO_ADVANCE ? 'הגעת לרמה הקשה - כל הכבוד!' : 'נסה שוב להגיע לרמה הקשה'}
      </p>
      <button
        onClick={() => {
          setGameState('welcome');
          setTotalScore(0);
          setFinalScore(0);
        }}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg rounded-xl
                   hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
      >
        משחק חדש
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {gameState === 'welcome' && <WelcomeScreen />}
      {gameState === 'playing' && (
        <Game 
          difficulty={getCurrentDifficulty()} 
          onGameOver={handleGameOver}
          onLevelComplete={(score) => {
            setTotalScore(score);
            setGameState('levelUp');
          }}
        />
      )}
      {gameState === 'levelUp' && <LevelUpScreen />}
      {gameState === 'gameOver' && <GameOver />}
    </div>
  );
};

export default App;