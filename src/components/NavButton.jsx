import React from 'react';
import './styles/NavButton.css';

export default function NavButton({ selected, onClick, text }) {
    const styles = {
        fontWeight: selected && 'bold',
        textDecoration: selected && 'underline',
    };

    return (
        <button
            className="nav-button interactable"
            onClick={onClick}
            style={styles}
        >
            {text}
        </button>
    );
}
