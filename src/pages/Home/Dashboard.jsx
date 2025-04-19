import './styles/Dashboard.css';
import { useState, useEffect, useContext } from 'react';
import CourseGrid from '../../components/CourseGrid';
import Header from '../../components/Header';
import { UserContext } from '../../context/UserContext';
import CareerPathCard from './CareerPathCard';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const { fetchDataWithCache } = useFetchWithCache();
    const [courseData, setCourseData] = useState([]);
    const [pathCards, setPathCards] = useState([]);

    useEffect(
        () =>
            alert(
                'Notice: CodeWise is an open-source project that is still in development. The courses are not completed and you may find bugs.\n\nFor information about contributing to the website, please visit https://github.com/CodeWise-CS/codewise-cs.github.io\nTo contribute to the curriculum, please visit https://github.com/CodeWise-CS/codewise-curriculum'
            ),
        []
    ); // Temporary notice that this website is still in development

    useEffect(() => {
        (async () => {
            const careerPaths = await fetchDataWithCache('career-paths');

            if (user?.careerPaths && careerPaths) {
                setPathCards(
                    user.careerPaths.map((pathName, i) => {
                        const careerPathInfo = careerPaths.filter(
                            (careerPath) => careerPath.id === pathName
                        )[0];
                        console.log('careerPathInfo: ', careerPathInfo);
                        const title = careerPathInfo.title;
                        const courseTitles = careerPathInfo.courses.map(
                            (item) => item.title
                        );

                        return (
                            <CareerPathCard
                                key={i}
                                title={title}
                                pathName={pathName}
                                courses={courseTitles}
                            />
                        );
                    })
                );
            }
        })();
    }, [user]);

    useEffect(() => {
        if (user && courseData.length === 0 && user.coursesInProgress) {
            const courseNames = user.coursesInProgress.courseNames;
            const fetchCourses = async () => {
                const courseInfo = await fetchDataWithCache(
                    'courses',
                    courseNames
                );

                setCourseData(courseInfo);
            };
            fetchCourses();
        }
    }, [user, courseData]);

    return (
        <div className="dashboard">
            <Header text="In progress" styles={{ marginBottom: '20px' }} />
            {courseData?.length > 0 ? (
                <CourseGrid cardData={courseData} />
            ) : (
                <p className="body-text">No courses in progress</p>
            )}
            <Header
                text="Saved career paths"
                styles={{ margin: '40px 0 20px 0' }}
            />
            <div className="career-path-container">
                {user?.careerPaths?.length > 0 ? (
                    pathCards
                ) : (
                    <p className="body-text">No saved career paths</p>
                )}
            </div>
        </div>
    );
}
