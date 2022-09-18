import {usersType} from "../types/types"
import {instance, responseType} from "./api"

type getUserResponseType = {
    items: Array<usersType>
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
        return instance.post<responseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<responseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}