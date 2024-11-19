import { useState, useEffect, useContext } from 'react';
import Exercise from './Exercise';
import Lesson from './Lesson';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate();

    function handleFinishedCourse() {
        const finalAccuracy =
            (user.coursesInProgress[course].correctAnswers /
                user.coursesInProgress[course].questionsAnswered) *
            100;
        setUserData({}, `coursesInProgress/${course}`);
        setUserData(
            user.coursesInProgress.courseNames.filter(
                (name) => name !== course
            ),
            'coursesInProgress/courseNames'
        );
        console.log(
            'SET COMPLETED COURSE: ',
            user.completedCourses
                ? [
                      ...user.completedCourses,
                      { name: course, accuracy: finalAccuracy },
                  ]
                : [{ name: course, accuracy: finalAccuracy }]
        );
        setUserData(
            user.completedCourses
                ? [
                      ...user.completedCourses,
                      { name: course, accuracy: finalAccuracy },
                  ]
                : [{ name: course, accuracy: finalAccuracy }],
            'completedCourses'
        );
        navigate(`/completed/${course}`);
    }

    function handleEnd(questionCount, correctCount) {
        if (user) {
            if (Number(lessonNumber) + 1 == courses.courses[course].length) {
                handleFinishedCourse();
                return;
            }
            if (user.coursesInProgress[course].currentLesson == lessonNumber) {
                let newCorrectCount = correctCount;
                let newQuestionCount = questionCount;

                if (user.coursesInProgress && user.coursesInProgress[course]) {
                    newCorrectCount +=
                        user.coursesInProgress[course].questionsAnswered;
                    newQuestionCount +=
                        user.coursesInProgress[course].correctAnswers;
                }
                if (questionCount !== undefined && correctCount !== undefined) {
                    setUserData(
                        {
                            currentLesson: Number(lessonNumber) + 1,
                            questionsAnswered: newQuestionCount,
                            correctAnswers: newCorrectCount,
                        },
                        `coursesInProgress/${course}`
                    );
                } else {
                    setUserData(
                        Number(lessonNumber) + 1,
                        `coursesInProgress/${course}/currentLesson`
                    );
                }
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
