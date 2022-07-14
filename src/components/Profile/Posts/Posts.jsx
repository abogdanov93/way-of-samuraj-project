import React from "react";
import style from "./Posts.module.css";

const Posts = (props) => {
    return (
        <div className={style.posts}>
            <div className={style.avatar}><img className={style.avatar} src={props.avatar}/></div>
            <div className={style.post}>{props.post}</div>
            <div className={style.like}><span>Like</span></div>
            <div className={style.likeCounter}><span>{props.likeCounter}</span></div>
        </div>
    );
}

export default Posts;