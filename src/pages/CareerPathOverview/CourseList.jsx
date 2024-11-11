import './styles/CourseList.css';
import React from 'react';

export default function CourseList({ courseCards }) {
    const separatedCards = courseCards.flatMap((component, index) =>
        index < courseCards.length - 1
            ? [component, <div className="divider"></div>]
            : [component]
    );

    return <div className="course-list">{separatedCards}</div>;
}
