import React from "react";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";
import NewPost from "./NewPost";

const NewPostContainer = (props) => {

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let updatePostText = (text) => {
        props.store.dispatch(updatePostTextActionCreator(text));
    }

    return <NewPost
        addPost={addPost}
        updatePostText={updatePostText}
        newPostText={props.store.getState().profile.newPostText}/>
}

export default NewPostContainer;