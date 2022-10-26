import React, {FC} from "react"
import style from "./Header.module.css"
import logo from "../../uploads/images/logo.png"
import loginIcon from "../../uploads/images/login.png"
import {NavLink, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getLogin} from "../../redux/selectors/loginSelectors"
import {signOut} from "../../redux/reducers/authSlice"
import {AnyAction} from "redux"
import {getProfile} from "../../redux/selectors/profileSelectors";

const Header: FC = () => {

    const isAuth = useSelector(getLogin)
    const profile = useSelector(getProfile)
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
                ? <div className={style.loginArea}>
                    <NavLink to={"/profile"}>
                        <img className={style.avatar} src={profile?.photos.small as string}/>
                    </NavLink>
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