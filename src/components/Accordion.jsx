import React, { useState } from 'react';
import './styles/Accordion.css';
import chevronIcon from '/chevron.svg';
import ToggleText from './ToggleText';

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
            {data.map(({ title, content, solution }, i) => (
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
                    <div
                        className={`accordion-content ${
                            activeIndicies.includes(i) && 'active'
                        }`}
                    >
                        <ToggleText
                            text={solution}
                            textClass="code"
                            showText="Show solution"
                            hideText="Hide solution"
                        />
                    </div>
                </button>
            ))}
        </div>
    );
}
