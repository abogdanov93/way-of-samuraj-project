import React from "react";
import style from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogElement = props.state.dialogs
        .map(d => <Dialog id={d.id} name={d.name}/>);

    let messageElement = props.state.messages
        .map(m => <Message id={m.id} message={m.message}/>)

    return (
        <div className={style.dialogs}>
            <div>
                {dialogElement}
            </div>
            <div>
                {messageElement}
            </div>
        </div>
    );
}

export default Dialogs;