import React, {FC} from "react"
import style from "./Navbar.module.css"
import {NavLink} from "react-router-dom"

const Navbar: FC = () => {
    return (
        <nav className={style.navbar}>
            <NavLink to="/profile" className={navData => navData.isActive ? style.activeLink : style.link}>
                Profile
            </NavLink>
            <NavLink to="/dialogs" className={navData => navData.isActive ? style.activeLink : style.link}>
                Dialogs
            </NavLink>
            <NavLink to="/users" className={navData => navData.isActive ? style.activeLink : style.link}>
                Find friends
            </NavLink>
            <NavLink to="/communities" className={navData => navData.isActive ? style.activeLink : style.link}>
                Communities
            </NavLink>
            <NavLink to="/news" className={navData => navData.isActive ? style.activeLink : style.link}>
                News
            </NavLink>
            <NavLink to="/settings" className={navData => navData.isActive ? style.activeLink : style.link}>
                Settings
            </NavLink>
        </nav>
    )
}

export default Navbar