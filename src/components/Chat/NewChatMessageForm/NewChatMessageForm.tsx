import React, {FC, useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {sendChatMessage} from "../../../redux/chatReducer";

export const NewChatMessageForm: FC = () => {
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        // @ts-ignore
        dispatch(sendChatMessage(message))
        setMessage("")
    }

    return <div>
        <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
        <button onClick={sendMessageHandler} disabled={false}>Жми</button>
    </div>
}