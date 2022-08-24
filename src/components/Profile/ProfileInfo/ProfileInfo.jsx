import React, {useState} from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import largeAvatar from "./../../../images/userAvatar.jpeg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileDataFormHOC from "../ProfileDataForm/ProfileDataForm";

const ProfileInfo = (props) => {
    const onSubmit = (formData) => {
        props.saveProfileData(formData);
    }

    if (!props.profile) {
        return <Preloader/>
    }

    const onPhotoSelected = (e) => {
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
                    updateStatus={props.updateStatus}
                />
            </div>

            {props.isEditMode
                ? <ProfileDataFormHOC onSubmit={onSubmit}
                                      profile={props.profile}
                                      initialValues={props.profile}/> // синхронизируем данные локального стейта и форм стейта, передаем инициализационные данные
                : <ProfileData profile={props.profile}
                               isOwner={props.isOwner}
                               setEditMode={props.setEditMode}/>}

        </div>
    );
}

const ProfileData = ({profile, isOwner, setEditMode}) => {
    const activateEditMode = () => setEditMode(true);
    return <div>
        <h1 className={style.nickName}>{profile.fullName}</h1>

        {isOwner && <button onClick={activateEditMode}>Edit</button>}

        <div className={style.lookingForAJob}>
            Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}
        </div>

        {profile.lookingForAJob && <div className={style.jobDescription}>
            My professional skills: {profile.lookingForAJobDescription}
        </div>}

        <div className={style.aboutMe}>
            About me: {profile.aboutMe}
        </div>

        <div className={style.contacts}>
            {Object
                .keys(profile.contacts)
                .map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>)}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div>
        {contactTitle}: {contactValue}
    </div>
}

export default ProfileInfo;