import {stateType} from "../store"

export const getChatMessages = (state: stateType) => {
    return state.chat.messages
}

export const getStatus = (state: stateType) => {
    return state.chat.status
}
