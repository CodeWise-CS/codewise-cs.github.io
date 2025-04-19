import './styles/CareerPathCard.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { setUserData } from '../../firebase';

export default function CareerPathCard({ pathName, title, courses }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    function updateSaved(value) {
        if (value) {
            setUserData(
                user.careerPaths ? [...user.careerPaths, pathName] : [pathName],
                'careerPaths'
            );
        } else {
            setUserData(
                user.careerPaths
                    ? user.careerPaths.filter((path) => path != pathName)
                    : [],
                'careerPaths'
            );
        }
    }

    return (
        <button
            className="interactable career-path-card"
            onClick={() => navigate(`/career-path-overview/${pathName}`)}
        >
            <div className="top-bar">
                <h2 className="title">{title}</h2>
                <SaveButton
                    saved={
                        user.careerPaths
                            ? user.careerPaths.includes(pathName)
                            : false
                    }
                    onClick={(e) => {
                        e.stopPropagation();
                        updateSaved(
                            user.careerPaths
                                ? !user.careerPaths.includes(pathName)
                                : true
                        );
                    }}
                />
            </div>
            <ol>
                {courses.map((course, i) => (
                    <li className="body-text" key={i}>
                        {course}
                    </li>
                ))}
            </ol>
        </button>
    );
}

function SaveButton({ saved, onClick }) {
    return (
        <button className="interactable save-button" onClick={onClick}>
            <img src={`/star-${saved ? 'fill' : 'outline'}.svg`} alt="" />
        </button>
    );
}
