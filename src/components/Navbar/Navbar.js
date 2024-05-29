import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/blogs" className="nav-link">Blogs</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Create" className="nav-link">Create Blog</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signin" className="nav-link">Sign In</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
