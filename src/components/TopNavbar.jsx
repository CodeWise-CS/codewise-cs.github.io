import React from 'react';
import './styles/TopNavbar.css';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

export default function TopNavbar() {
    const navigate = useNavigate();

    return (
        <div className="top-navbar">
            <button
                className="nav-button interactable"
                onClick={() => {
                    navigate('/');
                }}
            >
                Dashboard
            </button>
            <SearchBar />
        </div>
    );
}
