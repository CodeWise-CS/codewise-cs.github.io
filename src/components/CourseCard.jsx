import { useState, useEffect, useContext } from 'react';
import ProgressBar from './ProgressBar';
import './styles/CourseCard.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CourseContext } from '../context/CourseContext';

export default function CourseCard({ courseName }) {
    const navigate = useNavigate();
    const { courses } = useContext(CourseContext);
    const { user } = useContext(UserContext);
    const [cardData, setCardData] = useState(null);
    const [length, setLength] = useState(1);
    const [progress, setProgress] = useState(0);
    const [lessonTitle, setLessonTitle] = useState('loading...');

    useEffect(() => {
        if (user && courses) {
            const tempProgress = user.coursesInProgress?.courseNames.includes(
                courseName
            )
                ? user.coursesInProgress[courseName].currentLesson
                : 0;
            setLength(courses.courses[courseName].length);
            setProgress(tempProgress);
            setLessonTitle(
                courses.courses[courseName][tempProgress].lessonName
            );
        }
    }, [courses, user]);

    useEffect(() => {
        if (courses) {
            setCardData(courses.courses.cardData[courseName]);
        }
    }, [courses]);

    return (
        <button
            tabIndex="1"
            className="interactable course-card"
            onClick={() => {
                navigate(`/course-overview/${courseName}`);
            }}
        >
            {cardData !== null && (
                <div
                    style={{ backgroundColor: cardData.color }}
                    className="course-header"
                >
                    <p className="course-title">{cardData.title}</p>
                    <img
                        className="course-logo"
                        src={cardData.imageURL}
                        alt={courseName + ' logo'}
                    />
                </div>
            )}
            <div className="info-section">
                <p className="secondary-text current-lesson">
                    <span className="bold">Current lesson:</span> {lessonTitle}
                </p>
                <ProgressBar progress={Math.round((progress / length) * 100)} />
            </div>
        </button>
    );
}
