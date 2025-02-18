import React, { useRef, useState, useEffect } from 'react';

interface WordBoxProps {
  length: number;
  onWordComplete: (word: string) => void;
  isActive: boolean;
  onFocus: () => void;
  verseIndex: number;
  onBackspace?: () => void;
  onMoveToNextWord: () => void;
}

const WordBox: React.FC<WordBoxProps> = ({ 
  length, 
  onWordComplete, 
  isActive, 
  onFocus, 
  verseIndex,
  onBackspace,
  onMoveToNextWord
}) => {
  const [letters, setLetters] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  useEffect(() => {
    setLetters(Array(length).fill(''));
  }, [verseIndex, length]);

  useEffect(() => {
    if (isActive) {
      // תמיד מתמקד באות הראשונה כשהמילה הופכת לפעילה
      inputRefs.current[0]?.focus();
    }
  }, [isActive]);

  const handleLetterChange = (index: number, value: string) => {
    value = value.trim();
    if (value.length > 1) return;
    
    const newLetters = [...letters];
    newLetters[index] = value;
    setLetters(newLetters);

    if (value !== '') {
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        onWordComplete(newLetters.join(''));
        onMoveToNextWord();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Backspace') {
      if (letters[index] === '') {
        e.preventDefault();
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        } else if (index === 0 && onBackspace) {
          // עובר למילה הקודמת רק אם אנחנו באות הראשונה
          onBackspace();
        }
      } else {
        const newLetters = [...letters];
        newLetters[index] = '';
        setLetters(newLetters);
      }
    }
  };

  return (
    <div 
      className={`flex gap-[2px] p-2 rounded-lg mx-1 transition-all ${
        isActive ? 'bg-blue-100 ring-2 ring-blue-200' : 'bg-gray-50'
      }`}
      onClick={onFocus}
    >
      {Array(length).fill(0).map((_, i) => (
        <input
          key={i}
          ref={el => inputRefs.current[i] = el}
          type="text"
          value={letters[i]}
          onChange={(e) => handleLetterChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          disabled={!isActive}
          maxLength={1}
          className={`w-8 h-10 border-2 text-center text-lg font-semibold rounded-lg 
            focus:outline-none focus:ring-2 cursor-text transition-colors
            ${isActive 
              ? 'border-blue-300 bg-white focus:border-blue-400 focus:ring-blue-200' 
              : 'border-gray-200 bg-gray-50'
            }
            ${isActive && letters[i] === '' ? 'animate-pulse-border' : ''}
          `}
          dir="rtl"
          style={{ caretColor: isActive ? 'blue' : 'transparent' }}
        />
      ))}
    </div>
  );
};

interface VerseDisplayProps {
  partialVerse: string;
  missingWords: Array<{ length: number }>;
  onAnswerUpdate: (answers: string[]) => void;
  verseIndex: number;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ 
  partialVerse, 
  missingWords,
  onAnswerUpdate,
  verseIndex 
}) => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(missingWords.length).fill(''));

  useEffect(() => {
    setActiveWordIndex(0);
    setAnswers(Array(missingWords.length).fill(''));
  }, [verseIndex, missingWords.length]);

  const handleWordComplete = (index: number, word: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = word;
    setAnswers(newAnswers);
    onAnswerUpdate(newAnswers);
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      setActiveWordIndex(index - 1);
      // הפוקוס על האות האחרונה יקרה דרך ה-useEffect בקומפוננטת WordBox
    }
  };

  const handleMoveToNextWord = () => {
    if (activeWordIndex < missingWords.length - 1) {
      setActiveWordIndex(prev => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md">
      <div className="flex flex-wrap gap-3 items-center text-xl text-right leading-10 justify-end" dir="rtl">
        <div className="w-full text-gray-800 font-medium">{partialVerse}</div>
        <div className="flex flex-wrap gap-3 justify-end">
          {missingWords.map((word, index) => (
            <WordBox 
              key={index}
              length={word.length}
              onWordComplete={(word) => handleWordComplete(index, word)}
              isActive={index === activeWordIndex}
              onFocus={() => setActiveWordIndex(index)}
              verseIndex={verseIndex}
              onBackspace={() => handleBackspace(index)}
              onMoveToNextWord={handleMoveToNextWord}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// הוספת אנימציה מהבהבת לגבול
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse-border {
    0% { border-color: #93C5FD; }
    50% { border-color: #3B82F6; }
    100% { border-color: #93C5FD; }
  }
  .animate-pulse-border {
    animation: pulse-border 2s infinite;
  }
`;
document.head.appendChild(style);

export default VerseDisplay;