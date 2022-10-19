import React, {FC, useState} from 'react'
import style from "./MyMessageForm.module.css"
import {useDispatch} from "react-redux"
import {actions} from "../../../redux/dialogsReducer"
import {MyButton} from "../MyButton/MyButton"

type propsType = {
    placeholder: string
    sendMessage: any
    disabled?: any
}

export const MyMessageForm: FC<propsType> = ({placeholder, sendMessage, disabled}) => {

    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const sendMessageHandler = (message: string) => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage("")
    }


    return <div className={style.MyMessageForm}>
        <textarea placeholder={placeholder}
                  value={message}
                  onChange={(e) => setMessage(e.currentTarget.value)}/>

        <div className={style.button}>
            <MyButton onClick={() => sendMessageHandler(message)} disabled={disabled}>Send</MyButton>
        </div>

    </div>
}