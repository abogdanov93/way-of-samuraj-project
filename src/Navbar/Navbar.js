import React from "react";
import style from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={style.Navbar}>
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