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

export const requestFriends = createAsyncThunk(
    "friend/request",
    async (_, thunkAPI) => {
        try {
            return await friendsAPI.getFriendsAPI()
        } catch (e) {
            return thunkAPI.rejectWithValue("Something went wrong, please refresh the page")
        }
    }
)

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        setFriends(state, action: PayloadAction<UsersType[]>) {
            state.friends = action.payload
        }
    },
    extraReducers: {
        [requestFriends.fulfilled.type]: (state, action: PayloadAction<UsersType[]>) => {
            state.isLoading = false
            state.error = ""
            state.friends = action.payload
        },
        [requestFriends.pending.type]: (state) => {
            state.isLoading = true
        },
        [requestFriends.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default friendsSlice.reducer