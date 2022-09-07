import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "../../common/FormControl/FormControl";
import {maxLengthCreator, required} from "../../../utils/validators";
import formStyle from "../../common/FormControl/FormControl.module.css";
import style from "./LoginForm.module.css";
import {formDataType} from "../Login";

type loginOwnPropsType = {
    captchaURL: string | null
}

const maxLength20 = maxLengthCreator(20);

const LoginForm: React.FC<InjectedFormProps<formDataType, loginOwnPropsType> & loginOwnPropsType> =
    ({handleSubmit, error, captchaURL}) => {
        return <form className={style.loginForm} onSubmit={handleSubmit}>
            <div className={style.login}>
                <Field component={Element}
                       name={"email"} // можно типизировать name? type a = keyof formDataType;
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
            {error && <div className={formStyle.errorWarning}>{error}</div>}
            {captchaURL && <div>
                <img src={captchaURL}/>
                <Field component={Element}
                       name={"captcha"}
                       placeholder={"Symbols from the picture"}
                       validate={[required]}
                       fieldType={"input"}/>
            </div>}
            <div className={style.button}>
                <button type="submit">Sign in</button>
            </div>
        </form>
    }

const LoginFormHOC = reduxForm<formDataType, loginOwnPropsType>({form: "login"})(LoginForm);
export default LoginFormHOC;