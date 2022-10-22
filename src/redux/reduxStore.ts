import React from "react"
import {Action} from "redux"
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import appReducer from "./appReducer"
import chatReducer from "./chatReducer"

// для useAppDispatch и useAppSelectors
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']

export type stateType = ReturnType<typeof rootReducer>
export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, stateType, unknown, A>
export type baseActionType<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never


const rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    dialogs: dialogsReducer,
    chat: chatReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware]
})
