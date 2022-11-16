import {PhotosType, ProfileType} from "../types/types"
import {instance, ResponseType} from "./api"

type PhotosResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: null | number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: null | number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status})
            .then(response => response.data)
    },
    savePhoto(image: File) {
        const formData = new FormData()
        formData.append("image", image)

        return instance.put<ResponseType<PhotosResponseType>>(`profile/photo`, formData, {
            headers: {"Content-Type": "multipart/from-data"} // отправляем не json файл, нужен content type
        })
            .then(response => response.data)
    },
    saveProfileData(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
            .then(response => response.data)
    }
}