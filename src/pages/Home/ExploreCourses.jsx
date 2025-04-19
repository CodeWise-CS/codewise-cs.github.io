import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import CourseGrid from '../../components/CourseGrid';
import TextInput from '../../components/TextInput';
import filter from '../../utils/filter';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';

export default function ExploreCourses() {
    const { fetchDataWithCache } = useFetchWithCache();
    const [search, setSearch] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [courses, setCourses] = useState();

    useEffect(() => {
        (async () => {
            const courseData = await fetchDataWithCache('courses');
            setCourses(courseData);
        })();
    }, []);

    useEffect(() => {
        if (search === '') {
            setFilteredCourses([]);
        } else if (courses) {
            const filteredCourses = filter(courses, search);
            setFilteredCourses(filteredCourses);
        }
    }, [search]);

    return (
        <div className="explore-courses">
            <Header text="Explore courses" styles={{ marginBottom: '20px' }} />
            <TextInput
                placeholder="Search courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                styles={{ marginBottom: '50px', maxWidth: '438px' }}
            />
            {courses && (
                <CourseGrid
                    cardData={search === '' ? courses : filteredCourses}
                />
            )}
        </div>
    );
}
