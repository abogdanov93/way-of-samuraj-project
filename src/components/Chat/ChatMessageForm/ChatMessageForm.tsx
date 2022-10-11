import React, {FC, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {sendChatMessage} from "../../../redux/chatReducer"
import {getStatus} from "../../../redux/selectors/chatSelectors"
import {AnyAction} from "redux"

export const ChatMessageForm: FC = () => {
    const [message, setMessage] = useState("")
    const status = useSelector(getStatus)
    const dispatch = useDispatch()
    const sendMessage = (message: string) => {
        dispatch(sendChatMessage(message) as unknown as AnyAction)
    }

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        sendMessage(message)
        setMessage("")
    }
    // todo: cmd + enter - send msg keyup? disable - нельзя отправить
    return <div>
        <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
        <button onClick={sendMessageHandler} disabled={status !== "ready"}>Жми</button>
    </div>
}