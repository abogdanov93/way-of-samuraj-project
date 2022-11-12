import React, {FC} from "react"
import style from "./LoginForm.module.css"
import {useDispatch, useSelector} from "react-redux"
import {SubmitHandler, useForm} from "react-hook-form"
import {getCaptchaURL} from "../../../redux/selectors/loginSelectors"
import {logInThunk} from "../../../redux/reducers/authSlice"
import {PrimaryButton} from "../../Utils/PrimaryButton/PrimaryButton"
import {MyInput} from "../../Utils/MyInput/MyInput"
import {SecondaryButton} from "../../Utils/SecondaryButton/SecondaryButton"
import {useAppDispatch} from "../../../hooks/redux"

export type Inputs = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginForm: FC = () => {

    const captchaURL = useSelector(getCaptchaURL)
    const dispatch = useAppDispatch()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>({mode: "onBlur"})
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(logInThunk(data.email, data.password, data.rememberMe, data.captcha))
        reset()
    }

    return <form onSubmit={handleSubmit(onSubmit)}>

        <MyInput
            name="email"
            placeholder="E-mail"
            errors={errors}
            register={register}
            validationSchema={{required: "The field is required"}}
            required
        />

        <MyInput
            name="password"
            type="password"
            placeholder="Password"
            errors={errors}
            register={register}
            validationSchema={{
                required: "The field is required",
                minLength: {value: 4, message: "The password should consist at least 4 symbols"}
            }}
            required
        />

        <div className={style.rememberMe}>
            <div> Remember me</div>
            <input {...register("rememberMe")} type="checkbox"/>
        </div>

        <div className={style.buttons}>
            <PrimaryButton type="submit">Send</PrimaryButton>
            <SecondaryButton type="reset">Reset</SecondaryButton>
        </div>

        {(errors.email || errors.password)
            && <div className={style.warning}>
                {errors?.email?.message || errors.password?.message || "Invalid email or password. Please try again"}
            </div>
        }

        {captchaURL
            && <div>
                <img src={captchaURL as string}/>
                <input {...register("captcha", {
                    required: "The field is required"
                })}
                       className={style.newMessage}
                       placeholder={"Type symbols from the picture"}
                />
            </div>
        }

        {errors.captcha &&
            <div className={style.warning}>
                {errors?.email?.message || errors.password?.message || "Invalid email or password. Please try again"}
            </div>
        }

    </form>
}