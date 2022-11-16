import React, {FC, useEffect} from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import style from "./Login.module.css"
import commonStyles from "./../../App.module.css"
import {getIsAuth} from "../../redux/selectors/loginSelectors"
import {LoginForm} from "./LoginForm/LoginForm"

const Login: FC = () => {

    const navigate = useNavigate()
    const isAuth = useSelector(getIsAuth)

    useEffect(() => {
        console.log("useEffect", isAuth)
        if (isAuth) navigate("/profile")
    }, [isAuth])

    return <div className={`${style.login} ${commonStyles.whiteBlock}`}>
        <h1>Sign in</h1>
        <div className={style.block}><LoginForm /></div>
    </div>
}

export default Login