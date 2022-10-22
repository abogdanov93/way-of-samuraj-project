import {baseActionType, baseThunkType} from "../store"
import {chatAPI, chatMessageAPIType, statusType} from "../../api/chatAPI"
import {Dispatch} from "redux"
import {v1} from "uuid"

type actionType = baseActionType<typeof actions>
type thunkType = baseThunkType<actionType>
type initialStateType = typeof initialState
export type chatMessageType = chatMessageAPIType & {id: string}

let initialState = {
    messages: [] as chatMessageType[],
    status: "pending" as statusType
}

const chatReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "CHAT_MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
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
    messagesReceived: (messages: chatMessageAPIType[]) =>
        ({type: "CHAT_MESSAGES_RECEIVED", payload: {messages}} as const),
    statusChanged: (status: statusType) => ({type: "CHAT_STATUS_CHANGED", payload: {status}} as const)
}

let _newMessageHandler: ((messages: chatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
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