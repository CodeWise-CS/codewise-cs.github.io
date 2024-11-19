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

    async function login(event) {
        event.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredentials.user;
            navigate('/');
        } catch (error) {
            setFormErrors((oldFormErrors) => ({
                ...oldFormErrors,
                email: 'Account not found',
            }));
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
            const user = userCredentials.user;
            updateProfile(auth.currentUser, {
                displayName: `Unnamed User`,
            });
            createUser(user.uid);
            setFormErrors({ password: '', email: '' });
            const contextUser = await getUserData(user.uid);
            onSignUp(contextUser);
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                setFormErrors((oldFormErrors) => ({
                    ...oldFormErrors,
                    email: 'This email already exists',
                }));
            } else if (error.code == 'auth/weak-password') {
                setFormErrors((oldFormErrors) => ({
                    ...oldFormErrors,
                    password: 'Password must be 6+ characters',
                }));
            } else if (error.code == 'auth/invalid-email') {
                setFormErrors((oldFormErrors) => ({
                    ...oldFormErrors,
                    email: 'Invalid email',
                }));
            } else if (error.code == 'auth/missing-email') {
                setFormErrors((oldFormErrors) => ({
                    ...oldFormErrors,
                    email: 'Please enter an email',
                }));
            } else if (error.code == 'auth/missing-password') {
                setFormErrors((oldFormErrors) => ({
                    ...oldFormErrors,
                    password: 'Please enter a password',
                }));
            }
        }
    }

    return (
        <div className="side-bar">
            <h1 className="title">{title}</h1>
            <div className="auth-options">
                <button className="option-button interactable">
                    <img
                        className="logo-img"
                        src="src/assets/google-logo.png"
                        alt="Google logo"
                    />
                    <p className="option-text">Google</p>
                </button>
                <button className="option-button interactable">
                    <img
                        className="logo-img"
                        src="src/assets/facebook-logo.png"
                        alt="Facebook logo"
                    />
                    <p className="option-text">Facebook</p>
                </button>
                <button className="option-button interactable">
                    <img
                        className="logo-img"
                        src="src/assets/github-logo.png"
                        alt="GitHub logo"
                    />
                    <p className="option-text">GitHub</p>
                </button>
                <button className="option-button interactable">
                    <img
                        className="logo-img"
                        src="src/assets/apple-logo.png"
                        alt="Apple logo"
                    />
                    <p className="option-text">Apple</p>
                </button>
            </div>
            <p className="separator">OR</p>
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
                    ? "Don't have an accont?"
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
