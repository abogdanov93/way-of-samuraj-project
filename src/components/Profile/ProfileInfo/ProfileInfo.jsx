import React from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import largeAvatar from "./../../../images/user3.jpeg";
import ProfileStatusWithHook from "../ProfileStatus/ProfileStatusWithHook";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={style.profileInfo}>

            <div className={style.avatar}>
                {props.profile.photos.large
                ? <img src={props.profile.photos.large} />
                : <img src={largeAvatar}/>}
            </div>

            <h1 className={style.nickName}>{props.profile.fullName}</h1>

            <div className={style.status}>
                <ProfileStatusWithHook
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