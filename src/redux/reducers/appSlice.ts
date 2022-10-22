import {getAuthUserData} from "./authReducer"
import {createSlice} from "@reduxjs/toolkit"

type initialStateType = {
    initialized: boolean
}

const appSlice = createSlice({
    name: "app",
    initialState: {
        initialized: false
    } as initialStateType,
    reducers: {
        initializationSuccess(state){
            state.initialized = true
        }
    }
})

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData()) // когда придет подтверждение авторизации и данные
    promise.then(() => {
        dispatch(appSlice.actions.initializationSuccess()) // меняем initialized
    }) // не понятно, как избавиться от then или как его типизировать
}

export default appSlice.reducer