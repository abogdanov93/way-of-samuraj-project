// import {baseActionType} from "../store"
import {dialogType, messagesType} from "../../types/types"
import {createSlice} from "@reduxjs/toolkit"

export type initialStateType = {
    dialog: Array<dialogType>
    messages: Array<messagesType>
}
// export type initialStateType = typeof initialState
// type actionsType = baseActionType<typeof actions>


const dialogsSlice = createSlice({
    name: "dialogs",
    initialState: {
        dialog: [
            {id: 1, name: "marusik_super"},
            {id: 2, name: "notfat100kg"}
        ],
        messages: [
            {id: 1, message: "message"},
            {id: 2, message: "message"},
            {id: 3, message: "lol"}
        ]
    } as initialStateType,
    reducers: {
        addMessage(state, action) {
            state.messages.push({
                id: 4,
                message: action.payload
            })
        }
    }
})

export default dialogsSlice.reducer
export const {addMessage} = dialogsSlice.actions

// let initialState = {
//     dialog: [
//         {id: 1, name: "marusik_super"},
//         {id: 2, name: "notfat100kg"}
//     ] as Array<dialogType>,
//     messages: [
//         {id: 1, message: "message"},
//         {id: 2, message: "message"},
//         {id: 3, message: "message"}
//     ] as Array<messagesType>
// }
//
// const dialogsReducer = (state = initialState, action: actionsType): initialStateType => {
//     switch (action.type) {
//         case "DIALOGS_ADD_MESSAGE":
//             let newMessage = {
//                 id: 5,
//                 message: action.message
//             }
//             return {
//                 ...state,
//                 messages: [...state.messages, newMessage]
//             }
//         default:
//             return state
//     }
// }

// export const actions = {
//     addMessage: (message: string) => ({type: "DIALOGS_ADD_MESSAGE", message} as const)
// }

// export default dialogsReducer