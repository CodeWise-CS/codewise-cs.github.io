import { useState, useEffect, useContext } from 'react';
import Exercise from './Exercise';
import Lesson from './Lesson';
import { UserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../../context/CourseContext';
import './styles/LessonHandler.css';
import { setUserData } from '../../firebase';
import Loader from '../../components/Loader';

export default function LessonHandler() {
    const { courses } = useContext(CourseContext);
    const { user } = useContext(UserContext);
    const { course } = useParams();
    const queryParameters = new URLSearchParams(window.location.search);
    const [lessonNumber, setLessonNumber] = useState(
        queryParameters.get('lesson')
    );
    const [lesson, setLesson] = useState(null);

    console.log(courses);

    function handleEnd(accuracy) {
        console.log('handle end: ', user);
        if (user) {
            if (user.coursesInProgress[course].currentLesson == lessonNumber) {
                // setUserData(course, { currentLesson: Number(lessonNumber) + 1 }, `coursesInProgress`);
                setUserData(
                    Number(lessonNumber) + 1,
                    `coursesInProgress/${course}/currentLesson`
                );
            }
            queryParameters.set('lesson', Number(lessonNumber) + 1);
            setLessonNumber(Number(lessonNumber) + 1);
            history.replaceState(null, null, '?' + queryParameters.toString());
        }
    }

    useEffect(() => {
        if (courses) {
            if (courses.courses.courseNames.includes(course)) {
                setLesson(courses.courses[course][lessonNumber]);
            }
        }
    }, [courses, lessonNumber]);

    return lesson ? (
        lesson.type === 'exercise' ? (
            <Exercise handleEnd={handleEnd} lesson={lesson} />
        ) : (
            <Lesson handleEnd={handleEnd} lesson={lesson} />
        )
    ) : (
        <Loader />
    );
}
