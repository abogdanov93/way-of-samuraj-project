import {createSlice} from "@reduxjs/toolkit"
import {usersType} from "../../types/types"
import {friendsAPI} from "../../api/friendsAPI"
import {baseActionType, baseThunkType} from "../store";

type actionsType = baseActionType<typeof friendsSlice.actions>
type thunkType = baseThunkType<actionsType>

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: [] as Array<usersType>
    },
    reducers: {
        setFriends(state, action){
            state.friends = action.payload.items
        }
    }
})

export const requestFriends = (): thunkType =>
    async (dispatch) => {
        const data = await friendsAPI.getFriendsAPI()
        dispatch(friendsSlice.actions.setFriends(data))
    }

export default friendsSlice.reducer