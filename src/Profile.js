import React from "react";
import style from "./Profile.module.css";

const Profile = () => {
    return (
        <div className={style.Profile}>
            <div className={style.avatar}>
                <img src="https://fortniteskins.net/wp-content/uploads/2021/12/cosmetics/5e605f53c901a7e97b11d2b20ce3dd11-transparent.png"/>
            </div>
            <div className={style.profileInfo}>Aura</div>
        </div>
    );
}

export default Profile;