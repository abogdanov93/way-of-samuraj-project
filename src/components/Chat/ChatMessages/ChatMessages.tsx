import React, {FC, useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux"
import {getChatMessages} from "../../../redux/selectors/chatSelectors"
import style from "./ChatMessages.module.css"
import {ChatMessage} from "./ChatMessage/СhatMessage";

export const ChatMessages: FC = () => {

    const messagesRef = useRef<HTMLDivElement>(null)
    const messages = useSelector(getChatMessages)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) {
            messagesRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return <div className={style.chatMessages} onScroll={scrollHandler}>
        {messages.map((m) =>
            <ChatMessage message={m.message} userName={m.userName} photo={m.photo} userId={m.userId} key={m.id}/>)}
        <div ref={messagesRef}/>
    </div>
}
