import React, {ChangeEvent, FC} from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import largeAvatar from "./../../../images/userAvatar.jpeg"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import {actions, saveProfilePhoto, updateProfileStatus} from "../../../redux/profileReducer"
import {useDispatch, useSelector} from "react-redux"
import {getIsEdithMode, getProfile, getStatus} from "../../../redux/selectors/profileSelectors"
import {AnyAction} from "redux"
import {ProfileDataForm} from "../ProfileDataForm/ProfileDataForm"
import {Badge} from "antd"
import {contactsType} from "../../../types/types"
import {Contact} from "./Contact/Contact"


const ProfileInfo: FC<{ isOwner: boolean }> = ({isOwner}) => {
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

    const activateEditMode = () => setEditMode(true)

    return (
        <div className={style.profileInfo}>

            <div className={style.avatar}>
                {profile.lookingForAJob
                    ? <Badge.Ribbon text="Open to work" color="green">
                        <img src={profile.photos.large || largeAvatar}/>
                    </Badge.Ribbon>
                    : <Badge.Ribbon text="Do not open to work">
                        <img src={profile.photos.large || largeAvatar}/>
                    </Badge.Ribbon>
                }
                {isOwner && <input type={"file"} onChange={onPhotoSelected}/>}
            </div>

            {isEditMode
                ? <ProfileDataForm profile={profile}/>
                : <div className={style.profileData}>

                    {isOwner && <div className={style.edit} onClick={activateEditMode}>Edit</div>}

                    <h1 className={style.nickName}>{profile.fullName}</h1>

                    <div className={style.status}>
                        <ProfileStatus
                            status={status}
                            updateStatus={updateStatus}/>
                    </div>

                    <div className={style.jobDescription}>
                        <h4>My professional skills:</h4>
                        {profile.lookingForAJobDescription}
                    </div>

                    <div className={style.aboutMe}>
                        <h4>About me:</h4>
                        {profile.aboutMe}
                    </div>


                    <div className={style.contacts}>
                        {Object
                            .keys(profile.contacts).map(key => <Contact name={key} link={profile.contacts[key as keyof contactsType]}/>)}
                    </div>

                </div>}
        </div>

    )
}


export default ProfileInfo