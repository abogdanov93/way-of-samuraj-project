import {AppDispatchType} from "../store"
import {profileAPI} from "../../api/profileAPI"
import {profileSlice} from "../reducers/profileSlice"
import {resultCodeEnum} from "../../api/api"
import {ProfileType} from "../../types/types"

// simple thunk with try catch

export const getProfileThunk = (userId: null | number) => async (dispatch: AppDispatchType) => {
    try {
        const data = await profileAPI.getProfile(userId)
        dispatch(profileSlice.actions.setUserProfile(data))
    } catch (e) {
        console.log(e)
    }
}

export const getStatusThunk = (userId: null | number) => async (dispatch: AppDispatchType) => {
    try {
        const data = await profileAPI.getStatus(userId)
        dispatch(profileSlice.actions.setStatus(data))
    } catch (e) {
        console.log(e)
    }
}

export const updateStatusThunk = (status: string) => async (dispatch: AppDispatchType) => {
    try {
        const data = await profileAPI.updateStatus(status)
        // todo в случае неуспеха updateStatus попаду в catch или нужна проверка?
        // if (data.resultCode === resultCodeEnum.success) {
            dispatch(profileSlice.actions.setStatus(status))
        // }
    } catch (e) {
        console.log(e)
    }
}

export const saveAvatarThunk = (image: File) => async (dispatch: AppDispatchType) => {
    try {
    const data = await profileAPI.savePhoto(image)
    // if (data.resultCode === resultCodeEnum.success) {
        dispatch(profileSlice.actions.setPhoto(data.data.photos))
    // }
    } catch (e) {
        console.log(e)
    }
}

export const saveProfileDataThunk = (profile: ProfileType) => async (dispatch: AppDispatchType, getState: any) => {
    // todo переделать в try catch
    const userId = getState().auth.id
    const data = await profileAPI.saveProfileData(profile)
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(getProfileThunk(userId))
        dispatch(profileSlice.actions.setEditMode(false))
    } else {
        dispatch(profileSlice.actions.setEditMode(true))
    }
}