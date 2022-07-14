import React from "react";
import style from "./NewMessage.module.css";

const NewMessage = () => {
    let newMessageElement = React.createRef();

    let addMessage = () => {
        let message = newMessageElement.current.value;
        alert(message)
    }

    return (
        <div>
            <textarea ref={newMessageElement}></textarea>
            <button onClick={addMessage}>Post</button>
        </div>
    )
}

export default NewMessage;