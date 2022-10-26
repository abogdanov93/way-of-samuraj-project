import {StateType} from "../store"

export const getPosts = (state: StateType) => {
    return state.profilePage.posts
}

export const getProfile = (state: StateType) => {
    return state.profilePage.profile
}

export const getStatus = (state: StateType) => {
    return state.profilePage.status
}

export const getIsEdithMode = (state: StateType) => {
    return state.profilePage.isEditMode
}

export const getUserId = (state: StateType) => {
    return state.auth.userId
}
