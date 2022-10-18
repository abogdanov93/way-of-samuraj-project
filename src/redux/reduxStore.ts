import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import appReducer from "./appReducer"
import chatReducer from "./chatReducer";

type rootReducerType = typeof rootReducer
export type stateType = ReturnType<rootReducerType>
export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, stateType, unknown, A>
export type baseActionType<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never
// если Т соответствует элементу объекта - ключ-строка, значение-функция,
// которая принимает какие-то аргуменнты и возвращает тип, проанализировать этот тип и вернуть его
// или ничего не возвращать
// followSuccess: (userId: number) => ({type: "USER_FOLLOW", userId} as const)

const rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    dialogs: dialogsReducer,
    chat: chatReducer,
    auth: authReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store