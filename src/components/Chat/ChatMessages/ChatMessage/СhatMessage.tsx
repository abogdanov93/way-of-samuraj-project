import React, {FC} from 'react'
import {chatMessageAPIType} from "../../../../api/chatAPI"
import style from "../ChatMessages.module.css"
import {NavLink} from "react-router-dom"
import userAvatar from "../../../../uploads/images/userAvatar.jpeg"

export const ChatMessage: FC<chatMessageAPIType> = React.memo(({photo, userName, message, userId}) => {
        return <div className={style.chatMessage}>
            <NavLink to={"/profile/" + userId}>
                <img src={photo ? photo : userAvatar} alt="User's avatar"/>
                <div>{userName}</div>
            </NavLink>
            <div className={style.message}>{message}</div>
        </div>
    }
)