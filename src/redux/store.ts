import {Action} from "redux"
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {ThunkAction} from "redux-thunk"
import profileReducer from "./reducers/profileReducer"
import usersReducer from "./reducers/usersReducer"
import authReducer from "./reducers/authReducer"
import chatReducer from "./reducers/chatReducer"
import dialogs from "./reducers/dialogsSlice"
import app from "./reducers/appSlice"
import friends from "./reducers/friendsSlice"


const rootReducer = combineReducers({
    app,
    profilePage: profileReducer,
    usersPage: usersReducer,
    dialogs,
    chat: chatReducer,
    auth: authReducer,
    friends
})

const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export const store = setupStore()

export type StateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType["dispatch"]

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>
export type baseActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
