import React, {FC} from "react"
import style from "./Header.module.css"
import logo from "../../images/logo.png"
import loginIcon from "../../images/login.png"
import {NavLink, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getLogin} from "../../redux/selectors/loginSelectors"
import {signOut} from "../../redux/authReducer"
import {AnyAction} from "redux"

const Header: FC = () => {

    const isAuth = useSelector(getLogin)
    const login = useSelector(getLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        dispatch(signOut() as unknown as AnyAction)
        navigate("/login")
    }

    return <header className={style.header}>
            <div className={style.logo}>
                <img src={logo}/>
            </div>
            <div className={style.loginArea}>
                {isAuth
                    ? <div>
                        <NavLink to={"/profile"} className={style.login}>{login}</NavLink>
                        <div onClick={logOut}>Sign out</div>
                    </div>
                    : <NavLink className={style.loginArea} to={"/login"}>
                        <div>Sign in</div>
                        <img className={style.loginIcon} src={loginIcon}/>
                    </NavLink>
                }
            </div>
        </header>
}

export default Header