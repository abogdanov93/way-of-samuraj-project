import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";

type rootReducerType = typeof rootReducer;
export type stateType = ReturnType<rootReducerType>;

type propertiesType<T> = T extends {[key:string]: infer U} ? U : never;
// принимает тип элемента объекта, возвращает тип функции AC
export type inferActionsType<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<propertiesType<T>>;
// принимает тип объекта, присваивает переменной тип возвращаемого значения функции AC (объект)

const rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    dialogs: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store;

export default store;
