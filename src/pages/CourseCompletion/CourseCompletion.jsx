import './styles/CourseCompletion.css';
import { useParams } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import TopNavbar from '../../components/TopNavbar';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { CourseContext } from '../../context/CourseContext';
import { auth } from '../../firebase';
import Certificate from './Certificate';
import Loader from '../../components/Loader';

export default function CourseCompletion() {
    const { course } = useParams();
    const { user } = useContext(UserContext);
    const { courses } = useContext(CourseContext);
    const [accuracy, setAccuracy] = useState(0);
    console.log(courses);

    useEffect(() => {
        if (courses && user) {
            setAccuracy(
                user.completedCourses.find(
                    (completedCourse) => completedCourse.name === course
                )?.accuracy
            );
        }
    }, [courses, user]);

    return (
        <div className="course-completion">
            <TopNavbar />
            {courses && user ? (
                !courses.courses.courseNames.includes(course) ? (
                    <p>Course not found</p>
                ) : user.completedCourses.find(
                      (completedCourse) => completedCourse.name === course
                  ) ? (
                    <>
                        <h1 className="secondary-text title">
                            Congratulations for completing the{' '}
                            {courses.courses.cardData[course]?.title} course!
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
                                    course={course}
                                    courseDisplayName={
                                        courses.courses.cardData[course]?.title
                                    }
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
