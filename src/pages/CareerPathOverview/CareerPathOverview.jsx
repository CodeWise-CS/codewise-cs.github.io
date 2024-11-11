import { useState, useContext } from 'react';
import TopNavbar from '../../components/TopNavbar';
import capitalize from '../../utils/capitalize';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../../context/CourseContext';
import './styles/CareerPathOverview.css';
import { UserContext } from '../../context/UserContext';
import CourseList from './CourseList';
import CourseCard from '../../components/CourseCard';

export default function CareerPathOverview() {
    const { careerPath } = useParams();
    const { courses } = useContext(CourseContext);
    const { user } = useContext(UserContext);
    let courseCards = null;
    let currentPath = null;
    let found = true;

    if (courses) {
        if (Object.keys(courses.careerPaths).includes(careerPath)) {
            currentPath = courses.careerPaths[careerPath];
            courseCards = currentPath.courses.map((courseName) => {
                return <CourseCard courseName={courseName} />;
            });
        } else {
            found = false;
        }
    }

    return (
        <div className="course-overview">
            <TopNavbar />
            <h1 className="secondary-text">
                {courses
                    ? courses.careerPaths[careerPath]
                        ? courses.careerPaths[careerPath].title
                        : capitalize(careerPath)
                    : 'Loading...'}
            </h1>
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
