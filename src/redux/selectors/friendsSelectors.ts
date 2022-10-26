import {StateType} from "../store"

export const getFriends = (state: StateType) => {
    return state.friends.friends
}
