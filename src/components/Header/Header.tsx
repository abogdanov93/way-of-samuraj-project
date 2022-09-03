import React, {FC} from "react";
import style from "./Header.module.css";
import logo from "../../images/logo.png";
import loginIcon from "../../images/login.png";
import {NavLink} from "react-router-dom";

type propsType = {
    isAuth: boolean
    login: string
    logOut: () => void
}

const Header: FC<propsType> = ({isAuth, login, logOut}) => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img src={logo}/>
            </div>
            <div className={style.searcher}>
                <input type="text" placeholder="What are you looking for?"/>
            </div>
            <div className={style.loginArea}>
                {isAuth
                    ? <NavLink to={"/profile"} className={style.login}>
                        {login}
                        <div onClick={logOut}>Sign out</div>
                    </NavLink>
                    : <NavLink className={style.loginArea} to={"/login"}>
                        <div>Sign in</div>
                        <img className={style.loginIcon} src={loginIcon}/>
                    </NavLink>
                }
            </div>
        </header>
    );
}

export default Header;