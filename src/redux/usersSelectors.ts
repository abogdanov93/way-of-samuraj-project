import {stateType} from "./reduxStore"

export const getUsers = (state: stateType) => {
    return state.usersPage.users
}

export const getPageSize = (state: stateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: stateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageNumber = (state: stateType) => {
    return state.usersPage.currentPageNumber
}

export const getIsFetching = (state: stateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: stateType) => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: stateType) => {
    return state.usersPage.filter
}