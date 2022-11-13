import {createSlice} from "@reduxjs/toolkit"
import {AppDispatchType} from "../store"
import {getAuthUserData} from "../actions/authActions"

type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        initializationSuccess(state) {
            state.initialized = true
        }
    }
})

export const initializeApp = () => async (dispatch: AppDispatchType) => {
    try {
        await dispatch(getAuthUserData())
        dispatch(appSlice.actions.initializationSuccess())
    } catch (e) {
        console.log(e)
    }
}

export default appSlice.reducer