import {StateType} from "../store"

export const getUsers = (state: StateType) => {
    return state.users.users
}

export const getPageSize = (state: StateType) => {
    return state.users.pageSize
}

export const getTotalUsersCount = (state: StateType) => {
    return state.users.totalUsersCount
}

export const getCurrentPageNumber = (state: StateType) => {
    return state.users.currentPageNumber
}

export const getIsFetching = (state: StateType) => {
    return state.users.isFetching
}

export const getFollowingInProgress = (state: StateType) => {
    return state.users.followingInProgress
}

export const getUsersFilter = (state: StateType) => {
    return state.users.filter
}