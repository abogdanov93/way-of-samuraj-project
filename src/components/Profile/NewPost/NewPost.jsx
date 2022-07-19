import React from "react";
import style from "./NewPost.module.css";

const NewPost = (props) => {

    let onAddPost = () => props.addPost();

    let onPostChange = (event) => {
        let text = event.target.value;
        props.updatePostText(text);
    }

    return (
        <div className={style.newPost}>
            <div className={style.textarea}>
                <textarea required placeholder="Write a post..."
                          value={props.profile.newPostText}
                          onChange={onPostChange}/>
            </div>
            <div className={style.button}>
                <button onClick={onAddPost}>Post</button>
            </div>
        </div>
    );
}

export default NewPost;