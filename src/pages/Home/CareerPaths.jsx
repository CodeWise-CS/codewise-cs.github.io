import './styles/CareerPaths.css';
import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import CareerPathCard from './CareerPathCard';
import { UserContext } from '../../context/UserContext';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';

export default function CareerPaths() {
    const { fetchDataWithCache } = useFetchWithCache();
    const { user } = useContext(UserContext);
    const [pathCards, setPathCards] = useState();

    useEffect(() => {
        (async () => {
            const data = await fetchDataWithCache('career-paths');
            const newCards = data.map((path) => {
                return (
                    <CareerPathCard
                        key={path.id}
                        title={path.title}
                        pathName={path.id}
                        courses={path.courses.map((course) => course.title)}
                    />
                );
            });

            setPathCards(newCards);
        })();
    }, []);

    return (
        <div className="career-paths">
            <Header text="Career paths" styles={{ marginBottom: '20px' }} />
            {pathCards}
        </div>
    );
}
