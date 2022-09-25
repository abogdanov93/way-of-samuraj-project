import React, {FC, useEffect} from "react"
import style from "./Profile.module.css"
import commonStyles from "./../../App.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import NewPostForm from "./NewPostForm/NewPostForm"
import Posts from "./Posts/Posts"
import {actions, getProfileStatus, getUserProfile} from "../../redux/profileReducer"
import {useDispatch, useSelector} from "react-redux"
import {getPosts, getUserId} from "../../redux/selectors/profileSelectors"
import {useParams} from "react-router-dom"
import {AnyAction} from "redux"


export type newPostFormDataType = {
    newPostText: string
}

const Profile: FC = () => {
    const posts = useSelector(getPosts)
    const userId = useSelector(getUserId)
    const dispatch = useDispatch()
    const deletePost = (postId: number) => {
        dispatch(actions.deletePost(postId))
    }
    const getProfile = (userId: null | number) => {
        dispatch(getUserProfile(userId) as unknown as AnyAction)
    }
    const getStatus = (userId: null | number) => {
        dispatch(getProfileStatus(userId) as unknown as AnyAction)
    }
    const addPost = (newPostText: string) => {
        dispatch(actions.addPost(newPostText))
    }

    const params = useParams()
    const isOwner = !params.userId

    const refreshProfile = () => {
        let id
        if (!params.userId) {
            id = userId as number | null
        } else {
            id = Number(params.userId)
        }
        getProfile(id)
        getStatus(id)
    }
//todo возможно это не нужно
    // useEffect(() => {
    //     debugger
    //     refreshProfile()
    // }, [])

    useEffect(() => {
        debugger
        refreshProfile()
    }, [params.userId])


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