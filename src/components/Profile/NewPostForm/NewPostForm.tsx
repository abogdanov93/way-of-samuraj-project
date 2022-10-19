import React, {FC} from "react"
import {MyMessageForm} from "../../common/MyMessageForm/MyMessageForm"
import {actions} from "../../../redux/profileReducer"

export const NewPostForm: FC = () => {
    return <MyMessageForm placeholder="Write something..." sendMessage={actions.addPost}/>
}
