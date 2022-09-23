import React, {FC, useEffect, useState} from "react"
import style from "../Chat.module.css"
import {NavLink} from "react-router-dom"
import {chatMessageType} from "../../../api/chatAPI"
import {useDispatch, useSelector} from "react-redux"
import {startMessagesListening, stopMessagesListening} from "../../../redux/chatReducer"
import {AnyAction} from "redux"
import {getChatMessages} from "../../../redux/selectors/chatSelectors";

export const ChatMessages: FC = () => {

    const messages = useSelector(getChatMessages)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction)
        return () => {
            stopMessagesListening()
        }
    }, [])

    return <div className={style.chatMessages}>
        {messages.map((m, index) =>
            <ChatMessage message={m.message} userName={m.userName} photo={m.photo} userId={m.userId} key={index}/>)}
    </div>
}

export const ChatMessage: FC<chatMessageType> = ({photo, userName, message, userId}) => {

    return <div className={style.chatMessage}>
        <NavLink to={"/profile/" + userId}><img src={photo}/>
        <div>{userName}</div></NavLink>
        <div>{message}</div>
    </div>
}