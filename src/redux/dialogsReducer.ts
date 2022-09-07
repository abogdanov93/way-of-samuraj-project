import {inferActionsType} from "./reduxStore";

type initialStateType = typeof initialState;
type dialogType = {
    id: number
    name: string
}
type messagesType = {
    id: number,
    message: string
}

let initialState = {
    dialog: [
        {id: 1, name: "marusik_super"},
        {id: 2, name: "notfat100kg"}
    ] as Array<dialogType>,
    messages: [
        {id: 1, message: "message 1"},
        {id: 2, message: "message 2"},
        {id: 3, message: "message 3"}
    ] as Array<messagesType>
};

const dialogsReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case "DIALOGS_ADD_MESSAGE":
            let newMessage = {
                id: 5,
                message: action.newMessageText
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
}

type actionsType = inferActionsType<typeof actions>;
const actions = {
    addMessage: (newMessageText: string) => ({type: "DIALOGS_ADD_MESSAGE", newMessageText} as const)
}

export default dialogsReducer;