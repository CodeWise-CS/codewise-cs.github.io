import { useEffect, useState } from 'react';
import filter from '../utils/filter';
import './styles/SearchBar.css';
import { useFetchWithCache } from '../hooks/useFetchWithCache';

export default function SearchBar() {
    const { fetchDataWithCache } = useFetchWithCache();
    const [courseCards, setCourseCards] = useState();
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
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
        } else {
            (async () => {
                const courses = await fetchDataWithCache('courses');
                const filteredCourses = filter(courses, search);
                setCourseCards(
                    filteredCourses.map((course, i) => (
                        <a
                            className="result"
                            href={`/#/course-overview/${course.id}`}
                            key={i}
                        >
                            <img
                                className="course-logo"
                                src={course.imageURL}
                                alt=""
                            />
                            {course.title}
                        </a>
                    ))
                );
            })();
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
