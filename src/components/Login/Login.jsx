import React from "react";
import {connect} from "react-redux";
import {logIn, logOut} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import style from "./Login.module.css";
import commonStyles from "./../../App.module.css";
import LoginFormHOC from "./LoginForm/LoginForm";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Navigate to="/profile/"/>

    return <div className={`${style.login} ${commonStyles.whiteBlock}`}>
        <h1 className={style.capture}>Sign in</h1>
        <div className={style.block}><LoginFormHOC onSubmit={onSubmit}/></div>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logIn, logOut})(Login);