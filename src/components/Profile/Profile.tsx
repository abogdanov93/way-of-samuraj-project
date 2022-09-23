import React, {FC} from "react"
import style from "./Profile.module.css"
import commonStyles from "./../../App.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import NewPostForm from "./NewPostForm/NewPostForm"
import Posts from "./Posts/Posts"
import {actions} from "../../redux/profileReducer"
import {useDispatch, useSelector} from "react-redux"
import {getPosts} from "../../redux/selectors/profileSelectors"


export type newPostFormDataType = {
    newPostText: string
}

const Profile: FC = () => {

    const posts = useSelector(getPosts)
    const dispatch = useDispatch()
    const deletePost = (postId: number) => {
        dispatch(actions.deletePost(postId))
    }
    const addPost = (newPostText: string) => {
        dispatch(actions.addPost(newPostText))
    }


    let postElement = posts
        .map(p => <Posts
            key={p.id}
            id={p.id}
            post={p.post}
            likeCounter={p.likeCounter}
            deletePost={deletePost}
        />)

    let addNewPost = (values: newPostFormDataType) => {
        addPost(values.newPostText)
    }

    return (
        <div className={style.profile}>
            <div className={commonStyles.whiteBlock}>
                <ProfileInfo isOwner={isOwner}/>
            </div>
            <div className={commonStyles.whiteBlock}>
                <NewPostForm onSubmit={addNewPost}/>
            </div>
            <div className={commonStyles.whiteBlock}>{postElement}</div>
        </div>
    )
}

export default Profile