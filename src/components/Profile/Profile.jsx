import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPostForm from "./NewPostForm/NewPostForm";
import Posts from "./Posts/Posts";

const Profile = (props) => {
    let postElement = props.profilePage.posts
        .map(p => <Posts
            key={p.id}
            id={p.id}
            post={p.post}
            likeCounter={p.likeCounter}/>);

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

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
                <NewPostForm
                    addPost={props.addPost}
                    onSubmit={addNewPost}
                />
            </div>
            <div className={style.boxes}>{postElement}</div>
        </div>
    );
}

export default Profile;