import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {usersType} from "../types/types";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE_NUMBER = "users/SET_CURRENT_PAGE_NUMBER";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "users/FOLLOWING_IN_PROGRESS";

type initialStateType = typeof initialState;
let initialState = {
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>// array of users id
}

const usersReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE_NUMBER: {
            return {...state, currentPageNumber: action.currentPageNumber}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type followSuccessActionType = {type: typeof FOLLOW, userId:number}
type unfollowSuccessActionType = {type: typeof UNFOLLOW, userId:number}
type setUsersActionType = {type: typeof SET_USERS, users: Array<usersType>}
type setCurrentPageNumberActionType = {type: typeof SET_CURRENT_PAGE_NUMBER, currentPageNumber:number}
type setTotalUsersCountActionType = {type: typeof SET_TOTAL_USERS_COUNT, totalCount:number}
type toggleIsFetchingActionType = {type: typeof TOGGLE_IS_FETCHING, isFetching:boolean}
type setFollowingInProgressActionType = {type: typeof FOLLOWING_IN_PROGRESS, isInProgress:boolean, userId:number}
type actionsType = followSuccessActionType | unfollowSuccessActionType | setUsersActionType |
    setCurrentPageNumberActionType | setTotalUsersCountActionType | toggleIsFetchingActionType |
    setFollowingInProgressActionType

export const followSuccess = (userId:number): followSuccessActionType => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId:number): unfollowSuccessActionType => ({type: UNFOLLOW, userId});
export const setUsers = (users:Array<usersType>): setUsersActionType => ({type: SET_USERS, users});
export const setCurrentPageNumber = (currentPageNumber:number): setCurrentPageNumberActionType => ({type: SET_CURRENT_PAGE_NUMBER, currentPageNumber});
export const setTotalUsersCount = (totalCount:number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsFetching = (isFetching:boolean): toggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setFollowingInProgress = (isInProgress:boolean, userId:number): setFollowingInProgressActionType => ({type: FOLLOWING_IN_PROGRESS, isInProgress, userId});

export const follow = (userId:number) => {
    return (dispatch:any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId:number) => {
    return (dispatch:any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess);
    }
}

const followUnfollowFlow = async (dispatch:any, userId:number, apiMethod:any, actionCreator:any) => {
    dispatch(setFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(setFollowingInProgress(false, userId));
}

export const requestUsers = (currentPageNumber:number, pageSize:number) => async (dispatch:any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPageNumber(currentPageNumber));
    const data = await usersAPI.getUsersAPI(currentPageNumber, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}


export default usersReducer;