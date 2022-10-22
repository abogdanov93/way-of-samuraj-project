import React, {FC} from "react"
import style from "./Dialogs.module.css"
import commonStyles from "../../App.module.css"
import Dialog from "./Dialog/Dialog"
import {useDispatch, useSelector} from "react-redux"
import {getDialogs} from "../../redux/selectors/dialogsSelectors"
import MyMessage from "../common/MyMessage/MyMessage"
import {addMessage, deleteMessage} from "../../redux/reducers/dialogsSlice"
import {MyMessageForm} from "../common/MyMessageForm/MyMessageForm"

const Dialogs: FC = () => {

    const dialogs = useSelector(getDialogs)
    const dispatch = useDispatch()
    const deleteMessageText = (id: number) => dispatch(deleteMessage(id))

    return (
        <div className={style.dialogs}>
            <div className={`${style.dialog} ${commonStyles.whiteBlock}`}>
                {dialogs.dialog.map(d => <Dialog key={d.id} id={d.id} name={d.name}/>)}
            </div>
            <div className={`${style.message} ${commonStyles.whiteBlock}`}>
                {dialogs.messages.map(m => <MyMessage key={m.id} text={m.message} id={m.id} deleteText={deleteMessageText}/>)}
            </div>
            <div className={`${style.newMessage} ${commonStyles.whiteBlock}`}>
                <MyMessageForm placeholder={"Write a message..."} sendMessage={addMessage}/>
            </div>
        </div>
    )
}

export default Dialogs