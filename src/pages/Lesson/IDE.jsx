import './styles/IDE.css';

export default function IDE({ languageID }) {
    return (
        <div className="ide-container">
            <iframe
                src={`https://www.jdoodle.com/embed/v1/${languageID}`}
                className="ide"
                width="100%"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}
