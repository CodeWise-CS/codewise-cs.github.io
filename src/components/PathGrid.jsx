import React, { useState, useEffect, useContext } from 'react';
import LessonCard from './LessonCard';
import { UserContext } from '../context/UserContext';
import './styles/PathGrid.css';
import { useNavigate } from 'react-router-dom';

export default function PathGrid({ course, courseName }) {
    const [courses, setCourses] = useState(course);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    let rows = null;

    const completedLessons = user.coursesInProgress.courseNames.includes(
        courseName
    )
        ? user.coursesInProgress[courseName].currentLesson
        : null;

    let elements = null;

    useEffect(() => {
        setLoading(false);
    }, []);

    if (!loading) {
        const filteredCourses = courses.filter(
            (item) => item.type !== 'exercise'
        );
        elements = filteredCourses.map((item, index) => {
            const completed = index + 1 <= Math.floor(completedLessons / 2);
            let progress = completedLessons % 2 === 0 ? 100 : 50;
            let started = !completed;

            if (index === Math.floor(completedLessons / 2)) {
                started = false;
                progress = completedLessons % 2 === 0 ? 0 : 50;
            }

            if (completed) {
                progress = null;
            }
            if (started) {
                progress = 0;
            }

            return index % 3 ? (
                <React.Fragment key={index}>
                    <div className="horizontal-line"></div>
                    <LessonCard
                        onClick={() => {
                            console.log(
                                `/lesson/${courseName}?lesson=${
                                    index * 2 + (progress === 50 ? 1 : 0)
                                }`
                            );
                            navigate(
                                `/lesson/${courseName}?lesson=${
                                    index * 2 + (progress === 50 ? 1 : 0)
                                }`
                            );
                        }}
                        lessonName={item.lessonName}
                        completed={completed}
                        progress={progress}
                    />
                </React.Fragment>
            ) : (
                // Fix styling
                <React.Fragment key={index}>
                    {/* {row !== 0 && (
            <div className={row % 2 ? "right-line" : "left-line"}></div>
          )} */}
                    <LessonCard
                        onClick={() => {
                            console.log(
                                `/lesson/${courseName}?lesson=${
                                    index * 2 + (progress === 50 ? 1 : 0)
                                }`
                            );
                            navigate(
                                `/lesson/${courseName}?lesson=${
                                    index * 2 + (progress === 50 ? 1 : 0)
                                }`
                            );
                        }}
                        lessonName={item.lessonName}
                        completed={completed}
                        progress={progress}
                    />
                </React.Fragment>
            );
        });

        const chunkedElements = chunkArray(elements, 3);
        rows = chunkedElements.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    {index !== 0 && (
                        <div
                            className={index % 2 ? 'right-line' : 'left-line'}
                        ></div>
                    )}
                    <div className={`row ${index % 2 ? 'reverse' : ''}`}>
                        {...item}
                    </div>
                </React.Fragment>
            );
        });
    }
    function chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            const chunk = array.slice(i, i + size);
            result.push(chunk);
        }

        return result;
    }

    return <div className="path-grid">{rows !== null && rows}</div>;
}
