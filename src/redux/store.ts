import {Action} from "redux"
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {ThunkAction} from "redux-thunk"
import auth from "./reducers/authSlice"
import chatReducer from "./reducers/chatReducer"
import dialogs from "./reducers/dialogsSlice"
import app from "./reducers/appSlice"
import friends from "./reducers/friendsSlice"
import profilePage from "./reducers/profileSlice"
import users from "./reducers/usersSlice"


const rootReducer = combineReducers({
    app,
    profilePage,
    users,
    dialogs,
    chat: chatReducer,
    auth,
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
