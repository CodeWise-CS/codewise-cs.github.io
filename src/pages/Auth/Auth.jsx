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
        console.log('HANDLED SIGN UP: ', user);
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
                <div className="logo" alt="CodeWise logo"></div>
                <ul className="benefits">
                    <li className="white-text">
                        <span className="accent-text bold">Interactive</span>{' '}
                        courses
                    </li>
                    <li className="white-text">
                        <span className="accent-text bold">Beginner</span> to{' '}
                        <span className="accent-text bold">advanced</span>
                    </li>
                    <li className="white-text">
                        Completely{' '}
                        <span className="accent-text bold">free</span>
                    </li>
                    <li className="white-text">
                        Earn{' '}
                        <span className="accent-text bold">certificates</span>
                    </li>
                </ul>
            </div>
            <SideBar
                switchAuth={switchAuth}
                authType={authType}
                onSignUp={handleSignUp}
            />
        </div>
    );
}
