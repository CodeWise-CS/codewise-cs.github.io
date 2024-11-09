import React from 'react';
import './styles/VideoCard.css';

export default function VideoCard({
    recommended,
    onSelected,
    video,
    title,
    channel,
    length,
}) {
    const textColor = recommended ? 'white-text' : 'secondary-text';
    const backgroundColor = recommended
        ? 'var(--secondary-color)'
        : 'var(--tertiary-color)';

    return (
        <button
            onClick={() => onSelected(video)}
            className="video-card interactable"
            style={{ backgroundColor: backgroundColor }}
        >
            {recommended && <p className="accent-text">Recommended</p>}
            <p className={textColor}>
                <span className={`bold ${textColor}`}>Title:</span> {title}
            </p>
            <p className={textColor}>
                <span className={`bold ${textColor}`}>Channel:</span> {channel}
            </p>
            <p className={textColor}>
                <span className={`bold ${textColor}`}>Length:</span> {length}
            </p>
        </button>
    );
}
