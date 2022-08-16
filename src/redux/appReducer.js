import React from "react";
import {getAuthUserData} from "./authReducer";

const INITIALIZATION_SUCCESS = "app/INITIALIZATION_SUCCESS";

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
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

export const initializationSuccess = () => ({type: INITIALIZATION_SUCCESS});

export const initializeApp = () => (dispatch) => {
   let promise = dispatch(getAuthUserData()); // когда придет подтверждение авторизации и данные
    promise.then(() => {
        dispatch(initializationSuccess()) // меняем initialized
    });
}

export default appReducer;