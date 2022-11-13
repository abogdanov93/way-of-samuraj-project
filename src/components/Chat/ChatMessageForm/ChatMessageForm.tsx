import React, {FC} from "react"
import {useSelector} from "react-redux"
import {getStatus} from "../../../redux/selectors/chatSelectors"
import {MyMessageForm} from "../../Utils/MyMessageForm/MyMessageForm"
import {sendChatMessage} from "../../../redux/actions/chatActions"

export const ChatMessageForm: FC = () => {
    const status = useSelector(getStatus)

    return <MyMessageForm placeholder="Write a message..."
                          sendMessage={sendChatMessage}
                          disabled={status !== "ready"}
    />
}