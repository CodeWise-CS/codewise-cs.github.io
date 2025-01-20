import './styles/CareerPaths.css';
import { useContext } from 'react';
import { CourseContext } from '../../context/CourseContext';
import Header from '../../components/Header';
import CareerPathCard from './CareerPathCard';
import { UserContext } from '../../context/UserContext';

export default function CareerPaths() {
    const { user } = useContext(UserContext);
    const { courses } = useContext(CourseContext);
    const careerPaths = courses.careerPaths;
    const pathCards = Object.keys(careerPaths).map((pathName, i) => {
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
    });

    return (
        <div className="career-paths">
            <Header text="Career paths" styles={{ marginBottom: '20px' }} />
            {pathCards}
        </div>
    );
}
