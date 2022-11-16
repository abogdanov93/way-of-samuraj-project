import {createAsyncThunk} from "@reduxjs/toolkit"
import {friendsAPI} from "../../api/friendsAPI"

/* IMPLEMENTED WITH CREATE ASYNC THUNK FROM REDUX TOOLKIT */

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