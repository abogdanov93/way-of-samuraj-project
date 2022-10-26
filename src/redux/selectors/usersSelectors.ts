import {StateType} from "../store"

export const getUsers = (state: StateType) => {
    return state.usersPage.users
}

export const getPageSize = (state: StateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: StateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageNumber = (state: StateType) => {
    return state.usersPage.currentPageNumber
}

export const getIsFetching = (state: StateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: StateType) => {
    return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: StateType) => {
    return state.usersPage.filter
}