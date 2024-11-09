import { useState, useEffect, useContext } from 'react';
import CourseGrid from '../../components/CourseGrid';
import Header from '../../components/Header';
import { UserContext } from '../../context/UserContext';
import { CourseContext } from '../../context/CourseContext';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const { courses } = useContext(CourseContext);
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        console.log(courseData.length);
        if (user && courses && courseData.length === 0) {
            setCourseData([]);
            for (let courseName of user.coursesInProgress.courseNames) {
                console.log(courseName);
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
            <Header text="My career paths" styles={{ margin: '20px 0' }} />
        </div>
    );
}
