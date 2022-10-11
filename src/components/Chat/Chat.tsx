import React, {FC, useEffect, useRef} from "react"
import commonStyles from "../../App.module.css"
import {ChatMessages} from "./ChatMessages/ChatMessages"
import {ChatMessageForm} from "./ChatMessageForm/ChatMessageForm"
import {useDispatch, useSelector} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {AnyAction} from "redux";
import {getStatus} from "../../redux/selectors/chatSelectors";

const Chat: FC = () => {
    const status = useSelector(getStatus)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction)
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction)
        }
    }, [])

    return <div className={commonStyles.whiteBlock}>
        {status === "error" && <div>Some error occurred. Please refresh the page.</div>}
        <ChatMessages/>
        <ChatMessageForm/>
    </div>
}

export default Chat