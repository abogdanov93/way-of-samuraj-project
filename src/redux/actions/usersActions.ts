import {usersAPI} from "../../api/usersAPI"
import {FilterType, usersSlice} from "../reducers/usersSlice"
import {createAsyncThunk} from "@reduxjs/toolkit"

export const fetchUsers = createAsyncThunk (
    "users/fetchUsers",
    async (arg, thunkAPI) => {
        // try {
        //     thunkAPI.dispatch(usersSlice.actions.setCurrentPageNumber(arg.currentPageNumber))
        //     thunkAPI.dispatch(usersSlice.actions.setFilter(arg.filter))
        //     const data = await usersAPI.getUsersAPI(arg.currentPageNumber, arg.pageSize, arg.filter.term, arg.filter.friend)
        //     thunkAPI.dispatch(usersSlice.setUsers(data.items))
        //     thunkAPI.dispatch(usersSlice.actions.setTotalUsersCount(data.totalCount))
        // } catch (e) {
        //     return thunkAPI.rejectWithValue("Error")
        // }
    }
)

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