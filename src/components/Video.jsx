import React from 'react';
import './styles/Video.css';

export default function Video({ start, end, embedId }) {
    const startString = start ? `&start=${start}` : '';
    const endString = end ? `&end=${end}` : '';

    console.log(
        `https://www.youtube.com/embed/${embedId}?si=e6oILBnSNCNuGNHU${startString}${endString}`
    );

    return (
        <div className="video">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${embedId}?si=e6oILBnSNCNuGNHU${startString}${endString}`}
                title="Tutorial video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
}
