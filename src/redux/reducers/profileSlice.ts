import {PhotosType, PostType, ProfileType} from "../../types/types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type initialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null
    isEditMode: boolean
    status: string
}

const initialState: initialStateType = {
    posts: [
        {id: 1, post: "Are you going to play fortnite?"},
        {id: 2, post: "Hi there!"}
    ],
    profile: null,
    isEditMode: false,
    status: ""
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<string>) {
            const newPost = {
                id: Math.random(),
                post: action.payload
            }
            state.posts.unshift(newPost)
        },
        deletePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter(p => p.id !== action.payload)
        },
        setUserProfile(state, action: PayloadAction<ProfileType>) {
            state.profile = action.payload
        },
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload
        },
        setPhoto(state, action: PayloadAction<PhotosType>) {
            // @ts-ignore
            state.profile.photos = action.payload
        },
        setEditMode(state, action: PayloadAction<boolean>) {
            state.isEditMode = action.payload
        }
    }
})


export default profileSlice.reducer