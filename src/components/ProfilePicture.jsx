import React from 'react';
import { auth } from '../firebase';
import './styles/ProfilePicture.css';

export default function ProfilePicture({ src, width }) {
    return (
        <img
            src={src}
            alt={`${auth.currentUser.displayName} profile picture`}
            width={width}
            className="profile-picture"
        />
    );
}
