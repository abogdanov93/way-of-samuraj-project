import React, {FC, useState} from "react"
import style from "./Posts.module.css"
import {useSelector} from "react-redux";
import {getProfile} from "../../../redux/selectors/profileSelectors";
import {HeartOutlined, LikeOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

type propsType = {
    post: string
    likeCounter: number
    deletePost: (id: number) => void
    id: number
}

const Posts: FC<propsType> = ({post, likeCounter, deletePost, id}) => {

    const [likes, setLikes] = useState(0)
    const [hearts, setHearts] = useState(0)

    const profile = useSelector(getProfile)
    const onPostDelete = () => {
        deletePost(id)
    }

    return (
        <div className={style.posts}>
            <NavLink to={"/profile"} className={style.author}>
                <img  src={profile?.photos.small as any}/>
                <div>{profile?.fullName}</div>
            </NavLink>
            <div className={style.post}>{post}</div>
            <div className={style.actions}>
                <div className={style.action}><LikeOutlined onClick={() => setLikes(value => value + 1)}/></div>
                <div>{likes}</div>
                <div className={style.action}><HeartOutlined onClick={() => setHearts(value => value + 1)}/></div>
                <div>{hearts}</div>
                <div className={style.action} onClick={onPostDelete}>Delete</div>
            </div>
        </div>
    )
}

export default Posts
