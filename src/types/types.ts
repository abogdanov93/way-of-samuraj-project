export type PostsType = {
    id: number
    post: string
    likeCounter: number
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId?: null | number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
    photos: PhotosType
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type UsersType = {
    id: number
    name: string
    status?: string | null
    photos: PhotosType
    followed?: boolean
}

export type DialogType = {
    id: number
    name: string
}

export type MessagesType = {
    id: number,
    message: string
}