import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {stateType} from "./reduxStore";

const INITIALIZATION_SUCCESS = "APP/INITIALIZATION_SUCCESS";

type initialStateType = {initialized:boolean}

let initialState: initialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

type actionType = { type: typeof INITIALIZATION_SUCCESS }
export const initializationSuccess = (): actionType => ({type: INITIALIZATION_SUCCESS});

type thunkType = ThunkAction<void, stateType, unknown, actionType>;
export const initializeApp = (): thunkType => (dispatch) => {
    const promise = dispatch(getAuthUserData()); // когда придет подтверждение авторизации и данные
    promise.then(() => {
        dispatch(initializationSuccess()) // меняем initialized
    });
}

export default appReducer;