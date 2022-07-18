import React from "react";
import style from "./Profile.module.css";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPostContainer from "./NewPost/NewPostContainer";

const Profile = (props) => {

    let profile = props.store.getState().profile;
    let friend = profile.friends[0];

    let postElement = profile.posts
        .map(p => <Posts avatar={friend.avatar} id={p.id} post={p.post} likeCounter={p.likeCounter}/>)

    return (
        <div className={style.profile}>
            <div className={style.boxes}><ProfileInfo/></div>
            <div className={style.boxes}>
                <NewPostContainer store={props.store}/>
            </div>
            <div className={style.boxes}>{postElement}</div>
        </div>
    )
        ;
}

export default Profile;