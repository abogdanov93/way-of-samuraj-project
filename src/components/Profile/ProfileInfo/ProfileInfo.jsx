import React from "react";
import style from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
    return (
        <div className={style.profileInfo}>
            <div className={style.avatar}>
                <img src={props.profile.photos.large} />
            </div>
            <h2 className={style.about}>{props.profile.fullName}</h2>
            <h3>{props.profile.lookingForAJobDescription}</h3>
        </div>
    );
}

export default ProfileInfo;