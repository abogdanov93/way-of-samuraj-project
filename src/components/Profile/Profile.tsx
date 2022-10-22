import React, {FC, useEffect} from "react"
import style from "./Profile.module.css"
import commonStyles from "./../../App.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import {actions, getProfileStatus, getUserProfile} from "../../redux/reducers/profileReducer"
import {useDispatch, useSelector} from "react-redux"
import {getPosts, getUserId} from "../../redux/selectors/profileSelectors"
import {useParams} from "react-router-dom"
import {AnyAction} from "redux"
import MyMessage from "../common/MyMessage/MyMessage"
import {MyMessageForm} from "../common/MyMessageForm/MyMessageForm"

const Profile: FC = () => {
    const posts = useSelector(getPosts)
    const userId = useSelector(getUserId)
    const dispatch = useDispatch()

    const deletePost = (postId: number) => dispatch(actions.deletePost(postId))
    const getProfile = (userId: null | number) => dispatch(getUserProfile(userId) as unknown as AnyAction)
    const getStatus = (userId: null | number) => dispatch(getProfileStatus(userId) as unknown as AnyAction)

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

    useEffect(() => {
        refreshProfile()
    }, [params.userId])


    return <div className={style.profile}>
                <div className={commonStyles.whiteBlock}>
                    <ProfileInfo isOwner={isOwner}/>
                </div>

                <div className={commonStyles.whiteBlock}>
                    <MyMessageForm placeholder="Write something..." sendMessage={actions.addPost}/>
                </div>

                <div className={`${commonStyles.whiteBlock} ${style.posts}`}>{
                    posts.map(p => <MyMessage key={p.id} id={p.id} text={p.post} deleteText={deletePost}/>)
                }</div>
            </div>
}

export default Profile