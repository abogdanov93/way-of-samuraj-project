import React, {FC} from "react"
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import style from "./Login.module.css"
import commonStyles from "./../../App.module.css"
import {getIsAuth} from "../../redux/selectors/loginSelectors"
import {LoginForm} from "./LoginForm/LoginForm"

const Login: FC = () => {

    const isAuth = useSelector(getIsAuth)
    if (isAuth) return <Navigate to="/profile/"/>

    return <div className={`${style.login} ${commonStyles.whiteBlock}`}>
        <h1 className={style.capture}>Sign in</h1>
        <div className={style.block}><LoginForm /></div>
    </div>
}

export default Login