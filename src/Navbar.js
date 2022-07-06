import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="Navbar">
            <ul>
                <li>Profile</li>
                <li>Messages</li>
                <li>Communities</li>
                <li>News</li>
                <li>Settings</li>
            </ul>
        </div>
    );
}

export default Navbar;