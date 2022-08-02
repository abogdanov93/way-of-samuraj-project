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
            .then(response => response.data); // цепочка промисов, цепочка then // return response --> return data
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data);
    },
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    }
}

export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`);
    }
}