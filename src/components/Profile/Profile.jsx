import React from "react";
import style from "./Profile.module.css";
import commonStyles from "./../../App.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPostForm from "./NewPostForm/NewPostForm";
import Posts from "./Posts/Posts";

const Profile = (props) => {
    let postElement = props.profilePage.posts
        .map(p => <Posts
            key={p.id}
            id={p.id}
            post={p.post}
            likeCounter={p.likeCounter}
            // deletePost={props.deletePost}
        />);

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={style.profile}>
            <div className={commonStyles.whiteBlock}>
                <ProfileInfo
                    profile={props.profilePage.profile}
                    status={props.profilePage.status}
                    updateStatus={props.updateStatus}
                />
            </div>
            <div className={commonStyles.whiteBlock}>
                <NewPostForm
                    addPost={props.addPost}
                    onSubmit={addNewPost}
                />
            </div>
            <div className={commonStyles.whiteBlock}>{postElement}</div>
        </div>
    );
}

export default Profile;