import {usersType} from "../types/types"
import {instance} from "./api"

type getUserResponseType = Array<usersType>

export const friendsAPI = {
    getFriendsAPI() {
        return instance.get<getUserResponseType>(`users?friend=${true}`)
            .then(response => response.data)
    }
}