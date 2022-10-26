import {StateType} from "../store"

export const getChatMessages = (state: StateType) => {
    return state.chat.messages
}

export const getStatus = (state: StateType) => {
    return state.chat.status
}
