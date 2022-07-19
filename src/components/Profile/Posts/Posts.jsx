import React from "react";
import style from "./Posts.module.css";

const Posts = (props) => {
    return (
        <div className={style.posts}>
            <div className={style.avatar}><img className={style.avatar} src="https://i.pinimg.com/474x/83/73/c9/8373c9bbddf97a72c445eab91f3d6fbc.jpg"/></div>
            <div className={style.post}>{props.posts}</div>
            <div className={style.like}><span>Like</span></div>
            <div className={style.likeCounter}><span>{props.likeCounter}</span></div>
        </div>
    );
}

export default Posts;
