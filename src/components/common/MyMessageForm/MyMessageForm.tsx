import React, {ChangeEvent, FC, useState} from 'react'
import style from "./MyMessageForm.module.css"
import {useDispatch} from "react-redux"
import {actions} from "../../../redux/dialogsReducer"
import {PrimaryButton} from "../PrimaryButton/PrimaryButton"

type propsType = {
    placeholder: string
    sendMessage: any
    disabled?: any
}

export const MyMessageForm: FC<propsType> = ({placeholder, sendMessage, disabled}) => {

    const [message, setMessage] = useState("")
    const [error, setError] = useState(null as null | string)
    const dispatch = useDispatch()

    const sendMessageHandler = (message: string) => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage("")
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        if (value.length > 500) setError("The maximum limit is 500 symbols")
        else setError(null)
        setMessage(value)
    }

    return <div className={style.MyMessageForm}>
        <textarea placeholder={placeholder}
                  value={message}
                  onChange={handleChange}/>

        <div className={style.button}>
            <PrimaryButton onClick={() => sendMessageHandler(message)} disabled={disabled || error}>Send</PrimaryButton>
        </div>

        {error && (<label className={style.error} htmlFor="message">{error}</label>)}
    </div>
}