import React from 'react';
import Button from '../../components/Button';
import TopNavbar from '../../components/TopNavbar';
import './styles/NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <TopNavbar />
            <img
                draggable="false"
                className="not-found-image"
                src="src/assets/404 Error.svg"
                alt="Page not found! 404"
            />
            <h1 className="error-text">Looks like you're lost...</h1>
            <p className="body-text">Please check your address for errors</p>
            <Button
                text="Return to dashboard"
                type="accent"
                bold={true}
                styles={{
                    padding: '14px 20px',
                }}
                onClick={() => {
                    navigate('/');
                }}
            />
        </div>
    );
}
