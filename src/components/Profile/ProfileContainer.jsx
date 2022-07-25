import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {addPost, updatePostText} from "../../redux/profileReducer";

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const ProfileContainer = connect(mapStateToProps, {addPost, updatePostText})(Profile);

export default ProfileContainer;