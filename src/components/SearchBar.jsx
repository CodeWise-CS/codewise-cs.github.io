import React from 'react';
import './styles/SearchBar.css';

export default function SearchBar() {
    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Search courses"
        />
    );
}
