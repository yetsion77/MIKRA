import React, { useState, useEffect } from 'react';
import VerseDisplay from './VerseDisplay.tsx';
import { Verse, getVersesByDifficulty } from '../data/versesData.ts';

interface GameProps {
  difficulty: 'easy' | 'hard';
  onGameOver: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ difficulty, onGameOver }) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [showSource, setShowSource] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  
  useEffect(() => {
    const loadedVerses = getVersesByDifficulty(difficulty);
    setVerses(loadedVerses);
  }, [difficulty]);

  const currentVerse = verses[currentVerseIndex];

  const handleAnswerUpdate = (answers: string[]) => {
    setCurrentAnswers(answers);
    
    // בדוק אם כל המילים הוקלדו
    if (!answers.includes('')) {
      checkAnswer(answers);
    }
  };

  const checkAnswer = (answers: string[]) => {
    const correctAnswer = currentVerse.missingWords.join(' ');
    const userAnswer = answers.join(' ');
    
    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      setFeedbackVisible(true);
      setShowSource(true);
      
      setTimeout(() => {
        setScore(score + 1);
        if (currentVerseIndex < verses.length - 1) {
          setCurrentVerseIndex(prev => prev + 1);
          setShowSource(false);
          setFeedbackVisible(false);
          setIsCorrect(null);
          setCurrentAnswers([]);
        } else {
          onGameOver(score + 1);
        }
      }, 2000);
    } else {
      setIsCorrect(false);
      setFeedbackVisible(true);
      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= 2) {
          setTimeout(() => onGameOver(score), 1500);
        }
        return newMistakes;
      });
      
      setTimeout(() => {
        setFeedbackVisible(false);
        setIsCorrect(null);
      }, 2000);
    }
  };

  if (!currentVerse) return null;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        {/* כותרת וניקוד */}
        <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="text-lg font-semibold">
            ניקוד: 
            <span className="mx-2 px-3 py-1 bg-blue-500 text-white rounded-lg">
              {score}
            </span>
          </div>
          <div className="text-lg font-semibold flex items-center gap-2">
            טעויות: 
            <div className="flex gap-1">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < mistakes ? 'bg-red-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* תצוגת הפסוק */}
        <div className="mb-8">
          <VerseDisplay 
            partialVerse={currentVerse.partialVerse}
            missingWords={currentVerse.missingWords.map(word => ({ length: word.length }))}
            onAnswerUpdate={handleAnswerUpdate}
            verseIndex={currentVerseIndex}
          />
        </div>

        {/* משוב */}
        {feedbackVisible && (
          <div 
            className={`p-4 rounded-xl text-center text-lg font-semibold mb-4 transition-all ${
              isCorrect 
                ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                : 'bg-red-100 text-red-700 border-2 border-red-200'
            }`}
          >
            {isCorrect ? 'כל הכבוד! התשובה נכונה' : 'לא מדויק, נסה שוב'}
          </div>
        )}

        {/* מקור */}
        {showSource && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl text-right animate-fade-in border-2 border-blue-100">
            <span className="text-gray-600">מקור: </span>
            <span className="font-semibold text-blue-800">{currentVerse.source}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;