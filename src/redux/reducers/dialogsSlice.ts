import {dialogType, messagesType} from "../../types/types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export type initialStateType = {
    dialog: Array<dialogType>
    messages: Array<messagesType>
}

const initialState: initialStateType = {
    dialog: [
        {id: 1, name: "marusik_super"},
        {id: 2, name: "notfat100kg"}
    ],
    messages: [
        {id: 1, message: "message"},
        {id: 2, message: "message"},
        {id: 3, message: "lol"}
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