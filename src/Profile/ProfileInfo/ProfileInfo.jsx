import React from "react";
import style from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div className={style.profileInfo}>
            <div className={style.avatar}>
                <img src="https://fortniteskins.net/wp-content/uploads/2021/12/cosmetics/5e605f53c901a7e97b11d2b20ce3dd11-transparent.png"/>
            </div>
            <div className={style.about}>Dexter_Morgan</div>
        </div>
    );
}

export default ProfileInfo;