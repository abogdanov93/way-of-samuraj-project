import React from "react";
import style from "./Dialogs.module.css"
import commonStyles from "../../App.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import NewMessageFormHOC from "./NewMessageForm/NewMessageForm";

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

    let addNewMessage = (values) => {
        props.addMessage(values.newMessageText);
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
                    addMessage={props.addMessage}
                    onSubmit={addNewMessage}
                />
            </div>
        </div>
    );
}

export default Dialogs;