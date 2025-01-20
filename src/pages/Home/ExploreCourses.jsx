import { useState, useEffect, useContext } from 'react';
import { CourseContext } from '../../context/CourseContext';
import Header from '../../components/Header';
import CourseGrid from '../../components/CourseGrid';
import TextInput from '../../components/TextInput';
import filter from '../../utils/filter';

export default function ExploreCourses() {
    const [search, setSearch] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [cardData, setCardData] = useState([]);
    let { courses } = useContext(CourseContext);
    courses = courses.courses;

    useEffect(() => {
        if (search === '') {
            setFilteredCourses([]);
        } else if (courses) {
            const courseNames = courses.courseNames;
            const filteredCourses = filter(courseNames, search);
            setFilteredCourses(filteredCourses);
        }
    }, [search]);

    useEffect(() => {
        if (courses) {
            const courseNames =
                search !== '' ? filteredCourses : courses.courseNames;
            // const cardCount = courseNames.length;
            const newCardData = [];

            for (let courseName of courseNames) {
                let course = courses[courseName];

                newCardData.push({
                    courseName,
                    courseLength: course.length,
                    description: '',
                });
            }

            setCardData(newCardData);
        }
    }, [filteredCourses]);

    return (
        <div className="explore-courses">
            <Header text="Explore courses" styles={{ marginBottom: '20px' }} />
            <TextInput
                placeholder="Search courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                styles={{ marginBottom: '50px', maxWidth: '438px' }}
            />
            {cardData && <CourseGrid cardData={cardData} />}
        </div>
    );
}
