import React from "react";
import style from "./Profile.module.css";
import commonStyles from "./../../App.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPostForm from "./NewPostForm/NewPostForm";
import Posts from "./Posts/Posts";

const Profile = ({profilePage, addPost, deletePost, updateStatus, isOwner, savePhoto}) => {
    let postElement = profilePage.posts
        .map(p => <Posts
            key={p.id}
            id={p.id}
            post={p.post}
            likeCounter={p.likeCounter}
            deletePost={deletePost}
        />);

    let addNewPost = (values) => {
        addPost(values.newPostText);
    }

    return (
        <div className={style.profile}>
            <div className={commonStyles.whiteBlock}>
                <ProfileInfo
                    profile={profilePage.profile}
                    status={profilePage.status}
                    updateStatus={updateStatus}
                    isOwner={isOwner}
                    savePhoto={savePhoto}
                />
            </div>
            <div className={commonStyles.whiteBlock}>
                <NewPostForm
                    addPost={addPost}
                    onSubmit={addNewPost}
                />
            </div>
            <div className={commonStyles.whiteBlock}>{postElement}</div>
        </div>
    );
}

export default Profile;