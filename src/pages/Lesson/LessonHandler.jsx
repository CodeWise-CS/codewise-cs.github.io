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
    const queryParameters = new URLSearchParams(
        window.location.hash.split('?')[1]
    );
    // const queryParameters = new URLSearchParams(window.location.search);
    const [lessonNumber, setLessonNumber] = useState(
        queryParameters.get('lesson')
    );
    const [lesson, setLesson] = useState(null);
    const navigate = useNavigate();

    function checkCompletion() {
        if (
            user?.completedCourses &&
            user.completedCourses.find((_course) => _course.name === course) &&
            courses
        ) {
            navigate(`/completed/${course}`);
        }
    }

    function handleFinishedCourse(questionCount, correctCount) {
        let finalAccuracy =
            ((user.coursesInProgress[course].correctAnswers + correctCount) /
                (user.coursesInProgress[course].questionsAnswered +
                    questionCount)) *
            100;
        finalAccuracy = Number(finalAccuracy.toFixed(2));
        setUserData({}, `coursesInProgress/${course}`);
        setUserData(
            user.coursesInProgress.courseNames.filter(
                (name) => name !== course
            ),
            'coursesInProgress/courseNames'
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
                handleFinishedCourse(questionCount, correctCount);
                return;
            }
            if (user.coursesInProgress[course].currentLesson == lessonNumber) {
                if (questionCount !== undefined && correctCount !== undefined) {
                    setUserData(
                        {
                            currentLesson: Number(lessonNumber) + 1,
                            questionsAnswered:
                                questionCount +
                                user.coursesInProgress[course]
                                    .questionsAnswered,
                            correctAnswers:
                                correctCount +
                                user.coursesInProgress[course].correctAnswers,
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
            navigate(`/lesson/${course}?lesson=${Number(lessonNumber) + 1}`);
            setLessonNumber(Number(lessonNumber) + 1);
        }
    }

    checkCompletion();

    useEffect(() => checkCompletion(), []);

    useEffect(() => {
        if (courses) {
            if (courses.courses.courseNames.includes(course)) {
                setLesson(courses.courses[course][lessonNumber]);
                console.log(
                    'Loading lesson: ',
                    course,
                    lessonNumber,
                    courses.courses[course][lessonNumber]
                );
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
