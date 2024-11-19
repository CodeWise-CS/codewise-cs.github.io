import { useState } from 'react';
import TextInput from '../../components/TextInput';
import './styles/NamePopup.css';
import Button from '../../components/Button';

export default function NamePopup({ onSubmit }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
    });

    // TODO: Limit the length of the bio, username, and display name
    // TODO: Fundamental problem of users changing profile information to download course certificates for friends

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((oldFormData) => ({
            ...oldFormData,
            [name]: value.replace(' ', ''),
        }));

        setErrors((oldErrors) => ({
            ...oldErrors,
            [name]: '',
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.firstName) {
            setErrors((oldErrors) => ({
                ...oldErrors,
                firstName: 'Please enter your first name',
            }));
        } else if (!formData.lastName) {
            setErrors((oldErrors) => ({
                ...oldErrors,
                lastName: 'Please enter your last name',
            }));
        } else if (!formData.username) {
            setErrors((oldErrors) => ({
                ...oldErrors,
                username: 'Please enter a username',
            }));
        } else {
            onSubmit(formData);
        }
    }

    return (
        <div className="name-popup">
            <h1 className="title">One last thing...</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    title="First name"
                    error={errors.firstName}
                />
                <TextInput
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    title="Last name"
                    error={errors.lastName}
                />
                <TextInput
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    title="Username"
                    error={errors.username}
                />
                <Button
                    text="Submit"
                    type="accent"
                    bold={true}
                    styles={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                    }}
                />
            </form>
        </div>
    );
}
