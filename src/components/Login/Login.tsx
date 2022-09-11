import React, {FC} from "react"
import {connect} from "react-redux"
import {logIn} from "../../redux/authReducer"
import {Navigate} from "react-router-dom"
import style from "./Login.module.css"
import commonStyles from "./../../App.module.css"
import LoginFormHOC from "./LoginForm/LoginForm"
import {stateType} from "../../redux/reduxStore"

type mapStatePropsType = {
    isAuth: boolean
    captchaURL: null | string
}
type mapDispatchPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export type loginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: FC<mapStatePropsType & mapDispatchPropsType> =
    ({logIn, isAuth, captchaURL}) => {
        const onSubmit = (formData: loginFormDataType) => {
            logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
        }

        if (isAuth) return <Navigate to="/profile/"/>

        return <div className={`${style.login} ${commonStyles.whiteBlock}`}>
            <h1 className={style.capture}>Sign in</h1>
            <div className={style.block}><LoginFormHOC onSubmit={onSubmit} captchaURL={captchaURL}/></div>
        </div>
    }

const mapStateToProps = (state: stateType): mapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect<mapStatePropsType, mapDispatchPropsType, {}, stateType>
(mapStateToProps, {logIn})(Login)