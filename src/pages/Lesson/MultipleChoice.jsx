import { useState } from 'react';
import QuizButton from './QuizButton';
import Button from '../../components/Button';
import './styles/MultipleChoice.css';

export default function MultipleChoice({ answers, question, nextQuestion }) {
    const [enabled, setEnabled] = useState(true);
    const [correct, setCorrect] = useState(false);

    const buttons = answers.map((item, index) => {
        return (
            <QuizButton
                enabled={enabled}
                onAnswer={handleAnswer}
                key={index}
                index={index}
                text={item.answer}
                correct={item.correct}
            />
        );
    });

    function handleAnswer(correct) {
        setCorrect(correct);
        setEnabled(false);
    }

    return (
        <div className="multiple-choice">
            <h2 className="white-text title">{question}</h2>
            <div className="answer-container">{buttons}</div>
            {!enabled && (
                <Button
                    text="Next"
                    type="accent"
                    bold={true}
                    onClick={() => {
                        nextQuestion(correct);
                        setEnabled(true);
                    }}
                    styles={{
                        padding: '10px 24px',
                        margin: '0 40px',
                    }}
                />
            )}
        </div>
    );
}
