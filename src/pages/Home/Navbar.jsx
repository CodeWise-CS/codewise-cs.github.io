import { useState } from 'react';
import { logOut } from '../../firebase';
import NavButton from '../../components/NavButton';
import Button from '../../components/Button';
import menuIcon from '/menu.svg';
import './styles/Navbar.css';

export default function Navbar({ changePage, page }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar">
            <div className="hamburger-container">
                <img
                    className="logo"
                    src="/codewise-logo.svg"
                    alt="CodeWise logo"
                />
                <button
                    className="hamburger interactable"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <img src={menuIcon} />
                </button>
            </div>
            <div className={`menu ${menuOpen ? 'open' : ''}`}>
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
                        text="Explore career paths"
                        selected={page === 2}
                    />
                    <NavButton
                        onClick={() => changePage(3)}
                        text="Profile"
                        selected={page === 3}
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
