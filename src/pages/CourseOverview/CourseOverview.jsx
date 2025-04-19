import { useContext, useEffect, useState } from 'react';
import TopNavbar from '../../components/TopNavbar';
import PathGrid from '../../components/PathGrid';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/CourseOverview.css';
import { UserContext } from '../../context/UserContext';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';

export default function CourseOverview() {
    const { course } = useParams();
    const { fetchDataWithCache } = useFetchWithCache();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [currentCourse, setCurrentCourse] = useState(null);
    const [found, setFound] = useState(true);
    const [title, setTitle] = useState('Loading...');

    useEffect(() => {
        (async () => {
            const lessonData = await fetchDataWithCache(
                `courses/${course}/lessons`
            );
            setCurrentCourse(lessonData);
            if (lessonData.length === 0) {
                setFound(false);
            }
            const courseData = await fetchDataWithCache(`courses`, [course]);
            setTitle(courseData.title);
        })();
    }, []);

    useEffect(() => console.log(currentCourse), [currentCourse]);

    function checkCompletion() {
        if (
            user?.completedCourses &&
            user.completedCourses.find((_course) => _course.name === course)
        ) {
            navigate(`/completed/${course}`);
        }
    }

    checkCompletion();

    useEffect(() => {
        checkCompletion();
    }, []);

    return (
        <div className="course-overview">
            <TopNavbar />
            {found && <h1 className="secondary-text">{title}</h1>}
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
