import { useState } from 'react';
import SideBar from './SideBar';
import NamePopup from '../Home/NamePopup';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, setUserData } from '../../firebase';
import './styles/Auth.css';

export default function Auth() {
    const [authType, setAuthType] = useState('login');
    const [signedUp, setSignedUp] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    function handleSignUp(_user) {
        setSignedUp(true);
        setUser(_user);
    }

    function addName({ firstName, lastName, username }) {
        setUserData(username, 'username');

        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            photoURL:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        })
            .then(() => {
                navigate('/');
            })
            .catch((error) => navigate('/'));
    }

    function switchAuth() {
        setAuthType((oldAuthType) => {
            return oldAuthType === 'login' ? 'sign up' : 'login';
        });
    }

    return (
        <div className="auth">
            {signedUp && <NamePopup onSubmit={addName} />}
            <div className="branding">
                <img
                    className="logo"
                    src="src/assets/codewise-logo.svg"
                    alt="CodeWise logo"
                />
                <div className="info-container">
                    <h1>Beginner to Advanced</h1>
                    <div className="grid">
                        <div className="grid-item">
                            <img src="src/assets/free-icon.svg" />
                            <p>
                                Access every course and resource for{' '}
                                <span className="bold">free</span>
                            </p>
                        </div>
                        <div className="grid-item">
                            <img src="src/assets/tools-icon.svg" />
                            <p>
                                Learn with videos, quizzes, code compilation,
                                and exercises
                            </p>
                        </div>
                        <div className="grid-item">
                            <img src="src/assets/certificate-icon.svg" />
                            <p>
                                Earn{' '}
                                <span className="bold">
                                    certificates of completion
                                </span>{' '}
                                for your courses
                            </p>
                        </div>
                        <div className="grid-item">
                            <img src="src/assets/path-icon.svg" />
                            <p>
                                Prepare yourself for a job by following{' '}
                                <span className="bold">career paths</span>
                            </p>
                        </div>
                    </div>
                    <div className="graphic-container"></div>
                </div>
            </div>
            <SideBar
                switchAuth={switchAuth}
                authType={authType}
                onSignUp={handleSignUp}
            />
        </div>
    );
}
