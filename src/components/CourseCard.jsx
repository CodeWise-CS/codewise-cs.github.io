import { useState, useEffect, useContext } from 'react';
import ProgressBar from './ProgressBar';
import './styles/CourseCard.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useFetchWithCache } from '../hooks/useFetchWithCache';

// Display 100% progress when course completed

export default function CourseCard({
    courseName,
    title,
    length,
    imageURL,
    color,
}) {
    const navigate = useNavigate();
    const { fetchDataWithCache } = useFetchWithCache();
    const { user } = useContext(UserContext);
    const [progress, setProgress] = useState(0);
    const [lessonTitle, setLessonTitle] = useState('loading...');

    useEffect(() => {
        (async () => {
            if (user) {
                const progress = user.coursesInProgress
                    ? user.coursesInProgress[courseName].currentLesson
                    : 0;

                if (
                    !user?.completedCourses
                        ?.map((item) => item.name)
                        .includes(courseName)
                ) {
                    setProgress(progress);
                    const lesson = await fetchDataWithCache(
                        `courses/${courseName}/lessons`,
                        [`lesson${progress + 1}`]
                    );
                    setLessonTitle(lesson.name);
                } else {
                    setLessonTitle(null);
                }
            }
        })();
    }, [user]);

    return (
        <button
            tabIndex="1"
            className="interactable course-card"
            onClick={() => {
                navigate(`/course-overview/${courseName}`);
            }}
        >
            <div style={{ backgroundColor: color }} className="course-header">
                <p className="course-title">{title}</p>
                <img
                    className="course-logo"
                    src={imageURL}
                    alt={courseName + ' logo'}
                />
            </div>

            <div className="info-section">
                {lessonTitle ? (
                    <p className="secondary-text current-lesson">
                        <span className="bold">Current lesson:</span>{' '}
                        {lessonTitle}
                    </p>
                ) : (
                    <p className="secondary-text current-lesson">
                        <span className="bold">Course completed</span>
                    </p>
                )}
                <ProgressBar
                    progress={
                        user?.completedCourses
                            ?.map((item) => item.name)
                            .includes(courseName)
                            ? 100
                            : Math.round((progress / length) * 100)
                    }
                />
            </div>
        </button>
    );
}
