import React from "react";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../../redux/dialogsReducer";
import NewMessage from "./NewMessage";

const NewMessageContainer = (props) => {

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }

    let updateMessageText = (newMessage) => {
        props.store.dispatch(updateMessageTextActionCreator(newMessage));
    }

    return <NewMessage addMessage={addMessage}
                       updateMessageText={updateMessageText}
                       newMessageText={props.store.getState().dialogs.newMessageText}/>
}

export default NewMessageContainer;