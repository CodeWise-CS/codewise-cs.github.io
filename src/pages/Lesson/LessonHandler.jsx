import { useState, useEffect, useContext } from 'react';
import Exercise from './Exercise';
import Lesson from './Lesson';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/LessonHandler.css';
import { setUserData } from '../../firebase';
import Loader from '../../components/Loader';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';

export default function LessonHandler() {
    const { fetchDataWithCache } = useFetchWithCache();
    const { user } = useContext(UserContext);
    const { course } = useParams();
    const queryParameters = new URLSearchParams(
        window.location.hash.split('?')[1]
    );
    // const queryParameters = new URLSearchParams(window.location.search);
    const [lessonNumber, setLessonNumber] = useState(
        queryParameters.get('lesson')
    );
    const [lessons, setLessons] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const navigate = useNavigate();

    function checkCompletion() {
        if (
            user?.completedCourses &&
            user.completedCourses.find((_course) => _course.name === course)
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

    async function handleEnd(questionCount, correctCount) {
        if (user && courseData) {
            const lessonCount = courseData.length;
            if (Number(lessonNumber) + 1 == lessonCount) {
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

    function getCurrentLesson() {
        const lesson = lessons.find(
            (lesson) => lesson.id == `lesson${Number(lessonNumber) + 1}`
        );
        return lesson ? lesson : null;
    }

    checkCompletion();

    useEffect(() => checkCompletion(), []);

    useEffect(() => {
        (async () => {
            const courseData = await fetchDataWithCache('courses', [course]);
            setCourseData(courseData);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const lessons = await fetchDataWithCache(
                `courses/${course}/lessons`
            );
            setLessons(lessons);
        })();
    }, []);

    return lessons && getCurrentLesson() ? (
        getCurrentLesson().type === 'exercise' ? (
            <Exercise handleEnd={handleEnd} lesson={getCurrentLesson()} />
        ) : (
            <Lesson
                handleEnd={handleEnd}
                lesson={getCurrentLesson()}
                languageID={courseData?.languageId}
            />
        )
    ) : (
        <Loader />
    );
}
