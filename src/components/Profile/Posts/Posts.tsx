import React, {FC, useState} from "react"
import style from "./Posts.module.css"
import {useSelector} from "react-redux";
import {getProfile} from "../../../redux/selectors/profileSelectors";
import {HeartOutlined, LikeOutlined} from "@ant-design/icons";

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
            <img className={style.avatar} src={profile?.photos.small as any}/>
            <div className={style.name}>{profile?.fullName}</div>
            <div className={style.post}>{post}</div>
            <div className={style.actions}>
                <div><LikeOutlined onClick={() => setLikes(value => value + 1)}/></div>
                <div>{likes}</div>
                <div><HeartOutlined onClick={() => setHearts(value => value + 1)}/></div>
                <div>{hearts}</div>
                <div onClick={onPostDelete}>Delete</div>
            </div>
        </div>
    )
}

export default Posts
