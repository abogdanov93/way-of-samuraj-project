import React, {FC, UIEventHandler, useEffect, useRef, useState} from "react"
import style from "../Chat.module.css"
import {NavLink} from "react-router-dom"
import {chatMessageType} from "../../../api/chatAPI"
import {useSelector} from "react-redux"
import {getChatMessages} from "../../../redux/selectors/chatSelectors"

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
        {messages.map((m, index) =>
            <ChatMessage message={m.message} userName={m.userName} photo={m.photo} userId={m.userId} key={index}/>)}
        <div ref={messagesRef}/>
    </div>
}

const ChatMessage: FC<chatMessageType> = React.memo(({photo, userName, message, userId}) => {
        console.log(">>>>>>>render")
        return <div className={style.chatMessage}>
            <NavLink to={"/profile/" + userId}><img src={photo}/>
                <div>{userName}</div>
            </NavLink>
            <div>{message}</div>
        </div>
    }
)