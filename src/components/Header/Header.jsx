import React from "react";
import style from "./Header.module.css";
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img src={logo}/>
            </div>
            <div className={style.searcher}>
                <input type="text" placeholder="What are you looking for?"/>
            </div>
            <div className={style.loginArea}>
                {props.isAuth
                    ? <NavLink to={"/profile"} className={style.login}>
                        {props.login}
                        <div onClick={props.logOut}>Sign out</div>
                    </NavLink>
                    : <NavLink className={style.loginArea} to={"/login"}>
                        <div>Sign in</div>
                        <img className={style.loginIcon} src={login}/>
                    </NavLink>
                }
            </div>
        </header>
    );
}

export default Header;