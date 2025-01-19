import { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../context/CourseContext';
import filter from '../utils/filter';
import './styles/SearchBar.css';

export default function SearchBar() {
    const { courses } = useContext(CourseContext);
    const [courseCards, setCourseCards] = useState();
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            console.log(event.target.className);
            if (
                event.target.className !== 'result' &&
                event.target.className !== 'search-bar'
            ) {
                setVisible(false);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        if (search === '') {
            setCourseCards([]);
        } else if (courses) {
            const courseNames = courses.courses.courseNames;
            const filteredCourses = filter(courseNames, search);
            console.log('Filtered courses: ', filteredCourses);

            setCourseCards(
                filteredCourses.map((name, i) => (
                    <a
                        className="result"
                        href={`/#/course-overview/${name}`}
                        key={i}
                    >
                        <img
                            className="course-logo"
                            src={courses.courses.cardData[name].imageURL}
                            alt=""
                        />
                        {courses.courses.cardData[name].title}
                    </a>
                ))
            );
        }
    }, [search]);

    return (
        <div className="input-container">
            <input
                type="text"
                onFocus={() => setVisible(true)}
                className="search-bar"
                placeholder="Search courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div
                className={`results ${
                    (courseCards?.length === 0 || !visible) && 'hidden'
                }`}
            >
                {courseCards}
            </div>
        </div>
    );
}
