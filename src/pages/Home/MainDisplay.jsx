import React from 'react';
import Dashboard from './Dashboard';
import ExploreCourses from './ExploreCourses';
import Profile from './Profile';
import './styles/MainDisplay.css';

export default function MainDisplay({ page }) {
    const pages = [<Dashboard />, <ExploreCourses />, <Profile />];

    return <div className="main-display">{pages[page]}</div>;
}
