import './styles/CourseCompletion.css';
import { useParams } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import TopNavbar from '../../components/TopNavbar';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { auth } from '../../firebase';
import Certificate from './Certificate';
import Loader from '../../components/Loader';

export default function CourseCompletion() {
    const { course } = useParams();
    const { user } = useContext(UserContext);
    const { fetchDataWithCache } = useFetchWithCache();
    const [accuracy, setAccuracy] = useState(0);
    const [currentCourse, setCurrentCourse] = useState();

    useEffect(() => {
        (async () => {
            const courses = await fetchDataWithCache('courses');
            setCurrentCourse(
                courses.filter((_course) => _course.id == course)[0]
            );
        })();
    }, []);

    useEffect(() => {
        if (user?.completedCourses) {
            setAccuracy(
                user.completedCourses.find(
                    (completedCourse) => completedCourse.name === course
                )?.accuracy
            );
        }
    }, [user]);

    return (
        <div className="course-completion">
            <TopNavbar />
            {user?.completedCourses ? (
                !currentCourse ? (
                    <p>Course not found</p>
                ) : user.completedCourses.find(
                      (completedCourse) => completedCourse.name === course
                  ) ? (
                    <>
                        <h1 className="secondary-text title">
                            Congratulations for completing the{' '}
                            {currentCourse.title} course!
                        </h1>
                        <div className="main-content">
                            <ProgressBar progress={accuracy} />
                            <p className="white-text correct-count">
                                <span className="bold">
                                    Average quiz accuracy:{' '}
                                </span>
                                {accuracy}%
                            </p>
                            <div className="certificate-container">
                                <Certificate
                                    fullName={auth.currentUser.displayName}
                                    username={user.username}
                                    accuracy={accuracy}
                                    imageURL={currentCourse.imageURL}
                                    courseDisplayName={currentCourse.title}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Course not finished</p>
                )
            ) : (
                <Loader />
            )}
        </div>
    );
}
