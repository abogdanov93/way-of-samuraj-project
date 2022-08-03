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
                <input className={style.input} type="text" required placeholder="What are you looking for?"/>
            </div>
            <div className={style.login}>
                {props.isAuth
                    ? <NavLink to={"/profilePage"}>{props.login}</NavLink>
                    : <NavLink className={style.loginArea} to={"/login"}>
                        <div>Log in</div>
                        <img className={style.loginIcon} src={login}/>
                    </NavLink>
                }
            </div>
        </header>
    );
}

export default Header;