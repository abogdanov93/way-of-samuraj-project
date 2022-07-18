import React from "react";
import style from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import NewMessageContainer from "./NewMessage/NewMessageContainer";

const Dialogs = (props) => {

    let dialogs = props.store.getState().dialogs;

    let dialogElement = dialogs.dialog
        .map(d => <Dialog id={d.id} name={d.name}/>);

    let messageElement = dialogs.messages
        .map(m => <Message id={m.id} message={m.message}/>);

    return (
        <div className={style.dialogs}>
            <div className={`${style.dialog} ${style.boxes}`}>
                {dialogElement}
            </div>
            <div className={`${style.message} ${style.boxes}`}>
                {messageElement}
            </div>
            <div className={`${style.newMessage} ${style.boxes}`}>
                <NewMessageContainer store={props.store}/>
            </div>
        </div>
    );
}

export default Dialogs;