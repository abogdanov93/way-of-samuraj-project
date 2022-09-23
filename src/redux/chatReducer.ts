import {baseActionType, baseThunkType} from "./reduxStore"
import {chatAPI, chatMessageType} from "../api/chatAPI"
import {messagesType} from "../types/types";
import {Dispatch} from "redux";

type actionType = baseActionType<typeof actions>
type thunkType = baseThunkType<actionType>


let initialState = {
    messages: [] as chatMessageType[]
}

const chatReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case "CHAT_MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

const actions = {
    messagesReceived: (messages: chatMessageType[]) =>
        ({type: "CHAT_MESSAGES_RECEIVED", payload: {messages}} as const)
}

let _newMessageHandler: ((messages: chatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): thunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): thunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendChatMessage = (message: string): thunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer