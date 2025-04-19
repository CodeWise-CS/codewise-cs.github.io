import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import './styles/FillQuestion.css';

export default function FillQuestion({ text, question, nextQuestion }) {
    const [inputs, setInputs] = useState({});
    const [correct, setCorrect] = useState(null);
    let correctInputs = {};
    const parsedContent = parseString(text);

    function parseString(str) {
        const parts = str.split('<@>');
        return parts.map((part, index) => {
            if (index % 2 == 1) {
                correctInputs[index] = part;

                return (
                    <Input
                        index={index}
                        handleChange={handleChange}
                        values={inputs}
                        key={index}
                    />
                );
            }
            return (
                <span className="code-text" key={index}>
                    {part}
                </span>
            );
        });
    }

    function handleChange(index, value) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [index]: value,
        }));
    }

    function handleSubmit() {
        let tempCorrect = true;

        for (let key of Object.keys(correctInputs)) {
            if (correctInputs[key] !== inputs[key]) {
                tempCorrect = false;
            }
        }
        setCorrect(tempCorrect);
    }

    function handleNext() {
        const wasCorrect = correct;
        setCorrect(null);
        setInputs({});
        nextQuestion(wasCorrect);
    }

    return (
        <div className="fill-question">
            <h3 className="white-text title">{question}</h3>
            <div
                className="input-container"
                style={{
                    borderColor: correct
                        ? 'var(--success-color)'
                        : 'var(--white-color)',
                }}
            >
                {parsedContent}
            </div>
            {correct !== null && correct !== true && (
                <React.Fragment>
                    <h4 className="answer-title">Correct answer:</h4>
                    <p className="answer-text">{text.replaceAll('<@>', '')}</p>
                </React.Fragment>
            )}

            <Button
                text={correct === null ? 'Submit' : 'Next'}
                type="accent"
                bold={true}
                onClick={correct === null ? handleSubmit : handleNext}
                styles={{
                    padding: '10px 24px',
                    margin: '0 40px',
                }}
            />
        </div>
    );
}

function Input({ index, values, handleChange }) {
    const inputRef = useRef(null);
    const spanRef = useRef(null);

    useEffect(() => {
        const span = spanRef.current;
        const input = inputRef.current;
        span.textContent = values[index];
        input.style.width = `${span.offsetWidth}px`;
    }, [values[index]]);

    return (
        <>
            <span
                ref={spanRef}
                className="hidden-span"
                aria-hidden="true"
            ></span>
            <input
                ref={inputRef}
                value={values[index] !== undefined ? values[index] : ''}
                onChange={(e) => {
                    handleChange(index, e.target.value);
                }}
                className="dynamic-input"
            />
        </>
    );
}
