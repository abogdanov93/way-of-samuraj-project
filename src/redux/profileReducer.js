import React from "react";
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "profile/ADD_POST";
const DELETE_POST = "profile/DELETE_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SET_PHOTO = "profile/SET_PHOTO";
const SET_EDIT_MODE = "profile/SET_EDIT_MODE";

let initialState = {
    posts: [
        {id: 1, post: "Hi there!", likeCounter: 1},
        {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
    ],
    profile: null,
    isEditMode: false,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                post: action.newPostText,
                likeCounter: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
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
            case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos }
            };
        case SET_EDIT_MODE:
            return  {
              ...state,
              isEditMode: action.isEditMode
            };
        default:
            return state;
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatusSuccess = (status) => ({type: SET_STATUS, status});
export const setPhotoSuccess = (photos) => ({type: SET_PHOTO, photos});
export const setEditMode = (isEditMode) => ({type: SET_EDIT_MODE, isEditMode});

export const getUserProfile = (userId) => async (dispatch) => { // помечаем санку как асинхронную функцию
    const response = await profileAPI.getProfile(userId); // присваиваем респонсу результат, которым зарезолвится промис из getProfile
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId); // получить статус с сервера
    dispatch(setStatusSuccess(response.data)); // когда с сервера придет статус, засетать его
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status); // закинуть статус на сервер, получить resultCode
    if (response.data.resultCode === 0) {
        dispatch(setStatusSuccess(status)); // засетать статус
    }
}

export const savePhoto = (image) => async (dispatch) => {
    const response = await profileAPI.savePhoto(image);
    if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos));
    }
}

export const saveProfileData = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId; // получаем весь state, забираем id, который сидит в auth reducer
    const response = await profileAPI.saveProfileData(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId)); // диспатчим другую санку
        dispatch(setEditMode(false));
    } else {
        dispatch(stopSubmit(
            "editProfileData",
            {'_error': response.data.messages[0]}
        ));
        dispatch(setEditMode(true));
    }
}

export default profileReducer;