import {instance, ResponseType, resultCodeEnum, resultCodeForCaptchaEnum} from "./api";

export type AuthDataType = {
    id: number
    email: string
    login: string
}
type loginDataType = {
    userId: number
}

export const authAPI = {
    getAuthData() {
        return instance.get<ResponseType<AuthDataType>>(`auth/me`).then(response => response.data);
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<loginDataType, resultCodeEnum | resultCodeForCaptchaEnum>>
        (`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logOut() {
        return instance.delete<ResponseType<loginDataType>>(`auth/login`)
            .then(response => response.data);
    }
}