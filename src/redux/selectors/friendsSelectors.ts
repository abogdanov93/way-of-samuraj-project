import {stateType} from "../store"

export const getFriends = (state: stateType) => {
    return state.friends.friends
}
