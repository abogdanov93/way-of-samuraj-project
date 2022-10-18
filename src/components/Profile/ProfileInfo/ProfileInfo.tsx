import React, {ChangeEvent, FC} from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import largeAvatar from "./../../../images/userAvatar.jpeg"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import ProfileData from "../ProfileData/ProfileData"
import {profileType} from "../../../types/types"
import {actions, saveProfileData, saveProfilePhoto, updateProfileStatus} from "../../../redux/profileReducer"
import {useDispatch, useSelector} from "react-redux"
import {getIsEdithMode, getProfile, getStatus} from "../../../redux/selectors/profileSelectors"
import {AnyAction} from "redux"
import {ProfileDataForm} from "../ProfileDataForm/ProfileDataForm"


const ProfileInfo: FC<{isOwner: boolean}> = ({isOwner}) => {
    const profile = useSelector(getProfile)
    const status = useSelector(getStatus)
    const isEditMode = useSelector(getIsEdithMode)
    const dispatch = useDispatch()
    const updateStatus = (status: string) => {
        dispatch(updateProfileStatus(status) as unknown as AnyAction)
    }
    const savePhoto = (image: File) => {
        dispatch(saveProfilePhoto(image) as unknown as AnyAction)
    }

    const setEditMode = (isEditMode: boolean) => {
        dispatch(actions.setEditMode(isEditMode))
    }

    if (!profile) {
        return <Preloader/>
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files?.length && savePhoto(e.target.files[0]) // ? --> если files есть, берет длину 11 - 1:30
    }

    return (
        <div className={style.profileInfo}>

            <div className={style.avatar}>
                <img src={profile.photos.large || largeAvatar}/>
                {isOwner && <input type={"file"} onChange={onPhotoSelected}/>}
            </div>

            <div className={style.status}>
                <ProfileStatus
                    status={status}
                    updateStatus={updateStatus}/>
            </div>

            <div className={style.profileData}>
                {isEditMode
                    ? <ProfileDataForm profile={profile}/>
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   setEditMode={setEditMode}/>}
            </div>

        </div>
    )
}


export default ProfileInfo