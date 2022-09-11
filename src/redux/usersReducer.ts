import {updateObjectInArray} from "../utils/objectHelpers"
import {usersType} from "../types/types"
import {Dispatch} from "redux"
import {baseActionType, baseThunkType} from "./reduxStore"
import {usersAPI} from "../api/usersAPI"
import {resultCodeEnum} from "../api/api"

type initialStateType = typeof initialState
type actionsType = baseActionType<typeof actions>
type thunkType = baseThunkType<actionsType>

let initialState = {
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
}

const usersReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case "USER_FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case "USER_UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case "USER_SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "USER_SET_CURRENT_PAGE_NUMBER": {
            return {...state, currentPageNumber: action.currentPageNumber}
        }
        case "USER_SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.totalCount}
        }
        case "USER_TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "USER_FOLLOWING_IN_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

const actions = {
    followSuccess: (userId: number) => ({type: "USER_FOLLOW", userId} as const),
    unfollowSuccess: (userId: number) => ({type: "USER_UNFOLLOW", userId} as const),
    setUsers: (users: Array<usersType>) => ({type: "USER_SET_USERS", users} as const),
    setCurrentPageNumber: (currentPageNumber: number) => ({
        type: "USER_SET_CURRENT_PAGE_NUMBER",
        currentPageNumber
    } as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: "USER_SET_TOTAL_USERS_COUNT",
        totalCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: "USER_TOGGLE_IS_FETCHING",
        isFetching
    } as const),
    setFollowingInProgress: (isInProgress: boolean, userId: number) => ({
        type: "USER_FOLLOWING_IN_PROGRESS",
        isInProgress,
        userId
    } as const)
}

export const requestUsers = (currentPageNumber: number, pageSize: number): thunkType =>
    async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPageNumber(currentPageNumber))
        const data = await usersAPI.getUsersAPI(currentPageNumber, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }

export const follow = (userId: number): thunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): thunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess)
    }
}

const followUnfollowFlow =
    async (dispatch: Dispatch<actionsType>, userId: number, apiMethod: any, actionCreator: (userId: number) =>
        actionsType) => {
        dispatch(actions.setFollowingInProgress(true, userId))
        let data = await apiMethod(userId)
        if (data.resultCode === resultCodeEnum.success) {
            dispatch(actionCreator(userId))
        }
        dispatch(actions.setFollowingInProgress(false, userId))
    }

export default usersReducer