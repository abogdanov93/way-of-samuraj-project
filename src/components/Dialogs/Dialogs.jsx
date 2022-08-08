import React from "react";
import style from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import NewMessageFormHOC from "./NewMessageForm/NewMessageForm";

const Dialogs = (props) => {
    debugger
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

    let addNewMessage = (values) => {
        props.addMessage(values.newMessageText);
    }

    return (
        <div className={style.dialogs}>
            <div className={`${style.dialog} ${style.boxes}`}>
                {dialogElement}
            </div>
            <div className={`${style.message} ${style.boxes}`}>
                {messageElement}
            </div>
            <div className={`${style.newMessage} ${style.boxes}`}>
                <NewMessageFormHOC
                    addMessage={props.addMessage}
                    onSubmit={addNewMessage}
                />
            </div>
        </div>
    );
}

export default Dialogs;