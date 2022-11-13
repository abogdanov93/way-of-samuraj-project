import {AppDispatchType} from "../store"
import {chatAPI, ChatMessageAPIType, StatusType} from "../../api/chatAPI"
import {v1} from "uuid"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialStateType = {
    messages: ChatMessageType[]
    status: StatusType
}

export type ChatMessageType = ChatMessageAPIType & { id: string }

const initialState: InitialStateType = {
    messages: [],
    status: "pending"
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        messagesReceived(state, action: PayloadAction<ChatMessageAPIType[]>) {
                const newMessages = action.payload
                .map( m => ({ ...m, id: v1() }) )
                .filter((m, index, array) => index >= array.length - 100)

            state.messages = [...state.messages, ...newMessages]
        },
        statusChanged(state, action: PayloadAction<StatusType>) {
            state.status = action.payload
        }
    }
})

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: AppDispatchType) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatSlice.actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: AppDispatchType) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(chatSlice.actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = () => async (dispatch: AppDispatchType) => {
    chatAPI.start()
    chatAPI.subscribe("messagesReceived", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("statusChanged", statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = () => async (dispatch: AppDispatchType) => {
    chatAPI.unsubscribe("messagesReceived", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("statusChanged", statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendChatMessage = (message: string) => async () => {
    chatAPI.sendMessage(message)
}

export default chatSlice.reducer