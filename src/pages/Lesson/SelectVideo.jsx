import React from 'react';
import './styles/SelectVideo.css';

export default function SelectVideo({ children }) {
    return (
        <div className="container">
            <div className="select-video">
                <h1 className="secondary-text title">Select a video</h1>
                {children}
            </div>
        </div>
    );
}
