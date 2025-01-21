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
        let valid = true;

        if (!formData.firstName) {
            valid = false;
            setErrors((oldErrors) => ({
                ...oldErrors,
                firstName: 'Please enter your first name',
            }));
        }
        if (!formData.lastName) {
            valid = false;
            setErrors((oldErrors) => ({
                ...oldErrors,
                lastName: 'Please enter your last name',
            }));
        }
        if (!formData.username) {
            valid = false;
            setErrors((oldErrors) => ({
                ...oldErrors,
                username: 'Please enter a username',
            }));
        }
        if (formData.firstName.length > 15) {
            valid = false;
            setErrors((oldErrors) => ({
                ...oldErrors,
                firstName: 'Please enter a maximum of 15 characters',
            }));
        }
        if (formData.lastName.length > 15) {
            valid = false;
            setErrors((oldErrors) => ({
                ...oldErrors,
                lastName: 'Please enter a maximum of 15 characters',
            }));
        }
        if (formData.username.length > 25) {
            valid = false;
            setErrors((oldErrors) => ({
                ...oldErrors,
                username: 'Please enter a maximum of 25 characters',
            }));
        }
        if (valid) {
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
