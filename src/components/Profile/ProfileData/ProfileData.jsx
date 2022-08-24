import style from "../ProfileInfo/ProfileInfo.module.css";
import React from "react";

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

export default ProfileData;