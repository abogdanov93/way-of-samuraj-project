import axios from "axios";
import {photosType, profileType, usersType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d822d21c-724f-4d0e-af57-432203ec8beb"
    }
});

export enum resultCodeEnum {
    success = 0,
    error = 1
}
export enum resultCodeForCaptchaEnum {
    captchaIsRequired = 10
}

type responseType = {
    resultCode: resultCodeEnum
    messages: Array<string>
    data: {}
}
type getUserResponseType = {
    items: Array<usersType>
    totalCount: number
    error: string
}
type savePhotoType = {
    data: photosType
    resultCode: resultCodeEnum
    messages: Array<string>
}
type authResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: resultCodeEnum
    messages: Array<string>
}
type loginResponseType = {
    data: { userId: number }
    resultCode: resultCodeEnum | resultCodeForCaptchaEnum
    messages: Array<string>
}
type getCaptchaResponseType = {
    url: string
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

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<responseType>(`profile/status`, {status: status})
            .then(response => response.data);
    },
    savePhoto(image: any) { // какой тип у image?
        const formData = new FormData();
        formData.append("image", image);

        return instance.put<savePhotoType>(`profile/photo`, formData, {
            headers: {"Content-Type": "multipart/from-data"} // отправляем не json файл, нужен content type
        })
            .then(response => response.data);
    },
    saveProfileData(profile: profileType) {
        return instance.put<responseType>(`profile`, profile)
            .then(response => response.data);
    }
}

export const authAPI = {
    getAuthData() {
        return instance.get<authResponseType>(`auth/me`).then(response => response.data);
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<loginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logOut() {
        return instance.delete<loginResponseType>(`auth/login`)
            .then(response => response.data);
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<getCaptchaResponseType>(`security/get-captcha-url`)
            .then(response => response.data);
    }
}