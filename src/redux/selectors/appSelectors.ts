import {stateType} from "../store"

export const getInitialized = (state: stateType) => {
    return state.app.initialized
}
