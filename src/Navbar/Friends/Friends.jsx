import React from "react";
import style from "./Friends.module.css";

const Friends = (props) => {
    return (
            <div className={style.friends}>
                <div className={style.avatar}>{props.avatar}</div>
                <div className={style.name}>{props.name}</div>
            </div>
    );
}

export default Friends;
