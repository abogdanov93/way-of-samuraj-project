import {getAuthUserData} from "./authReducer"
import {createSlice} from "@reduxjs/toolkit"

type initialStateType = {
    initialized: boolean
}
// type actionType = baseActionType<typeof actions>

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

// let initialState = {
//     initialized: false
// }

// const appReducer = (state = initialState, action: actionType): initialStateType => {
//     switch (action.type) {
//         case "APP_INITIALIZATION_SUCCESS":
//             return {
//                 ...state,
//                 initialized: true
//             }
//         default:
//             return state
//     }
// }
//
// const actions = {
//     initializationSuccess: () => ({type: "APP_INITIALIZATION_SUCCESS"} as const)
// }

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData()) // когда придет подтверждение авторизации и данные
    promise.then(() => {
        dispatch(appSlice.actions.initializationSuccess()) // меняем initialized
    }) // не понятно, как избавиться от then или как его типизировать
}

export default appSlice.reducer