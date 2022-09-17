import React, {FC} from "react"
import {useDispatch, useSelector} from "react-redux"
import {logInThunk} from "../../redux/authReducer"
import {Navigate} from "react-router-dom"
import style from "./Login.module.css"
import commonStyles from "./../../App.module.css"
import LoginFormHOC from "./LoginForm/LoginForm"
import {getCaptchaURL, getIsAuth} from "../../redux/selectors/loginSelectors"
import {AnyAction} from "redux"

export type loginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: FC = () => {

    const isAuth = useSelector(getIsAuth)
    const captchaURL = useSelector(getCaptchaURL)
    const dispatch = useDispatch()
    const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => {
        dispatch(logInThunk(email, password, rememberMe, captcha) as unknown as AnyAction)
    }

    const onSubmit = (formData: loginFormDataType) => {
        logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) return <Navigate to="/profile/"/>

    return <div className={`${style.login} ${commonStyles.whiteBlock}`}>
        <h1 className={style.capture}>Sign in</h1>
        <div className={style.block}><LoginFormHOC onSubmit={onSubmit} captchaURL={captchaURL}/></div>
    </div>
}

export default Login