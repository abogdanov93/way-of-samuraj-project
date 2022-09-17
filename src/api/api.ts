import axios from "axios"

export enum resultCodeEnum {
    success = 0,
    error = 1
}
export enum resultCodeForCaptchaEnum {
    captchaIsRequired = 10
}
export type responseType<D = {}, RC = resultCodeEnum> = { // по умолчанию data пустой объект, result code без капчи
    data: D
    resultCode: RC
    messages: Array<string>
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d822d21c-724f-4d0e-af57-432203ec8beb"
    }
})