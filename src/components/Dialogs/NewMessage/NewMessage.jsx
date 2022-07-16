import React from "react";
import style from "./NewMessage.module.css";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../../store";

const NewMessage = (props) => {
    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.dispatch(addMessageActionCreator());
    }

    let updateMessageText = () => {
        let newMessage = newMessageElement.current.value;
        props.dispatch(updateMessageTextActionCreator(newMessage));
    }

    return (
        <div className={style.newMessage}>
            <div className={style.textarea}>
                <textarea ref={newMessageElement}
                          value={props.newMessageText}
                          onChange={updateMessageText}/>
            </div>
            <div className={style.button}>
                <button onClick={addMessage}>Post</button>
            </div>
        </div>
    )
}

export default NewMessage;