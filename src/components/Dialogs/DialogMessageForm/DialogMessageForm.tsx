import React, {FC} from "react"
import {useForm, SubmitHandler} from "react-hook-form"
import style from "./DialogMessageForm.module.css"
import {useDispatch} from "react-redux"
import {actions} from "../../../redux/dialogsReducer"

type Inputs = {
    newDialogMessage: string,
}

export const DialogMessageForm: FC = () => {

    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<Inputs>({mode: "onBlur"})
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(actions.addMessage(data.newDialogMessage))
        reset()
    }

    return <form onSubmit={handleSubmit(onSubmit)} className={style.dialogMessageForm}>

        <input {...register("newDialogMessage", {
            maxLength: {value: 300, message: "The length of message must be 300 characters or fewer."}
        })}
               className={style.newMessage}
               placeholder={"Write a message..."}
        />
        <button type="submit" disabled={!isValid} className={style.button}>Send</button>

        {errors.newDialogMessage
        && <div className={style.warning}>
            {errors?.newDialogMessage?.message || "Error"}
        </div>
        }


    </form>
}