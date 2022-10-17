import React, {FC} from "react"
import style from "./Header.module.css"
import logo from "../../images/logo.png"
import loginIcon from "../../images/login.png"
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getLogin} from "../../redux/selectors/loginSelectors"
import {AnyAction} from "redux"
import {signOut} from "../../redux/authReducer"

const Header: FC = () => {

    const isAuth = useSelector(getLogin)
    const login = useSelector(getLogin)
    const dispatch = useDispatch()
    const logOut = () => dispatch(signOut() as unknown as AnyAction)

    return <header className={style.header}>
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
}

export default Header