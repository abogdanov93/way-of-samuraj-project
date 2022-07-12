import React from "react";
import style from "./Profile.module.css";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPost from "./NewPost/NewPost";

const Profile = () => {

    let posts = [
        {id: 1, post: "Hi there!", likeCounter: 1},
        {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
    ]

    let postElement = posts
        .map(p => <Posts id={p.id} post={p.post} likeCounter={p.likeCounter}/>)

    return (
        <div className={style.profile}>
            <div><ProfileInfo/></div>
            <div><NewPost/></div>
            <div>{postElement}</div>
        </div>
    );
}

export default Profile;