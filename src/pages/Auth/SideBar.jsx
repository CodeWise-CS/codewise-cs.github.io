import React from 'react';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './styles/SideBar.css';
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth, createUser, getUserData } from '../../firebase';

function SideBar({ authType, onSignUp, switchAuth }) {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = React.useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const title = authType.charAt(0).toUpperCase() + authType.slice(1);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormErrors((oldFormErrors) => ({ ...oldFormErrors, [name]: '' }));
        setFormData((oldFormData) => ({
            ...oldFormData,
            [name]: value,
        }));
    }

    async function handleAuthError(error) {
        const errorMessages = {
            'auth/email-already-in-use': 'This email already exists',
            'auth/weak-password': 'Password must be 6+ characters',
            'auth/invalid-email': 'Invalid email',
            'auth/missing-email': 'Please enter an email',
            'auth/missing-password': 'Please enter a password',
            'auth/invalid-credential': 'Invalid email or password',
        };
        const errorMessage = errorMessages[error.code] || 'An error occurred';
        console.error(error);
        setFormErrors((oldFormErrors) => ({
            ...oldFormErrors,
            [error.code.includes('password') ? 'password' : 'email']:
                errorMessage,
        }));
    }

    async function login(event) {
        event.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            navigate('/');
        } catch (error) {
            handleAuthError(error);
        }
    }

    async function signUp(event) {
        event.preventDefault();
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            await updateProfile(auth.currentUser, {
                displayName: `Unnamed User`,
            });
            await createUser(userCredentials.user.uid);
            setFormErrors({ password: '', email: '' });
            const contextUser = await getUserData(userCredentials.user.uid);
            onSignUp(contextUser);
        } catch (error) {
            handleAuthError(error);
        }
    }

    return (
        <div className="side-bar">
            <h1 className="title">{title}</h1>
            <form
                onSubmit={authType === 'login' ? login : signUp}
                className="info-form"
            >
                <TextInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    title="Email"
                    error={formErrors.email}
                />
                <TextInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    title="Password"
                    error={formErrors.password}
                />
                <Button
                    styles={{
                        marginTop: '20px',
                        padding: '14px',
                    }}
                    text={title}
                    type="accent"
                    bold={true}
                />
            </form>
            <p className="body-text switch-account-text">
                {authType === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                <button
                    className="switch-auth accent-text bold interactable"
                    onClick={switchAuth}
                >
                    {authType === 'sign up' ? 'Login' : 'Sign up'}
                </button>
            </p>
        </div>
    );
}

export default SideBar;
