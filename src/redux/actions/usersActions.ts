import {usersAPI} from "../../api/usersAPI"
import {FilterType, usersSlice} from "../reducers/usersSlice"
import {AppDispatchType} from "../store"
import {resultCodeEnum} from "../../api/api"
import {friendsSlice} from "../reducers/friendsSlice";
import {fetchFriendsThunk} from "./friendsActions";

export const fetchUsers = (currentPageNumber: number, pageSize: number, filter: FilterType) =>
    async (dispatch: AppDispatchType) => {
    try {
        dispatch(usersSlice.actions.toggleIsFetching(true))
        dispatch(usersSlice.actions.setCurrentPageNumber(currentPageNumber))
        dispatch(usersSlice.actions.setFilter(filter))
        const data = await usersAPI.getUsersAPI(currentPageNumber, pageSize, filter.term, filter.friend)
        dispatch(usersSlice.actions.toggleIsFetching(false))
        dispatch(usersSlice.actions.setUsers(data.items))
        dispatch(usersSlice.actions.setTotalUsersCount(data.totalCount))
    } catch (e) {
        console.log(e)
    }

}

export const followUser = (userId: number) => {
    return async (dispatch: AppDispatchType) => {
        dispatch(usersSlice.actions.setFollowingInProgress({isInProgress: true, userId}))
        const data = await usersAPI.followUser(userId)
        if (data.resultCode === resultCodeEnum.success) {
            dispatch(usersSlice.actions.followUser(userId))
        }
        dispatch(usersSlice.actions.setFollowingInProgress({isInProgress: false, userId}))
        dispatch(fetchFriendsThunk())
    }
}

export const unfollowUser = (userId: number) => {
    return async (dispatch: AppDispatchType) => {
        dispatch(usersSlice.actions.setFollowingInProgress({isInProgress: true, userId}))
        const data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === resultCodeEnum.success) {
            dispatch(usersSlice.actions.unfollowUser(userId))
        }
        dispatch(usersSlice.actions.setFollowingInProgress({isInProgress: false, userId}))
        dispatch(fetchFriendsThunk())
    }
}

// type ArgType = {
//     currentPageNumber: number
//     filter: FilterType
//     pageSize: number
// }

// export const fetchUsers = createAsyncThunk (
//     "users/fetchUsers",
//     async (arg: ArgType, thunkAPI) => {
//         try {
//             thunkAPI.dispatch(usersSlice.actions.setCurrentPageNumber(arg.currentPageNumber))
//             thunkAPI.dispatch(usersSlice.actions.setFilter(arg.filter))
//             const data = await usersAPI.getUsersAPI(arg.currentPageNumber, arg.pageSize, arg.filter.term, arg.filter.friend)
//             thunkAPI.dispatch(usersSlice.setUsers(data.items))
//             thunkAPI.dispatch(usersSlice.actions.setTotalUsersCount(data.totalCount))
//             return data
//         } catch (e) {
//             return thunkAPI.rejectWithValue("Error")
//         }
//     }
// )

// export const fetchUsers = createAsyncThunk(
//     "user/fetchAll",
//     async (_, thunkAPI) => {
//         try {
//             const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
//             return response.data;
//         } catch (e: any) {
//             return thunkAPI.rejectWithValue("Error");
//         }
//     }
// )
//
// (currentPageNumber: number, pageSize: number, filter: FilterType)