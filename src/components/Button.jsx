import React from 'react';
import './styles/Button.css';

export default function Button({
    type,
    styles,
    bold,
    onClick,
    text,
    textColor,
    children,
}) {
    let color = 'var(--tertiary-color)';
    if (type === 'secondary') {
        color = 'var(--secondary-color)';
    } else if (type === 'accent') {
        color = 'var(--accent-color)';
    } else if (type === 'transparent') {
        color = 'transparent';
    }

    const computedStyles = {
        ...styles,
        backgroundColor: color,
        color: textColor
            ? textColor
            : type && type !== 'transparent'
            ? 'var(--white-color)'
            : 'var(--text-color)',
        fontWeight: bold ? 'bold' : '',
    };

    return (
        <button
            className="button interactable"
            style={{ ...styles, ...computedStyles }}
            onClick={onClick}
        >
            {text}
            {children}
        </button>
    );
}
