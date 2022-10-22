import React, {FC} from "react"
import style from "./Dialogs.module.css"
import commonStyles from "../../App.module.css"
import Dialog from "./Dialog/Dialog"
import {useSelector} from "react-redux"
import {getDialogs} from "../../redux/selectors/dialogsSelectors"
import {DialogMessageForm} from "./DialogMessageForm/DialogMessageForm"
import Message from "./Message/Message"

const Dialogs: FC = () => {
    const dialogs = useSelector(getDialogs)

    const dialogElement = dialogs.dialog
        .map(d => <Dialog
            key={d.id}
            id={d.id}
            name={d.name}/>)


    return (
        <div className={style.dialogs}>
            <div className={`${style.dialog} ${commonStyles.whiteBlock}`}>
                {dialogElement}
            </div>
            <div className={`${style.message} ${commonStyles.whiteBlock}`}>
                {dialogs.messages.map(m => <Message message={m.message}/>)}
            </div>
            <div className={`${style.newMessage} ${commonStyles.whiteBlock}`}>
                <DialogMessageForm />
            </div>
        </div>
    )
}

export default Dialogs