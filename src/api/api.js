import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d822d21c-724f-4d0e-af57-432203ec8beb"
    }
});

export const usersAPI = {
    getUsers(currentPageNumber, pageSize) {
        return instance.get(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data) // цепочка промисов, цепочка then // return response --> return data
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}