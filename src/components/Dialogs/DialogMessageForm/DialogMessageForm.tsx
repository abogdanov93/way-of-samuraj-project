import React, {FC} from "react"
import {MyMessageForm} from "../../common/MyMessageForm/MyMessageForm"
import {addMessage} from "../../../redux/reducers/dialogsSlice"


export const DialogMessageForm: FC = () => {
    return <MyMessageForm placeholder={"Write a message..."} sendMessage={addMessage}/>
}