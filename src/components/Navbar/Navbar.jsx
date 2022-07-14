import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

const Navbar = (props) => {
    let friendElement =  props.friends
        .map(f => <Friends id={f.id} name={f.name} avatar={f.avatar} />)

    return (
        <nav className={style.navbar}>
            <div>
                <NavLink to="/profile" className={navData => navData.isActive ? style.activeLink : style.link}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className={navData => navData.isActive ? style.activeLink : style.link}>Dialogs</NavLink>
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
            <div>
                <h4 className={style.friends}>Friends:</h4>
                <div className={style.friendsItem}>{friendElement}</div>
            </div>
        </nav>
    );
}

export default Navbar;