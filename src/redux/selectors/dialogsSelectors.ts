import {stateType} from "../reduxStore"

export const getDialogs = (state: stateType) => {
    return state.dialogs
}
