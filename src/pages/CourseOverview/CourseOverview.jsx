import { useContext, useEffect } from 'react';
import TopNavbar from '../../components/TopNavbar';
import PathGrid from '../../components/PathGrid';
import capitalize from '../../utils/capitalize';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseContext } from '../../context/CourseContext';
import './styles/CourseOverview.css';
import { UserContext } from '../../context/UserContext';

export default function CourseOverview() {
    const { course } = useParams();
    const { courses } = useContext(CourseContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    let currentCourse = null;
    let found = true;

    if (courses) {
        if (courses.courses.courseNames.includes(course)) {
            currentCourse = courses.courses[course];
        } else {
            found = false;
        }
    }

    function checkCompletion() {
        if (
            user?.completedCourses &&
            user.completedCourses.find((_course) => _course.name === course) &&
            courses
        ) {
            navigate(`/completed/${course}`);
        }
    }

    checkCompletion();

    useEffect(() => {
        checkCompletion();
    }, []); //[user, courses]);

    return (
        <div className="course-overview">
            <TopNavbar />
            <h1 className="secondary-text">
                {courses
                    ? courses.courses.cardData[course]
                        ? courses.courses.cardData[course].title
                        : capitalize(course)
                    : 'Loading...'}
            </h1>
            {found && user ? (
                currentCourse ? (
                    <PathGrid course={currentCourse} courseName={course} />
                ) : (
                    <p className="secondary-text">Loading course...</p>
                )
            ) : !found && user ? (
                <p>{`Course "${course}" not found`}</p>
            ) : null}
        </div>
    );
}
