import {UsersType} from "../types/types"
import {instance, ResponseType} from "./api"

type getUserResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsersAPI(currentPageNumber = 1, pageSize = 5, term = "", friend: null | boolean = null) {
        return instance.get<getUserResponseType>(`users?page=${currentPageNumber}&count=${pageSize}&term=${term}`
            + (friend === null ? "" : `&friend=${friend}`))
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}