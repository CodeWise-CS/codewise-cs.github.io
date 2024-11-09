import { useState } from 'react';
import MainDisplay from './MainDisplay';
import Navbar from './Navbar';
import './styles/Home.css';

export default function Home() {
    const [page, setPage] = useState(0);

    return (
        <div className="home">
            <Navbar page={page} changePage={(index) => setPage(index)} />
            <MainDisplay page={page} />
        </div>
    );
}
