import React from 'react';
import CourseCard from './CourseCard';
import './styles/CourseGrid.css';

export default function CourseGrid({ cardData }) {
    if (!Array.isArray(cardData)) {
        cardData = [cardData];
    }
    const cards = cardData.map((item) => {
        return (
            <CourseCard
                key={item.id}
                courseName={item.id}
                title={item.title}
                length={item.length}
                imageURL={item.imageURL}
                color={item.color}
            />
        );
    });

    return <div className="grid-container">{cards}</div>;
}
