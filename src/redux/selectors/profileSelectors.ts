import {stateType} from "../reduxStore"

export const getPosts = (state: stateType) => {
    return state.profilePage.posts
}

export const getProfile = (state: stateType) => {
    return state.profilePage.profile
}

export const getStatus = (state: stateType) => {
    return state.profilePage.status
}

export const getIsEdithMode = (state: stateType) => {
    return state.profilePage.isEditMode
}
