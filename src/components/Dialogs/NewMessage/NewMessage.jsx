import React from "react";
import style from "./NewMessage.module.css";

const NewMessage = (props) => {

    let onAddMessage = () => props.addMessage();

    let onUpdateMessageText = (event) => {
        let text = event.target.value;
        props.updateMessageText(text);
    }

    return (
        <div className={style.newMessage}>
            <div className={style.textarea}>
                <textarea required placeholder="Write a message..."
                          value={props.dialogs.newMessageText}
                          onChange={onUpdateMessageText}/>
            </div>
            <div className={style.button}>
                <button onClick={onAddMessage}>Post</button>
            </div>
        </div>
    )
}

export default NewMessage;