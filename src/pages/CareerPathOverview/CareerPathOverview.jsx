import { useState, useContext, useEffect } from 'react';
import TopNavbar from '../../components/TopNavbar';
import { useParams } from 'react-router-dom';
import './styles/CareerPathOverview.css';
import { UserContext } from '../../context/UserContext';
import CourseList from './CourseList';
import CourseCard from '../../components/CourseCard';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';

export default function CareerPathOverview() {
    const { fetchDataWithCache } = useFetchWithCache();
    const { careerPath } = useParams();
    const { user } = useContext(UserContext);
    const [courseCards, setCourseCards] = useState(null);
    const [title, setTitle] = useState('Loading...');
    let [found, setFound] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await fetchDataWithCache('career-paths', [careerPath]);
            if (!data) {
                setFound(false);
                return;
            }
            setTitle(data.title);
            const courseNames = data.courses.map((course) => course.id);
            let courseData = await fetchDataWithCache('courses', courseNames);
            if (!Array.isArray(courseData)) {
                courseData = [courseData];
            }

            setCourseCards(
                courseData.map((course) => (
                    <CourseCard
                        key={course.id}
                        courseName={course.id}
                        title={course.title}
                        length={course.length}
                        imageURL={course.imageURL}
                        color={course.color}
                    />
                ))
            );
        })();
    }, []);

    return (
        <div className="course-overview">
            <TopNavbar />
            <h1 className="secondary-text">{title}</h1>
            {found && user ? (
                courseCards ? (
                    <CourseList courseCards={courseCards} />
                ) : (
                    <p className="secondary-text">Loading career path...</p>
                )
            ) : !found && user ? (
                <p>{`Course "${careerPath}" not found`}</p>
            ) : null}
        </div>
    );
}
