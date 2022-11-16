import {ChatMessageAPIType, StatusType} from "../../api/chatAPI"
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


export default chatSlice.reducer