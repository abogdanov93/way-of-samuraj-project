import React, {FC, useEffect, useRef} from "react"
import style from "./ChatMessages.module.css"
import {ChatMessage} from "./ChatMessage/СhatMessage"
import {useAppSelector} from "../../../hooks/redux"

export const ChatMessages: FC = () => {

    const messages = useAppSelector(state => state.chat.messages)
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
