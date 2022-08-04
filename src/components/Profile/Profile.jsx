import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPost from "./NewPost/NewPost";
import Posts from "./Posts/Posts";

const Profile = (props) => {
    let postElement = props.profilePage.posts
        .map(p => <Posts
            key={p.id}
            id={p.id}
            post={p.post}
            likeCounter={p.likeCounter}/>);

    return (
        <div className={style.profile}>
            <div className={style.boxes}>
                <ProfileInfo
                    profile={props.profilePage.profile}
                    status={props.profilePage.status}
                    updateStatus={props.updateStatus}
                />
            </div>
            <div className={style.boxes}>
                <NewPost
                    profile={props.profilePage.newPostText}
                    addPost={props.addPost}
                    updatePostText={props.updatePostText}/>
            </div>
            <div className={style.boxes}>{postElement}</div>
        </div>
    );
}

export default Profile;