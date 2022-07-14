import React from "react";
import style from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import NewMessage from "./NewMessage/NewMessage";

const Dialogs = (props) => {

    let dialogElement = props.dialogs.dialogs
        .map(d => <Dialog id={d.id} name={d.name}/>);

    let messageElement = props.dialogs.messages
        .map(m => <Message id={m.id} message={m.message}/>)

    return (
        <div className={style.dialogs}>
            <div className={style.dialog}>
                {dialogElement}
            </div>
            <div className={style.message}>
                {messageElement}
            </div>
            <div className={style.newMessage}>
                <NewMessage/>
            </div>
        </div>
    );
}

export default Dialogs;