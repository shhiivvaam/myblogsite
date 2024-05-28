import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/blogs">Home</Link>
                </li>
                <li>
                    <Link to="/Create">Create Blog</Link>
                </li>
                <li>
                    <Link to="/signin">Sign In</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
