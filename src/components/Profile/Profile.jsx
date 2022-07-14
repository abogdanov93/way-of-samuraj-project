import React from "react";
import style from "./Profile.module.css";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import NewPost from "./NewPost/NewPost";

const Profile = (props) => {
    let friend = props.friends[0];
    let postElement = props.profile.posts
        .map(p => <Posts avatar={friend.avatar} id={p.id} post={p.post} likeCounter={p.likeCounter}/>)

    return (
        <div>
            <div className={style.boxes}><ProfileInfo/></div>
            <div className={style.boxes}>
                <div>
                    <NewPost
                        newPostText={props.profile.newPostText}
                        addPost={props.addPost}
                        updatePostText={props.updatePostText}/>
                </div>
                <div>{postElement}</div>
            </div>
        </div>
    )
        ;
}

export default Profile;