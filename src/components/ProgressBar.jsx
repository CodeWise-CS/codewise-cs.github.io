import React from 'react';
import './styles/ProgressBar.css';

export default function ProgressBar({ progress, barColor }) {
    let textPadding = '10px';

    if (progress === null || progress === undefined) {
        return <h1 className="completed">&#10004;</h1>;
    }

    if (progress === 100) {
        textPadding = '15px';
    }

    const styles = {
        width: progress + '%',
        borderRadius: progress === 0 || progress === 100 ? '0' : '',
        paddingRight: textPadding,
        backgroundColor: progress === 0 ? 'transparent' : 'var(--accent-color)',
    };

    return (
        <div
            className="progress-container"
            style={{
                backgroundColor: barColor ? barColor : 'var(--secondary-color)',
                paddingLeft: progress === 0 ? '20px' : '0',
            }}
        >
            {progress === 0 && <p>{progress}%</p>}
            <div className="progress-bar" style={styles}>
                {progress}%
            </div>
        </div>
    );
}
