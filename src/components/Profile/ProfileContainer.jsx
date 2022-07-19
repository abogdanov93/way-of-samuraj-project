import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {addPostActionCreator, updatePostTextActionCreator} from "../../redux/profileReducer";

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updatePostText: (text) => {
            dispatch(updatePostTextActionCreator(text));
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;