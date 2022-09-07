import {profileAPI, resultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postsType, profileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {inferActionsType, stateType} from "./reduxStore";

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
        case "PROFILE_ADD_POST":
            let newPost = {
                id: 3,
                post: action.newPostText,
                likeCounter: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts],
            };
        case "PROFILE_DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        case "PROFILE_SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            };
        case "PROFILE_SET_STATUS":
            return {
                ...state,
                status: action.status
            };
        case "PROFILE_SET_PHOTO":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            };
        case "PROFILE_SET_EDIT_MODE":
            return {
                ...state,
                isEditMode: action.isEditMode
            };
        default:
            return state;
    }
}

type actionsType = inferActionsType<typeof actions>;

const actions = {
    addPost: (newPostText: string) => ({type: "PROFILE_ADD_POST", newPostText} as const),
    deletePost: (postId: number) => ({type: "PROFILE_DELETE_POST", postId} as const),
    setUserProfile: (profile: profileType) => ({type: "PROFILE_SET_USER_PROFILE", profile} as const),
    setStatusSuccess: (status: string) => ({type: "PROFILE_SET_STATUS", status} as const),
    setPhotoSuccess: (photos: photosType) => ({type: "PROFILE_SET_PHOTO", photos} as const),
    setEditMode: (isEditMode: boolean) => ({type: "PROFILE_SET_EDIT_MODE", isEditMode} as const)
}

type thunkType = ThunkAction<void, stateType, unknown, actionsType>

export const getUserProfile = (userId: number): thunkType => async (dispatch) => { // помечаем санку как асинхронную функцию
    const data = await profileAPI.getProfile(userId); // присваиваем респонсу результат, которым зарезолвится промис из getProfile
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): thunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId); // получить статус с сервера
    dispatch(actions.setStatusSuccess(data)); // когда с сервера придет статус, засетать его
}

export const updateStatus = (status: string): thunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status); // закинуть статус на сервер, получить resultCode
        if (data.resultCode === resultCodeEnum.success) {
            dispatch(actions.setStatusSuccess(status)); // засетать статус
        }
    } catch (error) {
        alert(error); // какой тип у error? откуда берется?
    }
}

export const savePhoto = (image: any): thunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(image);
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(actions.setPhotoSuccess(data.data));
    }
}

export const saveProfileData = (profile: profileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId; // получаем весь state, забираем id, который сидит в auth reducer
    const data = await profileAPI.saveProfileData(profile);
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(getUserProfile(userId)); // диспатчим другую санку
        dispatch(actions.setEditMode(false));
    } else {
        dispatch(stopSubmit(
            "editProfileData",
            {'_error': data.messages[0]}
        ));
        dispatch(actions.setEditMode(true));
    }
} // не понимаю, как типизировать

export default profileReducer;