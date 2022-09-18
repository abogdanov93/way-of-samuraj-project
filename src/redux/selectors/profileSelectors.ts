import {stateType} from "../reduxStore"

export const getPosts = (state: stateType) => {
    return state.profilePage.posts
}
