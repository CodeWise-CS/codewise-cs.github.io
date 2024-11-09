import React from 'react';
import './styles/TextInput.css';

export default function TextInput({
    error,
    title,
    type,
    name,
    value,
    onChange,
}) {
    const styles = {
        border: error ? '2px solid var(--error-color)' : 'none',
    };

    return (
        <div className="text-input">
            <p className="title">{title}</p>
            <input
                style={styles}
                className="input-field"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}
