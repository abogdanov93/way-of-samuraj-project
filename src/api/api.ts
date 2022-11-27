import axios from "axios"

export enum resultCodeEnum {
    success = 0,
    error = 1
}

export enum resultCodeForCaptchaEnum {
    captchaIsRequired = 10
}

export type ResponseType<D = {}, RC = resultCodeEnum> = { // по умолчанию data пустой объект, result code без капчи
    data: D
    resultCode: RC
    messages: Array<string>
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "500e2514-c695-497e-a17f-f0dc1e7695b5"
    }
})