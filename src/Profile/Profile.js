import React from "react";
import style from "./Profile.module.css";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPost from "./NewPost/NewPost";

const Profile = () => {
    return (
        <div>
            <div><ProfileInfo /></div>
            <div><NewPost /></div>
            <div><Posts /></div>
            <div><Posts /></div>
            <div><Posts /></div>
        </div>
    );
}

export default Profile;