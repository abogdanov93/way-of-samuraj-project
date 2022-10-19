import React, {FC, useState} from "react"
import style from "./DialogMessageForm.module.css"
import {useDispatch} from "react-redux"
import {actions} from "../../../redux/dialogsReducer"
import {MyButton} from "../../common/MyButton/MyButton"
import {MyTextarea} from "../../common/MyTextarea/MyTextarea"


export const DialogMessageForm: FC = () => {

    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const sendMessageHandler = (message: string) => {
        if (!message) {
            return
        }
        dispatch(actions.addMessage(message))
        setMessage("")
    }

    return <div className={style.dialogMessageForm}>

        <div className={style.newMessage}>
            <MyTextarea placeholder={"Write a message..."}
                        value={message}
                        onChange={(e) => setMessage(e.currentTarget.value)}/>
        </div>

        <div className={style.button}>
            <MyButton onClick={() => sendMessageHandler(message)}>Send</MyButton>
        </div>

    </div>
}