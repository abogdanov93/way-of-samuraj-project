import React, {FC, useEffect} from "react"
import commonStyles from "../../App.module.css"
import style from "./Chat.module.css"
import {ChatMessages} from "./ChatMessages/ChatMessages"
import {ChatMessageForm} from "./ChatMessageForm/ChatMessageForm"
import {useSelector} from "react-redux"
import {getStatus} from "../../redux/selectors/chatSelectors"
import {useAppDispatch} from "../../hooks/redux"
import {startMessagesListening, stopMessagesListening} from "../../redux/actions/chatActions"

const Chat: FC = () => {

    const status = useSelector(getStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div className={`${style.chat} ${commonStyles.whiteBlock}`}>
        {status === "error" && <div>Some error occurred. Please refresh the page.</div>}
        <ChatMessages/>
        <ChatMessageForm/>
    </div>
}

export default Chat