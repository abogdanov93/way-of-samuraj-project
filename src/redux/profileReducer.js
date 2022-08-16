import React from "react";
import {profileAPI} from "../api/api";

const ADD_POST = "profile/ADD_POST";
// const DELETE_POST = "profile/DELETE_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";

let initialState = {
    posts: [
        {id: 1, post: "Hi there!", likeCounter: 1},
        {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                post: action.newPostText,
                likeCounter: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts],
            };
        // case DELETE_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.filter(p => p.id !== action.postId)
        //     };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
// export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        });
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId) // получить статус с сервера
        .then(response => {
            dispatch(setStatus(response.data)); // когда с сервера придет статус, засетать его
        });
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status) // закинуть статус на сервер, получить resultCode
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status)); // засетать статус
            }
        })
}

export default profileReducer;