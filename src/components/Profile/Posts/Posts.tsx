import React, {FC} from "react"
import style from "./Posts.module.css"
import {baseActionType} from "../../../redux/reduxStore";
import {actions} from "../../../redux/profileReducer";

type propsType = {
    post: string
    likeCounter: number
    deletePost: (id: number) => baseActionType<typeof actions>
    id: number
}

const Posts: FC<propsType> = ({post, likeCounter, deletePost, id}) => {
    const onPostDelete = () => {
        deletePost(id)
    }
    return (
        <div className={style.posts}>
            <div className={style.avatar}><img className={style.avatar} src="https://i.pinimg.com/474x/83/73/c9/8373c9bbddf97a72c445eab91f3d6fbc.jpg"/></div>
            <div className={style.post}>{post}</div>
            <div className={style.like}>Like</div>
            <div className={style.likeCounter}>{likeCounter}</div>
            <div className={style.delete} onClick={onPostDelete}>delete</div>
        </div>
    )
}

export default Posts
