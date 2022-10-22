import {stateType} from "../reduxStore"

export const getInitialized = (state: stateType) => {
    return state.app.initialized
}
