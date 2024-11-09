import React from 'react';
import Button from './Button';
import './styles/Popup.css';

export default function Popup({
    title,
    bodyText,
    onCancel,
    onConfirm,
    children,
}) {
    return (
        <div className="popup">
            <h1 className="title">{title}</h1>
            {bodyText && <h3 className="body-text">{bodyText}</h3>}
            <div className="menu">
                <Button
                    text="Cancel"
                    onClick={onCancel}
                    type="transparent"
                    styles={{
                        color: 'var(--text-color)',
                    }}
                />
                <Button
                    text="OK"
                    onClick={onConfirm}
                    type="accent"
                    styles={{
                        padding: '10px 16px',
                    }}
                />
            </div>
            {children}
        </div>
    );
}
