import React, {useState} from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import largeAvatar from "./../../../images/userAvatar.jpeg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileDataFormHOC from "../ProfileDataForm/ProfileDataForm";

const ProfileInfo = (props) => {
    const [edithMode, setEdithMode] = useState(false);
    const activateEdithMode = () => setEdithMode(true);
    const onSubmit = (formData) => {
        props.saveProfileData(formData).then(() => {
            setEdithMode(false);
        });
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

            {edithMode
                ? <ProfileDataFormHOC onSubmit={onSubmit}
                                      profile={props.profile}
                                      initialValues={props.profile}/> // синхронизируем данные локального стейта и форм стейта, передаем инициализационные данные
                : <ProfileData profile={props.profile}
                               isOwner={props.isOwner}
                               activateEdithMode={activateEdithMode}/>}

        </div>
    );
}

const ProfileData = ({profile, isOwner, activateEdithMode}) => {

    return <div>
        <h1 className={style.nickName}>{profile.fullName}</h1>

        {isOwner && <button onClick={activateEdithMode}>Edith</button>}

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