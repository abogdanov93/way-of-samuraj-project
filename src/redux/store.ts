import {combineReducers, configureStore} from "@reduxjs/toolkit"
import auth from "./reducers/authSlice"
import chat from "./reducers/chatSlice"
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
    chat,
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
