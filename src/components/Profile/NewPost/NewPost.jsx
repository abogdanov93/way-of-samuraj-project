import React, {createRef} from "react";
import style from "./NewPost.module.css";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../store";

const NewPost = (props) => {
    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let updatePostText = () => {
        let text = newPostElement.current.value;
        props.dispatch(updatePostTextActionCreator(text));
    }

    return (
        <div className={style.newPost}>
            <div className={style.textarea}>
                <textarea ref={newPostElement}
                          value={props.newPostText}
                          onChange={updatePostText}/>
            </div>
            <div className={style.button}>
                <button onClick={addPost}>Post</button>
            </div>
        </div>
    );
}

export default NewPost;