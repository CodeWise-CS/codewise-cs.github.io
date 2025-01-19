import React, { useState, useEffect, useContext } from 'react';
import LessonCard from './LessonCard';
import { UserContext } from '../context/UserContext';
import './styles/PathGrid.css';
import { useNavigate } from 'react-router-dom';

export default function PathGrid({ course, courseName }) {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const validLessons = course.filter((item) => item.type !== 'exercise');

        const completedLessons = user.coursesInProgress?.courseNames.includes(
            courseName
        )
            ? user.coursesInProgress[courseName].currentLesson
            : 0;

        const lessonElements = validLessons.map((item, index) =>
            createLessonElement(item, index, completedLessons)
        );

        const chunkedElements = chunkArray(lessonElements, 3);

        const formattedRows = chunkedElements.map((item, index) => (
            <React.Fragment key={index}>
                {index !== 0 && (
                    <div
                        className={index % 2 ? 'right-line' : 'left-line'}
                    ></div>
                )}
                <div className={`row ${index % 2 ? 'reverse' : ''}`}>
                    {item}
                </div>
            </React.Fragment>
        ));

        setRows(formattedRows);
    }, [course, courseName, user]);

    function createLessonElement(item, index, completedLessons) {
        const isCompleted = index + 1 <= Math.floor(completedLessons / 2);
        let progress = completedLessons % 2 === 0 ? 100 : 50;
        let isStarted = !isCompleted;

        if (index === Math.floor(completedLessons / 2)) {
            isStarted = false;
            progress = completedLessons % 2 === 0 ? 0 : 50;
        }

        if (isCompleted) progress = null;
        if (isStarted) progress = 0;

        return (
            <React.Fragment key={index}>
                {index % 3 !== 0 && <div className="horizontal-line"></div>}
                <LessonCard
                    onClick={() =>
                        navigate(
                            `/lesson/${courseName}?lesson=${
                                index * 2 + (progress === 50 ? 1 : 0)
                            }`
                        )
                    }
                    lessonName={item.lessonName}
                    completed={isCompleted}
                    progress={progress}
                />
            </React.Fragment>
        );
    }

    /**
     * Splits an array into chunks of a given size.
     */
    function chunkArray(array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
            array.slice(i * size, i * size + size)
        );
    }

    return <div className="path-grid">{rows}</div>;
}
