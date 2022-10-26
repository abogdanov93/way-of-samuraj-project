import {UsersType} from "../types/types"
import {instance} from "./api"

type GetFriendsResponseType = {
    items: Array<UsersType>
}

export const friendsAPI = {
    getFriendsAPI() {
        return instance.get<GetFriendsResponseType>(`users?friend=${true}`)
            .then(response => response.data.items)
    }
}