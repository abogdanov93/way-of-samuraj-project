import React from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={style.profileInfo}>

            <div className={style.avatar}>
                <img src={props.profile.photos.large} />
            </div>

            <h1 className={style.nickName}>{props.profile.fullName}</h1>

            <div className={style.status}>
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>

            <div className={style.aboutMe}>{props.profile.aboutMe}</div>

            <div className={style.job}>
                <h4>Are you looking for a job?</h4>
                {props.profile.lookingForAJobDescription}
            </div>

        </div>
    );
}

export default ProfileInfo;