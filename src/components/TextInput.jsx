import React from 'react';
import './styles/TextInput.css';

export default function TextInput({
    error,
    title,
    type,
    name,
    value,
    onChange,
    placeholder,
    styles,
}) {
    const computedStyles = {
        border: error ? '2px solid var(--error-color)' : 'none',
    };

    return (
        <div className="text-input" style={styles}>
            <p className="title">{title}</p>
            <input
                style={computedStyles}
                className="input-field"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}
