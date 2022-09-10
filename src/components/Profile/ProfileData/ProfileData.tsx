import style from "../ProfileInfo/ProfileInfo.module.css"
import React, {FC} from "react"
import {contactsType, profileType} from "../../../types/types"
import Contact from "./Contact"
import {baseActionType} from "../../../redux/reduxStore";
import {actions} from "../../../redux/profileReducer";

type propsType = {
    profile: profileType
    isOwner: boolean
    setEditMode: (mode: boolean) => baseActionType<typeof actions>
}

const ProfileData: FC<propsType> = ({profile, isOwner, setEditMode}) => {
    const activateEditMode = () => setEditMode(true)
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
                .map(key => <Contact
                    key={key}
                    contactTitle={key}
                    contactValue={profile.contacts[key as keyof contactsType]}
                />)}
        </div>
    </div>
}

export default ProfileData