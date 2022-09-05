import {profileAPI, resultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postsType, profileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {stateType} from "./reduxStore";

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

type thunkType = ThunkAction<void, stateType, unknown, actionsType>

export const getUserProfile = (userId: number): thunkType => async (dispatch) => { // помечаем санку как асинхронную функцию
    const data = await profileAPI.getProfile(userId); // присваиваем респонсу результат, которым зарезолвится промис из getProfile
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number): thunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId); // получить статус с сервера
    dispatch(setStatusSuccess(data)); // когда с сервера придет статус, засетать его
}

export const updateStatus = (status: string): thunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status); // закинуть статус на сервер, получить resultCode
        if (data.resultCode === resultCodeEnum.success) {
            dispatch(setStatusSuccess(status)); // засетать статус
        }
    } catch (error) {
        alert(error); // какой тип у error? откуда берется?
    }
}

export const savePhoto = (image: any): thunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(image);
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(setPhotoSuccess(data.data));
    }
}

export const saveProfileData = (profile: profileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId; // получаем весь state, забираем id, который сидит в auth reducer
    const data = await profileAPI.saveProfileData(profile);
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(getUserProfile(userId)); // диспатчим другую санку
        dispatch(setEditMode(false));
    } else {
        dispatch(stopSubmit(
            "editProfileData",
            {'_error': data.messages[0]}
        ));
        dispatch(setEditMode(true));
    }
} // не понимаю, как типизировать

export default profileReducer;