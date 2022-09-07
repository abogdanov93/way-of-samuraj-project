import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {inferActionsType, stateType} from "./reduxStore";

type initialStateType = {initialized:boolean}
let initialState: initialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "APP_INITIALIZATION_SUCCESS":
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

type actionType = inferActionsType<typeof actions>;
export const actions = {
    initializationSuccess: () => ({type: "APP_INITIALIZATION_SUCCESS"} as const)
}

type thunkType = ThunkAction<void, stateType, unknown, actionType>;
export const initializeApp = (): thunkType => (dispatch) => {
    const promise = dispatch(getAuthUserData()); // когда придет подтверждение авторизации и данные
    promise.then(() => {
        dispatch(actions.initializationSuccess()) // меняем initialized
    }); // не понятно, как типизировать
}

export default appReducer;