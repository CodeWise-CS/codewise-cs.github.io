import { useContext } from 'react';
import Header from '../../components/Header';
import { CourseContext } from '../../context/CourseContext';
import CourseGrid from '../../components/CourseGrid';

export default function ExploreCourses() {
    let { courses } = useContext(CourseContext);
    courses = courses.courses;
    let cardData = [];

    if (courses) {
        const courseNames = courses.courseNames;
        const cardCount = courseNames.length; //<= 10 ? courseNames.length : 10;

        for (let i = 0; i < cardCount; i++) {
            let course = courses[courseNames[i]];
            cardData.push({
                courseName: courseNames[i],
                courseLength: course.length,
                description: '',
            });
        }
    }

    return (
        <div className="explore-courses">
            <Header text="Explore courses" styles={{ marginBottom: '20px' }} />
            {courses && <CourseGrid cardData={cardData} />}
        </div>
    );
}
