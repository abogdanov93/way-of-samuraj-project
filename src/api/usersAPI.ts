import {usersType} from "../types/types";
import {instance, responseType} from "./api";

type getUserResponseType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsersAPI(currentPageNumber = 1, pageSize = 5) {
        return instance.get<getUserResponseType>(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data); // цепочка промисов, цепочка then // return response --> return data
    },
    followUser(userId: number) {
        return instance.post<responseType>(`follow/${userId}`)
            .then(response => response.data);
    },
    unfollowUser(userId: number) {
        return instance.delete<responseType>(`follow/${userId}`)
            .then(response => response.data);
    }
}