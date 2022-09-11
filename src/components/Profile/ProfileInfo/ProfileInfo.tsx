import React, {ChangeEvent, FC} from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import largeAvatar from "./../../../images/userAvatar.jpeg"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import ProfileDataFormHOC from "../ProfileDataForm/ProfileDataForm"
import ProfileData from "../ProfileData/ProfileData"
import {profileType} from "../../../types/types"
import {baseActionType} from "../../../redux/reduxStore"
import {actions} from "../../../redux/profileReducer"

type propsType = {
    profile: profileType
    saveProfileData: (formData: profileType) => void
    savePhoto: (file: File) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    isEditMode: boolean
    setEditMode: (mode: boolean) => baseActionType<typeof actions>
}

const ProfileInfo: FC<propsType> = (props) => {
    const onSubmit = (formData: profileType) => {
        props.saveProfileData(formData)
    }

    if (!props.profile) {
        return <Preloader/>
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files?.length && props.savePhoto(e.target.files[0]) // ? --> если files есть, берет длину 11 - 1:30
    }

    return (
        <div className={style.profileInfo}>

            <div className={style.avatar}>
                <img src={props.profile.photos.large || largeAvatar}/>
                {props.isOwner && <input type={"file"} onChange={onPhotoSelected}/>}
            </div>

            <div className={style.status}>
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}/>
            </div>

            <div className={style.profileData}>
                {props.isEditMode
                    ? <ProfileDataFormHOC onSubmit={onSubmit}
                                          profile={props.profile}/>
                    : <ProfileData profile={props.profile}
                                   isOwner={props.isOwner}
                                   setEditMode={props.setEditMode}/>}
            </div>

        </div>
    )
}


export default ProfileInfo