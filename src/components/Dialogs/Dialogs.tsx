import React, {FC} from "react"
import style from "./Dialogs.module.css"
import commonStyles from "../../App.module.css"
import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message"
import NewMessageFormHOC from "./NewMessageForm/NewMessageForm"
import {initialStateType} from "../../redux/dialogsReducer"

type propsType = {
    dialogs: initialStateType
    addMessage: (newMessageText: string) => void
}
export type formDataType = {
    newMessageText: string
}

const Dialogs: FC<propsType> = ({dialogs, addMessage}) => {
    let dialogElement = dialogs.dialog
        .map(d => <Dialog
            key={d.id}
            id={d.id}
            name={d.name}/>)

    let messageElement = dialogs.messages
        .map(m => <Message
            key={m.id}
            message={m.message}/>)

    let addNewMessage = (values: formDataType) => {
        addMessage(values.newMessageText)
    }

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