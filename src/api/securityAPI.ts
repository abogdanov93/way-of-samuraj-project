import {instance} from "./api";

type getCaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<getCaptchaResponseType>(`security/get-captcha-url`)
            .then(response => response.data);
    }
}