import React from "react";
import style from "./NewPost.module.css";

const NewPost = () => {
    return (
        <div className={style.newPost}>
            <textarea></textarea>
            <button>Post</button>
        </div>
    );
}

export default NewPost;