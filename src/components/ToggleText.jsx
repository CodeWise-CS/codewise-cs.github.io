import { useState } from 'react';
import './styles/ToggleText.css';
import Button from './Button';

export default function ToggleText({
    text,
    textClass,
    showText = 'Show',
    hideText = 'Hide',
}) {
    const [visible, setVisible] = useState(false);

    function handleClick(e) {
        e.stopPropagation();
        setVisible((prevVisible) => !prevVisible);
    }

    return (
        <div className="toggle-text">
            <Button
                type="transparent"
                textColor="var(--accent-color)"
                text={visible ? hideText : showText}
                onClick={handleClick}
            />
            {visible && <p className={`text ${textClass}`}>{text}</p>}
        </div>
    );
}
