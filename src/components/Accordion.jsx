import React, { useState } from 'react';
import './styles/Accordion.css';
import chevronIcon from '../assets/chevron.svg';

export default function Accordion({ data }) {
    const [activeIndicies, setActiveIndicies] = useState([]);

    function toggleActive(index) {
        if (activeIndicies.includes(index)) {
            setActiveIndicies(activeIndicies.filter((i) => i !== index));
        } else {
            setActiveIndicies([...activeIndicies, index]);
        }
    }

    return (
        <div className="accordion">
            {data.map(({ title, content }, i) => (
                <button
                    key={title}
                    className="accordion-item"
                    onClick={() => toggleActive(i)}
                >
                    <div className="accordion-header">
                        <h2 className="accordion-title">{title}</h2>
                        <img
                            src={chevronIcon}
                            className={`icon ${
                                activeIndicies.includes(i) && 'active'
                            }`}
                        />
                    </div>

                    <p
                        className={`accordion-content ${
                            activeIndicies.includes(i) && 'active'
                        }`}
                    >
                        {content}
                    </p>
                </button>
            ))}
        </div>
    );
}
