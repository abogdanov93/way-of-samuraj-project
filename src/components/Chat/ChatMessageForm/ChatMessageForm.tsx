import React, {FC} from "react"
import {useSelector} from "react-redux"
import {sendChatMessage} from "../../../redux/reducers/chatSlice"
import {getStatus} from "../../../redux/selectors/chatSelectors"
import {MyMessageForm} from "../../Utils/MyMessageForm/MyMessageForm"

export const ChatMessageForm: FC = () => {
    const status = useSelector(getStatus)

    return <MyMessageForm placeholder="Write a message..."
                          sendMessage={sendChatMessage}
                          disabled={status !== "ready"}
    />
}