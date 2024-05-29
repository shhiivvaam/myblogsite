import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-brand">
                    myBlogSite
                </h1>
                <button className={`navbar-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className={`nav-list ${isOpen ? "open" : ""}`}>
                    <li className="nav-item">
                        <Link to="/blogs" className="nav-link" onClick={toggleMenu}>
                            Blogs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create" className="nav-link" onClick={toggleMenu}>
                            Create Blog
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link" onClick={toggleMenu}>
                            Sign In
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
