import React from 'react';
import { logOut } from '../../firebase';
import NavButton from '../../components/NavButton';
import Button from '../../components/Button';
import './styles/Navbar.css';

export default function Navbar({ changePage, page }) {
    return (
        <div className="navbar">
            <img
                className="logo"
                src="src/assets/codewise-logo.svg"
                alt="CodeWise logo"
            />
            <div className="menu">
                <div>
                    <NavButton
                        onClick={() => changePage(0)}
                        text="Dashboard"
                        selected={page === 0}
                    />
                    <NavButton
                        onClick={() => changePage(1)}
                        text="Explore courses"
                        selected={page === 1}
                    />
                    <NavButton
                        onClick={() => changePage(2)}
                        text="Profile"
                        selected={page === 2}
                    />
                </div>
                <Button
                    onClick={logOut}
                    bold={true}
                    styles={{
                        top: 'auto',
                        padding: '14px',
                    }}
                    text="Log out"
                    type="accent"
                />
            </div>
        </div>
    );
}
