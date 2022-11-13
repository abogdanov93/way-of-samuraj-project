import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {UsersType} from "../../types/types"
import {fetchFriendsThunk} from "../actions/friendsActions"

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

export const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchFriendsThunk.fulfilled.type]: (state, action: PayloadAction<UsersType[]>) => {
            state.isLoading = false
            state.error = ""
            state.friends = action.payload
        },
        [fetchFriendsThunk.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchFriendsThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default friendsSlice.reducer