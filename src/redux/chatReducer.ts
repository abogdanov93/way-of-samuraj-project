import {baseActionType, baseThunkType} from "./reduxStore"
import {chatAPI, chatMessageType, openHandler, statusType} from "../api/chatAPI"
import {Dispatch} from "redux"

type actionType = baseActionType<typeof actions>
type thunkType = baseThunkType<actionType>


let initialState = {
    messages: [] as chatMessageType[],
    status: "pending" as statusType
}

const chatReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case "CHAT_MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages
                    .filter((m, index, array) => index >= array.length - 100)]
            }
        case "CHAT_STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

const actions = {
    messagesReceived: (messages: chatMessageType[]) =>
        ({type: "CHAT_MESSAGES_RECEIVED", payload: {messages}} as const),
    statusChanged: (status: statusType) => ({type: "CHAT_STATUS_CHANGED", payload: {status}} as const)
}

let _newMessageHandler: ((messages: chatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    debugger
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: statusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): thunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("messagesReceived", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("statusChanged", statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): thunkType => async (dispatch) => {
    chatAPI.unsubscribe("messagesReceived", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("statusChanged", statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendChatMessage = (message: string): thunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer