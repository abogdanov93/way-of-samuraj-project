import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postsType, profileType} from "../types/types";

const ADD_POST = "profile/ADD_POST";
const DELETE_POST = "profile/DELETE_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SET_PHOTO = "profile/SET_PHOTO";
const SET_EDIT_MODE = "profile/SET_EDIT_MODE";


type initialStateType = typeof initialState;
let initialState = {
    posts: [
        {id: 1, post: "Hi there!", likeCounter: 1},
        {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
    ] as Array<postsType>,
    profile: null as profileType | null,
    isEditMode: false,
    status: ""
}

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
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
                profile: {...state.profile, photos: action.photos } as profileType
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

type addPostActionType = {type: typeof ADD_POST, newPostText:string}
type deletePostActionType = {type: typeof DELETE_POST, postId:number}
type setUserProfileActionType = {type: typeof SET_USER_PROFILE, profile:profileType}
type setStatusSuccessActionType = {type: typeof SET_STATUS, status:string}
type setPhotoSuccessActionType = {type: typeof SET_PHOTO, photos:photosType}
type setEditModeActionType = {type: typeof SET_EDIT_MODE, isEditMode:boolean}
type actionsType = addPostActionType | deletePostActionType | setUserProfileActionType |
    setStatusSuccessActionType | setPhotoSuccessActionType | setEditModeActionType

export const addPost = (newPostText: string): addPostActionType => ({type: ADD_POST, newPostText});
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId});
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setStatusSuccess = (status: string): setStatusSuccessActionType => ({type: SET_STATUS, status});
export const setPhotoSuccess = (photos: photosType): setPhotoSuccessActionType => ({type: SET_PHOTO, photos});
export const setEditMode = (isEditMode: boolean): setEditModeActionType => ({type: SET_EDIT_MODE, isEditMode});

export const getUserProfile = (userId:number) => async (dispatch:any) => { // помечаем санку как асинхронную функцию
    const response = await profileAPI.getProfile(userId); // присваиваем респонсу результат, которым зарезолвится промис из getProfile
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    const response = await profileAPI.getStatus(userId); // получить статус с сервера
    dispatch(setStatusSuccess(response.data)); // когда с сервера придет статус, засетать его
}

export const updateStatus = (status:string) => async (dispatch:any) => {
    try {
        const response = await profileAPI.updateStatus(status); // закинуть статус на сервер, получить resultCode
        if (response.data.resultCode === 0) {
            dispatch(setStatusSuccess(status)); // засетать статус
        }
    } catch (error) {
        alert(error);
    }
}

export const savePhoto = (image:any) => async (dispatch:any) => {
    const response = await profileAPI.savePhoto(image);
    if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos));
    }
}

export const saveProfileData = (profile:any) => async (dispatch:any, getState:any) => {
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