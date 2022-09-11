import {getAuthUserData} from "./authReducer"
import {baseActionType} from "./reduxStore"

type initialStateType = typeof initialState
type actionType = baseActionType<typeof actions>


let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "APP_INITIALIZATION_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const actions = {
    initializationSuccess: () => ({type: "APP_INITIALIZATION_SUCCESS"} as const)
}

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData()) // когда придет подтверждение авторизации и данные
    promise.then(() => {
        dispatch(actions.initializationSuccess()) // меняем initialized
    }) // не понятно, как избавиться от then или как его типизировать
}

export default appReducer