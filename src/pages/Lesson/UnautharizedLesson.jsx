import React from 'react';
import TopNavbar from '../../components/TopNavbar';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export default function UnautharizedLesson({ message, course }) {
    const navigate = useNavigate();

    return (
        <div>
            <TopNavbar />
            <h1>Sorry!</h1>
            <p>{message}</p>
            <Button
                text="Go to course overview"
                onClick={() => navigate(`/course-overview/${course}`)}
                type="accent"
                styles={{
                    marginTop: '20px',
                    padding: '12px',
                }}
            />
        </div>
    );
}
