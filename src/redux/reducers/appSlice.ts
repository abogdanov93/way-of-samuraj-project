import {getAuthUserData} from "./authReducer"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {AppDispatchType} from "../store";
import {useAppDispatch} from "../../hooks/redux";

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

export const initializeApp = () => (dispatch: AppDispatchType) => {
    const promise = dispatch(getAuthUserData())
    promise.then(() => {
        dispatch(appSlice.actions.initializationSuccess())
    })
}

export default appSlice.reducer