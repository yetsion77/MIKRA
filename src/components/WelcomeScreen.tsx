import React from 'react';

interface WelcomeScreenProps {
  onStartGame: (difficulty: 'easy' | 'hard') => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
        השלם את הפסוק
      </h1>
      
      <div className="mb-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-semibold text-blue-800">הוראות המשחק</h2>
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
        </ul>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-2xl mb-6 text-center font-semibold text-gray-700">בחר רמת קושי</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onStartGame('easy')}
            className="p-6 text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-md"
          >
            <div className="font-bold text-2xl mb-2">קל</div>
            <div className="text-sm opacity-90">מתאים למתחילים</div>
          </button>
          <button
            onClick={() => onStartGame('hard')}
            className="p-6 text-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md"
          >
            <div className="font-bold text-2xl mb-2">קשה</div>
            <div className="text-sm opacity-90">למתקדמים</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;