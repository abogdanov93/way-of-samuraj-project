import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators";
import {Element} from "../common/Textarea/Textarea";

const maxLength20 = maxLengthCreator(20);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return <div>
        <h1>Log in</h1>
        <LoginFormHOC onSubmit={onSubmit}/>
    </div>
}

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Element}
                   name={"login"}
                   placeholder={"Login"}
                   validate={[required, maxLength20]}
                   fieldType={"input"}/>
        </div>
        <div>
            <Field component={Element}
                   name={"password"}
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

export default Login;