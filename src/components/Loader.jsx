import React from 'react';
import './styles/Loader.css';

export default function Loader({ text }) {
    return (
        <div className="loader">
            <h3 className="loading-text">{text ? text : 'Loading...'}</h3>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
