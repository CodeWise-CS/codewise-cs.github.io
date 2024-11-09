import React from 'react';
import CourseCard from './CourseCard';
import './styles/CourseGrid.css';

export default function CourseGrid({ cardData }) {
    const cards = cardData.map((item) => {
        return (
            <CourseCard
                courseName={item.courseName}
                courseLength={item.courseLength}
                description={item.description}
            />
        );
    });

    return <div className="grid-container">{...cards}</div>;
}
