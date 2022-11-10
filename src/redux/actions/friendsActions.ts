import {createAsyncThunk} from "@reduxjs/toolkit"
import {friendsAPI} from "../../api/friendsAPI"

// RTK with createAsyncThunk
// allows to catch fulfilled, pending and rejected cases in slice

export const fetchFriendsThunk = createAsyncThunk(
    "friend/request",
    async (_, thunkAPI) => {
        try {
            return await friendsAPI.getFriendsAPI()
        } catch (e) {
            return thunkAPI.rejectWithValue("Something went wrong, please refresh the page")
        }
    }
)