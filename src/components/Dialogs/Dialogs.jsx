import React from "react";
import style from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import NewMessage from "./NewMessage/NewMessage";
import {Navigate} from "react-router-dom";

const Dialogs = (props) => {
    let dialogElement = props.dialogs.dialog
        .map(d => <Dialog
            key={d.id}
            id={d.id}
            name={d.name}/>);

    let messageElement = props.dialogs.messages
        .map(m => <Message
            key={m.id}
            id={m.id}
            message={m.message}/>);

    return (
        <div className={style.dialogs}>
            <div className={`${style.dialog} ${style.boxes}`}>
                {dialogElement}
            </div>
            <div className={`${style.message} ${style.boxes}`}>
                {messageElement}
            </div>
            <div className={`${style.newMessage} ${style.boxes}`}>
                <NewMessage
                    dialogs={props.dialogs}
                    addMessage={props.addMessage}
                    updateMessageText={props.updateMessageText}
                />
            </div>
        </div>
    );
}

export default Dialogs;