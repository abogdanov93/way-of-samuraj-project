import {usersAPI} from "../../api/usersAPI"
import {FilterType, usersSlice} from "../reducers/usersSlice"
import {createAsyncThunk} from "@reduxjs/toolkit"

export const fetchUsers = createAsyncThunk (
    "users/fetchUsers",
    async (_, thunkAPI) => {
        try {
            // dispatch(usersSlice.actions.setCurrentPageNumber(currentPageNumber))
            // dispatch(usersSlice.actions.setFilter(filter))
            // const data = await usersAPI.getUsersAPI(currentPageNumber, pageSize, filter.term, filter.friend)
            // dispatch(usersSlice.actions.setUsers(data.items))
            // dispatch(usersSlice.actions.setTotalUsersCount(data.totalCount))
        } catch (e) {
            return thunkAPI.rejectWithValue("Error")
        }
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