import React, {FC} from "react"
import style from "./LoginForm.module.css"
import {useDispatch, useSelector} from "react-redux"
import {SubmitHandler, useForm} from "react-hook-form"
import {getCaptchaURL} from "../../../redux/selectors/loginSelectors";
import {logInThunk} from "../../../redux/authReducer";
import {AnyAction} from "redux";

export type Inputs = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginForm: FC = () => {
    const captchaURL = useSelector(getCaptchaURL)
    const dispatch = useDispatch()


    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<Inputs>({mode: "onBlur"})
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(logInThunk(data.email, data.password, data.rememberMe, data.captcha) as unknown as AnyAction)
        reset()
    }

    return <form onSubmit={handleSubmit(onSubmit)} className={style.login}>

        <input {...register("email", {
            required: "The field is required"
        })}
               placeholder={"E-mail"}
        />

        <input {...register("password", {
            minLength: {value: 5, message: "The password should consist at least 5 symbols"}
        })}
               type="password"
               placeholder={"Password"}
        />

        <input {...register("rememberMe")} type="checkbox"/>
        <button type="submit" disabled={!isValid} className={style.button}>Send</button>

        if (errors.email || errors.password) {
        <div className={style.warning}>
            {errors?.email?.message || errors.password?.message || "Invalid email or password. Please try again"}
        </div>
    }
        captchaURL && <div>
        <img src={captchaURL as string}/>
        <input {...register("captcha", {
            required: "The field is required"
        })}
               className={style.newMessage}
               placeholder={"Type symbols from the picture"}
        />
    </div>
        errors.captcha &&
        <div className={style.warning}>
            {errors?.email?.message || errors.password?.message || "Invalid email or password. Please try again"}
        </div>

    </form>
}

//
// type loginOwnPropsType = {
//     captchaURL: string | null
// }
//
// const LoginForm: FC<InjectedFormProps<loginFormDataType, loginOwnPropsType> & loginOwnPropsType> =
//     ({handleSubmit, error, captchaURL}) => {
//         return <form className={style.loginForm} onSubmit={handleSubmit}>
//             <div className={style.login}>
//                 <Field component={Element}
//                        name={"email"} // можно типизировать name? type a = keyof loginFormDataType;
//                        placeholder={"E-mail"}
//                        validate={[required, maxLengthCreator(20)]}
//                        fieldType={"input"}/>
//             </div>
//             <div className={style.password}>
//                 <Field component={Element}
//                        name={"password"}
//                        type={"password"}
//                        placeholder={"Password"}
//                        validate={[required, maxLengthCreator(20)]}
//                        fieldType={"input"}/>
//             </div>
//             <div className={style.rememberMe}>
//                 <Field component={"input"}
//                        name={"rememberMe"}
//                        type={"checkbox"}/>
//                 <div>Remember me</div>
//             </div>
//             {error && <div className={formStyle.errorWarning}>{error}</div>}
//             {captchaURL && <div>
//                 <img src={captchaURL}/>
//                 <Field component={Element}
//                        name={"captcha"}
//                        placeholder={"Symbols from the picture"}
//                        validate={[required]}
//                        fieldType={"input"}/>
//             </div>}
//             <div className={style.button}>
//                 <button type="submit">Sign in</button>
//             </div>
//         </form>
//     }
//
// const LoginFormHOC = reduxForm<loginFormDataType, loginOwnPropsType>({form: "login"})(LoginForm)
// export default LoginFormHOC