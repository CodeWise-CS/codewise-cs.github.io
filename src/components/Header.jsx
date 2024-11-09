import React from 'react';
import './styles/Header.css';

export default function Header({ color, styles, text }) {
    return (
        <h1
            className={`title-text bold header ${
                color ? color : 'secondary-text'
            }`}
            style={styles}
        >
            {text}
        </h1>
    );
}
