import React from "react";
import {Field, reduxForm} from "redux-form";
import {Element} from "../../common/FormControl/FormControl";
import {maxLengthCreator, required} from "../../../utils/validators";
import formStyle from "../../common/FormControl/FormControl.module.css";
import style from "./LoginForm.module.css";


const maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return <form className={style.loginForm} onSubmit={props.handleSubmit}>
        <div className={style.login}>
            <Field component={Element}
                   name={"email"}
                   placeholder={"E-mail"}
                   validate={[required, maxLength20]}
                   fieldType={"input"}/>
        </div>
        <div className={style.password}>
            <Field component={Element}
                   name={"password"}
                   type={"password"}
                   placeholder={"Password"}
                   validate={[required, maxLength20]}
                   fieldType={"input"}/>
        </div>
        <div className={style.rememberMe}>
            <Field component={"input"}
                   name={"rememberMe"}
                   type={"checkbox"}/>
            <div>Remember me</div>
        </div>
        {props.error && <div className={formStyle.errorWarning}>{props.error}</div>}
        <div className={style.button}>
            <button type="submit">Sign in</button>
        </div>
    </form>
}

const LoginFormHOC = reduxForm({form: "login"})(LoginForm);
export default LoginFormHOC;