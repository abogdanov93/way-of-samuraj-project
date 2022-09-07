import React from "react";
import {connect} from "react-redux";
import {logIn} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import style from "./Login.module.css";
import commonStyles from "./../../App.module.css";
import LoginFormHOC from "./LoginForm/LoginForm";
import {stateType} from "../../redux/reduxStore";

type mapStateToPropsType = {
    isAuth: boolean
    captchaURL: null | string
}
type mapDispatchToPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = ({logIn, isAuth, captchaURL}) => {
    const onSubmit = (formData: formDataType) => {
        logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) return <Navigate to="/profile/"/>

    return <div className={`${style.login} ${commonStyles.whiteBlock}`}>
        <h1 className={style.capture}>Sign in</h1>
        <div className={style.block}><LoginFormHOC onSubmit={onSubmit} captchaURL={captchaURL}/></div>
    </div>
}

const mapStateToProps = (state: stateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, {logIn})(Login);