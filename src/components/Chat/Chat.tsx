import React, {FC} from "react"
import commonStyles from "../../App.module.css"
import {ChatMessages} from "./ChatMessages/ChatMessages"
import {NewChatMessageForm} from "./NewChatMessageForm/NewChatMessageForm"

const Chat: FC = () => {

    return <div className={commonStyles.whiteBlock}>
        <ChatMessages />
        <NewChatMessageForm />
    </div>
}

export default Chat