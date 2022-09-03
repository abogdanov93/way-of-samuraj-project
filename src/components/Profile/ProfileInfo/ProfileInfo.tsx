import React, {ChangeEvent, FC} from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import largeAvatar from "./../../../images/userAvatar.jpeg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileDataFormHOC from "../ProfileDataForm/ProfileDataForm";
import ProfileData from "../ProfileData/ProfileData";
import {profileType} from "../../../types/types";

type propsType = {
    profile: profileType
    saveProfileData: (formData: any) => void
    savePhoto: (file: any) => void
    isOwner: boolean
    status: string
    updateStatus: () => void
    isEditMode: boolean
    setEditMode: () => void
}

const ProfileInfo: FC<propsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.saveProfileData(formData);
    }

    if (!props.profile) {
        return <Preloader/>
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        e.target.files.length && props.savePhoto(e.target.files[0]);
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
                                          profile={props.profile}
                                          initialValues={props.profile}/> // синхронизируем данные локального стейта и форм стейта, передаем инициализационные данные
                    : <ProfileData profile={props.profile}
                                   isOwner={props.isOwner}
                                   setEditMode={props.setEditMode}/>}
            </div>

        </div>
    );
}


export default ProfileInfo;