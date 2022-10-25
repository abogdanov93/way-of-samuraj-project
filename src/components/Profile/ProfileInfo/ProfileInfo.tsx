import React, {ChangeEvent, FC, useRef, useState} from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import largeAvatar from "../../../uploads/images/userAvatar.jpeg"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import {actions, saveProfilePhoto, updateProfileStatus} from "../../../redux/reducers/profileReducer"
import {useDispatch, useSelector} from "react-redux"
import {getIsEdithMode, getProfile, getStatus} from "../../../redux/selectors/profileSelectors"
import {AnyAction} from "redux"
import {ProfileDataForm} from "../ProfileDataForm/ProfileDataForm"
import {Badge, Button, Upload} from "antd"
import {contactsType} from "../../../types/types"
import {Contact} from "./Contact/Contact"
import {stateType} from "../../../redux/store"
import {CameraOutlined, UploadOutlined} from "@ant-design/icons";
import {SecondaryButton} from "../../common/SecondaryButton/SecondaryButton";
import {PrimaryButton} from "../../common/PrimaryButton/PrimaryButton";
import {useAppSelector} from "../../../hooks/redux";

const ProfileInfo: FC<{ isOwner: boolean }> = ({isOwner}) => {

    const {profile, status, isEditMode} = useAppSelector(state => state.profilePage)
    const inputRef = useRef(null)
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

    const handleSelect = () => {
        // @ts-ignore
        inputRef?.current?.click()
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files?.length && savePhoto(e.target.files[0])
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

                {isOwner &&
                    <div>
                        <input
                            ref={inputRef}
                            type="file"
                            hidden
                            onChange={onPhotoSelected}
                        />
                        <Button className={style.avatarButton}
                            // size="large"
                                shape="circle"
                                onClick={handleSelect}
                                icon={<CameraOutlined/>}/>
                    </div>
                }
            </div>

            {isEditMode
                ? <div className={style.modal}>
                    <div className={style.modalWindow} >
                        <ProfileDataForm/>
                    </div>
                </div>
                : <div className={style.profileData}>

                    <div className={style.edit}>
                        {isOwner && <div onClick={activateEditMode}>Edit</div>}
                    </div>

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
                            .keys(profile.contacts).map(key => <Contact key={key} name={key}
                                                                        link={profile.contacts[key as keyof contactsType]}/>)}
                    </div>

                </div>}
        </div>

    )
}


export default ProfileInfo