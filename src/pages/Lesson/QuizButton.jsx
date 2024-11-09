import { useState, useEffect } from 'react';
import './styles/QuizButton.css';

export default function QuizButton({ correct, enabled, text, onAnswer }) {
    const [buttonClass, setButtonClass] = useState('');

    useEffect(() => {
        if (correct && !enabled) setButtonClass('correct');
        else if (enabled) setButtonClass('');
    }, [enabled]);

    function handleClick() {
        if (enabled) {
            setButtonClass(correct ? 'correct' : 'incorrect');
            onAnswer(correct);
        }
    }

    return (
        <button onClick={handleClick} className={`quiz-button ${buttonClass}`}>
            {text}
            <div className="circle"></div>
        </button>
    );
}
