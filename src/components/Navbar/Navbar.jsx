import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className={style.navbar}>
            <div>
                <NavLink to="/profile" className={navData => navData.isActive ? style.activeLink : style.link}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className={navData => navData.isActive ? style.activeLink : style.link}>Dialogs</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={navData => navData.isActive ? style.activeLink : style.link}>Find friends</NavLink>
            </div>
            <div>
                <NavLink to="/communities" className={navData => navData.isActive ? style.activeLink : style.link}>Communities</NavLink>
            </div>
            <div>
                <NavLink to="/news" className={navData => navData.isActive ? style.activeLink : style.link}>News</NavLink>
            </div>
            <div>
                <NavLink to="/settings" className={navData => navData.isActive ? style.activeLink : style.link}>Settings</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;