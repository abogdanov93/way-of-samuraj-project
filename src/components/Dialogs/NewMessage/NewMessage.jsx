import React from "react";
import style from "./NewMessage.module.css";

const NewMessage = () => {
    let newMessageElement = React.createRef();

    let addMessage = () => {
        let message = newMessageElement.current.value;
        alert(message)
    }

    return (
        <div className={style.newMessage}>
            <div className={style.textarea}><textarea ref={newMessageElement} /></div>
            <div className={style.button}><button onClick={addMessage}>Post</button></div>
        </div>
    )
}

export default NewMessage;