import React, {FC, useEffect, useRef} from "react"
import {useSelector} from "react-redux"
import {getChatMessages} from "../../../redux/selectors/chatSelectors"
import style from "./ChatMessages.module.css"
import {ChatMessage} from "./ChatMessage/СhatMessage"

export const ChatMessages: FC = () => {

    const messages = useSelector(getChatMessages)
    const messagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messages])

    return <div className={style.chatMessages} ref={messagesRef}>
        {messages.map((m) =>
            <ChatMessage message={m.message} userName={m.userName} photo={m.photo} userId={m.userId} key={m.id}/>)}
    </div>
}
