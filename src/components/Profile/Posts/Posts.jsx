import React from "react";
import style from "./Posts.module.css";

const Posts = (props) => {
    // const onPostDelete = props.deletePost(props.id);
    return (
        <div className={style.posts}>
            <div className={style.avatar}><img className={style.avatar} src="https://i.pinimg.com/474x/83/73/c9/8373c9bbddf97a72c445eab91f3d6fbc.jpg"/></div>
            <div className={style.post}>{props.post}</div>
            <div className={style.like}>Like</div>
            <div className={style.likeCounter}>{props.likeCounter}</div>
            {/*<div className={style.delete} onClick={onPostDelete}>delete</div>*/}
        </div>
    );
}

export default Posts;
