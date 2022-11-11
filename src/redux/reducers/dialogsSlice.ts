import {DialogType, MessagesType} from "../../types/types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export type initialStateType = {
    dialog: Array<DialogType>
    messages: Array<MessagesType>
}

const initialState: initialStateType = {
    dialog: [
        {id: 1, name: "Han Solo", lastMessage: '"message"'},
        {id: 2, name: "efremos", lastMessage: '"message"'}
    ],
    messages: [
        {id: 1, message: "message"},
        {id: 2, message: "message"},
        {id: 3, message: "message"}
    ]
}

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<string>) {
            state.messages.push({
                id: 4,
                message: action.payload
            })
        },
        deleteMessage(state, action: PayloadAction<number>) {
            state.messages = state.messages.filter(m => m.id !== action.payload)
        }
    }
})

export default dialogsSlice.reducer
export const {addMessage, deleteMessage} = dialogsSlice.actions