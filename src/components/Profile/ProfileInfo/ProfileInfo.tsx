import React, {FC} from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import {ProfileDataForm} from "../ProfileDataForm/ProfileDataForm"
import {useAppSelector} from "../../../hooks/redux"
import {UserAvatar} from "./UserAvatar/UserAvatar"
import {ProfileData} from "./ProfileData/ProfileData"

const ProfileInfo: FC<{ isOwner: boolean }> = ({isOwner}) => {

    const {profile, isEditMode} = useAppSelector(state => state.profilePage)

    if (!profile) {
        return <Preloader/>
    }

    return <div className={style.profileInfo}>
        <UserAvatar isOwner={isOwner} className={style.avatar}/>
        {isEditMode
            ? <div className={style.modal}>
                <div className={style.modalWindow}>
                    <ProfileDataForm/>
                </div>
            </div>
            : <ProfileData isOwner={isOwner} className={style.profileData}/>
        }
    </div>

}

export default ProfileInfo