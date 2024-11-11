import './styles/Dashboard.css';
import { useState, useEffect, useContext } from 'react';
import CourseGrid from '../../components/CourseGrid';
import Header from '../../components/Header';
import { UserContext } from '../../context/UserContext';
import { CourseContext } from '../../context/CourseContext';
import CareerPathCard from './CareerPathCard';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const { courses } = useContext(CourseContext);
    const [courseData, setCourseData] = useState([]);
    const [pathCards, setPathCards] = useState();
    // if (user?.careerPaths) {
    //     console.log('COURSES: ', courses);
    //     const careerPaths = courses.careerPaths;

    //     pathCards = Object.keys(user.careerPaths).map((pathName, i) => {
    //         const title = careerPaths[pathName].title;
    //         const courseList = careerPaths[pathName].courses;
    //         const courseNames = courseList.map(
    //             (course) => courses.courses.cardData[course].title
    //         );

    //         return (
    //             <CareerPathCard
    //                 key={i}
    //                 title={title}
    //                 pathName={pathName}
    //                 courses={courseNames}
    //             />
    //         );
    //     });
    // }

    useEffect(() => {
        if (user?.careerPaths && courses?.careerPaths) {
            const careerPaths = courses.careerPaths;

            setPathCards(
                user.careerPaths.map((pathName, i) => {
                    const title = careerPaths[pathName].title;
                    const courseList = careerPaths[pathName].courses;
                    const courseNames = courseList.map(
                        (course) => courses.courses.cardData[course].title
                    );

                    return (
                        <CareerPathCard
                            key={i}
                            title={title}
                            pathName={pathName}
                            courses={courseNames}
                            saved={user.careerPaths?.includes(pathName)}
                        />
                    );
                })
            );
        }
    }, [user, courses]);

    useEffect(() => {
        if (
            user &&
            courses &&
            courseData.length === 0 &&
            user.coursesInProgress
        ) {
            setCourseData([]);
            for (let courseName of user.coursesInProgress.courseNames) {
                setCourseData((prevCourseData) => {
                    return [
                        ...prevCourseData,
                        {
                            courseName: courseName,
                            courseLength: courses.courses[courseName].length,
                            description: '',
                        },
                    ];
                });
            }
        }
    }, [user, courses]);

    // name, length, description

    return (
        <div className="dashboard">
            <Header text="In progress" styles={{ marginBottom: '20px' }} />
            {courseData && <CourseGrid cardData={courseData} />}
            <Header
                text="Saved career paths"
                styles={{ margin: '40px 0 20px 0' }}
            />
            <div className="career-path-container">
                {user?.careerPaths && pathCards}
            </div>
        </div>
    );
}
