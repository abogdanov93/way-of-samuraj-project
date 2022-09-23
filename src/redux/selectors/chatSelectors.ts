import {stateType} from "../reduxStore"

export const getChatMessages = (state: stateType) => {
    return state.chat.messages
}
