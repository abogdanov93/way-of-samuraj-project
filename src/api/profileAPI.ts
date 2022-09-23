import {photosType, profileType} from "../types/types"
import {instance, responseType} from "./api"

type photosResponseType = {
    photos: photosType
}

export const profileAPI = {
    getProfile(userId: null | number) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: null | number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<responseType>(`profile/status`, {status: status})
            .then(response => response.data)
    },
    savePhoto(image: any) { // какой тип у image?
        const formData = new FormData()
        formData.append("image", image)

        return instance.put<responseType<photosResponseType>>(`profile/photo`, formData, {
            headers: {"Content-Type": "multipart/from-data"} // отправляем не json файл, нужен content type
        })
            .then(response => response.data)
    },
    saveProfileData(profile: profileType) {
        return instance.put<responseType>(`profile`, profile)
            .then(response => response.data)
    }
}