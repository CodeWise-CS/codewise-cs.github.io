import React, { useState, useEffect, useContext } from 'react';
import './styles/Exercise.css';
import TopNavbar from '../../components/TopNavbar';
import ProgressBar from '../../components/ProgressBar';
import { UserContext } from '../../context/UserContext';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import FillQuestion from './FillQuestion';

export default function Exercise({ lesson, handleEnd }) {
    const { course } = useParams();
    const { user } = useContext(UserContext);
    const queryParameters = new URLSearchParams(window.location.search);
    const lessonNumber = queryParameters.get('lesson');
    const [hasPermission, setHasPermission] = useState(true);
    const [questionNumber, setQuestionNumber] = useState(0);
    const length = lesson.questions.length;
    const [correctCount, setCorrectCount] = useState(0);

    function nextQuestion(correct) {
        if (correct) {
            setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
        }
        setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    useEffect(() => {
        if (user) {
            if (user.coursesInProgress[course].currentLesson < lessonNumber) {
                setHasPermission(false);
            }
        }
    }, [user]);

    return hasPermission ? (
        <div className="exercise">
            <TopNavbar />
            <h1 className="secondary-text title">
                {lesson ? lesson.lessonName : 'Loading...'}
            </h1>
            <div className="main-content">
                {questionNumber < length ? (
                    <React.Fragment>
                        <ProgressBar
                            progress={(questionNumber / length) * 100}
                        />
                        <p className="white-text question-count">
                            Question {questionNumber + 1} of {length}
                        </p>
                        {lesson.questions[questionNumber].type ===
                            'multiple_choice' && (
                            <MultipleChoice
                                nextQuestion={nextQuestion}
                                question={
                                    lesson.questions[questionNumber].question
                                }
                                answers={shuffle(
                                    lesson.questions[questionNumber].answers
                                )}
                            />
                        )}
                        {lesson.questions[questionNumber].type ===
                            'fill_in' && (
                            <FillQuestion
                                nextQuestion={nextQuestion}
                                question={
                                    lesson.questions[questionNumber].question
                                }
                                text={lesson.questions[questionNumber].text}
                            />
                        )}
                    </React.Fragment>
                ) : (
                    <div className="results">
                        <div className="">
                            <h2 className="white-text result-title">Results</h2>
                            <ProgressBar
                                progress={(correctCount / length) * 100}
                            />
                            <p className="white-text correct-count">
                                <span className="bold">Accuracy: </span>
                                {correctCount}/{length}
                            </p>
                        </div>
                        <Button
                            text="Next lesson"
                            type="transparent"
                            onClick={() => {
                                handleEnd((correctCount / length) * 100);
                            }}
                            styles={{
                                borderColor: 'var(--white-color)',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                padding: '10px 24px',
                                margin: '0 40px',
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div>
            <p>You must complete the previous lessons to view this one</p>
        </div>
    );
}
