import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required, wrongPassword} from "../../utils/validators";
import {Element} from "../common/Textarea/Textarea";
import {connect} from "react-redux";
import {logIn, logOut} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";

const maxLength20 = maxLengthCreator(20);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) return <Navigate to="/profile/*"/>

    return <div>
        <h1>Log in</h1>
        <LoginFormHOC onSubmit={onSubmit}/>
    </div>
}

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Element}
                   name={"email"}
                   placeholder={"E-mail"}
                   validate={[required, maxLength20]}
                   fieldType={"input"}/>
        </div>
        <div>
            <Field component={Element}
                   name={"password"}
                   type={"password"}
                   placeholder={"Password"}
                   validate={[required, maxLength20]}
                   fieldType={"input"}/>
        </div>
        <div>
            <Field component={"input"}
                   name={"rememberMe"}
                   type={"checkbox"}/> Remember me
        </div>
        <div>
            <button type="submit">Log in</button>
        </div>
    </form>
}

const LoginFormHOC = reduxForm({form: "login"})(LoginForm);

const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logIn, logOut})(Login);