import React, {FC} from "react"
import {MyMessageForm} from "../../common/MyMessageForm/MyMessageForm"
import {actions} from "../../../redux/reducers/dialogsReducer"


export const DialogMessageForm: FC = () => {
    return <MyMessageForm placeholder={"Write a message..."} sendMessage={actions.addMessage}/>
}