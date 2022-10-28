import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {UsersType} from "../../types/types"
import {friendsAPI} from "../../api/friendsAPI"

type initialStateType = {
    friends: Array<UsersType>
    isLoading: boolean
    error: string
}

const initialState: initialStateType = {
    friends: [],
    isLoading: false,
    error: ""
}

export const fetchFriends = createAsyncThunk(
    "friend/request",
    async (_, thunkAPI) => {
        try {
            const response = await friendsAPI.getFriendsAPI()
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue("Something went wrong, please refresh the page")
        }
    }
)

export const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchFriends.fulfilled.type]: (state, action: PayloadAction<UsersType[]>) => {
            state.isLoading = false
            state.error = ""
            state.friends = action.payload
        },
        [fetchFriends.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchFriends.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default friendsSlice.reducer