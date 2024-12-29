import React from 'react';
import ProgressBar from './ProgressBar';
import './styles/LessonCard.css';

export default function LessonCard({
    completed,
    onClick,
    lessonName,
    progress,
}) {
    return (
        <button
            className={`lesson-card ${completed && 'completed-lesson-card'}`}
            onClick={onClick}
        >
            <p>{lessonName}</p>
            <ProgressBar progress={progress} />
        </button>
    );
}
