import React, {FC} from "react"
import style from "./Profile.module.css"
import commonStyles from "./../../App.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import NewPostForm from "./NewPostForm/NewPostForm"
import Posts from "./Posts/Posts"
import {postsType, profileType} from "../../types/types"
import {baseActionType} from "../../redux/reduxStore"
import {actions} from "../../redux/profileReducer"
import {useSelector} from "react-redux"
import {getPosts} from "../../redux/selectors/profileSelectors"
import {useSearchParams} from "react-router-dom"

type propsType = {
    profilePage: {
        posts: Array<postsType>
        profile: profileType
        status: string
        isEditMode: boolean
    }
    isOwner: boolean
    addPost: (newPostText: string) => baseActionType<typeof actions>
    deletePost: (id: number) => baseActionType<typeof actions>
    setEditMode: (mode: boolean) => baseActionType<typeof actions>
    updateStatus: (status: string) => void
    savePhoto: (image: File) => void
    saveProfileData: (formData: profileType) => void
}
export type newPostFormDataType = {
    newPostText: string
}

const Profile: FC<propsType> = (props) => {

    const posts = useSelector(getPosts)

    let postElement = posts
        .map(p => <Posts
            key={p.id}
            id={p.id}
            post={p.post}
            likeCounter={p.likeCounter}
            deletePost={props.deletePost}
        />)

    let addNewPost = (values: newPostFormDataType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={style.profile}>
            <div className={commonStyles.whiteBlock}>
                <ProfileInfo
                    profile={props.profilePage.profile}
                    status={props.profilePage.status}
                    isEditMode={props.profilePage.isEditMode}
                    updateStatus={props.updateStatus}
                    isOwner={props.isOwner}
                    savePhoto={props.savePhoto}
                    saveProfileData={props.saveProfileData}
                    setEditMode={props.setEditMode}
                />
            </div>
            <div className={commonStyles.whiteBlock}>
                <NewPostForm onSubmit={addNewPost}/>
            </div>
            <div className={commonStyles.whiteBlock}>{postElement}</div>
        </div>
    )
}

export default Profile