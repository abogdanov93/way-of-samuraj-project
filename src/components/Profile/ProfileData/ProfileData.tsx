import style from "../ProfileInfo/ProfileInfo.module.css";
import React, {FC} from "react";
import {profileType} from "../../../types/types";
import Contact from "./Contact";

type propsType = {
    profile: profileType
    isOwner: boolean
    setEditMode: (mode: boolean) => void
}

const ProfileData: FC<propsType> = ({profile, isOwner, setEditMode}) => {
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
                .map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>)} //restriction // extends string
        </div>
    </div>
}

export default ProfileData;