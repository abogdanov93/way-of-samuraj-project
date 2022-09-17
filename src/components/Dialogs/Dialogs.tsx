import React, {FC} from "react"
import style from "./Dialogs.module.css"
import commonStyles from "../../App.module.css"
import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message"
import NewMessageFormHOC from "./NewMessageForm/NewMessageForm"
import {useDispatch, useSelector} from "react-redux"
import {getDialogs} from "../../redux/selectors/dialogsSelectors"
import { actions } from "../../redux/dialogsReducer"

export type formDataType = {
    newMessageText: string
}

const Dialogs: FC = () => {
    const dialogs = useSelector(getDialogs)
    const dispatch = useDispatch()
    const addNewMessage = (values: formDataType) => {
        dispatch(actions.addMessage(values.newMessageText))
    }

    const dialogElement = dialogs.dialog
        .map(d => <Dialog
            key={d.id}
            id={d.id}
            name={d.name}/>)

    const messageElement = dialogs.messages
        .map(m => <Message
            key={m.id}
            message={m.message}/>)


    return (
        <div className={style.dialogs}>
            <div className={`${style.dialog} ${commonStyles.whiteBlock}`}>
                {dialogElement}
            </div>
            <div className={`${style.message} ${commonStyles.whiteBlock}`}>
                {messageElement}
            </div>
            <div className={`${style.newMessage} ${commonStyles.whiteBlock}`}>
                <NewMessageFormHOC
                    onSubmit={addNewMessage}
                />
            </div>
        </div>
    )
}

export default Dialogs